"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/** Lenis smooth scrolling for the whole page; disabled for prefers-reduced-motion. */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return <ReactLenis root options={{ lerp: 0.12, anchors: { offset: -88 }, autoRaf: true }} />;
}
