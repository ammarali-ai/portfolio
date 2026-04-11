"use client";

import { motion } from "framer-motion";

const USERNAME = "ammarali-ai";
const CONTRIB = `https://ghchart.rshah.org/38bdf8/${USERNAME}`;
const STATS = `https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0a0a0f&icon_color=38bdf8&title_color=a78bfa&text_color=a0a0b4`;
const LANGS = `https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0a0a0f&title_color=a78bfa&text_color=a0a0b4`;

export function GitHubGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-accent-cyan">
            Contribution Activity
          </h3>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-fg-muted hover:text-fg"
          >
            github.com/{USERNAME} →
          </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CONTRIB}
          alt="GitHub contribution graph"
          className="w-full h-auto"
          loading="lazy"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={STATS}
          alt="GitHub stats"
          className="w-full rounded-2xl border border-border"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LANGS}
          alt="Top languages"
          className="w-full rounded-2xl border border-border"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
