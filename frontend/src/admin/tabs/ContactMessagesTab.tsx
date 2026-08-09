import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaTrash, FaCheckCircle, FaEnvelopeOpen, FaTimes } from 'react-icons/fa'
import { adminApi } from '../api'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'archived'
  createdAt: string
}

const ContactMessagesTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const fetchMessages = async () => {
    try {
      const res = await adminApi.getMessages()
      setMessages(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMessages() }, [])

  const handleSelect = async (m: Message) => {
    setSelectedMessage(m)
    if (m.status === 'unread') {
      try {
        await adminApi.updateMessageStatus(m.id, 'read')
        fetchMessages()
      } catch (err) {}
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete contact message from "${name}"?`)) return
    try {
      await adminApi.deleteMessage(id)
      if (selectedMessage?.id === id) setSelectedMessage(null)
      fetchMessages()
    } catch (err) {
      alert('Failed to delete message')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Contact Messages Inbox</h1>
          <p className="text-xs text-gray-400 mt-1">Review inquiries, partnership offers, and project proposals submitted through the portfolio</p>
        </div>
      </div>

      {loading ? <div className="p-8 text-center text-gray-400">Loading Inbox Messages...</div> : (
        messages.length === 0 ? (
          <div className="bg-[#07101f]/80 border border-white/10 rounded-3xl p-12 text-center text-gray-400">
            <FaEnvelope size={40} className="mx-auto text-cyan-500/40 mb-2" />
            <h3 className="text-sm font-bold text-white">No Contact Messages Yet</h3>
            <p className="text-xs text-gray-500">Messages sent via the public contact form will appear here safely.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* List */}
            <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleSelect(m)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedMessage?.id === m.id
                      ? 'bg-cyan-500/20 border-cyan-500 text-white'
                      : m.status === 'unread'
                      ? 'bg-[#07101f] border-cyan-500/40 text-white font-bold'
                      : 'bg-black/30 border-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-cyan-300 truncate">{m.name}</span>
                    <span className="text-[10px] text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-white truncate">{m.subject}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-1">{m.message}</p>
                </div>
              ))}
            </div>

            {/* Message Detail View */}
            <div className="lg:col-span-2 bg-[#07101f]/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl min-h-[400px]">
              {selectedMessage ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div>
                      <h2 className="text-lg font-bold text-white">{selectedMessage.subject}</h2>
                      <p className="text-xs text-cyan-400 font-medium mt-0.5">
                        From: <span className="text-white">{selectedMessage.name}</span> (&lt;{selectedMessage.email}&gt;)
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20"
                      >
                        Reply via Email
                      </a>
                      <button
                        onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Delete Message"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedMessage.message}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-16">
                  <FaEnvelopeOpen size={36} className="text-gray-600 mb-2" />
                  <p className="text-xs">Select a message from the left list to read details</p>
                </div>
              )}
            </div>

          </div>
        )
      )}
    </div>
  )
}

export default ContactMessagesTab
