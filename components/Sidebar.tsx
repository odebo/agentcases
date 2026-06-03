'use client'
import { Industry } from '@/lib/types'

const INDUSTRIES: { slug: Industry; label: string; labelZh: string; emoji: string }[] = [
  { slug: 'sales',            label: 'Sales',            labelZh: '销售', emoji: '🛒' },
  { slug: 'customer-service', label: 'Customer Service', labelZh: '客服', emoji: '💬' },
  { slug: 'hr',               label: 'HR',               labelZh: 'HR',   emoji: '👥' },
  { slug: 'legal',            label: 'Legal',            labelZh: '法务', emoji: '⚖️' },
  { slug: 'operations',       label: 'Operations',       labelZh: '运营', emoji: '📊' },
  { slug: 'marketing',        label: 'Marketing',        labelZh: '市场', emoji: '📣' },
  { slug: 'finance',          label: 'Finance',          labelZh: '财务', emoji: '💰' },
]

type Props = {
  lang?: 'en' | 'zh'
  active: Industry | 'all'
  onChange: (v: Industry | 'all') => void
  industryCounts: Record<string, number>
  taskCounts?: Record<string, number>
}

export default function Sidebar({ lang = 'en', active, onChange, industryCounts }: Props) {
  return (
    <aside className="w-44 shrink-0 py-5 pr-6">
      <div className="text-[11px] uppercase tracking-widest text-[var(--text-dim)] mb-2">
        {lang === 'zh' ? '行业' : 'Industry'}
      </div>
      <button type="button" onClick={() => onChange('all')}
        className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-[13px] cursor-pointer appearance-none
          ${active === 'all' ? 'bg-[#238636] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]'}`}>
        <span>{lang === 'zh' ? '全部' : 'All'}</span>
      </button>
      {INDUSTRIES.map(({ slug, label, labelZh, emoji }) => (
        <button key={slug} type="button" onClick={() => onChange(slug)}
          className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-[13px] cursor-pointer appearance-none
            ${active === slug ? 'bg-[#238636] text-white' : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]'}`}>
          <span>{emoji} {lang === 'zh' ? labelZh : label}</span>
          <span className="text-[11px] text-[var(--text-dim)]">{industryCounts[slug] ?? 0}</span>
        </button>
      ))}
    </aside>
  )
}
