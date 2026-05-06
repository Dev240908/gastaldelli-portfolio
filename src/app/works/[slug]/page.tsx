import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { works, getWork } from '@/content/works'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return works.map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const work = getWork(slug)
  if (!work) return {}
  return {
    title: work.title,
    description: work.brief,
  }
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params
  const work = getWork(slug)
  if (!work) notFound()

  return (
    <main style={{ background: '#F5F0E1', minHeight: '100svh' }}>

      {/* ── ACT 1: Cover ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '70svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'var(--space-section) var(--space-container) clamp(3rem,6vw,5rem)',
          overflow: 'hidden',
          background: work.preview,
        }}
      >
        {/* Nav back */}
        <Link
          href="/#lavori"
          style={{
            position: 'absolute',
            top: 'clamp(5rem, 10vh, 7rem)',
            left: 'var(--space-container)',
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.65rem',
            color: 'rgba(245,240,225,0.6)',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'color 200ms',
          }}
        >
          ← Tutti i lavori
        </Link>

        <div>
          <p
            style={{
              fontFamily: 'var(--font-caprasimo)',
              fontSize: '0.7rem',
              color: 'rgba(245,240,225,0.55)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            {work.type} · {work.year}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-abril)',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem,6vw,5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              color: '#F5F0E1',
              marginBottom: '1.5rem',
              maxWidth: '18ch',
            }}
          >
            {work.title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-caprasimo)',
              fontSize: '0.65rem',
              color: 'rgba(245,240,225,0.45)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {work.client}
          </p>
        </div>
      </section>

      {/* ── ACT 2: Brief ── */}
      <section
        style={{
          padding: 'var(--space-section) var(--space-container)',
          borderBottom: '1px solid rgba(87,70,52,0.12)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(3rem,8vw,7rem)',
          alignItems: 'start',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-caprasimo)',
              fontSize: '0.7rem',
              color: work.accentColor,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Il brief
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-abril)',
              fontWeight: 400,
              fontSize: 'var(--text-heading)',
              lineHeight: 'var(--lh-heading)',
              color: '#574634',
            }}
          >
            Il punto di partenza.
          </h2>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(1rem,1.6vw,1.2rem)',
            color: 'rgba(87,70,52,0.7)',
            lineHeight: 1.75,
          }}
        >
          {work.brief}
        </p>
      </section>

      {/* ── ACT 3: Challenge ── */}
      <section
        style={{
          padding: 'var(--space-section) var(--space-container)',
          background: 'rgba(87,70,52,0.03)',
          borderBottom: '1px solid rgba(87,70,52,0.12)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.7rem',
            color: work.accentColor,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          La sfida
        </p>
        <p
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.125rem,2vw,1.4rem)',
            color: 'rgba(87,70,52,0.75)',
            lineHeight: 1.7,
            maxWidth: 760,
            borderLeft: `3px solid ${work.accentColor}`,
            paddingLeft: 'clamp(1.25rem,2.5vw,2rem)',
          }}
        >
          {work.challenge}
        </p>
      </section>

      {/* ── ACT 4: Process ── */}
      <section
        style={{
          padding: 'var(--space-section) var(--space-container)',
          borderBottom: '1px solid rgba(87,70,52,0.12)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-caprasimo)',
            fontSize: '0.7rem',
            color: work.accentColor,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(2rem,4vw,3.5rem)',
          }}
        >
          Il processo
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '1px',
            background: 'rgba(87,70,52,0.12)',
          }}
        >
          {work.process.map((p, i) => (
            <div
              key={i}
              style={{
                background: '#F5F0E1',
                padding: 'clamp(1.75rem,3vw,2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-caprasimo)',
                  fontSize: '0.65rem',
                  color: 'rgba(87,70,52,0.28)',
                  letterSpacing: '0.1em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-abril)',
                  fontWeight: 400,
                  fontSize: 'clamp(1rem,1.8vw,1.25rem)',
                  color: '#574634',
                  lineHeight: 1.15,
                }}
              >
                {p.step}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-fraunces)',
                  fontSize: 'var(--text-sm)',
                  color: 'rgba(87,70,52,0.58)',
                  lineHeight: 1.7,
                }}
              >
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACT 5: Solution + Tech + Results ── */}
      <section
        style={{
          padding: 'var(--space-section) var(--space-container)',
          borderBottom: '1px solid rgba(87,70,52,0.12)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 'clamp(3rem,8vw,7rem)',
            alignItems: 'start',
            marginBottom: 'clamp(3rem,6vw,5rem)',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-caprasimo)',
                fontSize: '0.7rem',
                color: work.accentColor,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              La soluzione
            </p>
            <p
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(1rem,1.6vw,1.15rem)',
                color: 'rgba(87,70,52,0.72)',
                lineHeight: 1.75,
              }}
            >
              {work.solution}
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-caprasimo)',
                fontSize: '0.7rem',
                color: 'rgba(87,70,52,0.4)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Stack tecnico
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {work.tech.map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-caprasimo)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.35rem 0.85rem',
                    border: `1.5px solid ${work.accentColor}40`,
                    color: work.accentColor,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Results grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
            gap: '1px',
            background: 'rgba(87,70,52,0.12)',
          }}
        >
          {work.results.map(r => (
            <div
              key={r.label}
              style={{
                background: '#F5F0E1',
                padding: 'clamp(1.5rem,3vw,2rem)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-abril)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.75rem,4vw,2.75rem)',
                  letterSpacing: '-0.02em',
                  color: work.accentColor,
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {r.value}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-caprasimo)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(87,70,52,0.45)',
                }}
              >
                {r.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACT 6: CTA ── */}
      <section
        style={{
          padding: 'var(--space-section) var(--space-container)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(2rem,4vw,3rem)',
          alignItems: 'flex-start',
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
            Ti è piaciuto questo lavoro?
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-abril)',
              fontWeight: 400,
              fontSize: 'var(--text-display)',
              lineHeight: 'var(--lh-display)',
              color: '#574634',
            }}
          >
            Costruiamone uno<br />
            <span style={{ color: 'rgba(87,70,52,0.28)' }}>insieme.</span>
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/#contatti" className="btn-groovy">
            Prenota una call gratuita
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </Link>
          <Link href="/#lavori" className="btn-ghost">
            Altri lavori
          </Link>
        </div>

        {work.url && (
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-caprasimo)',
              fontSize: '0.65rem',
              color: '#DA9100',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'opacity 200ms',
            }}
          >
            Visita il progetto live: {work.url.replace('https://', '')} ↗
          </a>
        )}
      </section>
    </main>
  )
}
