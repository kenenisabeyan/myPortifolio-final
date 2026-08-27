import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaAward, FaCalendarAlt, FaBullhorn } from 'react-icons/fa'
import { adminApi } from '../api'

interface EventItem {
  id: string
  title: string
  campaignName: string
  eventDate: string
  description: string
  photoUrl: string
  recognitionBadge: string
  visibility: boolean
  order: number
}

const EventsGalleryTab: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<EventItem> | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const res = await adminApi.getCustomEndpoint('events-gallery')
      setEvents(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleCreate = () => {
    setEditing({
      title: '',
      campaignName: '',
      eventDate: '',
      description: '',
      photoUrl: '/src/assets/home-page.png',
      recognitionBadge: 'Recognized Fellow',
      visibility: true,
      order: events.length + 1
    })
    setModalOpen(true)
  }

  const handleEdit = (item: EventItem) => {
    setEditing({ ...item })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing?.title) return

    try {
      if (editing.id) {
        await adminApi.updateCustomEndpointItem('events-gallery', editing.id, editing)
      } else {
        await adminApi.createCustomEndpointItem('events-gallery', editing)
      }
      setModalOpen(false)
      fetchEvents()
    } catch (err) {
      alert('Failed to save event')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete event "${title}"?`)) return
    try {
      await adminApi.deleteCustomEndpointItem('events-gallery', id)
      fetchEvents()
    } catch (err) {
      alert('Failed to delete event')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Events &amp; Recognition Gallery CMS</h1>
          <p className="text-xs text-gray-400 mt-1">Manage recognized events, campaign invitations, photos, event dates, and awards</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all"
        >
          <FaPlus /> Add Recognized Event
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">Loading Events Gallery...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((item) => (
            <div key={item.id} className="bg-[#07101f]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 mb-2">
                    <FaAward /> {item.recognitionBadge || 'Recognition'}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20">
                    <FaEdit size={14} />
                  </button>
                  <button onClick={() => handleDelete(item.id, item.title)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>

              <div className="text-xs space-y-1 text-gray-400">
                <p className="flex items-center gap-2 font-bold text-cyan-300">
                  <FaBullhorn size={11} /> {item.campaignName || 'No Campaign Name'}
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt size={11} /> {item.eventDate || 'No Date Specified'}
                </p>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">{item.description}</p>
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
                    🏆 {editing.id ? 'UPDATE RECOGNITION' : 'ADD RECOGNITION'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {editing.id ? 'Edit Recognized Event' : 'Add Recognized Event'}
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Event Title</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ''}
                    onChange={e => setEditing({ ...editing, title: e.target.value })}
                    placeholder="e.g. MinT Startup Innovation Recognition Summit"
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Preparing Campaign / Organizer Name</label>
                  <input
                    type="text"
                    required
                    value={editing.campaignName || ''}
                    onChange={e => setEditing({ ...editing, campaignName: e.target.value })}
                    placeholder="e.g. Ministry of Innovation & Technology (MinT) & KOICA Campaign"
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Event Date &amp; Day</label>
                    <input
                      type="text"
                      required
                      value={editing.eventDate || ''}
                      onChange={e => setEditing({ ...editing, eventDate: e.target.value })}
                      placeholder="e.g. February 14, 2025"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Recognition Badge / Award</label>
                    <input
                      type="text"
                      value={editing.recognitionBadge || ''}
                      onChange={e => setEditing({ ...editing, recognitionBadge: e.target.value })}
                      placeholder="e.g. Startup Fellow Award"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Event Photo / Screenshot URL</label>
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Recognition Description</label>
                  <textarea
                    rows={3}
                    required
                    value={editing.description || ''}
                    onChange={e => setEditing({ ...editing, description: e.target.value })}
                    placeholder="Enter recognition details..."
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
                    Save Event
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

export default EventsGalleryTab
