"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  MessageCircle,
  BarChart3,
  Shuffle,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import type { SoftSkill } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  Lightbulb,
  Users,
  MessageCircle,
  BarChart3,
  Shuffle,
  GraduationCap,
};

export function SoftSkillsSection({ items }: { items: SoftSkill[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => {
        const Icon = ICONS[s.icon] ?? Lightbulb;
        return (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="card group"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 group-hover:scale-110 transition">
                <Icon className="h-5 w-5 text-accent-cyan" />
              </div>
              <h3 className="font-semibold">{s.name}</h3>
            </div>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed">{s.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
