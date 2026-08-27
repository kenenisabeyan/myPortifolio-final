import React, { useState } from 'react'
import { FaAward, FaBuilding, FaCalendarAlt, FaExpand, FaTimes } from 'react-icons/fa'
import keno from '../assets/keno.jpg'
import edodphoto from '../assets/edodphoto.png'

interface GalleryImage {
  src: string
  label: string
  caption: string
}

const galleryImages: GalleryImage[] = [
  {
    src: keno,
    label: 'At the Program',
    caption: 'Kenenisa Beyan — MinT Early-Stage Startup Program, Feb 2025',
  },
  {
    src: edodphoto,
    label: 'EDOT Platform',
    caption: 'EDOT — The Ed-Tech platform built & recognized during the program',
  },
]

import { usePortfolioData } from '../context/PortfolioContext'

const Achievements: React.FC = () => {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const achContent = data?.sectionContent?.achievements || {}
  const items = (data?.achievements && data.achievements.length > 0) ? data.achievements : [
    {
      id: 'ach-1',
      title: 'Entrepreneurship & Startup Innovation Fellow',
      organization: 'Ministry of Innovation & Technology (MinT)',
      period: 'February 2025',
      description: 'Successfully completed the Early-Stage Startup Training Program in partnership with MinT, KOICA, and OSTA. Developed the EDOT Platform with a focus on transforming local creative ideas into scalable, product-ready services. Recognized for excellence in a competitive cohort of innovators aimed at driving national economic development and reducing technological reliance through local innovation.'
    }
  ]

  if (visibility.achievements === false) return null

  return (
    <section id="achievements" className="py-24 md:py-32 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-4 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-3 px-8 rounded-full mb-8 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse text-lg">❖</span>
            <span className="text-sm text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Recognition</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-4 inline-block mb-4">
            {achContent.heading || 'Achievements & Recognition'}
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto w-full space-y-8">
          {items.map((item: any, idx: number) => (
            <div key={item.id || idx} className="bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] border-l-cyan-500 border-t-cyan-500 border-l-[8px] border-t-[8px] rounded-[2.5rem] p-10 md:p-14 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.24)] hover:shadow-[0_25px_90px_rgba(34,211,238,0.2)] transition-all duration-300">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <FaAward size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-cyan-400 font-medium text-base mt-2">
                      <FaBuilding size={18} />
                      <span>{item.organization || item.issuer || 'Official Innovation Body'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gray-300 shrink-0">
                  <FaCalendarAlt size={16} className="text-cyan-400" />
                  <span>{item.period || item.date || 'Date Recorded'}</span>
                </div>
              </div>

              <p className="text-base md:text-lg font-normal text-gray-300 leading-relaxed border-t border-white/10 pt-8 mb-6">
                {item.description}
              </p>
            </div>
          ))}

          {/* Program Gallery */}
          <div className="bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] rounded-[2.5rem] p-10 md:p-14 backdrop-blur-xl">
            <p className="text-sm font-semibold tracking-widest uppercase text-cyan-400/70 mb-6">
              📸 Program Gallery
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {galleryImages.map((img) => (
                <div
                  key={img.label}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer"
                  onClick={() => setLightbox(img)}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <FaExpand size={18} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sm font-bold text-cyan-400 tracking-wide uppercase mb-1">{img.label}</p>
                    <p className="text-sm text-gray-300 leading-snug">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-6xl w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(34,211,238,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.src} alt={lightbox.caption} className="w-full max-h-[88vh] object-contain bg-black" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
              <p className="text-lg font-bold text-cyan-400 mb-1">{lightbox.label}</p>
              <p className="text-sm text-gray-300">{lightbox.caption}</p>
            </div>
            <button
              className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-200"
              onClick={() => setLightbox(null)}
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Achievements
