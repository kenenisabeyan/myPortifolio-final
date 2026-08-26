import React from 'react'
import { FaShieldAlt, FaDatabase, FaCogs, FaProjectDiagram, FaLock, FaTerminal } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioContext'

const defaultStandards = [
  {
    icon: <FaShieldAlt className="text-cyan-400" size={24} />,
    title: 'Clean Architecture & SOLID',
    desc: 'Separation of concerns across UI, business logic, and data layers to ensure long-term maintainability and testability.',
    borderColor: 'border-l-cyan-400 border-t-cyan-400'
  },
  {
    icon: <FaLock className="text-indigo-400" size={24} />,
    title: 'Security & Granular RBAC',
    desc: 'Role-based access control, hashed credentials, JWT authentication, and sanitized inputs preventing injection attacks.',
    borderColor: 'border-l-indigo-500 border-t-indigo-500'
  },
  {
    icon: <FaDatabase className="text-teal-400" size={24} />,
    title: 'Database Optimization',
    desc: 'Schema normalization, indexed foreign keys, optimized join queries, and sub-50ms execution performance.',
    borderColor: 'border-l-teal-500 border-t-teal-500'
  },
  {
    icon: <FaProjectDiagram className="text-blue-400" size={24} />,
    title: 'RESTful & Scalable APIs',
    desc: 'Predictable API contracts, standardized HTTP status codes, structured JSON responses, and error handlers.',
    borderColor: 'border-l-blue-500 border-t-blue-500'
  },
  {
    icon: <FaCogs className="text-purple-400" size={24} />,
    title: 'Component Reusability',
    desc: 'Modular React architecture using strict TypeScript typing, reusable context providers, and responsive styling.',
    borderColor: 'border-l-purple-500 border-t-purple-500'
  },
  {
    icon: <FaTerminal className="text-cyan-300" size={24} />,
    title: 'Production Readiness',
    desc: 'Environment variable isolation, automated builds, CORS safety, error boundaries, and production logging.',
    borderColor: 'border-l-cyan-300 border-t-cyan-300'
  }
]

const ArchitectureStandards: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const content = data?.sectionContent?.['architecture-standards'] || {}

  if (visibility['architecture-standards'] === false) return null

  const displayStandards = (content.standards?.length ? content.standards : defaultStandards).map((item: any, idx: number) => ({
    ...item,
    icon: defaultStandards[idx % defaultStandards.length]?.icon,
    borderColor: item.borderColor || defaultStandards[idx % defaultStandards.length]?.borderColor || 'border-l-cyan-500 border-t-cyan-500'
  }))

  return (
    <section id="architecture-standards" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Engineering Rigor</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {content.heading || 'Architecture & Code Quality Standards'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mt-2">
            The core principles and architectural guidelines that ensure every product is secure, scalable, and maintainable.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayStandards.map((item: any, idx: number) => (
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
              <p className="text-sm font-normal text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ArchitectureStandards
