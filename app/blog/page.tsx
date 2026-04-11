import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { getBlogPosts } from "@/lib/content";

export const metadata = {
  title: "Blog",
  description: "AI research papers, notes, and references I've worked with.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <div className="container-wide py-16 md:py-24 max-w-5xl">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Blog</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">Research Notes</h1>
      <p className="mt-3 text-fg-muted max-w-2xl">
        AI research papers I&apos;ve studied, referenced, or built on — with plain-language summaries and links to my own projects.
      </p>

      <div className="mt-12 grid gap-5">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="card group flex flex-col md:flex-row md:items-start gap-4 hover:border-accent-cyan/40"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30">
              <BookOpen className="h-5 w-5 text-accent-cyan" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1 text-[11px] font-mono text-fg-muted">
                {p.date && <time>{p.date}</time>}
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-border px-2 py-0.5">{t}</span>
                ))}
              </div>
              <h2 className="text-xl font-semibold group-hover:gradient-text transition">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">{p.excerpt}</p>
              {p.authors.length > 0 && (
                <p className="mt-2 text-xs text-fg-muted italic">by {p.authors.join(", ")}</p>
              )}
            </div>
            <ArrowUpRight className="hidden md:block h-4 w-4 text-fg-muted group-hover:text-accent-cyan transition mt-2" />
          </Link>
        ))}
      </div>
    </div>
  );
}
