'use client'
import { motion } from 'motion/react'

const pains = [
  {
    num: '01',
    title: 'Il tuo sito è invisibile.',
    body: 'I tuoi clienti ti cercano su Google, ma non ti trovano. Magari nemmeno cercando il tuo nome. Nel frattempo, i concorrenti raccolgono le prenotazioni.',
  },
  {
    num: '02',
    title: 'Non hai tempo per tutto.',
    body: "Social, email, aggiornamenti, campagne. Ogni giorno c'è qualcosa da fare e tu hai già un'attività da mandare avanti. Il digitale finisce sempre in fondo alla lista.",
  },
  {
    num: '03',
    title: 'Hai già pagato e non hai visto risultati.',
    body: 'Freelance che spariscono. Agenzie che promettono e sottoconsegnano. Soldi spesi e sito che non porta niente. La fiducia è finita — e lo capisco.',
  },
  {
    num: '04',
    title: 'Non sai cosa funziona davvero.',
    body: 'Ci provi, cambi qualcosa, aspetti. Ma i risultati non arrivano e non sai perché. Ti serve qualcuno che sappia leggere i dati e tradurli in azioni concrete.',
  },
]

export default function Problema() {
  return (
    <section
      id="problema"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '2px solid rgba(87,70,52,0.15)',
        background: '#F5F0E1',
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
          002 / Il problema
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
          Ti suona familiare?<br />
          <span style={{ color: 'rgba(87,70,52,0.28)' }}>Sei in buona compagnia.</span>
        </h2>
      </motion.div>

      <div>
        {pains.map((p, i) => (
          <motion.div
            key={p.num}
            className="problema-item"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 'clamp(1.5rem,4vw,4rem)',
              padding: 'clamp(1.75rem,3.5vw,2.75rem) 0',
              alignItems: 'start',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-caprasimo)',
                fontSize: '0.65rem',
                color: 'rgba(87,70,52,0.28)',
                letterSpacing: '0.1em',
                paddingTop: '0.3rem',
                minWidth: '2.5rem',
              }}
            >
              {p.num}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-abril)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.25rem,2.5vw,1.75rem)',
                  letterSpacing: '-0.01em',
                  color: '#574634',
                  lineHeight: 1.1,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(87,70,52,0.58)',
                  lineHeight: 1.7,
                  maxWidth: 680,
                }}
              >
                {p.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
