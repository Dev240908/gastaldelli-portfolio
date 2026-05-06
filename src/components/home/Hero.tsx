'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import MarqueeStrip from './MarqueeStrip'

gsap.registerPlugin(SplitText)

export default function Hero() {
  const containerRef  = useRef<HTMLElement>(null)
  const h1Ref         = useRef<HTMLHeadingElement>(null)
  const subRef        = useRef<HTMLParagraphElement>(null)
  const ctaRef        = useRef<HTMLDivElement>(null)
  const marqueeRef    = useRef<HTMLDivElement>(null)
  const scrollRef     = useRef<HTMLDivElement>(null)
  const primaryBtnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const h1 = h1Ref.current
    if (!h1) return

    const split = new SplitText(h1, { type: 'chars', mask: 'chars' })
    const delay = sessionStorage.getItem('loaded') ? 0.1 : 1.85

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(split.chars, {
          yPercent: 110,
          stagger: 0.018,
          duration: 0.8,
          delay,
        })
        .from(subRef.current,     { opacity: 0, y: 18, duration: 0.7 }, '-=0.35')
        .from(ctaRef.current,     { opacity: 0, y: 18, duration: 0.6 }, '-=0.3')
        .from(scrollRef.current,  { opacity: 0, duration: 0.6 },         '-=0.3')
        .from(marqueeRef.current, { opacity: 0, duration: 0.8 },         '-=0.5')
    }, containerRef)

    return () => {
      split.revert()
      ctx.revert()
    }
  }, [])

  /* Magnetic CTA */
  useEffect(() => {
    const btn = primaryBtnRef.current
    if (!btn) return
    const strength = 0.38
    let rect = btn.getBoundingClientRect()
    const onEnter = () => { rect = btn.getBoundingClientRect() }
    const onMove  = (e: MouseEvent) => {
      const cx = rect.left + rect.width / 2
      const cy = rect.top  + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      if (Math.hypot(dx, dy) > Math.max(rect.width, rect.height) * 1.2) return
      gsap.to(btn, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' })
    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mousemove',  onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mousemove',  onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--warm-cream)',
        overflow: 'hidden',
      }}
    >
      {/* Concentric circles — geometric background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          right: '-12%',
          width: 'clamp(380px, 68vw, 860px)',
          height: 'clamp(380px, 68vw, 860px)',
          transform: 'translateY(-50%)',
          backgroundImage: `repeating-radial-gradient(
            circle at center,
            transparent 0px,
            transparent 36px,
            rgba(87,70,52,0.07) 36px,
            rgba(87,70,52,0.07) 37px
          )`,
          animation: 'geo-breathe 9s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Corner badges */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(5rem, 10vh, 7rem)',
          left: 'var(--space-container)',
          zIndex: 2,
        }}
      >
        <span className="tag tag-accent">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#B7410E',
              display: 'inline-block',
              animation: 'pulse 2s infinite',
            }}
          />
          Disponibile
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 'clamp(5rem, 10vh, 7rem)',
          right: 'var(--space-container)',
          fontFamily: 'var(--font-caprasimo)',
          fontSize: '0.7rem',
          color: 'rgba(87, 70, 52, 0.3)',
          letterSpacing: '0.1em',
          zIndex: 2,
        }}
      >
        001 / HERO
      </div>

      {/* Nav spacer */}
      <div aria-hidden="true" style={{ flex: '1 1 0', minHeight: 'clamp(5rem, 10vh, 7rem)' }} />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 var(--space-container)',
        }}
      >
        {/* Outcome headline */}
        <h1
          ref={h1Ref}
          style={{
            fontFamily: 'var(--font-abril)',
            fontWeight: 400,
            fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.01em',
            color: '#574634',
            marginBottom: 'clamp(1.75rem, 3.5vh, 2.75rem)',
            maxWidth: '14ch',
          }}
        >
          Faccio trovare le PMI italiane dove i clienti le cercano.
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            color: 'rgba(87, 70, 52, 0.6)',
            maxWidth: 440,
            lineHeight: 1.65,
            marginBottom: 'clamp(2rem, 4vh, 3rem)',
          }}
        >
          Brian Gastaldelli · Web, SEO e automazioni AI<br />
          per attività locali. Verona · Nord Italia.
        </p>

        {/* CTA row */}
        <div
          ref={ctaRef}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              ref={primaryBtnRef}
              href="#contatti"
              className="btn-groovy"
              style={{ willChange: 'transform' }}
            >
              Prenota una call gratuita di 20&nbsp;min
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>→</span>
            </a>

            <a href="#lavori" className="btn-ghost">
              Vedi i lavori
            </a>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-caprasimo)',
              fontSize: '0.65rem',
              color: 'rgba(87, 70, 52, 0.38)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Rispondo entro 24h · Nessun obbligo
          </p>
        </div>

        {/* MarqueeStrip */}
        <div ref={marqueeRef} style={{ marginTop: 'clamp(3rem, 6vh, 5rem)' }}>
          <MarqueeStrip />
        </div>
      </div>

      {/* Bottom spacer */}
      <div style={{ height: 'clamp(2.5rem, 5vh, 4rem)', position: 'relative', zIndex: 2 }} />

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5vh, 3.5rem)',
          right: 'var(--space-container)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 2,
            height: 56,
            background: 'linear-gradient(to bottom, #DA9100, transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.6rem',
            color: 'rgba(87, 70, 52, 0.35)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
