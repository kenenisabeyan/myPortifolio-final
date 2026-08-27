import React from 'react'
import kenooImg from '../../assets/kenoo.png'
import {
  FaChartPie,
  FaEye,
  FaFolderOpen,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaAward,
  FaComments,
  FaBlog,
  FaNewspaper,
  FaPhotoVideo,
  FaEnvelope,
  FaChartLine,
  FaCog,
  FaHistory
} from 'react-icons/fa'

export type TabKey =
  | 'overview'
  | 'visibility'
  | 'projects'
  | 'events-gallery'
  | 'gallery-photos'
  | 'experience'
  | 'education'
  | 'skills'
  | 'achievements'
  | 'testimonials'
  | 'blogs'
  | 'news'
  | 'media'
  | 'messages'
  | 'analytics'
  | 'settings'
  | 'audit'

interface AdminSidebarProps {
  activeTab: TabKey
  onSelectTab: (tab: TabKey) => void
  unreadMessagesCount: number
  mobileOpen?: boolean
  onCloseMobile?: () => void
}

const menuItems: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <FaChartPie size={16} /> },
  { key: 'visibility', label: 'Section Visibility', icon: <FaEye size={16} /> },
  { key: 'projects', label: 'Projects & Case Studies', icon: <FaFolderOpen size={16} /> },
  { key: 'events-gallery', label: 'Events & Recognitions', icon: <FaAward size={16} /> },
  { key: 'gallery-photos', label: 'Photo Gallery CMS', icon: <FaPhotoVideo size={16} /> },
  { key: 'experience', label: 'Experience', icon: <FaBriefcase size={16} /> },
  { key: 'education', label: 'Education', icon: <FaGraduationCap size={16} /> },
  { key: 'skills', label: 'Skills & Capabilities', icon: <FaCode size={16} /> },
  { key: 'achievements', label: 'Achievements', icon: <FaAward size={16} /> },
  { key: 'testimonials', label: 'Testimonials', icon: <FaComments size={16} /> },
  { key: 'blogs', label: 'Blog CMS', icon: <FaBlog size={16} /> },
  { key: 'news', label: 'News CMS', icon: <FaNewspaper size={16} /> },
  { key: 'media', label: 'Media Library', icon: <FaPhotoVideo size={16} /> },
  { key: 'messages', label: 'Messages', icon: <FaEnvelope size={16} /> },
  { key: 'analytics', label: 'Analytics', icon: <FaChartLine size={16} /> },
  { key: 'settings', label: 'SEO & Settings', icon: <FaCog size={16} /> },
  { key: 'audit', label: 'Audit Trail', icon: <FaHistory size={16} /> },
]

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  unreadMessagesCount,
  mobileOpen = false,
  onCloseMobile
}) => {
  const handleItemClick = (key: TabKey) => {
    onSelectTab(key)
    if (onCloseMobile) onCloseMobile()
  }

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 space-y-4">
      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)] pr-1 custom-scrollbar">
        {/* Profile Avatar Card Header */}
        <div className="p-3 rounded-2xl bg-[#040a18]/90 border border-cyan-500/30 flex items-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-3">
          <div className="relative w-10 h-10 rounded-full border-2 border-cyan-400 overflow-hidden shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            <img src={kenooImg} alt="Kenenisa Beyan" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-black text-white truncate">Kenenisa Beyan</h4>
            <p className="text-[10px] text-cyan-400 font-bold truncate">Full-Stack Engineer</p>
          </div>
        </div>

        <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400/80 flex justify-between items-center">
          <span>CMS Modules</span>
          <span className="text-[9px] text-gray-500 font-mono">v1.0</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.key
            return (
              <button
                key={item.key}
                onClick={() => handleItemClick(item.key)}
                className={`w-full flex items-center justify-between px-3.5 py-3 lg:py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/25 text-cyan-300 border border-cyan-500/40 shadow-[0_0_18px_rgba(34,211,238,0.2)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-cyan-400' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.key === 'messages' && unreadMessagesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-extrabold">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Footer info inside sidebar */}
      <div className="p-3.5 rounded-2xl bg-[#040914]/90 border border-cyan-500/20 text-[11px] text-gray-400 text-center shadow-inner">
        <p className="font-extrabold text-cyan-300">Kenenisa Beyan CMS</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Mobile &amp; Desktop Optimized</p>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile, visible on lg) */}
      <aside className="hidden lg:flex w-64 bg-[#07101f]/95 border-r border-cyan-500/20 shrink-0 min-h-[calc(100vh-4rem)] backdrop-blur-xl sticky top-16 h-[calc(100vh-4rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay & Sliding Panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Overlay */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
          />

          {/* Drawer Content */}
          <div className="relative z-10 w-72 max-w-[85vw] bg-[#07101f]/98 border-r border-cyan-500/30 h-full shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col justify-between animate-slide-right">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}

export default AdminSidebar
