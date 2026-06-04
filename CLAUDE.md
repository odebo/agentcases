# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

No test suite. Always pass `--registry https://registry.npmjs.org` to any npm install commands — the default registry is a Xiaomi private registry with an expired token.

## Stack

- **Next.js 16.2.7** with App Router, React 19
- **Tailwind CSS v3** (NOT v4) — `tailwind.config.js` + standard PostCSS pipeline
- **next-mdx-remote v6** (`next-mdx-remote/rsc`) for Server Components
- **gray-matter** for MDX frontmatter parsing
- Deployed to Vercel, domain `www.agenthanks.com`, Node 20 pinned in `package.json` engines

## Critical: Tailwind v3, not v4

`globals.css` uses `@tailwind base/components/utilities` (v3 syntax). Do NOT use `@import "tailwindcss"` or `@source` / `@plugin` directives (v4 syntax). Next.js 16 uses Turbopack by default, which does not run PostCSS — v3 works because Next.js has built-in Tailwind v3 support that bypasses this.

## Route Structure

```
/                        → app/page.tsx         (EN homepage)
/zh/                     → app/zh/page.tsx      (ZH homepage)
/case/[slug]             → app/case/[slug]/page.tsx
/zh/case/[slug]          → app/zh/case/[slug]/page.tsx
/industry/[slug]         → app/industry/[slug]/page.tsx
/zh/industry/[slug]      → app/zh/industry/[slug]/page.tsx
/task/[slug]             → app/task/[slug]/page.tsx   (EN only, ZH has /zh/task/[slug])
/search?q=               → app/search/page.tsx  (dynamic, server-rendered)
/zh/search?q=            → app/zh/search/page.tsx
/sitemap.xml             → app/sitemap.ts       (base URL: https://www.agenthanks.com)
/rss.xml                 → app/rss.xml/route.ts
```

All `/zh/*` pages pass `lang="zh"` to components, which switch text, dates, and links accordingly.

## Component Architecture

**HomeLayout** (`components/HomeLayout.tsx`) — client component that owns the industry filter state. Renders `Sidebar` + `HomeFeed` together. Used by both `/` and `/zh/`.

**Sidebar** (`components/Sidebar.tsx`) — client component. Receives `active` / `onChange` / `industryCounts` as props from HomeLayout. Industry items are filter buttons; no Task section (removed).

**HomeFeed** (`components/HomeFeed.tsx`) — client component. Receives `activeIndustry` prop from HomeLayout (no internal state).

**Nav** (`components/Nav.tsx`) — client component with search form. Submits to `/search?q=` or `/zh/search?q=`. No nav links (removed), only logo + search + EN/ZH switcher.

## Content Architecture

All case studies live in `content/cases/*.md`. The slug is the filename without `.md`. Files are auto-discovered at build time — no registration needed.

**Required frontmatter fields:**
```yaml
title_en, title_zh        # bilingual title
summary_en, summary_zh    # one-paragraph summary
comment_en, comment_zh    # editorial insight shown in "WHY IT MATTERS" callout
industry: sales | customer-service | hr | legal | operations | marketing | finance | product
task: [automation | data-analysis | content-generation | decision-support | customer-communication]
framework: string          # e.g. "GPT-4", "Claude", "LangChain"
difficulty: no-code | low-code | dev-required
date: ISO8601              # controls sort order on homepage
source: string
source_url: string
meta_title, meta_description
featured?: boolean
```

## Data Flow

`lib/cases.ts` reads all markdown files at build time, caches in a module-level variable, exposes `getAllCases()`, `getCaseBySlug()`, `getCasesByIndustry()`, `getCasesByTask()`, `groupByDate()`. Server-side only — never import in client components.

## Design System

Dark GitHub-style theme. CSS variables in `globals.css`: `--bg`, `--bg-secondary`, `--border`, `--border-secondary`, `--text`, `--text-muted`, `--text-dim`, `--accent-green` (#3fb950), `--accent-blue`, `--accent-orange`, `--accent-yellow`.

Use via Tailwind arbitrary values: `text-[var(--accent-green)]`, `bg-[#238636]` (active/selected green).

MDX body content uses `prose prose-invert prose-sm` from `@tailwindcss/typography`.

## Automated Case Collection

`scripts/collect-cases.mjs` — weekly pipeline run via GitHub Actions (`.github/workflows/collect-cases.yml`, every Monday 02:00 UTC). Requires two GitHub repository secrets: `TAVILY_API_KEY` and `ANTHROPIC_API_KEY`. Uses Tavily to search for real-world AI agent case studies, Claude Haiku to extract and format them, then auto-commits new `.md` files to `content/cases/`.

Trigger manually: `gh workflow run collect-cases.yml --repo odebo/agentcases`
