# Portfolio Showcase — Brian Gastaldelli

Portfolio B2B di eccellenza tecnica e visiva. 8 sub-siti interattivi che dimostrano
competenze in Web Development, 3D WebGL, Automazioni AI e Creative Technology.

## Setup

```bash
bun install
bun run dev
```

## Stack Tecnologico

- **Framework**: Next.js 15 App Router + Bun runtime
- **3D**: React Three Fiber v9, @react-three/drei, Three.js
- **Animazioni**: GSAP 3 + ScrollTrigger, Framer Motion 12
- **Scroll**: Lenis smooth scroll
- **Audio**: Web Audio API + Tone.js
- **Stile**: Tailwind CSS v4, Dark Glassmorphism 2.0
- **Font**: Syne, Inter, JetBrains Mono (via next/font)

## Sub-siti

| Slug | Titolo | Tecnologia |
|------|--------|-----------|
| `newspaper-reveal` | Newspaper Reveal | GSAP + SVG ink-spread |
| `terminal-portfolio` | Terminal Portfolio | Framer Motion typewriter |
| `liquid-morphism` | Liquid Morphism | R3F + MarchingCubes WebGL |
| `code-galaxy` | Code Galaxy | R3F + drei Stars + particles |
| `infinite-corridor` | Infinite Corridor | R3F + scroll camera |
| `synesthetic` | Synesthetic Interface | Web Audio API + SVG waveform |
| `luxury-watch` | Luxury Watch | R3F configuratore 3D |
| `architecture-studio` | Architecture Studio | GSAP ScrollTrigger parallax |

## Comandi

```bash
bun run dev          # Sviluppo con Turbopack
bun run build        # Build produzione
bun run type-check   # TypeScript check
bun run lint         # ESLint
```
