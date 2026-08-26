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
          {displayBringItems.map((item: any, idx: number) => (
            <div 
              key={idx}
              className={`group relative bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] ${item.borderColor} border-l-[6px] border-t-[6px] rounded-[2rem] p-8 overflow-hidden transform hover:-translate-y-2 hover:shadow-[0_25px_90px_rgba(8,145,255,0.2)] transition-all duration-300 backdrop-blur-xl`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm md:text-base font-normal text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhatIBring
