/**
 * Content schema — the single contract between site content and components.
 *
 * Rules (see CLAUDE.md):
 * - All copy lives in /content (typed .ts files or MDX), never hard-coded in components.
 * - The resume is the source of truth. Unknown values use a `TODO:` string or `null`,
 *   never an invented number.
 */

/** "YYYY-MM" month string, e.g. "2026-01". */
export type YearMonth = `${number}-${number}`;

export type DomainId = "cybersecurity" | "fintech" | "healthcare" | "agriculture" | "automation";

export type Status = "built" | "in-progress" | "exploring";

export interface Link {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  /** Cycled by the hero role rotator, in order. */
  roles: readonly string[];
  location: string;
  email: string;
  links: { github: string; linkedin: string };
  summary: string;
  /** Short availability badge in the hero; null hides it. */
  availability: string | null;
  photo: { src: string; alt: string };
  /** Public path of the CV PDF; null hides every "Download CV" button. */
  resumeUrl: string | null;
}

export interface NavItem {
  label: string;
  /** In-page anchors use "/#id" so they also work from other routes. */
  href: string;
}

export interface Stat {
  value: number;
  /** Rendered after the counter, e.g. "%", "+". */
  suffix?: string;
  label: string;
  /** Where the number comes from (resume section / project), for honesty audits. */
  source: string;
  /** True until the owner has double-checked the figure. */
  needsVerification?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  /** e.g. "CMIT Intern", "Remote". */
  note?: string;
  start: YearMonth;
  end: YearMonth | "present";
  bullets: readonly string[];
  tech: readonly string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  start: YearMonth;
  end: YearMonth;
  grade?: string;
}

export interface SkillGroup {
  category: string;
  items: readonly string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: YearMonth;
  url?: string;
}

export interface EventItem {
  title: string;
  host: string;
  date: YearMonth;
}

export interface Domain {
  id: DomainId;
  title: string;
  status: Status;
  /** What interests Ammar in this domain. */
  interest: string;
  problems: readonly string[];
  related: readonly Link[];
}

/** Frontmatter for content/projects/*.mdx (mirrored by the Velite schema in Phase 6). */
export interface ProjectMeta {
  slug: string;
  title: string;
  domain: DomainId;
  /** One-line, honest impact statement. */
  impact: string;
  summary: string;
  tech: readonly string[];
  status: Status;
  featured: boolean;
  date: YearMonth;
  links: {
    github?: string;
    demo?: string;
    /** Hugging Face Space URL for the "Try it" playground. */
    hfSpace?: string;
  };
  /** Short separate line for potential applications (e.g. disaster management). */
  possibleApplications?: string;
  /** Main processing steps, shown as a chain on large cards. */
  flow?: readonly string[];
  /** Id of an animated diagram in content/flows (shown via "How it works"). */
  diagram?: FlowId;
}

/** Metadata for a /research entry; the body lives in content/research/<slug>.mdx. */
export interface ResearchMeta {
  slug: string;
  title: string;
  /** "YYYY-MM-DD". */
  date: string;
  excerpt: string;
  tags: readonly string[];
  /** "paper": explainer of a research paper; "note": my own research notes per domain. */
  kind: "paper" | "note";
  domain?: DomainId;
  /** Drafts are listed only in development and are not built in production. */
  draft?: boolean;
  authors?: readonly string[];
  source?: { title: string; url: string };
  readingMinutes: number;
}

/** Heading copy for a homepage section. */
export interface SectionCopy {
  /** Small mono label above the title. */
  eyebrow: string;
  title: string;
  description: string;
}

/* ------------------------------------------------------------------------------------------
 * Animated flow diagrams (React Flow). Used for n8n workflows and project architectures.
 * ---------------------------------------------------------------------------------------- */

export type FlowNodeKind = "trigger" | "data" | "logic" | "ai" | "output";

export interface FlowNodeSpec {
  id: string;
  label: string;
  kind: FlowNodeKind;
  /** Optional one-line explanation (shown in step lists and tooltips). */
  detail?: string;
}

/** [from, to, optional label such as "yes" / "no"]. */
export type FlowEdgeSpec = readonly [from: string, to: string, label?: string];

export type FlowSource =
  /** Rendered directly from a sanitized n8n export (structure only). */
  | "n8n-export"
  /** Real n8n structure with client names removed and nodes renamed generically. */
  | "n8n-anonymized"
  /** Hand-drawn architecture of a non-n8n project (e.g. an ML pipeline). */
  | "architecture";

export type FlowId =
  | "monitoring"
  | "call-analyzer"
  | "weekly-call-digest"
  | "meeting-notes-main"
  | "meeting-notes-digest"
  | "meeting-notes-errors"
  | "discord-onboarding"
  | "lead-intelligence"
  | "pre-call-brief"
  | "prompt-feedback-loop"
  | "rice-leaf"
  | "cotton-crop"
  | "fake-news"
  | "cv-ranker"
  | "multi-agent"
  | "task-event-router"
  | "portfolio-contact"
  | "restaurant-names";

export interface FlowSpec {
  id: FlowId;
  title: string;
  description: string;
  source: FlowSource;
  /** Where it was built, e.g. "Personal project", "Work project · anonymized", "Client work · anonymized". */
  context: string;
  nodes: readonly FlowNodeSpec[];
  edges: readonly FlowEdgeSpec[];
}

export type WorkflowCategoryId =
  | "rag-agents"
  | "sales-leads"
  | "data-extraction"
  | "ops-monitoring"
  | "customer-facing"
  | "call-intelligence";

export interface WorkflowCategory {
  id: WorkflowCategoryId;
  title: string;
  description: string;
  /** Real count from the n8n workspace; null until verified. */
  count: number | null;
  /** Workflow names shown as examples. */
  examples: readonly string[];
  /** Animated diagrams shown for this category on /automations. */
  flagships: readonly FlowId[];
}

/**
 * Sanitized n8n export as committed in content/workflows/*.json, written by
 * scripts/import-n8n.mjs. Only node names, types and wiring are kept. Parameters,
 * credentials, webhook paths, pinned data and IDs are dropped.
 */
export interface N8nSanitizedExport {
  name: string;
  nodes: readonly { name: string; type: string }[];
  connections: Record<string, { main: readonly (readonly { node: string }[])[] }>;
}
