import React from 'react'
import { FaUserCheck, FaPoll, FaPlug, FaKey, FaMobileAlt, FaBuilding } from 'react-icons/fa'

const challengeItems = [
  {
    title: 'Role-Based Access Control',
    desc: 'Designed permission-aware systems where different users can access different dashboards, workflows, and operations.',
    icon: <FaUserCheck className="text-cyan-400" size={24} />,
    borderColor: 'border-l-cyan-500 border-t-cyan-500'
  },
  {
    title: 'Complex Evaluation Workflows',
    desc: 'Built structured employee and instructor evaluation systems involving multiple roles, assessment stages, and performance data.',
    icon: <FaPoll className="text-blue-400" size={24} />,
    borderColor: 'border-l-blue-500 border-t-blue-500'
  },
  {
    title: 'API & Database Integration',
    desc: 'Connected modern frontend applications with backend APIs and structured databases while maintaining consistent data flows.',
    icon: <FaPlug className="text-indigo-400" size={24} />,
    borderColor: 'border-l-indigo-500 border-t-indigo-500'
  },
  {
    title: 'Authentication Systems',
    desc: 'Implemented authentication and authorization flows for multi-user applications.',
    icon: <FaKey className="text-purple-400" size={24} />,
    borderColor: 'border-l-purple-500 border-t-purple-500'
  },
  {
    title: 'Responsive Product Interfaces',
    desc: 'Built interfaces that remain usable across desktop, tablet, and mobile environments.',
    icon: <FaMobileAlt className="text-teal-400" size={24} />,
    borderColor: 'border-l-teal-500 border-t-teal-500'
  },
  {
    title: 'Production-Oriented Architecture',
    desc: 'Focused on modular, maintainable systems rather than one-off pages or template-based products.',
    icon: <FaBuilding className="text-cyan-300" size={24} />,
    borderColor: 'border-l-cyan-400 border-t-cyan-400'
  }
]

import { usePortfolioData } from '../context/PortfolioContext'

const EngineeringChallenges: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const challengesContent = data?.sectionContent?.['engineering-challenges'] || {}

  if (visibility['engineering-challenges'] === false) return null

  const displayChallenges = (challengesContent.challenges?.length ? challengesContent.challenges : challengeItems).map((item: any, idx: number) => ({
    ...item,
    icon: challengeItems[idx % challengeItems.length]?.icon,
    borderColor: item.borderColor || challengeItems[idx % challengeItems.length]?.borderColor || 'border-l-cyan-500 border-t-cyan-500'
  }))

  return (
    <section id="engineering-challenges" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Technical Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {challengesContent.heading || 'Engineering Challenges I\'ve Solved'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayChallenges.map((item: any, idx: number) => (
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

export default EngineeringChallenges
