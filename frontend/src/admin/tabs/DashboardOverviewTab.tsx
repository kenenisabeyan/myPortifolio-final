import React from 'react'
import {
  FaEye,
  FaUsers,
  FaFolderOpen,
  FaEnvelope,
  FaBlog,
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
  FaCircle
} from 'react-icons/fa'
import { adminApi } from '../api'

interface OverviewData {
  metrics: {
    totalPageViews: number
    uniqueVisitors: number
    onlineVisitors: number
    unreadMessages: number
    totalProjects: number
    totalBlogs: number
    totalNews: number
  }
  sectionViews: Record<string, number>
  visibility: Record<string, boolean>
  recentActivity: Array<{ id: string; action: string; detail: string; timestamp: string }>
  recentMessages: Array<{ id: string; name: string; email: string; subject: string; status: string; createdAt: string }>
}

interface DashboardOverviewTabProps {
  data: OverviewData | null
  onRefresh: () => void
  onNavigateTab: (tab: any) => void
}

const DashboardOverviewTab: React.FC<DashboardOverviewTabProps> = ({
  data,
  onRefresh,
  onNavigateTab
}) => {
  if (!data) {
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        Loading Dashboard Data...
      </div>
    )
  }

  const { metrics, sectionViews, visibility, recentActivity } = data

  const statCards = [
    { title: 'Total Page Views', value: metrics.totalPageViews, icon: <FaEye size={22} className="text-cyan-400" /> },
    { title: 'Unique Visitors', value: metrics.uniqueVisitors, icon: <FaUsers size={22} className="text-blue-400" /> },
    { title: 'Online Right Now', value: metrics.onlineVisitors, icon: <FaCircle size={22} className="text-emerald-400 animate-pulse" /> },
    { title: 'Unread Messages', value: metrics.unreadMessages, icon: <FaEnvelope size={22} className="text-amber-400" /> },
    { title: 'Managed Projects', value: metrics.totalProjects, icon: <FaFolderOpen size={22} className="text-purple-400" /> },
    { title: 'Published Posts', value: metrics.totalBlogs + metrics.totalNews, icon: <FaBlog size={22} className="text-pink-400" /> },
  ]

  const handleToggleSection = async (sectionKey: string, currentVal: boolean) => {
    try {
      await adminApi.toggleVisibility(sectionKey, !currentVal)
      onRefresh()
    } catch (err) {
      alert('Failed to toggle visibility')
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 md:p-8 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-xs text-gray-400 mt-1">Real-time portfolio metrics, content status, and activity tracking</p>
        </div>

        <button
          onClick={onRefresh}
          className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition-all"
        >
          🔄 Refresh Metrics
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#07101f]/80 border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl flex items-center justify-between shadow-lg hover:border-cyan-500/30 transition-all"
          >
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{card.title}</p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">{card.value}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Section Visibility Quick Controls */}
      <div className="bg-[#07101f]/80 border border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Public Section Controls</h2>
            <p className="text-xs text-gray-400">Toggle section visibility across the portfolio instantantly</p>
          </div>
          <button
            onClick={() => onNavigateTab('visibility')}
            className="text-xs text-cyan-400 hover:underline font-semibold"
          >
            Manage All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Object.entries(visibility || {}).map(([secKey, isVisible]) => (
            <button
              key={secKey}
              onClick={() => handleToggleSection(secKey, isVisible)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between ${
                isVisible
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-white'
                  : 'bg-black/40 border-white/5 text-gray-500 opacity-60'
              }`}
            >
              <span className="text-xs font-semibold capitalize truncate">{secKey.replace('-', ' ')}</span>
              {isVisible ? (
                <FaCheckCircle className="text-cyan-400 shrink-0 ml-2" size={14} />
              ) : (
                <FaTimesCircle className="text-gray-500 shrink-0 ml-2" size={14} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Popular Sections & Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Popular Sections */}
        <div className="bg-[#07101f]/80 border border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6">Popular Portfolio Sections</h2>
          <div className="space-y-4">
            {Object.entries(sectionViews).length === 0 ? (
              <p className="text-xs text-gray-500 italic">No section views recorded yet. Analytics system active.</p>
            ) : (
              Object.entries(sectionViews)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 7)
                .map(([sec, count]) => (
                  <div key={sec} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-300 capitalize">{sec.replace('-', ' ')}</span>
                      <span className="text-cyan-400 font-bold">{count} views</span>
                    </div>
                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            (count / Math.max(...Object.values(sectionViews))) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-[#07101f]/80 border border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <FaHistory className="text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Recent Audit Trail</h2>
          </div>
          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-2">
            {recentActivity.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No recent admin actions recorded.</p>
            ) : (
              recentActivity.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs">{log.detail}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  )
}

export default DashboardOverviewTab
