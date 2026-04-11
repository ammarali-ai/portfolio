"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ProfilePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative inline-block"
    >
      {/* Animated gradient ring */}
      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan opacity-70 blur-lg animate-gradient-shift [background-size:200%_200%]" />
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet" />

      {/* Floating photo */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-full overflow-hidden border-2 border-bg size-40 md:size-48"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 12rem, 10rem"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Status dot */}
      <span className="absolute bottom-2 right-2 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-bg" />
      </span>
    </motion.div>
  );
}
