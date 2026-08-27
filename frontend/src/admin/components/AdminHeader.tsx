import React from 'react'
import { FaExternalLinkAlt, FaSignOutAlt, FaUserShield, FaCircle, FaBars, FaTimes } from 'react-icons/fa'

interface AdminHeaderProps {
  userEmail: string
  onlineCount: number
  mobileOpen: boolean
  onToggleMobileMenu: () => void
  onLogout: () => void
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  userEmail,
  onlineCount,
  mobileOpen,
  onToggleMobileMenu,
  onLogout
}) => {
  return (
    <header className="h-16 bg-[#07101f]/95 border-b border-cyan-500/20 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all flex items-center justify-center"
        >
          {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-sm sm:text-base font-black text-white tracking-wide truncate max-w-[160px] sm:max-w-none">
            Control Center
          </h2>
          {/* Real-time online visitors badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-bold text-cyan-300">
            <FaCircle className="text-cyan-400 animate-pulse text-[8px]" />
            <span>{onlineCount} Online</span>
          </div>
        </div>
      </div>

      {/* Right: User & Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* View Public Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-200 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
        >
          <span>View Site</span>
          <FaExternalLinkAlt size={10} />
        </a>

        {/* User Badge (hidden on small phones) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 font-medium">
          <FaUserShield size={12} className="text-cyan-400" />
          <span className="truncate max-w-[140px]">{userEmail}</span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-extrabold text-red-400 hover:bg-red-500/20 transition-all"
        >
          <FaSignOutAlt size={12} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
