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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#091326]/95 border border-cyan-500/30 rounded-[2.5rem] shadow-[0_0_80px_rgba(6,182,212,0.2),0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden my-auto border-t-0">
            
            {/* Top Accent Glowing Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />

            <div className="p-6 sm:p-10 space-y-6 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b border-cyan-500/15 pb-5">
                <div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    ⚡ {editingProject.id ? 'UPDATE DEPLOYMENT' : 'CREATE DEPLOYMENT'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {editingProject.id ? 'Edit Project Details' : 'Create New Project'}
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Project Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      placeholder="e.g. EDOT Platform"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all duration-200 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Slug</label>
                    <input
                      type="text"
                      value={editingProject.slug || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                      placeholder="e.g. edot"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all duration-200 outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Short Description</label>
                  <textarea
                    rows={3}
                    required
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    placeholder="Enter project summary..."
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl p-4 shadow-inner transition-all duration-200 outline-none font-medium leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Project Photo / Screenshot URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={editingProject.image || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      placeholder="/src/assets/edotpage.png or /uploads/..."
                      className="flex-1 bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all duration-200 outline-none font-medium"
                    />
                    <label className="px-5 py-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-400 text-xs font-bold transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center gap-2 cursor-pointer shrink-0">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">
                      GitHub Repository URL <span className="text-gray-500 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="url"
                      value={editingProject.githubUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                      placeholder="https://github.com/username/repository"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all duration-200 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">
                      Live Demo / Official Website URL <span className="text-gray-500 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="url"
                      value={editingProject.liveUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                      placeholder="https://kenenisa-one.vercel.app/"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all duration-200 outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cyan-200/90 mb-2">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={editingProject.tech?.join(', ') || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value.split(',').map(s => s.trim()) })}
                    placeholder="React, Next.js, TypeScript, PostgreSQL"
                    className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-2xl px-4 py-3 shadow-inner transition-all duration-200 outline-none font-medium"
                  />
                </div>

                {/* Case Study Sub-Card */}
                <div className="bg-[#040a18]/70 border border-cyan-500/20 rounded-2xl p-6 space-y-4 shadow-inner">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 py-1.5 px-4 rounded-full w-max">
                    <span>📖 CASE STUDY DETAILS</span>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Problem Statement</label>
                    <textarea
                      rows={2}
                      value={editingProject.caseStudy?.problem || ''}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        caseStudy: { ...editingProject.caseStudy!, problem: e.target.value }
                      })}
                      placeholder="What problem does this project address?"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-xl p-3 shadow-inner transition-all outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Engineering Challenge</label>
                    <textarea
                      rows={2}
                      value={editingProject.caseStudy?.challenge || ''}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        caseStudy: { ...editingProject.caseStudy!, challenge: e.target.value }
                      })}
                      placeholder="What technical architectural challenge did you solve?"
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-xl p-3 shadow-inner transition-all outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Result Summary</label>
                    <input
                      type="text"
                      value={editingProject.caseStudy?.result || ''}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        caseStudy: { ...editingProject.caseStudy!, result: e.target.value }
                      })}
                      placeholder="Outcome or platform impact..."
                      className="w-full bg-[#040914]/90 border border-cyan-500/25 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25 text-sm text-gray-100 placeholder-gray-500 rounded-xl px-4 py-2.5 shadow-inner transition-all outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 border-t border-cyan-500/15 pt-5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-bold text-gray-300 hover:text-white transition-all text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-black font-extrabold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transform hover:-translate-y-0.5 transition-all duration-200 text-center"
                  >
                    Save Project
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

export default ProjectsTab
