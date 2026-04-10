"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";

type HeroProps = {
  name: string;
  role: string;
  title: string;
  bio: string;
};

export function Hero({ name, role, title, bio }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent-cyan/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-violet/20 blur-3xl" />

      <div className="container-wide relative py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/60 backdrop-blur px-3 py-1 text-xs text-fg-muted mb-6"
        >
          <Sparkles className="h-3 w-3 text-accent-cyan" />
          <span>Available for AI & Automation projects</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          {name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="gradient-text">{name.split(" ").slice(-1)[0]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-fg-muted font-mono"
        >
          {title} · {role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base md:text-lg text-fg-muted leading-relaxed"
        >
          {bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link href="/projects" className="btn-primary">
            View Projects <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/resume" className="btn-ghost">
            <Download className="h-4 w-4" /> Resume
          </Link>
        </motion.div>

        {/* Hero signature watermark */}
        <div className="mt-12 font-mono text-xs text-fg-muted/50 select-none">
          — signed, Muhammad Ammar Ali
        </div>
      </div>
    </section>
  );
}
