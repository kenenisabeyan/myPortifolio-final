import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'
import { adminApi } from '../api'

interface ExperienceItem {
  id: string
  title: string
  company: string
  period: string
  responsibilities: string[]
  visibility: boolean
  order: number
}

const ExperienceTab: React.FC = () => {
  const [items, setItems] = useState<ExperienceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<ExperienceItem> | null>(null)

  const fetchItems = async () => {
    try {
      const res = await adminApi.getExperiences()
      setItems(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const handleCreate = () => {
    setEditing({
      title: '',
      company: 'at ',
      period: '2025 - Present',
      responsibilities: ['Architecting scalable systems'],
      visibility: true,
      order: items.length + 1
    })
    setModalOpen(true)
  }

  const handleEdit = (item: ExperienceItem) => {
    setEditing({ ...item })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing?.title) return

    try {
      if (editing.id) {
        await adminApi.updateExperience(editing.id, editing)
      } else {
        await adminApi.createExperience(editing)
      }
      setModalOpen(false)
      fetchItems()
    } catch (err) {
      alert('Failed to save experience entry')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete experience "${title}"?`)) return
    try {
      await adminApi.deleteExperience(id)
      fetchItems()
    } catch (err) {
      alert('Failed to delete')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Engineering Experience CMS</h1>
          <p className="text-xs text-gray-400 mt-1">Manage career timeline roles, responsibilities, and visibility</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all">
          <FaPlus /> Add Role
        </button>
      </div>

      {loading ? <div className="p-8 text-center text-gray-400">Loading Experience...</div> : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-[#07101f]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <span className="text-xs font-semibold text-cyan-400">{item.company}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-300">{item.period}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                  {item.responsibilities?.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"><FaEdit size={14} /></button>
                <button onClick={() => handleDelete(item.id, item.title)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"><FaTrash size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#091326]/95 border border-cyan-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(6,182,212,0.2),0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden my-auto border-t-0">
            
            {/* Top Accent Glowing Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

            <div className="p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b border-cyan-500/15 pb-4">
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    💼 {editing.id ? 'UPDATE EXPERIENCE' : 'ADD EXPERIENCE'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {editing.id ? 'Edit Experience Details' : 'Add Experience Entry'}
                  </h2>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/20 text-gray-400 hover:text-white transition-all flex items-center justify-center shrink-0"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Job Title / Role</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ''}
                    onChange={e => setEditing({ ...editing, title: e.target.value })}
                    placeholder="e.g. Founder & Lead Engineer"
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Company / Organization</label>
                    <input
                      type="text"
                      required
                      value={editing.company || ''}
                      onChange={e => setEditing({ ...editing, company: e.target.value })}
                      placeholder="e.g. EDOT Tech Platform"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Period / Duration</label>
                    <input
                      type="text"
                      required
                      value={editing.period || ''}
                      onChange={e => setEditing({ ...editing, period: e.target.value })}
                      placeholder="e.g. 2024 - Present"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Responsibilities (one per line)</label>
                  <textarea
                    rows={4}
                    value={editing.responsibilities?.join('\n') || ''}
                    onChange={e => setEditing({ ...editing, responsibilities: e.target.value.split('\n').filter(Boolean) })}
                    placeholder="Designed backend RESTful APIs&#10;Architected multi-role authentication"
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl p-4 shadow-inner transition-all outline-none font-medium leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-4 border-t border-cyan-500/15 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-bold text-gray-300 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-extrabold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Save Experience
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExperienceTab
