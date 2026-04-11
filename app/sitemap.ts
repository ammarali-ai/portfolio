import type { MetadataRoute } from "next";
import { getProjects, getBlogPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["", "/about", "/projects", "/skills", "/experience", "/certifications", "/blog", "/contact", "/resume"];
  const staticEntries = routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
  }));
  const projects = await getProjects();
  const projectEntries = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
  }));
  const posts = await getBlogPosts();
  const postEntries = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date || Date.now()),
  }));
  return [...staticEntries, ...projectEntries, ...postEntries];
}
