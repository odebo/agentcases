import Nav from '@/components/Nav'
import CaseCard from '@/components/CaseCard'
import { getAllCases } from '@/lib/cases'
import { Case } from '@/lib/types'

function searchCases(cases: Case[], query: string): Case[] {
  const q = query.toLowerCase()
  return cases.filter(c =>
    c.title_en.toLowerCase().includes(q) ||
    c.title_zh.includes(q) ||
    c.summary_en.toLowerCase().includes(q) ||
    c.summary_zh.includes(q) ||
    c.industry.toLowerCase().includes(q) ||
    c.framework.toLowerCase().includes(q) ||
    c.task.some(t => t.includes(q)) ||
    c.content.toLowerCase().includes(q)
  )
}

type Props = { searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const cases = getAllCases()
  const results = q.trim() ? searchCases(cases, q.trim()) : []

  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="text-sm text-[var(--text-muted)] mb-6">
          {q.trim()
            ? <><span className="text-white">{results.length}</span> results for "<span className="text-[var(--accent-green)]">{q}</span>"</>
            : 'Enter a search term above'}
        </div>
        {results.map(c => <CaseCard key={c.slug} c={c} />)}
        {q.trim() && results.length === 0 && (
          <p className="text-[var(--text-muted)] py-12 text-center">No cases found for "{q}".</p>
        )}
      </div>
    </>
  )
}
