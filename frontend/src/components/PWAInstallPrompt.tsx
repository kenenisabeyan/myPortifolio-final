import React, { useState, useEffect } from 'react'
import { FaDownload, FaTimes, FaShareAlt, FaPlusSquare, FaEllipsisV, FaWifi } from 'react-icons/fa'
import appIcon from '/apple-touch-icon.png'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [showIosGuide, setShowIosGuide] = useState(false)
  const [showGenericGuide, setShowGenericGuide] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    // Online / Offline listener
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // 1. Check if currently running inside installed standalone PWA app
    const inStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://')

    if (inStandalone) {
      setIsStandalone(true)
      setShowPrompt(false)
      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }

    // 2. Listen for appinstalled event (when user completes installation)
    const handleAppInstalled = () => {
      localStorage.setItem('pwa_installed', 'true')
      setIsStandalone(true)
      setShowPrompt(false)
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    // Show install recommendation prompt for all web browser visits when app is not installed
    if (!inStandalone) {
      setShowPrompt(true)
    }

    // 4. Capture beforeinstallprompt (Android / Samsung / Tecno / Infinix / Edge / Opera)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      localStorage.removeItem('pwa_installed')
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        localStorage.setItem('pwa_installed', 'true')
        setIsStandalone(true)
        setShowPrompt(false)
      }
      setDeferredPrompt(null)
    } else if (isIos) {
      setShowIosGuide(true)
    } else {
      setShowGenericGuide(true)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (isStandalone || !showPrompt) return null

  return (
    <>
      {/* Offline Status Warning Bar */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500/90 text-black py-1.5 px-4 text-center font-bold text-xs flex items-center justify-center gap-2 backdrop-blur-md shadow-md animate-fade-in">
          <FaWifi size={13} className="animate-pulse" />
          <span>You are currently browsing offline. App content is loaded from cache.</span>
        </div>
      )}

      {/* Floating Bottom Install Card (Does NOT overlap right-side ChatBot & ScrollArrow on any screen) */}
      {!isStandalone && showPrompt && (
        <div className="fixed bottom-24 left-3 right-[5.5rem] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md z-40 transition-all duration-500 animate-slide-up">
          <div className="relative p-3 sm:p-4 rounded-2xl bg-[#060d1f]/95 backdrop-blur-2xl border-2 border-cyan-400/50 shadow-[0_10px_40px_rgba(34,211,238,0.35)] flex items-center justify-between gap-2.5 sm:gap-3 text-white overflow-hidden">
            
            {/* Animated Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-500 rounded-2xl blur-md opacity-40 -z-10 animate-pulse"></div>

            {/* App Icon */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 border-2 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.5)]">
              <img src={appIcon} alt="Kenenisa Beyan Portfolio App" className="w-full h-full object-cover" />
            </div>

            {/* Text Details */}
            <div className="flex-1 min-w-0 pr-0.5">
              <h4 className="text-[11px] sm:text-sm font-black text-white tracking-wide truncate">
                Install App
              </h4>
              <p className="text-[10px] sm:text-[11px] text-gray-300 font-medium truncate mt-0.5">
                Fast 1-tap mobile access
              </p>
            </div>

            {/* Install & Dismiss "X" Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-black text-[10px] sm:text-xs tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all flex items-center gap-1.5 active:scale-95 uppercase"
              >
                <FaDownload size={10} />
                <span>Install</span>
              </button>

              <button
                onClick={handleDismiss}
                aria-label="Close Install Prompt"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <FaTimes size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Safari Step-by-Step Installation Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#07101f] border-2 border-cyan-400/60 rounded-3xl p-6 shadow-[0_0_60px_rgba(34,211,238,0.5)] text-white relative animate-slide-up">
            <button
              onClick={() => setShowIosGuide(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
            >
              <FaTimes size={14} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.6)] mb-3">
                <img src={appIcon} alt="App Icon" className="w-full h-full object-cover" />
              </div>

              <h3 className="text-base font-black text-white">Install Kenenisa Beyan App</h3>
              <p className="text-xs text-gray-300 mt-1 mb-5">Add to your Home Screen in 3 easy steps:</p>

              <div className="w-full space-y-3.5 text-left text-xs text-gray-200 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-extrabold">1</div>
                  <p>Tap the <span className="font-bold text-cyan-300 inline-flex items-center gap-1">Share <FaShareAlt size={11} /></span> icon at the bottom of Safari.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold">2</div>
                  <p>Scroll down &amp; tap <span className="font-bold text-cyan-300 inline-flex items-center gap-1">Add to Home Screen <FaPlusSquare size={11} /></span>.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold">3</div>
                  <p>Tap <span className="font-bold text-cyan-300">Add</span> at the top right.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIosGuide(false)}
                className="mt-5 w-full py-3 rounded-xl bg-cyan-400 text-black font-black text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Android / Samsung / Tecno / Infinix Generic Guide Modal */}
      {showGenericGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#07101f] border-2 border-cyan-400/60 rounded-3xl p-6 shadow-[0_0_60px_rgba(34,211,238,0.5)] text-white relative animate-slide-up">
            <button
              onClick={() => setShowGenericGuide(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
            >
              <FaTimes size={14} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.6)] mb-3">
                <img src={appIcon} alt="App Icon" className="w-full h-full object-cover" />
              </div>

              <h3 className="text-base font-black text-white">Install Kenenisa Beyan App</h3>
              <p className="text-xs text-gray-300 mt-1 mb-5">Quick installation guide for your phone:</p>

              <div className="w-full space-y-3.5 text-left text-xs text-gray-200 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-extrabold">1</div>
                  <p>Tap your browser menu <span className="font-bold text-cyan-300 inline-flex items-center gap-1">(3 dots <FaEllipsisV size={11} />)</span> at the top right.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold">2</div>
                  <p>Tap <span className="font-bold text-cyan-300 inline-flex items-center gap-1">Install App <FaDownload size={11} /></span> or <span className="font-bold text-cyan-300">Add to Home Screen</span>.</p>
                </div>
              </div>

              <button
                onClick={() => setShowGenericGuide(false)}
                className="mt-5 w-full py-3 rounded-xl bg-cyan-400 text-black font-black text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                Understood!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PWAInstallPrompt
