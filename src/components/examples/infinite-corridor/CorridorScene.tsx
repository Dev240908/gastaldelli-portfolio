'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, Vignette, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

const CORRIDOR_SEGMENTS = 8
const SEGMENT_DEPTH = 5

function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree()

  useFrame(() => {
    const targetZ = -(scrollRef.current * CORRIDOR_SEGMENTS * SEGMENT_DEPTH)
    camera.position.z += (targetZ - camera.position.z) * 0.05
    camera.position.y = Math.sin(scrollRef.current * Math.PI * 4) * 0.1
  })
  return null
}

function CorridorWall({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[4, 3]} />
      <meshStandardMaterial color="#0a0a18" roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

function CorridorSegment({ index }: { index: number }) {
  const z = -index * SEGMENT_DEPTH
  return (
    <group position={[0, 0, z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[4, SEGMENT_DEPTH]} />
        <meshStandardMaterial color="#060614" roughness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.5, 0]}>
        <planeGeometry args={[4, SEGMENT_DEPTH]} />
        <meshStandardMaterial color="#040410" roughness={0.9} />
      </mesh>
      <CorridorWall position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <CorridorWall position={[2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <pointLight position={[0, 1.2, 0]} intensity={0.5} color="#8b5cf6" distance={4} />
    </group>
  )
}

export default function CorridorScene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 200 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={['#020208']} />
      <fog attach="fog" args={['#020208', 8, 30]} />
      <ambientLight intensity={0.05} />
      <CameraRig scrollRef={scrollRef} />
      {Array.from({ length: CORRIDOR_SEGMENTS }).map((_, i) => (
        <CorridorSegment key={i} index={i} />
      ))}
      <EffectComposer>
        <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
        <Vignette eskil={false} offset={0.3} darkness={1.2} />
        <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
      </EffectComposer>
    </Canvas>
  )
}
