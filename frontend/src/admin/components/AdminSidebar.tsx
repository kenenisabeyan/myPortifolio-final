import React from 'react'
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
  unreadMessagesCount
}) => {
  return (
    <aside className="w-64 bg-[#07101f]/95 border-r border-white/[0.08] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] p-4 backdrop-blur-xl">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400/70">
          CMS Modules
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.key
            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-cyan-400' : 'text-gray-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.key === 'messages' && unreadMessagesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-bold">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Footer info inside sidebar */}
      <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-gray-500 text-center">
        <p className="font-semibold text-gray-400">Kenenisa CMS v1.0</p>
        <p className="text-[10px] text-gray-500 mt-0.5">Secure API Connected</p>
      </div>
    </aside>
  )
}

export default AdminSidebar
