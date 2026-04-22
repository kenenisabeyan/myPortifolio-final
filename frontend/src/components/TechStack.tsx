import React from 'react'
import FluidBackground from './FluidBackground'
import { 
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, 
  SiDjango, SiPython, SiCplusplus, SiExpress, SiTailwindcss,
  SiMysql, SiPostgresql, SiMongodb, SiNodedotjs
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

const iconClass = "text-white transition-colors duration-500"

const rowOne = [
  { name: 'React', icon: <SiReact className={`group-hover:text-[#61DAFB] ${iconClass}`} size={38} /> },
  { name: 'Next.js', icon: <SiNextdotjs className={`group-hover:text-gray-300 ${iconClass}`} size={38} /> },
  { name: 'Node.js', icon: <SiNodedotjs className={`group-hover:text-[#339933] ${iconClass}`} size={38} /> },
  { name: 'Express', icon: <SiExpress className={`group-hover:text-gray-300 ${iconClass}`} size={38} /> },
  { name: 'MongoDB', icon: <SiMongodb className={`group-hover:text-[#47A248] ${iconClass}`} size={38} /> },
]

const rowTwo = [
  { name: 'JavaScript(ES6+)', icon: <SiJavascript className={`group-hover:text-[#F7DF1E] ${iconClass}`} size={38} /> },
  { name: 'TypeScript', icon: <SiTypescript className={`group-hover:text-[#3178C6] ${iconClass}`} size={38} /> },
  { name: 'HTML5', icon: <SiHtml5 className={`group-hover:text-[#E34F26] ${iconClass}`} size={38} /> },
  { name: 'CSS3', icon: <SiCss className={`group-hover:text-[#1572B6] ${iconClass}`} size={38} /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className={`group-hover:text-[#06B6D4] ${iconClass}`} size={38} /> },
]

const rowThree = [
  { name: 'Python', icon: <SiPython className={`group-hover:text-[#3776AB] ${iconClass}`} size={38} /> },
  { name: 'Django', icon: <SiDjango className={`group-hover:text-[#092E20] ${iconClass}`} size={38} /> },
  { name: 'MySQL', icon: <SiMysql className={`group-hover:text-[#4479A1] ${iconClass}`} size={38} /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className={`group-hover:text-[#4169E1] ${iconClass}`} size={38} /> },
  { name: 'C++', icon: <SiCplusplus className={`group-hover:text-[#00599C] ${iconClass}`} size={38} /> },
  { name: 'Java', icon: <FaJava className={`group-hover:text-[#5382a1] ${iconClass}`} size={38} /> },
]

const TechCard = ({ tech }) => (
  <div className="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/[0.06] hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 group relative overflow-hidden cursor-default transform hover:-translate-y-2">
    
    {/* Futuristic corner accent */}
    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm rounded-bl-full"></div>
    <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm rounded-tr-full"></div>
    
    <div className="flex flex-col items-center justify-center gap-3 relative z-10">
      <div className="transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">
        {tech.icon}
      </div>
      <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-400 group-hover:text-white transition-colors duration-500">
        {tech.name}
      </span>
    </div>
  </div>
)

const TechStack = () => {
  return (
    <section className="py-32 relative overflow-hidden border-t border-white/[0.05] bg-[#030610]">
      
      {/* 3D Fluid Animation Background if applicable, layered softly */}
      <div className="absolute inset-0 opacity-30">
        <FluidBackground />
      </div>
      
      {/* Edge Fades for infinite marquee illusion */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#030610] via-[#030610]/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#030610] via-[#030610]/80 to-transparent z-10 pointer-events-none"></div>
      
      {/* Ambient static glow matching the globe theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      
      <div className="max-w-[100vw] mx-auto flex flex-col gap-10 relative z-10">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Powered By <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Modern Tech.</span>
          </h2>
        </div>

        {/* Row 1: Flowing Left */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap gap-6 sm:gap-8 hover:[animation-play-state:paused]">
            {[...rowOne, ...rowOne, ...rowOne, ...rowOne].map((tech, idx) => (
              <TechCard key={`r1-${idx}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Row 2: Flowing Right */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap gap-6 sm:gap-8 hover:[animation-play-state:paused] -ml-[150px]">
            {[...rowTwo, ...rowTwo, ...rowTwo, ...rowTwo, ...rowTwo].map((tech, idx) => (
              <TechCard key={`r2-${idx}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Row 3: Flowing Left */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap gap-6 sm:gap-8 hover:[animation-play-state:paused] -ml-[50px]">
             {[...rowThree, ...rowThree, ...rowThree, ...rowThree].map((tech, idx) => (
              <TechCard key={`r3-${idx}`} tech={tech} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default TechStack
