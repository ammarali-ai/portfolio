"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Gauge, Lightbulb, Loader2, XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { RANKER_LIMITS, type RankResponse, type RankResult } from "@/lib/cv-ranker";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-64 w-full resize-y rounded-xl border border-input bg-background/70 p-3 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30";

function scoreTone(score: number) {
  if (score >= 75) return "text-leaf";
  if (score >= 50) return "text-sun";
  return "text-flare";
}

function Result({ result }: { result: RankResult }) {
  return (
    <section aria-label="Match result" className="mt-10 grid gap-4 lg:grid-cols-[16rem_1fr]">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card/70 p-6 text-center">
        <Gauge className="mb-2 size-6 text-muted-foreground" aria-hidden="true" />
        <p className={cn("font-heading text-6xl font-bold", scoreTone(result.score))}>
          {result.score}
          <span className="text-2xl text-muted-foreground">/100</span>
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{result.verdict}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/70 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <CheckCircle2 className="size-4 text-leaf" aria-hidden="true" /> Matched
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {result.matched.map((m) => (
              <li key={m} className="rounded-md border border-leaf/30 bg-leaf/10 px-2 py-1 text-xs">
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card/70 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <XCircle className="size-4 text-flare" aria-hidden="true" /> Missing
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {result.missing.map((m) => (
              <li
                key={m}
                className="rounded-md border border-flare/30 bg-flare/10 px-2 py-1 text-xs"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card/70 p-5 md:col-span-2">
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <Lightbulb className="size-4 text-sun" aria-hidden="true" /> Suggestions
          </h3>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm">
            {result.suggestions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** CV vs job description matcher (Claude structured output via /api/rank-cv). */
export function CvRanker({ privacyNote }: { privacyNote: string }) {
  const [cv, setCv] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RankResult | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/rank-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, jd }),
      });
      const data = (await res.json()) as RankResponse;
      if (!res.ok || !data.result) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult(data.result);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="cv" className="mb-1.5 block text-sm font-medium">
            Your CV
          </label>
          <textarea
            id="cv"
            required
            minLength={RANKER_LIMITS.cvMin}
            maxLength={RANKER_LIMITS.cvMax}
            value={cv}
            onChange={(e) => setCv(e.target.value)}
            placeholder="Paste your CV as plain text…"
            className={fieldClass}
            data-lenis-prevent
          />
          <p className="mt-1 text-right font-mono text-[11px] text-muted-foreground">
            {cv.length.toLocaleString()} / {RANKER_LIMITS.cvMax.toLocaleString()}
          </p>
        </div>
        <div>
          <label htmlFor="jd" className="mb-1.5 block text-sm font-medium">
            Job description
          </label>
          <textarea
            id="jd"
            required
            minLength={RANKER_LIMITS.jdMin}
            maxLength={RANKER_LIMITS.jdMax}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description…"
            className={fieldClass}
            data-lenis-prevent
          />
          <p className="mt-1 text-right font-mono text-[11px] text-muted-foreground">
            {jd.length.toLocaleString()} / {RANKER_LIMITS.jdMax.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">{privacyNote}</p>
          <button
            type="submit"
            disabled={loading}
            className={cn(buttonVariants({ size: "lg" }), "md:w-auto")}
          >
            {loading ? (
              <Loader2 data-icon="inline-start" className="animate-spin" aria-hidden="true" />
            ) : (
              <Gauge data-icon="inline-start" aria-hidden="true" />
            )}
            {loading ? "Scoring…" : "Score the match"}
          </button>
        </div>
      </form>

      <div aria-live="polite">
        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}
        {result && <Result result={result} />}
      </div>
    </>
  );
}
