import React, { useState, useEffect } from 'react'
import { FaHistory } from 'react-icons/fa'
import { adminApi } from '../api'

interface AuditLogItem {
  id: string
  action: string
  detail: string
  adminEmail: string
  timestamp: string
}

const AuditLogsTab: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.getAuditLogs().then(res => {
      setLogs(res.data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-[#07101f]/90 border border-white/[0.08] border-l-[6px] border-l-cyan-500 rounded-3xl p-6 backdrop-blur-xl">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Activity Audit Trail</h1>
          <p className="text-xs text-gray-400 mt-1">Immutable security log of all content modifications, logins, and visibility changes</p>
        </div>
      </div>

      {loading ? <div className="p-8 text-center text-gray-400">Loading Audit Logs...</div> : (
        <div className="bg-[#07101f]/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold text-cyan-400 uppercase">
                      {log.action}
                    </span>
                    <span className="text-xs font-semibold text-white">{log.adminEmail}</span>
                  </div>
                  <p className="text-xs text-gray-300">{log.detail}</p>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AuditLogsTab
