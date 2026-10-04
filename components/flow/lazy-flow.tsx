"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FlowSpec } from "@/content/schema";
import { chooseLayout, computeRanks, layoutFlow, layoutHeight } from "@/lib/flow-layout";
import { cn } from "@/lib/utils";

const FlowDiagram = dynamic(() => import("./flow-diagram"), { ssr: false });

interface Props {
  spec: FlowSpec;
  interactive?: boolean;
  className?: string;
}

/** Width assumed before the first measurement (desktop container). */
const DEFAULT_WIDTH = 1088;

/**
 * Server-rendered shell for a flow diagram: sizes itself from the real layout (long flows
 * snake into rows so nodes stay readable), carries an accessible text version of the steps,
 * and only downloads React Flow when the diagram is about to scroll into view.
 */
export function LazyFlow({ spec, interactive = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  const options = useMemo(() => chooseLayout(spec, width), [spec, width]);
  const height = useMemo(
    () => Math.max(180, layoutHeight(layoutFlow(spec, options), width)),
    [spec, options, width],
  );
  const ordered = useMemo(() => {
    const r = computeRanks(spec);
    return [...spec.nodes].sort((a, b) => (r.get(a.id) ?? 0) - (r.get(b.id) ?? 0));
  }, [spec]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    // Snap to 32px buckets so tiny resizes don't re-layout.
    const ro = new ResizeObserver(([entry]) =>
      setWidth(Math.round(entry.contentRect.width / 32) * 32),
    );
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <figure className={cn("relative", className)}>
      <div
        ref={ref}
        // Decorative when non-interactive (the figcaption carries the content); interactive
        // diagrams keep their zoom controls reachable by keyboard.
        aria-hidden={interactive ? undefined : true}
        style={{ height }}
        className="overflow-hidden rounded-2xl border border-border bg-background/40"
      >
        {near ? (
          <FlowDiagram spec={spec} layout={options} interactive={interactive} />
        ) : (
          <div className="grid h-full place-items-center font-mono text-xs text-muted-foreground">
            Loading diagram…
          </div>
        )}
      </div>
      <figcaption className="sr-only">
        {spec.title}: {spec.description}
        <ol>
          {ordered.map((n) => (
            <li key={n.id}>
              {n.label}
              {n.detail ? `: ${n.detail}` : ""}
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
