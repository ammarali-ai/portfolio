import { NextResponse } from "next/server";
import { getChatModel } from "@/lib/gemini";
import { getCvContext } from "@/lib/content";

export const runtime = "nodejs";

// Strict token-budget guards (Gemini free tier safety)
const MAX_QUESTION_CHARS = 500;
const MAX_OUTPUT_TOKENS = 384;
const MAX_CONTEXT_CHARS = 6000;

// In-memory rate limit per IP
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

function sseHeaders() {
  return {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  };
}

function sseLine(obj: unknown) {
  return `data: ${JSON.stringify(obj)}\n\n`;
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
        {
          answer:
            "AI chat is not configured yet. Set GOOGLE_GENERATIVE_AI_API_KEY in your environment to enable it.",
        },
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

    const streamResult = await model.generateContentStream({
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\nQuestion: ${trimmed}` }] },
      ],
      generationConfig: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: 0.4,
        topP: 0.9,
      },
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(sseLine({ delta: text })));
            }
          }
          controller.enqueue(encoder.encode(sseLine({ done: true })));
          controller.close();
        } catch (err) {
          console.error("[chat stream] error", err);
          controller.enqueue(
            encoder.encode(sseLine({ error: "Stream failed." })),
          );
          controller.close();
        }
      },
    });

    return new Response(stream, { headers: sseHeaders() });
  } catch (err) {
    console.error("[chat] error", err);
    return NextResponse.json({ error: "Chat failed. Please try again." }, { status: 500 });
  }
}
