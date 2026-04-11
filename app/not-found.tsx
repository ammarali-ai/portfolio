"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-wide relative min-h-[70vh] flex items-center justify-center py-16 overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="h-[24rem] w-[24rem] rounded-full bg-accent-cyan/10 blur-3xl" />
      </div>

      <div className="relative text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[6rem] md:text-[10rem] font-bold leading-none gradient-text tabular-nums select-none"
        >
          4
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            0
          </motion.span>
          4
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 text-xl md:text-2xl font-semibold"
        >
          Signal lost in the latent space.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-3 text-fg-muted"
        >
          The page you&apos;re looking for doesn&apos;t exist — or it drifted off the map.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link href="/projects" className="btn-ghost">
            <Compass className="h-4 w-4" /> Browse projects
          </Link>
          <Link href="/blog" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Read the blog
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
