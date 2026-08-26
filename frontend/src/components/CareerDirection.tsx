import React from 'react'
import { FaCompass, FaCheckCircle } from 'react-icons/fa'

const openToRoles = [
  'Full-Stack Engineering',
  'Software Engineering',
  'Backend Engineering',
  'Product Development',
  'Startup Collaboration'
]

import { usePortfolioData } from '../context/PortfolioContext'

const CareerDirection: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const careerContent = data?.sectionContent?.['career-direction'] || {}

  if (visibility['career-direction'] === false) return null

  const quote = careerContent.quote || "I'm building toward becoming a highly capable Software Engineer who can contribute across product development — from understanding business requirements and designing systems to implementing, deploying, and continuously improving production software."
  const roles = careerContent.openToRoles?.length ? careerContent.openToRoles : openToRoles

  return (
    <section id="career-direction" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Professional Goal</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {careerContent.heading || "Where I'm Going"}
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto w-full">
          <div className="bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] border-l-cyan-500 border-t-cyan-500 border-l-[6px] border-t-[6px] rounded-[2rem] p-8 md:p-12 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.24)] hover:shadow-[0_25px_90px_rgba(34,211,238,0.2)] transition-all duration-300">
            
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                <FaCompass size={24} />
              </div>
              <p className="text-base md:text-xl font-medium text-gray-200 leading-relaxed italic">
                "{quote}"
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-4">
                Open To Opportunities In:
              </span>
              <div className="flex flex-wrap gap-3">
                {roles.map((role: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-gray-200">
                    <FaCheckCircle className="text-cyan-400" size={14} />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default CareerDirection
