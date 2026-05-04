'use client'
import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export default function WaveformVisual({ analyser }: { analyser: RefObject<AnalyserNode | null> }) {
  const [path, setPath] = useState('')

  useEffect(() => {
    if (!analyser.current) return
    const buffer = new Uint8Array(analyser.current.fftSize)
    let raf: number

    const draw = () => {
      if (!analyser.current) return
      analyser.current.getByteTimeDomainData(buffer)
      const W = 800, H = 200
      const d = Array.from(buffer).map((v, i) => {
        const x = (i / buffer.length) * W
        const y = ((v / 128) - 1) * H * 0.45 + H / 2
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      }).join(' ')
      setPath(d)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [analyser])

  return (
    <svg viewBox="0 0 800 200" width="80%" height="auto" className="opacity-70">
      <path
        d={path}
        stroke="url(#waveGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ff0080" />
        </linearGradient>
      </defs>
    </svg>
  )
}
