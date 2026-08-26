import React from 'react'
import { FaReact, FaServer, FaDatabase, FaBrain, FaMagic, FaRocket } from 'react-icons/fa'

const services = [
  { 
    title: "🎨 Frontend Architecture", 
    desc: "(React, Next.js, Tailwind)",
    icon: <FaReact size={48} className="text-[#61DAFB] group-hover:drop-shadow-[0_0_15px_rgba(97,218,251,1)] transition-all duration-300" /> 
  },
  { 
    title: "⚙️ Backend Systems", 
    desc: "(Node.js, Express, Django)",
    icon: <FaServer size={48} className="text-[#68A063] group-hover:drop-shadow-[0_0_15px_rgba(104,160,99,1)] transition-all duration-300" /> 
  },
  { 
    title: "🗄️ Data Engine", 
    desc: "(PostgreSQL, MongoDB, Prisma)",
    icon: <FaDatabase size={48} className="text-[#FFD43B] group-hover:drop-shadow-[0_0_15px_rgba(255,212,59,1)] transition-all duration-300" /> 
  },
  { 
    title: "🤖 AI Integration", 
    desc: "(LLM APIs, Automation)",
    icon: <FaBrain size={48} className="text-cyan-400 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,1)] transition-all duration-300" /> 
  },
  { 
    title: "✨ Interactive UX", 
    desc: "(Motion, State-Driven)",
    icon: <FaMagic size={48} className="text-purple-400 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,1)] transition-all duration-300" /> 
  },
  { 
    title: "🚀 Version & CI/CD", 
    desc: "(Git, Vercel, Deployment)",
    icon: <FaRocket size={48} className="text-[#F05032] group-hover:drop-shadow-[0_0_15px_rgba(240,80,50,1)] transition-all duration-300" /> 
  },
]

import { usePortfolioData } from '../context/PortfolioContext'

const Services = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const servicesContent = data?.sectionContent?.services || {}

  if (visibility.services === false) return null

  const displayServices = (servicesContent.items?.length ? servicesContent.items : services).map((item: any, idx: number) => ({
    ...item,
    icon: services[idx % services.length]?.icon
  }))

  return (
    <section id="skills" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      
      {/* Deep space ambient glow map */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 via-transparent to-transparent pointer-events-none hidden dark:block" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none hidden dark:block" />
      
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mt-12 mb-16 dark:mb-20">
          <div className="flex items-center justify-center gap-3 bg-gray-100 dark:bg-blue-950/40 border border-gray-200 dark:border-blue-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_20px_rgba(59,130,246,0.1)] dark:backdrop-blur-md">
            <span className="text-gray-400 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 dark:text-cyan-300 font-black tracking-widest uppercase">System Capabilities</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white inline-block">
            {servicesContent.heading || 'Technical Skills & Services'}
          </h2>
        </div>

        {/* Floating Skill Capsules */}
        <div className="flex flex-wrap items-center justify-center gap-8 w-full max-w-[1700px] mx-auto transition-all duration-300">
          {displayServices.map((service: any, idx: number) => (
            <div 
              key={idx} 
              className="group relative bg-[#ffffff]/60 dark:bg-[#050A14]/40 dark:backdrop-blur-xl hover:bg-white dark:hover:bg-[#080d1a]/60 rounded-[3rem] py-16 px-6 border border-gray-200 dark:border-white/[0.05] dark:hover:border-cyan-500/40 transition-all duration-500 flex flex-col items-center justify-center w-[220px] h-[380px] hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] cursor-default overflow-hidden transform hover:-translate-y-3"
            >
              
              {/* Containment ambient glow ring */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-[3rem] hidden dark:block"></div>

              {/* Primary Icon Engine */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 relative z-10 text-gray-400 group-hover:opacity-100 opacity-80 dark:opacity-100">
                {service.icon}
              </div>

              {/* Data readouts */}
              <h3 className="text-gray-900 dark:text-white text-lg font-bold text-center leading-snug transition-colors duration-300 relative z-10 w-full px-2 dark:group-hover:text-cyan-300 mb-2">
                {service.title}
              </h3>
              <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 text-center relative z-10 w-full px-2">
                {service.desc}
              </p>

              {/* Decorative base lock */}
              <div className="absolute bottom-6 w-8 h-1 rounded-full bg-gray-300 dark:bg-white/10 group-hover:bg-gray-500 dark:group-hover:bg-cyan-400 dark:group-hover:shadow-[0_0_10px_rgba(34,211,238,1)] transition-colors duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services