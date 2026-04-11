"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((t, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="card relative"
        >
          <Quote className="absolute top-5 right-5 h-6 w-6 text-accent-cyan/20" />
          <blockquote className="text-sm md:text-base text-fg leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 pt-4 border-t border-border/60">
            <p className="text-sm font-semibold">{t.author}</p>
            <p className="text-xs text-fg-muted">
              {t.role}
              {t.company && ` · ${t.company}`}
            </p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
