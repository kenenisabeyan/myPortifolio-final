import React from 'react'
import ExpandableText from './ExpandableText'
import { HiOutlineLightBulb, HiOutlineUsers, HiOutlineSparkles } from 'react-icons/hi'
import homePageImg from '../assets/home-page.png'

const stats = [
  {
    title: 'Architectural Design',
    description: 'I design and build modern, scalable web applications with clean interfaces and smooth user experiences. I focus on performance, accessibility, and writing maintainable code.',
    icon: <HiOutlineLightBulb size={38} className="text-cyan-400 group-hover:rotate-12 transition-transform duration-500" />,
    glowColor: 'cyan',
    borderColor: 'border-l-cyan-500 border-t-cyan-500'
  },
  {
    title: 'Collaborative Growth',
    description: 'I work on real projects and continuously improve by learning, building, and refining my skills. I focus on creating practical solutions that solve real problems and deliver value to users.',
    icon: <HiOutlineUsers size={38} className="text-blue-400 group-hover:-rotate-12 transition-transform duration-500" />,
    glowColor: 'blue',
    borderColor: 'border-l-blue-500 border-t-blue-500'
  },
  {
    title: 'Continuous Progress',
    description: 'I build consistently, improve my development speed, and focus on delivering high-quality applications. My goal is to create reliable, user-centered systems without compromising performance or design.',
    icon: <HiOutlineSparkles size={38} className="text-indigo-400 group-hover:scale-110 transition-transform duration-500" />,
    glowColor: 'indigo',
    borderColor: 'border-l-indigo-500 border-t-indigo-500'
  },
]

const Overview = () => {
  return (
    <section id="overview" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-gray-50 dark:bg-transparent dark:border-t dark:border-white/[0.05]">
      
      {/* Subtle overlay gradients for contrast (Dark Mode Only) */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none hidden dark:block" />

      <div className="max-w-[1700px] mx-auto relative z-10">
        
        {/* Top Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch mb-20 lg:mb-24">
          
          {/* Left: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 transition-all duration-500 h-full">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 py-2.5 px-6 rounded-full mb-8 dark:border dark:border-cyan-500/20 dark:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-colors hover:dark:bg-cyan-900/50 w-max mx-auto lg:mx-0">
              <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
              <span className="text-lg font-medium text-gray-500 uppercase dark:text-cyan-100 dark:tracking-widest">About Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-6">
              Who I <span className="text-cyan-400">Am</span>
            </h2>
            <div className="flex flex-col justify-between h-full text-base md:text-xl font-normal leading-relaxed text-gray-600 dark:text-cyan-50/90 space-y-6 dark:bg-[#030610]/60 lg:dark:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none lg:backdrop-blur-none backdrop-blur-md font-medium">
              <ExpandableText
                text="I’m Kenenisa Beyan, a Full-Stack Software Engineer focused on building scalable, production-grade digital platforms that solve real business problems. My work combines modern software engineering with strategic thinking to create systems that are not only functional, but reliable, maintainable, and built for growth."
                maxLength={150}
                className="leading-relaxed"
              />
              <ExpandableText
                text="With academic foundations in Computer Science and Management, I approach development beyond code analyzing workflows, optimizing user experiences, and engineering architectures that support long-term scalability and operational efficiency."
                maxLength={150}
                className="leading-relaxed"
              />
              <ExpandableText
                text="As the founder of EDOT, an evolving education technology platform, I’m actively designing solutions that modernize digital learning through intelligent system design, automation, and user-centered experiences. From backend architecture to frontend performance, I build with a strong focus on clean engineering standards, scalability, and real-world impact."
                maxLength={150}
                className="leading-relaxed"
              />
              <ExpandableText
                text="I don’t believe in building template-based products. I focus on engineering digital systems that are fast, scalable, business-driven, and ready for production environments."
                maxLength={150}
                className="leading-relaxed"
              />
            </div>
          </div>

          {/* Right: Graphic */}
          <div className="bg-gray-100 dark:bg-[#030610]/60 dark:backdrop-blur-lg rounded-3xl dark:rounded-[2.5rem] min-h-[460px] flex justify-center items-center relative overflow-hidden border border-gray-200 dark:border-white/[0.05] group shadow-sm dark:shadow-2xl transition-all duration-300 transform w-full">
            {/* Animated glowing backdrops */}
            <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] scale-150 transform opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none hidden dark:block" />
            
            <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center p-6 md:p-10">
               {/* Vignette overly to blend the image into the sci-fi theme */}
               <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-20 pointer-events-none group-hover:bg-transparent transition-colors duration-700 hidden dark:block"></div>
               <img 
                 src={homePageImg} 
                 alt="Kenenisa Beyan — Full-Stack Software Engineer Overview" 
                 className="w-full h-full max-w-[520px] max-h-[520px] object-contain rounded-2xl md:rounded-3xl shadow-xl dark:shadow-[0_0_30px_rgba(59,130,246,0.3)] transform transition-transform duration-1000 group-hover:scale-[1.05] dark:group-hover:scale-110 relative z-10"
               />
            </div>
          </div>

        </div>

        {/* Feature Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((item) => (
            <div 
              key={item.title} 
              className={`group relative bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] ${item.borderColor} border-l-[6px] border-t-[6px] rounded-[2rem] p-8 overflow-hidden transform hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(2,12,46,0.45)] transition-all duration-300 backdrop-blur-xl`}
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-10 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
               
              <div className="relative z-10 flex flex-col h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 dark:bg-white/5 mb-6 border border-white/10">
                  {item.icon}
                </div>
                
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base font-normal leading-relaxed text-gray-300 flex-grow">
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
