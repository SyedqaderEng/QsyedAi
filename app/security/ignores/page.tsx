'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeOff, Plus, Trash2, FileCode, Clock } from 'lucide-react';

export default function IgnoresPage() {
  const [ignores] = useState([
    { id: '1', pattern: 'node_modules/**', type: 'path', reason: 'Third-party dependencies', createdBy: 'System', created: '2024-01-01' },
    { id: '2', pattern: 'CVE-2023-12345', type: 'vulnerability', reason: 'False positive - not applicable', createdBy: 'john@example.com', created: '2024-01-15' },
    { id: '3', pattern: '*.test.ts', type: 'path', reason: 'Test files', createdBy: 'jane@example.com', created: '2024-01-10' },
    { id: '4', pattern: 'SNYK-JS-*', type: 'vulnerability', reason: 'Addressed in next release', createdBy: 'admin@example.com', created: '2024-01-18' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <EyeOff className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Ignore Rules</h1>
            </div>
            <p className="text-gray-400">Manage ignored paths and vulnerabilities</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />Add Rule</button>
        </motion.div>

        <div className="space-y-4">
          {ignores.map((ignore, index) => (
            <motion.div key={ignore.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <code className="px-2 py-1 bg-black/30 rounded text-purple-400 font-mono text-sm">{ignore.pattern}</code>
                    <span className="px-2 py-0.5 bg-white/10 text-gray-400 rounded text-xs">{ignore.type}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{ignore.reason}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>By: {ignore.createdBy}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ignore.created}</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
