import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="py-8 px-6 relative z-10 border-t border-gray-200 dark:border-white/[0.05] bg-gray-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">© 2025 Kenenisa Beyan. All rights reserved.</p>
        
        {/* Social Network Portals */}
        <div className="flex items-center gap-8">
          <a href="https://github.com/kenenisabeyan" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-cyan-400 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-110">
            <span className="sr-only">GitHub</span>
            <FaGithub className="text-[1.3rem]" />
          </a>
          <a href="https://www.linkedin.com/in/kenenisa/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIRSH8H%2FpRiWfMypD2meSJA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-110">
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="text-[1.3rem]" />
          </a>
          <a href="https://twitter.com/kenenisa94931" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-cyan-400 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-110">
            <span className="sr-only">Twitter</span>
            <FaTwitter className="text-[1.3rem]" />
          </a>
        </div>

        <div className="flex gap-8 mt-2 md:mt-0">
          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors duration-300">Terms & Conditions</a>
          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors duration-300">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer