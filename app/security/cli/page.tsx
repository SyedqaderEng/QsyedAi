'use client';

import { motion } from 'framer-motion';
import { Terminal, Download, Copy, CheckCircle } from 'lucide-react';

export default function CLIPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">CLI Tool</h1>
          </div>
          <p className="text-gray-400">Run security scans from your terminal</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-6">
          <h3 className="font-semibold mb-3">Installation</h3>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
            <div className="flex items-center justify-between">
              <code className="text-green-400">npm install -g @syed-ai/cli</code>
              <button className="text-gray-400 hover:text-white"><Copy className="w-4 h-4" /></button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-6">
          <h3 className="font-semibold mb-3">Quick Start</h3>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm space-y-2">
            <p className="text-gray-400"># Authenticate</p>
            <p className="text-green-400">syed-ai auth login</p>
            <p className="text-gray-400 mt-4"># Run a scan</p>
            <p className="text-green-400">syed-ai scan .</p>
            <p className="text-gray-400 mt-4"># View results</p>
            <p className="text-green-400">syed-ai results --format table</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-3 gap-4">
          {['SAST Scanning', 'SCA Analysis', 'Secret Detection'].map((feature, i) => (
            <div key={feature} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
