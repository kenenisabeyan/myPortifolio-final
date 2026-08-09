import React, { useState, useEffect } from 'react'
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa'
import { adminApi } from '../api'

interface NewsItem {
  id: string
  title: string
  summary: string
  category: string
  date: string
  visibility: boolean
}

const NewsTab: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<NewsItem> | null>(null)

  const fetchNews = async () => {
    try {
      const res = await adminApi.getNews()
      setNews(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchNews() }, [])

  const handleCreate = () => {
    setEditing({
      title: '',
      summary: '',
      category: 'Announcement',
      date: 'February 2025',
      visibility: true
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing?.title) return

    try {
      if (editing.id) {
        await adminApi.updateNews(editing.id, editing)
      } else {
        await adminApi.createNews(editing)
      }
      setModalOpen(false)
      fetchNews()
    } catch (err) {
      alert('Failed to save news entry')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete news item "${title}"?`)) return
    try {
      await adminApi.deleteNews(id)
      fetchNews()
    } catch (err) {
      alert('Failed to delete')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">News &amp; Press Announcements CMS</h1>
          <p className="text-xs text-gray-400 mt-1">Manage official project updates, recognition milestones, and media releases</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all">
          <FaPlus /> Add News Item
        </button>
      </div>

      {loading ? <div className="p-8 text-center text-gray-400">Loading News Items...</div> : (
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="bg-[#07101f]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold text-cyan-400">{item.category}</span>
                </div>
                <p className="text-xs text-gray-300">{item.summary}</p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button onClick={() => handleDelete(item.id, item.title)} className="p-2 rounded-lg bg-red-500/10 text-red-400"><FaTrash size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white">Add News Item</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400"><FaTimes /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Headline Title</label>
                <input type="text" required value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Summary</label>
                <textarea rows={3} required value={editing.summary || ''} onChange={e => setEditing({ ...editing, summary: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs text-gray-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs">Save News Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsTab
