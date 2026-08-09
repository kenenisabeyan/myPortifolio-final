import React, { useEffect, useRef } from 'react'

const educationData = [
  {
    title: 'CSE Student',
    university: 'Adama Science & Technology University',
    date: '2023 – Present',
    details: [
      'Currently pursuing a specialized degree in Computer Science and Engineering, focusing on advanced software architecture and full-stack development.',
    ],
    nodeColor: 'bg-cyan-500',
    borderColor: 'border-l-cyan-500 border-t-cyan-500'
  },
  {
    title: 'Management (Weekend Program)',
    university: 'Arsi University',
    date: '2024 – Present',
    details: [
      'Developing strategic management and organizational leadership skills through a rigorous weekend curriculum to complement technical expertise with business acumen.',
    ],
    nodeColor: 'bg-purple-500',
    borderColor: 'border-l-purple-500 border-t-purple-500'
  },
  {
    title: 'Entrepreneurship & Startup Innovation Fellow',
    university: 'MinT (Ministry of Innovation & Technology)',
    date: 'Feb 2025',
    details: [
      'Successfully completed the Early-Stage Startup Training Program in partnership with MinT, KOICA, and OSTA.',
      'Strategic Impact: Developed the EDOT Platform with a focus on transforming local creative ideas into scalable, product-ready services. Recognized for excellence in a competitive cohort of innovators aimed at driving national economic development and reducing technological reliance through local innovation.',
    ],
    nodeColor: 'bg-blue-500',
    borderColor: 'border-l-blue-500 border-t-blue-500'
  }
]

const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="transition-all duration-1000 transform opacity-0 translate-y-12 ease-out w-full">
      {children}
    </div>
  );
};

import { usePortfolioData } from '../context/PortfolioContext'

const staticEducationData = educationData

const Education = () => {
  const [lineHeight, setLineHeight] = React.useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}

  if (visibility.education === false) return null

  const displayEducation = data?.education?.length ? data.education.map(e => ({
    title: e.program || e.title,
    university: e.institution || e.university,
    date: e.period || e.date,
    details: [e.description],
    nodeColor: 'bg-cyan-500',
    borderColor: 'border-l-cyan-500 border-t-cyan-500'
  })) : staticEducationData

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      const totalHeight = rect.height
      const visibleTop = Math.max(0, windowHeight * 0.7 - rect.top)
      const progress = Math.min(1, Math.max(0, visibleTop / totalHeight))
      
      setLineHeight(progress * 100)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section id="education" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-white dark:bg-transparent transition-colors duration-500">
      
      <div className="max-w-[1700px] mx-auto flex flex-col items-center relative z-10">
        
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-6">
            <span className="text-cyan-400">Education</span>
          </h2>
        </div>

        <div ref={containerRef} className="relative w-full max-w-[1700px] mx-auto">
          {/* Vertical Center Line (Base Track) */}
          <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[4px] rounded-full z-[0] bg-gray-200 dark:bg-[#030610]/80 dark:border dark:border-white/[0.05] shadow-sm"></div>

          {/* Active Moving colored Progress Line */}
          <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[6px] rounded-full z-[0] pointer-events-none">
            <div 
              className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-75 ease-out"
              style={{ height: `${lineHeight}%` }}
            >
              {/* Sharp glowing tip at the leading edge (bottom) */}
              {lineHeight > 0 && lineHeight < 99 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[3px] w-[10px] h-[10px] rotate-45 bg-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)] z-[30] transition-all duration-75 ease-out" />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-12 md:gap-20">
            {displayEducation.map((ed, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <RevealOnScroll key={idx}>
                  <div className={`relative flex flex-col md:flex-row items-center w-full z-10 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    
                    {/* Detail Container (Left or Right depending on Even/Odd) */}
                    <div className={`w-full md:w-1/2 flex justify-start pl-20 md:pl-0 mt-6 md:mt-0 ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
                      <div className={`bg-[#07101f]/90 dark:bg-[#020817]/95 p-8 rounded-[2rem] border border-white/[0.08] ${ed.borderColor} border-l-[6px] border-t-[6px] w-full max-w-[680px] shadow-[0_20px_80px_rgba(0,0,0,0.24)] transition-all duration-300 relative group overflow-hidden backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_25px_90px_rgba(8,145,255,0.24)]`}>
                        
                        <div className="hidden dark:block absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-20 group-hover:opacity-70 transition-opacity duration-500" />
                        
                        <ul className="space-y-4 relative z-10">
                          {ed.details.map((item, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed group/item">
                              <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-blue-300 dark:bg-cyan-500/50 rounded-full flex-shrink-0 group-hover/item:bg-blue-500 dark:group-hover/item:bg-cyan-400 transition-colors duration-300"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Center Node Icon */}
                    <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-[20] top-8 md:top-1/2 md:-translate-y-1/2">
                      <div className={`w-6 h-6 rounded-full ${ed.nodeColor} border-4 border-white dark:border-[#050A14]`} style={{ boxShadow: '0 0 15px rgba(34,211,238,0.3)' }}></div>
                    </div>

                    {/* Title & Info Container (Opposite of Detail Container) */}
                    <div className={`w-full md:w-1/2 flex flex-col justify-start pl-20 md:pl-0 mt-2 md:mt-0 ${isEven ? 'md:pl-12 md:items-start text-left' : 'md:pr-12 md:items-end md:text-right'}`}>
                      <div className={`flex flex-col w-full max-w-[680px] ${isEven ? 'items-start' : 'md:items-end'}`}>
                        <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-cyan-300 rounded-full text-xs font-bold mb-3 border border-blue-100 dark:border-blue-500/30">
                          {ed.date}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{ed.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-[#00A8E8] dark:text-cyan-400 font-medium">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 7L12 12L21 7.90909V14.5H23V7L12 2ZM20 10.1818L12 13.8182L3 9.72727V16.5C3 18.9853 7.02944 21 12 21C16.9706 21 21 18.9853 21 16.5V10.1818ZM12 19C8.68629 19 6 17.6569 6 16V11.0909L12 13.8182L18 11.0909V16C18 17.6569 15.3137 19 12 19Z" /></svg>
                          {ed.university}
                        </div>
                      </div>
                    </div>

                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Education
