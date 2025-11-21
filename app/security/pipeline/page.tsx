'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitMerge, Play, CheckCircle, XCircle, Clock, Settings } from 'lucide-react';

export default function PipelinePage() {
  const [pipelines] = useState([
    { id: '1', name: 'Production Deploy', status: 'success', duration: '4m 32s', lastRun: '1 hour ago', steps: 8 },
    { id: '2', name: 'Security Scan', status: 'running', duration: '2m 15s', lastRun: 'Running...', steps: 5 },
    { id: '3', name: 'Test Suite', status: 'failed', duration: '1m 45s', lastRun: '3 hours ago', steps: 6 },
    { id: '4', name: 'Staging Deploy', status: 'success', duration: '3m 20s', lastRun: '5 hours ago', steps: 7 },
  ]);

  const getStatusStyle = (status: string) => {
    if (status === 'success') return { icon: CheckCircle, color: 'text-green-400' };
    if (status === 'running') return { icon: Clock, color: 'text-blue-400' };
    return { icon: XCircle, color: 'text-red-400' };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <GitMerge className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">CI/CD Pipelines</h1>
            </div>
            <p className="text-gray-400">Monitor pipeline security and status</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {pipelines.map((pipeline, index) => {
            const { icon: Icon, color } = getStatusStyle(pipeline.status);
            return (
              <motion.div key={pipeline.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Icon className={`w-6 h-6 ${color}`} />
                    <div>
                      <h3 className="font-semibold">{pipeline.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <span>{pipeline.steps} steps</span>
                        <span>{pipeline.duration}</span>
                        <span>{pipeline.lastRun}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg"><Play className="w-5 h-5 text-purple-400" /></button>
                    <button className="p-2 hover:bg-white/10 rounded-lg"><Settings className="w-5 h-5 text-gray-400" /></button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
