'use client'
/* Decision: rimosso HeroGLCanvas — shader WebGL scuro incompatibile con warm cream.
   Sostituito con CSS blob-morphing + motivo geometrico per estetica groovy anni '70. */
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import MarqueeStrip from './MarqueeStrip'

export default function Hero() {
  const containerRef  = useRef<HTMLElement>(null)
  const line1Ref      = useRef<HTMLSpanElement>(null)
  const line2Ref      = useRef<HTMLSpanElement>(null)
  const line3Ref      = useRef<HTMLSpanElement>(null)
  const subRef        = useRef<HTMLParagraphElement>(null)
  const ctaRef        = useRef<HTMLDivElement>(null)
  const scrollRef     = useRef<HTMLDivElement>(null)
  const marqueeRef    = useRef<HTMLDivElement>(null)
  const primaryBtnRef = useRef<HTMLAnchorElement>(null)

  /* Entrance animation — stagger page load */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from([line1Ref.current, line2Ref.current, line3Ref.current], {
          yPercent: 110, duration: 1.1, stagger: 0.09, delay: 0.25,
        })
        .from(subRef.current,     { opacity: 0, y: 16, duration: 0.7 }, '-=0.4')
        .from(ctaRef.current,     { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
        .from(marqueeRef.current, { opacity: 0, duration: 0.8 },         '-=0.2')
        .from(scrollRef.current,  { opacity: 0, duration: 0.6 },         '-=0.4')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  /* Magnetic CTA */
  useEffect(() => {
    const btn = primaryBtnRef.current
    if (!btn) return
    const strength = 0.4
    let rect = btn.getBoundingClientRect()
    const onEnter = () => { rect = btn.getBoundingClientRect() }
    const onMove = (e: MouseEvent) => {
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
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
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--warm-cream)',
        overflow: 'hidden',
      }}
    >
      {/* ——— Blob decorativi CSS ——— */}

      {/* Blob 1 — harvest gold, top-right, grande */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-8%',
          width: 'clamp(320px, 42vw, 650px)',
          height: 'clamp(320px, 42vw, 650px)',
          background: 'radial-gradient(circle at 40% 40%, #FAE679 0%, #DA9100 60%, transparent 80%)',
          opacity: 0.28,
          animation: 'blob-morph 16s ease-in-out infinite',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Blob 2 — rust orange, bottom-left, piccolo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '-6%',
          width: 'clamp(180px, 22vw, 380px)',
          height: 'clamp(180px, 22vw, 380px)',
          background: 'radial-gradient(circle at 60% 60%, #E45356 0%, #B7410E 55%, transparent 80%)',
          opacity: 0.18,
          animation: 'blob-morph-slow 20s ease-in-out infinite reverse',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Blob 3 — avocado, centro sinistra, accento */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '35%',
          left: '2%',
          width: 'clamp(100px, 12vw, 200px)',
          height: 'clamp(100px, 12vw, 200px)',
          background: 'var(--avocado)',
          opacity: 0.12,
          animation: 'blob-morph 22s ease-in-out infinite 4s',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ——— Badge "Disponibile" — top left ——— */}
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

      {/* ——— Numero sezione — top right ——— */}
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

      {/* ——— Spacer — mantiene il titolo sotto la nav ——— */}
      <div aria-hidden="true" style={{ flex: '1 1 0', minHeight: 'clamp(5rem, 10vh, 7rem)' }} />

      {/* ——— Contenuto principale ——— */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 var(--space-container)',
        }}
      >
        {/* Headline — Abril Fatface, salto dimensionale estremo */}
        <h1
          aria-label="Il digitale che lavora per te."
          style={{
            fontFamily: 'var(--font-abril)',
            fontWeight: 400,
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            color: '#574634',
            marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          }}
        >
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
            <span ref={line1Ref} style={{ display: 'block' }}>
              Il&nbsp;digitale
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
            <span ref={line2Ref} style={{ display: 'block' }}>
              che&nbsp;
              {/* "lavora" in harvest gold — accentuazione calda */}
              <span style={{ color: '#DA9100' }}>lavora</span>
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
            <span ref={line3Ref} style={{ display: 'block' }}>
              per&nbsp;te.
            </span>
          </span>
        </h1>

        {/* Sottotitolo — Playfair Display italic, tono caldo */}
        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-playfair)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1rem, 1.8vw, 1.375rem)',
            color: 'rgba(87, 70, 52, 0.65)',
            maxWidth: 480,
            lineHeight: 1.55,
            marginBottom: 'clamp(2rem, 4vh, 3rem)',
          }}
        >
          Brian Gastaldelli · Siti web, automazioni AI<br />
          e sistemi digitali per PMI. Basato a Verona.
        </p>

        {/* CTA row */}
        <div
          ref={ctaRef}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
        >
          {/* Primary CTA — groovy red, offset shadow */}
          <a
            ref={primaryBtnRef}
            href="#lavori"
            className="btn-groovy"
            style={{ willChange: 'transform' }}
          >
            Vedi i lavori
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>↓</span>
          </a>

          {/* Ghost CTA */}
          <a href="mailto:brian@gastaldelli.it" className="btn-ghost">
            Scrivimi
          </a>
        </div>

        {/* Marquee strip */}
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
