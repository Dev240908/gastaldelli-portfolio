'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ImageFollower() {
  const followerRef = useRef<HTMLDivElement>(null)
  const [mounted,  setMounted]  = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [bg,       setBg]       = useState('')
  const mouseRef = useRef({ x: -400, y: -400 })
  const posRef   = useRef({ x: -400, y: -400 })
  const rafRef   = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setMounted(true)

    const onShow = (e: Event) => {
      const detail = (e as CustomEvent<{ bg: string }>).detail
      setBg(detail.bg)
      setVisible(true)
    }
    const onHide = () => setVisible(false)
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    document.addEventListener('imageFollower:show', onShow)
    document.addEventListener('imageFollower:hide', onHide)
    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current
      posRef.current.x += (mx - posRef.current.x) * 0.08
      posRef.current.y += (my - posRef.current.y) * 0.08
      const el = followerRef.current
      if (el) {
        el.style.left = `${posRef.current.x}px`
        el.style.top  = `${posRef.current.y}px`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('imageFollower:show', onShow)
      document.removeEventListener('imageFollower:hide', onHide)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <div
      ref={followerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 280,
        height: 180,
        transform: 'translate(-50%, -60%)',
        background: bg || 'transparent',
        borderRadius: 4,
        border: '2px solid rgba(87,70,52,0.15)',
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
        zIndex: 9990,
        transition: 'opacity 250ms ease',
        willChange: 'left, top',
        overflow: 'hidden',
      }}
    />,
    document.body
  )
}
