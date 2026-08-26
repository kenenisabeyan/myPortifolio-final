import React, { useState, useEffect } from 'react'
import { FaSave, FaLock, FaGlobe } from 'react-icons/fa'
import { adminApi } from '../api'

const SeoSettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    siteTitle: 'Kenenisa Beyan — Full-Stack Software Engineer',
    metaDescription: 'Kenenisa Beyan is a Full-Stack Software Engineer building scalable, production-grade digital products and modern web platforms.',
    contactEmail: 'kenenisab05@gmail.com',
    githubUrl: 'https://github.com/kenenisabeyan',
    linkedinUrl: 'https://www.linkedin.com/in/kenenisa/',
    twitterUrl: 'https://twitter.com/kenenisa94931',
    googleSiteVerification: '',
    bingSiteVerification: '',
  })

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null)
  const [savedStatus, setSavedStatus] = useState<string | null>(null)

  useEffect(() => {
    adminApi.getSettings().then(res => {
      if (res.data) setSettings(res.data)
    }).catch(console.error)
  }, [])

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await adminApi.updateSettings(settings)
      setSavedStatus('Settings saved successfully!')
      setTimeout(() => setSavedStatus(null), 3000)
    } catch (err) {
      alert('Failed to save settings')
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordStatus(null)

    try {
      await adminApi.changePassword({ currentPassword, newPassword })
      setPasswordStatus('✅ Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err: any) {
      setPasswordStatus(`❌ ${err.message || 'Failed to change password'}`)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">SEO, Brand &amp; Security Settings</h1>
          <p className="text-xs text-gray-400 mt-1">Configure global search metadata, social links, search console codes, and admin password</p>
        </div>
      </div>

      {savedStatus && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          {savedStatus}
        </div>
      )}

      {/* SEO & Site Metadata Form */}
      <div className="bg-[#07101f]/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <FaGlobe className="text-cyan-400" /> Global Portfolio SEO &amp; Brand Settings
        </h2>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Global Site Title</label>
            <input
              type="text"
              value={settings.siteTitle || ''}
              onChange={e => setSettings({ ...settings, siteTitle: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Meta Description</label>
            <textarea
              rows={3}
              value={settings.metaDescription || ''}
              onChange={e => setSettings({ ...settings, metaDescription: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Favicon Icon URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.faviconUrl || ''}
                  onChange={e => setSettings({ ...settings, faviconUrl: e.target.value })}
                  placeholder="/favicon.ico or /uploads/..."
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
                          if (res.data?.url) setSettings({ ...settings, faviconUrl: res.data.url })
                        } catch (err) { alert('Upload failed') }
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Hero Profile Photo URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.heroPhotoUrl || ''}
                  onChange={e => setSettings({ ...settings, heroPhotoUrl: e.target.value })}
                  placeholder="/src/assets/keno.jpg or /uploads/..."
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
                          if (res.data?.url) setSettings({ ...settings, heroPhotoUrl: res.data.url })
                        } catch (err) { alert('Upload failed') }
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">About Graphic Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.aboutPhotoUrl || ''}
                  onChange={e => setSettings({ ...settings, aboutPhotoUrl: e.target.value })}
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
                          if (res.data?.url) setSettings({ ...settings, aboutPhotoUrl: res.data.url })
                        } catch (err) { alert('Upload failed') }
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">GitHub Profile Link</label>
              <input
                type="url"
                value={settings.githubUrl || ''}
                onChange={e => setSettings({ ...settings, githubUrl: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">LinkedIn Profile Link</label>
              <input
                type="url"
                value={settings.linkedinUrl || ''}
                onChange={e => setSettings({ ...settings, linkedinUrl: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Twitter / X Profile Link</label>
              <input
                type="url"
                value={settings.twitterUrl || ''}
                onChange={e => setSettings({ ...settings, twitterUrl: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Google Site Verification Code</label>
              <input
                type="text"
                value={settings.googleSiteVerification || ''}
                onChange={e => setSettings({ ...settings, googleSiteVerification: e.target.value })}
                placeholder="google-site-verification-code"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Bing Webmaster Verification Code</label>
              <input
                type="text"
                value={settings.bingSiteVerification || ''}
                onChange={e => setSettings({ ...settings, bingSiteVerification: e.target.value })}
                placeholder="bing-verification-code"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs">
              <FaSave /> Save Global Settings
            </button>
          </div>
        </form>
      </div>

      {/* Admin Security & Password Change */}
      <div className="bg-[#07101f]/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <FaLock className="text-cyan-400" /> Security &amp; Password Management
        </h2>

        {passwordStatus && (
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white">
            {passwordStatus}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-gray-300 mb-1">New Password (min 8 chars)</label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs text-white"
            />
          </div>

          <button type="submit" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg">
            Update Admin Password
          </button>
        </form>
      </div>

    </div>
  )
}

export default SeoSettingsTab
