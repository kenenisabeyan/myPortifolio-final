import React from 'react'
import { HiOutlineLightBulb, HiOutlineUsers, HiOutlineSparkles } from 'react-icons/hi'
import homePageImg from '../assets/home-page.png'

const stats = [
  {
    title: 'Architectural Design',
    description: 'I design and build modern, scalable web applications with clean interfaces and smooth user experiences. I focus on performance, accessibility, and writing maintainable code.',
    icon: <HiOutlineLightBulb size={38} className="text-cyan-400 group-hover:rotate-12 transition-transform duration-500" />,
    glowColor: 'cyan'
  },
  {
    title: 'Collaborative Growth',
    description: 'I work on real projects and continuously improve by learning, building, and refining my skills. I focus on creating practical solutions that solve real problems and deliver value to users.',
    icon: <HiOutlineUsers size={38} className="text-blue-400 group-hover:-rotate-12 transition-transform duration-500" />,
    glowColor: 'blue'
  },
  {
    title: 'Continuous Progress',
    description: 'I build consistently, improve my development speed, and focus on delivering high-quality applications. My goal is to create reliable, user-centered systems without compromising performance or design.',
    icon: <HiOutlineSparkles size={38} className="text-indigo-400 group-hover:scale-110 transition-transform duration-500" />,
    glowColor: 'indigo'
  },
]

const Overview = () => {
  return (
    <section id="overview" className="py-16 md:py-24 px-6 relative z-10 bg-gray-50 dark:bg-transparent dark:border-t dark:border-white/[0.05]">
      
      {/* Subtle overlay gradients for contrast (Dark Mode Only) */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-24">
          
          {/* Left: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 transition-all duration-500">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 py-2.5 px-6 rounded-full mb-8 dark:border dark:border-cyan-500/20 dark:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-colors hover:dark:bg-cyan-900/50 w-max mx-auto lg:mx-0">
              <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
              <span className="text-lg font-medium text-gray-500 uppercase dark:text-cyan-100 dark:tracking-widest">About Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-6">
              Who I <span className="text-cyan-400">Am</span>
            </h2>
            <div className="text-base md:text-xl font-normal leading-relaxed text-gray-600 dark:text-cyan-50/90 space-y-6 dark:bg-[#030610]/60 lg:dark:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none lg:backdrop-blur-none backdrop-blur-md font-medium">
              <p>
                I engineer end-to-end web applications that fuse technical precision with strategic business logic. With a foundation in Computer Science and Management, my goal is to design scalable workflows rather than just write code.
              </p>
              <p>
                From building automated management systems to evolving digital learning through my startup, <strong className="text-white">EDOT</strong>, I thrive on solving real-world challenges through clean architecture and innovative system design.
              </p>
            </div>
          </div>

          {/* Right: Graphic */}
          <div className="bg-gray-100 dark:bg-[#030610]/60 dark:backdrop-blur-lg rounded-3xl dark:rounded-[2.5rem] min-h-[400px] flex justify-center items-center relative overflow-hidden border border-gray-200 dark:border-white/[0.05] group shadow-sm dark:shadow-2xl transition-all duration-300 transform w-full">
            {/* Animated glowing backdrops */}
            <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] scale-150 transform opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none hidden dark:block" />
            
            <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center p-6 md:p-10">
               {/* Vignette overly to blend the image into the sci-fi theme */}
               <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-20 pointer-events-none group-hover:bg-transparent transition-colors duration-700 hidden dark:block"></div>
               <img 
                 src={homePageImg} 
                 alt="About Me Graphic" 
                 className="max-w-full max-h-full object-contain rounded-2xl md:rounded-3xl shadow-xl dark:shadow-[0_0_30px_rgba(59,130,246,0.3)] transform transition-transform duration-1000 group-hover:scale-[1.05] dark:group-hover:scale-110 relative z-10"
               />
            </div>
          </div>

        </div>

        {/* Feature Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((item) => (
            <div 
              key={item.title} 
              className={`group relative bg-white dark:bg-[#050A14]/80 border border-gray-100 dark:border-white/[0.05] dark:hover:border-${item.glowColor}-500/40 rounded-2xl p-8 overflow-hidden transform hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 dark:backdrop-blur-xl`}
            >
               {/* Dark mode only edge glow */}
               <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.glowColor}-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden dark:block`} />
               
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 dark:bg-black/20 mb-6 border border-gray-100 dark:border-${item.glowColor}-500/20`}>
                  {item.icon}
                </div>
                
                {/* Typography */}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base font-normal leading-relaxed text-gray-600 dark:text-gray-400 flex-grow">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}

export default Overview
