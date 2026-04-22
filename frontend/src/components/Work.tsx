import React from 'react'
import { SiReact, SiPython, SiNodedotjs, SiTailwindcss, SiMongodb, SiTypescript, SiJavascript, SiHtml5, SiCss, SiDocker, SiNextdotjs, SiExpress, SiDjango, SiMysql, SiPostgresql, SiCplusplus, SiGit, SiGithub, SiFastapi, SiTensorflow, SiPytorch, SiKeras, SiScikitlearn, SiSelenium, SiBootstrap, SiFramer, SiThreedotjs } from 'react-icons/si'
import { FaJava, FaServer, FaDatabase, FaTools, FaLayerGroup, FaAws, FaBrain, FaRobot, FaSyncAlt, FaMicrochip, FaNetworkWired, FaSitemap } from 'react-icons/fa'
import { projects } from '../data/data'

const categorizedTech = {
  Frontend: [
    { name: "Next.js", icon: <SiNextdotjs size={20} className="text-black dark:text-white" /> },
    { name: "React.js", icon: <SiReact size={20} className="text-[#61DAFB]" /> },
    { name: "JavaScript", icon: <SiJavascript size={20} className="text-[#F7DF1E]" /> },
    { name: "TypeScript", icon: <SiTypescript size={20} className="text-[#3178C6]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={20} className="text-[#38B2AC]" /> },
  ],
  Backend: [
    { name: "Node.js", icon: <SiNodedotjs size={20} className="text-[#339933]" /> },
    { name: "Express", icon: <SiExpress size={20} className="text-black dark:text-white" /> },
    { name: "Django", icon: <SiDjango size={20} className="text-[#092E20] dark:text-[#44B78B]" /> },
    { name: "Python", icon: <SiPython size={20} className="text-[#3776AB]" /> },
  ],
  Databases: [
    { name: "PostgreSQL", icon: <SiPostgresql size={20} className="text-[#4169E1]" /> },
    { name: "MongoDB", icon: <SiMongodb size={20} className="text-[#47A248]" /> },
    { name: "MySQL", icon: <SiMysql size={20} className="text-[#4479A1]" /> },
    { name: "AWS", icon: <FaAws size={20} className="text-[#FF9900]" /> },
  ],
  DevTools: [
    { name: "Git", icon: <SiGit size={20} className="text-[#F05032]" /> },
    { name: "REST APIs", icon: <FaNetworkWired size={20} className="text-gray-500" /> },
    { name: "NextAuth", icon: <SiNextdotjs size={20} className="text-black dark:text-white" /> },
    { name: "Framer Motion", icon: <SiFramer size={20} className="text-[#0055FF]" /> },
    { name: "Docker", icon: <SiDocker size={20} className="text-[#2496ED]" /> },
  ],
}

const categoriesInfo = [
  { name: "Frontend Development", id: "Frontend", icon: <FaLayerGroup size={22} />, cornerColor: "bg-blue-500/20" },
  { name: "Backend Development", id: "Backend", icon: <FaServer size={22} />, cornerColor: "bg-purple-500/20" },
  { name: "Database & Cloud", id: "Databases", icon: <FaDatabase size={22} />, cornerColor: "bg-teal-500/20" },
  { name: "🛠 Tools & DevOps", id: "DevTools", icon: <FaTools size={22} />, cornerColor: "bg-orange-500/20" },
]

const highlightsTech = [
  { name: "Python", icon: <SiPython size={46} className="text-[#3776AB]" /> },
  { name: "Java", icon: <FaJava size={46} className="text-[#007396]" /> },
  { name: "Next.js", icon: <SiNextdotjs size={28} className="text-black dark:text-white" /> },
  { name: "Node.js", icon: <SiNodedotjs size={28} color="#339933" /> },
  { name: "Express", icon: <SiExpress size={28} className="text-black dark:text-white" /> },
  { name: "JavaScript", icon: <SiJavascript size={28} color="#F7DF1E" /> },
  { name: "TypeScript", icon: <SiTypescript size={28} color="#3178C6" /> },
  { name: "Django", icon: <SiDjango size={28} color="#092E20" /> },
  { name: "HTML", icon: <SiHtml5 size={28} color="#E34F26" /> },
  { name: "CSS", icon: <SiCss size={28} color="#1572B6" /> },
  { name: "Bootstrap", icon: <SiBootstrap size={28} color="#7952B3" /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={28} color="#4169E1" /> },
  { name: "MongoDB", icon: <SiMongodb size={28} color="#47A248" /> },
  { name: "MySQL", icon: <SiMysql size={28} color="#4479A1" /> },
  { name: "GIT", icon: <SiGit size={28} color="#F05032" /> },
  { name: "GITHUB", icon: <SiGithub size={28} className="text-black dark:text-white" /> },
  { name: "React", icon: <SiReact size={32} color="#61DAFB" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={32} color="#38B2AC" /> },
  { name: "Three.js", icon: <SiThreedotjs size={32} className="text-black dark:text-white" /> },
  { name: "Algorithms", icon: <FaSitemap size={32} color="#44B78B" /> },
  { name: "Data Structures", icon: <FaLayerGroup size={32} color="#F05032" /> },
  { name: "C++", icon: <SiCplusplus size={32} color="#00599C" /> },
]

const Work = () => {
  return (
    <>
    <section id="skills" className="py-16 md:py-24 px-6 relative z-10 bg-white dark:bg-transparent">
      
      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        
        {/* Core Tech Header */}
        <div className="w-full flex justify-center items-center gap-4 mb-16 flex-wrap">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/30 bg-[#EAF7FD] dark:bg-blue-900/20 text-[#00A8E8] dark:text-cyan-300 text-xs font-bold uppercase tracking-widest shadow-sm">
            MY EXPERTISE
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
             <span className="text-cyan-400">Technical</span> Skills
          </h2>
        </div>

        {/* Core Tech Categorized Sections - Vertical Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-24 w-full items-stretch">
          
          {categoriesInfo.map((cat, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col bg-white dark:bg-[#050A14]/80 rounded-[1.5rem] border border-gray-100 dark:border-white/5 p-6 md:p-8 shadow-sm relative transition-all duration-300 h-full overflow-hidden hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] dark:backdrop-blur-xl"
            >
              {/* Corner Blob */}
              <div className={`absolute top-[-30px] right-[-30px] w-28 h-28 ${cat.cornerColor} rounded-full opacity-50 dark:opacity-100`} />

              {/* Title & Icon Header */}
              <div className="relative z-10 flex flex-col items-start mb-6 mt-2">
                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-[#F6F8FA] dark:bg-white/5 mb-6 text-gray-800 dark:text-gray-200 shadow-sm transition-colors duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-[20px] lg:text-[22px] font-bold text-white leading-snug">
                   {cat.name}
                </h3>
              </div>

              {/* List */}
              <div className="relative z-10 flex flex-col gap-4">
                {categorizedTech[cat.id]?.map((item, i) => (
                   <div key={i} className="flex items-center gap-4">
                     <div className="w-[42px] h-[42px] shrink-0 rounded-[12px] border border-gray-100 dark:border-white/10 flex items-center justify-center bg-white dark:bg-black/20 shadow-sm transition-colors duration-300 text-gray-600 dark:text-gray-400">
                        {item.icon}
                     </div>
                     <span className="text-[15px] font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        {item.name}
                     </span>
                   </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Tech stack Highlights Header */}
        <div className="w-full text-center flex flex-col items-center mb-10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
            Tech-stack Highlights
          </h3>
        </div>
        
        {/* Infinite Marquee Highlights Grid - Multi-row Parallel */}
        <div className="w-full flex justify-center overflow-hidden relative z-10 mb-16 px-4">
          <div className="flex flex-col gap-6">
            <div className="animate-marquee-left hover:animation-play-state-paused w-max flex items-center">
              {[0, 1, 2].map(iteration => (
                 <div key={`r1-${iteration}`} className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
                   {highlightsTech.slice(0, Math.ceil(highlightsTech.length / 2)).map((item, idx) => (
                     <div 
                       key={`${iteration}-${idx}`} 
                       className="flex flex-col items-center justify-center p-4 w-[110px] sm:w-[130px] h-[110px] sm:h-[130px] bg-[#050A14] border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 shadow-2xl flex-shrink-0 group"
                     >
                       <div className="mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-1 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                         {item.icon}
                       </div>
                       <span className="text-[13px] text-gray-300 font-medium tracking-wide text-center group-hover:text-white transition-colors">
                         {item.name}
                       </span>
                     </div>
                   ))}
                 </div>
              ))}
            </div>

            <div className="animate-marquee-right hover:animation-play-state-paused w-max flex items-center">
              {[0, 1, 2].map(iteration => (
                 <div key={`r2-${iteration}`} className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
                   {highlightsTech.slice(Math.ceil(highlightsTech.length / 2)).map((item, idx) => (
                     <div 
                       key={`${iteration}-${idx}`} 
                       className="flex flex-col items-center justify-center p-4 w-[110px] sm:w-[130px] h-[110px] sm:h-[130px] bg-[#050A14] border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 shadow-2xl flex-shrink-0 group"
                     >
                       <div className="mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex-1 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                         {item.icon}
                       </div>
                       <span className="text-[13px] text-gray-300 font-medium tracking-wide text-center group-hover:text-white transition-colors">
                         {item.name}
                       </span>
                     </div>
                   ))}
                 </div>
              ))}
            </div>
          </div>
        </div>

        {/* Let's Discuss Your Project Button */}
        <div className="w-full flex justify-center mb-24 relative z-10">
           <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 dark:bg-cyan-500 text-white dark:text-black border border-transparent dark:border-transparent rounded-xl font-bold dark:font-black text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-[#030610] dark:hover:text-cyan-50 dark:hover:border-cyan-400/50 transition-colors shadow-md dark:shadow-[0_0_20px_rgba(34,211,238,0.4)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              Let's Discuss Your Project
           </button>
        </div>
      </div>
    </section>

    <section id="work" className="py-16 md:py-24 px-6 relative z-10 bg-white dark:bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        <div className="w-full">
          {/* Projects Header */}
          <div className="w-full text-center md:text-left mb-16 flex flex-col items-center md:items-start pt-24 -mt-12">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-cyan-950/30 border border-gray-200 dark:border-cyan-500/20 mb-6 shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md transition-colors hover:dark:bg-cyan-900/40">
              <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
              <span className="text-sm text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">My Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-6">
              Featured <span className="text-cyan-400">Deployments.</span>
            </h2>
            <p className="text-base md:text-lg font-normal leading-relaxed text-gray-600 dark:text-gray-400 max-w-2xl text-center md:text-left">
              The following projects showcase my ability to solve complex problems, build dynamic user interfaces, and deliver production-ready software efficiently using modern high-tech stacks.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-[#050A14]/80 rounded-2xl border border-gray-100 dark:border-white/[0.05] dark:hover:border-blue-500/40 overflow-hidden flex flex-col transform hover:-translate-y-2 hover:shadow-xl dark:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 dark:backdrop-blur-xl relative"
            >
              {/* Dark mode internal glow behind image */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden dark:block" />

              {/* Image Container */}
              <div className="relative z-10 w-full h-[200px] sm:h-[240px] overflow-hidden border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover dark:opacity-90 dark:group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"
                />
              </div>

              {/* Content Container */}
              <div className="relative z-10 p-8 sm:p-10 flex-1 flex flex-col">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white dark:group-hover:text-cyan-400 mb-4 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm md:text-base font-normal text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-6">
                  {project.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech?.map((tech, techIdx) => (
                    <span key={techIdx} className="px-4 py-1.5 bg-gray-50 border border-gray-200 dark:bg-blue-900/20 dark:border-blue-500/30 text-sm font-medium text-gray-500 dark:text-cyan-100 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Button */}
                {project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-cyan-400 font-bold uppercase tracking-widest hover:text-white transition-colors duration-300 w-max group/btn"
                  >
                    <span> See Details on my Github</span>
                    <span className="w-10 h-10 rounded-full border border-cyan-400/30 flex items-center justify-center group-hover/btn:bg-cyan-500 group-hover/btn:border-cyan-500 group-hover/btn:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
    </section>
    </>
  )
}

export default Work