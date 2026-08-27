import React from 'react'
import { FaChartPie, FaFolderOpen, FaEdit, FaEnvelope, FaCog } from 'react-icons/fa'
import { TabKey } from './AdminSidebar'

interface AdminBottomNavProps {
  activeTab: TabKey
  onSelectTab: (tab: TabKey) => void
  unreadMessagesCount: number
}

const AdminBottomNav: React.FC<AdminBottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadMessagesCount
}) => {
  const navItems: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <FaChartPie size={18} /> },
    { key: 'projects', label: 'Projects', icon: <FaFolderOpen size={18} /> },
    { key: 'visibility', label: 'Content', icon: <FaEdit size={18} /> },
    { key: 'messages', label: 'Inbox', icon: <FaEnvelope size={18} /> },
    { key: 'settings', label: 'SEO', icon: <FaCog size={18} /> },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07101f]/95 border-t border-cyan-500/20 backdrop-blur-xl px-2 py-2 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.key
        return (
          <button
            key={item.key}
            onClick={() => onSelectTab(item.key)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all relative ${
              isActive
                ? 'text-cyan-400 font-black'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.key === 'messages' && unreadMessagesCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-cyan-500 text-black text-[9px] font-black flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-semibold truncate max-w-full">
              {item.label}
            </span>
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-0.5 animate-pulse" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default AdminBottomNav
