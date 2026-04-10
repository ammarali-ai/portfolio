import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/content";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="container-wide py-16 md:py-24">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Projects</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">Selected Work</h1>
      <p className="mt-3 text-fg-muted max-w-2xl">
        AI, machine learning, computer vision, and automation projects — built end-to-end.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}
