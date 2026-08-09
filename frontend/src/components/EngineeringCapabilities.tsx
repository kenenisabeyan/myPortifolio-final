import React from 'react'
import { FaCode, FaServer, FaDatabase, FaLock, FaSitemap, FaCloudUploadAlt, FaShieldAlt, FaRobot } from 'react-icons/fa'

const capabilityCategories = [
  {
    category: 'Frontend Engineering',
    icon: <FaCode className="text-cyan-400" size={24} />,
    items: ['React', 'Next.js', 'TypeScript', 'Responsive Architecture', 'Component Architecture', 'State Management'],
    borderColor: 'border-l-cyan-500 border-t-cyan-500'
  },
  {
    category: 'Backend Engineering',
    icon: <FaServer className="text-blue-400" size={24} />,
    items: ['Node.js', 'Express', 'Django', 'REST APIs', 'Business Logic', 'API Integration'],
    borderColor: 'border-l-blue-500 border-t-blue-500'
  },
  {
    category: 'Database Engineering',
    icon: <FaDatabase className="text-teal-400" size={24} />,
    items: ['PostgreSQL', 'MongoDB', 'Prisma', 'Database Schema Design', 'Relationships', 'Data Modeling'],
    borderColor: 'border-l-teal-500 border-t-teal-500'
  },
  {
    category: 'Authentication & Authorization',
    icon: <FaLock className="text-purple-400" size={24} />,
    items: ['Authentication', 'Authorization', 'Role-Based Access Control', 'NextAuth', 'Secure Application Workflows'],
    borderColor: 'border-l-purple-500 border-t-purple-500'
  },
  {
    category: 'System Architecture',
    icon: <FaSitemap className="text-indigo-400" size={24} />,
    items: ['Modular Architecture', 'API Design', 'Multi-Role Systems', 'Scalable Application Structure', 'Separation of Concerns'],
    borderColor: 'border-l-indigo-500 border-t-indigo-500'
  },
  {
    category: 'DevOps & Deployment',
    icon: <FaCloudUploadAlt className="text-orange-400" size={24} />,
    items: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Deployment', 'Environment Configuration'],
    borderColor: 'border-l-orange-500 border-t-orange-500'
  },
  {
    category: 'Performance & Security',
    icon: <FaShieldAlt className="text-emerald-400" size={24} />,
    items: ['API Optimization', 'Database Optimization', 'Frontend Performance', 'Input Validation', 'Secure API Design'],
    borderColor: 'border-l-emerald-500 border-t-emerald-500'
  },
  {
    category: 'AI Integration',
    icon: <FaRobot className="text-cyan-300" size={24} />,
    items: ['LLM APIs', 'AI-powered Features', 'Automation', 'Intelligent Application Workflows'],
    borderColor: 'border-l-cyan-400 border-t-cyan-400'
  }
]

const EngineeringCapabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Technical Depth</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            Engineering <span className="text-cyan-400">Capabilities</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mt-2">
            Architectural and operational capabilities across full-stack engineering layers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilityCategories.map((cat, idx) => (
            <div 
              key={idx}
              className={`bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] ${cat.borderColor} border-l-[6px] border-t-[6px] rounded-[2rem] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(8,145,255,0.2)] backdrop-blur-xl`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-4">
                  {cat.category}
                </h3>
                <ul className="space-y-2">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default EngineeringCapabilities
