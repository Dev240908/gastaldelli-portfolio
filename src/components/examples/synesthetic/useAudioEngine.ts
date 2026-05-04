'use client'
import { useRef, useCallback, useEffect } from 'react'

export function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const filterRef = useRef<BiquadFilterNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  const start = useCallback(() => {
    if (ctxRef.current) return
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    const analyser = ctx.createAnalyser()

    osc.type = 'sine'
    osc.frequency.value = 220
    filter.type = 'lowpass'
    filter.frequency.value = 800
    filter.Q.value = 3
    gain.gain.value = 0
    analyser.fftSize = 256

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(analyser)
    analyser.connect(ctx.destination)
    osc.start()

    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1)

    ctxRef.current = ctx
    oscRef.current = osc
    gainRef.current = gain
    filterRef.current = filter
    analyserRef.current = analyser
  }, [])

  const updateFromCursor = useCallback((x: number, y: number) => {
    if (!ctxRef.current || !oscRef.current || !filterRef.current) return
    const ctx = ctxRef.current
    const freq = 150 + x * 550
    const vol = 0.02 + (1 - y) * 0.10
    oscRef.current.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.1)
    filterRef.current.frequency.exponentialRampToValueAtTime(300 + x * 1200, ctx.currentTime + 0.15)
    gainRef.current!.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.1)
  }, [])

  useEffect(() => () => { ctxRef.current?.close() }, [])

  return { start, updateFromCursor, analyser: analyserRef }
}
