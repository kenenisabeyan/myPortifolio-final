import React, { useState } from 'react'
import { FaCamera, FaExpand, FaTimes, FaCalendarAlt, FaTag, FaLayerGroup } from 'react-icons/fa'
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
    visibility: true
  },
  {
    id: 'photo-2',
    title: 'EDOT Educational Platform Architecture',
    category: 'Projects',
    photoUrl: '/src/assets/edotpage.png',
    caption: 'Demonstrating modular education technology system architecture and role-based workflows.',
    date: 'January 2025',
    visibility: true
  },
  {
    id: 'photo-3',
    title: 'ASTU Computer Science Technical Showcase',
    category: 'Events',
    photoUrl: '/src/assets/edodphoto.png',
    caption: 'Presenting full-stack web engineering standards, API design, and database indexing.',
    date: 'December 2024',
    visibility: true
  },
  {
    id: 'photo-4',
    title: 'FollowFlow Task Tracking & CRM Interface',
    category: 'Projects',
    photoUrl: '/src/assets/followflow.png',
    caption: 'Django REST & React 19 task management dashboard interface.',
    date: 'November 2024',
    visibility: true
  }
]

const categories = ['All', 'Events', 'Projects', 'Certificates', 'Community']

const GallerySection: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const photos = (data?.galleryPhotos && data.galleryPhotos.length > 0) ? data.galleryPhotos : defaultPhotos
  const sectionContent = data?.sectionContent?.['gallery-section'] || {}

  const [activeCategory, setActiveCategory] = useState('All')
  const [activeLightbox, setActiveLightbox] = useState<any | null>(null)

  if (visibility['gallery-section'] === false) return null

  const filteredPhotos = photos
    .filter((p: any) => p.visibility !== false)
    .filter((p: any) => activeCategory === 'All' || (p.category && p.category.toLowerCase() === activeCategory.toLowerCase()))

  return (
    <section id="gallery-section" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Media &amp; Moments</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {sectionContent.heading || 'Photo & Media Gallery'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mt-2">
            {sectionContent.subheading || 'A visual collection of recognized events, project showcases, tech summits, and engineering milestones.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 p-1.5 rounded-full bg-[#07101f]/80 border border-white/10 max-w-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((item: any) => (
            <div 
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] border-l-cyan-500 border-t-cyan-500 border-l-[4px] border-t-[4px] rounded-[1.8rem] overflow-hidden backdrop-blur-xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(34,211,238,0.2)] h-[320px] flex flex-col justify-end"
            >
              {/* Photo Background */}
              <img 
                src={formatImageUrl(item.photoUrl) || '/src/assets/home-page.png'} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Top Category Tag */}
              <div className="absolute top-4 left-4 z-10 bg-cyan-500/90 text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1">
                <FaTag size={10} />
                <span>{item.category || 'Media'}</span>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/20 text-cyan-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaExpand size={11} />
              </div>

              {/* Card Footer Content */}
              <div className="relative z-10 p-5 space-y-1.5">
                <span className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                  <FaCalendarAlt size={10} /> {item.date || 'Recent'}
                </span>
                <h3 className="text-base font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed opacity-90">
                  {item.caption}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
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
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs"
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
