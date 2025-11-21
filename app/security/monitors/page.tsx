'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function MonitorsPage() {
  const [monitors] = useState([
    { id: '1', name: 'API Uptime', type: 'HTTP', status: 'up', interval: '1 min', uptime: '99.9%' },
    { id: '2', name: 'Database Health', type: 'Database', status: 'up', interval: '5 min', uptime: '100%' },
    { id: '3', name: 'SSL Certificate', type: 'SSL', status: 'warning', interval: '1 hour', uptime: '100%' },
    { id: '4', name: 'Login Endpoint', type: 'HTTP', status: 'down', interval: '1 min', uptime: '95.2%' },
  ]);

  const getStatusStyle = (status: string) => {
    if (status === 'up') return { icon: CheckCircle, color: 'text-green-400 bg-green-500/20' };
    if (status === 'warning') return { icon: AlertCircle, color: 'text-yellow-400 bg-yellow-500/20' };
    return { icon: AlertCircle, color: 'text-red-400 bg-red-500/20' };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Monitors</h1>
            </div>
            <p className="text-gray-400">Track uptime and availability</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />Add Monitor</button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {monitors.map((monitor, index) => {
            const { icon: Icon, color } = getStatusStyle(monitor.status);
            return (
              <motion.div key={monitor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{monitor.name}</h3>
                    <span className="text-sm text-gray-400">{monitor.type}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${color}`}><Icon className="w-3 h-3" />{monitor.status}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{monitor.interval}</span>
                  <span>{monitor.uptime} uptime</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
