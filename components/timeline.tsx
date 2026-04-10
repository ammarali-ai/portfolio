"use client";

import { motion } from "framer-motion";
import type { ExperienceItem } from "@/lib/content";

export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative border-l-2 border-border/60 pl-6 space-y-10">
      {items.map((item, i) => (
        <motion.li
          key={`${item.company}-${i}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="relative"
        >
          <span className="absolute -left-[33px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-bg border-2 border-accent-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
          </span>

          <div className="card">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{item.role}</h3>
              <time className="font-mono text-xs text-fg-muted">
                {item.start} – {item.end}
              </time>
            </div>
            <p className="text-sm text-accent-cyan font-medium mt-0.5">{item.company}</p>
            <ul className="mt-4 space-y-2">
              {item.bullets.map((b, idx) => (
                <li key={idx} className="text-sm text-fg-muted flex gap-2">
                  <span className="text-accent-violet mt-1">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
