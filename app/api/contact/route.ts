import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { profile } from "@/content/profile";
import type { ContactResponse } from "@/lib/contact";
import { contactSchema } from "@/lib/contact-schema";
import { clientIp, createRateLimiter } from "@/lib/ratelimit";
import { automationWebhookConfigured, sendToAutomation } from "@/lib/automation-webhook";

export const runtime = "nodejs";

const limiter = createRateLimiter({ name: "contact", limit: 5, windowSeconds: 600 });

function reply(body: ContactResponse, status = 200) {
  return NextResponse.json(body, { status });
}

async function sendEmail(
  apiKey: string,
  d: { name: string; email: string; subject: string; message: string },
) {
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL ?? profile.email,
      replyTo: d.email,
      subject: `[Portfolio] ${d.subject}`,
      text: `From: ${d.name} <${d.email}>\n\n${d.message}`,
    });
    if (error) console.error("[contact] Resend error", error.name);
    return !error;
  } catch (err) {
    console.error("[contact] Resend failed", err instanceof Error ? err.name : err);
    return false;
  }
}

/**
 * Contact form: validate, then deliver through every configured channel in parallel:
 * email (Resend) and/or an automation webhook (n8n / Zapier). One success is enough.
 */
export async function POST(req: Request) {
  const { success } = await limiter(clientIp(req.headers));
  if (!success) return reply({ error: "Too many messages. Please try again later." }, 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return reply({ error: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return reply({ error: "Please check the highlighted fields.", fields: fieldErrors }, 400);
  }

  const { name, email, subject, message, company } = parsed.data;
  // Honeypot filled: a bot. Pretend success so it doesn't retry.
  if (company) return reply({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const hasWebhook = automationWebhookConfigured();

  if (!apiKey && !hasWebhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] No delivery channel configured. Message not sent:", {
        name,
        email,
        subject,
      });
      return reply({ ok: true });
    }
    return reply(
      { error: `The contact form isn't configured yet. Please email ${profile.email} directly.` },
      503,
    );
  }

  const results = await Promise.all([
    apiKey ? sendEmail(apiKey, { name, email, subject, message }) : Promise.resolve(false),
    hasWebhook
      ? sendToAutomation({
          event: "contact.submitted",
          name,
          email,
          subject,
          message,
          submittedAt: new Date().toISOString(),
          source: "portfolio",
        })
      : Promise.resolve(false),
  ]);

  if (results.some(Boolean)) return reply({ ok: true });
  return reply(
    { error: "The message couldn't be delivered. Please try again or email me directly." },
    502,
  );
}
