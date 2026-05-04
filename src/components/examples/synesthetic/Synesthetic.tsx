'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAudioEngine } from './useAudioEngine'
import WaveformVisual from './WaveformVisual'

export default function Synesthetic() {
  const [started, setStarted] = useState(false)
  const { start, updateFromCursor, analyser } = useAudioEngine()

  const handleStart = () => { start(); setStarted(true) }

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!started) return
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight
    updateFromCursor(x, y)
  }, [started, updateFromCursor])

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #0d0020 0%, #020208 100%)' }}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />

      <AnimatePresence>
        {!started && (
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            onClick={handleStart}
          >
            <div className="glass p-12 rounded-3xl text-center">
              <div
                className="w-16 h-16 rounded-full border-2 border-[var(--color-accent-2)] flex items-center justify-center mx-auto mb-6"
                aria-label="Avvia audio"
              >
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-[12px] border-transparent border-l-[var(--color-accent-2)] ml-1" />
              </div>
              <h2 className="font-display font-bold text-2xl mb-2">Synesthetic</h2>
              <p className="text-[var(--color-text-muted)] text-sm">
                Clicca per attivare l&apos;audio<br />
                poi muovi il cursore
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && <WaveformVisual analyser={analyser} />}

      {started && (
        <div className="absolute bottom-8 text-center pointer-events-none">
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            X = frequenza · Y = volume
          </p>
        </div>
      )}
    </div>
  )
}
