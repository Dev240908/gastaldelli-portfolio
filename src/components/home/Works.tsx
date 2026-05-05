'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  num: string
  name: string
  type: string
  desc: string
  tech: string[]
  url?: string
  year: string
}

interface Stage {
  year: string
  role: string
  company: string
  desc: string
}

const projects: Project[] = [
  {
    num: '01',
    name: 'AI Assistant System',
    type: 'AI · Automazione',
    desc: 'Sistema operativo AI personale su Telegram: 5 assistenti specializzati che gestiscono autonomamente clienti, contenuti, codice e operazioni. Memoria persistente tra sessioni, cron job 24/7 e orchestrazione intelligente — zero intervento manuale per le routine.',
    tech: ['TypeScript', 'Claude SDK', 'Node.js', 'PM2', 'metabot'],
    year: '2025–oggi',
  },
  {
    num: '02',
    name: 'gastaldelli.it',
    type: 'Web · Creative Dev',
    desc: 'Portfolio personale con web experience 3D, shader WebGL personalizzati, animazioni avanzate GSAP e ScrollTrigger. Cursor magnetico, page transitions fluide, sistema di componenti modulare. Deploy su Cloudflare Pages con CI automatico.',
    tech: ['Next.js 15', 'Three.js', 'GSAP', 'TypeScript', 'Cloudflare'],
    url: 'https://gastaldelli.it',
    year: '2025',
  },
  {
    num: '03',
    name: 'TutelaDoc',
    type: 'SaaS · B2B',
    desc: 'Piattaforma web per la generazione automatizzata di Piani Operativi Sicurezza (POS) nel settore edilizia. Interfaccia guidata che riduce da giorni a minuti la compilazione di documentazione obbligatoria per cantieri.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
    url: 'https://tuteladoc.it',
    year: '2025',
  },
  {
    num: '04',
    name: 'Lead Gen Pipeline',
    type: 'Automazione · CLI',
    desc: 'Pipeline Python per outreach automatico verso PMI italiane. Ricerca prospect, generazione email personalizzate via LLM in base al settore e al sito dell\'azienda, tracking risposte e gestione follow-up automatizzati.',
    tech: ['Python', 'uv', 'Claude API', 'Hunter.io', 'SMTP'],
    year: '2025',
  },
]

const stages: Stage[] = [
  {
    year: 'Ott 2024 – Apr 2025',
    role: 'Video Editor & Content Designer',
    company: 'EduLife · Spazio 311, Verona',
    desc: 'Produzione video, motion graphics e materiali e-learning per corsi formativi. Stage ITS 2 giorni/settimana.',
  },
  {
    year: 'Giu – Lug 2024',
    role: 'Web Designer / UX-UI',
    company: 'MVD · Verona',
    desc: 'Deep dive UX/UI: ricerca utente, wireframing e prototipazione su Figma per clienti reali.',
  },
  {
    year: 'Giu 2023',
    role: 'Graphic Designer',
    company: 'Nexidia · Verona',
    desc: 'Video editing, animazioni e fotomontaggi per campagne advertising. Stage PCTO un mese.',
  },
  {
    year: 'Mag 2022',
    role: 'Graphic Designer',
    company: 'Verona Network · Il Daily · Radio Adige',
    desc: 'Grafica editoriale, copertine e impaginazione riviste in redazione giornalistica ad alto volume.',
  },
]

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<HTMLElement[]>([])
  const titleRefs = useRef<HTMLHeadingElement[]>([])
  const techRefs = useRef<HTMLDivElement[]>([])
  const stageRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-reveal titoli delle project card
      titleRefs.current.forEach((title, i) => {
        gsap.fromTo(
          title,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.75,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardRefs.current[i],
              start: 'top 82%',
              once: true,
            },
          }
        )
      })

      // Tech tags stagger
      techRefs.current.forEach((container, i) => {
        const tags = container.querySelectorAll('span')
        gsap.fromTo(
          tags,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRefs.current[i],
              start: 'top 78%',
              once: true,
            },
          }
        )
      })

      // Stage items stagger
      stageRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
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
      id="lavori"
      style={{
        padding: 'var(--space-section) var(--space-container)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}
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
          002 / Lavori
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'var(--text-display)',
            lineHeight: 'var(--lh-display)',
            letterSpacing: '-0.03em',
            color: '#F0F0EE',
          }}
        >
          Progetti recenti.<br />
          <span style={{ WebkitTextStroke: '1.5px rgba(240,240,238,0.2)', color: 'transparent' }}>
            Risultati concreti.
          </span>
        </h2>
      </motion.div>

      {/* Projects wrapper — 2-col layout */}
      <div style={{ marginBottom: 'clamp(4rem,8vw,7rem)' }}>
        {projects.map((p, i) => (
          <article
            key={p.num}
            aria-label={`Progetto: ${p.name}`}
            ref={el => { if (el) cardRefs.current[i] = el }}
            className="works-card"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: '#080808',
              position: 'relative',
            }}
          >
            {/* Colonna sinistra */}
            <div
              className="works-card-left"
              style={{
                padding: 'clamp(2rem,4vw,3rem) clamp(1rem,2vw,2rem) clamp(2rem,4vw,3rem) 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
                <span
                  className="card-num"
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 'var(--text-xs)',
                    color: 'rgba(240,240,238,0.32)',
                    letterSpacing: '0.08em',
                    transition: 'color 300ms',
                  }}
                >
                  {p.num}
                </span>
                <div style={{ overflow: 'hidden' }}>
                  <h3
                    ref={el => { if (el) titleRefs.current[i] = el }}
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: 'clamp(1.25rem,2.5vw,1.75rem)',
                      letterSpacing: '-0.02em',
                      color: '#F0F0EE',
                      lineHeight: 1.1,
                    }}
                  >
                    {p.name}
                  </h3>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 'var(--text-xs)',
                    color: 'rgba(240,240,238,0.3)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {p.year}
                </span>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: 'var(--text-xs)',
                      color: '#BFFF00',
                      textDecoration: 'none',
                      letterSpacing: '0.06em',
                      transition: 'opacity 200ms',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {p.url.replace('https://', '')} ↗
                  </a>
                )}
              </div>
            </div>

            {/* Colonna destra */}
            <div
              className="works-card-right"
              style={{
                padding: 'clamp(2rem,4vw,3rem) 0 clamp(2rem,4vw,3rem) clamp(1rem,2vw,2rem)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Type badge */}
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(191,255,0,0.6)',
                  borderLeft: '1.5px solid rgba(191,255,0,0.4)',
                  paddingLeft: '0.6rem',
                }}
              >
                {p.type}
              </span>

              {/* Descrizione */}
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(240,240,238,0.5)',
                  lineHeight: 1.75,
                }}
              >
                {p.desc}
              </p>

              {/* Tech tags */}
              <div
                ref={el => { if (el) techRefs.current[i] = el }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
              >
                {p.tech.map(t => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.75rem',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(240,240,238,0.4)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Esperienze header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(240,240,238,0.25)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(2rem,4vw,3rem)',
          }}
        >
          Esperienze · Stage
        </p>

        {/* Stage grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          {stages.map((s, i) => (
            <div
              key={i}
              ref={el => { if (el) stageRefs.current[i] = el }}
              style={{
                background: '#080808',
                padding: 'clamp(1.5rem,3vw,2rem)',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                opacity: 0,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(240,240,238,0.22)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}
              >
                {s.year}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.875rem,1.5vw,1.125rem)',
                  color: '#F0F0EE',
                  marginBottom: '0.3rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {s.role}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(191,255,0,0.5)',
                  marginBottom: '1rem',
                }}
              >
                {s.company}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(240,240,238,0.38)',
                  lineHeight: 1.65,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .works-card {
          position: relative;
          transition: background 300ms;
        }
        .works-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 0;
          background: #BFFF00;
          transition: width 450ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .works-card:hover::after {
          width: 100%;
        }
        .works-card:hover {
          background: rgba(191,255,0,0.015) !important;
        }
        .works-card:hover .card-num {
          color: #BFFF00 !important;
        }
        @media (max-width: 767px) {
          .works-card {
            grid-template-columns: 1fr !important;
          }
          .works-card-right {
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.06);
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
