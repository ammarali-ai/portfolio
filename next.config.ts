import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Lets a local preview build live beside the dev build (NEXT_DIST_DIR=.next-preview).
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // The assistant reads content/knowledge.md at runtime; make sure it ships with the function.
  outputFileTracingIncludes: {
    "/api/chat": ["./content/knowledge.md"],
  },
};

// MDX for case studies (content/case-studies) and research (content/research).
// Plugins are referenced by name so they work with Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
