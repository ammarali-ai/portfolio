import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { education, certifications, events } from "@/content/education";
import { skillGroups } from "@/content/skills";
import { projects } from "@/content/projects";
import { domains } from "@/content/domains";
import { workflowCategories } from "@/content/workflows-index";
import { stats } from "@/content/stats";
import { formatRange, formatYearMonth } from "@/lib/format";

/**
 * Grounding text for the AI assistant, generated from the same typed content the site renders
 * (single source of truth) plus content/knowledge.md for extra approved facts.
 * Built once per server instance. Simple context-stuffing today; the section structure makes it
 * easy to chunk for RAG later.
 */
function build(): string {
  const lines: string[] = [];
  const push = (...l: string[]) => lines.push(...l);

  push(
    `# ${profile.name}`,
    `Roles: ${profile.roles.join(", ")}`,
    `Location: ${profile.location}`,
    `Summary: ${profile.summary}`,
    profile.availability ? `Availability: ${profile.availability}` : "",
    `Contact: email ${profile.email}, LinkedIn ${profile.links.linkedin}, GitHub ${profile.links.github}`,
    "",
    "## Key numbers",
    ...stats
      .filter((s) => !s.needsVerification)
      .map((s) => `- ${s.value}${s.suffix ?? ""} ${s.label}`),
    "",
    "## Experience (newest first)",
  );
  for (const job of experience) {
    push(
      `### ${job.role}, ${job.company} (${job.location}${job.note ? `, ${job.note}` : ""}), ${formatRange(job.start, job.end)}`,
      ...job.bullets.map((b) => `- ${b}`),
      `Tools: ${job.tech.join(", ")}`,
    );
  }

  push("", "## Projects");
  for (const p of projects) {
    push(
      `### ${p.title} [${p.status}, ${formatYearMonth(p.date)}]`,
      `Impact: ${p.impact}`,
      `Details: ${p.summary}`,
      `Stack: ${p.tech.join(", ")}`,
      p.possibleApplications ? `Possible applications: ${p.possibleApplications}` : "",
    );
  }

  push("", "## Research domains and interests");
  for (const d of domains) {
    push(`### ${d.title} [${d.status}]`, d.interest, ...d.problems.map((x) => `- ${x}`));
  }

  push("", "## Automation work by category");
  for (const c of workflowCategories) {
    push(`- ${c.title}: ${c.description} Examples: ${c.examples.join("; ")}.`);
  }

  push("", "## Skills");
  for (const g of skillGroups) push(`- ${g.category}: ${g.items.join(", ")}`);

  push("", "## Education");
  for (const e of education) {
    push(
      `- ${e.degree}, ${e.institution}, ${formatRange(e.start, e.end)}${e.grade ? `, ${e.grade}` : ""}`,
    );
  }
  push("", "## Certifications");
  for (const c of certifications) push(`- ${c.title} (${c.issuer}, ${formatYearMonth(c.date)})`);
  push("", "## Conferences and events attended");
  for (const e of events) push(`- ${e.title}, ${e.host} (${formatYearMonth(e.date)})`);

  const extra = readFileSync(join(process.cwd(), "content", "knowledge.md"), "utf8");
  push("", extra.trim());

  return lines.filter((l, i, all) => l !== "" || all[i - 1] !== "").join("\n");
}

let cached: string | null = null;

export function getKnowledge(): string {
  cached ??= build();
  return cached;
}
