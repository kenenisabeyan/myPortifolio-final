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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-4 my-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white">
                {editing.id ? 'Edit Recognized Event' : 'Add Recognized Event'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400"><FaTimes /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={editing.title || ''}
                  onChange={e => setEditing({ ...editing, title: e.target.value })}
                  placeholder="e.g. MinT Startup Innovation Recognition Summit"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Preparing Campaign / Organizer Name</label>
                <input
                  type="text"
                  required
                  value={editing.campaignName || ''}
                  onChange={e => setEditing({ ...editing, campaignName: e.target.value })}
                  placeholder="e.g. Ministry of Innovation & Technology (MinT) & KOICA Campaign"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Event Date &amp; Day</label>
                  <input
                    type="text"
                    required
                    value={editing.eventDate || ''}
                    onChange={e => setEditing({ ...editing, eventDate: e.target.value })}
                    placeholder="e.g. February 14, 2025"
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Recognition Badge / Award</label>
                  <input
                    type="text"
                    value={editing.recognitionBadge || ''}
                    onChange={e => setEditing({ ...editing, recognitionBadge: e.target.value })}
                    placeholder="e.g. Startup Fellow Award"
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Event Photo / Screenshot URL</label>
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
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Recognition Description</label>
                <textarea
                  rows={3}
                  required
                  value={editing.description || ''}
                  onChange={e => setEditing({ ...editing, description: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs text-gray-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs">Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsGalleryTab
