import type { ProjectMeta } from "./schema";
import { flows } from "./flows";

/**
 * Project metadata (card + archive data). Long-form case studies arrive as MDX in Phase 6.
 * Order = display order. Facts come from the resume or the project's own code only.
 * `diagram` links to an animated flow in content/flows.ts ("How it works").
 * TODO: fill in links.github / links.demo / links.hfSpace for each project.
 */
export const projects: readonly ProjectMeta[] = [
  {
    slug: "realtime-monitoring",
    title: "Real-Time AI Monitoring & Alert System",
    domain: "automation",
    impact:
      "Live task events are validated, mapped to the right people and turned into team alerts automatically.",
    summary:
      "A production n8n system. Secure webhooks receive live task events; the workflow validates the payload, maps it to users, handles errors and notifies teams in real time, with Claude used for analysis and summaries.",
    tech: ["n8n", "Webhooks", "Claude API", "Discord", "REST APIs"],
    status: "built",
    featured: true,
    date: "2026-04",
    links: {},
    possibleApplications: "Early-warning and alert dissemination, e.g. for disaster management.",
    flow: flows.monitoring.nodes.filter((n) => n.id !== "errors").map((n) => n.label),
    diagram: "monitoring",
  },
  {
    slug: "call-analyzer",
    title: "Call Analyzer",
    domain: "automation",
    impact:
      "Sales calls are transcribed, classified, scored and turned into rep reports, manager alerts and follow-up drafts.",
    summary:
      "Built in two iterations for a client: a Next.js + Supabase dashboard with an LLM analysis API, and an n8n pipeline that transcribes calls with Whisper when needed, classifies and analyses them against a strict JSON schema, stores results in Supabase and emails reports, alerts and follow-up drafts.",
    tech: ["n8n", "OpenAI", "Whisper", "Supabase", "Next.js", "Gmail"],
    status: "built",
    featured: true,
    date: "2026-05",
    links: {},
    diagram: "call-analyzer",
  },
  {
    // Client work: described from the workflow's structure only; client name withheld.
    slug: "lead-intelligence",
    title: "Lead Intelligence Engine",
    domain: "automation",
    impact:
      "Researches every new lead from four sources in parallel and emails an AI-written strategy brief.",
    summary:
      "A webhook receives a new lead and normalizes it, then fans out to four lookups at once: the business profile, competitors, search results and the lead's own website. The findings are merged, analysed by an LLM for strategy, parsed and turned into a brief that's emailed automatically.",
    tech: ["n8n", "Groq LLM", "Google Places API", "SERP API", "Gmail"],
    status: "built",
    featured: true,
    date: "2026-04",
    links: {},
    diagram: "lead-intelligence",
  },
  {
    slug: "rice-leaf-disease",
    title: "Rice Leaf Disease AI",
    domain: "agriculture",
    impact: "92% accuracy classifying rice leaf diseases across a 10,000+ image dataset.",
    summary:
      "Final-year project comparing four approaches (CNN, SVM, Transfer Learning and Random Forest) for image-based rice leaf disease classification. Transfer learning generalised best on the domain-specific data.",
    tech: ["Python", "TensorFlow", "Keras", "Transfer Learning", "Scikit-learn", "OpenCV"],
    status: "built",
    featured: true,
    date: "2024-07",
    links: {},
    possibleApplications: "Satellite and drone imagery for crop or damage assessment.",
    diagram: "rice-leaf",
  },
  {
    slug: "meeting-notes-bot",
    title: "AI Meeting Notes Bot",
    domain: "automation",
    impact:
      "Turns a Discord meeting into a summary, action items and decisions posted back to a thread.",
    summary:
      "A discord.js bot (TypeScript) plus three n8n workflows. The main flow validates input, fetches and parses the transcript, chunks long meetings, asks Gemini for strict-JSON notes, posts an embed and threaded full notes, and logs to Google Sheets. A daily scheduled flow posts a digest of the last 7 days and an error flow reports failures to Discord.",
    tech: ["n8n", "Gemini", "discord.js", "TypeScript", "Google Sheets"],
    status: "built",
    featured: true,
    date: "2026-04",
    links: {},
    diagram: "meeting-notes-main",
  },
  {
    slug: "fake-news-detection",
    title: "Fake News Detection",
    domain: "cybersecurity",
    impact: "Real-or-fake news classifier for English, Urdu and Spanish at 90% accuracy.",
    // Stack confirmed by the owner (BERT + SVM). The older local repo copy is an earlier TF-IDF + NB prototype.
    summary:
      "A three-language NLP system (English, Urdu, Spanish) that classifies news text as real or fake, built with BERT and an SVM classifier and reaching 90% accuracy.",
    tech: ["Python", "BERT", "SVM", "NLP"],
    status: "built",
    featured: true,
    date: "2024-10",
    links: {},
    possibleApplications: "Monitoring misinformation during emergencies.",
    diagram: "fake-news",
  },
  {
    // Client work: described from the workflow's structure only; client name withheld.
    slug: "pre-call-brief",
    title: "AI Pre-Call Brief Generator",
    domain: "automation",
    impact:
      "One form submission becomes a researched, QA-checked call brief delivered as PDF and DOCX.",
    summary:
      "A form webhook triggers a single Claude call that researches the prospect and drafts the brief. The workflow extracts the result, runs QA checks, converts it to PDF and DOCX and emails it with attachments before the call.",
    tech: ["n8n", "Claude API", "PDF / DOCX generation", "Gmail"],
    status: "built",
    featured: true,
    date: "2026-04",
    links: {},
    diagram: "pre-call-brief",
  },
  {
    slug: "cotton-crop-disease",
    title: "Cotton Crop Disease Detection",
    domain: "agriculture",
    impact: "89% accuracy across 5+ cotton disease categories with a CNN.",
    summary:
      "Semester project: a convolutional neural network that classifies cotton leaf images into disease categories.",
    tech: ["Python", "TensorFlow", "Keras", "CNN"],
    status: "built",
    featured: true,
    date: "2023-10",
    links: {},
    diagram: "cotton-crop",
  },
  {
    // Client work: described from the workflow's structure only; client name withheld.
    slug: "prompt-feedback-loop",
    title: "LLM Prompt Feedback Loop",
    domain: "automation",
    impact:
      "Closes the loop between sales outcomes and AI prompts with a weekly, Claude-written tuning report.",
    summary:
      "Every week the workflow reads call outcomes, lost reasons and meeting briefs, computes metrics, and asks Claude to summarise the patterns. The findings are saved as prompt-tuning notes and posted to the team's Slack, so the prompts behind the other automations keep improving.",
    tech: ["n8n", "Claude API", "Google Sheets", "Slack"],
    status: "built",
    featured: true,
    date: "2026-04",
    links: {},
    diagram: "prompt-feedback-loop",
  },
  {
    // Work project: generic node names only; employer withheld on project cards.
    slug: "discord-onboarding",
    title: "Discord Team Onboarding",
    domain: "automation",
    impact: "New team members join the team's Discord server in one click through OAuth2.",
    summary:
      "The OAuth2 redirect hits an n8n webhook; the workflow exchanges the code for a token, reads the user's Discord profile and adds them to the server, with clear error responses when a step fails. A companion form flow records new members in a data table.",
    tech: ["n8n", "Discord OAuth2", "Discord API", "Webhooks"],
    status: "built",
    featured: false,
    date: "2026-04",
    links: {},
    diagram: "discord-onboarding",
  },
  {
    // Source on disk only survives as compiled modules (agents: planner, researcher, coder,
    // critic; tools: code_executor; pytest cache). TODO: confirm details + add the repo link.
    slug: "multi-agent-assistant",
    title: "Multi-Agent Coding Assistant",
    domain: "automation",
    impact:
      "Planner, researcher, coder and critic agents collaborate on a task in a LangGraph graph.",
    summary:
      "A LangGraph multi-agent system: a planner breaks the task down, a researcher gathers context, a coder writes code and runs it through a code-execution tool, and a critic reviews the result. Includes pytest tests.",
    tech: ["Python", "LangGraph", "LangChain", "pytest"],
    status: "in-progress",
    featured: false,
    date: "2026-04",
    links: {},
    diagram: "multi-agent",
  },
  {
    slug: "cv-ranker",
    title: "CV Ranker",
    domain: "automation",
    impact:
      "Paste a CV and a job description and get a match score, missing skills and rewrite tips.",
    summary:
      "An ATS-style matcher on this site: Claude compares a CV with a job description and returns schema-validated JSON (score, matched and missing skills, honest rewrite tips), with input limits and per-visitor rate limits.",
    tech: ["Next.js", "Claude API", "Zod"],
    status: "built",
    featured: false,
    date: "2026-10",
    links: { demo: "/tools/cv-ranker" },
    diagram: "cv-ranker",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
