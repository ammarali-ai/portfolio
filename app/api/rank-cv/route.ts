import { NextResponse } from "next/server";
import { getChatModel } from "@/lib/gemini";

export const runtime = "nodejs";

// Token-budget guards (Gemini free tier safety)
const MAX_CV_CHARS = 8000;
const MAX_JD_CHARS = 4000;
const MAX_OUTPUT_TOKENS = 768;

// In-memory rate limit — 5 rankings per IP per 10 min
const hits = new Map<string, { count: number; reset: number }>();
function rateLimit(ip: string) {
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

type RankResult = {
  score: number;
  verdict: string;
  matched: string[];
  missing: string[];
  suggestions: string[];
};

function extractJson(text: string): RankResult | null {
  // Strip code fences, find first JSON object
  const cleaned = text.replace(/```json\s*|\s*```/g, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end < 0) return null;
  try {
    const obj = JSON.parse(cleaned.slice(start, end + 1));
    return {
      score: Math.max(0, Math.min(100, Number(obj.score) || 0)),
      verdict: String(obj.verdict || ""),
      matched: Array.isArray(obj.matched) ? obj.matched.map(String).slice(0, 15) : [],
      missing: Array.isArray(obj.missing) ? obj.missing.map(String).slice(0, 15) : [],
      suggestions: Array.isArray(obj.suggestions)
        ? obj.suggestions.map(String).slice(0, 6)
        : [],
    };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again in 10 minutes." },
        { status: 429 },
      );
    }

    const { cv, jd } = await req.json();
    if (typeof cv !== "string" || typeof jd !== "string" || !cv.trim() || !jd.trim()) {
      return NextResponse.json(
        { error: "Please paste both your CV and the job description." },
        { status: 400 },
      );
    }

    const trimmedCv = cv.slice(0, MAX_CV_CHARS);
    const trimmedJd = jd.slice(0, MAX_JD_CHARS);

    const model = getChatModel();
    if (!model) {
      return NextResponse.json(
        {
          error:
            "AI is not configured. Set GOOGLE_GENERATIVE_AI_API_KEY to enable the CV Ranker.",
        },
        { status: 503 },
      );
    }

    const prompt = `You are an ATS (applicant tracking system) analyzer. Score how well the candidate's CV matches the job description.

Respond with a JSON object ONLY, no commentary, in this exact shape:
{
  "score": <integer 0-100>,
  "verdict": "<one short sentence summary>",
  "matched": ["<keyword 1>", "<keyword 2>", ...],
  "missing": ["<missing skill 1>", "<missing skill 2>", ...],
  "suggestions": ["<actionable tip 1>", "<actionable tip 2>", ...]
}

Rules:
- "score" should reflect real keyword, skill, and experience overlap.
- Keep each string under 80 characters.
- Max 10 items per list.
- "suggestions" should be concrete rewrites the candidate can apply immediately.

=== CV START ===
${trimmedCv}
=== CV END ===

=== JOB DESCRIPTION START ===
${trimmedJd}
=== JOB DESCRIPTION END ===`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: 0.2,
        topP: 0.9,
      },
    });

    const text = result.response.text();
    const parsed = extractJson(text);
    if (!parsed) {
      return NextResponse.json(
        { error: "The model returned an unexpected format. Try again." },
        { status: 502 },
      );
    }
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[rank-cv] error", err);
    return NextResponse.json({ error: "Ranker failed. Please try again." }, { status: 500 });
  }
}
