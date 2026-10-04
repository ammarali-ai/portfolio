import { skillGroups } from "@/content/skills";
import { sections } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="container-page py-16 md:py-24">
      <SectionHeading copy={sections.skills} id="skills-title" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.category} delay={(i % 3) * 0.05} className="h-full">
            <div className="h-full rounded-2xl border border-border bg-card/60 p-5">
              <h3 className="mb-3 font-mono text-xs tracking-widest text-brand uppercase">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-background/60 px-2 py-1 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
