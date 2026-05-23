import React, { useState, useRef, useEffect } from 'react'
import { FaTimes, FaPaperPlane, FaTrash, FaCopy, FaCheck, FaUser } from 'react-icons/fa'
import kenoImg from '../assets/keno.jpg'

interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
  id?: string
}

const SUGGESTED_PROMPTS = [
  { text: 'What are your main skills?' },
  { text: 'Tell me about your experience' },
  { text: 'What projects have you built?' },
  { text: 'What\'s your tech stack?' },
]

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      text: 'Hi! I\'m Kenenisa\'s AI assistant. I can help you learn about my skills, featured projects, professional experience, and opportunities. What would you like to know?',
      id: 'initial'
    },
  ])
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'

  const messagesRef = React.useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const chatbotRef = useRef<HTMLDivElement | null>(null)

  // Convert chat history to the format the API expects
  const getConversationHistory = () => {
    return messages.map(msg => ({
      role: msg.role,
      content: msg.text
    }))
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  // Copy message to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Generate unique ID for messages
  const generateId = () => Math.random().toString(36).substring(2, 11)

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsgId = generateId()
    const nextMessages = [...messages, { role: 'user', text: trimmed, id: userMsgId }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          conversationHistory: getConversationHistory(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.statusText}`)
      }

      const data = await response.json()
      const assistantMsgId = generateId()
      setMessages((current) => [...current, { 
        role: 'assistant', 
        text: data.reply || 'Sorry, I could not respond.',
        id: assistantMsgId
      }])
    } catch (error) {
      console.error('chat request error', error)
      const errorMsgId = generateId()
      setMessages((current) => [...current, { 
        role: 'assistant', 
        text: 'I\'m temporarily offline, but feel free to use the contact form to reach me directly! 📧',
        id: errorMsgId
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
  }

  const clearChat = () => {
    setMessages([
      { 
        role: 'assistant', 
        text: 'Hi! I\'m Kenenisa\'s AI assistant. I can help you learn about my skills, featured projects, professional experience, and opportunities. What would you like to know?',
        id: 'initial'
      },
    ])
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  React.useEffect(() => {
    const openHandler = () => {
      setIsOpen(true)
    }
    const toggleHandler = () => {
      setIsOpen((v) => !v)
    }
    window.addEventListener('open-chatbot', openHandler)
    window.addEventListener('toggle-chatbot', toggleHandler)
    return () => {
      window.removeEventListener('open-chatbot', openHandler)
      window.removeEventListener('toggle-chatbot', toggleHandler)
    }
  }, [])

  // Window listeners for clicking outside and Escape key to close the chatbot
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Check if clicking the toggle button in the floating panel to avoid dual-trigger issues
      const isToggleBtn = target.closest('[aria-label="Open chat"]') || target.closest('button svg');
      
      if (chatbotRef.current && !chatbotRef.current.contains(target) && !isToggleBtn) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, isOpen])

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      {isOpen && (
        <div ref={chatbotRef} className="pointer-events-auto w-[325px] sm:w-[420px] h-[min(600px,80vh)] rounded-3xl border border-cyan-500/30 bg-[#0d1527]/98 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(34,211,238,0.15)] backdrop-blur-2xl text-white overflow-hidden flex flex-col transition-all duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#0d1527] via-[#0f1d3c] to-[#12234a] border-b border-white/[0.08] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-cyan-500/30 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.15)] bg-slate-900 flex-shrink-0">
                <img src={kenoImg} alt="Kenenisa Beyan" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-white tracking-wide">Kenenisa's AI Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <p className="text-[11px] text-cyan-300/80 font-medium">Online</p>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                className="text-gray-400 hover:text-white p-2 rounded-lg bg-transparent hover:bg-white/5 transition-all duration-200"
                onClick={clearChat}
                aria-label="Clear chat"
                title="Clear conversation"
              >
                <FaTrash size={13} />
              </button>
              <button
                className="text-gray-400 hover:text-white p-2 rounded-lg bg-transparent hover:bg-white/5 transition-all duration-200"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <FaTimes size={15} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={messagesRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-5 bg-[#0b101f]/40">
            {messages.length === 1 && !loading ? (
              // Suggested Prompts (with premium layout, arrows, and no emojis)
              <div className="space-y-3 mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400/60 px-1 mb-2">Suggested Inquiries</p>
                <div className="space-y-2.5">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedPrompt(prompt.text)}
                      className="w-full text-left py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-950/30 via-blue-950/30 to-transparent border border-cyan-500/30 text-cyan-100 hover:from-purple-500/10 hover:to-indigo-500/10 hover:border-purple-500/40 hover:text-purple-100 transition-all duration-300 text-sm group shadow-[0_2px_10px_rgba(34,211,238,0.05)] hover:shadow-[0_2px_15px_rgba(168,85,247,0.15)]"
                    >
                      <span className="font-semibold tracking-wide">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={message.id || `${message.role}-${index}`} className={`flex gap-3.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
                  
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-cyan-500/30 overflow-hidden shadow-[0_0_10px_rgba(34,211,238,0.1)] self-start mt-0.5 bg-slate-900">
                      <img src={kenoImg} alt="Kenenisa Beyan" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[78%]`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed break-words shadow-sm border transition-all duration-300 ${
                        message.role === 'assistant'
                          ? 'bg-white/[0.03] border-white/[0.06] text-gray-200 rounded-tl-none'
                          : 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-cyan-500/20 text-cyan-50 rounded-tr-none shadow-[0_0_15px_rgba(34,211,238,0.05)]'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(message.text, message.id || `${index}`)}
                        className="opacity-0 group-hover:opacity-100 text-[10px] font-medium text-gray-500 hover:text-cyan-400 mt-1.5 transition-all duration-200 flex items-center gap-1"
                        title="Copy message"
                      >
                        {copiedId === (message.id || `${index}`) ? (
                          <>
                            <FaCheck size={10} className="text-green-400" /> <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <FaCopy size={10} /> <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400 text-sm shadow-[0_0_10px_rgba(59,130,246,0.1)] self-start mt-0.5">
                      <FaUser size={12} />
                    </div>
                  )}

                </div>
              ))
            )}
            
            {loading && (
              <div className="flex gap-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-cyan-500/30 overflow-hidden shadow-[0_0_10px_rgba(34,211,238,0.15)] bg-slate-900">
                  <img src={kenoImg} alt="Kenenisa Beyan" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl rounded-tl-none px-4 py-4 inline-block">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/[0.08] px-4 py-4 bg-[#0a1020] shrink-0">
            <div className="relative flex items-center">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Message Kenenisa's AI..."
                disabled={loading}
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#050914]/90 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 disabled:opacity-50 pr-12 max-h-[120px] transition-all duration-300"
              />

              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="absolute right-2.5 flex h-9.5 w-9.5 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 transition-all duration-300 disabled:opacity-40 disabled:scale-100 disabled:pointer-events-none p-2.5"
                aria-label="Send message"
              >
                {loading ? (
                  <span className="text-xs">⏳</span>
                ) : (
                  <FaPaperPlane size={13} />
                )}
              </button>
            </div>
            <div className="mt-2.5 text-[10px] text-gray-500 font-medium px-1 flex justify-between">
              <span>⌘ Enter to send</span>
              <span>Powered by Kenenisa's AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBot
