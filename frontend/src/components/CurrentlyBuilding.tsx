import React from 'react'
import { FaHammer, FaLaptopCode, FaChartLine } from 'react-icons/fa'

import { usePortfolioData } from '../context/PortfolioContext'

const CurrentlyBuilding: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}

  if (visibility['currently-building'] === false) return null

  const buildingContent = data?.sectionContent?.['currently-building'] || {}

  const activeBuilding = buildingContent.building?.length ? buildingContent.building : [
    { title: 'EDOT', desc: 'Modular education technology platform for digital learning workflows.' },
    { title: 'Production Applications', desc: 'Full-stack web applications with authentication, RBAC, and analytics.' },
    { title: 'Business Platforms', desc: 'Real-world evaluation dashboards & CRM task tracking systems.' }
  ]

  const learningAreas = buildingContent.learning?.length ? buildingContent.learning : [
    'System Design',
    'Software Architecture',
    'Backend Engineering',
    'DevOps',
    'Technical Communication',
    'Professional English'
  ]

  return (
    <section id="currently-building" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Continuous Growth</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {buildingContent.heading || 'Currently Building & Learning'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Building */}
          <div className="bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] border-l-cyan-500 border-t-cyan-500 border-l-[6px] border-t-[6px] rounded-[2rem] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(34,211,238,0.2)] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <FaHammer size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">Active Product Building</h3>
            </div>
            <ul className="space-y-4">
              {activeBuilding.map((item: any, idx: number) => (
                <li key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-bold text-cyan-300 block mb-1">{item.title}</span>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Working With */}
          <div className="bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] border-l-blue-500 border-t-blue-500 border-l-[6px] border-t-[6px] rounded-[2rem] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(59,130,246,0.2)] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                <FaLaptopCode size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">Active Technology Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Prisma', 'Docker', 'Git'].map((tech, idx) => (
                <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-gray-200 hover:border-cyan-400/40 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Improving */}
          <div className="bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] border-l-indigo-500 border-t-indigo-500 border-l-[6px] border-t-[6px] rounded-[2rem] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(99,102,241,0.2)] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                <FaChartLine size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">Focus Areas for Mastery</h3>
            </div>
            <ul className="space-y-3">
              {learningAreas.map((area: string, idx: number) => (
                <li key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-200">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  <span>{typeof area === 'string' ? area : (area as any).title || String(area)}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  )
}

export default CurrentlyBuilding
