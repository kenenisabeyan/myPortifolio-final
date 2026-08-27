import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCamera, FaTag, FaCalendarAlt } from 'react-icons/fa'
import { adminApi } from '../api'

interface PhotoItem {
  id: string
  title: string
  category: string
  photoUrl: string
  caption: string
  date: string
  visibility: boolean
  order: number
}

const GalleryPhotosTab: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<PhotoItem> | null>(null)

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const res = await adminApi.getCustomEndpoint('gallery-photos')
      setPhotos(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  const handleCreate = () => {
    setEditing({
      title: '',
      category: 'Events',
      photoUrl: '/src/assets/home-page.png',
      caption: '',
      date: '',
      visibility: true,
      order: photos.length + 1
    })
    setModalOpen(true)
  }

  const handleEdit = (item: PhotoItem) => {
    setEditing({ ...item })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing?.title) return

    try {
      if (editing.id) {
        await adminApi.updateCustomEndpointItem('gallery-photos', editing.id, editing)
      } else {
        await adminApi.createCustomEndpointItem('gallery-photos', editing)
      }
      setModalOpen(false)
      fetchPhotos()
    } catch (err) {
      alert('Failed to save photo')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete photo "${title}"?`)) return
    try {
      await adminApi.deleteCustomEndpointItem('gallery-photos', id)
      fetchPhotos()
    } catch (err) {
      alert('Failed to delete photo')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Photo &amp; Media Gallery CMS</h1>
          <p className="text-xs text-gray-400 mt-1">Upload event photos, certificates, project screenshots, captions, and categories</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all"
        >
          <FaPlus /> Add New Photo
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">Loading Photo Gallery...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item) => (
            <div key={item.id} className="bg-[#07101f]/80 border border-white/10 rounded-3xl p-4 backdrop-blur-xl space-y-3">
              <div className="h-40 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative">
                <img src={item.photoUrl || '/src/assets/home-page.png'} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-cyan-500/90 text-black text-[10px] font-black uppercase">
                  {item.category || 'Events'}
                </span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                    <FaCalendarAlt size={10} /> {item.date || 'No Date'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20">
                    <FaEdit size={12} />
                  </button>
                  <button onClick={() => handleDelete(item.id, item.title)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-2">{item.caption}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#091326]/95 border border-cyan-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(6,182,212,0.2),0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden my-auto border-t-0">
            
            {/* Top Accent Glowing Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

            <div className="p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b border-cyan-500/15 pb-4">
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    🖼️ {editing.id ? 'UPDATE GALLERY PHOTO' : 'ADD GALLERY PHOTO'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {editing.id ? 'Edit Photo Details' : 'Add Photo to Gallery'}
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Photo Title</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ''}
                    onChange={e => setEditing({ ...editing, title: e.target.value })}
                    placeholder="e.g. MinT Incubation Award Ceremony"
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Category</label>
                    <select
                      value={editing.category || 'Events'}
                      onChange={e => setEditing({ ...editing, category: e.target.value })}
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                    >
                      <option value="Events" className="bg-[#091326] text-white">Events</option>
                      <option value="Projects" className="bg-[#091326] text-white">Projects</option>
                      <option value="Certificates" className="bg-[#091326] text-white">Certificates</option>
                      <option value="Community" className="bg-[#091326] text-white">Community</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Date</label>
                    <input
                      type="text"
                      value={editing.date || ''}
                      onChange={e => setEditing({ ...editing, date: e.target.value })}
                      placeholder="e.g. February 2025"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Photo Image URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={editing.photoUrl || ''}
                      onChange={e => setEditing({ ...editing, photoUrl: e.target.value })}
                      placeholder="/src/assets/home-page.png or /uploads/..."
                      className="flex-1 bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                    />
                    <label className="px-5 py-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-400 text-xs font-bold transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center gap-2 cursor-pointer shrink-0">
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
                              if (res.data?.url) setEditing({ ...editing, photoUrl: res.data.url })
                            } catch (err) { alert('Upload failed') }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Caption / Notes</label>
                  <textarea
                    rows={2}
                    value={editing.caption || ''}
                    onChange={e => setEditing({ ...editing, caption: e.target.value })}
                    placeholder="Enter photo caption..."
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
                    Save Photo
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

export default GalleryPhotosTab
