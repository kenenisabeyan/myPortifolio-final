import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaGlobe } from 'react-icons/fa'
import { adminApi } from '../api'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  status: 'published' | 'draft'
  visibility: boolean
  publishedAt: string
  views: number
}

const BlogTab: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null)

  const fetchBlogs = async () => {
    try {
      const res = await adminApi.getBlogs()
      setBlogs(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBlogs() }, [])

  const handleCreate = () => {
    setEditing({
      title: '',
      slug: '',
      excerpt: '',
      content: '# Article Heading\n\nWrite your blog content here in markdown...',
      coverImage: '/src/assets/edotpage.png',
      author: 'Kenenisa Beyan',
      status: 'draft',
      visibility: true,
      publishedAt: new Date().toISOString()
    })
    setModalOpen(true)
  }

  const handleEdit = (b: BlogPost) => {
    setEditing({ ...b })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing?.title) return

    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const payload = { ...editing, slug }

    try {
      if (editing.id) {
        await adminApi.updateBlog(editing.id, payload)
      } else {
        await adminApi.createBlog(payload)
      }
      setModalOpen(false)
      fetchBlogs()
    } catch (err) {
      alert('Failed to save blog post')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete blog post "${title}"?`)) return
    try {
      await adminApi.deleteBlog(id)
      fetchBlogs()
    } catch (err) {
      alert('Failed to delete')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Blog &amp; Technical Articles CMS</h1>
          <p className="text-xs text-gray-400 mt-1">Publish engineering insights, system architecture case studies, and tutorials</p>
        </div>
        <button onClick={handleCreate} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all">
          <FaPlus /> Write Blog Post
        </button>
      </div>

      {loading ? <div className="p-8 text-center text-gray-400">Loading Blog Posts...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((b) => (
            <div key={b.id} className="bg-[#07101f]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${b.status === 'published' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                  {b.status}
                </span>
                <span className="text-[10px] text-gray-500">{b.views || 0} views</span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{b.title}</h3>
              <p className="text-xs text-gray-300 line-clamp-2">{b.excerpt}</p>
              <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs">
                <span className="text-[10px] text-gray-400">/blog/{b.slug}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(b)} className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400"><FaEdit size={12} /></button>
                  <button onClick={() => handleDelete(b.id, b.title)} className="p-2 rounded-lg bg-red-500/10 text-red-400"><FaTrash size={12} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#091326]/95 border border-cyan-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(6,182,212,0.2),0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden my-auto border-t-0">
            
            {/* Top Accent Glowing Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

            <div className="p-6 sm:p-10 space-y-6 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b border-cyan-500/15 pb-5">
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    ✍️ {editing.id ? 'UPDATE ARTICLE' : 'CREATE ARTICLE'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {editing.id ? 'Edit Article Details' : 'Write New Article'}
                  </h2>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/20 text-gray-400 hover:text-white transition-all flex items-center justify-center shrink-0"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Article Title</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ''}
                    onChange={e => setEditing({ ...editing, title: e.target.value })}
                    placeholder="e.g. Architecting Scalable Software Systems"
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Slug</label>
                    <input
                      type="text"
                      value={editing.slug || ''}
                      onChange={e => setEditing({ ...editing, slug: e.target.value })}
                      placeholder="architecting-scalable-systems"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Status</label>
                    <select
                      value={editing.status || 'draft'}
                      onChange={e => setEditing({ ...editing, status: e.target.value as any })}
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 rounded-2xl px-4 py-3 shadow-inner transition-all outline-none font-medium"
                    >
                      <option value="draft" className="bg-[#091326] text-white">Draft</option>
                      <option value="published" className="bg-[#091326] text-white">Published</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Short Excerpt</label>
                  <textarea
                    rows={2}
                    value={editing.excerpt || ''}
                    onChange={e => setEditing({ ...editing, excerpt: e.target.value })}
                    placeholder="Enter short article summary..."
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl p-4 shadow-inner transition-all outline-none font-medium leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Markdown / Article Content</label>
                  <textarea
                    rows={8}
                    value={editing.content || ''}
                    onChange={e => setEditing({ ...editing, content: e.target.value })}
                    placeholder="Write article content here..."
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl p-4 shadow-inner transition-all outline-none font-mono leading-relaxed"
                  />
                </div>

                <div className="flex justify-end gap-4 border-t border-cyan-500/15 pt-5">
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
                    Save Article
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

export default BlogTab
