import React, { useState, useEffect } from 'react'
import { FaArrowUp, FaArrowDown, FaComments } from 'react-icons/fa'

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
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] flex items-center gap-2">
      <div className="relative flex items-center">
        <span className="absolute -inset-1 rounded-full bg-cyan-500/10 blur-sm opacity-60" aria-hidden />
        <button
          onClick={() => window.dispatchEvent(new Event('toggle-chatbot'))}
          className="relative z-10 p-3 sm:p-3.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-black shadow-[0_8px_30px_rgba(34,211,238,0.25)] border border-cyan-500/30 hover:scale-105 transition"
          aria-label="Open chat"
        >
          <FaComments size={20} />
        </button>
      </div>

      <div className="relative flex items-center">
        <span className="absolute -inset-1 rounded-full bg-cyan-400/5 blur-md opacity-40" aria-hidden />
        <button
          onClick={handleClick}
          className={`relative z-10 ${direction === 'down' ? 'bg-cyan-500/20 text-cyan-400 animate-bounce' : 'bg-[#030610]/80 text-cyan-400'} p-3 sm:p-3.5 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)] border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition-all duration-300 backdrop-blur-md dark:shadow-[0_0_25px_rgba(34,211,238,0.4)]`}
          aria-label={direction === 'up' ? 'Scroll to Top' : 'Scroll to Content'}
        >
          {direction === 'up' ? <FaArrowUp size={20} /> : <FaArrowDown size={20} />}
        </button>
      </div>
    </div>
  )
}

export default ScrollArrow