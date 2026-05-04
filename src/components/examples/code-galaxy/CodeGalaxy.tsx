'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const GalaxyScene = dynamic(() => import('./GalaxyScene'), { ssr: false })

export default function CodeGalaxy() {
  return (
    <div className="w-full h-screen bg-[#020408] overflow-hidden relative">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <p className="font-mono text-xs text-[var(--color-text-muted)]">
          trascina per ruotare · hover su una stella per scoprire
        </p>
      </div>
      <Suspense fallback={null}>
        <GalaxyScene />
      </Suspense>
    </div>
  )
}
