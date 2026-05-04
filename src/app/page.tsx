'use client'
import { motion } from 'motion/react'
import { pageTransition } from '@/lib/motion'
import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import About from '@/components/home/About'
import ExamplesGallery from '@/components/home/ExamplesGallery'
import Contact from '@/components/home/Contact'

export default function HomePage() {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <Services />
      <About />
      <ExamplesGallery />
      <Contact />
    </motion.main>
  )
}
