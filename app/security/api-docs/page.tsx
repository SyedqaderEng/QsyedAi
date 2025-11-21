'use client';

import { motion } from 'framer-motion';
import { Book, Code, Terminal, ExternalLink } from 'lucide-react';

export default function APIDocsPage() {
  const endpoints = [
    { method: 'GET', path: '/api/v1/scans', description: 'List all security scans' },
    { method: 'POST', path: '/api/v1/scans', description: 'Start a new security scan' },
    { method: 'GET', path: '/api/v1/vulnerabilities', description: 'List all vulnerabilities' },
    { method: 'PATCH', path: '/api/v1/vulnerabilities/:id', description: 'Update vulnerability status' },
    { method: 'GET', path: '/api/v1/reports', description: 'Generate security reports' },
  ];

  const getMethodColor = (method: string) => {
    if (method === 'GET') return 'text-green-400 bg-green-500/20';
    if (method === 'POST') return 'text-blue-400 bg-blue-500/20';
    if (method === 'PATCH') return 'text-yellow-400 bg-yellow-500/20';
    if (method === 'DELETE') return 'text-red-400 bg-red-500/20';
    return 'text-gray-400 bg-gray-500/20';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Book className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">API Documentation</h1>
          </div>
          <p className="text-gray-400">Integrate Syed.AI into your workflow</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-6">
          <h3 className="font-semibold mb-3">Base URL</h3>
          <code className="block bg-black/30 p-3 rounded-lg text-purple-400">https://api.syed.ai/v1</code>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10"><h3 className="font-semibold">Endpoints</h3></div>
          <div className="divide-y divide-white/10">
            {endpoints.map((endpoint) => (
              <div key={endpoint.path + endpoint.method} className="p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${getMethodColor(endpoint.method)}`}>{endpoint.method}</span>
                  <code className="font-mono text-gray-300">{endpoint.path}</code>
                </div>
                <p className="text-sm text-gray-400 mt-2 ml-16">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
