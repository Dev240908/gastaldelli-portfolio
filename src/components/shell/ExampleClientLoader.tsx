'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import SkeletonPage from './SkeletonPage'

const components = {
  'newspaper-reveal': dynamic(() => import('@/components/examples/newspaper-reveal/NewspaperReveal'), { ssr: false }),
  'terminal-portfolio': dynamic(() => import('@/components/examples/terminal-portfolio/TerminalPortfolio'), { ssr: false }),
  'liquid-morphism': dynamic(() => import('@/components/examples/liquid-morphism/LiquidMorphism'), { ssr: false }),
  'code-galaxy': dynamic(() => import('@/components/examples/code-galaxy/CodeGalaxy'), { ssr: false }),
  'infinite-corridor': dynamic(() => import('@/components/examples/infinite-corridor/InfiniteCorridor'), { ssr: false }),
  'synesthetic': dynamic(() => import('@/components/examples/synesthetic/Synesthetic'), { ssr: false }),
  'luxury-watch': dynamic(() => import('@/components/examples/luxury-watch/LuxuryWatch'), { ssr: false }),
  'architecture-studio': dynamic(() => import('@/components/examples/architecture-studio/ArchitectureStudio'), { ssr: false }),
} as const

type Slug = keyof typeof components

export default function ExampleClientLoader({ slug }: { slug: string }) {
  const Component = components[slug as Slug]
  return (
    <Suspense fallback={<SkeletonPage />}>
      {Component ? <Component /> : <SkeletonPage />}
    </Suspense>
  )
}
