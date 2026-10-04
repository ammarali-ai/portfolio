import { experience } from "@/content/experience";
import { sections } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechChip } from "@/components/ui/tech-chip";
import { Reveal } from "@/components/ui/reveal";
import { formatRange } from "@/lib/format";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="container-page py-16 md:py-24"
    >
      <SectionHeading copy={sections.experience} id="experience-title" />

      <ol className="relative space-y-8 border-l border-border pl-6 md:ml-4 md:pl-10">
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.start}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[30.5px] size-3 rounded-full border-2 border-background bg-brand ring-4 ring-brand/15 md:-left-[46.5px]"
            />
            <Reveal delay={i * 0.05}>
              <article className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-lg font-semibold">
                    {job.role} <span className="text-muted-foreground">· {job.company}</span>
                  </h3>
                  <p className="shrink-0 font-mono text-xs text-muted-foreground">
                    <time dateTime={job.start}>{formatRange(job.start, job.end)}</time>
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.location}
                  {job.note && <> · {job.note}</>}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                      <span className="text-foreground/90">{b}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools used">
                  {job.tech.map((t) => (
                    <li key={t}>
                      <TechChip name={t} />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
