// app/case/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import TagBadge from '@/components/TagBadge'
import AiComment from '@/components/AiComment'
import { getAllCases, getCaseBySlug } from '@/lib/cases'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllCases().map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getCaseBySlug(slug)
  if (!c) return {}
  return { title: c.meta_title, description: c.meta_description }
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params
  const c = getCaseBySlug(slug)
  if (!c) notFound()

  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="text-[11px] text-[var(--text-muted)] mb-3">
          Case Study · <span className="text-[var(--accent-blue)]">{c.source}</span> · {new Date(c.date).toLocaleDateString()}
        </div>
        <h1 className="text-2xl font-bold text-[#e6edf3] leading-snug mb-1">{c.title_en}</h1>
        <p className="text-sm text-[var(--text-dim)] mb-4">{c.title_zh}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          <TagBadge type="industry" label={`# ${c.industry}`} />
          {c.task.map(t => <TagBadge key={t} type="task" label={`⚡ ${t}`} />)}
          <TagBadge type="tool" label={c.framework} />
          <TagBadge type={c.difficulty} label={c.difficulty} />
        </div>
        <AiComment text={c.comment_en} />
        <div className="prose prose-invert prose-sm max-w-none mt-8">
          <MDXRemote source={c.content} />
        </div>
      </div>
    </>
  )
}
