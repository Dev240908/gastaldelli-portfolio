'use client'
import { motion } from 'motion/react'
import { pageTransition } from '@/lib/motion'
import Hero from '@/components/home/Hero'
import Works from '@/components/home/Works'
import Projects from '@/components/home/Projects'
import Services from '@/components/home/Services'
import About from '@/components/home/About'
import ExamplesGallery from '@/components/home/ExamplesGallery'
import Contact from '@/components/home/Contact'
import WaveDivider from '@/components/ui/WaveDivider'

export default function HomePage() {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <WaveDivider fill="#DA9100" bgFill="#F5F0E1" />
      <Works />
      <Projects />
      <Services />
      <About />
      <ExamplesGallery />
      <Contact />
    </motion.main>
  )
}
