'use client'
import dynamic from 'next/dynamic'
import { useState, Suspense } from 'react'

const WatchScene = dynamic(() => import('./WatchScene'), { ssr: false })

const DIAL_OPTIONS = [
  { label: 'Nero', value: '#0a0a0a' },
  { label: 'Avorio', value: '#f5f0e0' },
  { label: 'Navy', value: '#0d1b3e' },
  { label: 'Champagne', value: '#d4af7f' },
]

export default function LuxuryWatch() {
  const [dialColor, setDialColor] = useState('#0a0a0a')

  return (
    <div className="min-h-screen bg-[#0a0808] flex flex-col lg:flex-row">
      <div className="flex-1 h-[60vh] lg:h-screen">
        <Suspense fallback={null}>
          <WatchScene dialColor={dialColor} />
        </Suspense>
      </div>

      <div className="w-full lg:w-80 p-8 flex flex-col justify-center">
        <p className="font-mono text-xs text-[#d4af37] uppercase tracking-widest mb-2">Configuratore</p>
        <h1 className="font-display font-black text-3xl text-white mb-2">Orologio<br />di Lusso</h1>
        <p className="text-sm text-[#666] mb-8">Personalizza il tuo segnatempo.</p>

        <div className="mb-6">
          <p className="text-xs font-mono text-[#888] mb-3 uppercase tracking-wider">Quadrante</p>
          <div className="flex gap-3">
            {DIAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDialColor(opt.value)}
                aria-label={`Colore quadrante ${opt.label}`}
                className="w-10 h-10 rounded-full border-2 transition-all"
                style={{
                  background: opt.value,
                  borderColor: dialColor === opt.value ? '#d4af37' : '#333',
                  transform: dialColor === opt.value ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>

        <button
          className="w-full py-4 rounded-2xl font-display font-bold text-sm text-black"
          style={{ background: 'linear-gradient(135deg, #d4af37, #f0c040)' }}
        >
          Richiedi Preventivo
        </button>
      </div>
    </div>
  )
}
