"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Star } from "lucide-react";
import type { Project } from "@/lib/content";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card group relative flex flex-col"
    >
      {project.featured && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 px-2 py-0.5 text-[10px] font-medium text-accent-cyan">
          <Star className="h-3 w-3" /> Featured
        </div>
      )}

      <Link href={`/projects/${project.slug}`} className="flex-1">
        <h3 className="text-xl font-semibold tracking-tight group-hover:gradient-text transition">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-fg-muted leading-relaxed">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-bg-subtle px-2 py-0.5 text-[11px] font-mono text-fg-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </Link>

      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-fg-muted hover:text-fg"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="text-fg-muted hover:text-fg"
              aria-label="Live demo"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs text-accent-cyan group-hover:gap-2 transition-all"
        >
          Case study <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.article>
  );
}
