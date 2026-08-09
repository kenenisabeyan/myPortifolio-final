import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaStar, FaEye, FaEyeSlash, FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import { adminApi } from '../api'

interface Project {
  id: string
  slug: string
  title: string
  description: string
  image: string
  githubUrl: string
  liveUrl: string
  tech: string[]
  featured: boolean
  status: 'published' | 'draft'
  visibility: boolean
  order: number
  caseStudy?: {
    problem: string
    role: string
    engineeringWork: string[]
    challenge: string
    engineeringFocus: string[]
    result: string
    tech: string[]
  }
}

const ProjectsTab: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)

  const fetchProjects = async () => {
    try {
      const res = await adminApi.getProjects()
      setProjects(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleOpenCreate = () => {
    setEditingProject({
      title: '',
      slug: '',
      description: '',
      image: '/src/assets/edotpage.png',
      githubUrl: '',
      liveUrl: '',
      tech: ['React', 'TypeScript', 'Node.js'],
      featured: true,
      status: 'published',
      visibility: true,
      order: projects.length + 1,
      caseStudy: {
        problem: '',
        role: 'Full-Stack Software Engineer',
        engineeringWork: ['Architecture & API Design', 'State Management'],
        challenge: '',
        engineeringFocus: ['Architecture', 'Performance', 'API Design'],
        result: '',
        tech: ['React', 'Node.js']
      }
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (p: Project) => {
    setEditingProject({ ...p })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject?.title) return

    try {
      if (editingProject.id) {
        await adminApi.updateProject(editingProject.id, editingProject)
      } else {
        await adminApi.createProject(editingProject)
      }
      setModalOpen(false)
      fetchProjects()
    } catch (err: any) {
      alert(err.message || 'Failed to save project')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    try {
      await adminApi.deleteProject(id)
      fetchProjects()
    } catch (err) {
      alert('Failed to delete project')
    }
  }

  const handleToggleVisibility = async (p: Project) => {
    try {
      await adminApi.updateProject(p.id, { visibility: !p.visibility })
      fetchProjects()
    } catch (err) {
      alert('Failed to update visibility')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Projects &amp; Case Studies CMS</h1>
          <p className="text-xs text-gray-400 mt-1">Manage project deployments, case study details, tech stacks, and visibility</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 transition-all"
        >
          <FaPlus />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="p-8 text-center text-gray-400">Loading Projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`bg-[#07101f]/80 border rounded-3xl p-6 backdrop-blur-xl space-y-4 transition-all duration-300 relative ${
                p.visibility ? 'border-white/10 hover:border-cyan-500/40' : 'border-red-500/20 opacity-60 bg-black/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {p.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                        <FaStar size={10} /> Featured
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'published' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">{p.title}</h3>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleVisibility(p)}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 transition-colors"
                    title={p.visibility ? 'Hide Project' : 'Show Project'}
                  >
                    {p.visibility ? <FaEye size={14} /> : <FaEyeSlash size={14} className="text-red-400" />}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                    title="Edit Project"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Delete Project"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">{p.description}</p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {p.tech?.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-2 border-t border-white/10 text-xs">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-400">
                    <FaGithub /> GitHub
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-cyan-400 hover:underline">
                    <FaExternalLinkAlt size={10} /> Live Demo
                  </a>
                )}
                <span className="text-[10px] text-gray-500 ml-auto">
                  {p.caseStudy ? '✓ Case Study Attached' : 'No Case Study'}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {modalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative my-auto">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">
                {editingProject.id ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">Slug</label>
                  <input
                    type="text"
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    placeholder="e.g. edot"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">Short Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">Project Photo / Screenshot URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    placeholder="/src/assets/edotpage.png or https://... or /uploads/..."
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 cursor-pointer flex items-center shrink-0">
                    Upload Image
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
                            if (res.data?.url) {
                              setEditingProject({ ...editingProject, image: res.data.url })
                            }
                          } catch (err) {
                            alert('Upload failed')
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-300 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.tech?.join(', ') || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Case Study Sub-Form */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">📖 Case Study Details</h3>
                
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">Problem Statement</label>
                  <textarea
                    rows={2}
                    value={editingProject.caseStudy?.problem || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      caseStudy: { ...editingProject.caseStudy!, problem: e.target.value }
                    })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">Engineering Challenge</label>
                  <textarea
                    rows={2}
                    value={editingProject.caseStudy?.challenge || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      caseStudy: { ...editingProject.caseStudy!, challenge: e.target.value }
                    })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">Result Summary</label>
                  <input
                    type="text"
                    value={editingProject.caseStudy?.result || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      caseStudy: { ...editingProject.caseStudy!, result: e.target.value }
                    })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all"
                >
                  Save Project
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProjectsTab
