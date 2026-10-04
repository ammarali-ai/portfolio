import type { ExperienceItem } from "./schema";

/** Newest first. Wording is taken from the resume; no new numbers added. */
export const experience: readonly ExperienceItem[] = [
  {
    role: "AI Automation Engineer",
    company: "Metaviz",
    location: "Lahore",
    note: "Chief Minister IT Internship Program (CMIT)",
    start: "2026-01",
    end: "2026-06",
    bullets: [
      "Designed real-time monitoring and automation workflows with n8n and the Claude API, covering automated data collection, anomaly detection and alert generation.",
      "Built decision-support flows that pair LLM analysis with live data pipelines, producing automated risk summaries for management.",
      "Engineered pipelines integrating APIs and third-party services for continuous KPI monitoring and automated performance reporting.",
    ],
    tech: ["n8n", "Claude API", "Webhooks", "REST APIs", "Discord", "Google Sheets"],
  },
  {
    role: "IT Support & Systems Monitoring Officer",
    company: "Mindbridge",
    location: "Lahore",
    start: "2024-10",
    end: "2026-01",
    bullets: [
      "Monitored system performance and incident data across 900+ user accounts and produced regular status and compliance reports.",
      "Analysed network metrics with PingPlotter, contributing to a 25–30% performance improvement.",
      "Maintained Cisco AMP security dashboards tracking endpoint threats and compliance; managed telephony systems, reducing disruptions by 20%.",
    ],
    tech: ["Cisco AMP", "PingPlotter", "Networking", "Windows / macOS / Linux"],
  },
  {
    role: "Data Science & Analytics Trainee",
    company: "Knowledge Streams",
    location: "Lahore",
    start: "2024-07",
    end: "2024-09",
    bullets: [
      "Ran exploratory data analysis on large datasets with Pandas and NumPy to surface trends for decision-making.",
      "Applied Scikit-learn classifiers and built interactive Power BI dashboards for KPI monitoring.",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Power BI"],
  },
  {
    role: "Python & Data Processing Intern",
    company: "HiSkyTech",
    location: "Remote",
    start: "2024-07",
    end: "2024-08",
    bullets: [
      "Automated data processing and validation pipelines with Pandas and NumPy to keep reporting data consistent.",
    ],
    tech: ["Python", "Pandas", "NumPy"],
  },
];
