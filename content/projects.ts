import type { ProjectMeta } from "./schema";
import { monitoringPipeline } from "./workflows-index";

/**
 * Project metadata (card + archive data). Long-form case studies arrive as MDX in Phase 6.
 * Order = display order. Facts come from the resume or the project's own code only.
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
      "A production n8n system at Metaviz. Secure webhooks receive live task events; the workflow validates the payload, maps it to users, handles errors and notifies teams in real time, with Claude used for analysis and summaries.",
    tech: ["n8n", "Webhooks", "Claude API", "Discord", "REST APIs"],
    status: "built",
    featured: true,
    date: "2026-04",
    links: {},
    possibleApplications: "Early-warning and alert dissemination, e.g. for disaster management.",
    flow: monitoringPipeline.map((s) => s.label),
  },
  {
    slug: "call-analyzer",
    title: "Call Analyzer",
    domain: "automation",
    impact: "Upload a call transcript and get a structured LLM analysis on a per-user dashboard.",
    summary:
      "A full-stack Next.js app with Supabase auth and row-level security. An analysis API runs transcripts through a pluggable LLM provider plus rule-based flags and stores the result per call; companion n8n workflows generate documents.",
    tech: ["Next.js", "TypeScript", "Supabase", "LLM API", "n8n"],
    status: "built",
    featured: true,
    date: "2026-05",
    links: {},
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
    flow: [
      "Webhook",
      "Validate",
      "Fetch transcript",
      "Chunk",
      "Gemini notes",
      "Discord thread",
      "Sheets log",
    ],
    status: "built",
    featured: true,
    date: "2026-04",
    links: {},
  },
  {
    slug: "fake-news-detection",
    title: "Fake News Detection",
    domain: "cybersecurity",
    impact: "Multilingual news classifier reported at 90% accuracy.",
    // TODO: confirm the model stack. Resume says BERT + SVM (English, Urdu, Spanish);
    // the repo contains a TF-IDF + Multinomial NB Streamlit app with English and Urdu data.
    summary:
      "An NLP system that classifies news text as real or fake across languages, served through a Streamlit interface.",
    tech: ["Python", "NLP", "Scikit-learn", "Streamlit"],
    status: "built",
    featured: true,
    date: "2024-10",
    links: {},
    possibleApplications: "Monitoring misinformation during emergencies.",
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
  },
  {
    slug: "cv-ranker",
    title: "CV Ranker",
    domain: "automation",
    impact:
      "Paste a CV and a job description and get a match score, missing skills and rewrite tips.",
    summary:
      "An ATS-style matcher that returns strict JSON (score, matched and missing keywords, suggestions). Being rebuilt on Claude for this site.",
    tech: ["Next.js", "Claude API", "Zod"],
    status: "in-progress",
    featured: false,
    date: "2026-10",
    links: {},
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
