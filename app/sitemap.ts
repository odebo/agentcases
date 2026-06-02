import { MetadataRoute } from 'next'
import { getAllCases } from '@/lib/cases'

export const dynamic = 'force-static'

const BASE_URL = 'https://agentcases.com'

const INDUSTRIES = ['sales', 'customer-service', 'hr', 'legal', 'operations', 'marketing', 'finance', 'product']
const TASKS = ['automation', 'data-analysis', 'content-generation', 'decision-support', 'customer-communication']

export default function sitemap(): MetadataRoute.Sitemap {
  const cases = getAllCases()

  const caseUrls = cases.map(c => ({
    url: `${BASE_URL}/case/${c.slug}`,
    lastModified: new Date(c.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const industryUrls = INDUSTRIES.map(slug => ({
    url: `${BASE_URL}/industry/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const taskUrls = TASKS.map(slug => ({
    url: `${BASE_URL}/task/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...industryUrls,
    ...taskUrls,
    ...caseUrls,
  ]
}
