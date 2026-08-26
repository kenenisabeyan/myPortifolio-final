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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-lg w-full p-6 space-y-4 my-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white">
                {editing.id ? 'Edit Photo' : 'Add Photo to Gallery'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400"><FaTimes /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Photo Title</label>
                <input
                  type="text"
                  required
                  value={editing.title || ''}
                  onChange={e => setEditing({ ...editing, title: e.target.value })}
                  placeholder="e.g. MinT Incubation Award Ceremony"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Category</label>
                  <select
                    value={editing.category || 'Events'}
                    onChange={e => setEditing({ ...editing, category: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value="Events">Events</option>
                    <option value="Projects">Projects</option>
                    <option value="Certificates">Certificates</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Date</label>
                  <input
                    type="text"
                    value={editing.date || ''}
                    onChange={e => setEditing({ ...editing, date: e.target.value })}
                    placeholder="e.g. February 2025"
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Photo Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editing.photoUrl || ''}
                    onChange={e => setEditing({ ...editing, photoUrl: e.target.value })}
                    placeholder="/src/assets/home-page.png or /uploads/..."
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  />
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
                            if (res.data?.url) setEditing({ ...editing, photoUrl: res.data.url })
                          } catch (err) { alert('Upload failed') }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Caption / Notes</label>
                <textarea
                  rows={2}
                  value={editing.caption || ''}
                  onChange={e => setEditing({ ...editing, caption: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs text-gray-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs">Save Photo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPhotosTab
