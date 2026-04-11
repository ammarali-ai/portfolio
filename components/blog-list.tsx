"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Shuffle, ExternalLink } from "lucide-react";
import type { BlogPost } from "@/lib/content";

const RESEARCH_LINKS = [
  { label: "arXiv", href: "https://arxiv.org/list/cs.AI/recent", color: "text-red-400" },
  { label: "Papers with Code", href: "https://paperswithcode.com/", color: "text-accent-cyan" },
  { label: "Google Scholar", href: "https://scholar.google.com/", color: "text-accent-violet" },
  { label: "Hugging Face", href: "https://huggingface.co/papers", color: "text-amber-400" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function BlogList({ initial }: { initial: BlogPost[] }) {
  const [seed, setSeed] = useState(0);
  const [shuffled, setShuffled] = useState(false);

  const posts = useMemo(() => {
    if (!shuffled) return initial;
    return shuffleArray(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, shuffled, initial]);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setShuffled(true);
            setSeed((s) => s + 1);
          }}
          className="btn-primary"
        >
          <Shuffle className="h-4 w-4" /> Shuffle posts
        </button>
        {shuffled && (
          <button
            type="button"
            onClick={() => setShuffled(false)}
            className="btn-ghost text-xs"
          >
            Reset to newest
          </button>
        )}
      </div>

      <div className="mt-6 card">
        <h3 className="text-sm font-mono uppercase tracking-wider text-accent-cyan">
          Research portals
        </h3>
        <p className="text-xs text-fg-muted mt-1">Jump straight to the source.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {RESEARCH_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-subtle px-3 py-1.5 text-xs font-mono hover:border-accent-cyan/40 transition"
            >
              <ExternalLink className={`h-3 w-3 ${l.color}`} />
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="card group flex flex-col md:flex-row md:items-start gap-4 hover:border-accent-cyan/40"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30">
              <BookOpen className="h-5 w-5 text-accent-cyan" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1 text-[11px] font-mono text-fg-muted">
                {p.date && <time>{p.date}</time>}
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-border px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-semibold group-hover:gradient-text transition">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">{p.excerpt}</p>
              {p.authors.length > 0 && (
                <p className="mt-2 text-xs text-fg-muted italic">by {p.authors.join(", ")}</p>
              )}
            </div>
            <ArrowUpRight className="hidden md:block h-4 w-4 text-fg-muted group-hover:text-accent-cyan transition mt-2" />
          </Link>
        ))}
      </div>
    </>
  );
}
