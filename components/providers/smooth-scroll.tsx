"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/**
 * Lenis smooth scrolling for the whole page. Wraps the app so `useLenis()` works anywhere.
 * For prefers-reduced-motion, wheel smoothing is off and anchor jumps are instant.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <ReactLenis
      root
      options={
        reduceMotion
          ? { smoothWheel: false, anchors: { offset: -88, immediate: true }, autoRaf: true }
          : { lerp: 0.12, anchors: { offset: -88 }, autoRaf: true }
      }
    >
      {children}
    </ReactLenis>
  );
}
