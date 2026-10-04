import type { ResearchMeta } from "./schema";
import papers from "./research/papers.json";

/**
 * /research entries. Bodies: content/research/<slug>.mdx.
 * - Paper notes: ported from v1 (explainers of the papers behind my work).
 * - Domain notes: one draft per research domain, for the owner to complete
 *   (drafts are hidden in production).
 */
const domainNotes: ResearchMeta[] = [
  {
    slug: "notes-ai-automation",
    title: "Notes: making LLM steps reliable in automation",
    date: "2026-10-04",
    excerpt:
      "Validation, retries and human hand-off: what keeps an LLM step predictable inside a workflow.",
    tags: ["Automation", "LLMs", "n8n"],
    kind: "note",
    domain: "automation",
    draft: true,
    readingMinutes: 2,
  },
  {
    slug: "notes-ai-agriculture",
    title: "Notes: crop-disease detection with small datasets",
    date: "2026-10-04",
    excerpt: "Transfer learning, augmentation and on-device models for farmers' real-world images.",
    tags: ["Computer Vision", "Agriculture"],
    kind: "note",
    domain: "agriculture",
    draft: true,
    readingMinutes: 2,
  },
  {
    slug: "notes-ai-cybersecurity",
    title: "Notes: ML on endpoint and network telemetry",
    date: "2026-10-04",
    excerpt:
      "Separating real threats from alert fatigue, and summarising alerts for non-specialists.",
    tags: ["Cybersecurity", "Anomaly Detection"],
    kind: "note",
    domain: "cybersecurity",
    draft: true,
    readingMinutes: 2,
  },
  {
    slug: "notes-ai-fintech",
    title: "Notes: document understanding for finance operations",
    date: "2026-10-04",
    excerpt: "Invoice extraction, transaction anomalies and explainable risk summaries.",
    tags: ["FinTech", "Document AI"],
    kind: "note",
    domain: "fintech",
    draft: true,
    readingMinutes: 2,
  },
  {
    slug: "notes-ai-healthcare",
    title: "Notes: from crop leaves to medical images",
    date: "2026-10-04",
    excerpt:
      "What transfers from agricultural computer vision and NLP to medical imaging and clinical text.",
    tags: ["Healthcare", "Computer Vision", "NLP"],
    kind: "note",
    domain: "healthcare",
    draft: true,
    readingMinutes: 2,
  },
];

const showDrafts = process.env.NODE_ENV === "development";

const all: ResearchMeta[] = [...domainNotes, ...(papers as ResearchMeta[])].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** Visible entries (drafts only in development), newest first. */
export const research: readonly ResearchMeta[] = all.filter((r) => showDrafts || !r.draft);

export function getResearch(slug: string): ResearchMeta | undefined {
  return research.find((r) => r.slug === slug);
}
