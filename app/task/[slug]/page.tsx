import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import CaseCard from '@/components/CaseCard'
import { getCasesByTask } from '@/lib/cases'
import { TaskType } from '@/lib/types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

const TASK_LABELS: Record<TaskType, string> = {
  automation: 'Automation',
  'data-analysis': 'Data Analysis',
  'content-generation': 'Content Generation',
  'decision-support': 'Decision Support',
  'customer-communication': 'Customer Communication',
}

export async function generateStaticParams() {
  return (Object.keys(TASK_LABELS) as TaskType[]).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const label = TASK_LABELS[slug as TaskType]
  if (!label) return {}
  return {
    title: `AI Agent Use Cases: ${label} — AgentCases`,
    description: `Real-world AI Agent use cases for ${label}. See how businesses automate with AI agents.`,
  }
}

export default async function TaskPage({ params }: Props) {
  const { slug } = await params
  const task = slug as TaskType
  if (!TASK_LABELS[task]) return notFound()
  const cases = getCasesByTask(task)

  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-xl font-bold text-white mb-1">AI Agent Use Cases: {TASK_LABELS[task]}</h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">{cases.length} cases</p>
        {cases.map(c => <CaseCard key={c.slug} c={c} />)}
        {cases.length === 0 && (
          <p className="text-[var(--text-muted)] py-12 text-center">No cases yet for this task type.</p>
        )}
      </div>
    </>
  )
}
