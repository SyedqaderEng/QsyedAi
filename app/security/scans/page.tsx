'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Play, Pause, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function ScansPage() {
  const [scans] = useState([
    { id: '1', name: 'Full Security Scan', repo: 'main-app', status: 'running', progress: 67, started: '10 min ago', findings: 0 },
    { id: '2', name: 'SAST Analysis', repo: 'api-service', status: 'completed', progress: 100, started: '2 hours ago', findings: 12 },
    { id: '3', name: 'Dependency Check', repo: 'frontend', status: 'completed', progress: 100, started: '3 hours ago', findings: 5 },
    { id: '4', name: 'Secret Detection', repo: 'config-repo', status: 'failed', progress: 45, started: '4 hours ago', findings: 0 },
    { id: '5', name: 'Container Scan', repo: 'docker-images', status: 'queued', progress: 0, started: 'Scheduled', findings: 0 },
  ]);

  const getStatusIcon = (status: string) => {
    if (status === 'running') return Clock;
    if (status === 'completed') return CheckCircle;
    if (status === 'failed') return XCircle;
    return AlertTriangle;
  };

  const getStatusColor = (status: string) => {
    if (status === 'running') return 'text-blue-400';
    if (status === 'completed') return 'text-green-400';
    if (status === 'failed') return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Scan className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Security Scans</h1>
            </div>
            <p className="text-gray-400">Monitor and manage security scans</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Play className="w-4 h-4" />New Scan</button>
        </motion.div>

        <div className="space-y-4">
          {scans.map((scan, index) => {
            const StatusIcon = getStatusIcon(scan.status);
            return (
              <motion.div key={scan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{scan.name}</h3>
                    <p className="text-sm text-gray-400">{scan.repo}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {scan.findings > 0 && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">{scan.findings} findings</span>}
                    <span className={`flex items-center gap-1 ${getStatusColor(scan.status)}`}><StatusIcon className="w-4 h-4" />{scan.status}</span>
                  </div>
                </div>
                {scan.status === 'running' && (
                  <div className="mb-2">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: scan.progress + '%' }}></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{scan.progress}% complete</p>
                  </div>
                )}
                <p className="text-sm text-gray-400">Started: {scan.started}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
