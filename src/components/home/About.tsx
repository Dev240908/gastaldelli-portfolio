'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const disciplines = [
  { num: '01', label: 'Web Development', sub: 'Next.js · React · TypeScript · Node.js · Bun' },
  { num: '02', label: 'Automazioni AI', sub: 'Claude SDK · N8N · LLM Agents · Pipeline' },
  { num: '03', label: 'Digital Marketing', sub: 'SEO · Google Ads · GMB · Social Strategy' },
  { num: '04', label: 'Cross Media Design', sub: 'Brand · UI/UX · Editorial · Video · Print' },
  { num: '05', label: 'Creative Tech', sub: 'WebGL · Three.js · GSAP · Shader · Motion' },
]

const stats = [
  { value: 4,  suffix: '',  label: 'Anni attivo' },
  { value: 10, suffix: '+', label: 'Clienti seguiti' },
  { value: 30, suffix: '+', label: 'Progetti completati' },
]

export default function About() {
  const sectionRef   = useRef<HTMLElement>(null)
  const statsRowRef  = useRef<HTMLDivElement>(null)
  const counterEls   = useRef<HTMLSpanElement[]>([])
  const bioWrapper1  = useRef<HTMLDivElement>(null)
  const bioWrapper2  = useRef<HTMLDivElement>(null)
  const discItemRefs = useRef<HTMLDivElement[]>([])
  const discLineRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      stats.forEach((s, i) => {
        const el = counterEls.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: s.value,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) el.textContent = `${Math.ceil(obj.val)}${s.suffix}`
          },
          scrollTrigger: {
            trigger: statsRowRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      })

      // Bio clip reveal
      ;[bioWrapper1.current, bioWrapper2.current].forEach((wrapper, i) => {
        if (!wrapper) return
        gsap.fromTo(
          wrapper,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.85,
            delay: i * 0.18,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 84%',
              once: true,
            },
          }
        )
      })

      // Discipline items slide in
      discItemRefs.current.forEach((item) => {
        if (!item) return
        gsap.fromTo(
          item,
          { opacity: 0, x: 32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })

      // Discipline separator lines scaleX
      discLineRefs.current.forEach((line, i) => {
        if (!line) return
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: discItemRefs.current[i],
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* STAT ROW — 3 counter animati */}
      <div
        ref={statsRowRef}
        className="about-stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 'clamp(3rem,6vw,5rem)',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: '#080808',
              padding: 'clamp(1.5rem,3vw,2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <span
              ref={el => { if (el) counterEls.current[i] = el }}
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem,5vw,4rem)',
                letterSpacing: '-0.04em',
                color: '#F0F0EE',
                lineHeight: 1,
              }}
            >
              0{s.suffix}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(240,240,238,0.3)',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* MAIN GRID — bio sinistra + disciplines destra */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(3rem,8vw,7rem)',
          alignItems: 'start',
        }}
      >
        {/* Left: bio */}
        <div>
          <p style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 'var(--text-xs)',
            color: '#BFFF00',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            004 / About
          </p>

          <h2 style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'var(--text-heading)',
            lineHeight: 'var(--lh-heading)',
            letterSpacing: '-0.03em',
            color: '#F0F0EE',
            marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
          }}>
            Verona.<br />
            <span style={{ color: '#BFFF00' }}>Digitale che funziona.</span>
          </h2>

          {/* Bio paragrafo 1 — con clipPath reveal */}
          <div ref={bioWrapper1} style={{ overflow: 'hidden', marginBottom: '1.25rem' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-base)',
              color: 'rgba(240,240,238,0.55)',
              lineHeight: 1.8,
              maxWidth: 440,
            }}>
              Costruisco soluzioni digitali complete per PMI — dal sito web al
              workflow automatizzato. Design strategico, sviluppo front-end e
              AI applicata in un unico profilo. Niente intermediari, niente
              frammentazione.
            </p>
          </div>

          {/* Bio paragrafo 2 — con clipPath reveal */}
          <div ref={bioWrapper2} style={{ overflow: 'hidden', marginBottom: '2rem' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-base)',
              color: 'rgba(240,240,238,0.35)',
              lineHeight: 1.8,
              maxWidth: 440,
            }}>
              Ho lavorato in redazioni giornalistiche, agenzie pubblicitarie
              e realtà tech con clienti reali fin dalla terza superiore.
              Dal 2022 ho seguito PMI locali su siti, branding, social e
              automazioni. Oggi lavoro in autonomia, senza intermediari.
            </p>
          </div>

          <a
            href="mailto:brian@gastaldelli.it"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: 'clamp(0.6875rem,2vw,0.8125rem)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#F0F0EE',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              paddingBottom: '0.25rem',
              transition: 'color 200ms, border-color 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#BFFF00'
              e.currentTarget.style.borderColor = '#BFFF00'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#F0F0EE'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
          >
            brian@gastaldelli.it
            <span style={{ fontSize: '1rem' }}>→</span>
          </a>
        </div>

        {/* Right: disciplines list con GSAP */}
        <div>
          {disciplines.map((d, i) => (
            <div
              key={d.num}
              ref={el => { if (el) discItemRefs.current[i] = el }}
              style={{
                position: 'relative',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                padding: 'clamp(1.25rem,2.5vw,1.75rem) 0',
                opacity: 0,
              }}
            >
              {/* Linea separatrice animabile — span con scaleX */}
              <span
                ref={el => { if (el) discLineRefs.current[i] = el }}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'block',
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                }}
              />

              <span style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: 'var(--text-xs)',
                color: 'rgba(240,240,238,0.32)',
                letterSpacing: '0.08em',
                paddingTop: '0.2rem',
                flexShrink: 0,
              }}>
                {d.num}
              </span>
              <div>
                <p style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  fontSize: 'clamp(1rem,1.8vw,1.25rem)',
                  letterSpacing: '-0.01em',
                  color: '#F0F0EE',
                  marginBottom: '0.25rem',
                }}>
                  {d.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(240,240,238,0.3)',
                  letterSpacing: '0.04em',
                }}>
                  {d.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 479px) {
          .about-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
