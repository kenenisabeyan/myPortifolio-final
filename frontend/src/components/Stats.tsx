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
  return (
    <section className="py-20 px-6 relative z-10 border-t border-white/[0.05] bg-[#030610]">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {coreValues.map((val, idx) => (
          <div key={idx} className="group relative bg-[#050A14]/80 backdrop-blur-xl hover:bg-[#080d1a]/90 p-10 rounded-[2rem] border border-white/[0.05] hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-center overflow-hidden hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:-translate-y-2 cursor-default">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="relative z-10 text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-500 drop-shadow-md">{val.title}</h3>
            <p className="relative z-10 text-gray-400 font-light leading-relaxed">{val.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats