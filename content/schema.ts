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
  photo: { src: string; alt: string };
  resumeUrl: string;
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
  /** Slugs of exported JSON files in content/workflows/ rendered with React Flow. */
  flagships: readonly string[];
}

/**
 * Minimal shape of an n8n workflow export that the React Flow renderer reads.
 * Exports must be stripped of credentials before being committed.
 */
export interface N8nWorkflowExport {
  name: string;
  nodes: readonly {
    id: string;
    name: string;
    type: string;
    position: readonly [number, number];
  }[];
  connections: Record<
    string,
    { main?: readonly (readonly { node: string; type: string; index: number }[] | null)[] }
  >;
}
