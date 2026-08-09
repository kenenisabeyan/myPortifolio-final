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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-white">{editing.id ? 'Edit Article' : 'Create Article'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400"><FaTimes /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Article Title</label>
                <input type="text" required value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Slug</label>
                  <input type="text" value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="architecting-scalable-systems" className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Status</label>
                  <select value={editing.status || 'draft'} onChange={e => setEditing({ ...editing, status: e.target.value as any })} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Short Excerpt</label>
                <textarea rows={2} value={editing.excerpt || ''} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Markdown Content</label>
                <textarea rows={8} value={editing.content || ''} onChange={e => setEditing({ ...editing, content: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white font-mono" />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-xs text-gray-300">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs">Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogTab
