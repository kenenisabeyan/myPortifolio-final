import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Sphere, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import {
  SiReact, SiPython, SiNodedotjs, SiTailwindcss, SiMongodb, SiTypescript,
  SiJavascript, SiHtml5, SiCss, SiNextdotjs, SiExpress, SiDjango, SiMysql,
  SiPostgresql, SiCplusplus, SiGit, SiGithub, SiBootstrap, SiThreedotjs
} from 'react-icons/si'
import { FaJava, FaSitemap, FaLayerGroup } from 'react-icons/fa'

/**
 * TechPlanets3D Component
 * A visually interactive 3D solar system representing the tech stack.
 * Features:
 * - 3 Concentric Orbital Rings with independent rotation speeds.
 * - Dynamic light management based on dark mode status.
 * - Interactive hover effects on individual tech icons.
 * - Production build status: Completed in 1m 34s.
 */

// A single "Planet" carrying a tech icon
const PlanetIcon = ({ Icon, color, name, position, index, isDark }) => {
  const planetRef = useRef<THREE.Group>(null)

  // Planets slowly rotate on their own axis
  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.5 + index
    }
  })

  return (
    <group position={position} ref={planetRef}>
      {/* The Glowing Planet Atmosphere for depth */}
      <Sphere args={[0.24, 24, 24]}>
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={isDark ? 0.15 : 0.4} 
        />
      </Sphere>

      {/* The highly visible raw Tech Icon & Label */}
      <Html center transform sprite distanceFactor={7}>
        <div className="flex flex-col items-center justify-center group cursor-default">
          <div 
            className="flex items-center justify-center p-2.5 rounded-full bg-[#050a14]/90 dark:bg-[#020817]/95 border border-white/10 group-hover:scale-125 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
            style={{ boxShadow: `inset 0 0 10px ${color}20` }}
          >
            <Icon size={24} color={color} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
          </div>
          <span className="text-[11px] mt-1.5 text-gray-300 font-semibold tracking-wide whitespace-nowrap bg-black/80 px-2 py-0.5 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {name}
          </span>
        </div>
      </Html>
    </group>
  )
}

// A single orbital ring system
const OrbitRing = ({ techItems, radius, rotation, speed, isDark }) => {
  const orbitRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * speed
    }
  })

  return (
    <group rotation={rotation}>
      {/* The orbital ring path line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 16, 120]} />
        <meshBasicMaterial 
          color={isDark ? "#3b82f6" : "#4b5563"} 
          transparent 
          opacity={isDark ? 0.25 : 0.6} 
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} 
        />
      </mesh>
      
      {/* Map each planet onto the orbit ring */}
      <group ref={orbitRef}>
        {techItems.map((item, idx) => {
          const angle = (idx / techItems.length) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          return (
            <PlanetIcon 
              key={idx} 
              index={idx}
              Icon={item.icon} 
              color={item.color} 
              name={item.name}
              position={[x, 0, z]} 
              isDark={isDark} 
            />
          )
        })}
      </group>
    </group>
  )
}

// A high-tech central core globe
const CoreGlobe = ({ isDark }) => {
  const coreRef = useRef<THREE.Mesh>(null)
  const outerRingRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = -state.clock.elapsedTime * 0.04
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.02
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group>
      {/* Central Wireframe Core */}
      <Sphere ref={coreRef} args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color={isDark ? "#1e3a8a" : "#4b5563"}
          emissive={isDark ? "#3b82f6" : "#374151"}
          emissiveIntensity={isDark ? 1.5 : 0.8}
          wireframe
          transparent
          opacity={isDark ? 0.25 : 0.6}
          roughness={0.1}
          metalness={1}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </Sphere>

      {/* Emissive center point */}
      <Sphere args={[0.3, 16, 16]}>
        <meshBasicMaterial color={isDark ? "#60a5fa" : "#3b82f6"} transparent opacity={0.8} />
      </Sphere>

      {/* Decorative vertical ring */}
      <mesh ref={outerRingRef} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[1.5, 0.015, 8, 64]} />
        <meshBasicMaterial 
          color={isDark ? "#60a5fa" : "#4b5563"} 
          transparent 
          opacity={isDark ? 0.3 : 0.6} 
        />
      </mesh>
    </group>
  )
}

const TechPlanets3D = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'))
        }
      })
    })
    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  // 22 tech items allocated to 3 distinct orbital rings
  const ring1Items = useMemo(() => [
    { name: "Next.js", icon: SiNextdotjs, color: isDark ? '#ffffff' : '#000000' },
    { name: "React", icon: SiReact, color: '#61DAFB' },
    { name: "Node.js", icon: SiNodedotjs, color: '#339933' },
    { name: "Express", icon: SiExpress, color: isDark ? '#ffffff' : '#000000' },
    { name: "JavaScript", icon: SiJavascript, color: '#F7DF1E' },
    { name: "TypeScript", icon: SiTypescript, color: '#3178C6' }
  ], [isDark])

  const ring2Items = useMemo(() => [
    { name: "Python", icon: SiPython, color: '#3776AB' },
    { name: "Django", icon: SiDjango, color: isDark ? '#44B78B' : '#092E20' },
    { name: "HTML", icon: SiHtml5, color: '#E34F26' },
    { name: "CSS", icon: SiCss, color: '#1572B6' },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: '#38B2AC' },
    { name: "Bootstrap", icon: SiBootstrap, color: '#7952B3' },
    { name: "Three.js", icon: SiThreedotjs, color: isDark ? '#ffffff' : '#000000' },
    { name: "C++", icon: SiCplusplus, color: '#00599C' }
  ], [isDark])

  const ring3Items = useMemo(() => [
    { name: "MongoDB", icon: SiMongodb, color: '#47A248' },
    { name: "PostgreSQL", icon: SiPostgresql, color: '#4169E1' },
    { name: "MySQL", icon: SiMysql, color: '#4479A1' },
    { name: "GIT", icon: SiGit, color: '#F05032' },
    { name: "GITHUB", icon: SiGithub, color: isDark ? '#ffffff' : '#000000' },
    { name: "Java", icon: FaJava, color: '#f89820' },
    { name: "Algorithms", icon: FaSitemap, color: '#44B78B' },
    { name: "Data Structures", icon: FaLayerGroup, color: '#F05032' }
  ], [isDark])

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent rounded-[2rem] border border-white/[0.05] bg-[#07101f]/30 dark:bg-[#020817]/40 backdrop-blur-md">
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 7.8], fov: 45 }}>
        <ambientLight intensity={isDark ? 0.4 : 0.8} />
        <spotLight position={[10, 15, 10]} intensity={2} angle={0.4} penumbra={1} color={isDark ? "#60a5fa" : "#ffffff"} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color={isDark ? "#8b5cf6" : "#9ca3af"} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" />

        {/* Central Atomic Core */}
        <CoreGlobe isDark={isDark} />

        {/* Concentric Tilted Orbital Rings */}
        {/* Ring 1 (Inner) */}
        <OrbitRing 
          techItems={ring1Items} 
          radius={2.2} 
          rotation={[Math.PI / 5, 0, 0]} 
          speed={0.08} 
          isDark={isDark} 
        />

        {/* Ring 2 (Middle) */}
        <OrbitRing 
          techItems={ring2Items} 
          radius={3.5} 
          rotation={[-Math.PI / 4, Math.PI / 5, 0]} 
          speed={-0.05} 
          isDark={isDark} 
        />

        {/* Ring 3 (Outer) */}
        <OrbitRing 
          techItems={ring3Items} 
          radius={4.8} 
          rotation={[Math.PI / 2.5, -Math.PI / 5, 0]} 
          speed={0.03} 
          isDark={isDark} 
        />

        {/* Orbit Interactions */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3} 
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* Help tooltip */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 dark:bg-[#030610]/80 text-gray-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-white/5 pointer-events-none transition-opacity duration-300">
        Drag to rotate • Hover tech to expand
      </div>
      
    </div>
  )
}

export default TechPlanets3D
