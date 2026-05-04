'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let inkCounter = 0

export default function InkReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<SVGFEColorMatrixElement>(null)
  const filterId = useRef(`ink-${++inkCounter}`)

  useGSAP(() => {
    gsap.fromTo(
      filterRef.current,
      { attr: { values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0' } },
      {
        attr: { values: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        delay,
      }
    )
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay,
    })
  }, { scope: containerRef })

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id={filterId.current}>
          <feColorMatrix ref={filterRef} type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        </filter>
      </svg>
      <div ref={containerRef} style={{ filter: `url(#${filterId.current})` }}>
        {children}
      </div>
    </>
  )
}
