import type { Metadata } from "next";
import Link from "next/link";
import type { ResearchMeta } from "@/content/schema";
import { research } from "@/content/research";
import { researchPage } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Paper explainers and research notes by Muhammad Ammar Ali: Transformers, BERT, RAG, LoRA, agents, CNNs and more, and why they matter to what he builds.",
};

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function Entry({ item }: { item: ResearchMeta }) {
  return (
    <li>
      <article className="glow-border relative h-full rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:bg-card">
        <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <time dateTime={item.date}>{dateFmt.format(new Date(item.date))}</time>
          <span aria-hidden="true">·</span>
          <span>{item.readingMinutes} min read</span>
          {item.draft && (
            <span className="rounded bg-sun/15 px-1.5 py-0.5 text-sun">Draft · dev only</span>
          )}
        </div>
        <h3 className="text-lg font-semibold">
          <Link
            href={`/research/${item.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
          >
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
          {item.tags.map((t) => (
            <li
              key={t}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}

export default function ResearchPage() {
  const notes = research.filter((r) => r.kind === "note");
  const papers = research.filter((r) => r.kind === "paper");

  return (
    <div className="container-page py-14 md:py-20">
      <SectionHeading copy={researchPage} id="research-title" />

      {notes.length > 0 && (
        <section aria-labelledby="notes-title" className="mb-14">
          <h2 id="notes-title" className="mb-5 text-2xl font-semibold">
            Domain notes
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((n) => (
              <Entry key={n.slug} item={n} />
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="papers-title">
        <h2 id="papers-title" className="mb-5 text-2xl font-semibold">
          Paper notes
        </h2>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {papers.map((p) => (
            <Entry key={p.slug} item={p} />
          ))}
        </ul>
      </section>
    </div>
  );
}
