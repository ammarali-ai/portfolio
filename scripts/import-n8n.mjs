#!/usr/bin/env node
/**
 * Import an n8n workflow export as a sanitized, structure-only JSON file.
 *
 *   node scripts/import-n8n.mjs <path/to/export.json> <slug>
 *
 * Writes content/workflows/<slug>.json containing ONLY:
 *   - workflow name
 *   - node names + types (sticky notes removed)
 *   - "main" connections (who feeds whom)
 * Everything else is dropped: parameters (prompts, URLs, webhook paths, headers),
 * credentials, pinned data, node IDs, positions, settings and metadata.
 *
 * Review node names before committing: they are published as-is.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [input, slug] = process.argv.slice(2);
if (!input || !slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("Usage: node scripts/import-n8n.mjs <export.json> <kebab-case-slug>");
  process.exit(1);
}

const raw = JSON.parse(readFileSync(input, "utf8"));
if (!Array.isArray(raw.nodes) || typeof raw.connections !== "object") {
  console.error("Not an n8n workflow export (missing nodes/connections).");
  process.exit(1);
}

const nodes = raw.nodes
  .filter((n) => !String(n.type).includes("stickyNote"))
  .map((n) => ({ name: String(n.name), type: String(n.type) }));
const names = new Set(nodes.map((n) => n.name));

const connections = {};
for (const [from, outputs] of Object.entries(raw.connections)) {
  if (!names.has(from) || !Array.isArray(outputs.main)) continue;
  const main = outputs.main.map((targets) =>
    (targets ?? []).filter((t) => names.has(t.node)).map((t) => ({ node: String(t.node) })),
  );
  if (main.some((t) => t.length > 0)) connections[from] = { main };
}

const out = { name: String(raw.name ?? slug), nodes, connections };
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, "content", "workflows", `${slug}.json`);
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${target}: ${nodes.length} nodes, ${Object.keys(connections).length} sources`);
