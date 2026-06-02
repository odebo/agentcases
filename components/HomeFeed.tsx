'use client'
import { useState } from 'react'
import FilterBar from './FilterBar'
import CaseCard from './CaseCard'
import { Case, Industry } from '@/lib/types'
import { groupByDate } from '@/lib/utils'

export default function HomeFeed({ cases, lang = 'en' }: { cases: Case[]; lang?: 'en' | 'zh' }) {
  const [activeIndustry, setActiveIndustry] = useState<Industry | 'all'>('all')
  const filtered = activeIndustry === 'all' ? cases : cases.filter(c => c.industry === activeIndustry)
  const grouped = groupByDate(filtered)

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <FilterBar active={activeIndustry} onChange={setActiveIndustry} lang={lang} />
      <main className="flex-1 border-l border-[var(--border)] pl-6">
        {Object.entries(grouped).map(([date, dayCases]) => (
          <div key={date}>
            <div className="flex items-center gap-3 py-4">
              <span className="text-xs text-[var(--text-dim)] whitespace-nowrap">
                {new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>
            {dayCases.map(c => <CaseCard key={c.slug} c={c} lang={lang} />)}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-[var(--text-muted)] py-12 text-center">No cases yet for this category.</p>
        )}
      </main>
    </div>
  )
}
