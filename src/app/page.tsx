'use client'
import { motion } from 'motion/react'
import { pageTransition } from '@/lib/motion'
import Hero from '@/components/home/Hero'
import Problema from '@/components/home/Problema'
import Metodo from '@/components/home/Metodo'
import Works from '@/components/home/Works'
import Testimonianze from '@/components/home/Testimonianze'
import Services from '@/components/home/Services'
import Faq from '@/components/home/Faq'
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
      <Problema />
      <Metodo />
      <Works />
      <Testimonianze />
      <Services />
      <Faq />
      <Contact />
    </motion.main>
  )
}
