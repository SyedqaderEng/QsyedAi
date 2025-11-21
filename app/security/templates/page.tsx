'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileTemplate, Plus, Copy, Star, Download } from 'lucide-react';

export default function TemplatesPage() {
  const [templates] = useState([
    { id: '1', name: 'OWASP Top 10 Scan', description: 'Scan for OWASP Top 10 vulnerabilities', category: 'Security', stars: 245 },
    { id: '2', name: 'CI/CD Pipeline', description: 'Integrate security into your CI/CD', category: 'DevOps', stars: 189 },
    { id: '3', name: 'Compliance Report', description: 'Generate SOC2 compliance reports', category: 'Compliance', stars: 156 },
    { id: '4', name: 'Dependency Audit', description: 'Full dependency vulnerability audit', category: 'Security', stars: 134 },
    { id: '5', name: 'Container Security', description: 'Docker and K8s security scanning', category: 'Containers', stars: 98 },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FileTemplate className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Templates</h1>
            </div>
            <p className="text-gray-400">Pre-built security configurations</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />Create Template</button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template, index) => (
            <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">{template.category}</span>
                </div>
                <span className="flex items-center gap-1 text-sm text-yellow-400"><Star className="w-4 h-4 fill-yellow-400" />{template.stars}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{template.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm"><Copy className="w-4 h-4" />Use Template</button>
                <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg"><Download className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
