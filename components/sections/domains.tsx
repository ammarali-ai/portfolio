import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { domains } from "@/content/domains";
import { sections } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Domains() {
  return (
    <section id="domains" aria-labelledby="domains-title" className="container-page py-16 md:py-24">
      <SectionHeading copy={sections.domains} id="domains-title" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {domains.map((domain, i) => (
          <Reveal
            key={domain.id}
            delay={i * 0.06}
            className={cn(i < 2 ? "lg:col-span-3" : "lg:col-span-2", i === 4 && "md:col-span-2")}
          >
            <article
              id={`domain-${domain.id}`}
              aria-labelledby={`domain-${domain.id}-title`}
              className="glow-border relative flex h-full flex-col rounded-2xl border border-border bg-card/70 p-6 transition-colors hover:bg-card"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 id={`domain-${domain.id}-title`} className="text-xl font-semibold">
                  {domain.title}
                </h3>
                <StatusBadge status={domain.status} className="shrink-0" />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">{domain.interest}</p>

              <p className="mt-5 mb-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                Problems I want to solve
              </p>
              <ul className="space-y-1.5 text-sm">
                {domain.problems.map((problem) => (
                  <li key={problem} className="flex gap-2">
                    <span
                      className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>

              {domain.related.length > 0 && (
                <div className="mt-auto pt-6">
                  <p className="mb-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    Related
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {domain.related.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                        >
                          {link.label}
                          <ArrowUpRight className="size-3" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
