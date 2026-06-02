'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav({ lang = 'en' }: { lang?: 'en' | 'zh' }) {
  const pathname = usePathname()
  const isZh = lang === 'zh'
  const prefix = isZh ? '/zh' : ''

  return (
    <nav className="flex items-center gap-6 px-6 py-3.5 border-b border-[var(--border)] sticky top-0 bg-[var(--bg)] z-10">
      <Link href={prefix || '/'} className="font-bold text-base text-white tracking-tight">
        Agent<span className="text-[var(--accent-green)]">Cases</span>
      </Link>
      <div className="flex gap-4">
        {[
          { href: prefix || '/', label: isZh ? '全部案例' : 'All Cases' },
          { href: `${prefix}/industry/sales`, label: isZh ? '按行业' : 'By Industry' },
          { href: `${prefix}/task/automation`, label: isZh ? '按任务' : 'By Task' },
          { href: '/about', label: isZh ? '关于' : 'About' },
        ].map(({ href, label }) => (
          <Link key={href} href={href}
            className={`text-sm ${pathname === href ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
            {label}
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3">
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
