"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import type { DomainId, ProjectMeta } from "@/content/schema";
import { StatusBadge } from "@/components/ui/status-badge";
import { TechChip } from "@/components/ui/tech-chip";
import { cn } from "@/lib/utils";

interface Props {
  projects: readonly ProjectMeta[];
  domains: readonly { id: DomainId; title: string }[];
}

const chip =
  "rounded-full border px-3 py-1.5 text-sm transition-colors aria-pressed:border-brand aria-pressed:bg-brand/10 aria-pressed:text-foreground";

/** Filterable project archive: one domain and/or one technology at a time. */
export function ProjectExplorer({ projects, domains }: Props) {
  const [domain, setDomain] = useState<DomainId | null>(null);
  const [tech, setTech] = useState<string | null>(null);

  // Technologies used by at least two projects, most common first.
  const techs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [projects]);

  const usedDomains = domains.filter((d) => projects.some((p) => p.domain === d.id));
  const domainTitle = (id: DomainId) => domains.find((d) => d.id === id)?.title ?? id;

  const visible = projects.filter(
    (p) => (!domain || p.domain === domain) && (!tech || p.tech.includes(tech)),
  );

  return (
    <>
      <div className="space-y-4">
        <div role="group" aria-label="Filter by domain" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={domain === null}
            onClick={() => setDomain(null)}
            className={cn(chip, "border-border text-muted-foreground")}
          >
            All domains
          </button>
          {usedDomains.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={domain === d.id}
              onClick={() => setDomain(domain === d.id ? null : d.id)}
              className={cn(chip, "border-border text-muted-foreground hover:text-foreground")}
            >
              {d.title}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Filter by technology" className="flex flex-wrap gap-1.5">
          {techs.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tech === t}
              onClick={() => setTech(tech === t ? null : t)}
              className={cn(
                chip,
                "border-border px-2.5 py-1 font-mono text-xs text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <p aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
        {(domain || tech) && (
          <button
            type="button"
            onClick={() => {
              setDomain(null);
              setTech(null);
            }}
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <X className="size-3.5" aria-hidden="true" /> Clear filters
          </button>
        )}
      </div>

      <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <article className="glow-border relative flex h-full flex-col rounded-2xl border border-border bg-card/70 p-5 transition-colors hover:bg-card">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[11px] tracking-widest text-brand uppercase">
                  {domainTitle(p.domain)}
                </span>
                <StatusBadge status={p.status} className="ml-auto" />
              </div>
              <h2 className="text-lg font-semibold">
                <Link
                  href={`/projects/${p.slug}`}
                  className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                >
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.impact}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Tech stack">
                {p.tech.slice(0, 5).map((t) => (
                  <li key={t}>
                    <TechChip name={t} />
                  </li>
                ))}
              </ul>
              <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand">
                Read case study <ArrowRight className="size-3" aria-hidden="true" />
              </p>
            </article>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">No projects match those filters.</p>
      )}
    </>
  );
}
