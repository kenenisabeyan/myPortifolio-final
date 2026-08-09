import React from 'react'
import { FaExternalLinkAlt, FaSignOutAlt, FaUserShield, FaCircle } from 'react-icons/fa'

interface AdminHeaderProps {
  userEmail: string
  onlineCount: number
  onLogout: () => void
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userEmail, onlineCount, onLogout }) => {
  return (
    <header className="h-16 bg-[#07101f]/90 border-b border-white/[0.08] px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl">
      {/* Left: Title / Status */}
      <div className="flex items-center gap-4">
        <h2 className="text-base font-bold text-white tracking-wide">
          Portfolio Control Center
        </h2>
        {/* Real-time online visitors badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
          <FaCircle className="text-cyan-400 animate-pulse text-[8px]" />
          <span>{onlineCount} Online Now</span>
        </div>
      </div>

      {/* Right: User / Actions */}
      <div className="flex items-center gap-4">
        {/* View Public Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
        >
          <span>View Site</span>
          <FaExternalLinkAlt size={10} />
        </a>

        {/* User Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-medium">
          <FaUserShield size={12} className="text-cyan-400" />
          <span>{userEmail}</span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-all"
        >
          <FaSignOutAlt size={12} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
