'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Filter, Download, User, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ActivityPage() {
  const [activities] = useState([
    { id: '1', type: 'scan', message: 'Security scan completed for main-app', user: 'System', time: '5 min ago', icon: Shield },
    { id: '2', type: 'alert', message: 'Critical vulnerability detected in auth module', user: 'Scanner', time: '15 min ago', icon: AlertTriangle },
    { id: '3', type: 'user', message: 'John Doe updated repository settings', user: 'John Doe', time: '1 hour ago', icon: User },
    { id: '4', type: 'resolved', message: 'CVE-2024-1234 marked as resolved', user: 'Jane Smith', time: '2 hours ago', icon: CheckCircle },
    { id: '5', type: 'scan', message: 'Scheduled scan started for api-service', user: 'System', time: '3 hours ago', icon: Shield },
  ]);

  const getTypeColor = (type: string) => {
    if (type === 'alert') return 'text-red-400 bg-red-500/20';
    if (type === 'resolved') return 'text-green-400 bg-green-500/20';
    if (type === 'scan') return 'text-blue-400 bg-blue-500/20';
    return 'text-purple-400 bg-purple-500/20';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Activity Feed</h1>
            </div>
            <p className="text-gray-400">Recent security events and user actions</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"><Filter className="w-4 h-4" />Filter</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Download className="w-4 h-4" />Export</button>
          </div>
        </motion.div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div key={activity.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getTypeColor(activity.type)}`}><activity.icon className="w-5 h-5" /></div>
                <div className="flex-1">
                  <p className="font-medium">{activity.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span>{activity.user}</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
