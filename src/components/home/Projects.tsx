'use client'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { projects as defaultProjects, type Project, type ProjectMedia } from '@/content/projects'

type CategoryFilter = 'tutti' | 'web' | 'branding' | 'video' | 'motion' | 'print'

interface LightboxState {
  isOpen: boolean
  project: Project | null
  mediaIndex: number
}

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: 'tutti',    label: 'Tutti' },
  { value: 'web',      label: 'Web' },
  { value: 'branding', label: 'Branding' },
  { value: 'video',    label: 'Video' },
  { value: 'motion',   label: 'Motion' },
  { value: 'print',    label: 'Print' },
]

const SIZE_SPAN: Record<NonNullable<Project['size']>, React.CSSProperties> = {
  small:  { gridColumn: 'span 1', gridRow: 'span 1' },
  medium: { gridColumn: 'span 1', gridRow: 'span 2' },
  large:  { gridColumn: 'span 2', gridRow: 'span 2' },
  wide:   { gridColumn: 'span 2', gridRow: 'span 1' },
  tall:   { gridColumn: 'span 1', gridRow: 'span 3' },
}

interface ProjectsProps {
  items?: Project[]
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)
  const spanStyle = SIZE_SPAN[project.size ?? 'medium']

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...spanStyle,
        position: 'relative',
        minHeight: 240,
        background: project.coverImage ? '#0f0f0f' : 'rgba(218,145,0,0.08)',
        border: '1px solid rgba(87,70,52,0.15)',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      {project.coverImage && (
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      )}

      {!project.coverImage && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(218,145,0,0.25)',
          fontFamily: 'var(--font-abril)',
          fontSize: 'clamp(2rem,4vw,4rem)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
        }}>
          {project.title.slice(0, 2).toUpperCase()}
        </div>
      )}

      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(87,70,52,0.88) 0%, rgba(87,70,52,0.35) 55%, rgba(218,145,0,0.04) 100%)'
          : 'linear-gradient(to top, rgba(87,70,52,0.65) 0%, transparent 55%)',
        transition: 'background 350ms ease',
        zIndex: 1,
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '1.5rem',
        zIndex: 2,
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        opacity: hovered ? 1 : 0.85,
        transition: 'transform 350ms var(--ease-expo), opacity 300ms ease',
      }}>
        <p style={{
          fontFamily: 'var(--font-caprasimo)',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: hovered ? '#DA9100' : 'rgba(245,240,225,0.5)',
          marginBottom: '0.4rem',
          transition: 'color 200ms',
        }}>{project.category} · {project.year}</p>
        <h3 style={{
          fontFamily: 'var(--font-abril)',
          fontWeight: 400,
          fontSize: 'clamp(0.875rem,1.8vw,1.25rem)',
          letterSpacing: '-0.01em',
          color: '#F5F0E1',
          lineHeight: 1.15,
        }}>{project.title}</h3>
      </div>
    </motion.article>
  )
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function ProjectsEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        border: '2px dashed rgba(218,145,0,0.3)',
        padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,4vw,3rem)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      <div style={{
        width: 56, height: 56,
        border: '2px solid rgba(218,145,0,0.3)',
        boxShadow: '3px 3px 0 0 rgba(87,70,52,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#DA9100',
        fontSize: '1.25rem',
        fontFamily: 'var(--font-fraunces)',
      }}>✦</div>

      <div>
        <p style={{
          fontFamily: 'var(--font-caprasimo)',
          fontSize: '0.65rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#DA9100',
          marginBottom: '0.75rem',
        }}>In preparazione</p>
        <p style={{
          fontFamily: 'var(--font-abril)',
          fontWeight: 400,
          fontSize: 'clamp(1.25rem,2.5vw,1.75rem)',
          color: '#574634',
          letterSpacing: '-0.01em',
          marginBottom: '0.75rem',
          lineHeight: 1.2,
        }}>Lavori in arrivo</p>
        <p style={{
          fontFamily: 'var(--font-fraunces)',
          fontStyle: 'italic',
          fontSize: 'var(--text-sm)',
          color: 'rgba(87,70,52,0.5)',
          lineHeight: 1.75,
          maxWidth: 420,
          margin: '0 auto',
        }}>
          Anni di progetti in grafica, video, web e motion design.<br />
          La gallery sarà online a breve.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Instagram ↗', href: 'https://instagram.com/briangastaldelli' },
          { label: 'LinkedIn ↗',  href: 'https://linkedin.com/in/briangastaldelli' },
        ].map(social => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-caprasimo)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.25rem',
              border: '2px solid rgba(87,70,52,0.2)',
              color: 'rgba(87,70,52,0.5)',
              textDecoration: 'none',
              transition: 'border-color 200ms, color 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#DA9100'
              e.currentTarget.style.color = '#DA9100'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(87,70,52,0.2)'
              e.currentTarget.style.color = 'rgba(87,70,52,0.5)'
            }}
          >
            {social.label}
          </a>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Lightbox (dark overlay — intentional for media) ─────────────────────────

function ProjectLightbox({
  state,
  onClose,
  onNext,
  onPrev,
}: {
  state: LightboxState
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  const project = state.project!
  const currentMedia: ProjectMedia = project.media[state.mediaIndex] ?? {
    type: 'image',
    src: project.coverImage,
    alt: project.title,
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(8,8,8,0.96)',
          zIndex: 9000,
          backdropFilter: 'blur(4px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9001,
          width: 'min(92vw, 1100px)',
          maxHeight: '90vh',
          background: '#0c0c0c',
          border: '1px solid rgba(87,70,52,0.3)',
          overflow: 'hidden auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          background: '#000',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={state.mediaIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {currentMedia.type === 'image' ? (
                <Image
                  src={currentMedia.src}
                  alt={currentMedia.alt ?? project.title}
                  fill
                  sizes="min(92vw, 1100px)"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <video
                  src={currentMedia.src}
                  poster={currentMedia.poster}
                  controls
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {project.media.length > 1 && (
            <>
              <button
                onClick={onPrev}
                aria-label="Precedente"
                style={{
                  position: 'absolute', left: '1rem', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.65)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#F5F0E1',
                  width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 2, cursor: 'none',
                  fontFamily: 'var(--font-fraunces)', fontSize: '1rem',
                }}
              >←</button>
              <button
                onClick={onNext}
                aria-label="Successivo"
                style={{
                  position: 'absolute', right: '1rem', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.65)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#F5F0E1',
                  width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 2, cursor: 'none',
                  fontFamily: 'var(--font-fraunces)', fontSize: '1rem',
                }}
              >→</button>
              <div style={{
                position: 'absolute', bottom: '1rem', left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', gap: '6px',
              }}>
                {project.media.map((_, i) => (
                  <div key={i} style={{
                    width: i === state.mediaIndex ? 20 : 6,
                    height: 6,
                    background: i === state.mediaIndex ? '#DA9100' : 'rgba(255,255,255,0.25)',
                    transition: 'width 250ms cubic-bezier(0.16,1,0.3,1), background 250ms',
                  }} />
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{
          padding: 'clamp(1.5rem,3vw,2rem)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '1.5rem',
          alignItems: 'start',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-caprasimo)',
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#DA9100',
              borderLeft: '2px solid rgba(218,145,0,0.4)',
              paddingLeft: '0.6rem',
              display: 'block',
              marginBottom: '0.75rem',
            }}>{project.category} · {project.year}</span>
            <h2 style={{
              fontFamily: 'var(--font-abril)',
              fontWeight: 400,
              fontSize: 'clamp(1.25rem,2.5vw,2rem)',
              letterSpacing: '-0.01em',
              color: '#F5F0E1',
              marginBottom: '0.5rem',
              lineHeight: 1.1,
            }}>{project.title}</h2>
            <p style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'var(--text-sm)',
              color: 'rgba(245,240,225,0.5)',
              lineHeight: 1.75,
              marginBottom: '1rem',
            }}>{project.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-caprasimo)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.6rem',
                  border: '1px solid rgba(87,70,52,0.3)',
                  color: 'rgba(245,240,225,0.4)',
                }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
            <button
              onClick={onClose}
              style={{
                fontFamily: 'var(--font-caprasimo)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(245,240,225,0.5)',
                padding: '0.5rem 0.75rem',
                cursor: 'none',
              }}
            >ESC ✕</button>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-caprasimo)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: '#DA9100',
                  textDecoration: 'none',
                  border: '1px solid rgba(218,145,0,0.3)',
                  padding: '0.5rem 0.75rem',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                }}
              >Visita ↗</a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}

// ─── Componente principale ────────────────────────────────────────────────────

export default function Projects({ items = defaultProjects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('tutti')
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    project: null,
    mediaIndex: 0,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  const openLightbox = useCallback((project: Project) => {
    setLightbox({ isOpen: true, project, mediaIndex: 0 })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox({ isOpen: false, project: null, mediaIndex: 0 })
  }, [])

  const nextMedia = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      mediaIndex: prev.project
        ? (prev.mediaIndex + 1) % prev.project.media.length
        : 0,
    }))
  }, [])

  const prevMedia = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      mediaIndex: prev.project
        ? (prev.mediaIndex - 1 + prev.project.media.length) % prev.project.media.length
        : 0,
    }))
  }, [])

  useEffect(() => {
    if (!lightbox.isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextMedia()
      if (e.key === 'ArrowLeft') prevMedia()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox.isOpen, closeLightbox, nextMedia, prevMedia])

  useEffect(() => {
    document.body.style.overflow = lightbox.isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox.isOpen])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'tutti') return items
    return items.filter(p =>
      p.category.toLowerCase().includes(activeCategory)
    )
  }, [items, activeCategory])

  return (
    <section
      id="progetti"
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
        style={{ marginBottom: 'clamp(3rem,6vw,5rem)', maxWidth: 720 }}
      >
        <p style={{
          fontFamily: 'var(--font-caprasimo)',
          fontSize: '0.7rem',
          color: '#DA9100',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>002b / Progetti</p>
        <h2 style={{
          fontFamily: 'var(--font-abril)',
          fontWeight: 400,
          fontSize: 'var(--text-display)',
          lineHeight: 'var(--lh-display)',
          letterSpacing: '-0.01em',
          color: '#574634',
          marginBottom: '1.5rem',
        }}>
          Creatività applicata.<br />
          <span style={{ color: 'rgba(87,70,52,0.3)' }}>
            Ogni formato.
          </span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-fraunces)',
          fontStyle: 'italic',
          fontSize: 'var(--text-base)',
          color: 'rgba(87,70,52,0.6)',
          lineHeight: 1.6,
        }}>
          Grafica, video, web design, motion e molto altro — anni di lavoro su progetti reali.
        </p>
      </motion.div>

      {/* Category filter */}
      {items.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          flexWrap: 'wrap',
          marginBottom: 'clamp(2.5rem,5vw,4rem)',
          padding: '4px',
          background: 'rgba(87,70,52,0.04)',
          border: '2px solid rgba(87,70,52,0.15)',
          width: 'fit-content',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              style={{
                fontFamily: 'var(--font-caprasimo)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.5rem 1rem',
                background: activeCategory === cat.value ? '#DA9100' : 'transparent',
                color: activeCategory === cat.value ? '#F5F0E1' : 'rgba(87,70,52,0.45)',
                border: activeCategory === cat.value ? '1px solid #574634' : '1px solid transparent',
                cursor: 'none',
                transition: 'background 200ms, color 200ms',
                fontWeight: activeCategory === cat.value ? 600 : 400,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <ProjectsEmptyState />
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gridAutoRows: '240px',
              gap: '1px',
              background: 'rgba(87,70,52,0.12)',
            }}
          >
            {filteredProjects.map(p => (
              <ProjectCard
                key={p.slug}
                project={p}
                onOpen={() => openLightbox(p)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {isMounted && lightbox.isOpen && lightbox.project && createPortal(
        <AnimatePresence>
          <ProjectLightbox
            state={lightbox}
            onClose={closeLightbox}
            onNext={nextMedia}
            onPrev={prevMedia}
          />
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
