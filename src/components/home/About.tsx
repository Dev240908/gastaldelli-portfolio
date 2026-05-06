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
        borderTop: '2px solid rgba(87, 70, 52, 0.15)',
      }}
    >
      {/* STAT ROW */}
      <div
        ref={statsRowRef}
        className="about-stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(87, 70, 52, 0.15)',
          border: '2px solid rgba(87, 70, 52, 0.2)',
          marginBottom: 'clamp(3rem,6vw,5rem)',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: '#F5F0E1',
              padding: 'clamp(1.5rem,3vw,2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <span
              ref={el => { if (el) counterEls.current[i] = el }}
              style={{
                fontFamily: 'var(--font-abril)',
                fontWeight: 400,
                fontSize: 'clamp(2.5rem,5vw,4rem)',
                letterSpacing: '-0.02em',
                color: '#574634',
                lineHeight: 1,
              }}
            >
              0{s.suffix}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-caprasimo)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(87, 70, 52, 0.4)',
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
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
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.7rem',
            color: '#DA9100',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            004 / About
          </p>

          <h2 style={{
            fontFamily: 'var(--font-abril)',
            fontWeight: 400,
            fontSize: 'var(--text-heading)',
            lineHeight: 'var(--lh-heading)',
            letterSpacing: '-0.01em',
            color: '#574634',
            marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
          }}>
            Verona.<br />
            <span style={{ color: '#DA9100' }}>Digitale che funziona.</span>
          </h2>

          <div ref={bioWrapper1} style={{ overflow: 'hidden', marginBottom: '1.25rem' }}>
            <p style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'var(--text-base)',
              color: 'rgba(87, 70, 52, 0.65)',
              lineHeight: 1.8,
              maxWidth: 440,
            }}>
              Costruisco soluzioni digitali complete per PMI — dal sito web al
              workflow automatizzato. Design strategico, sviluppo front-end e
              AI applicata in un unico profilo. Niente intermediari, niente
              frammentazione.
            </p>
          </div>

          <div ref={bioWrapper2} style={{ overflow: 'hidden', marginBottom: '2rem' }}>
            <p style={{
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontSize: 'var(--text-base)',
              color: 'rgba(87, 70, 52, 0.42)',
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
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 600,
              fontSize: 'clamp(0.875rem,2vw,1rem)',
              letterSpacing: '0.02em',
              color: '#574634',
              textDecoration: 'none',
              borderBottom: '2px solid rgba(87, 70, 52, 0.3)',
              paddingBottom: '0.25rem',
              transition: 'color 200ms, border-color 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#DA9100'
              e.currentTarget.style.borderColor = '#DA9100'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#574634'
              e.currentTarget.style.borderColor = 'rgba(87, 70, 52, 0.3)'
            }}
          >
            brian@gastaldelli.it
            <span style={{ fontSize: '1rem' }}>→</span>
          </a>
        </div>

        {/* Right: disciplines */}
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
              <span
                ref={el => { if (el) discLineRefs.current[i] = el }}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'rgba(87, 70, 52, 0.15)',
                  display: 'block',
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                }}
              />

              <span style={{
                fontFamily: 'var(--font-caprasimo)',
                fontSize: '0.65rem',
                color: 'rgba(87, 70, 52, 0.32)',
                letterSpacing: '0.08em',
                paddingTop: '0.2rem',
                flexShrink: 0,
              }}>
                {d.num}
              </span>
              <div>
                <p style={{
                  fontFamily: 'var(--font-abril)',
                  fontWeight: 400,
                  fontSize: 'clamp(1rem,1.8vw,1.25rem)',
                  letterSpacing: '-0.01em',
                  color: '#574634',
                  marginBottom: '0.25rem',
                }}>
                  {d.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-caprasimo)',
                  fontSize: '0.65rem',
                  color: 'rgba(87, 70, 52, 0.4)',
                  letterSpacing: '0.04em',
                }}>
                  {d.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
