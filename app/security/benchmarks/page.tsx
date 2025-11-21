'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Trophy, Target, Clock, ArrowUp, ArrowDown } from 'lucide-react';

export default function BenchmarksPage() {
  const benchmarks = [
    { name: 'Mean Time to Detect (MTTD)', value: '4.2 hours', change: -15, trend: 'down', target: '< 6 hours', status: 'met' },
    { name: 'Mean Time to Remediate (MTTR)', value: '2.1 days', change: -22, trend: 'down', target: '< 3 days', status: 'met' },
    { name: 'Vulnerability Backlog', value: '23', change: 12, trend: 'up', target: '< 50', status: 'met' },
    { name: 'Scan Coverage', value: '94%', change: 8, trend: 'up', target: '> 90%', status: 'met' },
    { name: 'Critical Vulns Open', value: '2', change: -50, trend: 'down', target: '0', status: 'unmet' },
    { name: 'Compliance Score', value: '87%', change: 5, trend: 'up', target: '> 85%', status: 'met' },
  ];

  const industryComparison = [
    { metric: 'Security Score', you: 78, industry: 72, percentile: 'Top 25%' },
    { metric: 'MTTR', you: 2.1, industry: 4.5, percentile: 'Top 15%' },
    { metric: 'Scan Frequency', you: 12, industry: 8, percentile: 'Top 20%' },
    { metric: 'Compliance', you: 87, industry: 75, percentile: 'Top 30%' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Security Benchmarks</h1>
          </div>
          <p className="text-gray-400">Track your security metrics against targets and industry standards</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {benchmarks.map((benchmark, index) => (
            <motion.div
              key={benchmark.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/5 backdrop-blur-xl rounded-xl border p-6 ${
                benchmark.status === 'met' ? 'border-green-500/30' : 'border-red-500/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm text-gray-400">{benchmark.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  benchmark.status === 'met' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {benchmark.status === 'met' ? 'On Target' : 'Off Target'}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{benchmark.value}</p>
                  <p className="text-sm text-gray-500">Target: {benchmark.target}</p>
                </div>
                <div className={`flex items-center gap-1 ${
                  (benchmark.trend === 'down' && benchmark.name.includes('Time')) ||
                  (benchmark.trend === 'up' && !benchmark.name.includes('Time') && !benchmark.name.includes('Backlog'))
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}>
                  {benchmark.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(benchmark.change)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold">Industry Comparison</h2>
          </div>
          <div className="space-y-6">
            {industryComparison.map((item, index) => (
              <div key={item.metric}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.metric}</span>
                  <span className="text-purple-400 text-sm">{item.percentile}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gray-500 rounded-full absolute"
                        style={{ width: `${(item.industry / Math.max(item.you, item.industry)) * 100}%` }}
                      />
                      <div
                        className="h-full bg-purple-500 rounded-full absolute"
                        style={{ width: `${(item.you / Math.max(item.you, item.industry)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm w-32">
                    <span className="text-purple-400">You: {item.you}</span>
                    <span className="text-gray-400">Avg: {item.industry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-xl border border-green-500/30 p-6">
            <Target className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="font-semibold mb-2">Targets Met</h3>
            <p className="text-3xl font-bold text-green-400">5/6</p>
            <p className="text-sm text-gray-400 mt-1">83% achievement rate</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6">
            <TrendingUp className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="font-semibold mb-2">Trend</h3>
            <p className="text-3xl font-bold text-purple-400">Improving</p>
            <p className="text-sm text-gray-400 mt-1">+12% overall improvement</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-xl border border-yellow-500/30 p-6">
            <Clock className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="font-semibold mb-2">Next Review</h3>
            <p className="text-3xl font-bold text-yellow-400">7 days</p>
            <p className="text-sm text-gray-400 mt-1">Monthly benchmark review</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
