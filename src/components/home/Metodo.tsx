'use client'
import { motion } from 'motion/react'

const steps = [
  {
    num: '01',
    duration: '20 min',
    title: 'Call gratuita',
    body: 'Parliamo della tua attività. Capisco cosa non funziona e cosa potresti fare. Nessuna vendita, nessun obbligo. Solo una conversazione utile.',
    accent: '#DA9100',
  },
  {
    num: '02',
    duration: '24 ore',
    title: 'Piano chiaro',
    body: 'Ricevi una proposta concreta: cosa faccio, come lo faccio, quanto costa e in quanto tempo. Tutto scritto, niente sorprese.',
    accent: '#B7410E',
  },
  {
    num: '03',
    duration: '10–15 giorni',
    title: 'Online e funzionante',
    body: "Realizzo tutto. Tu fornisci testi e immagini (o ti aiuto a crearle), io penso alla tecnica, all'ottimizzazione e alla messa online.",
    accent: '#568203',
  },
]

export default function Metodo() {
  return (
    <section
      id="metodo"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '2px solid rgba(87,70,52,0.15)',
        background: '#574634',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}
      >
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
          003 / Come lavoro
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-abril)',
            fontWeight: 400,
            fontSize: 'var(--text-display)',
            lineHeight: 'var(--lh-display)',
            letterSpacing: '-0.01em',
            color: '#F5F0E1',
          }}
        >
          Tre passi.<br />
          <span style={{ color: 'rgba(245,240,225,0.3)' }}>Niente fronzoli.</span>
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1px',
          background: 'rgba(245,240,225,0.08)',
        }}
      >
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: '#574634',
              padding: 'clamp(2rem,4vw,3rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span
                style={{
                  fontFamily: 'var(--font-caprasimo)',
                  fontSize: '0.65rem',
                  color: 'rgba(245,240,225,0.25)',
                  letterSpacing: '0.1em',
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-caprasimo)',
                  fontSize: '0.65rem',
                  color: s.accent,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: `1px solid ${s.accent}50`,
                  padding: '0.2rem 0.65rem',
                }}
              >
                {s.duration}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-abril)',
                fontWeight: 400,
                fontSize: 'clamp(1.25rem,2.5vw,1.75rem)',
                letterSpacing: '-0.01em',
                color: '#F5F0E1',
                lineHeight: 1.1,
              }}
            >
              {s.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'var(--text-sm)',
                color: 'rgba(245,240,225,0.5)',
                lineHeight: 1.7,
              }}
            >
              {s.body}
            </p>

            {/* Step connector — visual number large */}
            <div
              aria-hidden="true"
              style={{
                marginTop: 'auto',
                fontFamily: 'var(--font-abril)',
                fontSize: 'clamp(3rem,6vw,5rem)',
                color: 'rgba(245,240,225,0.05)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {s.num}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ marginTop: 'clamp(3rem,6vw,4.5rem)', textAlign: 'center' }}
      >
        <a href="#contatti" className="btn-groovy">
          Prenota la call gratuita
          <span style={{ fontSize: '1.1rem' }}>→</span>
        </a>
      </motion.div>
    </section>
  )
}
