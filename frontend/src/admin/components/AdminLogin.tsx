import React, { useState } from 'react'
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaShieldAlt, FaArrowLeft } from 'react-icons/fa'
import { adminApi } from '../api'

interface AdminLoginProps {
  onSuccess: (user: { email: string; role: string }) => void
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('kenenisab05@gmail.com')
  const [password, setPassword] = useState('Admin@Kenenisa2025!')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await adminApi.login({ email, password })
      if (res.token) {
        localStorage.setItem('admin_token', res.token)
      }
      onSuccess(res.user)
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify your admin credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030610] text-white flex items-center justify-center p-4 relative overflow-hidden selection:bg-cyan-500/30">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Return to Portfolio Link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400/80 hover:text-cyan-300 mb-6 transition-colors group"
        >
          <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
          Return to Public Portfolio
        </a>

        {/* Card */}
        <div className="bg-[#07101f]/90 border border-white/[0.08] border-t-[6px] border-l-[6px] border-t-cyan-500 border-l-cyan-500 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <FaShieldAlt size={30} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Kenenisa Admin</h1>
            <p className="text-xs text-gray-400 mt-1 font-medium">Portfolio Content Management &amp; Control Gateway</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium leading-relaxed animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400/70">
                  <FaEnvelope size={14} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Master Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-cyan-400/70">
                  <FaLock size={14} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-11 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Authenticate & Access Gateway'
              )}
            </button>
          </form>

          {/* Secure Note */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-gray-500 leading-snug">
              🔒 HTTP-only Encrypted Session • Authorized Admin Access Only
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default AdminLogin
