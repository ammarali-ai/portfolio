import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container-wide py-16 md:py-24 max-w-3xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>

      <div className="flex flex-wrap gap-2 mb-4 text-[11px] font-mono text-fg-muted">
        {post.date && <time>{post.date}</time>}
        {post.tags.map((t) => (
          <span key={t} className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2 py-0.5 text-accent-cyan">
            {t}
          </span>
        ))}
      </div>

      <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">{post.title}</h1>
      <p className="mt-4 text-lg text-fg-muted">{post.excerpt}</p>

      {post.authors.length > 0 && (
        <p className="mt-3 text-sm text-fg-muted italic">by {post.authors.join(", ")}</p>
      )}

      {post.sourceUrl && (
        <a
          href={post.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost mt-6"
        >
          <ExternalLink className="h-4 w-4" /> {post.sourceTitle || "Source paper"}
        </a>
      )}

      <div
        className="prose-md mt-12 card"
        dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
      />
    </article>
  );
}
