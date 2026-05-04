'use client'
import dynamic from 'next/dynamic'
import { useRef, useEffect, Suspense } from 'react'

const CorridorScene = dynamic(() => import('./CorridorScene'), { ssr: false })

export default function InfiniteCorridor() {
  const scrollRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      scrollRef.current = scrollTop / (scrollHeight - clientHeight)
    }
    const el = containerRef.current
    el?.addEventListener('scroll', handleScroll)
    return () => el?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-screen overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <CorridorScene scrollRef={scrollRef} />
        </Suspense>
      </div>
      <div style={{ height: '800vh' }} />
    </div>
  )
}
