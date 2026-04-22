import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const group = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if(group.current) {
        group.current.rotation.y -= delta * 0.05
    }
  })
  return (
    <group ref={group}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1.2} />
    </group>
  )
}

const StarsBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030610] via-transparent to-[#030610]"></div>
    </div>
  )
}

export default StarsBackground
