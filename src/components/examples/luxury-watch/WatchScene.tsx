'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef } from 'react'
import * as THREE from 'three'

function WatchModel({ dialColor }: { dialColor: string }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.mouse.x * 0.5,
      0.05
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.mouse.y * -0.2,
      0.05
    )
  })

  return (
    <group ref={groupRef}>
      {/* Cassa */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 64]} />
        <meshStandardMaterial color="#c0a060" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Quadrante */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.02, 64]} />
        <meshStandardMaterial color={dialColor} roughness={0.3} />
      </mesh>
      {/* Vetro cristallo */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.02, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.02}
          roughness={0}
          chromaticAberration={0.02}
          ior={1.5}
        />
      </mesh>
      {/* Cinturino */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
    </group>
  )
}

export default function WatchScene({ dialColor }: { dialColor: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 40 }} dpr={[1, 1.5]}>
      <Environment preset="studio" />
      <ambientLight intensity={0.3} />
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
        <WatchModel dialColor={dialColor} />
      </Float>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={4} blur={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.9} intensity={0.5} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}
