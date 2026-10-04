import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";
import { flows } from "@/content/flows";
import { workflowCategories } from "@/content/workflows-index";
import { automationGalleryTitle, sections } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { LazyFlow } from "@/components/flow/lazy-flow";
import { flowKinds } from "@/lib/flow-kinds";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const monitoring = flows.monitoring;
const totalDiagrams = workflowCategories.reduce((n, c) => n + c.flagships.length, 0);

/** Live automation showcase: the production alert system animated as a React Flow diagram. */
export function AutomationShowcase() {
  return (
    <section
      id="automation"
      aria-labelledby="automation-title"
      className="container-page py-16 md:py-24"
    >
      <SectionHeading copy={sections.automation} id="automation-title" />

      <Reveal>
        <LazyFlow spec={monitoring} />
      </Reveal>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {monitoring.nodes.map((node) => {
          const { Icon, chip } = flowKinds[node.kind];
          return (
            <li key={node.id} className="flex gap-3 rounded-xl border border-border bg-card/50 p-3">
              <span
                className={cn("grid size-8 shrink-0 place-items-center rounded-lg border", chip)}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{node.label}</h3>
                <p className="text-sm text-muted-foreground">{node.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-16 mb-6 flex flex-wrap items-end justify-between gap-4">
        <h3 className="text-xl font-semibold">{automationGalleryTitle}</h3>
        <Link href="/automations" className={buttonVariants({ variant: "outline" })}>
          <Workflow data-icon="inline-start" aria-hidden="true" />
          Explore {totalDiagrams} animated workflows
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workflowCategories.map((cat, i) => (
          <li key={cat.id}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <div className="glow-border relative h-full rounded-2xl border border-border bg-card/60 p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="font-semibold">{cat.title}</h4>
                  {cat.count !== null && (
                    <span className="font-mono text-xs text-brand">{cat.count} workflows</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {cat.examples.map((ex) => (
                    <li key={ex} className="flex gap-2">
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-brand-2"
                        aria-hidden="true"
                      />
                      <span className="text-foreground/85">{ex}</span>
                    </li>
                  ))}
                </ul>
                {cat.flagships.length > 0 && (
                  <Link
                    href={`/automations#${cat.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
                  >
                    {cat.flagships.length} animated{" "}
                    {cat.flagships.length === 1 ? "diagram" : "diagrams"}
                    <ArrowRight className="size-3" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
