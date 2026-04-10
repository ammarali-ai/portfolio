import { Timeline } from "@/components/timeline";
import { getExperience } from "@/lib/content";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  const items = getExperience();
  return (
    <div className="container-wide py-16 md:py-24 max-w-4xl">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Experience</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">Career Timeline</h1>
      <p className="mt-3 text-fg-muted max-w-2xl">
        From Python internships to AI automation engineering at Metaviz.
      </p>
      <div className="mt-12">
        <Timeline items={items} />
      </div>
    </div>
  );
}
