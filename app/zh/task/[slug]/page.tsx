import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import CaseCard from '@/components/CaseCard'
import { getCasesByTask } from '@/lib/cases'
import { TaskType } from '@/lib/types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

const TASK_LABELS: Record<TaskType, { en: string; zh: string }> = {
  automation:              { en: 'Automation',           zh: '自动化' },
  'data-analysis':         { en: 'Data Analysis',        zh: '数据分析' },
  'content-generation':    { en: 'Content Generation',   zh: '内容生成' },
  'decision-support':      { en: 'Decision Support',     zh: '决策辅助' },
  'customer-communication':{ en: 'Customer Communication', zh: '客户沟通' },
}

export async function generateStaticParams() {
  return (Object.keys(TASK_LABELS) as TaskType[]).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = TASK_LABELS[slug as TaskType]
  if (!label) return {}
  return {
    title: `AI Agent 应用案例：${label.zh} — Agenthanks`,
    description: `${label.zh}场景下的真实 AI Agent 应用案例。`,
  }
}

export default async function TaskPageZh({ params }: Props) {
  const { slug } = await params
  const task = slug as TaskType
  if (!TASK_LABELS[task]) return notFound()
  const cases = getCasesByTask(task)

  return (
    <>
      <Nav lang="zh" />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-xl font-bold text-white mb-1">AI Agent 应用案例：{TASK_LABELS[task].zh}</h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">{cases.length} 个案例</p>
        {cases.map(c => <CaseCard key={c.slug} c={c} lang="zh" />)}
        {cases.length === 0 && (
          <p className="text-[var(--text-muted)] py-12 text-center">该任务类型暂无案例。</p>
        )}
      </div>
    </>
  )
}
