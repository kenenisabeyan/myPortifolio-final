import React, { useState, useEffect } from 'react'
import { FaExpand, FaTimes, FaCalendarAlt, FaTag, FaLayerGroup, FaTh, FaSlidersH, FaCheckCircle } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioContext'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:5001'

const formatImageUrl = (url?: string) => {
  if (!url) return ''
  if (url.startsWith('/uploads')) {
    return `${API_BASE}${url}`
  }
  return url
}

const defaultPhotos = [
  {
    id: 'photo-1',
    title: 'MinT Startup Incubation Program',
    category: 'Events',
    photoUrl: '/src/assets/home-page.png',
    caption: 'Official recognition and fellow training at the Ministry of Innovation & Technology startup initiative in partnership with KOICA and OSTA.',
    date: 'February 2025',
    visibility: true,
    highlights: [
      'Ministry of Innovation & Technology Fellow',
      'KOICA & OSTA Incubator Partnership',
      'EdTech Platform Pitch & Exhibition',
      'National Startup Innovation Award'
    ]
  },
  {
    id: 'photo-2',
    title: 'EDOT Educational Platform Architecture',
    category: 'Projects',
    photoUrl: '/src/assets/edotpage.png',
    caption: 'Demonstrating modular education technology system architecture and role-based workflows for modern digital learning.',
    date: 'January 2025',
    visibility: true,
    highlights: [
      'Multi-Role System Architecture',
      'Role-Based Access Control (RBAC)',
      'Interactive Student & Admin Portals',
      'Scalable PostgreSQL Database Schema'
    ]
  },
  {
    id: 'photo-3',
    title: 'ASTU Computer Science Technical Showcase',
    category: 'Events',
    photoUrl: '/src/assets/edodphoto.png',
    caption: 'Presenting full-stack web engineering standards, API design, and database indexing to department faculty and peers.',
    date: 'December 2024',
    visibility: true,
    highlights: [
      'Adama Science & Tech University Showcase',
      'REST API Engineering & Standards',
      'Frontend Performance Optimization',
      'Clean Code Architecture Presentation'
    ]
  },
  {
    id: 'photo-4',
    title: 'FollowFlow Task Tracking & CRM Interface',
    category: 'Projects',
    photoUrl: '/src/assets/followflow.png',
    caption: 'Django REST & React 19 task management dashboard interface designed for production tracking workflows.',
    date: 'November 2024',
    visibility: true,
    highlights: [
      'Django REST Framework Backend',
      'React 19 & Tailwind CSS Interface',
      'Real-time Task & Pipeline Tracking',
      'Production-Grade Security Integration'
    ]
  },
  {
    id: 'photo-5',
    title: 'ASTU Tech Summit & Developer Workshop',
    category: 'Community',
    photoUrl: '/src/assets/client.png',
    caption: 'Leading engineering discussions and mentoring student developers on modern web stacks, Git workflows, and API design.',
    date: 'October 2024',
    visibility: true,
    highlights: [
      'Tech Community Mentorship',
      'Full-Stack Developer Workshop',
      'Git & DevOps Best Practices',
      'Collaborative Open Source Systems'
    ]
  },
  {
    id: 'photo-6',
    title: 'Employee Performance Evaluation System',
    category: 'Projects',
    photoUrl: '/src/assets/employee.png',
    caption: 'Next.js 15 App Router & MongoDB evaluation dashboard built for ASTU IT Directorate.',
    date: 'September 2024',
    visibility: true,
    highlights: [
      'Next.js 15 App Router',
      'NextAuth.js Multi-Role Security',
      'Data Analytics Chart Dashboards',
      'ASTU Directorate Deployment'
    ]
  },
  {
    id: 'photo-7',
    title: 'ClientFlow Business Operations Platform',
    category: 'Projects',
    photoUrl: '/src/assets/clientflow.jpg',
    caption: 'Enterprise CRM and automated operations dashboard for managing multi-user client contracts and data pipelines.',
    date: 'August 2024',
    visibility: true,
    highlights: [
      'Enterprise CRM Pipeline',
      'Automated Financial Billing',
      'Multi-tenant User Roles',
      'Secure Token Authentication'
    ]
  },
  {
    id: 'photo-8',
    title: 'Full-Stack Software Fellow Certificate',
    category: 'Certificates',
    photoUrl: '/src/assets/kenenisaCV.jpg',
    caption: 'Official certification awarded for outstanding fullstack application architecture and end-to-end system reliability.',
    date: 'July 2024',
    visibility: true,
    highlights: [
      'Software Fellow Certification',
      'System Reliability Standards',
      'ASTU CSE Engineering Merit',
      'Verified Full-Stack Expertise'
    ]
  },
  {
    id: 'photo-9',
    title: 'ASTU CSE Engineering Department Exhibition',
    category: 'Events',
    photoUrl: '/src/assets/9O9A0007.JPG',
    caption: 'Exhibiting computer science engineering solutions, data structures, and production-grade software prototypes.',
    date: 'June 2024',
    visibility: true,
    highlights: [
      'ASTU Computer Science Exhibition',
      'Live Software Demonstration',
      'Peer Engineering Panel Review',
      'Software Architecture Awards'
    ]
  },
  {
    id: 'photo-10',
    title: 'Developer Studio Environment',
    category: 'Community',
    photoUrl: '/src/assets/isometric_developer_room.png',
    caption: 'Conceptual high-tech workstation setup designed for clean architectural coding, continuous integration, and rapid testing.',
    date: 'May 2024',
    visibility: true,
    highlights: [
      'Fullstack Workstation Setup',
      'DevOps & CI/CD Pipelines',
      'Clean Architecture Environment',
      'Modern Tech Stack Integration'
    ]
  },
  {
    id: 'photo-11',
    title: 'Kenenisa Beyan Software Lead Profile',
    category: 'Community',
    photoUrl: '/src/assets/keno.jpg',
    caption: 'Personal developer snapshot showcasing passion for scalable software engineering, education technology, and innovation.',
    date: 'April 2024',
    visibility: true,
    highlights: [
      'Founder of EDOT Platform',
      'MinT Innovation Fellow',
      'Computer Science Engineer',
      'Full-Stack Technical Lead'
    ]
  },
  {
    id: 'photo-12',
    title: 'National Innovation Summit Certificate',
    category: 'Certificates',
    photoUrl: '/src/assets/kenoye.jpg',
    caption: 'National Innovation & Tech Summit recognition for tech leadership, open-source contribution, and platform development.',
    date: 'March 2024',
    visibility: true,
    highlights: [
      'National Innovation Recognition',
      'Tech Leadership & Impact',
      'Open-Source Contribution',
      'ASTU Engineering Leadership'
    ]
  }
]

const categories = ['All', 'Events', 'Projects', 'Certificates', 'Community']

const GallerySection: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const photos = (data?.galleryPhotos && data.galleryPhotos.length > 0) ? data.galleryPhotos : defaultPhotos
  const sectionContent = data?.sectionContent?.['gallery-section'] || {}

  const [activeCategory, setActiveCategory] = useState('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel')
  const [activeLightbox, setActiveLightbox] = useState<any | null>(null)

  if (visibility['gallery-section'] === false) return null

  const filteredPhotos = photos
    .filter((p: any) => p.visibility !== false)
    .filter((p: any) => activeCategory === 'All' || (p.category && p.category.toLowerCase() === activeCategory.toLowerCase()))

  useEffect(() => {
    setActiveIndex(0)
  }, [activeCategory])

  // Ensure display array has at least 9 items for exact 9-card polaroid fan-out stack
  let displayList = filteredPhotos
  if (displayList.length > 0 && displayList.length < 9) {
    let duplicated = [...displayList]
    while (duplicated.length < 9) {
      duplicated = [...duplicated, ...displayList]
    }
    displayList = duplicated
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? displayList.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === displayList.length - 1 ? 0 : prev + 1))
  }

  const activePhoto = displayList[activeIndex] || displayList[0] || {}

  // Generate exact 9 relative offsets centered at activeIndex: [-4, -3, -2, -1, 0, 1, 2, 3, 4]
  const relativeOffsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4]

  return (
    <section id="gallery-section" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-[#0a101d] dark:bg-[#040812] overflow-hidden text-white border-t border-white/10">
      
      {/* Sunburst Radial Ray Background (Exact Match to Reference Image) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-[700px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[950px] h-[650px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.22)_0%,rgba(14,116,144,0.08)_45%,transparent_70%)]" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1500px] h-[850px] opacity-25 bg-[repeating-conic-gradient(from_0deg_at_50%_0%,rgba(255,255,255,0.12)_0deg_6deg,transparent_6deg_12deg)] pointer-events-none" />
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="flex flex-col items-start space-y-3">
              <div className="flex items-center gap-3 bg-cyan-950/60 border border-cyan-500/30 py-1.5 px-5 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-md">
                <span className="text-cyan-400 text-xs animate-pulse">❖</span>
                <span className="text-xs text-cyan-100 font-mono font-bold tracking-widest uppercase">Photo Showcase</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                {sectionContent.heading || 'Photo Gallery'}
              </h2>
            </div>

            <p className="text-gray-300 text-sm md:text-base max-w-md font-light leading-relaxed">
              {sectionContent.subheading || 'Captured moments from our engineering events, project showcases, tech summits, and technical milestones.'}
            </p>
          </div>

          {/* Categories & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full border-b border-white/10 pb-6">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-[#0d172a]/90 border border-white/15 backdrop-blur-md shadow-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Switcher (Icon Only) */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0d172a]/90 border border-white/15 backdrop-blur-md">
              <button
                onClick={() => setViewMode('carousel')}
                title="3D Polaroid Stack"
                aria-label="3D Polaroid Stack View"
                className={`p-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  viewMode === 'carousel'
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <FaSlidersH size={14} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Bento Grid"
                aria-label="Bento Grid View"
                className={`p-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <FaTh size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* EDITORIAL BENTO MASONRY GRID (EXACT REFERENCE SCREENSHOT)  */}
        {/* ----------------------------------------------------------- */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 my-6">
            {filteredPhotos.map((item: any, idx: number) => {
              // Asymmetric Bento Grid pattern math (2/3 wide vs 1/3 tall)
              const mod = idx % 7
              let colSpanClass = 'col-span-1'
              let aspectHeight = 'h-[320px] md:h-[400px]'

              if (mod === 0) {
                // Row 1 Left: Wide Landscape (2 cols)
                colSpanClass = 'col-span-1 md:col-span-2'
                aspectHeight = 'h-[320px] md:h-[420px]'
              } else if (mod === 1) {
                // Row 1 Right: Tall Portrait (1 col)
                colSpanClass = 'col-span-1'
                aspectHeight = 'h-[320px] md:h-[420px]'
              } else if (mod === 6) {
                // Row 3 Right: Wide Landscape (2 cols)
                colSpanClass = 'col-span-1 md:col-span-2'
                aspectHeight = 'h-[320px] md:h-[420px]'
              } else {
                // Regular 1 col items
                colSpanClass = 'col-span-1'
                aspectHeight = 'h-[320px] md:h-[400px]'
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveLightbox(item)}
                  className={`group relative ${colSpanClass} ${aspectHeight} rounded-[2.2rem] overflow-hidden bg-[#071124] border border-white/10 hover:border-cyan-400/80 transition-all duration-700 shadow-2xl cursor-pointer flex flex-col justify-end`}
                >
                  {/* Photo Image with smooth scale hover */}
                  <img
                    src={formatImageUrl(item.photoUrl) || '/src/assets/home-page.png'}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Soft Gradient Mask overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a17] via-[#040a17]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Category Tag Pill */}
                  <div className="absolute top-4 left-4 z-10 bg-cyan-400 text-black text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] flex items-center gap-1.5">
                    <span className="text-[11px]">❖</span>
                    <span>{item.category || 'Media'}</span>
                  </div>

                  {/* Expand Icon Overlay */}
                  <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/30 text-cyan-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
                    <FaExpand size={12} />
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="relative z-10 p-6 space-y-1.5">
                    <span className="text-[11px] text-cyan-400 font-mono font-semibold flex items-center gap-1.5">
                      <FaCalendarAlt size={10} /> {item.date || 'Recent'}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed font-light">
                      {item.caption}
                    </p>
                  </div>

                </div>
              )
            })}
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* EXACT REFERENCE 9-CARD POLAROID FAN-OUT STACK               */}
        {/* ----------------------------------------------------------- */}
        {viewMode === 'carousel' && displayList.length > 0 && (
          <div className="relative w-full max-w-[1350px] mx-auto py-4 my-2">
            
            {/* Stage Container */}
            <div className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] flex items-center justify-center px-10 sm:px-14 md:px-20">
              
              {/* Left Wireframe Chevron (<) - Positioned at outer edge */}
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-1 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-cyan-400 p-2 sm:p-3 hover:scale-125 transition-all duration-300 cursor-pointer drop-shadow-md"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Wireframe Chevron (>) - Positioned at outer edge */}
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-1 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-cyan-400 p-2 sm:p-3 hover:scale-125 transition-all duration-300 cursor-pointer drop-shadow-md"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Render 9 cards centered at activeIndex: [-4, -3, -2, -1, 0, 1, 2, 3, 4] */}
              {relativeOffsets.map((k) => {
                const itemIdx = (activeIndex + k + displayList.length * 100) % displayList.length
                const item = displayList[itemIdx]
                if (!item) return null

                const isActive = k === 0
                const absOffset = Math.abs(k)
                const sign = k < 0 ? -1 : 1

                // Z-Index: Center card is highest (50), outer cards drop sequentially (40, 30, 20, 10)
                const zIndex = 50 - absOffset * 10

                // Step spacing calibrated so all 9 cards fit cleanly between left and right chevrons
                const stepMobile = 18
                const stepSm = 30
                const stepMd = 44

                const scale = 1.05 - absOffset * 0.075

                const transformStyle = `translateX(${sign * absOffset * stepMobile}px) sm:translateX(${sign * absOffset * stepSm}px) md:translateX(${sign * absOffset * stepMd}px) scale(${scale})`

                return (
                  <div
                    key={`${item.id}-${k}-${itemIdx}`}
                    onClick={() => {
                      if (isActive) {
                        setActiveLightbox(item)
                      } else {
                        setActiveIndex(itemIdx)
                      }
                    }}
                    style={{
                      transform: transformStyle,
                      opacity: 1,
                      zIndex,
                      pointerEvents: 'auto',
                      transition: 'all 0.5s cubic-bezier(0.2, 0.9, 0.3, 1)'
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] sm:w-[270px] md:w-[340px] bg-white text-gray-900 rounded-none p-3 pb-5 sm:pb-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-gray-200/80 cursor-pointer group select-none transition-shadow"
                  >
                    {/* Clean Polaroid Image Container */}
                    <div className="relative overflow-hidden bg-black aspect-[4/3.5] w-full border border-gray-300">
                      <img
                        src={formatImageUrl(item.photoUrl) || '/src/assets/home-page.png'}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Expand Overlay Button on Hover */}
                      {isActive && (
                        <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/40 text-cyan-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
                          <FaExpand size={12} />
                        </div>
                      )}
                    </div>

                    {/* Classic Polaroid Bottom Caption Area (Exact Match to Reference Screenshot) */}
                    <div className="pt-3 text-center">
                      <h3 className="text-xs sm:text-sm md:text-base font-serif italic font-bold text-[#3c2a1e] tracking-wide group-hover:text-cyan-700 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                    </div>

                  </div>
                )
              })}

            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {displayList.slice(0, filteredPhotos.length).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    (activeIndex % filteredPhotos.length) === idx
                      ? 'w-7 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* BOTTOM 3-COLUMN DETAIL PANEL (EXACT MATCH TO REFERENCE PANEL) */}
        {/* ----------------------------------------------------------- */}
        {activePhoto && viewMode === 'carousel' && (
          <div className="mt-12 pt-10 border-t border-white/10 bg-[#081226]/80 rounded-3xl p-6 sm:p-10 border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              
              {/* Column 1: Welcome / About Showcase */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-xl md:text-2xl font-serif italic font-bold text-cyan-300 flex items-center gap-2">
                  <span>Welcome</span>
                </h3>
                <p className="text-sm md:text-base text-gray-300 font-normal leading-relaxed">
                  {activePhoto.caption || 'Exploring production engineering standards, system architecture, and tech community milestones.'}
                </p>
              </div>

              {/* Column 2: Latest News / Milestone Record */}
              <div className="flex flex-col space-y-3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                <h3 className="text-xl md:text-2xl font-serif italic font-bold text-cyan-300">
                  Latest Milestone
                </h3>
                <div className="text-xs text-cyan-400 font-mono font-semibold flex items-center gap-2">
                  <FaCalendarAlt size={12} />
                  <span>{activePhoto.date || 'Recent Event'}</span>
                  <span>•</span>
                  <span className="uppercase text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                    {activePhoto.category || 'Events'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white leading-snug">
                  {activePhoto.title}
                </h4>
                <button
                  onClick={() => setActiveLightbox(activePhoto)}
                  className="w-max px-5 py-2 mt-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold uppercase text-xs tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                  Learn More
                </button>
              </div>

              {/* Column 3: Useful Info / Key Highlights */}
              <div className="flex flex-col space-y-3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                <h3 className="text-xl md:text-2xl font-serif italic font-bold text-cyan-300">
                  Useful Info
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                  {((activePhoto as any).highlights || [
                    'Production-Grade Web System Design',
                    'Interactive Multi-Role Dashboards',
                    'RESTful API Architecture Standards',
                    'Adama Science & Technology University'
                  ]).map((point: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaCheckCircle className="text-cyan-400 shrink-0" size={12} />
                      <span className="line-clamp-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ----------------------------------------------------------- */}
      {/* LIGHTBOX MODAL                                             */}
      {/* ----------------------------------------------------------- */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative my-auto">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                  <FaLayerGroup /> {activeLightbox.category || 'Gallery Media'}
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {activeLightbox.title}
                </h2>
              </div>
              <button 
                onClick={() => setActiveLightbox(null)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white shrink-0 ml-4"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* High-res Photo Preview */}
            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[450px]">
              <img 
                src={formatImageUrl(activeLightbox.photoUrl)} 
                alt={activeLightbox.title} 
                className="w-full h-full object-contain bg-black/60"
              />
            </div>

            <div className="bg-black/40 p-4 rounded-2xl border border-white/10 space-y-2">
              <span className="text-[10px] uppercase font-bold text-cyan-400 flex items-center gap-1">
                <FaCalendarAlt size={10} /> {activeLightbox.date || 'Date Recorded'}
              </span>
              <p className="text-xs text-gray-200 leading-relaxed">
                {activeLightbox.caption}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveLightbox(null)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}

export default GallerySection
