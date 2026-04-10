import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export const runtime = "nodejs";

// Rate limit login attempts: 5 per 5 min per IP
const hits = new Map<string, { count: number; reset: number }>();
function limit(ip: string) {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.reset < now) {
    hits.set(ip, { count: 1, reset: now + 300_000 });
    return true;
  }
  if (e.count >= 5) return false;
  e.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!limit(ip)) {
      return NextResponse.json({ error: "Too many attempts." }, { status: 429 });
    }

    const { password } = await req.json();
    if (typeof password !== "string" || !password) {
      return NextResponse.json({ error: "Password required." }, { status: 400 });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH;
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!hash || !secret) {
      return NextResponse.json(
        { error: "Admin not configured. Set ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET." },
        { status: 503 },
      );
    }

    const ok = await bcrypt.compare(password, hash);
    if (!ok) return NextResponse.json({ error: "Wrong password." }, { status: 401 });

    await createSession();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[login] error", err);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
