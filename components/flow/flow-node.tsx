"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { FlowNodeKind } from "@/content/schema";
import { NODE_HEIGHT, NODE_WIDTH, type FlowDirection } from "@/lib/flow-layout";
import { flowKinds } from "@/lib/flow-kinds";
import { cn } from "@/lib/utils";

export type StepState = "idle" | "active" | "done";

export type FlowNodeData = {
  label: string;
  kind: FlowNodeKind;
  detail?: string;
  state: StepState;
  direction: FlowDirection;
  /** Right-to-left row of a wrapped layout: input on the right, output on the left. */
  flip: boolean;
};

export type FlowRFNode = Node<FlowNodeData, "step">;

const stateClass: Record<StepState, string> = {
  idle: "border-border opacity-75",
  active: "scale-[1.04] border-brand opacity-100 shadow-[0_0_28px_-6px_var(--brand)]",
  done: "border-brand/40 opacity-100",
};

export function FlowNode({ data }: NodeProps<FlowRFNode>) {
  const { Icon, chip, label: kindLabel } = flowKinds[data.kind];
  const lr = data.direction === "LR";
  const targetPos = !lr ? Position.Top : data.flip ? Position.Right : Position.Left;
  const sourcePos = !lr ? Position.Bottom : data.flip ? Position.Left : Position.Right;

  return (
    <div
      title={data.detail}
      style={{ width: NODE_WIDTH, height: NODE_HEIGHT }}
      className={cn(
        "flex items-center gap-2.5 rounded-xl border bg-card px-3 transition-[transform,box-shadow,border-color,opacity] duration-300",
        stateClass[data.state],
      )}
    >
      <Handle
        type="target"
        position={targetPos}
        isConnectable={false}
        className="!border-0 !bg-transparent"
      />
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-lg border transition-colors",
          chip,
          data.state === "active" && "animate-pulse",
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
          {kindLabel}
        </span>
        <span className="line-clamp-2 text-[13px] leading-tight font-medium text-foreground">
          {data.label}
        </span>
      </span>
      <Handle
        type="source"
        position={sourcePos}
        isConnectable={false}
        className="!border-0 !bg-transparent"
      />
    </div>
  );
}
