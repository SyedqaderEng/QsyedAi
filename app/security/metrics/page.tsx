'use client';

import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, TrendingDown, Clock, Shield, Bug, CheckCircle } from 'lucide-react';

export default function MetricsPage() {
  const metrics = [
    { label: 'Mean Time to Detect', value: '2.3 hours', change: -15, icon: Clock },
    { label: 'Mean Time to Resolve', value: '4.1 hours', change: -8, icon: CheckCircle },
    { label: 'Vulnerability Density', value: '0.8/kLOC', change: -12, icon: Bug },
    { label: 'Security Coverage', value: '94%', change: 3, icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Security Metrics</h1>
          </div>
          <p className="text-gray-400">Key performance indicators for security</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <metric.icon className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-400">{metric.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className={`flex items-center gap-1 text-sm ${metric.change < 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  {Math.abs(metric.change)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Vulnerability Trend</h3>
            <div className="h-48 flex items-end justify-around gap-2">
              {[65, 45, 80, 55, 40, 35, 30].map((h, i) => (
                <div key={i} className="flex-1 bg-purple-500/30 rounded-t" style={{ height: h + '%' }}></div>
              ))}
            </div>
            <div className="flex justify-around mt-2 text-xs text-gray-400">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Resolution Rate</h3>
            <div className="space-y-4">
              {[{ label: 'Critical', value: 95, color: 'bg-red-500' }, { label: 'High', value: 82, color: 'bg-orange-500' }, { label: 'Medium', value: 68, color: 'bg-yellow-500' }, { label: 'Low', value: 45, color: 'bg-green-500' }].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1"><span>{item.label}</span><span>{item.value}%</span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className={`h-full ${item.color} rounded-full`} style={{ width: item.value + '%' }}></div></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
