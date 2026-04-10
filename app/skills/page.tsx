import { SkillsGrid } from "@/components/skills-grid";
import { getSkills } from "@/lib/content";

export const metadata = { title: "Skills" };

export default function SkillsPage() {
  const skills = getSkills();
  return (
    <div className="container-wide py-16 md:py-24">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Skills</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">Core Stack</h1>
      <p className="mt-3 text-fg-muted max-w-2xl">
        Tools and frameworks I use to build AI, ML, and automation systems.
      </p>
      <div className="mt-12">
        <SkillsGrid categories={skills} />
      </div>
    </div>
  );
}
