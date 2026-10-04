import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { domains } from "@/content/domains";
import { projectsPage } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectExplorer } from "@/components/projects/project-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All projects by Muhammad Ammar Ali: AI automation, LLM apps, NLP and computer vision, with case studies and animated architectures.",
};

export default function ProjectsPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <SectionHeading copy={projectsPage} id="projects-title" />
      <ProjectExplorer
        projects={projects}
        domains={domains.map(({ id, title }) => ({ id, title }))}
      />
    </div>
  );
}
