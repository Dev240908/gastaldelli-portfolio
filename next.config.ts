import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'gsap', 'motion'],
  },
  images: { unoptimized: true },
}

export default config
