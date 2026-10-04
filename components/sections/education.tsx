import { CalendarDays, GraduationCap } from "lucide-react";
import { education, events } from "@/content/education";
import { sections } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { formatRange, formatYearMonth } from "@/lib/format";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="container-page py-16 md:py-24"
    >
      <SectionHeading copy={sections.education} id="education-title" />

      <div className="grid gap-4 lg:grid-cols-2">
        {education.map((ed) => (
          <Reveal key={ed.degree} className="h-full">
            <article className="glow-border relative h-full rounded-2xl border border-border bg-card/70 p-6">
              <GraduationCap className="mb-4 size-7 text-brand" aria-hidden="true" />
              <h3 className="text-xl font-semibold">{ed.degree}</h3>
              <p className="mt-1 text-muted-foreground">
                {ed.institution} · {ed.location}
              </p>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                <time dateTime={ed.start}>{formatRange(ed.start, ed.end)}</time>
                {ed.grade && <> · {ed.grade}</>}
              </p>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.06} className="h-full">
          <div className="h-full rounded-2xl border border-border bg-card/60 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <CalendarDays className="size-5 text-brand-2" aria-hidden="true" />
              Conferences & events
            </h3>
            <ul className="space-y-3">
              {events.map((ev) => (
                <li key={ev.title} className="flex items-baseline justify-between gap-4 text-sm">
                  <span>
                    <span className="font-medium">{ev.title}</span>
                    <span className="block text-muted-foreground">{ev.host}</span>
                  </span>
                  <time
                    dateTime={ev.date}
                    className="shrink-0 font-mono text-xs text-muted-foreground"
                  >
                    {formatYearMonth(ev.date)}
                  </time>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
