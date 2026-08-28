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
          {displaySteps.map((item: any, idx: number) => {
            const colors = [
              { bar: 'from-cyan-400 via-teal-300 to-transparent', glow: 'from-cyan-500/20 to-transparent', num: 'text-cyan-400', line: 'bg-cyan-400' },
              { bar: 'from-blue-400 via-indigo-300 to-transparent', glow: 'from-blue-500/20 to-transparent', num: 'text-blue-400', line: 'bg-blue-400' },
              { bar: 'from-indigo-400 via-purple-300 to-transparent', glow: 'from-indigo-500/20 to-transparent', num: 'text-indigo-400', line: 'bg-indigo-400' },
              { bar: 'from-purple-400 via-pink-300 to-transparent', glow: 'from-purple-500/20 to-transparent', num: 'text-purple-400', line: 'bg-purple-400' },
              { bar: 'from-teal-400 via-emerald-300 to-transparent', glow: 'from-teal-500/20 to-transparent', num: 'text-teal-400', line: 'bg-teal-400' },
            ][idx % 5]

            return (
              <div 
                key={idx}
                className="group relative bg-gradient-to-b from-[#0c162d]/90 via-[#070e1c]/95 to-[#040814]/98 border border-white/[0.1] hover:border-cyan-500/40 rounded-3xl p-6 md:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(34,211,238,0.15)] backdrop-blur-xl overflow-hidden"
              >
                {/* Top glowing hairline accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${colors.bar} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${colors.glow} rounded-full blur-2xl opacity-30 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-2xl md:text-3xl font-mono font-black ${colors.num} opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                      {item.step}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded-full">
                      PHASE 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2.5 leading-snug group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm font-normal text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className={`w-10 h-1 rounded-full bg-white/10 group-hover:${colors.line} transition-all duration-500 mt-6 group-hover:w-full`} />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default EngineeringApproach
