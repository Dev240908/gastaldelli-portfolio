'use client'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect } from 'react'

interface PreLoaderProps {
  accentColor: string
  title: string
  onComplete: () => void
}

export default function PreLoader({ accentColor, title, onComplete }: PreLoaderProps) {
  useEffect(() => {
    const t = setTimeout(onComplete, 1800)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{ background: 'var(--color-bg)' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1"
          style={{ background: accentColor }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />

        {/* Title */}
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.3em] mb-4"
          style={{ color: accentColor }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Caricamento
        </motion.p>
        <motion.h1
          className="font-display font-extrabold text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  )
}
