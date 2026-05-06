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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1.125rem var(--space-container)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 350ms ease, box-shadow 350ms ease',
        background: scrolled
          ? 'rgba(245, 240, 225, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled
          ? '2px solid rgba(87, 70, 52, 0.15)'
          : '2px solid transparent',
        boxShadow: scrolled ? '0 2px 0 0 rgba(87,70,52,0.08)' : 'none',
      }}
    >
      {/* Logo — Abril Fatface, audace */}
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-abril)',
          fontWeight: 400,
          fontSize: '1.5rem',
          letterSpacing: '-0.01em',
          color: '#574634',
          textDecoration: 'none',
          lineHeight: 1,
        }}
      >
        BG<span style={{ color: '#B7410E' }}>.</span>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {[
          { href: '/#lavori',   label: 'Lavori' },
          { href: '/#about',    label: 'About' },
          { href: '/#contatti', label: 'Contatti' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="nav-link"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 500,
              fontSize: '0.9375rem',
              color: 'rgba(87, 70, 52, 0.65)',
              textDecoration: 'none',
            }}
          >
            {label}
          </Link>
        ))}

        {/* CTA con hard offset shadow */}
        <a
          href="mailto:brian@gastaldelli.it"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 1.25rem',
            background: '#B7410E',
            color: '#F5F0E1',
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
            border: '2px solid #574634',
            boxShadow: '4px 4px 0 0 #574634',
            transition: 'transform 200ms var(--ease-expo), box-shadow 200ms var(--ease-expo)',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translate(-2px,-2px)'
            e.currentTarget.style.boxShadow = '6px 6px 0 0 #574634'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translate(0,0)'
            e.currentTarget.style.boxShadow = '4px 4px 0 0 #574634'
          }}
        >
          Hire me ✦
        </a>
      </nav>
    </motion.header>
  )
}
