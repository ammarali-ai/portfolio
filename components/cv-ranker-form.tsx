"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  AlertCircle,
} from "lucide-react";

type Result = {
  score: number;
  verdict: string;
  matched: string[];
  missing: string[];
  suggestions: string[];
};

export function CvRankerForm() {
  const [cv, setCv] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/rank-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, jd }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else setError(data.error || "Something went wrong.");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-mono text-fg-muted uppercase tracking-wider mb-1.5">
            Your CV / Resume
          </label>
          <textarea
            value={cv}
            onChange={(e) => setCv(e.target.value)}
            required
            rows={14}
            placeholder="Paste your full CV as plain text..."
            className="w-full rounded-xl border border-border bg-bg-subtle px-4 py-3 text-sm outline-none focus:border-accent-cyan/50 resize-none font-mono"
          />
          <p className="mt-1 text-[11px] text-fg-muted">{cv.length} chars (max 8,000)</p>
        </div>
        <div>
          <label className="block text-xs font-mono text-fg-muted uppercase tracking-wider mb-1.5">
            Job Description
          </label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            required
            rows={14}
            placeholder="Paste the job posting..."
            className="w-full rounded-xl border border-border bg-bg-subtle px-4 py-3 text-sm outline-none focus:border-accent-cyan/50 resize-none font-mono"
          />
          <p className="mt-1 text-[11px] text-fg-muted">{jd.length} chars (max 4,000)</p>
        </div>

        <div className="lg:col-span-2 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading || !cv.trim() || !jd.trim()}
            className="btn-primary"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Analyzing..." : "Rank my CV"}
          </button>
          <button
            type="button"
            onClick={() => {
              setCv("");
              setJd("");
              setResult(null);
              setError("");
            }}
            className="btn-ghost"
          >
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div className="card border-rose-500/40 bg-rose-500/5 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-400 mt-0.5 shrink-0" />
          <p className="text-sm text-rose-300">{error}</p>
        </div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="card text-center">
            <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
              Match Score
            </p>
            <div className="text-7xl md:text-8xl font-bold gradient-text tabular-nums my-4">
              {result.score}
              <span className="text-4xl">%</span>
            </div>
            <p className="text-fg-muted max-w-xl mx-auto">{result.verdict}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="card">
              <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Matched
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {result.matched.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-300"
                  >
                    {m}
                  </span>
                ))}
                {!result.matched.length && (
                  <p className="text-xs text-fg-muted">No clear matches found.</p>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="text-sm font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <XCircle className="h-4 w-4" /> Missing
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {result.missing.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[11px] font-mono text-rose-300"
                  >
                    {m}
                  </span>
                ))}
                {!result.missing.length && (
                  <p className="text-xs text-fg-muted">Nothing major missing. 🎉</p>
                )}
              </div>
            </div>
          </div>

          {result.suggestions.length > 0 && (
            <div className="card">
              <h3 className="text-sm font-mono uppercase tracking-wider text-accent-violet flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Suggestions
              </h3>
              <ul className="mt-3 space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-fg-muted flex gap-2">
                    <span className="text-accent-violet mt-1">▸</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
