import React, { useState, useEffect } from 'react'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

const ScrollArrow = () => {
  const [direction, setDirection] = useState<'up' | 'down'>('down')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setDirection('up')
      } else {
        setDirection('down')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    if (direction === 'up') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }) || document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button 
      onClick={handleClick} 
      className={`fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] ${direction === 'down' ? 'bg-cyan-500/20 text-cyan-400 animate-bounce' : 'bg-[#030610]/80 text-cyan-400'} p-3.5 sm:p-4 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition-all duration-300 backdrop-blur-md dark:shadow-[0_0_25px_rgba(34,211,238,0.4)]`}
      aria-label={direction === 'up' ? "Scroll to Top" : "Scroll to Content"}
    >
      {direction === 'up' ? <FaArrowUp size={22} /> : <FaArrowDown size={22} />}
    </button>
  )
}

export default ScrollArrow