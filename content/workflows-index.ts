import type { WorkflowCategory } from "./schema";

/**
 * Automation Gallery categories, built from the n8n workspace.
 * Counts are null until verified per category. Flagships stay empty until
 * credential-free JSON exports are added to content/workflows/.
 */
export const workflowCategories: readonly WorkflowCategory[] = [
  {
    id: "ops-monitoring",
    title: "Ops & Monitoring",
    description:
      "Real-time task monitoring, reminders and daily schedules delivered to Discord, Sheets and voice.",
    count: null,
    examples: [
      "Metaviz Discord Bot",
      "Office Task Reminder → Discord DM",
      "Unified Daily Schedule (Calendar + Discord + Sheets + Voice)",
      "Automated reports",
    ],
    flagships: [],
  },
  {
    id: "call-intelligence",
    title: "Call Intelligence",
    description: "Call transcripts analysed by LLMs into structured insights and reports.",
    count: null,
    examples: ["Call Analyzer suite", "Daniel Call Analyzer"],
    flagships: [],
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
    id: "sales-leads",
    title: "Sales & Leads",
    description: "Lead routing with sentiment analysis, model evaluation and content generation.",
    count: null,
    examples: [
      "Sales lead routing with Gemini sentiment analysis & model evaluation",
      "LinkedIn content creator",
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
    ],
    flagships: [],
  },
];
