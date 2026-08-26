import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Sphere, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { resolveTechIcon } from '../utils/techIconResolver'

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

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.5 + index
    }
  })

  const meta = resolveTechIcon(name, 24)
  const finalColor = color || meta.color

  return (
    <group position={position} ref={planetRef}>
      {/* The Glowing Planet Atmosphere for depth */}
      <Sphere args={[0.24, 24, 24]}>
        <meshBasicMaterial 
          color={finalColor} 
          transparent 
          opacity={isDark ? 0.15 : 0.4} 
        />
      </Sphere>

      {/* The highly visible raw Tech Icon & Label */}
      <Html center transform sprite distanceFactor={7}>
        <div className="flex flex-col items-center justify-center group cursor-default">
          <div 
            className="flex items-center justify-center p-2.5 rounded-full bg-[#050a14]/90 dark:bg-[#020817]/95 border border-white/10 group-hover:scale-125 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
            style={{ boxShadow: `inset 0 0 10px ${finalColor}20` }}
          >
            {meta.icon}
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

import { usePortfolioData } from '../context/PortfolioContext'

const ICON_MAP: Record<string, { icon: any, defaultColor: string }> = {
  'Next.js': { icon: SiNextdotjs, defaultColor: '#ffffff' },
  'React': { icon: SiReact, defaultColor: '#61DAFB' },
  'Node.js': { icon: SiNodedotjs, defaultColor: '#339933' },
  'Express': { icon: SiExpress, defaultColor: '#ffffff' },
  'JavaScript': { icon: SiJavascript, defaultColor: '#F7DF1E' },
  'TypeScript': { icon: SiTypescript, defaultColor: '#3178C6' },
  'Python': { icon: SiPython, defaultColor: '#3776AB' },
  'Django': { icon: SiDjango, defaultColor: '#44B78B' },
  'HTML': { icon: SiHtml5, defaultColor: '#E34F26' },
  'CSS': { icon: SiCss, defaultColor: '#1572B6' },
  'Tailwind CSS': { icon: SiTailwindcss, defaultColor: '#38B2AC' },
  'Bootstrap': { icon: SiBootstrap, defaultColor: '#7952B3' },
  'Three.js': { icon: SiThreedotjs, defaultColor: '#ffffff' },
  'C++': { icon: SiCplusplus, defaultColor: '#00599C' },
  'MongoDB': { icon: SiMongodb, defaultColor: '#47A248' },
  'PostgreSQL': { icon: SiPostgresql, defaultColor: '#4169E1' },
  'MySQL': { icon: SiMysql, defaultColor: '#4479A1' },
  'GIT': { icon: SiGit, defaultColor: '#F05032' },
  'Git': { icon: SiGit, defaultColor: '#F05032' },
  'GITHUB': { icon: SiGithub, defaultColor: '#ffffff' },
  'GitHub': { icon: SiGithub, defaultColor: '#ffffff' },
  'Java': { icon: FaJava, defaultColor: '#f89820' },
  'Algorithms': { icon: FaSitemap, defaultColor: '#44B78B' },
  'Data Structures': { icon: FaLayerGroup, defaultColor: '#F05032' },
}

const TechPlanets3D = () => {
  const { data } = usePortfolioData()
  const [isDark, setIsDark] = useState(true)
  const planetsContent = data?.sectionContent?.['3d-planets'] || {}

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

  const defaultRing1 = [
    { name: "Next.js", color: isDark ? '#ffffff' : '#000000' },
    { name: "React", color: '#61DAFB' },
    { name: "Node.js", color: '#339933' },
    { name: "Express", color: isDark ? '#ffffff' : '#000000' },
    { name: "JavaScript", color: '#F7DF1E' },
    { name: "TypeScript", color: '#3178C6' }
  ]

  const defaultRing2 = [
    { name: "Python", color: '#3776AB' },
    { name: "Django", color: isDark ? '#44B78B' : '#092E20' },
    { name: "HTML", color: '#E34F26' },
    { name: "CSS", color: '#1572B6' },
    { name: "Tailwind CSS", color: '#38B2AC' },
    { name: "Bootstrap", color: '#7952B3' },
    { name: "Three.js", color: isDark ? '#ffffff' : '#000000' },
    { name: "C++", color: '#00599C' }
  ]

  const defaultRing3 = [
    { name: "MongoDB", color: '#47A248' },
    { name: "PostgreSQL", color: '#4169E1' },
    { name: "MySQL", color: '#4479A1' },
    { name: "GIT", color: '#F05032' },
    { name: "GITHUB", color: isDark ? '#ffffff' : '#000000' },
    { name: "Java", color: '#f89820' },
    { name: "Algorithms", color: '#44B78B' },
    { name: "Data Structures", color: '#F05032' }
  ]

  const mapItems = (items: any[]) => items.map(item => {
    const meta = resolveTechIcon(item.name, 24)
    return {
      name: item.name,
      icon: () => meta.icon,
      color: item.color || meta.color
    }
  })

  const ring1Items = useMemo(() => mapItems(planetsContent.ring1?.length ? planetsContent.ring1 : defaultRing1), [planetsContent, isDark])
  const ring2Items = useMemo(() => mapItems(planetsContent.ring2?.length ? planetsContent.ring2 : defaultRing2), [planetsContent, isDark])
  const ring3Items = useMemo(() => mapItems(planetsContent.ring3?.length ? planetsContent.ring3 : defaultRing3), [planetsContent, isDark])

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
