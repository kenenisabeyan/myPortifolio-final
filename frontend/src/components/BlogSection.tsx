import React, { useState } from 'react'
import { FaBookOpen, FaCalendarAlt, FaUser, FaEye, FaTimes, FaArrowRight } from 'react-icons/fa'
import { usePortfolioData } from '../context/PortfolioContext'

const BlogSection: React.FC = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const blogs = data?.blogs || []
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null)

  if (visibility.blogs === false || blogs.length === 0) return null

  return (
    <section id="blogs" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-transparent dark:border-t dark:border-white/[0.05]">
      <div className="max-w-[1700px] mx-auto flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-cyan-950/40 border border-gray-200 dark:border-cyan-500/20 py-2.5 px-6 rounded-full mb-6 w-max shadow-sm dark:shadow-[0_0_25px_rgba(34,211,238,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse">❖</span>
            <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-100">Engineering Insights</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-4">
            Technical Articles <span className="text-cyan-400">&amp; Writings</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mt-2">
            Deep dives into full-stack software development, database design, system performance, and clean code standards.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <div 
              key={blog.id || blog._id}
              className="group bg-[#07101f]/90 dark:bg-[#020817]/95 border border-white/[0.08] border-l-cyan-500 border-t-cyan-500 border-l-[6px] border-t-[6px] rounded-[2rem] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(34,211,238,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-cyan-400 font-medium mb-3">
                  <span className="flex items-center gap-1"><FaCalendarAlt size={12} /> {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Recent'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FaUser size={12} /> {blog.author || 'Kenenisa Beyan'}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt || blog.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FaEye size={12} /> {blog.views || 100}+ Reads
                </span>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Read Article</span>
                  <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#07101f] border border-white/10 border-t-[6px] border-t-cyan-500 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 space-y-6 shadow-2xl relative my-auto">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-3 text-xs text-cyan-400 font-semibold mb-2">
                  <span>{selectedBlog.author || 'Kenenisa Beyan'}</span>
                  <span>•</span>
                  <span>{selectedBlog.publishedAt ? new Date(selectedBlog.publishedAt).toLocaleDateString() : 'Published Article'}</span>
                </div>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {selectedBlog.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedBlog(null)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white shrink-0 ml-4"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="text-gray-300 text-sm leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {selectedBlog.content || selectedBlog.excerpt}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}

export default BlogSection
