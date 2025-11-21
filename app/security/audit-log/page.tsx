'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, User, Shield, Settings, Key, AlertTriangle } from 'lucide-react';

export default function AuditLogPage() {
  const [logs] = useState([
    { id: '1', action: 'user.login', user: 'john@example.com', ip: '192.168.1.1', timestamp: '2024-01-20 14:30:00', details: 'Successful login' },
    { id: '2', action: 'scan.started', user: 'system', ip: '-', timestamp: '2024-01-20 14:25:00', details: 'Scheduled scan initiated' },
    { id: '3', action: 'settings.updated', user: 'admin@example.com', ip: '192.168.1.2', timestamp: '2024-01-20 14:20:00', details: 'Changed notification settings' },
    { id: '4', action: 'api_key.created', user: 'john@example.com', ip: '192.168.1.1', timestamp: '2024-01-20 14:15:00', details: 'Created new API key' },
    { id: '5', action: 'vulnerability.resolved', user: 'dev@example.com', ip: '192.168.1.3', timestamp: '2024-01-20 14:10:00', details: 'Marked CVE-2024-001 as resolved' },
  ]);

  const getActionIcon = (action: string) => {
    if (action.startsWith('user')) return User;
    if (action.startsWith('scan')) return Shield;
    if (action.startsWith('settings')) return Settings;
    if (action.startsWith('api_key')) return Key;
    if (action.startsWith('vulnerability')) return AlertTriangle;
    return FileText;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Audit Log</h1>
            </div>
            <p className="text-gray-400">Track all activities and changes in your organization</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Action</th>
                <th className="text-left p-4 text-gray-400 font-medium">User</th>
                <th className="text-left p-4 text-gray-400 font-medium">IP Address</th>
                <th className="text-left p-4 text-gray-400 font-medium">Details</th>
                <th className="text-left p-4 text-gray-400 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const Icon = getActionIcon(log.action);
                return (
                  <tr key={log.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-purple-400" />
                        <code className="text-sm">{log.action}</code>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{log.user}</td>
                    <td className="p-4 text-gray-400 font-mono text-sm">{log.ip}</td>
                    <td className="p-4 text-gray-300">{log.details}</td>
                    <td className="p-4 text-gray-400 text-sm">{log.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
