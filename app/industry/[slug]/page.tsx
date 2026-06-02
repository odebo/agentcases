import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import CaseCard from '@/components/CaseCard'
import { getCasesByIndustry } from '@/lib/cases'
import { Industry } from '@/lib/types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

const INDUSTRY_LABELS: Record<Industry, string> = {
  sales: 'Sales',
  'customer-service': 'Customer Service',
  hr: 'HR',
  legal: 'Legal',
  operations: 'Operations',
  marketing: 'Marketing',
  finance: 'Finance',
  product: 'Product',
}

export async function generateStaticParams() {
  return (Object.keys(INDUSTRY_LABELS) as Industry[]).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = INDUSTRY_LABELS[slug as Industry]
  if (!label) return {}
  return {
    title: `AI Agent Use Cases: ${label} — Agenthanks`,
    description: `Real-world AI Agent use cases in ${label}. Browse automation, data analysis, and more.`,
  }
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const industry = slug as Industry
  if (!INDUSTRY_LABELS[industry]) return notFound()
  const cases = getCasesByIndustry(industry)

  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-xl font-bold text-white mb-1">AI Agent Use Cases: {INDUSTRY_LABELS[industry]}</h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">{cases.length} cases</p>
        {cases.map(c => <CaseCard key={c.slug} c={c} />)}
        {cases.length === 0 && (
          <p className="text-[var(--text-muted)] py-12 text-center">No cases yet in this industry.</p>
        )}
      </div>
    </>
  )
}
