"use client";

import "@xyflow/react/dist/style.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controls, ReactFlow, type EdgeTypes, type NodeTypes } from "@xyflow/react";
import { useReducedMotion } from "motion/react";
import type { FlowSpec } from "@/content/schema";
import { computeRanks, FIT_PADDING, layoutFlow, type LayoutOptions } from "@/lib/flow-layout";
import { FlowNode, type FlowRFNode, type StepState } from "./flow-node";
import { FlowEdge, type EdgeState, type FlowRFEdge } from "./flow-edge";

const nodeTypes: NodeTypes = { step: FlowNode };
const edgeTypes: EdgeTypes = { pulse: FlowEdge };

const STEP_MS = 900;
const HOLD_MS = 2000;

export interface FlowDiagramProps {
  spec: FlowSpec;
  layout: LayoutOptions;
  /** Allow pan / pinch-zoom and show zoom controls (galleries, dialogs). */
  interactive?: boolean;
}

/**
 * Animated flow: nodes light up rank by rank while pulses travel along the edges.
 * Plays while visible, pauses off-screen, and shows the finished state for reduced motion.
 */
export default function FlowDiagram({
  spec,
  layout: options,
  interactive = false,
}: FlowDiagramProps) {
  const { direction } = options;
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [step, setStep] = useState(-1);
  const [cycle, setCycle] = useState(0);

  const ranks = useMemo(() => computeRanks(spec), [spec]);
  const maxRank = useMemo(() => Math.max(0, ...ranks.values()), [ranks]);
  const layout = useMemo(() => layoutFlow(spec, options), [spec, options]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Step sequencer: -1 → 0 … maxRank, then everything "done", hold, and loop.
  useEffect(() => {
    if (!inView || reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const run = (s: number) => {
      setStep(s);
      if (s > maxRank) {
        timer = setTimeout(() => {
          setCycle((c) => c + 1);
          run(0);
        }, HOLD_MS);
      } else {
        timer = setTimeout(() => run(s + 1), STEP_MS);
      }
    };
    run(0);
    return () => clearTimeout(timer);
  }, [inView, reduceMotion, maxRank]);

  const current = reduceMotion ? Number.POSITIVE_INFINITY : step;

  const nodes: FlowRFNode[] = useMemo(() => {
    const pos = new Map(layout.map((n) => [n.id, n]));
    return spec.nodes.map((n) => {
      const rank = ranks.get(n.id) ?? 0;
      const state: StepState = rank < current ? "done" : rank === current ? "active" : "idle";
      const p = pos.get(n.id)!;
      return {
        id: n.id,
        type: "step",
        position: { x: p.x, y: p.y },
        data: { label: n.label, kind: n.kind, detail: n.detail, state, direction, flip: p.flip },
        draggable: false,
        selectable: false,
      };
    });
  }, [spec, layout, ranks, current, direction]);

  const edges: FlowRFEdge[] = useMemo(
    () =>
      spec.edges.map(([source, target, label], i) => {
        const s = ranks.get(source) ?? 0;
        const t = ranks.get(target) ?? 0;
        const state: EdgeState =
          t < current ? "done" : t === current && s < current ? "flowing" : "idle";
        return {
          id: `${source}-${target}-${i}`,
          source,
          target,
          type: "pulse",
          data: { state, label, pulseKey: `${cycle}-${current}`, pulseMs: STEP_MS * 0.85 },
        };
      }),
    [spec, ranks, current, cycle],
  );

  return (
    <div ref={ref} className="h-full w-full">
      <ReactFlow
        key={`${direction}-${options.wrap ?? 0}`}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: FIT_PADDING, maxZoom: 1 }}
        minZoom={0.25}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={interactive}
        zoomOnScroll={false}
        zoomOnPinch={interactive}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      >
        {interactive && <Controls showInteractive={false} position="bottom-right" />}
      </ReactFlow>
    </div>
  );
}
