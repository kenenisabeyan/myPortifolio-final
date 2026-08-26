import React from 'react'
import { FaSearch, FaProjectDiagram, FaComments, FaCodeBranch, FaSyncAlt } from 'react-icons/fa'

const workPhases = [
  {
    phase: '01',
    title: 'Understand Requirements',
    desc: 'I clarify requirements and understand the actual problem before implementation.',
    icon: <FaSearch className="text-cyan-400" size={20} />,
    borderColor: 'border-l-cyan-500 border-t-cyan-500'
  },
  {
    phase: '02',
    title: 'Break Down Complexity',
    desc: 'I divide large requirements into manageable features and technical tasks.',
    icon: <FaProjectDiagram className="text-blue-400" size={20} />,
    borderColor: 'border-l-blue-500 border-t-blue-500'
  },
  {
    phase: '03',
    title: 'Communicate Clearly',
    desc: 'I communicate progress, blockers, assumptions, and technical decisions early.',
    icon: <FaComments className="text-indigo-400" size={20} />,
    borderColor: 'border-l-indigo-500 border-t-indigo-500'
  },
  {
    phase: '04',
    title: 'Build Collaboratively',
    desc: 'I use Git workflows, code reviews, reusable architecture, and team conventions.',
    icon: <FaCodeBranch className="text-purple-400" size={20} />,
    borderColor: 'border-l-purple-500 border-t-purple-500'
  },
  {
    phase: '05',
    title: 'Review & Improve',
    desc: 'I use feedback, testing, and iteration to continuously improve the quality of the product.',
    icon: <FaSyncAlt className="text-teal-400" size={20} />,
    borderColor: 'border-l-teal-500 border-t-teal-500'
  }
]

import { usePortfolioData } from '../context/PortfolioContext'

const HowIWork: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const howIWorkContent = data?.sectionContent?.['how-i-work'] || {}

  if (visibility['how-i-work'] === false) return null

  const displayWorkPhases = (howIWorkContent.phases?.length ? howIWorkContent.phases : workPhases).map((item: any, idx: number) => ({
    ...item,
    icon: workPhases[idx % workPhases.length]?.icon,
    borderColor: item.borderColor || workPhases[idx % workPhases.length]?.borderColor || 'border-l-cyan-500 border-t-cyan-500'
  }))

  return (
    <section id="how-i-work" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Team Collaboration</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-6">
            {howIWorkContent.heading || 'How I Work'}
          </h2>
          
          {/* Workflow Sequence Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 p-4 rounded-2xl bg-[#07101f]/80 border border-white/10 max-w-[900px] text-xs md:text-sm font-bold text-cyan-300">
            <span>Understand</span>
            <span className="text-gray-500">→</span>
            <span>Communicate</span>
            <span className="text-gray-500">→</span>
            <span>Build</span>
            <span className="text-gray-500">→</span>
            <span>Review</span>
            <span className="text-gray-500">→</span>
            <span>Improve</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayWorkPhases.map((item: any, idx: number) => (
            <div 
              key={idx}
              className={`bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] ${item.borderColor} border-l-[6px] border-t-[6px] rounded-[2rem] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(8,145,255,0.2)] backdrop-blur-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-extrabold text-cyan-400/50">{item.phase}</span>
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HowIWork
