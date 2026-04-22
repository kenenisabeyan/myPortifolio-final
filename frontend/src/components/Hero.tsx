import React from 'react'
import kenoImg from '../assets/keno.jpg'
import Background3D from './Background3D'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Hero = () => {
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center overflow-hidden pt-20 bg-transparent">
      <Background3D />
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left side: Original Typography integrated carefully */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left pt-6 order-2 lg:order-1 relative z-20">
          
          {/* Role Badge / Subheading */}
          <div className="mb-6">
            <span className="text-lg md:text-xl font-medium text-gray-600 dark:text-cyan-400"></span>
          </div>

          {/* Glass plate behind text for legibility over 3D backgrounds */}
          <div className="relative z-20 bg-[#030610]/60 backdrop-blur-lg p-6 sm:p-8 rounded-[2rem] border border-white/[0.05] shadow-[0_0_40px_rgba(0,0,0,1)] mb-10 w-full">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6 [text-shadow:0_4px_20px_rgba(0,0,0,1)] relative z-30">
               From concept to  <br className="hidden lg:block" />
               <span className="inline-block relative mt-2 mr-2 md:mr-3 lg:mr-0">
                 <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 opacity-40 animate-pulse"></span>
                 <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
                   Production 
                 </span>
               </span>
               <br className="hidden lg:block" />
               web apps
            </h1>
            
            {/* Subtle Bio Text */}
            <p className="text-base md:text-lg font-medium leading-relaxed text-blue-50 max-w-2xl relative z-30 [text-shadow:0_2px_10px_rgba(0,0,0,1)]">
               👋 Hello, I’m 
               <span className="inline-block relative mx-2">
                 <span className="relative text-cyan-400 font-bold">
                   Kenenisa Beyan,
                 </span>
               </span>
                a Full-Stack Software Engineer focused on building scalable, high-performance digital solutions that deliver real-world results.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 w-full">
            
            {/* Modern Cyan Call To Action Button (See My Work) */}
            <div className="relative group w-full sm:w-auto h-[60px] transform hover:-translate-y-1 transition-transform">
              {/* Ambient Base Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              <button
                onClick={scrollToWork}
                className="relative flex items-center justify-center gap-3 px-8 w-full h-full bg-gray-900 dark:bg-[#030610] text-white dark:text-cyan-50 dark:border dark:border-cyan-400/50 rounded-full font-bold dark:font-black text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-cyan-500 dark:hover:text-black dark:hover:border-transparent transition-colors overflow-hidden"
              >
                {/* Shine Sweep Effect */}
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                <span className="relative z-10 transition-colors">See My Work</span>
                <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center bg-cyan-500/10 group-hover:bg-black/10 transition-colors relative z-10">
                  <svg 
                    className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Resume Details Button */}
            <div className="relative group w-full sm:w-auto h-[60px] transform hover:-translate-y-1 transition-transform">
              {/* Ambient Base Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              <a
                href="https://drive.google.com/file/d/1sF9FXbmXPy51meMAqaVVbKpTg-qtCFLX/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center gap-3 px-8 w-full h-full bg-gray-900 dark:bg-cyan-500 text-white dark:text-black dark:border dark:border-transparent rounded-full font-bold dark:font-black text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-[#030610] dark:hover:text-cyan-50 dark:hover:border-cyan-400/50 transition-colors overflow-hidden"
              >
                {/* Shine Sweep Effect */}
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                
                <span className="relative z-10 transition-colors">Download Resume</span>
                <div className="w-8 h-8 flex items-center justify-center transition-colors relative z-10 group-hover:translate-y-1">
                  <svg 
                    className="w-5 h-5 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </a>
            </div>

          </div>

          {/* Social Media Links ("Screenshot" Layout) */}
          <div className="flex items-center gap-4 mt-8 md:mt-10 lg:justify-start justify-center w-full relative z-50 pointer-events-auto">
            <a href="https://github.com/kenenisabeyan" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white dark:bg-[#1a1f2e] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-md border border-gray-100 dark:border-gray-800 relative z-50">
              <FaGithub size={24} className="text-[#181717] dark:text-white" />
            </a>
            <a href="https://www.linkedin.com/in/kenenisa/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIRSH8H%2FpRiWfMypD2meSJA%3D%3D" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white dark:bg-[#1a1f2e] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-md border border-gray-100 dark:border-gray-800 relative z-50">
              <FaLinkedin size={24} className="text-[#0A66C2]" />
            </a>
            <a href="https://twitter.com/kenenisa94931" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white dark:bg-[#1a1f2e] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-md border border-gray-100 dark:border-gray-800 relative z-50">
              <FaTwitter size={24} className="text-[#1DA1F2]" />
            </a>
          </div>

        </div>

        {/* Right Side: High-Tech Avatar Portal */}
        <div className="flex justify-center md:justify-end order-1 lg:order-2 relative">
          
          {/* Animated Background Ambience */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[130px] rounded-3xl pointer-events-none -z-10 block" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 z-0">
            <div className="w-[320px] h-[360px] sm:w-[420px] sm:h-[480px] rounded-3xl border border-dashed border-cyan-500/40 animate-[spin_30s_linear_infinite]" />
            <div className="absolute w-[360px] h-[400px] sm:w-[480px] sm:h-[540px] rounded-3xl border border-blue-500/20 animate-[spin_40s_linear_infinite_reverse]" />
          </div>

          {/* Outer containment ring */}
          <div className="relative w-[280px] h-[340px] sm:w-[360px] sm:h-[440px] rounded-3xl border-4 border-gray-100 dark:border-0 dark:p-[2px] dark:bg-gradient-to-tr dark:from-cyan-500 dark:via-transparent dark:to-blue-600 flex items-center justify-center z-10 group cursor-default shadow-sm dark:shadow-[0_0_50px_rgba(34,211,238,0.2)]">
            
            {/* White/Black void core */}
            <div className="w-full h-full rounded-[1.3rem] bg-white dark:bg-[#030610] dark:border-[8px] dark:border-[#030610] flex items-center justify-center overflow-hidden">
              
              {/* Profile Image Container with inner edge glow */}
              <div className="w-full h-full rounded-[1rem] relative transform group-hover:scale-110 transition-transform duration-700 ease-out">
                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-transparent mix-blend-overlay z-10 block"></div>
                
                <img 
                  src={kenoImg} 
                  alt="Kenenisa Beyan" 
                  className="w-full h-full object-cover object-center" 
                />
              </div>

            </div>

            {/* Glowing Accent Dots */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-ping block" />
            <div className="absolute bottom-8 left-4 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] block" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero