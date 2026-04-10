import { NextResponse } from "next/server";
import { getChatModel } from "@/lib/gemini";
import { getCvContext } from "@/lib/content";

export const runtime = "nodejs";

// Strict token-budget guards (Gemini free tier safety):
const MAX_QUESTION_CHARS = 500;        // ~125 input tokens
const MAX_OUTPUT_TOKENS = 384;         // capped reply length
const MAX_CONTEXT_CHARS = 6000;        // CV trimmed if larger

// In-memory rate limit per IP (cheap defense against abuse on free tier)
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute." },
        { status: 429 },
      );
    }

    const { question } = await req.json();
    if (typeof question !== "string" || !question.trim()) {
      return NextResponse.json({ error: "Question required." }, { status: 400 });
    }
    const trimmed = question.slice(0, MAX_QUESTION_CHARS);

    const model = getChatModel();
    if (!model) {
      return NextResponse.json(
        { answer: "AI chat is not configured yet. Set GOOGLE_GENERATIVE_AI_API_KEY in your environment to enable it." },
        { status: 200 },
      );
    }

    const cv = (await getCvContext()).slice(0, MAX_CONTEXT_CHARS);
    const systemPrompt = `You are an AI assistant answering questions about Muhammad Ammar Ali based ONLY on the CV below.
Be concise (under 120 words). If a fact is not in the CV, say you don't know.
Speak about him in the third person ("he", "Ammar"). Do not invent details.

=== CV START ===
${cv}
=== CV END ===`;

    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\nQuestion: ${trimmed}` }] },
      ],
      generationConfig: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: 0.4,
        topP: 0.9,
      },
    });

    const answer = result.response.text();
    return NextResponse.json({ answer });
  } catch (err) {
    console.error("[chat] error", err);
    return NextResponse.json(
      { error: "Chat failed. Please try again." },
      { status: 500 },
    );
  }
}
