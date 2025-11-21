'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, CheckCircle, Clock, XCircle, GitBranch, ExternalLink } from 'lucide-react';

export default function DeployPage() {
  const [deployments] = useState([
    { id: '1', env: 'Production', branch: 'main', status: 'success', time: '10 min ago', commit: 'a1b2c3d' },
    { id: '2', env: 'Staging', branch: 'develop', status: 'running', time: '2 min ago', commit: 'e4f5g6h' },
    { id: '3', env: 'Production', branch: 'main', status: 'success', time: '2 hours ago', commit: 'i7j8k9l' },
    { id: '4', env: 'Preview', branch: 'feature/auth', status: 'failed', time: '3 hours ago', commit: 'm0n1o2p' },
  ]);

  const getStatusStyle = (status: string) => {
    if (status === 'success') return { icon: CheckCircle, color: 'text-green-400' };
    if (status === 'running') return { icon: Clock, color: 'text-blue-400' };
    return { icon: XCircle, color: 'text-red-400' };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Rocket className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Deployments</h1>
            </div>
            <p className="text-gray-400">Track deployment security status</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {deployments.map((deploy, index) => {
            const { icon: Icon, color } = getStatusStyle(deploy.status);
            return (
              <motion.div key={deploy.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Icon className={`w-6 h-6 ${color}`} />
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{deploy.env}</h3>
                        <span className="flex items-center gap-1 text-sm text-gray-400"><GitBranch className="w-4 h-4" />{deploy.branch}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                        <code>{deploy.commit}</code>
                        <span>{deploy.time}</span>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="p-2 hover:bg-white/10 rounded-lg"><ExternalLink className="w-5 h-5 text-gray-400" /></a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
