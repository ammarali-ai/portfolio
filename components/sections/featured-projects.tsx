import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, FlaskConical } from "lucide-react";
import type { ProjectMeta } from "@/content/schema";
import { featuredProjects, projects } from "@/content/projects";
import { domains } from "@/content/domains";
import { moreProjectsTitle, sections } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import { TechChip } from "@/components/ui/tech-chip";
import { Reveal } from "@/components/ui/reveal";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { FlowDialogButton } from "@/components/flow/flow-dialog-button";
import { getFlow } from "@/content/flows";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const otherProjects = projects.filter((p) => !p.featured);

const domainTitle = (id: ProjectMeta["domain"]) => domains.find((d) => d.id === id)?.title ?? id;

interface CardLink {
  href: string;
  label: string;
  Icon: typeof ExternalLink | typeof GitHubIcon;
}

function ProjectLinks({ project }: { project: ProjectMeta }) {
  const { github, demo, hfSpace } = project.links;
  const candidates: (CardLink | null)[] = [
    github ? { href: github, label: "Code", Icon: GitHubIcon } : null,
    hfSpace ? { href: hfSpace, label: "Try it", Icon: FlaskConical } : null,
    demo ? { href: demo, label: "Live demo", Icon: ExternalLink } : null,
  ];
  const links = candidates.filter((l): l is CardLink => l !== null);

  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      <li>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
        >
          <BookOpen className="size-3.5" aria-hidden="true" />
          Case study
          <span className="sr-only"> for {project.title}</span>
        </Link>
      </li>
      {project.diagram && (
        <li>
          <FlowDialogButton spec={getFlow(project.diagram)} projectTitle={project.title} />
        </li>
      )}
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {label}
            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function FlowChain({ steps }: { steps: readonly string[] }) {
  return (
    <ol
      aria-label="How it works"
      className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono text-xs"
    >
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-1.5">
          <span className="rounded-md border border-brand/30 bg-brand/10 px-2 py-1 text-brand">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="text-muted-foreground">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function ProjectCard({ project, large }: { project: ProjectMeta; large: boolean }) {
  return (
    <article
      id={`project-${project.slug}`}
      aria-labelledby={`project-${project.slug}-title`}
      className={cn(
        "glow-border relative flex h-full flex-col rounded-2xl border border-border bg-card/70 p-6 transition-colors hover:bg-card",
        large && "md:p-8",
      )}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] tracking-widest text-brand uppercase">
          {domainTitle(project.domain)}
        </span>
        <StatusBadge status={project.status} className="ml-auto" />
      </div>

      <h3
        id={`project-${project.slug}-title`}
        className={cn("font-semibold", large ? "text-2xl md:text-3xl" : "text-xl")}
      >
        {project.title}
      </h3>
      <p className={cn("mt-3 text-foreground/90", large ? "text-base md:text-lg" : "text-sm")}>
        {project.impact}
      </p>

      {large && (
        <>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {project.summary}
          </p>
          {project.possibleApplications && (
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Possible applications: </span>
              {project.possibleApplications}
            </p>
          )}
          {project.flow && <FlowChain steps={project.flow} />}
        </>
      )}

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Tech stack">
        {project.tech.map((t) => (
          <li key={t}>
            <TechChip name={t} />
          </li>
        ))}
      </ul>
      <ProjectLinks project={project} />
    </article>
  );
}

/** Bento grid: the first project is the large feature card. */
export function FeaturedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="container-page py-16 md:py-24"
    >
      <SectionHeading copy={sections.projects} id="projects-title" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 3) * 0.06}
            className={cn(i === 0 && "md:col-span-2 lg:row-span-2")}
          >
            <ProjectCard project={project} large={i === 0} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/projects" className={buttonVariants({ variant: "outline", size: "lg" })}>
          All {projects.length} projects with case studies
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Link>
      </div>

      {otherProjects.length > 0 && (
        <>
          <h3 className="mt-14 mb-5 text-xl font-semibold">{moreProjectsTitle}</h3>
          <ul className="grid gap-3 md:grid-cols-3">
            {otherProjects.map((project) => (
              <li
                key={project.slug}
                id={`project-${project.slug}`}
                className="flex flex-col rounded-xl border border-border bg-card/60 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h4 className="font-semibold">
                    <Link href={`/projects/${project.slug}`} className="hover:text-brand">
                      {project.title}
                    </Link>
                  </h4>
                  <StatusBadge status={project.status} />
                </div>
                <p className="text-sm text-muted-foreground">{project.impact}</p>
                <div className="mt-auto pt-4">
                  <ProjectLinks project={project} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
