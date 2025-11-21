'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plug, Plus, CheckCircle, XCircle, Settings } from 'lucide-react';

export default function ConnectorsPage() {
  const [connectors] = useState([
    { id: '1', name: 'GitHub', icon: '🐙', status: 'connected', repos: 15, lastSync: '5 min ago' },
    { id: '2', name: 'GitLab', icon: '🦊', status: 'connected', repos: 8, lastSync: '1 hour ago' },
    { id: '3', name: 'Bitbucket', icon: '🪣', status: 'disconnected', repos: 0, lastSync: 'Never' },
    { id: '4', name: 'Azure DevOps', icon: '☁️', status: 'connected', repos: 3, lastSync: '2 hours ago' },
    { id: '5', name: 'AWS CodeCommit', icon: '📦', status: 'disconnected', repos: 0, lastSync: 'Never' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Plug className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Connectors</h1>
            </div>
            <p className="text-gray-400">Connect your source control providers</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />Add Connector</button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectors.map((connector, index) => (
            <motion.div key={connector.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{connector.icon}</span>
                  <div>
                    <h3 className="font-semibold">{connector.name}</h3>
                    <span className={`flex items-center gap-1 text-sm ${connector.status === 'connected' ? 'text-green-400' : 'text-gray-400'}`}>
                      {connector.status === 'connected' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {connector.status}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg"><Settings className="w-4 h-4 text-gray-400" /></button>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{connector.repos} repositories</span>
                <span>Last sync: {connector.lastSync}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
