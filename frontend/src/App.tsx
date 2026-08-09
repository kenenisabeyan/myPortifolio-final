import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Overview from './components/Overview'
import ProfessionalSnapshot from './components/ProfessionalSnapshot'
import EngineeringApproach from './components/EngineeringApproach'
import WhatIBring from './components/WhatIBring'
import Services from './components/Skills'
import EngineeringCapabilities from './components/EngineeringCapabilities'
import ProblemsISolve from './components/ProblemsISolve'
import Work from './components/Work'
import EngineeringChallenges from './components/EngineeringChallenges'
import Experience from './components/Experience'
import Education from './components/Education'
import HowIWork from './components/HowIWork'
import CurrentlyBuilding from './components/CurrentlyBuilding'
import Achievements from './components/Achievements'
import EngineeringActivity from './components/EngineeringActivity'
import Testimonials from './components/Testimonials'
import CareerDirection from './components/CareerDirection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollArrow from './components/ScrollArrow'
import ChatBot from './components/ChatBot'
import SEO from './components/SEO'

import AdminApp from './admin/AdminApp'

import { trackAnalyticsEvent } from './services/portfolioData'
import { PortfolioProvider } from './context/PortfolioContext'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Route check for /admin
  const isAdminRoute = window.location.pathname.startsWith('/admin')

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

  useEffect(() => {
    if (!isAdminRoute) {
      trackAnalyticsEvent({ type: 'page_view', section: 'home' })
    }
  }, [isAdminRoute])

  if (isAdminRoute) {
    return <AdminApp />
  }

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#030610] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-50 relative overflow-x-hidden transition-colors duration-500">
        {/* SEO — manages document.title at runtime (crawlers read index.html) */}
        <SEO />
        <div className="relative w-full">
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <main id="main-content">
            <Hero />
            <Overview />
            <ProfessionalSnapshot />
            <EngineeringApproach />
            <WhatIBring />
            <Services />
            <EngineeringCapabilities />
            <ProblemsISolve />
            <Work />
            <EngineeringChallenges />
            <Experience />
            <Education />
            <HowIWork />
            <CurrentlyBuilding />
            <Achievements />
            <EngineeringActivity />
            <Testimonials />
            <CareerDirection />
            <Contact />
          </main>
          <Footer />
          <ScrollArrow />
          <ChatBot />
        </div>
      </div>
    </PortfolioProvider>
  )
}

export default App