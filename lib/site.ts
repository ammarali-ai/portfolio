/** Site-wide config that isn't personal content. */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  repo: "https://github.com/ammarali-ai/portfolio",
  title: "Muhammad Ammar Ali | AI & Automation Engineer",
  description:
    "Portfolio of Muhammad Ammar Ali, an AI engineer in Lahore building LLM-powered automation with n8n and Claude, plus NLP and computer-vision models.",
} as const;
