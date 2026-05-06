'use client'
import { useState, useRef } from 'react'
import { motion } from 'motion/react'

interface FaqItem {
  q: string
  a: string
}

const faqs: FaqItem[] = [
  {
    q: 'Quanto costa un sito web?',
    a: 'Dipende dal progetto. Una landing page parte da 800€, un sito completo con più pagine da 1.500€. Ti mando un preventivo preciso entro 24h dalla call, senza impegno.',
  },
  {
    q: 'In quanto tempo consegni?',
    a: '10-15 giorni lavorativi per un sito standard. Se hai un\'urgenza (apertura, evento, scadenza), parliamone nella call e organizzo di conseguenza.',
  },
  {
    q: 'Cosa mi serve per cominciare?',
    a: 'Solo qualche informazione sulla tua attività e, se ce l\'hai, un logo. Testi e immagini li puoi fornire tu o possiamo crearli insieme. Il resto lo gestisco io.',
  },
  {
    q: 'Lavori solo a Verona?',
    a: 'No, lavoro da remoto per PMI di tutta Italia. Verona è la mia base, ma ho clienti da Milano a Napoli. Tutto si fa online — massimo una videochiamata.',
  },
  {
    q: 'Posso aggiornare il sito da solo dopo la consegna?',
    a: 'Sì. Costruisco siti semplici da gestire. Ti lascio un breve tutorial su come fare le modifiche più comuni. E se hai bisogno di aiuto, sono sempre raggiungibile.',
  },
]

function FaqAccordion({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div className="faq-item">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          padding: 'clamp(1.25rem,2.5vw,1.75rem) 0',
          background: 'none',
          border: 'none',
          cursor: 'none',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-abril)',
            fontWeight: 400,
            fontSize: 'clamp(1rem,1.8vw,1.25rem)',
            letterSpacing: '-0.01em',
            color: '#574634',
            lineHeight: 1.2,
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            border: '1.5px solid rgba(87,70,52,0.25)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-fraunces)',
            fontSize: '1rem',
            color: '#DA9100',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 350ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          +
        </span>
      </button>

      <div
        className="faq-answer"
        ref={bodyRef}
        style={{
          maxHeight: isOpen ? `${bodyRef.current?.scrollHeight ?? 400}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'var(--text-sm)',
            color: 'rgba(87,70,52,0.6)',
            lineHeight: 1.75,
            paddingBottom: 'clamp(1.25rem,2.5vw,1.75rem)',
            maxWidth: 680,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section
      id="faq"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '2px solid rgba(87,70,52,0.15)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(3rem,8vw,7rem)',
          alignItems: 'start',
        }}
      >
        {/* Left: header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            007 / Domande
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-abril)',
              fontWeight: 400,
              fontSize: 'var(--text-display)',
              lineHeight: 'var(--lh-display)',
              letterSpacing: '-0.01em',
              color: '#574634',
              marginBottom: '1.5rem',
            }}
          >
            Hai dubbi?<br />
            <span style={{ color: 'rgba(87,70,52,0.28)' }}>Rispondo qui.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontSize: 'var(--text-sm)',
              color: 'rgba(87,70,52,0.5)',
              lineHeight: 1.7,
              maxWidth: 320,
            }}
          >
            Non trovi la risposta che cerchi? Scrivimi direttamente — rispondo entro 24h.
          </p>
        </motion.div>

        {/* Right: accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {faqs.map((item, i) => (
            <FaqAccordion
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
