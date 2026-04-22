import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'

const Navbar = ({ isDarkMode, toggleDarkMode }: { isDarkMode?: boolean, toggleDarkMode?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')

  const navItems = ['Home', 'Overview', 'Skills', 'Work', 'Experience', 'Education', 'Contact']

  const scrollToSection = (section: string) => {
    if (section === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section.toLowerCase())
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      const sections = ['home', 'overview', 'skills', 'work', 'experience', 'education', 'contact']
      let currentSection = 'Home'

      if (window.scrollY < 150) {
        currentSection = 'Home'
      } else {
        const offset = window.innerHeight / 3
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section === 'home') continue;
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Trigger active state when top of section crosses the top 65% of screen
            if (rect.top <= window.innerHeight * 0.6) {
              currentSection = section.charAt(0).toUpperCase() + section.slice(1);
              break;
            }
          }
        }
      }
      setActiveSection(currentSection)
    }

    handleScroll() // Call on mount
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close mobile menu if window is resized to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#060D1F]/80 backdrop-blur-3xl border-b border-cyan-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
        : 'bg-gradient-to-b from-[#030610]/95 to-transparent py-5 border-b border-transparent'
    } px-6 md:px-12`}>
      {/* Decorative top border gradient line on scroll */}
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="max-w-[75rem] mx-auto flex justify-between items-center text-sm font-medium relative z-10">
        
        {/* Logo */}
        <div className="flex items-center group relative cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="absolute inset-0 bg-gray-200 dark:bg-cyan-400 blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-300 rounded-full dark:animate-pulse"></div>
          <div className="relative w-[46px] h-[46px] rounded-full bg-white dark:bg-[#030610] border border-gray-200 dark:border-cyan-500/50 flex items-center justify-center text-gray-900 dark:text-cyan-50 text-lg md:text-xl font-bold tracking-wide shadow-sm dark:shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:bg-gray-50 dark:group-hover:bg-gradient-to-br dark:from-cyan-500 dark:to-blue-600 group-hover:border-gray-300 dark:group-hover:border-transparent transition-all duration-500">
            K
          </div>
        </div>

        {/* Center Nav */}
        <ul className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <li key={item} className="relative group flex flex-col items-center">
              <button 
                onClick={() => scrollToSection(item)}
                className={`text-sm md:text-[15px] transition-all duration-300 py-1.5 ${
                  activeSection === item 
                    ? 'font-bold text-cyan-400 border-b-2 border-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
                    : 'font-semibold text-gray-300 hover:text-white border-b-2 border-transparent hover:border-white/30'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-6 text-gray-500 dark:text-gray-400">
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-2xl z-50 text-gray-900 dark:text-white relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.1] hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-30" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Content */}
      <div className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-[#0B1121] border-l border-gray-800 shadow-2xl transition-transform duration-300 z-40 flex flex-col pt-24 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <ul className="flex flex-col px-8 space-y-6">
          {navItems.map((item) => (
            <li key={item} className="w-full">
              <button 
                onClick={() => scrollToSection(item)}
                className={`w-full text-left text-lg font-medium transition-colors ${
                  activeSection === item 
                    ? 'text-cyan-400 font-bold border-l-[3px] border-cyan-400 pl-3' 
                    : 'text-gray-400 hover:text-white pl-3 border-l-[3px] border-transparent'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar