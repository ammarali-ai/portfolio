import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  /** Stagger in "seconds" (0.05–0.1 steps); shifts where in the scroll the reveal starts. */
  delay?: number;
}

/**
 * Fade-up as the element scrolls into view, using a CSS scroll-driven animation (see `.reveal`
 * in globals.css). Progressive enhancement: content is visible by default and only animates
 * in browsers that support `animation-timeline: view()` and don't prefer reduced motion.
 * No JavaScript, so content can never get stuck invisible.
 */
export function Reveal({ children, className, delay = 0 }: Props) {
  const style = delay ? ({ "--reveal-start": `${delay * 100}%` } as CSSProperties) : undefined;
  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
