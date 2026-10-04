import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { workflowCategories } from "@/content/workflows-index";
import { getFlow } from "@/content/flows";
import { automationsPage } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { LazyFlow } from "@/components/flow/lazy-flow";
import { Reveal } from "@/components/ui/reveal";
import { flowKinds, flowSourceLabel } from "@/lib/flow-kinds";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Automations",
  description:
    "Animated n8n workflows by Muhammad Ammar Ali: real-time alerts, AI call analysis, lead enrichment, meeting notes and more.",
};

export default function AutomationsPage() {
  const categories = workflowCategories.filter((c) => c.flagships.length > 0);
  const others = workflowCategories.filter((c) => c.flagships.length === 0);

  return (
    <div className="container-page py-14 md:py-20">
      <Link
        href="/#automation"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
      </Link>

      <SectionHeading copy={automationsPage} id="automations-title" />

      <ul aria-label="Node types" className="-mt-4 mb-12 flex flex-wrap gap-2">
        {Object.entries(flowKinds).map(([kind, { label, Icon, chip }]) => (
          <li
            key={kind}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs",
              chip,
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>

      <nav aria-label="Categories" className="mb-14 flex flex-wrap gap-2">
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
          >
            {c.title} <span className="font-mono text-xs">({c.flagships.length})</span>
          </a>
        ))}
      </nav>

      <div className="space-y-20">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-title`}>
            <h2 id={`${cat.id}-title`} className="text-2xl font-semibold sm:text-3xl">
              {cat.title}
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">{cat.description}</p>

            <div className="mt-8 space-y-10">
              {cat.flagships.map((id) => {
                const flow = getFlow(id);
                return (
                  <Reveal key={id}>
                    <article aria-labelledby={`flow-${id}`}>
                      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 id={`flow-${id}`} className="text-lg font-semibold">
                          {flow.title}
                        </h3>
                        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                          {flow.context} · {flowSourceLabel[flow.source]} · {flow.nodes.length}{" "}
                          nodes
                        </p>
                      </div>
                      <p className="mb-4 max-w-3xl text-sm text-muted-foreground">
                        {flow.description}
                      </p>
                      <LazyFlow spec={flow} interactive />
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>
        ))}

        <section aria-labelledby="more-title">
          <h2 id="more-title" className="text-2xl font-semibold">
            More in the workspace
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((cat) => (
              <li key={cat.id} className="rounded-2xl border border-border bg-card/60 p-5">
                <h3 className="font-semibold">{cat.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-foreground/85">
                  {cat.examples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
