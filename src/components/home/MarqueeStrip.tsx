'use client'

const ITEMS = [
  'Web Development',
  'Automazioni AI',
  'N8N Workflow',
  'Next.js 15',
  'Claude SDK',
  'Three.js',
  'Lead Generation',
  'Cross Media Design',
  'GSAP',
  'Telegram Bot',
  'LLM Agents',
  'Verona',
  'TypeScript',
  'SEO Locale',
  'Google Ads',
  'UI/UX Design',
  'PMI Italia',
  'Freelance',
]

function Strip({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        animation: `marquee${reverse ? 'Rev' : ''} 28s linear infinite`,
        willChange: 'transform',
        flexShrink: 0,
      }}
    >
      {doubled.map((item, i) => (
        <span
          key={i}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3rem',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: i % 2 === 0 ? 'rgba(240,240,238,0.18)' : 'rgba(191,255,0,0.35)',
            whiteSpace: 'nowrap',
          }}
        >
          {item}
          <span
            style={{
              display: 'inline-block',
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: 'rgba(191,255,0,0.4)',
              flexShrink: 0,
            }}
          />
        </span>
      ))}
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        gap: '3rem',
        padding: '0.9rem 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <Strip />
      <Strip />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
