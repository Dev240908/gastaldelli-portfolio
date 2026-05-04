'use client'
import { motion } from 'motion/react'

const disciplines = [
  { num: '01', label: 'Web Development', sub: 'Next.js · React · TypeScript · Node' },
  { num: '02', label: 'Automazioni AI', sub: 'Claude · N8N · LLM Integration · Agents' },
  { num: '03', label: 'Cross Media Design', sub: 'Brand · UI/UX · Motion · Print' },
  { num: '04', label: 'Creative Tech', sub: 'WebGL · Three.js · GSAP · Shader' },
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(3rem,8vw,7rem)',
          alignItems: 'start',
        }}
      >
        {/* Left: bio */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: 'var(--text-xs)',
              color: '#BFFF00',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            003 / About
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'var(--text-heading)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#F0F0EE',
              marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
            }}
          >
            Verona.<br />
            <span style={{ color: '#BFFF00' }}>Digitale che funziona.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-base)',
              color: 'rgba(240,240,238,0.55)',
              lineHeight: 1.8,
              maxWidth: 440,
              marginBottom: '2rem',
            }}
          >
            Realizzo siti web, automazioni e sistemi digitali per attività locali
            e PMI del Nord Italia. Ogni progetto è costruito per funzionare:
            più clienti, meno lavoro manuale, presenza online che si nota.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-base)',
              color: 'rgba(240,240,238,0.35)',
              lineHeight: 1.8,
              maxWidth: 440,
            }}
          >
            Lavoro con AI tools di ultima generazione: consegno in metà tempo
            rispetto a uno studio tradizionale, senza tagliare sulla qualità.
          </p>

          <div style={{ marginTop: '2.5rem' }}>
            <a
              href="mailto:brian@gastaldelli.it"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: '0.8125rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#F0F0EE',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                paddingBottom: '0.25rem',
                transition: 'color 200ms, border-color 200ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#BFFF00'
                e.currentTarget.style.borderColor = '#BFFF00'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#F0F0EE'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
            >
              brian@gastaldelli.it
              <span style={{ fontSize: '1rem' }}>→</span>
            </a>
          </div>
        </motion.div>

        {/* Right: disciplines list */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {disciplines.map((d, i) => (
            <motion.div
              key={d.num}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                padding: 'clamp(1.25rem,2.5vw,1.75rem) 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(240,240,238,0.18)',
                  letterSpacing: '0.08em',
                  paddingTop: '0.2rem',
                  flexShrink: 0,
                }}
              >
                {d.num}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: 'clamp(1rem,1.8vw,1.25rem)',
                    letterSpacing: '-0.01em',
                    color: '#F0F0EE',
                    marginBottom: '0.25rem',
                  }}
                >
                  {d.label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 'var(--text-xs)',
                    color: 'rgba(240,240,238,0.3)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {d.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
