# Muhammad Ammar Ali — Portfolio

A premium personal portfolio for an AI Automation Engineer. Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Gemini AI, and Resend. Content lives in markdown files. **100% free stack** — no paid services.

## Features

- Sleek dark/light dev portfolio with glassmorphism + gradient accents
- **11 pages**: Home, About, Projects, Project detail, Skills, Experience, Certifications, Blog, Blog detail, CV Ranker tool, Contact, Resume
- **Markdown-driven content** — edit `content/*.md` to update the site
- **Admin panel** at `/admin` — password-gated, edits commit to GitHub via API
- **Streaming "Ask my CV" Gemini chatbot** — real-time token streaming via SSE
- **CV Ranker tool** — paste CV + JD, Gemini scores the match and suggests fixes
- **Animated signature logo** using Caveat font
- **GitHub contribution graph** live on home page
- **"Now" section** — one-line live status from `content/now.md`
- **Testimonials section** — pulls from `content/testimonials.md`, hides if empty
- **Animated stats counter** — 4 KPIs counting up on scroll
- **9 blog posts** on AI research papers (Transformer, BERT, GPT-3, Diffusion, LoRA, CoT, RAG, etc.)
- **Blog shuffle + research portal links** (arXiv, Papers with Code, Google Scholar, HF)
- **Custom animated 404** page
- **Auto-generated OG images** at root, blog, and project levels via `next/og`
- Contact form powered by Resend (free tier)
- Mobile-first responsive, smooth animations, dark/light theme toggle
- Complete SEO metadata + sitemap + robots

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The site **runs without any env vars** — chatbot, contact form, and admin will simply be disabled (or log to console) until you fill in the keys. This makes local dev frictionless.

## Updating Content

Three options:

1. **Edit a markdown file in your editor** → `git push` → Vercel redeploys.
2. **Use the admin panel** at `/admin` → log in → edit in browser → save.
3. **Edit on github.com** directly → commit → Vercel redeploys.

See `ADMIN_GUIDE.md` for details.

## Adding a Project

1. Create `content/projects/<slug>.md` with frontmatter:
   ```yaml
   ---
   title: "Your Project"
   slug: "your-project"
   summary: "One-line"
   tags: ["AI"]
   tech: ["Python"]
   github: ""
   demo: ""
   featured: false
   order: 5
   ---
   ```
2. Write the body in markdown.
3. The project automatically appears on `/projects` and gets a detail page.

## Stack

| | |
|--|--|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v3 + custom CSS variables for theming |
| Animation | Framer Motion |
| Content | Markdown + frontmatter (`gray-matter` + `remark`) |
| AI | Google Gemini (`gemini-1.5-flash`) — free tier |
| Email | Resend — free tier (3,000/mo) |
| Auth | bcrypt + JWT cookie session (`jose`) |
| Hosting | Vercel free Hobby tier |
| **Total cost** | **$0/month** |

## Token / Quota Safety

The Gemini chat route has **strict caps** to stay safely inside the free tier:
- `maxOutputTokens: 384`
- Question length capped at 500 chars
- CV context trimmed to 6000 chars
- Per-IP rate limit: 8 messages / minute
- Contact form: 5 messages / 10 min per IP

## Scripts

```bash
npm run dev      # local dev
npm run build    # production build (run before deploying)
npm start        # serve production build
npm run lint     # eslint
```

## Deploy

See `DEPLOYMENT.md`.

## Project Structure

```
app/             Next.js App Router pages
├── (home)       /
├── about/
├── projects/    /projects + /projects/[slug]
├── skills/
├── experience/
├── certifications/
├── contact/
├── resume/
├── admin/       password-gated CMS
└── api/         contact, chat, admin routes

components/      React components
content/         markdown content (edit to update site)
lib/             content loader, Gemini, GitHub API, auth
public/          images, resume PDF
```

## License

Personal use. © Muhammad Ammar Ali.
