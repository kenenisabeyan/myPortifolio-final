import React, { useState, useRef, useEffect } from 'react'
import { FaTimes, FaPaperPlane, FaRobot, FaTrash, FaCopy, FaCheck } from 'react-icons/fa'

interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
  id?: string
}

const SUGGESTED_PROMPTS = [
  { icon: '🎯', text: 'What are your main skills?' },
  { icon: '💼', text: 'Tell me about your experience' },
  { icon: '🚀', text: 'What projects have you built?' },
  { icon: '⚡', text: 'What\'s your tech stack?' },
]

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      text: 'Hi! 👋 I\'m Adrian\'s AI assistant. I can help you learn about skills, projects, experience, and opportunities. What would you like to know?',
      id: 'initial'
    },
  ])
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'

  const messagesRef = React.useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

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
        text: 'Hi! 👋 I\'m Adrian\'s AI assistant. I can help you learn about skills, projects, experience, and opportunities. What would you like to know?',
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

  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, isOpen])

  return (
    <div className="fixed bottom-20 right-6 z-[100] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[320px] sm:w-[420px] h-[600px] rounded-3xl border border-cyan-500/30 bg-[#061025]/95 shadow-[0_20px_80px_rgba(2,6,23,0.7)] backdrop-blur-xl text-white overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-5 py-3 bg-gradient-to-r from-[#051028] to-[#071024] border-b border-cyan-500/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-cyan-800/20 text-cyan-300 text-lg">
                <FaRobot />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Adrian's AI</p>
                <p className="text-xs text-gray-400">Always here to help</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                className="text-gray-300 hover:text-white p-2 rounded-lg bg-transparent hover:bg-white/10 transition"
                onClick={clearChat}
                aria-label="Clear chat"
                title="Clear conversation"
              >
                <FaTrash size={14} />
              </button>
              <button
                className="text-gray-300 hover:text-white p-2 rounded-lg bg-transparent hover:bg-white/10 transition"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 1 && !loading ? (
              // Suggested Prompts (only shown when conversation is fresh)
              <div className="space-y-2 mt-8">
                <p className="text-xs text-gray-400 px-2 mb-3">Try asking:</p>
                <div className="space-y-2">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedPrompt(prompt.text)}
                      className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-cyan-500/10 hover:border-cyan-500/30 transition text-sm text-gray-300 hover:text-white group"
                    >
                      <span className="mr-2">{prompt.icon}</span>
                      {prompt.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={message.id || `${message.role}-${index}`} className="flex gap-3 group">
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">
                      🤖
                    </div>
                  )}
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-2 inline-block max-w-[85%] ${
                        message.role === 'assistant'
                          ? 'bg-white/5 text-gray-100'
                          : 'bg-cyan-500/20 text-cyan-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-6 break-words">{message.text}</p>
                    </div>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(message.text, message.id || `${index}`)}
                        className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 hover:text-gray-200 mt-1 transition flex items-center gap-1"
                        title="Copy message"
                      >
                        {copiedId === (message.id || `${index}`) ? (
                          <>
                            <FaCheck size={12} /> Copied
                          </>
                        ) : (
                          <>
                            <FaCopy size={12} /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">
                      👤
                    </div>
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">
                  🤖
                </div>
                <div className="bg-white/5 rounded-2xl px-4 py-3 inline-block">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-cyan-500/10 px-4 py-4 bg-[#030717]/95 shrink-0">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Message Adrian's AI..."
                disabled={loading}
                className="w-full resize-none rounded-xl border border-cyan-700/30 bg-[#021024] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 disabled:opacity-50 pr-12 max-h-[120px]"
              />

              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-black shadow-lg hover:bg-cyan-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {loading ? (
                  <span className="text-xs">⏳</span>
                ) : (
                  <FaPaperPlane size={14} />
                )}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">⌘ Enter to send</div>
          </div>
        </div>
      )}


    </div>
  )
}

export default ChatBot
