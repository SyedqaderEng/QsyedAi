'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Plus, Trash2, Edit2 } from 'lucide-react';

export default function TagsPage() {
  const [tags] = useState([
    { id: '1', name: 'production', color: '#ef4444', count: 15 },
    { id: '2', name: 'staging', color: '#f59e0b', count: 8 },
    { id: '3', name: 'critical', color: '#dc2626', count: 23 },
    { id: '4', name: 'frontend', color: '#3b82f6', count: 12 },
    { id: '5', name: 'backend', color: '#8b5cf6', count: 18 },
    { id: '6', name: 'database', color: '#10b981', count: 6 },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Tag className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Tags</h1>
            </div>
            <p className="text-gray-400">Organize and categorize your assets</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />Create Tag</button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tags.map((tag, index) => (
            <motion.div key={tag.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }}></div>
                  <span className="font-medium">{tag.name}</span>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-white/10 rounded"><Edit2 className="w-4 h-4 text-gray-400" /></button>
                  <button className="p-1 hover:bg-red-500/20 rounded"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              </div>
              <p className="text-sm text-gray-400">{tag.count} items</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
