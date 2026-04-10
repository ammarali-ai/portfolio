import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_LEN = 4000;

// Simple rate limit (max 5 messages per IP per 10 min)
const hits = new Map<string, { count: number; reset: number }>();
function limit(ip: string) {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.reset < now) {
    hits.set(ip, { count: 1, reset: now + 600_000 });
    return true;
  }
  if (e.count >= 5) return false;
  e.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!limit(ip)) {
      return NextResponse.json({ error: "Too many messages. Try again later." }, { status: 429 });
    }

    const body = await req.json();
    const name = String(body.name ?? "").slice(0, 200).trim();
    const email = String(body.email ?? "").slice(0, 200).trim();
    const subject = String(body.subject ?? "").slice(0, 200).trim();
    const message = String(body.message ?? "").slice(0, MAX_LEN).trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Dev mode: log to console so the form is testable without a key
      console.log("[contact] (no RESEND_API_KEY) message:", { name, email, subject, message });
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const to = process.env.RESEND_TO_EMAIL || "muhammadammaralibhutta@gmail.com";

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ error: "Email service error." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
