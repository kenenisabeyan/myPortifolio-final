import React from 'react'
import { FaBrain, FaLayerGroup, FaLaptopCode, FaRocket, FaUsers, FaUserShield } from 'react-icons/fa'

const bringItems = [
  {
    title: 'Product Thinking',
    desc: "I don't treat development as simply writing code. I think about users, workflows, business requirements, scalability, and long-term maintainability.",
    icon: <FaBrain className="text-cyan-400" size={24} />,
    borderColor: 'border-l-cyan-500 border-t-cyan-500'
  },
  {
    title: 'Full-Stack Ownership',
    desc: 'I can work across the frontend, backend, database, authentication, APIs, and deployment layers of a product.',
    icon: <FaLayerGroup className="text-blue-400" size={24} />,
    borderColor: 'border-l-blue-500 border-t-blue-500'
  },
  {
    title: 'Real Project Experience',
    desc: 'I have worked on real platforms involving multi-role systems, dashboards, authentication, structured workflows, APIs, databases, and production-oriented development.',
    icon: <FaLaptopCode className="text-indigo-400" size={24} />,
    borderColor: 'border-l-indigo-500 border-t-indigo-500'
  },
  {
    title: 'Fast Learning & Adaptability',
    desc: 'I continuously learn new technologies and adapt to existing codebases, development standards, and team workflows.',
    icon: <FaRocket className="text-purple-400" size={24} />,
    borderColor: 'border-l-purple-500 border-t-purple-500'
  },
  {
    title: 'Team Collaboration',
    desc: 'I value code reviews, clear communication, documentation, Git workflows, and learning from experienced engineers.',
    icon: <FaUsers className="text-teal-400" size={24} />,
    borderColor: 'border-l-teal-500 border-t-teal-500'
  },
  {
    title: 'Ownership',
    desc: 'When I take responsibility for a feature or system, I focus on understanding the requirement, implementing it properly, testing it, and delivering a reliable result.',
    icon: <FaUserShield className="text-cyan-300" size={24} />,
    borderColor: 'border-l-cyan-400 border-t-cyan-400'
  }
]

import { usePortfolioData } from '../context/PortfolioContext'

const WhatIBring: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const whatIBringContent = data?.sectionContent?.['what-i-bring'] || {}

  if (visibility['what-i-bring'] === false) return null

  const displayBringItems = (whatIBringContent.items?.length ? whatIBringContent.items : bringItems).map((item: any, idx: number) => ({
    ...item,
    icon: bringItems[idx % bringItems.length]?.icon,
    borderColor: item.borderColor || bringItems[idx % bringItems.length]?.borderColor || 'border-l-cyan-500 border-t-cyan-500'
  }))

  return (
    <section id="what-i-bring" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Team Value</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {whatIBringContent.heading || 'What I Bring to Your Team'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBringItems.map((item: any, idx: number) => {
            const topBars = [
              'from-cyan-400 via-teal-300 to-transparent',
              'from-blue-400 via-indigo-300 to-transparent',
              'from-indigo-400 via-purple-300 to-transparent',
              'from-purple-400 via-pink-300 to-transparent',
              'from-teal-400 via-emerald-300 to-transparent',
              'from-cyan-400 via-blue-300 to-transparent'
            ]
            return (
              <div 
                key={idx}
                className="group relative bg-gradient-to-b from-[#0c162d]/90 via-[#070e1c]/95 to-[#040814]/98 border border-white/[0.1] hover:border-cyan-500/40 rounded-3xl p-8 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.01] transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(34,211,238,0.15)] backdrop-blur-xl flex flex-col justify-between"
              >
                {/* Cyberpunk HUD Corner Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />

                {/* Top hairline accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${topBars[idx % topBars.length]} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 transition-all duration-300 shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base font-normal text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default WhatIBring
