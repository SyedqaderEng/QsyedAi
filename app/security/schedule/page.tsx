'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, Play, Pause, Trash2 } from 'lucide-react';

export default function SchedulePage() {
  const [schedules] = useState([
    { id: '1', name: 'Daily Full Scan', frequency: 'Daily at 2:00 AM', repos: 'All repositories', status: 'active', nextRun: 'Tomorrow, 2:00 AM' },
    { id: '2', name: 'Weekly SAST', frequency: 'Every Monday at 6:00 AM', repos: 'Production only', status: 'active', nextRun: 'Monday, 6:00 AM' },
    { id: '3', name: 'Dependency Check', frequency: 'Every 6 hours', repos: 'All repositories', status: 'paused', nextRun: 'Paused' },
    { id: '4', name: 'Secret Scan', frequency: 'On every push', repos: 'All repositories', status: 'active', nextRun: 'On next push' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Scan Schedule</h1>
            </div>
            <p className="text-gray-400">Configure automated security scans</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />New Schedule</button>
        </motion.div>

        <div className="space-y-4">
          {schedules.map((schedule, index) => (
            <motion.div key={schedule.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{schedule.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{schedule.frequency}</span>
                    <span>{schedule.repos}</span>
                  </div>
                  <p className="text-sm text-purple-400 mt-2">Next: {schedule.nextRun}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg">{schedule.status === 'active' ? <Pause className="w-5 h-5 text-yellow-400" /> : <Play className="w-5 h-5 text-green-400" />}</button>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-5 h-5 text-red-400" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
