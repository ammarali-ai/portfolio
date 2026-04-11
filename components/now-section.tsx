"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";

export function NowSection({ status, updated }: { status: string; updated: string }) {
  if (!status) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="card flex items-start gap-4"
    >
      <div className="relative mt-1 shrink-0">
        <span className="absolute inset-0 inline-flex h-3 w-3 animate-ping rounded-full bg-accent-cyan opacity-60" />
        <Radio className="relative h-5 w-5 text-accent-cyan" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
          Now · {updated}
        </p>
        <p className="mt-1 text-base text-fg leading-relaxed">{status}</p>
      </div>
    </motion.div>
  );
}
