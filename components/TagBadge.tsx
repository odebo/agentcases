const STYLES: Record<string, string> = {
  industry: 'border-[#388bfd44] text-[#58a6ff] bg-[#388bfd11]',
  task:     'border-[#3fb95044] text-[#3fb950] bg-[#3fb95011]',
  tool:     'border-[#d2a83444] text-[#d29922] bg-[#d2a83411]',
  'no-code':       'border-[#3fb950] text-[#3fb950] bg-[#3fb95011]',
  'low-code':      'border-[#d2a83444] text-[#d29922] bg-[#d2a83411]',
  'dev-required':  'border-[#da3633] text-[#f85149] bg-[#da363311]',
}

const DIFFICULTY_LABELS: Record<string, string> = {
  'no-code': '🟢 No-code',
  'low-code': '🟡 Low-code',
  'dev-required': '🔴 Dev needed',
}

export default function TagBadge({ type, label }: { type: string; label: string }) {
  const style = STYLES[type] || STYLES.tool
  const displayLabel = DIFFICULTY_LABELS[label] || label
  return (
    <span className={`text-[11px] px-2 py-0.5 rounded-xl border ${style}`}>
      {displayLabel}
    </span>
  )
}
