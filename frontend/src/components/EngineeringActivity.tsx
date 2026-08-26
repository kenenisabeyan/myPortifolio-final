import React from 'react'
import { FaGithub, FaCodeBranch, FaStar, FaExternalLinkAlt } from 'react-icons/fa'

const featuredRepos = [
  {
    name: 'edot',
    desc: 'Modular full-stack education ecosystem engineered for scalable digital learning experiences.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    link: 'https://github.com/kenenisabeyan/edot'
  },
  {
    name: 'followflow',
    desc: 'Premium CRM and task tracking dashboard with Django REST backend and React 19 UI.',
    tech: ['React 19', 'TypeScript', 'Django', 'SQLite'],
    link: 'https://github.com/kenenisabeyan/followflow'
  },
  {
    name: 'Performance-Evaluator',
    desc: 'Full-stack employee evaluation dashboard built with Next.js 15+ App Router, MongoDB and NextAuth.',
    tech: ['Next.js', 'MongoDB', 'NextAuth', 'Tailwind'],
    link: 'https://github.com/kenenisabeyan/Performance-Evaluator'
  }
]

import { usePortfolioData } from '../context/PortfolioContext'

const EngineeringActivity: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const activityContent = data?.sectionContent?.['github-activity'] || {}

  if (visibility['github-activity'] === false) return null

  const displayRepos = (activityContent.repos?.length ? activityContent.repos : featuredRepos).map((r: any) => ({
    ...r,
    tech: Array.isArray(r.tech) ? r.tech : (typeof r.tech === 'string' ? r.tech.split(',').map((s: string) => s.trim()) : [])
  }))

  return (
    <section id="github-activity" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Open Source & Code</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {activityContent.heading || 'Engineering Activity'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mt-2">
            {activityContent.subheading || 'Explore my repositories, code structure, and development commits on GitHub.'}
          </p>
        </div>

        {/* Featured Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {displayRepos.map((repo: any, idx: number) => (
            <a 
              key={idx}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] border-l-cyan-500 border-t-cyan-500 border-l-[6px] border-t-[6px] rounded-[2rem] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(34,211,238,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                    <FaCodeBranch className="text-cyan-400" />
                    <span>{repo.name}</span>
                  </div>
                  <FaExternalLinkAlt className="text-gray-400 group-hover:text-white transition-colors" size={14} />
                </div>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-6">
                  {repo.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {repo.tech.map((t, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* GitHub CTA Banner */}
        <div className="flex justify-center">
          <a
            href="https://github.com/kenenisabeyan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-cyan-500 text-white dark:text-black border border-transparent rounded-full font-bold dark:font-black text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-[#030610] dark:hover:text-cyan-50 dark:hover:border-cyan-400/50 transition-all shadow-md dark:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:-translate-y-1"
          >
            <FaGithub size={22} />
            <span>Explore Full GitHub Profile</span>
          </a>
        </div>

      </div>
    </section>
  )
}

export default EngineeringActivity
