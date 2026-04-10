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
├── app/                 # Next.js App Router
│   ├── (public)/        # Public pages (home, about, projects, etc.)
│   ├── admin/           # Password-gated CMS
│   ├── api/             # Route handlers (contact, chat, admin)
│   └── layout.tsx
├── components/          # React components
│   └── admin/
├── content/             # ← ALL content lives here as markdown
│   ├── about.md
│   ├── skills.md
│   ├── projects.md      # project index
│   ├── experience.md
│   ├── certifications.md
│   ├── education.md
│   ├── conferences.md
│   └── projects/        # one .md per project case study
├── lib/                 # content loader, gemini, github, utils
├── public/              # images, resume PDF, favicon
└── .env.example
```

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
