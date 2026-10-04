import type { FlowId, FlowSpec, N8nSanitizedExport } from "./schema";
import { n8nToFlow } from "@/lib/n8n-to-flow";
import meetingNotesMain from "./workflows/meeting-notes-main.json";
import meetingNotesDigest from "./workflows/meeting-notes-digest.json";
import meetingNotesErrors from "./workflows/meeting-notes-errors.json";
import discordOnboarding from "./workflows/discord-onboarding.json";

/**
 * Every animated diagram on the site.
 * - "n8n-export": rendered straight from sanitized exports in content/workflows/.
 * - "n8n-anonymized": real client/employer structure, client names removed, nodes renamed.
 * - "architecture": hand-drawn from the resume for non-n8n projects (no invented steps).
 */
const list: FlowSpec[] = [
  {
    id: "monitoring",
    title: "Real-Time Monitoring & Alert System",
    description:
      "Live task events arrive over a secure webhook, get validated and mapped to the right people, analysed, and pushed to the team as alerts.",
    source: "architecture",
    context: "Built at Metaviz",
    nodes: [
      {
        id: "webhook",
        label: "Secure webhook",
        kind: "trigger",
        detail: "Receives live task events from the source system.",
      },
      {
        id: "validate",
        label: "Validation",
        kind: "logic",
        detail: "Checks the payload; bad events go to error handling.",
      },
      {
        id: "errors",
        label: "Error handling",
        kind: "output",
        detail: "Invalid events are caught and reported, not dropped.",
      },
      {
        id: "map",
        label: "User mapping",
        kind: "data",
        detail: "Matches each event to the right person and team.",
      },
      {
        id: "analyze",
        label: "Claude analysis",
        kind: "ai",
        detail: "Summarises the event and flags what needs attention.",
      },
      {
        id: "alert",
        label: "Team alert",
        kind: "output",
        detail: "Notifies the team in real time.",
      },
    ],
    edges: [
      ["webhook", "validate"],
      ["validate", "map", "valid"],
      ["validate", "errors", "invalid"],
      ["map", "analyze"],
      ["analyze", "alert"],
    ],
  },
  {
    id: "call-analyzer",
    title: "AI Call Analyzer pipeline",
    description:
      "Sales calls are transcribed if needed, classified, matched to the rep, analysed against a strict JSON schema, stored, and turned into reports, alerts and follow-up drafts.",
    source: "n8n-anonymized",
    context: "Client work · anonymized",
    nodes: [
      { id: "intake", label: "Call intake webhook", kind: "trigger" },
      { id: "ack", label: "Acknowledge request", kind: "output" },
      { id: "has-transcript", label: "Transcript in payload?", kind: "logic" },
      { id: "fetch", label: "Fetch transcript", kind: "data" },
      { id: "exists", label: "Transcript found?", kind: "logic" },
      { id: "whisper", label: "Whisper transcription", kind: "ai" },
      { id: "merge", label: "Merge transcript paths", kind: "logic" },
      { id: "prepare", label: "Prepare transcript", kind: "logic" },
      { id: "classify", label: "Classify call type", kind: "ai" },
      { id: "rep", label: "Look up sales rep", kind: "data" },
      { id: "analyze", label: "Master call analysis", kind: "ai" },
      { id: "validate", label: "Parse + validate JSON", kind: "logic" },
      { id: "followup", label: "Draft follow-up email", kind: "ai" },
      { id: "report", label: "Build HTML report", kind: "ai" },
      { id: "save", label: "Save to database", kind: "data" },
      { id: "mail-followup", label: "Follow-up draft → rep", kind: "output" },
      { id: "mail-report", label: "Full report → rep", kind: "output" },
      { id: "mail-alert", label: "Alert → manager", kind: "output" },
    ],
    edges: [
      ["intake", "ack"],
      ["intake", "has-transcript"],
      ["has-transcript", "prepare", "yes"],
      ["has-transcript", "fetch", "no"],
      ["fetch", "exists"],
      ["exists", "merge", "yes"],
      ["exists", "whisper", "no"],
      ["whisper", "merge"],
      ["merge", "prepare"],
      ["prepare", "classify"],
      ["classify", "rep"],
      ["rep", "analyze"],
      ["analyze", "validate"],
      ["validate", "followup"],
      ["validate", "report"],
      ["validate", "save"],
      ["followup", "mail-followup"],
      ["report", "mail-report"],
      ["save", "mail-alert"],
    ],
  },
  {
    id: "weekly-call-digest",
    title: "Weekly call digest",
    description:
      "Every Monday: pull the last 7 days of analysed calls, aggregate the numbers, and have an LLM write and format the team digest.",
    source: "n8n-anonymized",
    context: "Client work · anonymized",
    nodes: [
      { id: "schedule", label: "Weekly schedule", kind: "trigger" },
      { id: "calls", label: "Last 7 days of calls", kind: "data" },
      { id: "stats", label: "Aggregate stats", kind: "logic" },
      { id: "narrative", label: "Write digest narrative", kind: "ai" },
      { id: "html", label: "Build HTML email", kind: "ai" },
      { id: "send", label: "Email the digest", kind: "output" },
    ],
    edges: [
      ["schedule", "calls"],
      ["calls", "stats"],
      ["stats", "narrative"],
      ["narrative", "html"],
      ["html", "send"],
    ],
  },
  n8nToFlow(meetingNotesMain as N8nSanitizedExport, {
    id: "meeting-notes-main",
    title: "AI Meeting Notes: main flow",
    description:
      "Validates the request, pulls the Discord conversation, chunks long meetings, asks Gemini for structured notes, then posts a summary, a thread with full notes, and a Sheets log.",
    context: "Personal project",
  }),
  n8nToFlow(meetingNotesDigest as N8nSanitizedExport, {
    id: "meeting-notes-digest",
    title: "AI Meeting Notes: scheduled digest",
    description:
      "Each morning: read the meeting log, keep the last 7 days, and post a Gemini-written digest to Discord.",
    context: "Personal project",
  }),
  n8nToFlow(meetingNotesErrors as N8nSanitizedExport, {
    id: "meeting-notes-errors",
    title: "AI Meeting Notes: error handler",
    description: "Any failure in the bot's workflows is formatted and reported to Discord.",
    context: "Personal project",
  }),
  n8nToFlow(discordOnboarding as N8nSanitizedExport, {
    id: "discord-onboarding",
    title: "Discord team onboarding (OAuth2)",
    description:
      "Exchanges an OAuth2 code for a token, reads the user's Discord profile and adds them to the team server, with error responses for failed steps.",
    context: "Built at Metaviz",
  }),
  {
    id: "lead-intelligence",
    title: "Lead intelligence & enrichment",
    description:
      "A new lead fans out to four research calls in parallel. Results are merged, analysed by an LLM and emailed as a strategy brief.",
    source: "n8n-anonymized",
    context: "Client work · anonymized",
    nodes: [
      { id: "lead", label: "Lead webhook", kind: "trigger" },
      { id: "normalize", label: "Normalize lead", kind: "logic" },
      { id: "business", label: "Business profile lookup", kind: "data" },
      { id: "competitors", label: "Competitor lookup", kind: "data" },
      { id: "serp", label: "Search results", kind: "data" },
      { id: "website", label: "Website fetch", kind: "data" },
      { id: "assemble", label: "Assemble enrichment", kind: "logic" },
      { id: "analysis", label: "LLM strategic analysis", kind: "ai" },
      { id: "parse", label: "Parse AI output", kind: "logic" },
      { id: "brief", label: "Build strategy brief", kind: "logic" },
      { id: "email", label: "Email reports", kind: "output" },
    ],
    edges: [
      ["lead", "normalize"],
      ["normalize", "business"],
      ["normalize", "competitors"],
      ["normalize", "serp"],
      ["normalize", "website"],
      ["business", "assemble"],
      ["competitors", "assemble"],
      ["serp", "assemble"],
      ["website", "assemble"],
      ["assemble", "analysis"],
      ["analysis", "parse"],
      ["parse", "brief"],
      ["brief", "email"],
    ],
  },
  {
    id: "pre-call-brief",
    title: "AI pre-call brief generator",
    description:
      "A form submission triggers one Claude call that researches the prospect and drafts the brief; the output is QA-checked, converted to PDF and DOCX, and emailed before the call.",
    source: "n8n-anonymized",
    context: "Client work · anonymized",
    nodes: [
      { id: "form", label: "Form webhook", kind: "trigger" },
      { id: "normalize", label: "Normalize payload", kind: "logic" },
      { id: "claude", label: "Claude: research + draft brief", kind: "ai" },
      { id: "extract", label: "Extract, QA, PDF + DOCX", kind: "logic" },
      { id: "email", label: "Email brief + attachments", kind: "output" },
      { id: "respond", label: "Respond to form", kind: "output" },
    ],
    edges: [
      ["form", "normalize"],
      ["normalize", "claude"],
      ["claude", "extract"],
      ["extract", "email"],
      ["email", "respond"],
    ],
  },
  {
    id: "prompt-feedback-loop",
    title: "Prompt feedback loop",
    description:
      "Weekly: read call outcomes, lost reasons and meeting briefs, compute metrics, and have Claude summarise patterns into prompt-tuning notes for the team.",
    source: "n8n-anonymized",
    context: "Client work · anonymized",
    nodes: [
      { id: "schedule", label: "Weekly schedule", kind: "trigger" },
      { id: "outcomes", label: "Read call outcomes", kind: "data" },
      { id: "lost", label: "Read lost reasons", kind: "data" },
      { id: "briefs", label: "Read meeting briefs", kind: "data" },
      { id: "metrics", label: "Compute metrics", kind: "logic" },
      { id: "claude", label: "Claude: summarise patterns", kind: "ai" },
      { id: "notes", label: "Append prompt-tuning notes", kind: "data" },
      { id: "digest", label: "Ops digest to Slack", kind: "output" },
    ],
    edges: [
      ["schedule", "outcomes"],
      ["schedule", "lost"],
      ["schedule", "briefs"],
      ["outcomes", "metrics"],
      ["lost", "metrics"],
      ["briefs", "metrics"],
      ["metrics", "claude"],
      ["claude", "notes"],
      ["notes", "digest"],
    ],
  },
  {
    id: "rice-leaf",
    title: "Rice Leaf Disease AI",
    description:
      "10,000+ leaf images, four models compared side by side; transfer learning generalised best, reaching 92% accuracy.",
    source: "architecture",
    context: "Final-year project",
    nodes: [
      { id: "images", label: "Leaf images (10,000+)", kind: "data" },
      { id: "prep", label: "Preprocessing", kind: "logic" },
      { id: "cnn", label: "CNN", kind: "ai" },
      { id: "svm", label: "SVM", kind: "ai" },
      { id: "tl", label: "Transfer learning", kind: "ai" },
      { id: "rf", label: "Random forest", kind: "ai" },
      { id: "eval", label: "Comparative evaluation", kind: "logic" },
      {
        id: "result",
        label: "92% accuracy",
        kind: "output",
        detail: "Transfer learning generalised best.",
      },
    ],
    edges: [
      ["images", "prep"],
      ["prep", "cnn"],
      ["prep", "svm"],
      ["prep", "tl"],
      ["prep", "rf"],
      ["cnn", "eval"],
      ["svm", "eval"],
      ["tl", "eval"],
      ["rf", "eval"],
      ["eval", "result"],
    ],
  },
  {
    id: "cotton-crop",
    title: "Cotton Crop Disease Detection",
    description: "A CNN classifies cotton leaf images into 5+ disease categories at 89% accuracy.",
    source: "architecture",
    context: "Semester project",
    nodes: [
      { id: "images", label: "Cotton leaf images", kind: "data" },
      { id: "prep", label: "Preprocessing", kind: "logic" },
      { id: "cnn", label: "CNN classifier", kind: "ai" },
      { id: "result", label: "5+ classes · 89%", kind: "output" },
    ],
    edges: [
      ["images", "prep"],
      ["prep", "cnn"],
      ["cnn", "result"],
    ],
  },
  {
    id: "fake-news",
    title: "Fake News Detection",
    description:
      "News text in English, Urdu and Spanish is classified as real or fake using BERT and an SVM, reaching 90% accuracy.",
    source: "architecture",
    context: "Knowledge Streams",
    nodes: [
      { id: "text", label: "News text (EN · UR · ES)", kind: "data" },
      { id: "prep", label: "Text preprocessing", kind: "logic" },
      { id: "bert", label: "BERT", kind: "ai" },
      { id: "svm", label: "SVM", kind: "ai" },
      { id: "result", label: "Real / fake · 90%", kind: "output" },
    ],
    edges: [
      ["text", "prep"],
      ["prep", "bert"],
      ["prep", "svm"],
      ["bert", "result"],
      ["svm", "result"],
    ],
  },
  {
    id: "cv-ranker",
    title: "CV Ranker",
    description:
      "A CV and job description go through size and rate limits, Claude scores the match as strict JSON, and the result is validated before display.",
    source: "architecture",
    context: "Coming soon to this site",
    nodes: [
      { id: "input", label: "CV + job description", kind: "trigger" },
      { id: "limits", label: "Size + rate limits", kind: "logic" },
      { id: "claude", label: "Claude match scoring", kind: "ai" },
      { id: "validate", label: "JSON validation", kind: "logic" },
      { id: "result", label: "Score, gaps & tips", kind: "output" },
    ],
    edges: [
      ["input", "limits"],
      ["limits", "claude"],
      ["claude", "validate"],
      ["validate", "result"],
    ],
  },
];

export const flows = Object.fromEntries(list.map((f) => [f.id, f])) as Record<FlowId, FlowSpec>;

export function getFlow(id: FlowId): FlowSpec {
  return flows[id];
}
