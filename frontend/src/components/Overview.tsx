import React, { useState } from 'react'
import { 
  HiOutlineLightBulb, 
  HiOutlineUsers, 
  HiOutlineSparkles, 
  HiOutlineServer,
  HiOutlineDatabase,
  HiOutlineCode,
  HiOutlineCheckCircle
} from 'react-icons/hi'
import homePageImg from '../assets/home-page.png'
import kenooTransparentImg from '../assets/kenoo_transparent.png'
import kenoogImg from '../assets/kenoog.png'
import kenooImg from '../assets/kenoo.png'
import { usePortfolioData } from '../context/PortfolioContext'

const defaultPillars = [
  {
    key: 'architecture',
    title: 'Architectural Design',
    subtitle: 'SYSTEM DESIGN & CLEAN UX',
    badge: '01 // ARCHITECTURE',
    description: 'I design and build modern, scalable web applications with clean interfaces, intuitive user experiences, resilient data schemas, and clean architectural patterns.',
    tags: ['ScalableArchitecture', 'CleanCode', 'UXPerformance'],
    accentColor: 'cyan',
    borderColor: 'border-cyan-400/80 shadow-[0_0_40px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/50',
    topBarGradient: 'from-cyan-400 via-teal-300 to-transparent',
    icon: <HiOutlineLightBulb size={28} />,
  },
  {
    key: 'collab',
    title: 'Collaborative Growth',
    subtitle: 'CROSS-FUNCTIONAL & PRODUCT IMPACT',
    badge: '02 // COLLABORATION',
    description: 'I work effectively in engineering teams, continuously improving through feedback, structured code reviews, active problem-solving, and delivering user-focused value.',
    tags: ['CrossFunctional', 'CodeReview', 'AgileMindset'],
    accentColor: 'blue',
    borderColor: 'border-blue-400/80 shadow-[0_0_40px_rgba(59,130,246,0.25)] ring-1 ring-blue-400/50',
    topBarGradient: 'from-blue-400 via-indigo-300 to-transparent',
    icon: <HiOutlineUsers size={28} />,
  },
  {
    key: 'velocity',
    title: 'Continuous Progress',
    subtitle: 'HIGH VELOCITY & QUALITY ASSURANCE',
    badge: '03 // VELOCITY',
    description: 'I build consistently with high development velocity, maintaining rigorous quality standards, automated testing, performance optimizations, and zero compromise on reliability.',
    tags: ['HighVelocity', 'AutomatedPipelines', 'ZeroDowntime'],
    accentColor: 'purple',
    borderColor: 'border-purple-400/80 shadow-[0_0_40px_rgba(168,85,247,0.25)] ring-1 ring-purple-400/50',
    topBarGradient: 'from-purple-400 via-pink-300 to-transparent',
    icon: <HiOutlineSparkles size={28} />,
  },
]

const Overview = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const overviewContent = data?.sectionContent?.overview || {}

  const [activeTab, setActiveTab] = useState<number>(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 14, y: -y * 14 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  if (visibility.overview === false) return null

  const headingPrimary = overviewContent.headingPrimary || 'FULL-STACK'
  const headingSecondary = overviewContent.headingSecondary || 'SOFTWARE ENGINEER'
  const combinedParagraph = overviewContent.paragraphCombined || 
    "I am a Full-Stack Software Engineer and Computer Science & Engineering student at ASTU. My development philosophy revolves around clean architecture, end-to-end data integrity, and high-performance user interfaces. From designing relational database schemas in PostgreSQL and MongoDB to crafting responsive frontends in React and Next.js, I take full ownership of the digital product lifecycle. As the founder of EDOT, an evolving education technology platform, I’m actively designing solutions that modernize digital learning through intelligent system design, automation, and user-centered experiences. I don’t believe in template-based code — every architecture I craft is engineered for performance, modularity, security, and measurable business impact."

  const pillarsToRender = (overviewContent.pillars?.length ? overviewContent.pillars : defaultPillars).map((p: any, idx: number) => {
    const fallback = defaultPillars[idx % defaultPillars.length]
    return {
      title: p.title || fallback.title,
      subtitle: p.subtitle || fallback.subtitle,
      badge: p.badge || fallback.badge,
      description: p.description || p.desc || fallback.description,
      tags: Array.isArray(p.tags)
        ? p.tags
        : typeof p.tags === 'string'
          ? p.tags.split(',').map((t: string) => t.trim().replace(/^#/, ''))
          : fallback.tags,
      topBarGradient: fallback.topBarGradient,
      borderColor: fallback.borderColor,
      icon: fallback.icon,
      accentColor: fallback.accentColor
    }
  })

  return (
    <section id="overview" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05] overflow-hidden">
      
      {/* Background Ambient Holographic Rays */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none hidden dark:block" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none hidden dark:block" />

      <div className="max-w-[1700px] mx-auto relative z-10">
        
        {/* Top Split Layout - Inspired by Reference Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20 lg:mb-24">
          
          {/* Left Column: Interactive 3D Tilt Parallax Stage for Background + Cutout Photo */}
          <div className="lg:col-span-5 flex justify-center items-center relative [perspective:1200px]">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transformStyle: 'preserve-3d',
                transition: tilt.x === 0 ? 'transform 0.7s ease-out' : 'transform 0.1s ease-out'
              }}
              className="bg-gray-100 dark:bg-[#030610]/60 dark:backdrop-blur-lg rounded-3xl dark:rounded-[2.5rem] min-h-[460px] flex justify-center items-center relative border border-gray-200 dark:border-white/[0.08] group shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)] w-full cursor-pointer"
            >
              
              {/* Cyberpunk HUD Corner Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors pointer-events-none z-30" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors pointer-events-none z-30" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors pointer-events-none z-30" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors pointer-events-none z-30" />

              {/* Animated glowing backdrops */}
              <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] scale-150 transform opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none hidden dark:block" />

              {/* 1. ORIGINAL FULL-CLARITY BACKGROUND GRAPHIC (home-page.png - At Z=0) */}
              <div 
                className="absolute inset-0 z-0 w-full h-full flex items-center justify-center p-4"
                style={{ transform: 'translateZ(0px)' }}
              >
                <div className="absolute inset-0 bg-blue-900/15 mix-blend-overlay z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-700 hidden dark:block" />
                <img 
                  src={homePageImg} 
                  alt="Kenenisa Beyan — Full-Stack Software Engineer Overview" 
                  className="w-full h-full max-w-[520px] max-h-[520px] object-contain rounded-2xl md:rounded-3xl shadow-xl dark:shadow-[0_0_30px_rgba(59,130,246,0.3)] transform transition-transform duration-1000 group-hover:scale-[1.03]"
                />
              </div>

              {/* 2. OVERLAID 3D SUBJECT PHOTO (Maximum Overall Visibility & Scale) */}
              <div 
                className="relative z-10 w-full max-w-[460px] flex flex-col items-center justify-end min-h-[460px] pt-2"
                style={{ transform: 'translateZ(45px)', transformStyle: 'preserve-3d' }}
              >
                
                {/* Back Arc of Neon Circle (z-0 behind photo) */}
                <div 
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[88%] h-24 rounded-[100%] border-[4px] border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.9),inset_0_0_20px_rgba(34,211,238,0.6)] z-0 pointer-events-none group-hover:border-cyan-300 group-hover:shadow-[0_0_55px_rgba(34,211,238,1)] transition-all duration-500"
                  style={{ clipPath: 'inset(0 0 50% 0)' }}
                />

                {/* 3D Floating Rim Glow behind subject shoulders */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-56 h-56 bg-cyan-400/25 blur-[55px] rounded-full pointer-events-none -z-10 animate-pulse" />

                {/* Transparent Cutout Photo (Maximum Overall Visibility, Scale, & High Contrast Pop) */}
                <img 
                  src={kenooTransparentImg} 
                  alt="Kenenisa Beyan — Full-Stack Software Engineer" 
                  className="w-full max-h-[500px] object-contain relative z-10 filter brightness-[1.06] contrast-[1.05] saturate-[1.05] drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_25px_rgba(34,211,238,0.5)] transform scale-105 group-hover:scale-110 transition-transform duration-500"
                />

                {/* Front Arc of Neon Circle (z-20 in front of photo for 3D Overlap) */}
                <div 
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[88%] h-24 rounded-[100%] border-[4px] border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.9),inset_0_0_20px_rgba(34,211,238,0.6)] z-20 pointer-events-none group-hover:border-cyan-300 group-hover:shadow-[0_0_55px_rgba(34,211,238,1)] transition-all duration-500"
                  style={{ clipPath: 'inset(50% 0 0 0)' }}
                />

              </div>

            </div>
          </div>

          {/* Right Column (Title, Combined Paragraph, CTA Button) - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">
            
            {/* Small High-Impact Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white mb-4 leading-snug">
              {headingPrimary} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">{headingSecondary}</span>
            </h2>

            {/* Single Unified Continuous Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl">
              {combinedParagraph}
            </p>

            {/* Vibrant CTA Button (Matching Reference Screenshot) */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold uppercase tracking-wider text-xs md:text-sm px-8 py-3.5 rounded-lg shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Learn More
              </a>
              <a 
                href="#work" 
                className="inline-flex items-center justify-center bg-white/[0.05] hover:bg-white/10 text-white border border-white/20 font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-3.5 rounded-lg backdrop-blur-md transition-all duration-300"
              >
                View Deployments
              </a>
            </div>

            {/* Micro Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 w-full mt-10 pt-6 border-t border-white/10">
              <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-left">
                <div className="text-[11px] font-mono text-cyan-400 uppercase font-bold">Architecture</div>
                <div className="text-sm font-semibold text-white mt-0.5">Clean &amp; Modular</div>
              </div>
              <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-left">
                <div className="text-[11px] font-mono text-blue-400 uppercase font-bold">Delivery</div>
                <div className="text-sm font-semibold text-white mt-0.5">Production-Ready</div>
              </div>
              <div className="bg-white/[0.03] border border-white/10 p-3.5 rounded-xl text-left">
                <div className="text-[11px] font-mono text-purple-400 uppercase font-bold">Execution</div>
                <div className="text-sm font-semibold text-white mt-0.5">Full-Stack Scope</div>
              </div>
            </div>

          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* PREMIER MASTER CARDS SECTION (DYNAMIC ARCHITECTURE PILLARS) */}
        {/* ---------------------------------------------------- */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold mb-1">
              ENGINEERING PILLARS
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Master Execution Standards
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400">
            [ MANAGED VIA ADMIN DASHBOARD ]
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pillarsToRender.map((item: any, idx: number) => {
            const isSelected = activeTab === idx

            return (
              <div 
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`group relative bg-gradient-to-b from-[#0c1833]/90 via-[#070f23]/95 to-[#040816]/98 rounded-3xl p-7 border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? item.borderColor
                    : 'border-white/10 hover:border-cyan-400/50 hover:shadow-[0_15px_40px_rgba(34,211,238,0.15)]'
                }`}
              >
                {/* Corner Sci-Fi Bracket SVGs */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />

                {/* Glowing Accent Top Bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.topBarGradient}`} />

                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest mb-4 font-semibold">
                    {item.subtitle}
                  </p>

                  <p className="text-sm font-normal leading-relaxed text-slate-300 mb-6">
                    {item.description}
                  </p>

                  {/* TELEMETRY VISUAL FOR CARDS */}
                  {idx === 0 && (
                    <div className="bg-[#030712] border border-cyan-500/20 rounded-2xl p-4 mb-6 relative overflow-hidden">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>SYSTEM DATA FLOW</span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center relative z-10">
                        <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col items-center">
                          <HiOutlineCode className="text-cyan-400 mb-1" size={18} />
                          <span className="text-[10px] font-mono font-bold text-white">Client UI</span>
                          <span className="text-[9px] font-mono text-slate-400">React / TS</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/30 flex flex-col items-center relative">
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-cyan-400 animate-pulse font-mono text-xs">➔</div>
                          <HiOutlineServer className="text-blue-400 mb-1" size={18} />
                          <span className="text-[10px] font-mono font-bold text-white">API Engine</span>
                          <span className="text-[9px] font-mono text-slate-400">Node / REST</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col items-center relative">
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-blue-400 animate-pulse font-mono text-xs">➔</div>
                          <HiOutlineDatabase className="text-indigo-400 mb-1" size={18} />
                          <span className="text-[10px] font-mono font-bold text-white">Database</span>
                          <span className="text-[9px] font-mono text-slate-400">PG / Mongo</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {idx === 1 && (
                    <div className="bg-[#030712] border border-blue-500/20 rounded-2xl p-4 mb-6 relative overflow-hidden">
                      <div className="text-[10px] font-mono text-blue-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>TEAM COLLABORATION STATUS</span>
                        <span className="text-blue-300 font-bold">100% SYNC</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-950/20 border border-blue-500/20 p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-mono font-bold text-xs">
                            GIT
                          </div>
                          <div>
                            <div className="text-xs font-mono font-bold text-white">Structured Pull Requests</div>
                            <div className="text-[10px] font-mono text-slate-400">Clean Commits &amp; Documentation</div>
                          </div>
                        </div>
                        <HiOutlineCheckCircle className="text-emerald-400 shrink-0" size={20} />
                      </div>
                    </div>
                  )}

                  {idx === 2 && (
                    <div className="bg-[#030712] border border-purple-500/20 rounded-2xl p-4 mb-6 relative overflow-hidden">
                      <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>CI/CD PIPELINE STATUS</span>
                        <span className="text-emerald-400 font-bold">100% VERIFIED</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                          <span>BUILD ➔ TEST ➔ SHIP</span>
                          <span className="text-purple-300 font-bold">PASSED</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-purple-950/60 overflow-hidden p-0.5 border border-purple-500/30">
                          <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {item.tags.map((tag: string, tagIdx: number) => (
                    <span key={tagIdx} className="text-[11px] font-mono text-cyan-200 bg-cyan-950/50 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Overview
