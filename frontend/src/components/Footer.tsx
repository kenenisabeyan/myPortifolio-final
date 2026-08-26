import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioContext'

const Footer = () => {
  const { data } = usePortfolioData()
  const settings = data?.siteSettings || {}
  const githubUrl = settings.githubUrl || 'https://github.com/kenenisabeyan'
  const linkedinUrl = settings.linkedinUrl || 'https://www.linkedin.com/in/kenenisa/'
  const twitterUrl = settings.twitterUrl || 'https://twitter.com/kenenisa94931'

  return (
    <footer className="py-8 px-4 md:px-10 lg:px-16 relative z-10 border-t border-gray-200 dark:border-white/[0.05] bg-gray-50 dark:bg-transparent">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} {settings.siteTitle ? settings.siteTitle.split('—')[0].trim() : 'Kenenisa Beyan'}. All rights reserved.
        </p>
        
        {/* Social Network Portals */}
        <div className="flex items-center gap-8">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-cyan-400 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-110">
            <span className="sr-only">GitHub</span>
            <FaGithub className="text-[1.3rem]" />
          </a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-110">
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="text-[1.3rem]" />
          </a>
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-cyan-400 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-110">
            <span className="sr-only">Twitter</span>
            <FaTwitter className="text-[1.3rem]" />
          </a>
          <a href="/admin" className="text-gray-400/40 dark:text-gray-600 hover:text-cyan-400 transition-colors duration-300 text-xs font-mono tracking-wider opacity-60 hover:opacity-100 transition-opacity" title="Admin Gateway">
            Admin Gateway
          </a>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide mt-2 md:mt-0">Designed to showcase my skills, projects, and passion for building modern web experiences.</p>
      </div>
    </footer>
  )
}

export default Footer