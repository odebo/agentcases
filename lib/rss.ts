import { Feed } from 'feed'
import { Case } from './types'

export function generateRssFeed(cases: Case[]): string {
  const feed = new Feed({
    title: 'AgentCases — Real-world AI Agent Use Cases',
    description: 'Browse real-world AI Agent use cases by industry',
    id: 'https://agentcases.com/',
    link: 'https://agentcases.com/',
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  })

  cases.slice(0, 20).forEach(c => {
    feed.addItem({
      title: c.title_en,
      id: `https://agentcases.com/case/${c.slug}`,
      link: `https://agentcases.com/case/${c.slug}`,
      description: c.summary_en,
      date: new Date(c.date),
    })
  })

  return feed.rss2()
}
