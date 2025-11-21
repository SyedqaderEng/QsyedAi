'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Play, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function DASTPage() {
  const [scans] = useState([
    { id: '1', target: 'https://app.example.com', status: 'completed', findings: 12, duration: '45 min', lastRun: '2 hours ago' },
    { id: '2', target: 'https://api.example.com', status: 'running', findings: 0, duration: '15 min', lastRun: 'Running...' },
    { id: '3', target: 'https://admin.example.com', status: 'completed', findings: 3, duration: '30 min', lastRun: '1 day ago' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">DAST Scanning</h1>
            </div>
            <p className="text-gray-400">Dynamic Application Security Testing</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Play className="w-4 h-4" />New Scan</button>
        </motion.div>

        <div className="space-y-4">
          {scans.map((scan, index) => (
            <motion.div key={scan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{scan.target}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{scan.duration}</span>
                    <span>Last: {scan.lastRun}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {scan.findings > 0 && <span className="flex items-center gap-1 text-yellow-400"><AlertTriangle className="w-4 h-4" />{scan.findings} findings</span>}
                  <span className={`flex items-center gap-1 ${scan.status === 'completed' ? 'text-green-400' : 'text-blue-400'}`}>
                    {scan.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5 animate-spin" />}
                    {scan.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
