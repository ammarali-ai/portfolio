import { BrainCircuit, Filter, Send, Webhook, type LucideIcon } from "lucide-react";
import type { PipelineStep } from "@/content/schema";
import { monitoringPipeline, workflowCategories } from "@/content/workflows-index";
import { automationGalleryTitle, sections } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const kindStyle: Record<PipelineStep["kind"], { Icon: LucideIcon; className: string }> = {
  trigger: { Icon: Webhook, className: "text-brand border-brand/40 bg-brand/10" },
  logic: { Icon: Filter, className: "text-muted-foreground border-border bg-muted" },
  ai: { Icon: BrainCircuit, className: "text-brand-2 border-brand-2/40 bg-brand-2/10" },
  output: { Icon: Send, className: "text-brand border-brand/40 bg-brand/10" },
};

/**
 * Static, accessible version of the live automation showcase.
 * Phase 4 layers an animated React Flow diagram on top of the same pipeline data.
 */
export function AutomationShowcase() {
  return (
    <section
      id="automation"
      aria-labelledby="automation-title"
      className="container-page py-16 md:py-24"
    >
      <SectionHeading copy={sections.automation} id="automation-title" />

      <Reveal>
        <ol
          aria-label="Real-Time Monitoring & Alert System pipeline"
          className="grid gap-3 rounded-2xl border border-border bg-card/60 p-4 sm:p-6 lg:grid-cols-5 lg:gap-0"
        >
          {monitoringPipeline.map((step, i) => {
            const { Icon, className } = kindStyle[step.kind];
            const last = i === monitoringPipeline.length - 1;
            return (
              <li key={step.id} className="relative flex gap-4 lg:flex-col lg:gap-3 lg:px-3">
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute top-12 bottom-[-12px] left-5 w-px bg-gradient-to-b from-brand/60 to-brand-2/40 lg:top-5 lg:right-[-12px] lg:bottom-auto lg:left-[3.25rem] lg:h-px lg:w-auto lg:bg-gradient-to-r"
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border",
                    className,
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="pb-2 lg:pb-0">
                  <p className="font-mono text-[11px] text-muted-foreground">Step {i + 1}</p>
                  <h3 className="text-base font-semibold">{step.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>

      <h3 className="mt-16 mb-6 text-xl font-semibold">{automationGalleryTitle}</h3>
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
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
