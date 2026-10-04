@AGENTS.md

# CLAUDE.md: project context

Context for AI coding assistants (Claude Code, Cursor, …) working on this repo.

## Owner

**Muhammad Ammar Ali**, AI Engineer · AI Automation Engineer · ML Engineer, based in Lahore, Pakistan.

- Email: muhammadammaralibhutta@gmail.com · GitHub: `ammarali-ai` · LinkedIn: `ammar-ali-ai`
- Current role: AI Automation Engineer (CMIT Intern) at Metaviz. Stack: n8n, Claude API, Python, TensorFlow.

## What this is

Portfolio **v2**. It proves engineering ability by _showing working AI_: a 3D "Neural Core" hero, a live
"Ask Ammar" assistant, n8n workflows rendered as animated React Flow diagrams, a model playground and a terminal
easter egg. The depth reference is nadeem.cloud (stats, categories, featured projects, timeline, tech arsenal), but the visual identity must be our own.
v1 (Gemini chat, markdown and an admin panel) lives in git history before the `v2` work.

Full plan: [docs/PLAN.md](docs/PLAN.md).

## Stack

Next.js 16 (App Router, Turbopack) · React 19.2 · TypeScript strict · Tailwind CSS v4 · shadcn/ui ·
`motion` · Lenis · React Three Fiber + drei + postprocessing · `@xyflow/react` · Velite (MDX) ·
`@anthropic-ai/sdk` (Claude Haiku) · Resend + Zod · Upstash Ratelimit (in-memory fallback) · Vercel.

## Folder map (target)

```
app/                     routes: /, /projects, /projects/[slug], /research, /research/[slug],
                         /automations, /resume, /tools/cv-ranker
app/api/                 chat (streaming), contact, rank-cv
components/              layout/ sections/ three/ flow/ chat/ terminal/ ui/ (shadcn)
content/schema.ts        TYPES for all content (start here)
content/*.ts             profile, experience, skills, certifications, education, stats, domains, workflows-index
content/projects/*.mdx   case studies     content/research/*.mdx   notes / paper explainers
content/workflows/*.json n8n exports (credentials stripped)
content/knowledge.md     grounding text for the AI assistant
lib/                     anthropic.ts, ratelimit.ts, n8n-to-flow.ts, utils.ts
docs/PLAN.md             phased plan + status
```

## Content rules (non-negotiable)

1. **The resume is the single source of truth.** Never invent numbers, clients, testimonials or links.
   When something is missing, use a visible `TODO:` placeholder (or `null` + `needsVerification`).
2. **No phone number** anywhere on the site or in committed files. Use email, LinkedIn and GitHub only.
3. Describe each project **on its own terms** (what it does, dataset, accuracy, stack). Put speculative
   framing such as "applicable to disaster management" in the separate `possibleApplications` line.
4. State only what the code proves. Example: the Fake News repo uses TF-IDF + Multinomial NB (Streamlit),
   while the resume says BERT + SVM. Confirm with the owner before publishing either.
5. No empty "testimonials" section. Only add one when real quotes exist.
6. All copy lives in `/content`; components only render it.

## Code conventions

- No `any`. Prefer `readonly` arrays in content types. Server Components by default; add `"use client"` only
  for interactivity (3D, flow, chat, terminal, theme toggle).
- Small, reusable components. Colors come from CSS variables / Tailwind tokens only, never hard-coded hex values in components.
- Respect `prefers-reduced-motion`: no 3D animation or heavy motion, static fallbacks instead.
- 3D must never block LCP. Load it with `next/dynamic` (`ssr: false`) behind a lightweight poster.
- Secrets are server-only (`ANTHROPIC_API_KEY`, `RESEND_API_KEY`, …). Never prefix them with `NEXT_PUBLIC_`.
- Next 16 specifics: `params`/`searchParams` are async, `middleware` is renamed `proxy`, and lint runs through the ESLint CLI.
  Check `node_modules/next/dist/docs/` before using an unfamiliar API.

## Commands

```bash
npm run dev          # local dev (Turbopack)
npm run build        # production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier (+ tailwind class sorting)
```

Every phase must end with `lint`, `typecheck` and `build` all clean.

## Environment notes

- Develop in `C:\dev\my_portfolio`, a clone that lives outside OneDrive. OneDrive sync corrupted v1's `.git` and dropped files.
  The OneDrive copy (`Desktop\my_portfolio`) is a source-only checkout for browsing; refresh it with `git pull`.
- On this Windows machine Node may be missing from PATH in some shells. It lives in `C:\Program Files\nodejs`.
- Git: work happens on branch `v2`; merge to `main` (the production branch) at Phase 7.

## Phase status

- [x] 1. Audit & setup: scaffold, deps, configs, content schema, docs
- [x] 2. Foundation: tokens, fonts, layout, navbar/footer, theme, Lenis, content files from resume
- [ ] 3. Core sections (no 3D)
- [ ] 4. Signature features: Neural Core, role rotator, n8n → React Flow, terminal
- [ ] 5. AI assistant + CV ranker on Claude
- [ ] 6. Projects & research (Velite MDX)
- [ ] 7. Polish & ship: contact, SEO/OG, perf + a11y, deploy
