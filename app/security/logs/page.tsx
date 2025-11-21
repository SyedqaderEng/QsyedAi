'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Download, Filter, Search, RefreshCw } from 'lucide-react';

export default function LogsPage() {
  const [logs] = useState([
    { id: '1', timestamp: '2024-01-20 14:32:15', level: 'info', service: 'scanner', message: 'Scan completed for repository main-app' },
    { id: '2', timestamp: '2024-01-20 14:31:45', level: 'warning', service: 'auth', message: 'Failed login attempt from IP 192.168.1.100' },
    { id: '3', timestamp: '2024-01-20 14:30:12', level: 'error', service: 'webhook', message: 'Failed to deliver webhook to https://api.example.com' },
    { id: '4', timestamp: '2024-01-20 14:29:33', level: 'info', service: 'scanner', message: 'Starting scheduled scan for 15 repositories' },
    { id: '5', timestamp: '2024-01-20 14:28:01', level: 'debug', service: 'api', message: 'API request processed in 45ms' },
  ]);

  const getLevelColor = (level: string) => {
    if (level === 'error') return 'text-red-400 bg-red-500/20';
    if (level === 'warning') return 'text-yellow-400 bg-yellow-500/20';
    if (level === 'info') return 'text-blue-400 bg-blue-500/20';
    return 'text-gray-400 bg-gray-500/20';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ScrollText className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">System Logs</h1>
            </div>
            <p className="text-gray-400">View and analyze system logs</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"><RefreshCw className="w-4 h-4" />Refresh</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Download className="w-4 h-4" />Export</button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search logs..." className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500" />
            </div>
            <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
              <option>All Levels</option><option>Error</option><option>Warning</option><option>Info</option>
            </select>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-black/50 rounded-xl border border-white/10 font-mono text-sm overflow-hidden">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-4 p-3 border-b border-white/5 hover:bg-white/5">
              <span className="text-gray-500 whitespace-nowrap">{log.timestamp}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${getLevelColor(log.level)}`}>{log.level.toUpperCase()}</span>
              <span className="text-purple-400">[{log.service}]</span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
