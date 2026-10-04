import type {
  FlowEdgeSpec,
  FlowNodeKind,
  FlowNodeSpec,
  FlowSpec,
  N8nSanitizedExport,
} from "@/content/schema";

const AI_NAME = /gemini|claude|gpt|openai|groq|llm|whisper|anthropic/i;
const OUTPUT_NAME = /post|send|notify|email|respond|create|add to|reply|alert/i;

/** Map an n8n node type (+ name for generic HTTP nodes) to a diagram node kind. */
export function inferKind(type: string, name: string): FlowNodeKind {
  const t = type.split(".").pop()?.toLowerCase() ?? "";
  if (t.endsWith("trigger") || t === "webhook") return "trigger";
  if (/openai|anthropic|lmchat|agent|chain/.test(t)) return "ai";
  if (t === "httprequest") {
    if (AI_NAME.test(name)) return "ai";
    if (OUTPUT_NAME.test(name)) return "output";
    return "data";
  }
  if (/discord|slack|gmail|telegram|emailsend|respondtowebhook/.test(t)) return "output";
  if (/googlesheets|supabase|datatable|postgres|airtable|mysql|redis/.test(t)) return "data";
  return "logic";
}

/** "Insert New Members2" → "Insert New Members"; trims n8n's duplicate-name suffixes. */
function cleanLabel(name: string): string {
  return name.replace(/\d+$/, "").trim();
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Convert a sanitized n8n export to nodes/edges for the flow renderer. */
export function n8nToFlow(
  workflow: N8nSanitizedExport,
  meta: Omit<FlowSpec, "nodes" | "edges" | "source">,
): FlowSpec {
  const idOf = new Map(workflow.nodes.map((n) => [n.name, slugify(n.name)]));

  const nodes: FlowNodeSpec[] = workflow.nodes.map((n) => ({
    id: slugify(n.name),
    label: cleanLabel(n.name),
    kind: inferKind(n.type, n.name),
  }));

  const seen = new Set<string>();
  const edges: FlowEdgeSpec[] = [];
  for (const [from, { main }] of Object.entries(workflow.connections)) {
    const source = idOf.get(from);
    if (!source) continue;
    for (const output of main) {
      for (const { node } of output) {
        const target = idOf.get(node);
        const key = `${source}->${target}`;
        if (!target || seen.has(key)) continue;
        seen.add(key);
        edges.push([source, target]);
      }
    }
  }

  return { ...meta, source: "n8n-export", nodes, edges };
}
