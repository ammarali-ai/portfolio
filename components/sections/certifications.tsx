import { Award } from "lucide-react";
import { certifications } from "@/content/education";
import { sections } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { formatYearMonth } from "@/lib/format";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="container-page py-16 md:py-24"
    >
      <SectionHeading copy={sections.certifications} id="certifications-title" />

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <li key={cert.title}>
            <Reveal delay={(i % 4) * 0.04} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-border bg-card/60 p-4">
                <Award className="mb-3 size-5 text-brand" aria-hidden="true" />
                <p className="text-sm leading-snug font-medium">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-brand"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    cert.title
                  )}
                </p>
                <p className="mt-auto pt-3 font-mono text-xs text-muted-foreground">
                  {cert.issuer} · <time dateTime={cert.date}>{formatYearMonth(cert.date)}</time>
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
