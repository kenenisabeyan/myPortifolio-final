import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle, FaSyncAlt } from 'react-icons/fa'
import { adminApi } from '../api'

const allSections = [
  { key: 'hero', name: 'Hero Section', category: 'Main' },
  { key: 'overview', name: 'Overview / Bio', category: 'About' },
  { key: 'snapshot', name: 'Professional Snapshot', category: 'About' },
  { key: 'approach', name: 'Engineering Approach', category: 'Philosophy' },
  { key: 'what-i-bring', name: 'What I Bring to Your Team', category: 'Capabilities' },
  { key: 'services', name: 'Technical Skills & Services', category: 'Skills' },
  { key: 'capabilities', name: 'Engineering Capabilities', category: 'Capabilities' },
  { key: 'problems-i-solve', name: 'Problems I Solve', category: 'Capabilities' },
  { key: 'work', name: 'Featured Deployments / Work', category: 'Projects' },
  { key: 'engineering-challenges', name: 'Engineering Challenges', category: 'Projects' },
  { key: 'experience', name: 'Engineering Experience', category: 'Experience' },
  { key: 'education', name: 'Education & Academic', category: 'Experience' },
  { key: 'how-i-work', name: 'How I Work Workflow', category: 'Philosophy' },
  { key: 'currently-building', name: 'Currently Building & Learning', category: 'Status' },
  { key: 'achievements', name: 'Achievements & Recognition', category: 'Experience' },
  { key: 'github-activity', name: 'Engineering Activity / GitHub', category: 'Status' },
  { key: 'testimonials', name: 'Client Testimonials', category: 'Feedback' },
  { key: 'career-direction', name: 'Career Direction', category: 'Main' },
  { key: 'contact', name: 'Contact Section', category: 'Main' },
]

const ContentManagerTab: React.FC = () => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  const fetchVisibility = async () => {
    try {
      const res = await adminApi.getVisibility()
      setVisibility(res.data || {})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVisibility()
  }, [])

  const handleToggle = async (key: string, current: boolean) => {
    try {
      const updated = await adminApi.toggleVisibility(key, !current)
      setVisibility(updated.data)
    } catch (err) {
      alert('Failed to update visibility')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Public Section Visibility Manager</h1>
          <p className="text-xs text-gray-400 mt-1">Control which of the 20 public portfolio sections are active or hidden dynamically</p>
        </div>

        <button
          onClick={fetchVisibility}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-cyan-400"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">Loading Visibility Matrix...</div>
      ) : (
        <div className="bg-[#07101f]/80 border border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSections.map((sec) => {
              const isVisible = visibility[sec.key] !== false
              return (
                <div
                  key={sec.key}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isVisible
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-white'
                      : 'bg-black/40 border-red-500/20 text-gray-500 opacity-60'
                  }`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400/80 block mb-0.5">
                      {sec.category}
                    </span>
                    <h4 className="text-xs font-bold text-white">{sec.name}</h4>
                    <span className="text-[10px] text-gray-400 font-mono">#{sec.key}</span>
                  </div>

                  <button
                    onClick={() => handleToggle(sec.key, isVisible)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isVisible
                        ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30'
                        : 'bg-red-500/20 border-red-500/40 text-red-300 hover:bg-red-500/30'
                    }`}
                  >
                    {isVisible ? (
                      <>
                        <FaEye size={12} />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <FaEyeSlash size={12} />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}

export default ContentManagerTab
