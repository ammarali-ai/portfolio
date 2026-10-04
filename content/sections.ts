import type { SectionCopy } from "./schema";

/** Heading copy for every homepage section, in page order. */
export const sections = {
  domains: {
    eyebrow: "01 · Research & domains",
    title: "Five domains, one toolkit",
    description:
      "Where I apply ML and LLMs, from things I've shipped to areas I'm actively exploring. Each one maps to a node in the neural core above.",
  },
  projects: {
    eyebrow: "02 · Featured work",
    title: "Projects that actually run",
    description:
      "Production automations, full-stack AI apps and the models behind them. Every number here comes from the project itself.",
  },
  automation: {
    eyebrow: "03 · Live automation",
    title: "How my alert system thinks",
    description:
      "A production Real-Time Monitoring & Alert System I built, step by step. Below it: the kinds of n8n workflows I build.",
  },
  experience: {
    eyebrow: "04 · Experience",
    title: "Where I've worked",
    description: "From IT operations and data analysis to building AI automation in production.",
  },
  skills: {
    eyebrow: "05 · Tech arsenal",
    title: "Tools I reach for",
    description: "Grouped the way I use them, from training models to shipping automations.",
  },
  certifications: {
    eyebrow: "06 · Certifications",
    title: "Keeping the fundamentals sharp",
    description: "Recent coursework in ML, data science and generative AI.",
  },
  education: {
    eyebrow: "07 · Education",
    title: "Education & events",
    description:
      "A degree in Artificial Intelligence, plus the conferences and AI expos I've attended.",
  },
  contact: {
    eyebrow: "08 · Contact",
    title: "Let's build something useful",
    description:
      "Hiring for an AI or automation role, or have a workflow that should run itself? Send a message and I'll reply by email.",
  },
} as const satisfies Record<string, SectionCopy>;

/** "Ask Ammar" chat widget copy. */
export const chatCopy = {
  launcher: "Ask Ammar",
  title: "Ask Ammar",
  subtitle: "AI assistant · answers from this portfolio",
  greeting:
    "Hi! I can answer questions about Ammar's experience, projects and skills. What would you like to know?",
  placeholder: "Ask about projects, skills, experience…",
  suggestions: [
    "What does Ammar build with n8n and Claude?",
    "Tell me about the Call Analyzer",
    "What ML projects has he done?",
    "Is he open to new roles?",
  ],
  disclaimer:
    "AI answers can be wrong. Messages go to Anthropic's API to generate a reply and aren't stored by this site.",
} as const;

/** /tools/cv-ranker page copy. */
export const cvRankerCopy = {
  eyebrow: "Live AI tool",
  title: "CV Ranker",
  description:
    "Paste a CV and a job description. Claude scores the match, lists what lines up and what's missing, and suggests honest edits that make your real experience easier to see.",
  privacy:
    "Your text is sent to Anthropic's API to generate the score. This site doesn't store it.",
} as const satisfies SectionCopy & { privacy: string };

/** Heading for the compact list of non-featured projects under the bento grid. */
export const moreProjectsTitle = "More projects";

/** Small UI copy in the hero. */
export const heroCopy = {
  domainLegend: "Explore my domains",
} as const;

/** Sub-heading above the n8n category cards in the automation section. */
export const automationGalleryTitle = "What else I automate with n8n";

/** /automations page header. */
export const automationsPage = {
  eyebrow: "Automation gallery",
  title: "Workflows, animated",
  description:
    "Real n8n workflows I've built, replayed node by node. My own projects are rendered straight from their exports; client and employer work keeps its real structure with names anonymized. Drag to pan, use the controls to zoom.",
} as const satisfies SectionCopy;
