'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  num: string
  title: string
  description: string
  features: string[]
  highlight?: boolean
  wide?: boolean
}

const services: Service[] = [
  {
    num: '01',
    title: 'Sito Vetrina',
    description: 'Per chi parte adesso o ha un sito che imbarazza. Online in 10 giorni.',
    features: ['5 pagine responsive', 'SEO tecnico base', 'Form contatto', 'Hosting primo mese'],
  },
  {
    num: '02',
    title: 'Sito Business PRO',
    description: 'Il pacchetto più scelto. Per attività che vogliono trovare clienti online davvero.',
    features: ['Fino a 10 pagine + blog', 'CMS per autonomia', 'Lighthouse 90+', 'Booking integrato', 'GMB ottimizzato', '1 mese supporto'],
    highlight: true,
  },
  {
    num: '03',
    title: 'Sito Su Misura',
    description: 'E-commerce, automazioni, area clienti. Ogni soluzione è costruita per te.',
    features: ['E-commerce o custom', 'Automazioni integrate', 'Area riservata', 'Multilingua', '3 mesi supporto'],
  },
  {
    num: '04',
    title: 'Automazioni & Bot',
    description: 'Workflow N8N, bot WhatsApp/Telegram, integrazioni: meno lavoro manuale.',
    features: ['Workflow custom', 'Integrazioni multi-piattaforma', 'AI integrata', 'Monitoring incluso'],
  },
  {
    num: '05',
    title: 'SEO Locale',
    description: 'Apparire su Google quando i tuoi clienti ti cercano in zona.',
    features: ['Audit + keyword research', 'Google My Business', 'Articoli mensili', 'Report performance'],
  },
  {
    num: '06',
    title: 'Consulenza',
    description: 'Una call per capire cosa serve davvero alla tua attività digitale.',
    features: ['Call strategica 1h', 'Audit sito esistente', 'Roadmap concreta', 'Senza obbligo di acquisto'],
    wide: true,
  },
]

const BENTO_CLASSES = [
  'bento-card--c1r1',
  'bento-card--c2r1',
  'bento-card--c4r1',
  'bento-card--c1r2',
  'bento-card--c4r2',
  'bento-card--wide',
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const featureRefs = useRef<(HTMLUListElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      featureRefs.current.forEach((ul) => {
        if (!ul) return
        const items = ul.querySelectorAll('li')
        gsap.fromTo(
          items,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: 'power2.out',
            stagger: 0.07,
            scrollTrigger: {
              trigger: ul,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servizi"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'clamp(3rem,6vw,5rem)', maxWidth: 720 }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 'var(--text-xs)',
            color: '#BFFF00',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          003 / Servizi
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'var(--text-display)',
            lineHeight: 'var(--lh-display)',
            letterSpacing: '-0.03em',
            color: '#F0F0EE',
            marginBottom: '1.5rem',
          }}
        >
          Cosa posso fare<br />
          <span style={{ WebkitTextStroke: '1.5px rgba(240,240,238,0.25)', color: 'transparent' }}>
            per la tua attività.
          </span>
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'var(--text-base)',
            color: 'rgba(240,240,238,0.55)',
            lineHeight: 1.6,
          }}
        >
          Pacchetti pensati per attività locali e PMI. Tempi rapidi grazie agli AI tools, qualità senza compromessi.
        </p>
      </motion.div>

      <div
        style={{
          gap: '1px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        className="services-bento-grid"
      >
        {services.map((service, i) => (
          <motion.article
            key={service.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={[
              'service-card',
              BENTO_CLASSES[i],
              service.highlight ? 'service-card--featured' : '',
            ].filter(Boolean).join(' ')}
            style={{
              background: service.highlight
                ? 'rgba(191,255,0,0.04)'
                : service.wide
                ? 'rgba(255,255,255,0.015)'
                : '#080808',
              padding: service.highlight
                ? 'clamp(2rem,3.5vw,3rem)'
                : 'clamp(1.75rem,3vw,2.5rem)',
              minHeight: service.highlight ? 400 : service.wide ? 160 : 300,
              display: 'flex',
              flexDirection: service.wide ? 'row' : 'column',
              alignItems: service.wide ? 'center' : 'flex-start',
              gap: service.wide ? 'clamp(2rem,4vw,4rem)' : undefined,
              position: 'relative',
              borderTop: service.highlight
                ? '1px solid rgba(191,255,0,0.35)'
                : service.wide
                ? '1px solid rgba(191,255,0,0.12)'
                : 'none',
            }}
          >
            {service.highlight && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 'clamp(1.75rem,3vw,2.5rem)',
                transform: 'translateY(-50%)',
                background: '#BFFF00',
                color: '#080808',
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.3rem 0.7rem',
                fontWeight: 700,
                boxShadow: '0 0 20px rgba(191,255,0,0.5)',
              }}>
                ★ Più scelto
              </span>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 'var(--text-xs)',
                  color: 'rgba(240,240,238,0.32)',
                  letterSpacing: '0.08em',
                }}
              >
                {service.num}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: 'clamp(1.25rem,2.2vw,1.5rem)',
                letterSpacing: '-0.02em',
                color: '#F0F0EE',
                marginBottom: '0.75rem',
                lineHeight: 1.15,
              }}
            >
              {service.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-sm)',
                color: 'rgba(240,240,238,0.5)',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}
            >
              {service.description}
            </p>

            <ul
              ref={el => { featureRefs.current[i] = el }}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: service.wide ? '0' : '0 0 auto 0',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: service.wide ? 'wrap' : 'nowrap',
                gap: service.wide ? '0.5rem 2rem' : '0.5rem',
              }}
            >
              {service.features.map((f) => (
                <li
                  key={f}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(240,240,238,0.7)',
                    paddingLeft: '1.25rem',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: '#BFFF00',
                    }}
                  >
                    ›
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {service.wide && (
              <Link
                href="#contatti"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: 'var(--text-sm)',
                  background: '#BFFF00',
                  color: '#080808',
                  padding: '0.875rem 1.5rem',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  transition: 'box-shadow 0.3s var(--ease-expo)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(191,255,0,0.4)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
                }}
              >
                Prenota call →
              </Link>
            )}
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          marginTop: '3rem',
          padding: 'clamp(1.5rem,3vw,2.5rem)',
          border: '1px solid rgba(191,255,0,0.2)',
          background: 'rgba(191,255,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 600,
              fontSize: 'clamp(1rem,2vw,1.25rem)',
              color: '#F0F0EE',
              marginBottom: '0.5rem',
            }}
          >
            Non sai quale pacchetto fa per te?
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-sm)',
              color: 'rgba(240,240,238,0.5)',
              maxWidth: 500,
              lineHeight: 1.6,
            }}
          >
            Una call di 20 minuti, gratuita. Capiamo insieme cosa serve davvero alla tua attività.
            Senza obbligo di acquisto, senza pressioni di vendita.
          </p>
        </div>
        <Link
          href="#contatti"
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 'var(--text-sm)',
            background: '#BFFF00',
            color: '#080808',
            padding: '0.875rem 1.5rem',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            display: 'inline-block',
            transition: 'box-shadow 0.3s var(--ease-expo)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(191,255,0,0.4)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
          }}
        >
          Prenota call →
        </Link>
      </motion.div>
    </section>
  )
}
