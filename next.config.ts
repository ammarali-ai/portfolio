import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a local preview build live beside the dev build (NEXT_DIST_DIR=.next-preview).
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // The assistant reads content/knowledge.md at runtime; make sure it ships with the function.
  outputFileTracingIncludes: {
    "/api/chat": ["./content/knowledge.md"],
  },
};

export default nextConfig;
