import type { FlowSpec } from "@/content/schema";

export type FlowDirection = "LR" | "TB";

export interface LayoutOptions {
  direction: FlowDirection;
  /** LR only: max ranks per row; longer flows snake into alternating rows. */
  wrap?: number;
}

export interface LaidOutNode {
  id: string;
  rank: number;
  x: number;
  y: number;
  /** True on right-to-left rows of a wrapped layout (handles swap sides). */
  flip: boolean;
}

export const NODE_WIDTH = 184;
export const NODE_HEIGHT = 64;
const GAP_MAIN = 64; // between ranks
const GAP_CROSS = 22; // between siblings
const ROW_GAP = 56; // between wrapped rows
/** fitView padding used by the renderer; also used to size the container. */
export const FIT_PADDING = 0.1;

/**
 * Longest-path rank for every node (sources = 0). Edges that would close a cycle are ignored.
 * Ranks also drive the animation: rank N lights up at step N.
 */
export function computeRanks(spec: FlowSpec): Map<string, number> {
  const ranks = new Map<string, number>(spec.nodes.map((n) => [n.id, 0]));
  const incoming = new Map<string, number>(spec.nodes.map((n) => [n.id, 0]));
  const outgoing = new Map<string, string[]>(spec.nodes.map((n) => [n.id, []]));
  for (const [from, to] of spec.edges) {
    if (!ranks.has(from) || !ranks.has(to)) continue;
    outgoing.get(from)!.push(to);
    incoming.set(to, (incoming.get(to) ?? 0) + 1);
  }

  // Kahn's algorithm, relaxing ranks along the way.
  const queue = spec.nodes.filter((n) => incoming.get(n.id) === 0).map((n) => n.id);
  while (queue.length) {
    const id = queue.shift()!;
    for (const next of outgoing.get(id) ?? []) {
      ranks.set(next, Math.max(ranks.get(next)!, ranks.get(id)! + 1));
      const left = incoming.get(next)! - 1;
      incoming.set(next, left);
      if (left === 0) queue.push(next);
    }
  }
  return ranks;
}

/** Layered layout. LR flows longer than `wrap` ranks snake across rows (boustrophedon). */
export function layoutFlow(spec: FlowSpec, { direction, wrap }: LayoutOptions): LaidOutNode[] {
  const ranks = computeRanks(spec);
  const byRank = new Map<number, string[]>();
  for (const node of spec.nodes) {
    const r = ranks.get(node.id) ?? 0;
    byRank.set(r, [...(byRank.get(r) ?? []), node.id]);
  }

  // Order siblings by the average position of their parents to reduce crossings.
  const parents = new Map<string, string[]>();
  for (const [from, to] of spec.edges) parents.set(to, [...(parents.get(to) ?? []), from]);
  const order = new Map<string, number>(); // centred index within its rank
  for (const r of [...byRank.keys()].sort((a, b) => a - b)) {
    const ids = byRank.get(r)!;
    const score = (id: string) => {
      const ps = (parents.get(id) ?? []).filter((p) => order.has(p));
      return ps.length ? ps.reduce((s, p) => s + order.get(p)!, 0) / ps.length : ids.indexOf(id);
    };
    ids.sort((a, b) => score(a) - score(b));
    ids.forEach((id, i) => order.set(id, i - (ids.length - 1) / 2));
  }

  if (direction === "TB") {
    const mainStep = NODE_HEIGHT + GAP_MAIN * 0.6;
    const crossStep = NODE_WIDTH + GAP_CROSS;
    return spec.nodes.map((node) => {
      const rank = ranks.get(node.id) ?? 0;
      return {
        id: node.id,
        rank,
        x: (order.get(node.id) ?? 0) * crossStep,
        y: rank * mainStep,
        flip: false,
      };
    });
  }

  const totalRanks = Math.max(0, ...ranks.values()) + 1;
  const perRow = wrap && wrap < totalRanks ? wrap : totalRanks;
  const mainStep = NODE_WIDTH + GAP_MAIN;
  const crossStep = NODE_HEIGHT + GAP_CROSS;

  // Height of each row = its widest rank.
  const rowCount = Math.ceil(totalRanks / perRow);
  const rowBreadth = Array.from({ length: rowCount }, (_, row) => {
    let max = 1;
    for (let r = row * perRow; r < Math.min(totalRanks, (row + 1) * perRow); r++) {
      max = Math.max(max, byRank.get(r)?.length ?? 0);
    }
    return max;
  });
  const rowCentre: number[] = [];
  let y = 0;
  for (let row = 0; row < rowCount; row++) {
    const h = rowBreadth[row] * crossStep;
    rowCentre.push(y + h / 2);
    y += h + ROW_GAP;
  }

  return spec.nodes.map((node) => {
    const rank = ranks.get(node.id) ?? 0;
    const row = Math.floor(rank / perRow);
    const flip = row % 2 === 1;
    const col = flip ? perRow - 1 - (rank % perRow) : rank % perRow;
    return {
      id: node.id,
      rank,
      x: col * mainStep,
      y: rowCentre[row] + (order.get(node.id) ?? 0) * crossStep,
      flip,
    };
  });
}

/** Choose layout options that keep nodes readable (≥ ~70% scale) in a container this wide. */
export function chooseLayout(spec: FlowSpec, containerWidth: number): LayoutOptions {
  if (containerWidth < 640) return { direction: "TB" };
  const totalRanks = Math.max(0, ...computeRanks(spec).values()) + 1;
  const fits = Math.max(
    3,
    Math.floor(containerWidth / ((NODE_WIDTH + GAP_MAIN) * 0.72 * (1 + FIT_PADDING))),
  );
  if (totalRanks <= fits) return { direction: "LR" };
  const rows = Math.ceil(totalRanks / fits);
  return { direction: "LR", wrap: Math.ceil(totalRanks / rows) };
}

/** Pixel height that lets the whole layout fit at the width-limited zoom (max zoom 1). */
export function layoutHeight(nodes: LaidOutNode[], containerWidth: number): number {
  const xs = nodes.map((n) => n.x);
  const ys = nodes.map((n) => n.y);
  const w = Math.max(...xs) - Math.min(...xs) + NODE_WIDTH;
  const h = Math.max(...ys) - Math.min(...ys) + NODE_HEIGHT;
  const zoom = Math.min(1, containerWidth / (w * (1 + FIT_PADDING)));
  return Math.round(h * (1 + FIT_PADDING) * zoom + 28);
}
