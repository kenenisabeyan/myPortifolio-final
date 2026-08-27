import React, { useState, useEffect } from 'react'
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa'
import { adminApi } from '../api'

interface SkillItem {
  id: string
  category: string
  name: string
  level: string
  visibility: boolean
  order: number
}

const SkillsTab: React.FC = () => {
  const [items, setItems] = useState<SkillItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<SkillItem> | null>(null)

  const fetchItems = async () => {
    try {
      const res = await adminApi.getSkills()
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
      category: 'Frontend',
      name: '',
      level: 'Advanced',
      visibility: true,
      order: items.length + 1
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing?.name) return

    try {
      if (editing.id) {
        await adminApi.updateSkill(editing.id, editing)
      } else {
        await adminApi.createSkill(editing)
      }
      setModalOpen(false)
      fetchItems()
    } catch (err) {
      alert('Failed to save skill')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return
    try {
      await adminApi.deleteSkill(id)
      fetchItems()
    } catch (err) {
      alert('Failed to delete')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Technical Skills &amp; Stack CMS</h1>
          <p className="text-xs text-gray-400 mt-1">Manage core technologies, frameworks, backend engines, and database systems</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all">
          <FaPlus /> Add Skill / Tool
        </button>
      </div>

      {loading ? <div className="p-8 text-center text-gray-400">Loading Skills...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-[#07101f]/80 border border-white/10 rounded-2xl p-4 backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400/80 block">{item.category}</span>
                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                <span className="text-[10px] text-gray-400">{item.level}</span>
              </div>
              <button onClick={() => handleDelete(item.id, item.name)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20">
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-[#091326]/95 border border-cyan-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(6,182,212,0.2),0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden my-auto border-t-0">
            
            {/* Top Accent Glowing Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex justify-between items-start border-b border-cyan-500/15 pb-4">
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    🛠️ {editing.id ? 'UPDATE SKILL' : 'ADD SKILL'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {editing.id ? 'Edit Technology Skill' : 'Add Technology Skill'}
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Category</label>
                  <select
                    value={editing.category || 'Frontend'}
                    onChange={e => setEditing({ ...editing, category: e.target.value })}
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                  >
                    <option value="Frontend" className="bg-[#091326] text-white">Frontend</option>
                    <option value="Backend" className="bg-[#091326] text-white">Backend</option>
                    <option value="Database" className="bg-[#091326] text-white">Database</option>
                    <option value="DevOps" className="bg-[#091326] text-white">DevOps & Cloud</option>
                    <option value="AI Integration" className="bg-[#091326] text-white">AI Integration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Skill / Technology Name</label>
                  <input
                    type="text"
                    required
                    value={editing.name || ''}
                    onChange={e => setEditing({ ...editing, name: e.target.value })}
                    placeholder="e.g. React 19 / PostgreSQL"
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
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
                    Save Skill
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

export default SkillsTab
