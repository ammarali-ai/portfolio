"use client";

import { motion } from "framer-motion";
import type { SkillCategory } from "@/lib/content";

export function SkillsGrid({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="card"
        >
          <h3 className="text-sm font-mono text-accent-cyan uppercase tracking-wider">
            {cat.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {cat.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-bg-subtle px-2.5 py-1 text-xs text-fg-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function SkillsMarquee({ categories }: { categories: SkillCategory[] }) {
  const all = categories.flatMap((c) => c.items);
  const doubled = [...all, ...all];
  return (
    <div className="relative overflow-hidden border-y border-border/60 py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex gap-4 animate-marquee whitespace-nowrap">
        {doubled.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="font-mono text-sm text-fg-muted px-4 py-1.5 rounded-full border border-border bg-bg-card/40"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
