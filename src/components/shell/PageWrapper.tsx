'use client'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import { pageTransition } from '@/lib/motion'
import SkeletonPage from './SkeletonPage'
import { useState, useEffect } from 'react'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const t = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key={`skeleton-${pathname}`} exit={{ opacity: 0 }}>
          <SkeletonPage />
        </motion.div>
      ) : (
        <motion.div
          key={pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
