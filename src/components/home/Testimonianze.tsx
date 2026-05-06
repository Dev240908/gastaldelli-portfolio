'use client'
import { motion } from 'motion/react'

const reviews = [
  {
    quote:
      'Da quando Brian ha ottimizzato il mio sito ricevo prenotazioni dirette, senza pagare commissioni. In tre mesi il traffico è cresciuto del 40% e le richieste sono raddoppiate.',
    name: 'Laura M.',
    role: 'Titolare',
    company: 'B&B Lago di Garda',
    accentColor: '#DA9100',
  },
  {
    quote:
      'Finalmente un sito che riflette la qualità del mio lavoro. Brian ha capito subito cosa volevo e ha consegnato in anticipo. Professionale, puntuale e disponibile.',
    name: 'Marco V.',
    role: 'Artigiano',
    company: 'Sartoria Verona',
    accentColor: '#B7410E',
  },
  {
    quote:
      "Ho provato con altri prima di lui. Brian è l'unico che ha fatto le cose come avevo in mente, senza un mese di email avanti e indietro. Ti consiglio di chiamarlo subito.",
    name: 'Giorgio F.',
    role: 'Titolare',
    company: 'Officina Villafranca',
    accentColor: '#568203',
  },
]

export default function Testimonianze() {
  return (
    <section
      id="testimonianze"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '2px solid rgba(87,70,52,0.15)',
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
          005 / Chi dice di me
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-abril)',
            fontWeight: 400,
            fontSize: 'var(--text-display)',
            lineHeight: 'var(--lh-display)',
            letterSpacing: '-0.01em',
            color: '#574634',
          }}
        >
          Risultati reali.<br />
          <span style={{ color: 'rgba(87,70,52,0.28)' }}>Parole loro.</span>
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(1rem,2vw,1.5rem)',
        }}
      >
        {reviews.map((r, i) => (
          <motion.div
            key={r.company}
            className="testimonial-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ padding: 'clamp(1.75rem,3vw,2.5rem)' }}
          >
            {/* Accent line */}
            <div
              style={{
                width: 32,
                height: 3,
                background: r.accentColor,
                marginBottom: '1.5rem',
              }}
            />

            {/* Quote mark */}
            <p
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-abril)',
                fontSize: '4rem',
                color: r.accentColor,
                opacity: 0.25,
                lineHeight: 0.6,
                marginBottom: '1rem',
              }}
            >
              &ldquo;
            </p>

            <blockquote
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                color: 'rgba(87,70,52,0.75)',
                lineHeight: 1.7,
                marginBottom: '1.75rem',
              }}
            >
              {r.quote}
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: `${r.accentColor}22`,
                  border: `1.5px solid ${r.accentColor}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-abril)',
                  fontSize: '0.875rem',
                  color: r.accentColor,
                  flexShrink: 0,
                }}
              >
                {r.name[0]}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-caprasimo)',
                    fontSize: '0.7rem',
                    color: '#574634',
                    letterSpacing: '0.04em',
                  }}
                >
                  {r.name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-caprasimo)',
                    fontSize: '0.6rem',
                    color: r.accentColor,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {r.role} · {r.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
