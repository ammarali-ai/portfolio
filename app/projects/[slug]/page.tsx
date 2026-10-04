import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, FlaskConical } from "lucide-react";
import { projects } from "@/content/projects";
import { domains } from "@/content/domains";
import { getFlow } from "@/content/flows";
import { StatusBadge } from "@/components/ui/status-badge";
import { TechChip } from "@/components/ui/tech-chip";
import { LazyFlow } from "@/components/flow/lazy-flow";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { flowSourceLabel } from "@/lib/flow-kinds";
import { formatYearMonth } from "@/lib/format";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.impact };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);
  const flow = project.diagram ? getFlow(project.diagram) : undefined;
  const domain = domains.find((d) => d.id === project.domain);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  type HeaderLink = { href: string; label: string; Icon: typeof ExternalLink | typeof GitHubIcon };
  const candidates: (HeaderLink | null)[] = [
    project.links.github ? { href: project.links.github, label: "Code", Icon: GitHubIcon } : null,
    project.links.hfSpace
      ? { href: project.links.hfSpace, label: "Try it", Icon: FlaskConical }
      : null,
    project.links.demo
      ? { href: project.links.demo, label: "Live demo", Icon: ExternalLink }
      : null,
  ];
  const links = candidates.filter((l): l is HeaderLink => l !== null);

  return (
    <article className="container-page py-14 md:py-20">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All projects
      </Link>

      <header className="max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {domain && (
            <Link
              href={`/#domain-${domain.id}`}
              className="font-mono text-xs tracking-widest text-brand uppercase hover:underline"
            >
              {domain.title}
            </Link>
          )}
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-muted-foreground">
            {formatYearMonth(project.date)}
          </span>
          {flow && (
            <span className="font-mono text-xs text-muted-foreground">· {flow.context}</span>
          )}
        </div>
        <h1 className="text-4xl font-bold sm:text-5xl">{project.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {project.impact}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tech.map((t) => (
            <li key={t}>
              <TechChip name={t} />
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {links.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("/") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:border-brand/50 hover:text-brand"
                >
                  <Icon className="size-4" aria-hidden="true" /> {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="mt-12 max-w-3xl">
        <Body
          components={{
            Diagram: () =>
              flow ? (
                <figure className="-mx-1 my-8 sm:mx-0">
                  <LazyFlow spec={flow} interactive />
                  <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                    {flowSourceLabel[flow.source]} · drag to pan, use the controls to zoom
                  </p>
                </figure>
              ) : null,
          }}
        />

        {project.possibleApplications && (
          <aside className="mt-10 rounded-2xl border border-border bg-card/60 p-5 text-sm">
            <span className="font-semibold">Possible applications: </span>
            <span className="text-muted-foreground">{project.possibleApplications}</span>
          </aside>
        )}
      </div>

      <nav
        aria-label="More projects"
        className="mt-16 grid max-w-3xl gap-3 border-t border-border pt-8 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="rounded-xl border border-border p-4 hover:border-brand/50"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="size-3" aria-hidden="true" /> Previous
            </span>
            <span className="mt-1 block font-semibold">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="rounded-xl border border-border p-4 text-right hover:border-brand/50"
          >
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              Next <ArrowRight className="size-3" aria-hidden="true" />
            </span>
            <span className="mt-1 block font-semibold">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
