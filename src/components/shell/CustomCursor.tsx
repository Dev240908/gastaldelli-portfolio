'use client'
import { useEffect, useRef, useCallback } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // click ripple factory
  const spawnRipple = useCallback((x: number, y: number) => {
    const r = document.createElement('div')
    r.style.cssText = [
      'position:fixed',
      `left:${x}px`,
      `top:${y}px`,
      'width:6px',
      'height:6px',
      'border-radius:50%',
      'border:1.5px solid #BFFF00',
      'transform:translate(-50%,-50%) scale(1)',
      'opacity:0.8',
      'pointer-events:none',
      'z-index:99998',
      'transition:transform 600ms cubic-bezier(0.16,1,0.3,1), opacity 600ms ease',
    ].join(';')
    document.body.appendChild(r)
    requestAnimationFrame(() => {
      r.style.transform = 'translate(-50%,-50%) scale(8)'
      r.style.opacity   = '0'
    })
    setTimeout(() => r.remove(), 620)
  }, [])

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const onClick = (e: MouseEvent) => spawnRipple(e.clientX, e.clientY)

    const onEnterLink = () => {
      ring.style.transform   = 'translate(-50%,-50%) scale(2.4)'
      ring.style.borderColor = '#BFFF00'
      ring.style.mixBlendMode = 'normal'
      dot.style.opacity = '0'
    }

    const onLeaveLink = () => {
      ring.style.transform    = 'translate(-50%,-50%) scale(1)'
      ring.style.borderColor  = 'rgba(240,240,238,0.5)'
      ring.style.mixBlendMode = 'difference'
      dot.style.opacity = '1'
    }

    const tick = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      dot.style.left  = `${mx}px`
      dot.style.top   = `${my}px`
      ring.style.left = `${rx}px`
      ring.style.top  = `${ry}px`
      raf = requestAnimationFrame(tick)
    }

    // use event delegation — works for dynamically mounted links too
    const delegate = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a, button, [role="button"]')
      if (target) {
        if (e.type === 'mouseover') onEnterLink()
        else onLeaveLink()
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('click', onClick, { passive: true })
    document.addEventListener('mouseover', delegate)
    document.addEventListener('mouseout', delegate)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      document.removeEventListener('mouseover', delegate)
      document.removeEventListener('mouseout', delegate)
    }
  }, [spawnRipple])

  return (
    <>
      {/* dot — instant follow */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          background: '#BFFF00',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 200ms',
        }}
      />
      {/* ring — lagged follow */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: '1px solid rgba(240,240,238,0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1), border-color 300ms',
        }}
      />
    </>
  )
}
