export default function AiComment({ text, lang = 'en' }: { text: string; lang?: 'en' | 'zh' }) {
  const label = lang === 'zh' ? '为什么值得关注' : 'Why it matters'
  return (
    <div className="bg-[var(--bg-secondary)] border-l-[3px] border-[var(--accent-green)] rounded-r pl-3 pr-3 py-2 text-xs text-[var(--text-muted)] leading-relaxed">
      <div className="text-[10px] text-[var(--accent-green)] uppercase tracking-wide mb-1">{label}</div>
      {text}
    </div>
  )
}
