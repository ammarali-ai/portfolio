"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";

export type EdgeState = "idle" | "flowing" | "done";

export type FlowEdgeData = {
  state: EdgeState;
  label?: string;
  /** Changes every animation step so the pulse restarts. */
  pulseKey: string;
  pulseMs: number;
};

export type FlowRFEdge = Edge<FlowEdgeData, "pulse">;

/** SMIL animations inserted after page load must be started explicitly. */
function startAnimation(el: SVGAnimationElement | null) {
  el?.beginElement();
}

export function FlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<FlowRFEdge>) {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 14,
  });
  const state = data?.state ?? "idle";
  const lit = state !== "idle";

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke: lit ? "var(--brand)" : "var(--border)",
          strokeWidth: lit ? 1.75 : 1.25,
          opacity: state === "done" ? 0.55 : 1,
          transition: "stroke 300ms, opacity 300ms",
        }}
      />
      {state === "flowing" && data && (
        <circle
          key={data.pulseKey}
          r={4.5}
          style={{ fill: "var(--brand)", filter: "drop-shadow(0 0 6px var(--brand))" }}
        >
          <animateMotion
            ref={startAnimation}
            begin="indefinite"
            dur={`${data.pulseMs}ms`}
            path={path}
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.4 0 0.2 1"
          />
        </circle>
      )}
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
            className="pointer-events-none absolute rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
