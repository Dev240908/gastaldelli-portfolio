'use client'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      aria-label="Navigazione principale"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1.25rem var(--space-container)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 400ms ease, backdrop-filter 400ms ease',
        background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: '1rem',
          letterSpacing: '-0.02em',
          color: '#F0F0EE',
          textDecoration: 'none',
        }}
      >
        BG<span style={{ color: '#BFFF00' }}>.</span>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {[
          { href: '/#lavori', label: 'Lavori' },
          { href: '/#about', label: 'About' },
          { href: '/#contatti', label: 'Contatti' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="nav-link"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '0.6875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(240,240,238,0.45)',
              textDecoration: 'none',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F0EE')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,238,0.45)')}
          >
            {label}
          </Link>
        ))}

        <a
          href="mailto:brian@gastaldelli.it"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            border: '1px solid #BFFF00',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#BFFF00',
            textDecoration: 'none',
            transition: 'background 200ms, color 200ms',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#BFFF00'
            e.currentTarget.style.color = '#080808'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#BFFF00'
          }}
        >
          Hire me
        </a>
      </nav>
      <style>{`
        @media (max-width: 640px) {
          .nav-link { display: none !important; }
          header nav { gap: 0 !important; }
        }
      `}</style>
    </motion.header>
  )
}
