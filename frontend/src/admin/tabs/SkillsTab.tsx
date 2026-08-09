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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-sm w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white">Add Technology Skill</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400"><FaTimes /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Category</label>
                <select value={editing.category || 'Frontend'} onChange={e => setEditing({ ...editing, category: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white">
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps &amp; Cloud</option>
                  <option value="AI Integration">AI Integration</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Skill / Technology Name</label>
                <input type="text" required value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="e.g. React 19" className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs text-gray-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsTab
