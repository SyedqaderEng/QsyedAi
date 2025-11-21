'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Shield, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

export default function BranchesPage() {
  const [branches] = useState([
    { id: '1', name: 'main', protected: true, lastScan: '1 hour ago', issues: 0, status: 'secure' },
    { id: '2', name: 'develop', protected: true, lastScan: '2 hours ago', issues: 3, status: 'warning' },
    { id: '3', name: 'feature/auth', protected: false, lastScan: '1 day ago', issues: 1, status: 'warning' },
    { id: '4', name: 'feature/api-v2', protected: false, lastScan: '3 days ago', issues: 0, status: 'secure' },
    { id: '5', name: 'hotfix/security', protected: false, lastScan: '5 hours ago', issues: 5, status: 'critical' },
  ]);

  const getStatusColor = (status: string) => {
    if (status === 'secure') return 'text-green-400 bg-green-500/20';
    if (status === 'warning') return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Branch Security</h1>
          </div>
          <p className="text-gray-400">Monitor security status across branches</p>
        </motion.div>

        <div className="space-y-4">
          {branches.map((branch, index) => (
            <motion.div key={branch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <GitBranch className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium">{branch.name}</span>
                      {branch.protected && <Lock className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <p className="text-sm text-gray-400">Last scan: {branch.lastScan}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {branch.issues > 0 && <span className="text-sm text-yellow-400">{branch.issues} issues</span>}
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(branch.status)}`}>{branch.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
