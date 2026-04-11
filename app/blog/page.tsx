import { getBlogPosts } from "@/lib/content";
import { BlogList } from "@/components/blog-list";

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
        AI research papers I&apos;ve studied, referenced, or built on — with plain-language
        summaries and links to my own projects.
      </p>

      <BlogList initial={posts} />
    </div>
  );
}
