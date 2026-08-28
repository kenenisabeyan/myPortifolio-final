import React from 'react'
import { FaUserCheck, FaGraduationCap, FaRocket, FaCode, FaCogs, FaProjectDiagram } from 'react-icons/fa'

const snapshotItems = [
  {
    icon: <FaUserCheck className="text-cyan-400" size={20} />,
    title: 'Role',
    detail: 'Full-Stack Software Engineer'
  },
  {
    icon: <FaGraduationCap className="text-blue-400" size={20} />,
    title: 'Education',
    detail: 'CSE Student at ASTU & Management Student at Arsi University'
  },
  {
    icon: <FaRocket className="text-indigo-400" size={20} />,
    title: 'Leadership',
    detail: 'Founder of EDOT Platform & MinT Startup Innovation Fellow'
  },
  {
    icon: <FaCode className="text-teal-400" size={20} />,
    title: 'Core Stacks',
    detail: 'PERN, MERN & Django (Python)'
  },
  {
    icon: <FaCogs className="text-purple-400" size={20} />,
    title: 'Architecture',
    detail: 'Multi-Role Systems, RBAC, REST APIs & Schema Design'
  },
  {
    icon: <FaProjectDiagram className="text-cyan-300" size={20} />,
    title: 'Focus',
    detail: 'Data-Driven Dashboards & Production-Grade Web Applications'
  }
]

import { usePortfolioData } from '../context/PortfolioContext'

const ProfessionalSnapshot: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const snapshotContent = data?.sectionContent?.snapshot || {}

  if (visibility.snapshot === false) return null

  const itemsToRender = [
    { key: 'role', title: 'Role', defaultDetail: 'Full-Stack Software Engineer', icon: <FaUserCheck className="text-cyan-400" size={20} /> },
    { key: 'education', title: 'Education', defaultDetail: 'CSE Student at ASTU & Management Student at Arsi University', icon: <FaGraduationCap className="text-blue-400" size={20} /> },
    { key: 'leadership', title: 'Leadership', defaultDetail: 'Founder of EDOT Platform & MinT Startup Innovation Fellow', icon: <FaRocket className="text-indigo-400" size={20} /> },
    { key: 'coreStacks', title: 'Core Stacks', defaultDetail: 'PERN, MERN & Django (Python)', icon: <FaCode className="text-teal-400" size={20} /> },
    { key: 'architecture', title: 'Architecture', defaultDetail: 'Multi-Role Systems, RBAC, REST APIs & Schema Design', icon: <FaCogs className="text-purple-400" size={20} /> },
    { key: 'focus', title: 'Focus', defaultDetail: 'Data-Driven Dashboards & Production-Grade Web Applications', icon: <FaProjectDiagram className="text-cyan-300" size={20} /> },
  ].map(item => ({
    icon: item.icon,
    title: item.title,
    detail: snapshotContent[item.key] || item.defaultDetail
  }))

  return (
    <section id="snapshot" className="py-12 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        {/* Header Badge & Title */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-4 shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs font-mono text-gray-500 font-bold tracking-widest uppercase dark:text-cyan-100">Recruiter Quick Summary</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block">
            Professional <span className="text-cyan-400">Snapshot</span>
          </h2>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsToRender.map((item, idx) => (
            <div 
              key={idx}
              className="group relative bg-gradient-to-b from-[#0c162d]/90 via-[#070e1c]/95 to-[#040814]/98 border border-white/[0.1] hover:border-cyan-500/40 rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(34,211,238,0.15)] backdrop-blur-xl overflow-hidden"
            >
              {/* Top hairline glowing light bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity pointer-events-none" />

              <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300 shadow-inner">
                {item.icon}
              </div>
              <div className="flex flex-col relative z-10">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
                  {item.title}
                </span>
                <span className="text-sm md:text-base font-semibold text-gray-200 group-hover:text-white leading-snug transition-colors">
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ProfessionalSnapshot
