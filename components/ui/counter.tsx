"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

interface Props {
  value: number;
  suffix?: string;
}

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Counts up from 0 when scrolled into view. The final value is server-rendered
 * (for no-JS and crawlers) and announced to screen readers; the animated digits are hidden from them.
 */
export function Counter({ value, suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    if (!inView) {
      el.textContent = "0";
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <>
      <span aria-hidden="true">
        <span ref={ref}>{format(value)}</span>
        {suffix}
      </span>
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
    </>
  );
}
