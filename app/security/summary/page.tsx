'use client';

import { motion } from 'framer-motion';
import { BarChart3, Shield, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export default function SummaryPage() {
  const stats = [
    { label: 'Total Vulnerabilities', value: 156, change: -12, trend: 'down' },
    { label: 'Critical', value: 8, change: 2, trend: 'up' },
    { label: 'Resolved This Week', value: 45, change: 15, trend: 'up' },
    { label: 'Security Score', value: '82%', change: 5, trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Security Summary</h1>
          </div>
          <p className="text-gray-400">Overview of your security posture</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className={`flex items-center gap-1 text-sm ${stat.trend === 'up' && stat.label !== 'Critical' ? 'text-green-400' : stat.label === 'Critical' && stat.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {['New critical vulnerability detected', 'Security scan completed', 'Dependency update available', 'Secret detected and blocked'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {['Run full security scan', 'Review critical issues', 'Update dependencies', 'Export report'].map((action, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                  <span>{action}</span>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
