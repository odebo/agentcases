# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

No test suite. No `output: 'export'` — Vercel runs Next.js in server/SSG mode.

## Stack

- **Next.js 16.2.7** with App Router, React 19
- **Tailwind CSS v3** (NOT v4) — `tailwind.config.js` + standard PostCSS pipeline
- **next-mdx-remote v6** (`next-mdx-remote/rsc`) for Server Components
- **gray-matter** for MDX frontmatter parsing
- Deployed to Vercel, domain `www.agenthanks.com`

## Critical: Tailwind v3, not v4

`globals.css` uses `@tailwind base/components/utilities` (v3 syntax). Do NOT use `@import "tailwindcss"` or `@source` / `@plugin` directives (v4 syntax). Next.js 16 uses Turbopack by default, which does not run PostCSS — v3 works because Next.js has built-in Tailwind v3 support that bypasses this.

## Content Architecture

All case studies live in `content/cases/*.md` as MDX with frontmatter. The slug is the filename without `.md`.

**Required frontmatter fields** (see `lib/types.ts` for full type):
```yaml
title_en, title_zh        # bilingual title
summary_en, summary_zh    # one-paragraph summary
comment_en, comment_zh    # editorial insight ("AI comment" callout)
industry: sales | customer-service | hr | legal | operations | marketing | finance | product
task: [automation | data-analysis | content-generation | decision-support | customer-communication]
framework: string          # e.g. "GPT-4", "Claude", "LangChain"
difficulty: no-code | low-code | dev-required
date: ISO8601              # controls sort order on homepage
source: string
source_url: string
meta_title, meta_description
featured?: boolean         # optional, highlights the card
```

## Data Flow

`lib/cases.ts` reads all markdown files at build time, caches them in a module-level variable, and exposes `getAllCases()`, `getCaseBySlug()`, `getCasesByIndustry()`, `getCasesByTask()`, `groupByDate()`. All content reading is server-side only.

## Page Structure

- `/` — `app/page.tsx` → `Nav` + `Sidebar` + `HomeFeed` (client component with industry filter)
- `/case/[slug]` — MDX rendered via `MDXRemote` from `next-mdx-remote/rsc`
- `/industry/[slug]` and `/task/[slug]` — static taxonomy pages, params come from enum keys in `lib/types.ts`
- `/rss.xml` — `app/rss.xml/route.ts` using `lib/rss.ts`
- `/sitemap.xml` — `app/sitemap.ts`, base URL is `https://www.agenthanks.com`

## Design System

Dark GitHub-style theme. Colors are CSS variables defined in `globals.css`:
`--bg`, `--bg-secondary`, `--border`, `--border-secondary`, `--text`, `--text-muted`, `--text-dim`, `--accent-green`, `--accent-blue`, `--accent-orange`, `--accent-yellow`.

Use `var(--accent-green)` etc. in Tailwind via `text-[var(--accent-green)]` arbitrary value syntax. The `prose-invert prose-sm` classes from `@tailwindcss/typography` style MDX body content on case detail pages.

## Adding a New Case

Create `content/cases/<industry>-<descriptor>.md` with all required frontmatter fields. The file is auto-discovered at build time — no imports or registration needed. Slug is the filename.

## npm on This Machine

Always pass `--registry https://registry.npmjs.org` to npm commands. The default registry points to a Xiaomi private registry with an expired token.
