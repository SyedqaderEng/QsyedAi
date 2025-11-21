'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ExternalLink, Calendar, AlertTriangle } from 'lucide-react';

export default function AdvisoriesPage() {
  const [advisories] = useState([
    { id: '1', cve: 'CVE-2024-1234', title: 'Critical RCE in Node.js', severity: 'critical', published: '2024-01-18', affected: 3 },
    { id: '2', cve: 'CVE-2024-5678', title: 'SQL Injection in MySQL driver', severity: 'high', published: '2024-01-15', affected: 1 },
    { id: '3', cve: 'CVE-2024-9012', title: 'XSS vulnerability in React', severity: 'medium', published: '2024-01-10', affected: 5 },
  ]);

  const getSeverityColor = (severity: string) => {
    if (severity === 'critical') return 'text-red-400 bg-red-500/20';
    if (severity === 'high') return 'text-orange-400 bg-orange-500/20';
    return 'text-yellow-400 bg-yellow-500/20';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Security Advisories</h1>
          </div>
          <p className="text-gray-400">Latest security advisories affecting your stack</p>
        </motion.div>

        <div className="space-y-4">
          {advisories.map((advisory, index) => (
            <motion.div key={advisory.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/30 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <code className="text-purple-400 font-mono">{advisory.cve}</code>
                    <span className={`px-2 py-0.5 rounded text-xs ${getSeverityColor(advisory.severity)}`}>{advisory.severity}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{advisory.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{advisory.published}</span>
                    <span className="flex items-center gap-1"><AlertTriangle className="w-4 h-4" />{advisory.affected} affected repos</span>
                  </div>
                </div>
                <a href="#" className="p-2 hover:bg-white/10 rounded-lg"><ExternalLink className="w-5 h-5 text-gray-400" /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
