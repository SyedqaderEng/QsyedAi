'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

export default function PackagesPage() {
  const [packages] = useState([
    { id: '1', name: 'lodash', version: '4.17.21', license: 'MIT', vulnerabilities: 0, usage: 45 },
    { id: '2', name: 'axios', version: '1.6.0', license: 'MIT', vulnerabilities: 1, usage: 38 },
    { id: '3', name: 'express', version: '4.18.2', license: 'MIT', vulnerabilities: 0, usage: 22 },
    { id: '4', name: 'jsonwebtoken', version: '9.0.0', license: 'MIT', vulnerabilities: 2, usage: 15 },
    { id: '5', name: 'mongoose', version: '8.0.0', license: 'MIT', vulnerabilities: 0, usage: 12 },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Packages</h1>
            </div>
            <p className="text-gray-400">Monitor third-party packages across your projects</p>
          </div>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search packages..." className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg" /></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-white/10">
              <th className="text-left p-4 text-gray-400 font-medium">Package</th>
              <th className="text-left p-4 text-gray-400 font-medium">Version</th>
              <th className="text-left p-4 text-gray-400 font-medium">License</th>
              <th className="text-left p-4 text-gray-400 font-medium">Issues</th>
              <th className="text-left p-4 text-gray-400 font-medium">Usage</th>
            </tr></thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4"><div className="flex items-center gap-2"><span className="font-mono">{pkg.name}</span><ExternalLink className="w-3 h-3 text-gray-400" /></div></td>
                  <td className="p-4 font-mono text-sm text-gray-400">{pkg.version}</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">{pkg.license}</span></td>
                  <td className="p-4">{pkg.vulnerabilities > 0 ? <span className="flex items-center gap-1 text-yellow-400"><AlertTriangle className="w-4 h-4" />{pkg.vulnerabilities}</span> : <CheckCircle className="w-4 h-4 text-green-400" />}</td>
                  <td className="p-4 text-gray-400">{pkg.usage} repos</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
