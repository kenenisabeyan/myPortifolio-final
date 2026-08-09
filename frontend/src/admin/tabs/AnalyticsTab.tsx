import React from 'react'
import { FaChartBar, FaDesktop, FaMobileAlt, FaGlobe, FaDownload, FaMousePointer } from 'react-icons/fa'

interface AnalyticsTabProps {
  overviewData: any
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ overviewData }) => {
  const metrics = overviewData?.metrics || { totalPageViews: 0, uniqueVisitors: 0 }
  const sectionViews = overviewData?.sectionViews || {}

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Portfolio Analytics &amp; Visitor Insights</h1>
          <p className="text-xs text-gray-400 mt-1">Privacy-preserving aggregated statistics on portfolio traffic, section views, and interactions</p>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#07101f]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
          <p className="text-[11px] font-semibold text-gray-400 uppercase">Total Page Views</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">{metrics.totalPageViews}</h3>
        </div>
        <div className="bg-[#07101f]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
          <p className="text-[11px] font-semibold text-gray-400 uppercase">Unique Sessions</p>
          <h3 className="text-2xl font-extrabold text-cyan-400 mt-1">{metrics.uniqueVisitors}</h3>
        </div>
        <div className="bg-[#07101f]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
          <p className="text-[11px] font-semibold text-gray-400 uppercase">Active Visitors Online</p>
          <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">{metrics.onlineVisitors || 0}</h3>
        </div>
        <div className="bg-[#07101f]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
          <p className="text-[11px] font-semibold text-gray-400 uppercase">Resume Downloads</p>
          <h3 className="text-2xl font-extrabold text-amber-400 mt-1">12</h3>
        </div>
      </div>

      {/* Section View Duration & Performance */}
      <div className="bg-[#07101f]/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <FaChartBar className="text-cyan-400" /> Section Engagement Breakdown
        </h2>

        <div className="space-y-3">
          {Object.entries(sectionViews).length === 0 ? (
            <p className="text-xs text-gray-500 italic">No section engagement data collected yet.</p>
          ) : (
            Object.entries(sectionViews).map(([sec, count]) => (
              <div key={sec} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white capitalize">{sec.replace('-', ' ')}</span>
                  <span className="text-cyan-400">{count as number} views</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${Math.min(100, ((count as number) / 20) * 100)}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsTab
