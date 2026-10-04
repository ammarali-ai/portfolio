import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { profile } from "@/content/profile";
import type { ContactResponse } from "@/lib/contact";
import { contactSchema } from "@/lib/contact-schema";
import { clientIp, createRateLimiter } from "@/lib/ratelimit";

export const runtime = "nodejs";

const limiter = createRateLimiter({ name: "contact", limit: 5, windowSeconds: 600 });

function reply(body: ContactResponse, status = 200) {
  return NextResponse.json(body, { status });
}

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
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set. Message not sent:", { name, email, subject });
      return reply({ ok: true });
    }
    return reply(
      { error: `The contact form isn't configured yet. Please email ${profile.email} directly.` },
      503,
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL ?? profile.email,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("[contact] Resend error", error);
      return reply(
        { error: "The email service failed. Please try again or email me directly." },
        502,
      );
    }
    return reply({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return reply({ error: "Something went wrong. Please try again." }, 500);
  }
}
