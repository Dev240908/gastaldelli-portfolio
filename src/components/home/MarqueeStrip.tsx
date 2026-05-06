'use client'

const ITEMS = [
  '12+ clienti PMI',
  'Siti in 10–15 giorni',
  'SEO Locale',
  'Google Business',
  'Verona · Nord Italia',
  'Web · Automazioni AI',
  '3 anni di attività',
  'Nessun subappalto',
  'Google Ads',
  'Rispondo entro 24h',
  'Preventivo gratuito',
  'Next.js · TypeScript',
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
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: i % 2 === 0
              ? 'rgba(87, 70, 52, 0.5)'
              : 'rgba(87, 70, 52, 0.28)',
            whiteSpace: 'nowrap',
          }}
        >
          {item}
          <span
            style={{
              display: 'inline-block',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#DA9100' : 'rgba(218, 145, 0, 0.35)',
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
        borderTop: '1px solid rgba(87, 70, 52, 0.15)',
        borderBottom: '1px solid rgba(87, 70, 52, 0.15)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <Strip />
      <Strip />
    </div>
  )
}
