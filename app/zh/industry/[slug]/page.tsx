import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import CaseCard from '@/components/CaseCard'
import { getCasesByIndustry } from '@/lib/cases'
import { Industry } from '@/lib/types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

const INDUSTRY_LABELS: Record<Industry, { en: string; zh: string }> = {
  sales:            { en: 'Sales',            zh: '销售' },
  'customer-service': { en: 'Customer Service', zh: '客服' },
  hr:               { en: 'HR',               zh: 'HR' },
  legal:            { en: 'Legal',            zh: '法务' },
  operations:       { en: 'Operations',       zh: '运营' },
  marketing:        { en: 'Marketing',        zh: '市场' },
  finance:          { en: 'Finance',          zh: '财务' },
  product:          { en: 'Product',          zh: '产品' },
}

export async function generateStaticParams() {
  return (Object.keys(INDUSTRY_LABELS) as Industry[]).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = INDUSTRY_LABELS[slug as Industry]
  if (!label) return {}
  return {
    title: `AI Agent 应用案例：${label.zh} — Agenthanks`,
    description: `${label.zh}行业真实 AI Agent 应用案例，涵盖自动化、数据分析等场景。`,
  }
}

export default async function IndustryPageZh({ params }: Props) {
  const { slug } = await params
  const industry = slug as Industry
  if (!INDUSTRY_LABELS[industry]) return notFound()
  const cases = getCasesByIndustry(industry)

  return (
    <>
      <Nav lang="zh" />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-xl font-bold text-white mb-1">AI Agent 应用案例：{INDUSTRY_LABELS[industry].zh}</h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">{cases.length} 个案例</p>
        {cases.map(c => <CaseCard key={c.slug} c={c} lang="zh" />)}
        {cases.length === 0 && (
          <p className="text-[var(--text-muted)] py-12 text-center">该行业暂无案例。</p>
        )}
      </div>
    </>
  )
}
