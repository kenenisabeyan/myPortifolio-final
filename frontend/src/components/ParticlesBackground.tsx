import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Particles = () => {
  const mesh = useRef<THREE.Points>(null)
  const count = 2000

  const [positions, scale] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scale = new Float32Array(count)
    for (let i = 0; i < count; i++) {
        // Place particles randomly in a widespread area
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      scale[i] = Math.random()
    }
    return [pos, scale]
  }, [])

  useFrame((state) => {
      if(mesh.current) {
          mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05
          mesh.current.rotation.x = state.clock.getElapsedTime() * 0.02
      }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-scale" count={scale.length} array={scale} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.6} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Particles />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030610] via-transparent to-[#030610]"></div>
    </div>
  )
}

export default ParticlesBackground
