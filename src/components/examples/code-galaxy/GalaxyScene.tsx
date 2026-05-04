'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Html, OrbitControls, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { examples } from '@/lib/examples'

function ProjectStar({ example, position }: { example: typeof examples[0]; position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.scale.setScalar(hovered ? 1.5 : 1 + Math.sin(Date.now() * 0.003) * 0.1)
  })

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={example.accentColor}
          emissive={example.accentColor}
          emissiveIntensity={hovered ? 3 : 1.5}
        />
        {hovered && (
          <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
            <div
              className="glass p-4 rounded-xl w-48 text-center"
              style={{ border: `1px solid ${example.accentColor}40` }}
            >
              <p className="text-xs font-mono mb-1" style={{ color: example.accentColor }}>
                {example.difficulty}
              </p>
              <h3 className="font-display font-bold text-sm text-white">{example.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{example.description}</p>
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  )
}

const positions: [number, number, number][] = [
  [2, 1, -1], [-2, 0.5, -2], [0, 2, -1.5],
  [1.5, -1, -0.5], [-1, -1.5, -1], [2.5, 0, -3],
  [-2.5, 1.5, -2.5], [0, -2, -2],
]

export default function GalaxyScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
      <color attach="background" args={['#020408']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.1} />
      {examples.map((ex, i) => (
        <ProjectStar key={ex.slug} example={ex} position={positions[i] ?? [0, 0, 0]} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.8} intensity={1.5} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.8} />
      </EffectComposer>
    </Canvas>
  )
}
