import type { Domain } from "./schema";

/**
 * Research domains: the five clusters in the 3D Neural Core, in node order.
 * "interest" and "problems" describe research interests, not claims of shipped work.
 * TODO: personalise the interest/problem wording in your own voice.
 */
export const domains: readonly Domain[] = [
  {
    id: "automation",
    title: "AI Automation",
    status: "built",
    interest:
      "Turning repetitive operational work into reliable, observable pipelines where an LLM does the judgement step and the workflow does the plumbing.",
    problems: [
      "Real-time monitoring that alerts the right person with context instead of noise",
      "LLM steps that stay predictable: validation, retries and human hand-off",
      "Reporting that writes itself from live business data",
    ],
    related: [
      { label: "Real-Time Monitoring & Alert System", href: "/#automation" },
      { label: "Call Analyzer", href: "/#project-call-analyzer" },
      { label: "AI Meeting Notes Bot", href: "/#project-meeting-notes-bot" },
      { label: "Animated n8n workflow gallery", href: "/automations" },
    ],
  },
  {
    id: "agriculture",
    title: "AI × Agriculture",
    status: "built",
    interest:
      "Image-based crop disease detection that works with the small, messy datasets farmers actually have.",
    problems: [
      "Early disease detection from leaf images",
      "Generalising from limited labelled data with transfer learning",
      "Lightweight models that can run on low-end phones",
    ],
    related: [
      // Phase 6: switch these anchors to /projects/<slug> case studies.
      { label: "Rice Leaf Disease AI (92% accuracy)", href: "/#project-rice-leaf-disease" },
      { label: "Cotton Crop Disease Detection (89%)", href: "/#project-cotton-crop-disease" },
    ],
  },
  {
    id: "cybersecurity",
    title: "AI × Cybersecurity",
    status: "exploring",
    interest:
      "Using ML on endpoint and network telemetry to separate real threats from alert fatigue.",
    problems: [
      "Anomaly detection on endpoint and network metrics",
      "Summarising security alerts for non-specialist teams",
      "Detecting misinformation and manipulated content",
    ],
    related: [
      { label: "Digital Forensics & Cybersecurity (NAVTTC)", href: "/#certifications" },
      { label: "Endpoint threat monitoring (Cisco AMP)", href: "/#experience" },
      { label: "Fake News Detection (NLP)", href: "/#project-fake-news-detection" },
    ],
  },
  {
    id: "fintech",
    title: "AI × FinTech",
    status: "exploring",
    interest:
      "Document understanding and risk signals for finance operations: invoices, transactions and reporting.",
    problems: [
      "Automated invoice and document extraction",
      "Transaction anomaly and fraud signals",
      "Explainable risk summaries for decision makers",
    ],
    // TODO: link a project once one exists (e.g. the n8n invoice workflow).
    related: [],
  },
  {
    id: "healthcare",
    title: "AI × Healthcare",
    status: "exploring",
    interest:
      "Applying the computer-vision and NLP methods from my agriculture work to medical imaging and clinical text.",
    problems: [
      "Medical image classification with limited data",
      "Clinical note summarisation with grounded LLMs",
      "Triage assistants that know when to defer to a human",
    ],
    // TODO: link a project or note once one exists.
    related: [],
  },
];
