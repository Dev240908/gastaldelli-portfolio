'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LiquidScene = dynamic(() => import('./LiquidScene'), { ssr: false })

export default function LiquidMorphism() {
  return (
    <div className="relative w-full h-screen bg-[var(--color-bg)] overflow-hidden">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)] font-mono text-sm">
          Caricamento shader...
        </div>
      }>
        <LiquidScene />
      </Suspense>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-[var(--color-text-muted)] font-mono text-xs">
          muovi il cursore · click per esplosione
        </p>
      </div>
    </div>
  )
}
