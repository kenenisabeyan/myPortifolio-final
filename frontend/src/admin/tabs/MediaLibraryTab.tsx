import React, { useState, useEffect } from 'react'
import { FaUpload, FaTrash, FaCopy, FaCheck, FaImage, FaFileAlt } from 'react-icons/fa'
import { adminApi } from '../api'

interface MediaAsset {
  id: string
  filename: string
  originalname: string
  url: string
  mimetype: string
  size: number
  altText: string
  uploadedAt: string
}

const MediaLibraryTab: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const fetchMedia = async () => {
    try {
      const res = await adminApi.getMedia()
      setMediaList(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMedia() }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    try {
      await adminApi.uploadMedia(formData)
      fetchMedia()
    } catch (err: any) {
      alert(err.message || 'File upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete media asset "${name}"?`)) return
    try {
      await adminApi.deleteMedia(id)
      fetchMedia()
    } catch (err) {
      alert('Failed to delete asset')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Upload Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Central Media Library</h1>
          <p className="text-xs text-gray-400 mt-1">Upload, store, and manage portfolio assets, project screenshots, and program photos</p>
        </div>

        <label className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer">
          {uploading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FaUpload />
              <span>Upload New Asset</span>
            </>
          )}
          <input type="file" onChange={handleFileUpload} disabled={uploading} className="hidden" accept="image/*,video/*,application/pdf" />
        </label>
      </div>

      {/* Media Grid */}
      {loading ? <div className="p-8 text-center text-gray-400">Loading Media Library...</div> : (
        mediaList.length === 0 ? (
          <div className="bg-[#07101f]/80 border border-white/10 rounded-3xl p-12 text-center text-gray-400 space-y-2">
            <FaImage size={40} className="mx-auto text-cyan-500/40 mb-2" />
            <h3 className="text-sm font-bold text-white">No Uploaded Assets Yet</h3>
            <p className="text-xs text-gray-500">Upload project screenshots or images above to use them anywhere in the portfolio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mediaList.map((m) => (
              <div key={m.id} className="bg-[#07101f]/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl group hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                
                <div className="h-32 bg-black/50 relative overflow-hidden flex items-center justify-center p-2">
                  {m.mimetype.startsWith('image/') ? (
                    <img src={m.url} alt={m.altText} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform" />
                  ) : (
                    <FaFileAlt size={32} className="text-cyan-400" />
                  )}
                </div>

                <div className="p-3 space-y-2">
                  <p className="text-[11px] font-bold text-white truncate" title={m.originalname}>{m.originalname}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span>{(m.size / 1024).toFixed(1)} KB</span>
                    <span className="uppercase text-cyan-400 font-semibold">{m.mimetype.split('/')[1]}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => handleCopyUrl(m.url, m.id)}
                      className="flex-1 py-1 px-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-cyan-300 hover:bg-cyan-500/20 flex items-center justify-center gap-1"
                    >
                      {copiedId === m.id ? <><FaCheck size={10} className="text-emerald-400" /> Copied!</> : <><FaCopy size={10} /> Copy Link</>}
                    </button>
                    <button
                      onClick={() => handleDelete(m.id, m.originalname)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )
      )}

    </div>
  )
}

export default MediaLibraryTab
