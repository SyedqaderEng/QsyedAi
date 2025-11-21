'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, AlertTriangle, Bug, Lock, Code } from 'lucide-react';

export default function FindingsPage() {
  const [findings] = useState([
    { id: '1', title: 'SQL Injection in user query', severity: 'critical', type: 'SAST', file: 'src/api/users.ts:45', status: 'open' },
    { id: '2', title: 'Outdated lodash dependency', severity: 'high', type: 'SCA', file: 'package.json', status: 'open' },
    { id: '3', title: 'Hardcoded API key', severity: 'critical', type: 'Secrets', file: 'src/config.ts:12', status: 'resolved' },
    { id: '4', title: 'Missing CSRF protection', severity: 'medium', type: 'SAST', file: 'src/routes/auth.ts:78', status: 'open' },
    { id: '5', title: 'Insecure container image', severity: 'high', type: 'Container', file: 'Dockerfile', status: 'ignored' },
  ]);

  const getSeverityColor = (severity: string) => {
    if (severity === 'critical') return 'text-red-400 bg-red-500/20';
    if (severity === 'high') return 'text-orange-400 bg-orange-500/20';
    if (severity === 'medium') return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Bug className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">All Findings</h1>
            </div>
            <p className="text-gray-400">Browse and manage security findings</p>
          </div>
          <div className="flex gap-3">
            <div className="relative"><SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search findings..." className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg" /></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"><Filter className="w-4 h-4" />Filter</button>
          </div>
        </motion.div>

        <div className="space-y-4">
          {findings.map((finding, index) => (
            <motion.div key={finding.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/30 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AlertTriangle className={`w-6 h-6 ${getSeverityColor(finding.severity).split(' ')[0]}`} />
                  <div>
                    <h3 className="font-semibold">{finding.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <code className="text-gray-400">{finding.file}</code>
                      <span className="text-purple-400">{finding.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(finding.severity)}`}>{finding.severity}</span>
                  <span className={`px-2 py-1 rounded text-xs ${finding.status === 'resolved' ? 'bg-green-500/20 text-green-400' : finding.status === 'ignored' ? 'bg-gray-500/20 text-gray-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{finding.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
