import React, { useEffect } from 'react'
import { FaTimes, FaCheckCircle, FaLaptopCode, FaExclamationTriangle, FaChartLine, FaLayerGroup } from 'react-icons/fa'

export interface CaseStudyData {
  title: string
  problem: string
  role: string
  engineeringWork: string[]
  challenge: string
  engineeringFocus: string[]
  result: string
  tech: string[]
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  caseStudy: CaseStudyData | null
}

const ProjectCaseStudyModal: React.FC<ModalProps> = ({ isOpen, onClose, caseStudy }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !caseStudy) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#07101f] dark:bg-[#020817] border border-white/[0.1] border-l-cyan-500 border-t-cyan-500 border-l-[6px] border-t-[6px] rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_25px_90px_rgba(34,211,238,0.25)] text-white backdrop-blur-xl my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-300 z-20"
        >
          <FaTimes size={18} />
        </button>

        {/* Header Badge & Title */}
        <div className="mb-8 pr-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
            <span>❖</span> Engineering Case Study
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            {caseStudy.title}
          </h2>
          <p className="text-cyan-400 font-semibold text-sm md:text-base mt-2">
            Role: {caseStudy.role}
          </p>
        </div>

        {/* Modal Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Problem Card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-cyan-400 font-bold mb-3 text-lg">
              <FaExclamationTriangle className="text-cyan-400" />
              <h3>Problem</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>

          {/* Qualitative Result Card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-emerald-400 font-bold mb-3 text-lg">
              <FaChartLine className="text-emerald-400" />
              <h3>Engineering Result</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {caseStudy.result}
            </p>
          </div>

        </div>

        {/* Engineering Work List */}
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl mb-8">
          <div className="flex items-center gap-3 text-blue-400 font-bold mb-4 text-lg">
            <FaLaptopCode size={20} />
            <h3>Core Engineering Execution</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caseStudy.engineeringWork.map((item, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-200 gap-3">
                <FaCheckCircle className="text-cyan-400 shrink-0 mt-1" size={14} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Engineering Challenge */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
          <div className="flex items-center gap-3 text-purple-400 font-bold mb-3 text-lg">
            <FaLayerGroup size={20} />
            <h3>Key Technical Challenge</h3>
          </div>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {caseStudy.challenge}
          </p>
        </div>

        {/* Engineering Focus & Stack */}
        <div className="flex flex-col gap-6 pt-4 border-t border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-3">
              Engineering Focus Flow
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {caseStudy.engineeringFocus.map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-lg text-xs font-semibold">
                    {step}
                  </span>
                  {idx < caseStudy.engineeringFocus.length - 1 && (
                    <span className="text-gray-500 text-xs">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-3">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tech.map((t, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/10 border border-white/10 text-gray-200 rounded-full text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProjectCaseStudyModal
