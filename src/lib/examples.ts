export interface Example {
  slug: string
  title: string
  description: string
  tags: string[]
  difficulty: 'CSS' | 'GSAP' | '3D' | 'Audio'
  accentColor: string
  category: 'strano' | 'normale' | 'ecommerce' | 'business'
}

export const examples: Example[] = [
  {
    slug: 'newspaper-reveal',
    title: 'Newspaper Reveal',
    description: "Ink-spreading da B&W a colore su layout editoriale anni '40.",
    tags: ['GSAP', 'SVG', 'Editorial'],
    difficulty: 'GSAP',
    accentColor: '#f5e642',
    category: 'normale',
  },
  {
    slug: 'terminal-portfolio',
    title: 'Terminal Portfolio',
    description: 'Navigazione CLI con typewriter, phosphor glow e Easter egg.',
    tags: ['Framer Motion', 'CLI', 'Hacker'],
    difficulty: 'CSS',
    accentColor: '#00ff41',
    category: 'normale',
  },
  {
    slug: 'liquid-morphism',
    title: 'Liquid Morphism',
    description: 'Metaballs WebGL con fisica attrattiva/repulsiva sul cursore.',
    tags: ['R3F', 'GLSL', 'WebGL'],
    difficulty: '3D',
    accentColor: '#00d4ff',
    category: 'strano',
  },
  {
    slug: 'code-galaxy',
    title: 'Code Galaxy',
    description: 'Galassia Three.js navigabile: ogni stella è un progetto.',
    tags: ['R3F', 'drei', 'Particles'],
    difficulty: '3D',
    accentColor: '#8b5cf6',
    category: 'normale',
  },
  {
    slug: 'infinite-corridor',
    title: 'Infinite Corridor',
    description: 'Corridoio 3D prospettico: scroll = camminare avanti.',
    tags: ['R3F', 'ScrollTrigger', 'Perspective'],
    difficulty: '3D',
    accentColor: '#ff6b35',
    category: 'strano',
  },
  {
    slug: 'synesthetic',
    title: 'Synesthetic Interface',
    description: 'Musica ambient generativa dal cursore + visualizer WebGL.',
    tags: ['Web Audio', 'OGL', 'Tone.js'],
    difficulty: 'Audio',
    accentColor: '#ff0080',
    category: 'strano',
  },
  {
    slug: 'luxury-watch',
    title: 'Luxury Watch',
    description: 'Configuratore 3D orologio con lighting HDRI fotorealistico.',
    tags: ['R3F', 'HDRI', 'E-commerce'],
    difficulty: '3D',
    accentColor: '#d4af37',
    category: 'ecommerce',
  },
  {
    slug: 'architecture-studio',
    title: 'Architecture Studio',
    description: 'Vetrina minimalista con parallax multi-layer e silenzio.',
    tags: ['GSAP', 'Lenis', 'Editorial'],
    difficulty: 'GSAP',
    accentColor: '#e8e8e8',
    category: 'business',
  },
]
