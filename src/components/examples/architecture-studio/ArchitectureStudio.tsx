'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'Residenza Contemporanea', year: '2025', location: 'Verona' },
  { title: 'Studio Professionale', year: '2025', location: 'Milano' },
  { title: 'Villa Minimalista', year: '2024', location: 'Lago di Garda' },
]

function ProjectRow({ title, year, location, index }: { title: string; year: string; location: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      x: index % 2 === 0 ? -60 : 60,
      duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
    })
  }, { scope: ref })

  return (
    <div
      ref={ref}
      className="flex items-end justify-between py-8 border-b cursor-pointer group"
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <div>
        <p className="text-xs font-mono text-[#666] mb-2 uppercase tracking-widest">{location} · {year}</p>
        <h2 className="font-display font-light text-3xl text-white group-hover:text-[#e8e8e8] transition-colors">
          {title}
        </h2>
      </div>
      <span className="font-mono text-[#444] group-hover:text-white transition-colors">→</span>
    </div>
  )
}

export default function ArchitectureStudio() {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(heroRef.current, { opacity: 0, y: 40, duration: 1.2, ease: 'expo.out', delay: 0.3 })
  }, { scope: heroRef })

  return (
    <div className="min-h-screen bg-[#080808]" style={{ fontFamily: 'var(--font-syne)' }}>
      <section ref={heroRef} className="min-h-screen flex flex-col justify-end p-12">
        <p className="font-mono text-xs text-[#666] uppercase tracking-widest mb-6">Studio di Architettura</p>
        <h1 className="font-display font-black leading-none mb-12" style={{ fontSize: 'clamp(4rem,10vw,12rem)', color: 'white' }}>
          Spazio.<br />Luce.<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Silenzio.</span>
        </h1>
      </section>

      <section className="px-12 pb-24 max-w-4xl">
        <p className="text-xs font-mono text-[#666] mb-8 uppercase tracking-widest">Progetti selezionati</p>
        {projects.map((p, i) => (
          <ProjectRow key={p.title} {...p} index={i} />
        ))}
      </section>
    </div>
  )
}
