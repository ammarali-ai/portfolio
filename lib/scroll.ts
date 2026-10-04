"use client";

import type Lenis from "lenis";

/**
 * Smooth-scroll to an element id (Lenis when active, native otherwise) and briefly
 * highlight it via [data-highlight] (see globals.css).
 */
export function scrollToId(id: string, lenis?: Lenis) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenis && !reduce) lenis.scrollTo(el, { offset: -96, duration: 1.2 });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  el.setAttribute("data-highlight", "true");
  window.setTimeout(() => el.removeAttribute("data-highlight"), 1800);
}
