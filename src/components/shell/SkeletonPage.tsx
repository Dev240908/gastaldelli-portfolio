'use client'
import { motion } from 'motion/react'

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white/5 ${className ?? ''}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export default function SkeletonPage() {
  return (
    <div className="min-h-screen pt-24 px-[var(--space-container)]">
      <SkeletonBlock className="h-16 w-2/3 mb-6" />
      <SkeletonBlock className="h-6 w-1/2 mb-4" />
      <SkeletonBlock className="h-6 w-3/4 mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-48" />
        ))}
      </div>
    </div>
  )
}
