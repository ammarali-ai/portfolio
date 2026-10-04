import type { WorkflowCategory } from "./schema";

/**
 * Automation categories, built from the n8n workspace. `flagships` are animated diagrams
 * (content/flows.ts) shown on /automations. Counts stay null until verified.
 */
export const workflowCategories: readonly WorkflowCategory[] = [
  {
    id: "ops-monitoring",
    title: "Ops & Monitoring",
    description:
      "Real-time task monitoring, reminders, meeting notes and daily schedules delivered to Discord, Sheets and voice.",
    count: null,
    examples: [
      "Real-time task alerts",
      "AI meeting notes bot for Discord",
      "Discord team onboarding via OAuth2",
      "Unified Daily Schedule (Calendar + Discord + Sheets + Voice)",
    ],
    flagships: [
      "monitoring",
      "task-event-router",
      "meeting-notes-main",
      "meeting-notes-digest",
      "meeting-notes-errors",
      "discord-onboarding",
    ],
  },
  {
    id: "call-intelligence",
    title: "Call Intelligence",
    description:
      "Call transcripts analysed by LLMs into structured insights, reports and weekly digests.",
    count: null,
    examples: ["AI call analyzer pipeline", "Weekly call digest"],
    flagships: ["call-analyzer", "weekly-call-digest"],
  },
  {
    id: "sales-leads",
    title: "Sales & Leads",
    description:
      "Lead enrichment, pre-call research briefs, sentiment-based routing and prompt feedback loops.",
    count: null,
    examples: [
      "Lead intelligence & enrichment",
      "AI pre-call brief generator",
      "Sales lead routing with Gemini sentiment analysis & model evaluation",
    ],
    flagships: ["lead-intelligence", "pre-call-brief", "prompt-feedback-loop"],
  },
  {
    id: "rag-agents",
    title: "RAG & AI Agents",
    description: "Retrieval-augmented chatbots and tool-using agents over company data.",
    count: null,
    examples: [
      "RAG chatbot for company documents (Google Drive + Gemini)",
      "RAG Workflow vs. RAG Agent",
      "AI agent for inventory lookup",
    ],
    flagships: [],
  },
  {
    id: "data-extraction",
    title: "Data Extraction",
    description: "Scalable website scraping and structured extraction pipelines.",
    count: null,
    examples: ["EmailHarvest Pro: scalable website email scraper", "Firecrawl extract template"],
    flagships: [],
  },
  {
    id: "customer-facing",
    title: "Customer-Facing",
    description: "Support, bookings and invoicing workflows for small businesses.",
    count: null,
    examples: [
      "Customer support workflow",
      "Restaurant bookings support (demo)",
      "Invoice workflow",
      "This site's contact form → n8n / Zapier → Discord",
    ],
    flagships: ["portfolio-contact"],
  },
];
