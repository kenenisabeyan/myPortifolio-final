import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash, FaSyncAlt, FaEdit, FaSave, FaCheck } from 'react-icons/fa'
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
  { key: 'events-gallery', name: 'Events & Recognition Gallery', category: 'Experience' },
  { key: 'achievements-and-events', name: 'Achievements & Events Master Section', category: 'Experience' },
  { key: 'gallery-section', name: 'Photo & Media Gallery', category: 'Experience' },
  { key: 'github-activity', name: 'Engineering Activity / GitHub', category: 'Status' },
  { key: 'testimonials', name: 'Client Testimonials', category: 'Feedback' },
  { key: '3d-planets', name: '3D Rotating Tech Planets', category: 'Main' },
  { key: 'architecture-standards', name: 'Architecture & Quality Standards', category: 'Philosophy' },
  { key: 'blogs', name: 'Technical Writings & Articles', category: 'Status' },
  { key: 'contact', name: 'Contact Section', category: 'Main' },
]

const ContentManagerTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'visibility' | 'text'>('visibility')
  const [visibility, setVisibility] = useState<Record<string, boolean>>({})
  const [sectionContent, setSectionContent] = useState<Record<string, any>>({})
  const [selectedSection, setSelectedSection] = useState<string>('hero')
  const [editingContent, setEditingContent] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [visRes, contentRes] = await Promise.all([
        adminApi.getVisibility(),
        adminApi.getSectionContent().catch(() => ({ data: {} }))
      ])
      setVisibility(visRes.data || {})
      const content = contentRes.data || {}
      setSectionContent(content)
      setEditingContent(content[selectedSection] || {})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (sectionContent[selectedSection]) {
      setEditingContent(sectionContent[selectedSection])
    } else {
      setEditingContent({})
    }
  }, [selectedSection, sectionContent])

  const handleToggleVisibility = async (key: string, current: boolean) => {
    try {
      const updated = await adminApi.toggleVisibility(key, !current)
      setVisibility(updated.data)
    } catch (err) {
      alert('Failed to update visibility')
    }
  }

  const handleSaveSectionContent = async () => {
    try {
      setSaving(true)
      setSavedSuccess(false)
      await adminApi.updateSingleSectionContent(selectedSection, editingContent)
      setSectionContent((prev) => ({
        ...prev,
        [selectedSection]: editingContent,
      }))
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } catch (err) {
      alert('Failed to save section content')
    } finally {
      setSaving(false)
    }
  }

  const updateNestedField = (field: string, value: any) => {
    setEditingContent((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Content &amp; Visibility Manager</h1>
          <p className="text-xs text-gray-400 mt-1">Control visibility and edit text contents across all 20 public portfolio sections</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveSubTab('visibility')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === 'visibility'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Visibility Matrix
            </button>
            <button
              onClick={() => setActiveSubTab('text')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === 'text'
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Section Text Editor
            </button>
          </div>

          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-cyan-400"
          >
            <FaSyncAlt /> Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">Loading Section Manager...</div>
      ) : activeSubTab === 'visibility' ? (
        /* VISIBILITY TAB */
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
                    onClick={() => handleToggleVisibility(sec.key, isVisible)}
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
      ) : (
        /* SECTION TEXT EDITOR TAB */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Section Selector Sidebar */}
          <div className="bg-[#07101f]/80 border border-white/[0.08] rounded-3xl p-4 backdrop-blur-xl space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 px-3 py-2">Select Section</h3>
            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
              {allSections.map((sec) => (
                <button
                  key={sec.key}
                  onClick={() => setSelectedSection(sec.key)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all ${
                    selectedSection === sec.key
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md'
                      : 'bg-black/20 border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{sec.name}</span>
                  <FaEdit size={12} className={selectedSection === sec.key ? 'text-cyan-400' : 'text-gray-600'} />
                </button>
              ))}
            </div>
          </div>

          {/* Section Form Content */}
          <div className="lg:col-span-3 bg-[#07101f]/80 border border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 block mb-1">
                  Editing Section Content
                </span>
                <h2 className="text-lg font-bold text-white">
                  {allSections.find((s) => s.key === selectedSection)?.name || selectedSection}
                </h2>
              </div>

              <button
                onClick={handleSaveSectionContent}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                {savedSuccess ? (
                  <>
                    <FaCheck /> Saved!
                  </>
                ) : saving ? (
                  'Saving...'
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </div>

            {/* Dynamic Fields for Selected Section */}
            <div className="space-y-4">
              {Object.keys(editingContent || {}).length === 0 ? (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-xs">
                  No custom text properties configured for this section yet. You can add key-value fields below.
                </div>
              ) : null}

              {Object.entries(editingContent || {}).map(([key, val]) => {
                if (typeof val === 'string') {
                  const isLongText = val.length > 60 || key.toLowerCase().includes('desc') || key.toLowerCase().includes('paragraph') || key.toLowerCase().includes('quote')
                  return (
                    <div key={key} className="space-y-1.5">
                      <label className="text-xs font-bold text-cyan-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                      {isLongText ? (
                        <textarea
                          rows={3}
                          value={val}
                          onChange={(e) => updateNestedField(key, e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-cyan-400 focus:outline-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => updateNestedField(key, e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-cyan-400 focus:outline-none"
                        />
                      )}
                    </div>
                  )
                }

                if (Array.isArray(val)) {
                  return (
                    <div key={key} className="space-y-3 pt-2">
                      <label className="text-xs font-bold text-cyan-300 capitalize block border-b border-white/10 pb-1">
                        {key.replace(/([A-Z])/g, ' $1')} (List Items: {val.length})
                      </label>
                      <div className="space-y-3">
                        {val.map((item, itemIdx) => (
                          <div key={itemIdx} className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                            {typeof item === 'string' ? (
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const updatedArr = [...val]
                                  updatedArr[itemIdx] = e.target.value
                                  updateNestedField(key, updatedArr)
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                              />
                            ) : typeof item === 'object' && item !== null ? (
                              Object.entries(item).map(([subKey, subVal]) => (
                                <div key={subKey} className="space-y-1">
                                  <span className="text-[10px] font-semibold text-gray-400 uppercase">{subKey}</span>
                                  {typeof subVal === 'string' && subVal.length > 50 ? (
                                    <textarea
                                      rows={2}
                                      value={subVal as string}
                                      onChange={(e) => {
                                        const updatedArr = [...val]
                                        updatedArr[itemIdx] = { ...updatedArr[itemIdx], [subKey]: e.target.value }
                                        updateNestedField(key, updatedArr)
                                      }}
                                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                                    />
                                  ) : (
                                    <input
                                      type="text"
                                      value={subVal as string}
                                      onChange={(e) => {
                                        const updatedArr = [...val]
                                        updatedArr[itemIdx] = { ...updatedArr[itemIdx], [subKey]: e.target.value }
                                        updateNestedField(key, updatedArr)
                                      }}
                                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                                    />
                                  )}
                                </div>
                              ))
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }

                return null
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ContentManagerTab
