'use client'
import { motion } from 'motion/react'

export default function Contact() {
  return (
    <section
      id="contatti"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '2px solid rgba(87, 70, 52, 0.15)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 800 }}
      >
        <p
          style={{
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.7rem',
            color: '#DA9100',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          006 / Contatti
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-abril)',
            fontWeight: 400,
            fontSize: 'var(--text-display)',
            lineHeight: 'var(--lh-display)',
            letterSpacing: '-0.01em',
            color: '#574634',
            marginBottom: 'clamp(2rem,4vw,3.5rem)',
          }}
        >
          Hai un progetto?<br />
          <span style={{ color: 'rgba(87, 70, 52, 0.3)' }}>
            Parliamone.
          </span>
        </h2>

        <a
          href="tel:+393489515828"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.7rem',
            color: 'rgba(87, 70, 52, 0.4)',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            marginBottom: 'clamp(1.5rem,3vw,2rem)',
            transition: 'color 200ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#DA9100')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(87, 70, 52, 0.4)')}
        >
          +39 348 951 5828 ·&nbsp;
          <span style={{ color: 'rgba(183, 65, 14, 0.6)' }}>Verona, Italia</span>
        </a>

        <br />

        <a
          href="mailto:brian@gastaldelli.it"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: 'var(--font-abril)',
            fontWeight: 400,
            fontSize: 'clamp(1.5rem,4vw,3rem)',
            letterSpacing: '-0.02em',
            color: '#574634',
            textDecoration: 'none',
            transition: 'color 200ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#B7410E')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#574634')}
        >
          brian@gastaldelli.it
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'clamp(2rem,4vw,3rem)',
              height: 'clamp(2rem,4vw,3rem)',
              border: '2px solid currentColor',
              borderRadius: '50%',
              fontSize: 'clamp(0.875rem,1.5vw,1.25rem)',
              flexShrink: 0,
            }}
          >
            ↗
          </span>
        </a>
      </motion.div>

      {/* Footer rule */}
      <div
        style={{
          marginTop: 'clamp(4rem,8vw,7rem)',
          paddingTop: '1.5rem',
          borderTop: '2px solid rgba(87, 70, 52, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.65rem',
            color: 'rgba(87, 70, 52, 0.35)',
            letterSpacing: '0.06em',
          }}
        >
          © 2026 Brian Gastaldelli
        </p>
        <p
          style={{
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.65rem',
            color: 'rgba(87, 70, 52, 0.35)',
            letterSpacing: '0.06em',
          }}
        >
          Built with Next.js · TypeScript · GSAP · Framer Motion
        </p>
      </div>
    </section>
  )
}
