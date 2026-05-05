'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import HeroGLCanvas from './HeroGLCanvas'
import MarqueeStrip from './MarqueeStrip'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const line1Ref     = useRef<HTMLSpanElement>(null)
  const line2Ref     = useRef<HTMLSpanElement>(null)
  const line3Ref     = useRef<HTMLSpanElement>(null)
  const metaRef      = useRef<HTMLDivElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const scrollRef    = useRef<HTMLDivElement>(null)
  const marqueeRef   = useRef<HTMLDivElement>(null)
  const primaryBtnRef = useRef<HTMLAnchorElement>(null)

  // entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from([line1Ref.current, line2Ref.current, line3Ref.current], {
          yPercent: 110, duration: 1.1, stagger: 0.08, delay: 0.2,
        })
        .from(metaRef.current,    { opacity: 0, y: 12, duration: 0.6 }, '-=0.5')
        .from(ctaRef.current,     { opacity: 0, y: 12, duration: 0.6 }, '-=0.4')
        .from(marqueeRef.current, { opacity: 0, duration: 0.8 },        '-=0.2')
        .from(scrollRef.current,  { opacity: 0, duration: 0.6 },        '-=0.4')
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // magnetic button
  useEffect(() => {
    const btn = primaryBtnRef.current
    if (!btn) return

    const strength = 0.45
    let rect = btn.getBoundingClientRect()

    const onEnter = () => { rect = btn.getBoundingClientRect() }

    const onMove = (e: MouseEvent) => {
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const d  = Math.hypot(dx, dy)
      const maxR = Math.max(rect.width, rect.height) * 1.2
      if (d > maxR) return
      gsap.to(btn, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }

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
        overflow: 'hidden',
      }}
    >
      {/* WebGL animated background */}
      <HeroGLCanvas />

      {/* Status badge — top left */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(5rem,10vh,7rem)',
          left: 'var(--space-container)',
          zIndex: 1,
        }}
      >
        <span className="tag tag-accent">
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#BFFF00',
              display: 'inline-block',
              animation: 'pulse 2s infinite',
            }}
          />
          Disponibile
        </span>
      </div>

      {/* Index — top right */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(5rem,10vh,7rem)',
          right: 'var(--space-container)',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(240,240,238,0.2)',
          letterSpacing: '0.08em',
          zIndex: 1,
        }}
      >
        001 / HERO
      </div>

      {/* Spacer: fills available space, but never shrinks below nav height */}
      <div aria-hidden="true" style={{ flex: '1 1 0', minHeight: 'clamp(5rem, 10vh, 7rem)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 var(--space-container)' }}>
        {/* Main headline */}
        <h1
          aria-label="Il digitale che lavora per te."
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 7.5vw, 7rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: '#F0F0EE',
            marginBottom: 'clamp(1.75rem,3.5vh,2.75rem)',
          }}
        >
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
            <span ref={line1Ref} style={{ display: 'block' }}>Il&nbsp;digitale</span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
            <span ref={line2Ref} style={{ display: 'block' }}>
              che&nbsp;<span style={{ WebkitTextStroke: '1.5px #BFFF00', color: 'transparent' }}>lavora</span>
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em' }}>
            <span ref={line3Ref} style={{ display: 'block' }}>per&nbsp;te.</span>
          </span>
        </h1>

        {/* Meta row */}
        <div
          ref={metaRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: 'clamp(2rem,4vh,3rem)',
            flexWrap: 'wrap',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 500,
              fontSize: 'var(--text-sm)',
              color: 'rgba(240,240,238,0.6)',
              letterSpacing: '0.01em',
            }}
          >
            Brian Gastaldelli&nbsp;·&nbsp;Verona
          </p>
          <span style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />
          <p
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontWeight: 400,
              fontSize: 'var(--text-xs)',
              color: 'rgba(240,240,238,0.3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Web · App · Automazioni AI
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            ref={primaryBtnRef}
            href="#lavori"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.9rem 2rem',
              background: '#BFFF00',
              color: '#080808',
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 200ms',
              willChange: 'transform',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#d4ff4d')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#BFFF00')}
          >
            Vedi i lavori
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>↓</span>
          </a>
          <a
            href="mailto:brian@gastaldelli.it"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.9rem 2rem',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(240,240,238,0.65)',
              fontFamily: 'var(--font-syne)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'border-color 200ms, color 200ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = '#F0F0EE'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = 'rgba(240,240,238,0.65)'
            }}
          >
            Contattami
          </a>
        </div>

        {/* Marquee strip */}
        <div ref={marqueeRef} style={{ marginTop: 'clamp(3rem,6vh,5rem)' }}>
          <MarqueeStrip />
        </div>
      </div>

      {/* Bottom spacer */}
      <div style={{ height: 'clamp(2.5rem,5vh,4rem)', position: 'relative', zIndex: 1 }} />

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem,5vh,3.5rem)',
          right: 'var(--space-container)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 1,
            height: 60,
            background: 'linear-gradient(to bottom, rgba(191,255,0,0.7), transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.5625rem',
            color: 'rgba(240,240,238,0.2)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}
