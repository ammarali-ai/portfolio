import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/content";
import { TechLogo } from "@/components/tech-logo";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="container-wide py-16 md:py-24 max-w-4xl">
      <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg mb-8">
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2.5 py-0.5 text-[11px] font-mono text-accent-cyan">
            {t}
          </span>
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-4 text-lg text-fg-muted">{project.summary}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost">
            <Github className="h-4 w-4" /> Code
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className="btn-ghost">
            <ExternalLink className="h-4 w-4" /> Demo
          </a>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <TechLogo key={t} name={t} size="md" />
        ))}
      </div>

      {project.cover && (
        <div className="mt-10 relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-bg-subtle">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose-md mt-12 card"
        dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
      />
    </article>
  );
}
