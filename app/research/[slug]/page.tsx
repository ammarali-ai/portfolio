import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { research, getResearch } from "@/content/research";
import { domains } from "@/content/domains";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getResearch(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    robots: item.draft ? { index: false } : undefined,
  };
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ResearchArticle({ params }: Props) {
  const { slug } = await params;
  const item = getResearch(slug);
  if (!item) notFound();

  const { default: Body } = await import(`@/content/research/${slug}.mdx`);
  const domain = item.domain ? domains.find((d) => d.id === item.domain) : undefined;
  const index = research.findIndex((r) => r.slug === slug);
  const newer = research[index - 1];
  const older = research[index + 1];

  return (
    <article className="container-page py-14 md:py-20">
      <Link
        href="/research"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All research
      </Link>

      <header className="max-w-3xl">
        <p className="mb-3 font-mono text-xs tracking-widest text-brand uppercase">
          {item.kind === "paper" ? "Paper note" : "Research note"}
          {item.draft && <span className="ml-2 text-sun">· draft (dev only)</span>}
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">{item.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{item.excerpt}</p>
        <p className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <time dateTime={item.date}>{dateFmt.format(new Date(item.date))}</time>
          <span aria-hidden="true">·</span>
          <span>{item.readingMinutes} min read</span>
          {item.authors && (
            <>
              <span aria-hidden="true">·</span>
              <span>Paper by {item.authors.join(", ")}</span>
            </>
          )}
        </p>
      </header>

      <div className="mt-10 max-w-3xl">
        <Body />

        {item.source && (
          <aside className="mt-10 flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-5 text-sm">
            <BookOpen className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
            <div>
              <p className="font-semibold">Source</p>
              <a
                href={item.source.url}
                target="_blank"
                rel="noreferrer"
                className="text-brand underline-offset-4 hover:underline"
              >
                {item.source.title}
              </a>
            </div>
          </aside>
        )}
        {domain && (
          <p className="mt-8 text-sm text-muted-foreground">
            Part of my research domain{" "}
            <Link href={`/#domain-${domain.id}`} className="text-brand hover:underline">
              {domain.title}
            </Link>
            .
          </p>
        )}
      </div>

      <nav
        aria-label="More research"
        className="mt-16 grid max-w-3xl gap-3 border-t border-border pt-8 sm:grid-cols-2"
      >
        {newer ? (
          <Link
            href={`/research/${newer.slug}`}
            className="rounded-xl border border-border p-4 hover:border-brand/50"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="size-3" aria-hidden="true" /> Newer
            </span>
            <span className="mt-1 block font-semibold">{newer.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {older && (
          <Link
            href={`/research/${older.slug}`}
            className="rounded-xl border border-border p-4 text-right hover:border-brand/50"
          >
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              Older <ArrowRight className="size-3" aria-hidden="true" />
            </span>
            <span className="mt-1 block font-semibold">{older.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
