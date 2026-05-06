'use client'
import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { examples } from '@/lib/examples'

export default function ExamplesGallery() {
  const [hovered, setHovered] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="esempi"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '2px solid rgba(87, 70, 52, 0.15)',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(3rem,6vw,5rem)',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-caprasimo)',
              fontSize: '0.7rem',
              color: '#DA9100',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            005 / Esempi
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-abril)',
              fontWeight: 400,
              fontSize: 'var(--text-display)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: '#574634',
            }}
          >
            Laboratorio<br />
            <span style={{ color: 'rgba(87,70,52,0.3)' }}>
              tecnico.
            </span>
          </h2>
        </div>
        <div style={{ maxWidth: 280 }}>
          <p
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontSize: 'var(--text-sm)',
              color: 'rgba(87,70,52,0.5)',
              lineHeight: 1.7,
              marginBottom: '0.75rem',
            }}
          >
            Esperimenti tecnici — WebGL, animazioni avanzate, audio generativo.
            Ogni progetto esplora tecnologie che applico nei lavori commerciali.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-caprasimo)',
              fontSize: '0.65rem',
              color: 'rgba(87,70,52,0.32)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Non sono lavori per clienti
          </p>
        </div>
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '1px',
          background: 'rgba(87,70,52,0.15)',
          border: '2px solid rgba(87,70,52,0.2)',
        }}
      >
        {examples.map((example, i) => (
          <motion.div
            key={example.slug}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Link
              href={`/esempi/${example.slug}`}
              onMouseEnter={() => setHovered(example.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'block',
                background: hovered === example.slug
                  ? 'rgba(218,145,0,0.06)'
                  : '#F5F0E1',
                padding: 'clamp(1.5rem,3vw,2.5rem)',
                minHeight: 220,
                textDecoration: 'none',
                transition: 'background 300ms',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Accent glow on hover */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 0% 100%, ${example.accentColor}20, transparent 60%)`,
                  opacity: hovered === example.slug ? 1 : 0,
                  transition: 'opacity 400ms',
                  pointerEvents: 'none',
                }}
              />

              {/* Number + type */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-caprasimo)',
                    fontSize: '0.65rem',
                    color: 'rgba(87,70,52,0.32)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-caprasimo)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.6rem',
                    border: `1px solid ${example.accentColor}50`,
                    color: example.accentColor,
                  }}
                >
                  {example.difficulty}
                </span>
              </div>

              {/* Title + description */}
              <h3
                style={{
                  fontFamily: 'var(--font-abril)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.1rem,2vw,1.375rem)',
                  letterSpacing: '-0.01em',
                  color: '#574634',
                  marginBottom: '0.5rem',
                  lineHeight: 1.15,
                }}
              >
                {example.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(87,70,52,0.55)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                {example.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {example.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'clamp(1.5rem,3vw,2.5rem)',
                  right: 'clamp(1.5rem,3vw,2.5rem)',
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: '1.25rem',
                  color: '#DA9100',
                  opacity: hovered === example.slug ? 1 : 0,
                  transform: hovered === example.slug ? 'translate(0,0)' : 'translate(-8px, 8px)',
                  transition: 'opacity 300ms, transform 300ms cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                →
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
