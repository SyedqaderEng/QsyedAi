'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Plus, Settings, Shield, ExternalLink } from 'lucide-react';

export default function AppsPage() {
  const [apps] = useState([
    { id: '1', name: 'Web Dashboard', type: 'Web App', url: 'app.example.com', status: 'monitored', issues: 5 },
    { id: '2', name: 'Mobile App iOS', type: 'iOS', url: 'App Store', status: 'monitored', issues: 2 },
    { id: '3', name: 'Mobile App Android', type: 'Android', url: 'Play Store', status: 'monitored', issues: 3 },
    { id: '4', name: 'Admin Portal', type: 'Web App', url: 'admin.example.com', status: 'not-monitored', issues: 0 },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Smartphone className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Applications</h1>
            </div>
            <p className="text-gray-400">Monitor security of your applications</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />Add App</button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {apps.map((app, index) => (
            <motion.div key={app.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{app.name}</h3>
                  <span className="text-sm text-gray-400">{app.type}</span>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg"><Settings className="w-4 h-4 text-gray-400" /></button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <ExternalLink className="w-4 h-4" />{app.url}
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs ${app.status === 'monitored' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{app.status}</span>
                {app.issues > 0 && <span className="flex items-center gap-1 text-yellow-400 text-sm"><Shield className="w-4 h-4" />{app.issues} issues</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
