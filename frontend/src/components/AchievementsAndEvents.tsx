import React, { useState } from 'react'
import { FaAward, FaCalendarAlt, FaBullhorn, FaExpand, FaTimes, FaBuilding, FaImages, FaCheckCircle, FaStar, FaMedal } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioContext'
import homeImg from '../assets/home-page.png'
import edotImg from '../assets/edotpage.png'
import edodImg from '../assets/edodphoto.png'

const defaultAchievements = [
  {
    id: 'ach-1',
    title: 'Entrepreneurship & Startup Innovation Fellow',
    organization: 'Ministry of Innovation & Technology (MinT)',
    period: 'February 2025',
    badge: 'National Fellowship',
    description: 'Successfully completed the Early-Stage Startup Training Program in partnership with MinT, KOICA, and OSTA. Developed the EDOT Platform with a focus on transforming local creative ideas into scalable, product-ready services. Recognized for excellence in a competitive cohort of innovators aimed at driving national economic development and reducing technological reliance through local innovation.',
    galleryPhotos: [
      { url: homeImg, title: 'Kenenisa Beyan — MinT Early-Stage Startup Program, Feb 2025', caption: 'At the Program' },
      { url: edotImg, title: 'EDOT — The Ed-Tech platform built & recognized during the program', caption: 'EDOT Platform' }
    ],
    visibility: true
  }
]

const defaultEvents = [
  {
    id: 'event-1',
    title: 'MinT & KOICA Early-Stage Startup Innovation Recognition',
    campaignName: 'Ministry of Innovation & Technology (MinT) & KOICA Campaign',
    eventDate: 'February 2025',
    description: 'Invited and officially recognized as a Fellow for the EDOT Platform during the National Startup Incubation Program in partnership with MinT, KOICA, and OSTA.',
    photoUrl: homeImg,
    recognitionBadge: 'Startup Innovation Fellow',
    visibility: true
  },
  {
    id: 'event-2',
    title: 'ASTU Annual Software & Engineering Technology Showcase',
    campaignName: 'ASTU Computer Science & Engineering Department',
    eventDate: 'December 2024',
    description: 'Invited to demonstrate full-stack software architectures, multi-role RBAC systems, and custom database optimization techniques to faculty and industry partners.',
    photoUrl: edotImg,
    recognitionBadge: 'Top Project Exhibitor',
    visibility: true
  }
]

const AchievementsAndEvents: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  
  const achievements = (data?.achievements && data.achievements.length > 0) ? data.achievements : defaultAchievements
  const events = (data?.eventsGallery && data.eventsGallery.length > 0) ? data.eventsGallery : defaultEvents
  const sectionContent = data?.sectionContent?.['achievements-and-events'] || {}

  const [activeTab, setActiveTab] = useState<'all' | 'fellowships' | 'events'>('all')
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null)
  const [modalType, setModalType] = useState<'achievement' | 'event'>('achievement')

  if (visibility.achievements === false && visibility['events-gallery'] === false) return null

  return (
    <section id="achievements" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Recognition &amp; Program Gallery</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {sectionContent.heading || 'Achievements, Recognitions & Event Gallery'}
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mt-2">
            {sectionContent.subheading || 'Fellowships, official government startup incubation awards, technical showcases, and event galleries from MinT, KOICA, OSTA, and ASTU.'}
          </p>

          {/* Unified Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 p-1.5 rounded-full bg-[#07101f]/80 border border-white/10 max-w-md">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All Recognitions &amp; Events
            </button>
            <button
              onClick={() => setActiveTab('fellowships')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeTab === 'fellowships'
                  ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Fellowships &amp; Honors
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeTab === 'events'
                  ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Event Showcases
            </button>
          </div>
        </div>

        {/* Combined Master Grid */}
        <div className="space-y-12">
          
          {/* SECTION 1: FELLOWSHIPS & OFFICIAL AWARDS */}
          {(activeTab === 'all' || activeTab === 'fellowships') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <FaMedal className="text-cyan-400" size={18} />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                  Official Fellowships &amp; Startup Honors
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {achievements.filter((a: any) => a.visibility !== false).map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6 shadow-2xl transition-all duration-300 hover:border-cyan-500/40"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-extrabold uppercase tracking-wider border border-cyan-500/30 flex items-center gap-1.5">
                            <FaAward /> {item.badge || 'Fellowship Recognition'}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <FaCalendarAlt size={12} className="text-cyan-400" /> {item.period || item.date}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-sm font-semibold text-cyan-300 mt-1 flex items-center gap-2">
                          <FaBuilding size={12} /> {item.organization || 'Ministry of Innovation & Technology (MinT)'}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Program Photo Gallery */}
                    {item.galleryPhotos && item.galleryPhotos.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                          <FaImages /> Program Gallery &amp; Project Snapshots
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {item.galleryPhotos.map((photo: any, pIdx: number) => (
                            <div
                              key={pIdx}
                              onClick={() => {
                                setActiveModalItem({
                                  title: photo.title || item.title,
                                  photoUrl: photo.url || photo,
                                  caption: photo.caption || item.description,
                                  organization: item.organization,
                                  period: item.period
                                })
                                setModalType('achievement')
                              }}
                              className="group relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-black/40 cursor-pointer"
                            >
                              <img
                                src={photo.url || photo}
                                alt={photo.title || item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              
                              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                <div>
                                  <p className="text-xs font-bold text-white truncate max-w-[200px]">{photo.title}</p>
                                  <p className="text-[10px] text-cyan-300">{photo.caption}</p>
                                </div>
                                <div className="w-7 h-7 rounded-full bg-cyan-500/80 text-black flex items-center justify-center shrink-0">
                                  <FaExpand size={10} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: EVENT SHOWCASES & CAMPAIGNS */}
          {(activeTab === 'all' || activeTab === 'events') && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <FaBullhorn className="text-cyan-400" size={18} />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                  Invited Events &amp; Tech Showcases
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.filter((e: any) => e.visibility !== false).map((item: any) => (
                  <div
                    key={item.id}
                    className="group bg-[#07101f]/90 border border-white/[0.08] border-l-cyan-500 border-t-cyan-500 border-l-[6px] border-t-[6px] rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_70px_rgba(34,211,238,0.2)] flex flex-col justify-between"
                  >
                    <div
                      className="relative h-56 w-full overflow-hidden bg-black/40 cursor-pointer"
                      onClick={() => {
                        setActiveModalItem(item)
                        setModalType('event')
                      }}
                    >
                      <img
                        src={item.photoUrl || homeImg}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-80" />

                      {item.recognitionBadge && (
                        <div className="absolute top-4 left-4 bg-cyan-500/90 text-black text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                          <FaAward size={12} />
                          <span>{item.recognitionBadge}</span>
                        </div>
                      )}

                      <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-cyan-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaExpand size={12} />
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="space-y-1 mb-3">
                          <p className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                            <FaBullhorn size={11} /> {item.campaignName || 'Campaign Event'}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-2">
                            <FaCalendarAlt size={11} /> {item.eventDate || 'Date'}
                          </p>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>

                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex justify-end">
                        <button
                          onClick={() => {
                            setActiveModalItem(item)
                            setModalType('event')
                          }}
                          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
                        >
                          <span>View Event Details &amp; Photo</span>
                          <FaExpand size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Lightbox / Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative my-auto">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                  <FaAward /> {activeModalItem.recognitionBadge || activeModalItem.badge || 'Official Recognition'}
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {activeModalItem.title}
                </h2>
              </div>
              <button 
                onClick={() => setActiveModalItem(null)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white shrink-0 ml-4"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {activeModalItem.photoUrl && (
              <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[400px]">
                <img 
                  src={activeModalItem.photoUrl} 
                  alt={activeModalItem.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/40 p-4 rounded-2xl border border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Organization / Campaign</span>
                <p className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                  <FaBuilding size={12} /> {activeModalItem.organization || activeModalItem.campaignName || 'Ministry of Innovation & Technology (MinT)'}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Date &amp; Period</span>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <FaCalendarAlt size={12} className="text-cyan-400" /> {activeModalItem.period || activeModalItem.eventDate || 'February 2025'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Recognition Details &amp; Summary</h4>
              <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                {activeModalItem.description || activeModalItem.caption}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModalItem(null)}
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

export default AchievementsAndEvents
