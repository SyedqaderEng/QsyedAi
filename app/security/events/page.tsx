'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Filter, Bell, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function EventsPage() {
  const [events] = useState([
    { id: '1', type: 'critical', title: 'Critical vulnerability discovered', description: 'SQL injection in auth module', time: '5 min ago', source: 'SAST Scanner' },
    { id: '2', type: 'warning', title: 'Outdated dependency detected', description: 'lodash@4.17.15 has known vulnerabilities', time: '1 hour ago', source: 'SCA Scanner' },
    { id: '3', type: 'success', title: 'Security scan completed', description: 'No new vulnerabilities found', time: '2 hours ago', source: 'Full Scan' },
    { id: '4', type: 'info', title: 'New repository connected', description: 'frontend-app added to monitoring', time: '3 hours ago', source: 'Integration' },
  ]);

  const getEventStyle = (type: string) => {
    if (type === 'critical') return { icon: AlertTriangle, color: 'text-red-400 bg-red-500/20' };
    if (type === 'warning') return { icon: Bell, color: 'text-yellow-400 bg-yellow-500/20' };
    if (type === 'success') return { icon: CheckCircle, color: 'text-green-400 bg-green-500/20' };
    return { icon: Info, color: 'text-blue-400 bg-blue-500/20' };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Security Events</h1>
            </div>
            <p className="text-gray-400">Real-time security event stream</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"><Filter className="w-4 h-4" />Filter</button>
        </motion.div>

        <div className="space-y-4">
          {events.map((event, index) => {
            const style = getEventStyle(event.type);
            const Icon = style.icon;
            return (
              <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${style.color}`}><Icon className="w-6 h-6" /></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <span className="text-sm text-gray-400">{event.time}</span>
                    </div>
                    <p className="text-gray-400 mb-2">{event.description}</p>
                    <span className="text-xs text-purple-400">{event.source}</span>
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
