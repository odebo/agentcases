import Link from 'next/link'
import Image from 'next/image'
import TagBadge from './TagBadge'
import AiComment from './AiComment'
import { Case } from '@/lib/types'

export default function CaseCard({ c, lang = 'en' }: { c: Case; lang?: 'en' | 'zh' }) {
  const isZh = lang === 'zh'
  const prefix = isZh ? '/zh' : ''
  const time = new Date(c.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="flex gap-4 py-4 border-b border-[var(--border)]">
      <div className="w-10 shrink-0 text-[11px] text-[var(--text-dim)] pt-1 text-right">{time}</div>
      <div className="flex-1">
        <div className="text-[11px] text-[var(--text-muted)] mb-1">
          Case Study · <span className="text-[var(--accent-blue)]">{c.source}</span>
        </div>
        <div className="mb-1.5">
          <Link href={`${prefix}/case/${c.slug}`}
            className="text-[15px] font-semibold text-[#e6edf3] leading-snug hover:text-[var(--accent-green)] block">
            {isZh ? c.title_zh : c.title_en}
          </Link>
          <div className="text-[12px] text-[var(--text-dim)] mt-0.5 leading-snug">
            {isZh ? c.title_en : c.title_zh}
          </div>
        </div>
        {c.image && (
          <div className="relative w-full h-44 mb-2.5 rounded-lg overflow-hidden border border-[var(--border)]">
            <Image src={c.image} alt={c.title_en} fill className="object-cover" />
          </div>
        )}
        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-2.5">
          {isZh ? c.summary_zh : c.summary_en}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <TagBadge type="industry" label={`# ${c.industry}`} />
          {c.task.map(t => <TagBadge key={t} type="task" label={`⚡ ${t}`} />)}
          <TagBadge type="tool" label={c.framework} />
          <TagBadge type={c.difficulty} label={c.difficulty} />
        </div>
        <AiComment text={isZh ? c.comment_zh : c.comment_en} lang={lang} />
        <div className="flex items-center gap-4 mt-2.5">
          <span className="text-[11px] text-[var(--text-dim)]">🔗 <Link href={c.source_url} target="_blank" className="hover:text-[var(--text-muted)]">{isZh ? '阅读原文' : 'Read original'}</Link></span>
          {c.featured && (
            <span className="ml-auto text-[10px] bg-[#f0883e22] text-[var(--accent-orange)] border border-[#f0883e44] px-1.5 py-0.5 rounded-full">
              {isZh ? '✦ 精选' : '✦ Featured'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
