#!/usr/bin/env node
/**
 * collect-cases.mjs
 * Weekly pipeline: Tavily search → Claude extraction → commit new case files
 *
 * Required env vars:
 *   TAVILY_API_KEY   - https://tavily.com
 *   ANTHROPIC_API_KEY - https://console.anthropic.com
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const TAVILY_API_KEY = process.env.TAVILY_API_KEY
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const CASES_DIR = path.join(process.cwd(), 'content/cases')
const DRY_RUN = process.env.DRY_RUN === 'true'

if (!TAVILY_API_KEY || !ANTHROPIC_API_KEY) {
  console.error('Missing TAVILY_API_KEY or ANTHROPIC_API_KEY')
  process.exit(1)
}

// ─── Search queries ───────────────────────────────────────────────────────────
const QUERIES = [
  'AI agent automation enterprise case study results 2025',
  'AI agent customer service ROI results case study',
  'AI agent sales automation productivity improvement',
  'AI agent HR recruiting automation case study',
  'AI agent legal contract review time savings',
  'AI agent operations workflow automation results',
  'AI agent marketing content automation ROI',
  'AI agent finance accounting automation',
  'LangChain GPT-4 Claude enterprise deployment results',
  'agentic AI workflow business productivity improvement',
]

// ─── Tavily search ────────────────────────────────────────────────────────────
async function searchTavily(query) {
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TAVILY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      max_results: 5,
      search_depth: 'advanced',
      include_raw_content: true,
    }),
  })
  if (!res.ok) throw new Error(`Tavily error: ${res.status}`)
  const data = await res.json()
  return data.results || []
}

// ─── Claude extraction ────────────────────────────────────────────────────────
async function extractWithClaude(url, title, content) {
  const prompt = `You are extracting data from a webpage to create a case study entry for Agenthanks, a site collecting real-world AI Agent use cases.

Page URL: ${url}
Page Title: ${title}
Page Content (truncated to 8000 chars):
${content.slice(0, 8000)}

Your task:
1. Determine if this page describes a REAL case study where a company used an AI Agent (or AI automation with agentic behavior) and got measurable results.
   - Must have: specific company/team, specific AI tool used, specific quantitative results (%, time saved, volume, etc.)
   - Reject: generic blog posts, product announcements, hypothetical examples, opinion pieces

2. If it IS a valid case study, extract the data and return JSON in this exact format:
{
  "valid": true,
  "slug": "industry-descriptor-keyword",
  "title_en": "Company X Does Y With AI Agent Getting Z Result",
  "title_zh": "中文标题（翻译）",
  "summary_en": "One paragraph summary of what they built and the key result.",
  "summary_zh": "中文摘要",
  "comment_en": "2-3 sentence editorial insight: what makes this case interesting or what principle it illustrates.",
  "comment_zh": "中文评论",
  "industry": "sales|customer-service|hr|legal|operations|marketing|finance|product",
  "task": ["automation", "data-analysis", "content-generation", "decision-support", "customer-communication"],
  "framework": "GPT-4|Claude|LangChain|OpenAI Assistants|etc",
  "difficulty": "no-code|low-code|dev-required",
  "date": "YYYY-MM-DDT00:00:00Z",
  "source": "Publication or Blog Name",
  "source_url": "${url}",
  "meta_title": "SEO title under 60 chars",
  "meta_description": "SEO description under 155 chars",
  "body_en": "Full markdown body with ## sections: The Problem, The Agent Solution, Results, (optional insight section)"
}

3. If NOT a valid case study, return: {"valid": false, "reason": "brief reason"}

Return ONLY the JSON object, no other text.`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Claude error: ${res.status} ${err}`)
  }
  const data = await res.json()
  const text = data.content[0].text.trim()
  return JSON.parse(text)
}

// ─── Dedup check ──────────────────────────────────────────────────────────────
function getExistingSlugs() {
  if (!fs.existsSync(CASES_DIR)) return new Set()
  return new Set(
    fs.readdirSync(CASES_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''))
  )
}

function getExistingSourceUrls() {
  if (!fs.existsSync(CASES_DIR)) return new Set()
  const urls = new Set()
  for (const f of fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.md'))) {
    const content = fs.readFileSync(path.join(CASES_DIR, f), 'utf-8')
    const match = content.match(/source_url:\s*"?(.+?)"?\s*\n/)
    if (match) urls.add(match[1].trim())
  }
  return urls
}

// ─── Write case file ──────────────────────────────────────────────────────────
function writeCaseFile(slug, extracted) {
  const { body_en, ...frontmatter } = extracted
  const taskYaml = JSON.stringify(frontmatter.task)
  const content = `---
title_en: "${frontmatter.title_en.replace(/"/g, '\\"')}"
title_zh: "${frontmatter.title_zh.replace(/"/g, '\\"')}"
summary_en: "${frontmatter.summary_en.replace(/"/g, '\\"')}"
summary_zh: "${frontmatter.summary_zh.replace(/"/g, '\\"')}"
comment_en: "${frontmatter.comment_en.replace(/"/g, '\\"')}"
comment_zh: "${frontmatter.comment_zh.replace(/"/g, '\\"')}"
industry: "${frontmatter.industry}"
task: ${taskYaml}
framework: "${frontmatter.framework}"
difficulty: "${frontmatter.difficulty}"
date: "${frontmatter.date}"
source: "${frontmatter.source}"
source_url: "${frontmatter.source_url}"
meta_title: "${frontmatter.meta_title.replace(/"/g, '\\"')}"
meta_description: "${frontmatter.meta_description.replace(/"/g, '\\"')}"
---

${body_en}
`
  const filePath = path.join(CASES_DIR, `${slug}.md`)
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`  ✓ Written: ${slug}.md`)
  return filePath
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔍 Starting case collection pipeline...\n')

  const existingSlugs = getExistingSlugs()
  const existingUrls = getExistingSourceUrls()
  console.log(`Existing cases: ${existingSlugs.size}`)

  const seen = new Set()
  const newFiles = []

  for (const query of QUERIES) {
    console.log(`\n📡 Searching: "${query}"`)
    let results
    try {
      results = await searchTavily(query)
    } catch (e) {
      console.error(`  Search failed: ${e.message}`)
      continue
    }

    for (const result of results) {
      const url = result.url
      if (seen.has(url) || existingUrls.has(url)) {
        console.log(`  ↩ Skip (already seen): ${url}`)
        continue
      }
      seen.add(url)

      const content = result.raw_content || result.content || ''
      if (content.length < 500) {
        console.log(`  ↩ Skip (too short): ${url}`)
        continue
      }

      console.log(`  🤖 Extracting: ${url}`)
      let extracted
      try {
        extracted = await extractWithClaude(url, result.title, content)
      } catch (e) {
        console.error(`  ✗ Extraction failed: ${e.message}`)
        continue
      }

      if (!extracted.valid) {
        console.log(`  ↩ Rejected: ${extracted.reason}`)
        continue
      }

      // deduplicate slug
      let slug = extracted.slug
      let attempt = 0
      while (existingSlugs.has(slug) || newFiles.some(f => f.includes(slug))) {
        attempt++
        slug = `${extracted.slug}-${attempt}`
      }

      if (DRY_RUN) {
        console.log(`  [DRY RUN] Would write: ${slug}.md`)
        console.log(`    Title: ${extracted.title_en}`)
        continue
      }

      try {
        const filePath = writeCaseFile(slug, extracted)
        newFiles.push(filePath)
        existingSlugs.add(slug)
      } catch (e) {
        console.error(`  ✗ Write failed: ${e.message}`)
      }

      // Rate limit: 1 Claude call per 2 seconds
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  console.log(`\n✅ Done. New cases added: ${newFiles.length}`)

  if (newFiles.length > 0 && !DRY_RUN) {
    console.log('\n📦 Committing...')
    execSync(`git add ${newFiles.map(f => `"${f}"`).join(' ')}`)
    execSync(`git commit -m "feat: auto-collect ${newFiles.length} new case studies [skip ci]"`)
    console.log('Committed.')
  }
}

main().catch(e => {
  console.error('Fatal:', e)
  process.exit(1)
})
