'use client'
import Link from 'next/link'
import { Industry, TaskType } from '@/lib/types'

const INDUSTRIES: { slug: Industry; label: string; labelZh: string; emoji: string }[] = [
  { slug: 'sales',            label: 'Sales',            labelZh: '销售', emoji: '🛒' },
  { slug: 'customer-service', label: 'Customer Service', labelZh: '客服', emoji: '💬' },
  { slug: 'hr',               label: 'HR',               labelZh: 'HR',   emoji: '👥' },
  { slug: 'legal',            label: 'Legal',            labelZh: '法务', emoji: '⚖️' },
  { slug: 'operations',       label: 'Operations',       labelZh: '运营', emoji: '📊' },
  { slug: 'marketing',        label: 'Marketing',        labelZh: '市场', emoji: '📣' },
  { slug: 'finance',          label: 'Finance',          labelZh: '财务', emoji: '💰' },
]

const TASKS: { slug: TaskType; label: string; labelZh: string; emoji: string }[] = [
  { slug: 'automation',             label: 'Automation',    labelZh: '自动化', emoji: '⚡' },
  { slug: 'data-analysis',          label: 'Data Analysis', labelZh: '数据分析', emoji: '📈' },
  { slug: 'content-generation',     label: 'Content Gen',   labelZh: '内容生成', emoji: '✍️' },
  { slug: 'decision-support',       label: 'Decision Aid',  labelZh: '决策辅助', emoji: '🧠' },
  { slug: 'customer-communication', label: 'Communication', labelZh: '客户沟通', emoji: '💬' },
]

type Props = {
  lang?: 'en' | 'zh'
  active: Industry | 'all'
  onChange: (v: Industry | 'all') => void
  industryCounts: Record<string, number>
  taskCounts: Record<string, number>
}

export default function Sidebar({ lang = 'en', active, onChange, industryCounts, taskCounts }: Props) {
  const prefix = lang === 'zh' ? '/zh' : ''

  return (
    <aside className="w-44 shrink-0 py-5 pr-6">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-widest text-[var(--text-dim)] mb-2">
          {lang === 'zh' ? '行业' : 'Industry'}
        </div>
        <button type="button" onClick={() => onChange('all')}
          className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-[13px] cursor-pointer appearance-none
            ${active === 'all' ? 'bg-[var(--bg-secondary)] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]'}`}>
          <span>{lang === 'zh' ? '全部' : 'All'}</span>
        </button>
        {INDUSTRIES.map(({ slug, label, labelZh, emoji }) => (
          <button key={slug} type="button" onClick={() => onChange(slug)}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-[13px] cursor-pointer appearance-none
              ${active === slug ? 'bg-[var(--bg-secondary)] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]'}`}>
            <span>{emoji} {lang === 'zh' ? labelZh : label}</span>
            <span className="text-[11px] text-[var(--text-dim)]">{industryCounts[slug] ?? 0}</span>
          </button>
        ))}
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-[var(--text-dim)] mb-2">
          {lang === 'zh' ? '任务类型' : 'Task'}
        </div>
        {TASKS.map(({ slug, label, labelZh, emoji }) => (
          <Link key={slug} href={`${prefix}/task/${slug}`}
            className="flex items-center justify-between px-2 py-1.5 rounded text-[13px] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]">
            <span>{emoji} {lang === 'zh' ? labelZh : label}</span>
            <span className="text-[11px] text-[var(--text-dim)]">{taskCounts[slug] ?? 0}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
