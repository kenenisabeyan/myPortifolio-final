import React from 'react'

const coreValues = [
  { 
    title: 'Architectural Design', 
    description: 'I design and build modern, scalable web applications with clean interfaces and smooth user experiences. I focus on performance, accessibility, and writing maintainable code.' 
  },
  { 
    title: 'Collaborative Growth', 
    description: 'I work on real projects and continuously improve by learning, building, and refining my skills. I focus on creating practical solutions that solve real problems and deliver value to users.' 
  },
  { 
    title: 'Continuous Progress', 
    description: 'I build consistently, improve my development speed, and focus on delivering high-quality applications. My goal is to create reliable, user-centered systems without compromising performance or design.' 
  },
]

const Stats = () => {
  const topBars = [
    'from-cyan-400 via-teal-300 to-transparent',
    'from-blue-400 via-indigo-300 to-transparent',
    'from-purple-400 via-pink-300 to-transparent'
  ]

  return (
    <section className="py-20 px-4 md:px-10 lg:px-16 relative z-10 border-t border-white/[0.05] bg-[#030610]">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {coreValues.map((val, idx) => (
          <div 
            key={idx} 
            className="group relative bg-gradient-to-b from-[#0c162d]/90 via-[#070e1c]/95 to-[#040814]/98 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/[0.1] hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-center overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(34,211,238,0.15)] hover:-translate-y-2 cursor-default"
          >
            {/* Cyberpunk HUD Corner Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors pointer-events-none" />

            {/* Glowing Accent Top Bar */}
            <div className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${topBars[idx % topBars.length]} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <h3 className="relative z-10 text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-4 group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-500 drop-shadow-md">
              {val.title}
            </h3>
            <p className="relative z-10 text-slate-300 font-light leading-relaxed text-sm md:text-base">
              {val.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats