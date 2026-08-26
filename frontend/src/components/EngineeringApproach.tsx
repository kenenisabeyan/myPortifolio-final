import React from 'react'

const approachSteps = [
  {
    step: '01',
    title: 'Understand the Problem',
    desc: 'I start by understanding the users, business requirements, workflows, constraints, and expected outcomes before writing code.',
    borderColor: 'border-l-cyan-500 border-t-cyan-500'
  },
  {
    step: '02',
    title: 'Design the System',
    desc: 'I translate requirements into scalable application architecture, database structures, APIs, authentication flows, and maintainable frontend systems.',
    borderColor: 'border-l-blue-500 border-t-blue-500'
  },
  {
    step: '03',
    title: 'Build for Production',
    desc: 'I focus on clean architecture, reusable components, security, performance, accessibility, error handling, and reliable data flows.',
    borderColor: 'border-l-indigo-500 border-t-indigo-500'
  },
  {
    step: '04',
    title: 'Test & Refine',
    desc: 'I validate functionality, identify edge cases, improve performance, and continuously refine the product based on real requirements.',
    borderColor: 'border-l-purple-500 border-t-purple-500'
  },
  {
    step: '05',
    title: 'Deploy & Maintain',
    desc: 'I take applications beyond development by handling deployment, environment configuration, version control, and ongoing improvements.',
    borderColor: 'border-l-teal-500 border-t-teal-500'
  }
]

import { usePortfolioData } from '../context/PortfolioContext'

const EngineeringApproach: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const approachContent = data?.sectionContent?.approach || {}

  if (visibility.approach === false) return null

  const displaySteps = (approachContent.steps?.length ? approachContent.steps : approachSteps).map((s: any, idx: number) => ({
    ...s,
    borderColor: s.borderColor || approachSteps[idx % approachSteps.length]?.borderColor || 'border-l-cyan-500 border-t-cyan-500'
  }))

  return (
    <section id="approach" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Engineering Thinking</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {approachContent.heading || 'Engineering Approach'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mt-2">
            How I evaluate, design, build, and deliver reliable software solutions from problem statement to production release.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displaySteps.map((item, idx) => (
            <div 
              key={idx}
              className={`group relative bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] ${item.borderColor} border-l-[6px] border-t-[6px] rounded-[2rem] p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(8,145,255,0.2)] backdrop-blur-xl`}
            >
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-cyan-400/40 group-hover:text-cyan-400 transition-colors mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm font-normal text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="w-8 h-1 rounded-full bg-white/10 group-hover:bg-cyan-400 transition-colors mt-6" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default EngineeringApproach
