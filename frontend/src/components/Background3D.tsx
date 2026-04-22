import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Stars, Sphere, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import {
  SiReact, SiNextdotjs, SiDjango, SiPython, SiJavascript, 
  SiTypescript, SiExpress, SiTailwindcss, SiHtml5, SiCss, 
  SiMysql, SiPostgresql, SiMongodb, SiBootstrap, SiGit, SiGithub,
  SiCplusplus
} from 'react-icons/si'
import { FaJava, FaSitemap } from 'react-icons/fa'

// A single "Planet" carrying a tech icon
const PlanetIcon = ({ icon: Icon, color, position, index, isDark }) => {
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
      <Sphere args={[0.3, 32, 32]}>
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={isDark ? 0.15 : 0.4} 
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} 
        />
      </Sphere>

      {/* The highly visible raw Tech Icon without a bounding box */}
      <Html center transform sprite distanceFactor={6}>
        <div 
          className="flex items-center justify-center hover:scale-125 transition-transform duration-300 cursor-default"
        >
          {/* Render the icon massive and clearly visible */}
          <Icon size={44} color={color} style={{ filter: `drop-shadow(0 0 15px ${color})` }} />
        </div>
      </Html>
    </group>
  )
}

// The entire Solar System ring of tech planets
const InnerPlanetarySystem = ({ techItems, isDark }) => {
  const orbitRef = useRef<THREE.Group>(null)
  
  // Orbit all the planets slowly inside the central sun container
  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group rotation={[Math.PI / 8, 0, 0]}>
      <group ref={orbitRef}>
        
        {/* Draw the orbital ring path INSIDE the globe */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.003, 16, 128]} />
          <meshBasicMaterial color={isDark ? "#3b82f6" : "#4b5563"} transparent opacity={isDark ? 0.4 : 0.8} blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} />
        </mesh>
        
        {/* Map each planet onto the inner orbit ring */}
        {techItems.map((item, idx) => (
          <PlanetIcon key={idx} index={idx} icon={item.icon} color={item.color} position={item.pos} isDark={isDark} />
        ))}
        
      </group>
    </group>
  )
}

// High-tech translucent wireframe central globe
const CyberGlobe = ({ isDark }) => {
  const globeRef = useRef<THREE.Mesh>(null)
  const ringRef1 = useRef<THREE.Mesh>(null)
  const ringRef2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = -state.clock.elapsedTime * 0.05
      globeRef.current.rotation.z = state.clock.elapsedTime * 0.02
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = Math.PI / 2
      ringRef1.current.rotation.z = state.clock.elapsedTime * 0.1
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -state.clock.elapsedTime * 0.08
    }
  })

  return (
    <group rotation={[Math.PI / 8, 0, 0]}>
      {/* Central Glowing Wireframe Sphere - Outer Boundary */}
      <Sphere ref={globeRef} args={[3.8, 48, 48]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={isDark ? "#1e3a8a" : "#1f2937"}
          emissive={isDark ? "#3b82f6" : "#374151"}
          emissiveIntensity={isDark ? 1.5 : 1}
          wireframe
          transparent
          opacity={isDark ? 0.1 : 0.5}
          roughness={0.1}
          metalness={1}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </Sphere>

      {/* Decorative crossed rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[4.2, 0.015, 16, 100]} />
        <meshBasicMaterial color={isDark ? "#60a5fa" : "#6b7280"} transparent opacity={isDark ? 0.3 : 0.6} blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} />
      </mesh>
      
      <mesh ref={ringRef2} rotation={[-Math.PI / 2.2, Math.PI / 4, 0]}>
        <torusGeometry args={[4.4, 0.01, 16, 100]} />
        <meshBasicMaterial color={isDark ? "#a855f7" : "#4b5563"} transparent opacity={isDark ? 0.2 : 0.4} blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} />
      </mesh>
    </group>
  )
}

const Background3D = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'))
    
    // Observer for dark mode toggle
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

  const techItems = useMemo(() => {
    // Retain brand colors so the images (icons) are highly recognizable and visible
    const iconsList = [
      { icon: SiReact, color: '#61DAFB' },
      { icon: SiNextdotjs, color: '#ffffff' },
      { icon: SiDjango, color: '#092E20' },
      { icon: SiPython, color: '#3776AB' },
      { icon: FaJava, color: '#f89820' },
      { icon: SiJavascript, color: '#F7DF1E' },
      { icon: SiTypescript, color: '#3178C6' },
      { icon: SiExpress, color: '#ffffff' },
      { icon: SiTailwindcss, color: '#38B2AC' },
      { icon: SiHtml5, color: '#E34F26' },
      { icon: SiCss, color: '#1572B6' },
      { icon: SiMysql, color: '#4479A1' },
      { icon: SiPostgresql, color: '#4169E1' },
      { icon: SiMongodb, color: '#47A248' },
      { icon: SiBootstrap, color: '#7952b3' },
      { icon: SiGit, color: '#F05032' },
      { icon: SiGithub, color: '#ffffff' },
      { icon: SiCplusplus, color: '#00599C' },
      { icon: FaSitemap, color: '#a855f7' }
    ]

    const orbitRadius = 2.8 // Placed INSIDE the 3.8 CyberGlobe boundary
    const positions: any[] = []
    const num = iconsList.length

    // Separate all icons using perfectly equal distance along a single internal orbital circumference
    for (let i = 0; i < num; i++) {
        const angle = (i / num) * Math.PI * 2
        
        // Calculate coordinates for a 2D circle on the X-Z plane
        const x = Math.cos(angle) * orbitRadius
        const y = 0
        const z = Math.sin(angle) * orbitRadius
        
        positions.push({ ...iconsList[i], pos: [x, y, z] })
    }

    return positions
  }, [])

  return (
    <div className="fixed inset-0 w-screen h-[100vh] z-0 bg-gray-50 dark:bg-[#030610] overflow-hidden pointer-events-auto transition-colors duration-500">
      
      {/* Light mode grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:hidden" style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, rgba(249,250,251,1) 80%),
          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 50px 50px, 50px 50px',
        backgroundPosition: 'center center'
      }}></div>

      {/* Deep space faint radial mesh grid background (Dark Mode) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60 hidden dark:block" style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, rgba(3,6,16,1) 80%),
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 50px 50px, 50px 50px',
        backgroundPosition: 'center center'
      }}></div>

      <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={isDark ? 0.2 : 0.6} />
        <spotLight position={[10, 20, 10]} intensity={3} angle={0.5} penumbra={1} color={isDark ? "#3b82f6" : "#ffffff"} />
        <pointLight position={[-10, -10, -10]} intensity={2} color={isDark ? "#8b5cf6" : "#9ca3af"} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" />

        {/* Deep space stars */}
        {isDark && <Stars radius={150} depth={60} count={3000} factor={4} fade speed={1.5} />}
        
        {/* High-tech structures */}
        <CyberGlobe isDark={isDark} />
        <InnerPlanetarySystem techItems={techItems} isDark={isDark} />

        {/* Interaction controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        
      </Canvas>
    </div>
  )
}

export default Background3D