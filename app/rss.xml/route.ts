import { getAllCases } from '@/lib/cases'
import { generateRssFeed } from '@/lib/rss'

export const dynamic = 'force-static'

export async function GET() {
  const cases = getAllCases()
  const rss = generateRssFeed(cases)
  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
