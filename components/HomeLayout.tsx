'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import HomeFeed from './HomeFeed'
import { Case, Industry, TaskType } from '@/lib/types'

const INDUSTRY_SLUGS: Industry[] = ['sales', 'customer-service', 'hr', 'legal', 'operations', 'marketing', 'finance', 'product']
const TASK_SLUGS = ['automation', 'data-analysis', 'content-generation', 'decision-support', 'customer-communication']

export default function HomeLayout({ cases, lang = 'en' }: { cases: Case[]; lang?: 'en' | 'zh' }) {
  const [activeIndustry, setActiveIndustry] = useState<Industry | 'all'>('all')

  const industryCounts = Object.fromEntries(
    INDUSTRY_SLUGS.map(s => [s, cases.filter(c => c.industry === s).length])
  )
  const taskCounts = Object.fromEntries(
    TASK_SLUGS.map(s => [s, cases.filter(c => c.task.includes(s as TaskType)).length])
  )

  return (
    <div className="flex max-w-5xl mx-auto px-6 w-full">
      <Sidebar
        lang={lang}
        active={activeIndustry}
        onChange={setActiveIndustry}
        industryCounts={industryCounts}
        taskCounts={taskCounts}
      />
      <HomeFeed cases={cases} lang={lang} activeIndustry={activeIndustry} />
    </div>
  )
}
