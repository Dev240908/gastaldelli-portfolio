'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import InkReveal from './InkReveal'

export default function NewspaperReveal() {
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(headerRef.current, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.2,
      ease: 'expo.out',
      delay: 0.5,
    })
  }, { scope: headerRef })

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Playfair Display', 'Georgia', serif",
        background: '#f5f0e8',
        color: '#1a1a1a',
      }}
    >
      {/* Masthead */}
      <header className="border-b-4 border-[#1a1a1a] px-8 pt-8 pb-4 text-center">
        <div ref={headerRef}>
          <p className="text-xs tracking-[0.4em] uppercase mb-2">— Verona Digital Times —</p>
          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-2">
            THE SHOWCASE
          </h1>
          <div className="flex items-center gap-4 justify-center text-xs border-t border-[#1a1a1a] pt-2">
            <span>VOL. 1 · NUMERO 1</span>
            <span>·</span>
            <span>APRILE 2026</span>
            <span>·</span>
            <span>CINQUE CENTESIMI</span>
          </div>
        </div>
      </header>

      {/* Body editoriale */}
      <main className="px-8 py-8 max-w-6xl mx-auto">
        {/* Feature article - full width */}
        <InkReveal>
          <article className="border-b-2 border-[#1a1a1a] pb-8 mb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-widest mb-2 text-[#666]">Notizie dal digitale</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                Il Giovane Specialista<br />che Automatizza Tutto
              </h2>
              <div className="flex gap-4 text-xs text-[#666] mb-4">
                <span>Di Brian Gastaldelli</span>
                <span>·</span>
                <span>Lettura: 3 min</span>
              </div>
              <p className="text-base leading-relaxed columns-2 gap-8">
                Un cross-media communication specialist di vent&apos;anni sta rivoluzionando
                il modo in cui le aziende veronesi approciano il digitale. Con l&apos;ausilio
                dell&apos;intelligenza artificiale e workflow automatizzati, Brian Gastaldelli
                realizza soluzioni complete in tempi che erano impensabili fino a ieri...
              </p>
            </div>
            <div
              className="rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #2a2a2a 0%, #555 100%)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              }}
            >
              [ FOTO ]
            </div>
          </article>
        </InkReveal>

        {/* Grid articoli secondari */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Automazioni AI', 'Web App Next.js', 'WebGL & 3D'].map((title, i) => (
            <InkReveal key={title} delay={i * 0.1}>
              <article className="border-t-2 border-[#1a1a1a] pt-4">
                <h3 className="text-xl font-black mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-[#333]">
                  Scopri come le moderne tecnologie web trasformano la comunicazione aziendale.
                  Caso studio e risultati reali.
                </p>
              </article>
            </InkReveal>
          ))}
        </div>
      </main>
    </div>
  )
}
