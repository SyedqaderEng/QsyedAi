'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Download, Trash2, Clock, CheckCircle, RefreshCw } from 'lucide-react';

export default function BackupsPage() {
  const [backups] = useState([
    { id: '1', name: 'Full Backup', date: '2024-01-20 02:00', size: '2.4 GB', status: 'completed', type: 'automatic' },
    { id: '2', name: 'Full Backup', date: '2024-01-19 02:00', size: '2.3 GB', status: 'completed', type: 'automatic' },
    { id: '3', name: 'Config Backup', date: '2024-01-18 14:30', size: '12 MB', status: 'completed', type: 'manual' },
    { id: '4', name: 'Full Backup', date: '2024-01-18 02:00', size: '2.2 GB', status: 'completed', type: 'automatic' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Backups</h1>
            </div>
            <p className="text-gray-400">Manage data backups and recovery</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><RefreshCw className="w-4 h-4" />Create Backup</button>
        </motion.div>

        <div className="space-y-4">
          {backups.map((backup, index) => (
            <motion.div key={backup.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Database className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{backup.name}</h3>
                      <span className="px-2 py-0.5 bg-white/10 text-gray-400 rounded text-xs">{backup.type}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{backup.date}</span>
                      <span>{backup.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-green-400 text-sm"><CheckCircle className="w-4 h-4" />{backup.status}</span>
                  <button className="p-2 hover:bg-white/10 rounded-lg"><Download className="w-4 h-4 text-gray-400" /></button>
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
