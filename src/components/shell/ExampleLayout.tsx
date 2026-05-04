'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import PreLoader from './PreLoader'
import type { Example } from '@/lib/examples'

export default function ExampleLayout({
  children,
  example,
}: {
  children: React.ReactNode
  example: Example
}) {
  const [showPreLoader, setShowPreLoader] = useState(true)

  return (
    <>
      {showPreLoader && (
        <PreLoader
          accentColor={example.accentColor}
          title={example.title}
          onComplete={() => setShowPreLoader(false)}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showPreLoader ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Back button */}
        <Link
          href="/#esempi"
          aria-label="Torna alla galleria esempi"
          style={{
            position: 'fixed',
            top: '1.25rem',
            left: '1.25rem',
            zIndex: 1000,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'rgba(8,8,8,0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.6875rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(240,240,238,0.65)',
            textDecoration: 'none',
            transition: 'border-color 200ms, color 200ms',
          }}
        >
          ← Back
        </Link>
        {children}
      </motion.div>
    </>
  )
}
