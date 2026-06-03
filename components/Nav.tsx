'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Nav({ lang = 'en' }: { lang?: 'en' | 'zh' }) {
  const pathname = usePathname()
  const router = useRouter()
  const isZh = lang === 'zh'
  const prefix = isZh ? '/zh' : ''
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`${prefix}/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <nav className="flex items-center gap-4 px-6 py-3.5 border-b border-[var(--border)] sticky top-0 bg-[var(--bg)] z-10">
      <Link href={prefix || '/'} className="font-bold text-base text-white tracking-tight shrink-0">
        Agent<span className="text-[var(--accent-green)]">hanks</span>
      </Link>
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={isZh ? '搜索案例...' : 'Search cases...'}
          className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-md px-3 py-1.5 text-sm text-[var(--text)] placeholder-[var(--text-dim)] outline-none focus:border-[var(--border-secondary)]"
        />
      </form>
      <div className="ml-auto flex items-center gap-3 shrink-0">
        <Link href="/rss.xml" className="text-xs text-[var(--accent-orange)] border border-[#f0883e44] px-2.5 py-1 rounded-full">
          RSS
        </Link>
        <div className="flex border border-[var(--border-secondary)] rounded overflow-hidden text-xs">
          <Link href={pathname.replace(/^\/zh/, '') || '/'} className={`px-2.5 py-1 ${!isZh ? 'bg-[#238636] text-white' : 'text-[var(--text-muted)]'}`}>EN</Link>
          <Link href={`/zh${pathname.replace(/^\/zh/, '')}`} className={`px-2.5 py-1 ${isZh ? 'bg-[#238636] text-white' : 'text-[var(--text-muted)]'}`}>中文</Link>
        </div>
      </div>
    </nav>
  )
}
