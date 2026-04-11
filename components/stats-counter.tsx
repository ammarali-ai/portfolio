"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

function useCountUp(target: number, inView: boolean, duration = 1500) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return n;
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const n = useCountUp(stat.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card group text-center hover:shadow-[0_0_40px_rgb(var(--accent-cyan)/0.15)] px-3 py-5 sm:px-6 sm:py-6"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text tabular-nums leading-none">
        {n}
        {stat.suffix}
      </div>
      <div className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-fg-muted leading-snug">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <StatCard key={s.label} stat={s} index={i} />
      ))}
    </div>
  );
}
