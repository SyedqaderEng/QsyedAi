'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, Download, Trash2, Calendar, FileText } from 'lucide-react';

export default function ArchivesPage() {
  const [archives] = useState([
    { id: '1', name: 'Q4 2023 Security Report', date: '2024-01-01', size: '2.4 MB', type: 'Report' },
    { id: '2', name: 'December Scan Results', date: '2023-12-31', size: '15.2 MB', type: 'Scan Data' },
    { id: '3', name: 'Compliance Audit 2023', date: '2023-12-15', size: '8.7 MB', type: 'Audit' },
    { id: '4', name: 'Q3 2023 Security Report', date: '2023-10-01', size: '2.1 MB', type: 'Report' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Archive className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Archives</h1>
          </div>
          <p className="text-gray-400">Access historical reports and data</p>
        </motion.div>

        <div className="space-y-4">
          {archives.map((archive, index) => (
            <motion.div key={archive.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold">{archive.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{archive.date}</span>
                      <span>{archive.size}</span>
                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">{archive.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg"><Download className="w-5 h-5 text-gray-400" /></button>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-5 h-5 text-red-400" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
