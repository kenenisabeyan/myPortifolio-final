import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Work from './components/Work'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollArrow from './components/ScrollArrow'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen bg-[#030610] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative overflow-x-hidden transition-colors duration-500">
      <div className="relative w-full">
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <Overview />
        <Work />
        <Experience />
        <Education />
        {/* <Skills /> */}
        {/* <Testimonials /> */}
        <Contact />
        <Footer />
        <ScrollArrow />
      </div>
    </div>
  )
}

export default App