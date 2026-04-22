import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WaterSurface = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(30, 20, 64, 64)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const positions = (meshRef.current.geometry as THREE.BufferGeometry).attributes.position
    
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        
        // Fluid wave calculation
        const z = Math.sin(x * 0.5 + time * 0.5) * 0.3 +
                  Math.cos(y * 0.5 + time * 0.4) * 0.3 +
                  Math.sin(x * 0.2 + y * 0.2 + time * 0.3) * 0.4

        positions.setZ(i, z)
    }
    
    positions.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} position={[0, -2, -6]} rotation={[-Math.PI / 2.2, 0, 0]}>
      <bufferGeometry attach="geometry" {...geometry} />
      <meshStandardMaterial 
        color="#1E3A8A" // deep blue to match aesthetic
        wireframe={true}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

const FluidBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, 5, -10]} intensity={2} color="#06b6d4" />
        <WaterSurface />
      </Canvas>
      {/* Fade overlay for smooth integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
    </div>
  )
}

export default FluidBackground
