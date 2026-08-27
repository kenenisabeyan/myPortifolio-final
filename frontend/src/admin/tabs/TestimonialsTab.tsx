import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaStar, FaTimes } from 'react-icons/fa'
import { adminApi } from '../api'

interface TestimonialItem {
  id: string
  name: string
  handle: string
  text: string
  rating: number
  visibility: boolean
  order: number
  avatar?: string
}

const TestimonialsTab: React.FC = () => {
  const [items, setItems] = useState<TestimonialItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<TestimonialItem> | null>(null)

  const fetchItems = async () => {
    try {
      const res = await adminApi.getTestimonials()
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
      name: '',
      handle: '@handle',
      text: '',
      rating: 5,
      visibility: true,
      order: items.length + 1
    })
    setModalOpen(true)
  }

  const handleEdit = (item: TestimonialItem) => {
    setEditing({ ...item })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing?.name || !editing?.text) return

    try {
      if (editing.id) {
        await adminApi.updateTestimonial(editing.id, editing)
      } else {
        await adminApi.createTestimonial(editing)
      }
      setModalOpen(false)
      fetchItems()
    } catch (err) {
      alert('Failed to save testimonial')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return
    try {
      await adminApi.deleteTestimonial(id)
      fetchItems()
    } catch (err) {
      alert('Failed to delete')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Client &amp; Peer Testimonials CMS</h1>
          <p className="text-xs text-gray-400 mt-1">Manage client recommendations, star ratings, and feedback quotes</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all">
          <FaPlus /> Add Testimonial
        </button>
      </div>

      {loading ? <div className="p-8 text-center text-gray-400">Loading Testimonials...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-[#07101f]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    <p className="text-[11px] text-cyan-400 font-mono">{item.handle}</p>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(item.rating || 5)].map((_, i) => <FaStar key={i} size={10} />)}
                  </div>
                </div>
                <p className="text-xs text-gray-300 italic leading-relaxed">"{item.text}"</p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"><FaEdit size={12} /></button>
                <button onClick={() => handleDelete(item.id, item.name)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"><FaTrash size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white">{editing.id ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400"><FaTimes /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Client Name</label>
                <input type="text" required value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Handle / Role</label>
                <input type="text" value={editing.handle || ''} onChange={e => setEditing({ ...editing, handle: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Avatar / Photo URL</label>
                <div className="flex gap-2">
                  <input type="text" value={editing.avatar || ''} onChange={e => setEditing({ ...editing, avatar: e.target.value })} placeholder="https://... or /uploads/..." className="flex-1 bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
                  <label className="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 cursor-pointer flex items-center shrink-0">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const formData = new FormData()
                          formData.append('file', file)
                          try {
                            const res = await adminApi.uploadMedia(formData)
                            if (res.data?.url) setEditing({ ...editing, avatar: res.data.url })
                          } catch (err) { alert('Upload failed') }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Feedback Quote</label>
                <textarea rows={4} required value={editing.text || ''} onChange={e => setEditing({ ...editing, text: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
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

export default TestimonialsTab
