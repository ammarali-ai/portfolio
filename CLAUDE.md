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
`motion` · Lenis · React Three Fiber + drei (custom shaders) · `@xyflow/react` · `@next/mdx` ·
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
   The public CV (`public/Muhammad-Ammar-Ali-Resume.pdf`) is a phone-free copy. Never replace it with the original.
3. Describe each project **on its own terms** (what it does, dataset, accuracy, stack). Put speculative
   framing such as "applicable to disaster management" in the separate `possibleApplications` line.
4. When the resume and a code repo disagree, confirm with the owner before publishing. (Resolved
   example: Fake News Detection is BERT + SVM per the owner; the local TF-IDF + NB repo is an older prototype.)
5. No empty "testimonials" section. Only add one when real quotes exist.
6. All copy lives in `/content`; components only render it.
7. **Client and employer work is anonymized.** Never show client names (e.g. company or person names
   in n8n folder/node names), anywhere: site, docs, commits or commit messages. Personal projects
   may be imported from n8n exports via `scripts/import-n8n.mjs` (structure only). Client flows are
   hand-written in `content/flows.ts` with generic node labels and `source: "n8n-anonymized"`.
   **Employer names (former companies) stay out of all project-facing content**: project cards,
   diagrams, workflow descriptions, domain links. Use "Work project · anonymized". The only place
   employers appear is the Experience timeline (the owner's work history, as on the resume).
   Before committing, grep for client and company names.
8. Architecture diagrams (`source: "architecture"`) may only contain steps the resume or code confirms.

## Code conventions

- No `any`. Prefer `readonly` arrays in content types. Server Components by default; add `"use client"` only
  for interactivity (3D, flow, chat, terminal, theme toggle).
- Small, reusable components. Colors come from CSS variables / Tailwind tokens only, never hard-coded hex values in components.
- Respect `prefers-reduced-motion`: no 3D animation or heavy motion, static fallbacks instead.
- Scroll reveals use `<Reveal>` (CSS scroll-driven animation, no JS): content is visible by default and must never depend on JS to appear.
- 3D must never block LCP. Load it with `next/dynamic` (`ssr: false`) behind a lightweight poster.
  The hero photo is the poster + LCP image; the Neural Core shader hides particles behind it
  (keep `PHOTO_RADIUS_FRACTION` in hero-visual.tsx in sync with the photo's CSS inset).
- Animated diagrams: `<LazyFlow spec={getFlow(id)} />` (server-renderable shell, lazy React Flow,
  sizes itself from the layout; long flows snake into rows). Use `interactive` for pan/zoom.
- Decorative bleed is clipped by `main { overflow-x: clip }`. Don't put overflow on `<body>`
  (it propagates to the viewport and doesn't clip).
- WebGL-only colors live in `lib/palette.ts` (hex mirrors of the CSS tokens). Keep them in sync.
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
  `OneDrive\Desktop\my_portfolio` is still that old, broken v1 copy. Don't work there.
  `OneDrive\Desktop\my_portfolio_v2` is a clean clone of `v2` (source only) for browsing in VS Code.
  Refresh it with `git pull` (from GitHub) or `git pull dev v2` (from `C:\dev\my_portfolio`, works offline).
- On this Windows machine Node may be missing from PATH in some shells. It lives in `C:\Program Files\nodejs`.
- Git: work happens on branch `v2`; merge to `main` (the production branch) at Phase 7.

## Phase status

- [x] 1. Audit & setup: scaffold, deps, configs, content schema, docs
- [x] 2. Foundation: tokens, fonts, layout, navbar/footer, theme, Lenis, content files from resume
- [x] 3. Core sections (no 3D)
- [x] 4. Signature features: Neural Core, role rotator, animated diagrams for workflows + projects,
      /automations gallery, terminal
- [x] 5. AI assistant + CV ranker on Claude (needs ANTHROPIC_API_KEY to go live)
- [x] 6. Projects & research: /projects archive + 14 MDX case studies, /research (13 paper notes + 5 draft domain notes)
- [ ] 7. Polish & ship: contact, SEO/OG, perf + a11y, deploy
