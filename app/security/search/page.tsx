'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, FileCode, Bug, Package, Key } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results] = useState([
    { id: '1', type: 'vulnerability', title: 'SQL Injection in auth.ts', path: 'src/api/auth.ts:45', severity: 'critical' },
    { id: '2', type: 'package', title: 'lodash', path: 'package.json', severity: null },
    { id: '3', type: 'secret', title: 'API Key exposed', path: 'src/config.ts:12', severity: 'critical' },
    { id: '4', type: 'file', title: 'auth.controller.ts', path: 'src/controllers/auth.controller.ts', severity: null },
  ]);

  const getTypeIcon = (type: string) => {
    if (type === 'vulnerability') return Bug;
    if (type === 'package') return Package;
    if (type === 'secret') return Key;
    return FileCode;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Search</h1>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search vulnerabilities, packages, files..." className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-lg focus:outline-none focus:border-purple-500" />
            </div>
            <button className="flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl"><Filter className="w-5 h-5" /></button>
          </div>
        </motion.div>

        <div className="space-y-3">
          {results.map((result, index) => {
            const Icon = getTypeIcon(result.type);
            return (
              <motion.div key={result.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:border-purple-500/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <Icon className="w-5 h-5 text-purple-400" />
                  <div className="flex-1">
                    <h3 className="font-medium">{result.title}</h3>
                    <code className="text-sm text-gray-400">{result.path}</code>
                  </div>
                  {result.severity && <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">{result.severity}</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
