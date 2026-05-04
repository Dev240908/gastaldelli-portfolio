'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MarchingCubes, MarchingCube, MarchingPlane } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef } from 'react'
import * as THREE from 'three'

const BLOB_COLORS = ['#00d4ff', '#8b5cf6', '#ff0080', '#00ff88']

function Blob({ color, speed, radius }: { color: string; speed: number; radius: number }) {
  const ref = useRef<THREE.Object3D>(null)
  const { mouse } = useThree()

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    const targetX = Math.sin(t) * radius + mouse.x * 0.3
    const targetY = Math.cos(t * 0.7) * radius * 0.6 + mouse.y * 0.3
    const targetZ = Math.cos(t) * radius * 0.4
    ref.current.position.x += (targetX - ref.current.position.x) * 0.05
    ref.current.position.y += (targetY - ref.current.position.y) * 0.05
    ref.current.position.z += (targetZ - ref.current.position.z) * 0.05
  })

  return <MarchingCube ref={ref} color={new THREE.Color(color)} />
}

function LiquidBlobs() {
  return (
    <MarchingCubes resolution={48} maxPolyCount={20000} enableUvs enableColors>
      {BLOB_COLORS.map((color, i) => (
        <Blob key={color} color={color} speed={0.4 + i * 0.15} radius={0.4 + i * 0.05} />
      ))}
      <MarchingPlane />
      <meshStandardMaterial
        vertexColors
        roughness={0.05}
        metalness={0.3}
        envMapIntensity={1}
      />
    </MarchingCubes>
  )
}

export default function LiquidScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} intensity={2} color="#00d4ff" />
      <pointLight position={[-2, -2, 2]} intensity={1.5} color="#8b5cf6" />
      <LiquidBlobs />
      <EffectComposer>
        <Bloom luminanceThreshold={0.7} intensity={2} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
