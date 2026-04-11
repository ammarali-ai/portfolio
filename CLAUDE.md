# CLAUDE.md — Project Context

This file gives any AI assistant (Claude Code, Cursor, etc.) the context needed to work on this project effectively.

## Owner
**Muhammad Ammar Ali** — AI Automation Engineer @ Metaviz, BS Artificial Intelligence (Islamia University of Bahawalpur).
- Email: muhammadammaralibhutta@gmail.com
- GitHub: ammarali-ai
- Stack expertise: Python, TensorFlow, Keras, n8n, Claude/Claude Code, automation pipelines

## What This Project Is
A personal portfolio website that showcases Ammar's AI/ML and automation work, an embedded "Ask my CV" Gemini chatbot, and a no-code admin panel that lets him update content from any browser.

## Tech Stack
- **Framework:** Next.js 15 (App Router) + TypeScript + React 18
- **Styling:** Tailwind CSS v3 (custom dark/light theme via CSS variables)
- **Animation:** Framer Motion
- **Content storage:** Markdown files in `/content/` (parsed with `gray-matter` + `remark`)
- **AI chatbot:** Google Gemini API (`gemini-1.5-flash`) — free tier
- **Contact form:** Resend API — free tier
- **Admin auth:** bcrypt-hashed password + JWT session cookie (`jose`)
- **Admin storage:** Edits commit to GitHub via REST API → Vercel auto-redeploys
- **Hosting:** Vercel (free Hobby tier)
- **Cost:** $0/month, no paid services

## Folder Map
```
my_portfolio/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Home (hero, now, stats, projects, experience, github, testimonials, cta)
│   ├── about/                  # About + soft skills
│   ├── projects/[slug]/        # Project detail with OG image generator
│   ├── skills/
│   ├── experience/
│   ├── certifications/
│   ├── blog/[slug]/            # Research posts with OG image generator
│   ├── tools/cv-ranker/        # CV Ranker interactive tool
│   ├── contact/
│   ├── resume/
│   ├── admin/                  # Password-gated CMS
│   ├── api/                    # chat (streaming), contact, rank-cv, admin routes
│   ├── not-found.tsx           # Custom animated 404
│   ├── opengraph-image.tsx     # Root OG
│   └── layout.tsx
├── components/                 # React components (hero, nav, project-card, etc.)
│   └── admin/
├── content/                    # ← ALL content lives here as markdown
│   ├── profile.md              # name, role, socials, avatar
│   ├── about.md
│   ├── skills.md
│   ├── soft-skills.md
│   ├── experience.md
│   ├── certifications.md
│   ├── education.md
│   ├── conferences.md
│   ├── now.md                  # "Currently working on" one-liner
│   ├── testimonials.md         # LinkedIn recs (auto-hides if empty)
│   ├── projects/               # one .md per project
│   └── blog/                   # one .md per research post
├── lib/                        # content loader, gemini, github API, auth
└── public/                     # images, resume PDF, favicon
```

## Key Features
- **Streaming chatbot** — /api/chat uses Gemini generateContentStream over SSE
- **CV Ranker** — /tools/cv-ranker → Gemini-powered ATS match scoring
- **GitHub graph** — live contribution chart on home (ghchart.rshah.org)
- **OG images** — auto-generated at root, /blog/[slug], /projects/[slug] via next/og
- **Custom 404** — /not-found with Framer Motion animation
- **Admin panel** — password + GitHub API commits for markdown edits
- **Signature logo** — animated Caveat-font signature component
- **Token safety** — every AI route has input caps, output caps, and per-IP rate limits

## How To Update Site Content
Three options, in order of simplicity:

1. **Edit a markdown file in VS Code** → `git push` → Vercel redeploys.
2. **Use the admin panel** at `/admin` → log in → edit in the browser → save (commits to GitHub via API).
3. **Directly edit on GitHub.com** → commit → Vercel redeploys.

## How To Add a New Project
1. Create `content/projects/<slug>.md` with frontmatter:
   ```yaml
   ---
   title: "Project Title"
   slug: "project-slug"
   summary: "One-line description"
   tags: ["AI", "NLP"]
   tech: ["Python", "TensorFlow"]
   github: "https://github.com/..."
   demo: ""
   featured: false
   order: 5
   ---
   ```
2. Add the body in markdown below the frontmatter.
3. The project automatically appears on `/projects` and gets a detail page at `/projects/<slug>`.

## Hard Rules (DO NOT VIOLATE)
1. **Content rule:** All copy on the site must come from Ammar's CV unless he explicitly approves new content. No invented taglines, bios, or bullet points.
2. **Free-tier rule:** Do not add any paid service, API, or dependency without his explicit approval. The whole stack is free for a reason.
3. **Style rule:** The portfolio is a sleek dev portfolio. The Office Taskboard + Discord Automation is one of his SHOWCASE PROJECTS, NOT a UI inspiration. Do not turn the site into a task board.
4. **No build pipeline gymnastics:** Keep it simple. Markdown in, HTML out. No exotic build tools.

## Useful Commands
```bash
npm install        # install deps
npm run dev        # start dev server at localhost:3000
npm run build      # production build (run before deploy to catch errors)
npm run start      # serve production build locally
npm run lint       # eslint check
```

## Required Env Vars
See `.env.example`. The site will run without any env vars (chatbot/contact/admin will be disabled), so you can dev locally without setting anything up.

## Deployment
1. Push to `github.com/ammarali-ai/portfolio`
2. Import to Vercel
3. Set env vars from `.env.example`
4. Deploy

See `DEPLOYMENT.md` for the full step-by-step.
