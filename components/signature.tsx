"use client";

import { motion } from "framer-motion";

export function Signature({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "1.5rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="block h-px bg-gradient-to-r from-transparent to-accent-cyan"
      />
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-signature text-3xl md:text-4xl gradient-text italic leading-none"
        style={{ letterSpacing: "0.02em" }}
      >
        Muhammad Ammar Ali
      </motion.span>
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "1.5rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="block h-px bg-gradient-to-l from-transparent to-accent-violet"
      />
    </motion.div>
  );
}
