'use client'
import { Industry } from '@/lib/types'

const INDUSTRIES: { slug: Industry | 'all'; label: string; labelZh: string; emoji: string }[] = [
  { slug: 'all',              label: 'All',              labelZh: '全部',   emoji: '' },
  { slug: 'sales',            label: 'Sales',            labelZh: '销售',   emoji: '🛒' },
  { slug: 'customer-service', label: 'Customer Service', labelZh: '客服',   emoji: '💬' },
  { slug: 'hr',               label: 'HR',               labelZh: 'HR',     emoji: '👥' },
  { slug: 'legal',            label: 'Legal',            labelZh: '法务',   emoji: '⚖️' },
  { slug: 'operations',       label: 'Operations',       labelZh: '运营',   emoji: '📊' },
  { slug: 'marketing',        label: 'Marketing',        labelZh: '市场',   emoji: '📣' },
  { slug: 'finance',          label: 'Finance',          labelZh: '财务',   emoji: '💰' },
]

export default function FilterBar({
  active, onChange, lang = 'en'
}: {
  active: Industry | 'all'
  onChange: (v: Industry | 'all') => void
  lang?: 'en' | 'zh'
}) {
  return (
    <div className="flex gap-2 px-6 py-3 border-b border-[var(--border)] overflow-x-auto">
      {INDUSTRIES.map(({ slug, label, labelZh, emoji }) => (
        <button key={slug} type="button" aria-pressed={active === slug}
          onClick={() => onChange(slug)}
          className={`appearance-none px-3.5 py-1 rounded-full text-xs border whitespace-nowrap cursor-pointer
            ${active === slug
              ? 'bg-[#238636] border-[#238636] text-white'
              : 'bg-transparent border-[var(--border-secondary)] text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}>
          {emoji && `${emoji} `}{lang === 'zh' ? labelZh : label}
        </button>
      ))}
    </div>
  )
}
