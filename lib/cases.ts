import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Case, CaseFrontmatter, Industry, TaskType } from './types'

const CASES_DIR = path.join(process.cwd(), 'content/cases')

let _cache: Case[] | null = null

export function getAllCases(): Case[] {
  if (_cache) return _cache
  if (!fs.existsSync(CASES_DIR)) return []
  const files = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.md'))
  _cache = files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(CASES_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, content, ...(data as CaseFrontmatter) }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return _cache
}

export function getCaseBySlug(slug: string): Case | undefined {
  return getAllCases().find(c => c.slug === slug)
}

export function getCasesByIndustry(industry: Industry): Case[] {
  return getAllCases().filter(c => c.industry === industry)
}

export function getCasesByTask(task: TaskType): Case[] {
  return getAllCases().filter(c => c.task.includes(task))
}

export function groupByDate(cases: Case[]): Record<string, Case[]> {
  return cases.reduce((acc, c) => {
    const date = c.date.split('T')[0]
    acc[date] = acc[date] ? [...acc[date], c] : [c]
    return acc
  }, {} as Record<string, Case[]>)
}
