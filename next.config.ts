import type { NextConfig } from 'next'

const config: NextConfig = {
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'gsap', 'motion'],
  },
}

export default config
