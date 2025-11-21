'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Plus, Edit2, Trash2 } from 'lucide-react';

export default function LabelsPage() {
  const [labels] = useState([
    { id: '1', name: 'needs-review', color: '#f59e0b', count: 23 },
    { id: '2', name: 'false-positive', color: '#6b7280', count: 15 },
    { id: '3', name: 'accepted-risk', color: '#3b82f6', count: 8 },
    { id: '4', name: 'in-progress', color: '#8b5cf6', count: 12 },
    { id: '5', name: 'wont-fix', color: '#ef4444', count: 5 },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Tag className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Labels</h1>
            </div>
            <p className="text-gray-400">Organize findings with custom labels</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />New Label</button>
        </motion.div>

        <div className="space-y-3">
          {labels.map((label, index) => (
            <motion.div key={label.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: label.color }}></div>
                  <span className="font-mono font-medium">{label.name}</span>
                  <span className="text-sm text-gray-400">{label.count} items</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4 text-gray-400" /></button>
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
