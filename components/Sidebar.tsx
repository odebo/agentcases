import Link from 'next/link'
import { getAllCases } from '@/lib/cases'
import { Industry, TaskType } from '@/lib/types'

const INDUSTRIES: { slug: Industry; label: string; labelZh: string; emoji: string }[] = [
  { slug: 'sales',            label: 'Sales',            labelZh: '销售', emoji: '🛒' },
  { slug: 'customer-service', label: 'Customer Service', labelZh: '客服', emoji: '💬' },
  { slug: 'hr',               label: 'HR',               labelZh: 'HR',   emoji: '👥' },
  { slug: 'legal',            label: 'Legal',            labelZh: '法务', emoji: '⚖️' },
  { slug: 'operations',       label: 'Operations',       labelZh: '运营', emoji: '📊' },
  { slug: 'marketing',        label: 'Marketing',        labelZh: '市场', emoji: '📣' },
]

const TASKS: { slug: TaskType; label: string; labelZh: string; emoji: string }[] = [
  { slug: 'automation',             label: 'Automation',    labelZh: '自动化', emoji: '⚡' },
  { slug: 'data-analysis',          label: 'Data Analysis', labelZh: '数据分析', emoji: '📈' },
  { slug: 'content-generation',     label: 'Content Gen',   labelZh: '内容生成', emoji: '✍️' },
  { slug: 'decision-support',       label: 'Decision Aid',  labelZh: '决策辅助', emoji: '🧠' },
  { slug: 'customer-communication', label: 'Communication', labelZh: '客户沟通', emoji: '💬' },
]

export default function Sidebar({ lang = 'en' }: { lang?: 'en' | 'zh' }) {
  const cases = getAllCases()
  const prefix = lang === 'zh' ? '/zh' : ''
  const counts = {
    industry: Object.fromEntries(INDUSTRIES.map(i => [i.slug, cases.filter(c => c.industry === i.slug).length])),
    task: Object.fromEntries(TASKS.map(t => [t.slug, cases.filter(c => c.task.includes(t.slug)).length])),
  }

  return (
    <aside className="w-44 shrink-0 py-5 pr-6">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-widest text-[var(--text-dim)] mb-2">{lang === 'zh' ? '行业' : 'Industry'}</div>
        {INDUSTRIES.map(({ slug, label, labelZh, emoji }) => (
          <Link key={slug} href={`${prefix}/industry/${slug}`}
            className="flex items-center justify-between px-2 py-1.5 rounded text-[13px] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]">
            <span>{emoji} {lang === 'zh' ? labelZh : label}</span>
            <span className="text-[11px] text-[var(--text-dim)]">{counts.industry[slug] ?? 0}</span>
          </Link>
        ))}
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-[var(--text-dim)] mb-2">{lang === 'zh' ? '任务类型' : 'Task'}</div>
        {TASKS.map(({ slug, label, labelZh, emoji }) => (
          <Link key={slug} href={`${prefix}/task/${slug}`}
            className="flex items-center justify-between px-2 py-1.5 rounded text-[13px] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]">
            <span>{emoji} {lang === 'zh' ? labelZh : label}</span>
            <span className="text-[11px] text-[var(--text-dim)]">{counts.task[slug] ?? 0}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
