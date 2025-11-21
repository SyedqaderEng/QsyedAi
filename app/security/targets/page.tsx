'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, ExternalLink, Trash2, Globe, Server } from 'lucide-react';

export default function TargetsPage() {
  const [targets] = useState([
    { id: '1', name: 'api.example.com', type: 'API', lastScan: '2 hours ago', issues: 3, status: 'active' },
    { id: '2', name: 'app.example.com', type: 'Web App', lastScan: '1 day ago', issues: 7, status: 'active' },
    { id: '3', name: '192.168.1.100', type: 'Server', lastScan: '5 hours ago', issues: 0, status: 'active' },
    { id: '4', name: 'staging.example.com', type: 'Web App', lastScan: '3 days ago', issues: 12, status: 'inactive' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Scan Targets</h1>
            </div>
            <p className="text-gray-400">Manage your scan targets and endpoints</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />Add Target</button>
        </motion.div>

        <div className="space-y-4">
          {targets.map((target, index) => (
            <motion.div key={target.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {target.type === 'Server' ? <Server className="w-6 h-6 text-purple-400" /> : <Globe className="w-6 h-6 text-purple-400" />}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{target.name}</h3>
                      <a href="#" className="text-gray-400 hover:text-white"><ExternalLink className="w-4 h-4" /></a>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span>{target.type}</span>
                      <span>Last scan: {target.lastScan}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {target.issues > 0 && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">{target.issues} issues</span>}
                  <span className={`px-2 py-1 rounded text-sm ${target.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{target.status}</span>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
