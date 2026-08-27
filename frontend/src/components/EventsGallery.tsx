import React, { useState } from 'react'
import { FaAward, FaCalendarAlt, FaBullhorn, FaTimes, FaExpand, FaBuilding } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioContext'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:5001'

const formatImageUrl = (url?: string) => {
  if (!url) return ''
  if (url.startsWith('/uploads')) {
    return `${API_BASE}${url}`
  }
  return url
}

const defaultEvents = [
  {
    id: 'event-1',
    title: 'MinT & KOICA Early-Stage Startup Innovation Recognition',
    campaignName: 'Ministry of Innovation & Technology (MinT) & KOICA Campaign',
    eventDate: 'February 2025',
    description: 'Invited and officially recognized as a Fellow for the EDOT Platform during the National Startup Incubation Program in partnership with MinT, KOICA, and OSTA.',
    photoUrl: '/src/assets/home-page.png',
    recognitionBadge: 'Startup Innovation Fellow',
    visibility: true
  },
  {
    id: 'event-2',
    title: 'ASTU Annual Software & Engineering Technology Showcase',
    campaignName: 'ASTU Computer Science & Engineering Department',
    eventDate: 'December 2024',
    description: 'Invited to demonstrate full-stack software architectures, multi-role RBAC systems, and custom database optimization techniques to faculty and industry partners.',
    photoUrl: '/src/assets/edotpage.png',
    recognitionBadge: 'Top Project Exhibitor',
    visibility: true
  }
]

const EventsGallery: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const events = (data?.eventsGallery && data.eventsGallery.length > 0) ? data.eventsGallery : defaultEvents
  const sectionContent = data?.sectionContent?.['events-gallery'] || {}

  const [activeModalEvent, setActiveModalEvent] = useState<any | null>(null)

  if (visibility['events-gallery'] === false) return null

  return (
    <section id="events-gallery" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Recognition &amp; Invitations</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            {sectionContent.heading || 'Events & Recognition Gallery'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mt-2">
            {sectionContent.subheading || 'Special events, campaign invitations, official recognitions, and awards from government initiatives, tech summits, and innovation programs.'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.filter((item: any) => item.visibility !== false).map((item: any) => (
            <div 
              key={item.id}
              className="group bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] border-l-cyan-500 border-t-cyan-500 border-l-[6px] border-t-[6px] rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_90px_rgba(34,211,238,0.2)] flex flex-col justify-between"
            >
              {/* Event Image */}
              <div 
                className="relative h-56 w-full overflow-hidden bg-black/40 cursor-pointer group"
                onClick={() => setActiveModalEvent(item)}
              >
                <img 
                  src={formatImageUrl(item.photoUrl) || '/src/assets/home-page.png'} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-80" />
                
                {/* Recognition Badge */}
                {item.recognitionBadge && (
                  <div className="absolute top-4 left-4 bg-cyan-500/90 text-black text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                    <FaAward size={13} />
                    <span>{item.recognitionBadge}</span>
                  </div>
                )}

                {/* Expand Photo Icon */}
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-cyan-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaExpand size={12} />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Campaign & Date Metadata */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                      <FaBullhorn className="shrink-0" size={12} />
                      <span className="truncate">{item.campaignName || 'Official Campaign Event'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <FaCalendarAlt className="shrink-0 text-gray-500" size={12} />
                      <span>{item.eventDate || 'Event Date'}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setActiveModalEvent(item)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
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

      {/* Lightbox & Detail Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative my-auto">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                  <FaAward /> {activeModalEvent.recognitionBadge || 'Recognized Event'}
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {activeModalEvent.title}
                </h2>
              </div>
              <button 
                onClick={() => setActiveModalEvent(null)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white shrink-0 ml-4"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Event Photo Preview */}
            {activeModalEvent.photoUrl && (
              <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[350px]">
                <img 
                  src={formatImageUrl(activeModalEvent.photoUrl)} 
                  alt={activeModalEvent.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Event Campaign Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/40 p-4 rounded-2xl border border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Organizing Campaign / Entity</span>
                <p className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                  <FaBuilding size={12} /> {activeModalEvent.campaignName || 'Official Organizer'}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Event Date &amp; Day</span>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <FaCalendarAlt size={12} className="text-cyan-400" /> {activeModalEvent.eventDate || 'Date'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Recognition Summary &amp; Impact</h4>
              <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                {activeModalEvent.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}

export default EventsGallery
