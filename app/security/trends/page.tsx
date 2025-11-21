'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Clock, Target, ArrowUp, ArrowDown } from 'lucide-react';

export default function TrendsPage() {
  const trends = [
    { metric: 'New Vulnerabilities', current: 12, previous: 18, period: 'This Week', trend: 'down' },
    { metric: 'Avg MTTR', current: 2.1, previous: 3.4, period: 'This Month', trend: 'down', unit: 'days' },
    { metric: 'Security Score', current: 78, previous: 72, period: 'This Month', trend: 'up' },
    { metric: 'Critical Issues', current: 2, previous: 5, period: 'This Week', trend: 'down' },
    { metric: 'Scan Coverage', current: 94, previous: 88, period: 'This Month', trend: 'up', unit: '%' },
    { metric: 'False Positives', current: 8, previous: 15, period: 'This Week', trend: 'down', unit: '%' },
  ];

  const weeklyData = [
    { week: 'Week 1', vulns: 45, fixed: 38 },
    { week: 'Week 2', vulns: 52, fixed: 48 },
    { week: 'Week 3', vulns: 38, fixed: 42 },
    { week: 'Week 4', vulns: 28, fixed: 35 },
  ];

  const topRisks = [
    { category: 'Dependency Vulnerabilities', count: 45, change: -12 },
    { category: 'Code Issues', count: 32, change: -8 },
    { category: 'Secrets Exposure', count: 5, change: -3 },
    { category: 'Misconfiguration', count: 18, change: 2 },
    { category: 'Container Issues', count: 12, change: -5 },
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
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Security Trends</h1>
          </div>
          <p className="text-gray-400">Track security metrics over time</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {trends.map((trend, index) => {
            const isPositive = trend.metric.includes('Score') || trend.metric.includes('Coverage')
              ? trend.trend === 'up'
              : trend.trend === 'down';
            const change = Math.round(((trend.current - trend.previous) / trend.previous) * 100);

            return (
              <motion.div
                key={trend.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4"
              >
                <p className="text-xs text-gray-400 mb-1">{trend.metric}</p>
                <p className="text-2xl font-bold">{trend.current}{trend.unit || ''}</p>
                <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
                  <span>{Math.abs(change)}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Weekly Vulnerability Trend</h3>
            <div className="space-y-4">
              {weeklyData.map((week, index) => (
                <div key={week.week} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-gray-400">{week.week}</span>
                  <div className="flex-1 flex gap-2">
                    <div
                      className="h-6 bg-red-500/50 rounded"
                      style={{ width: `${(week.vulns / 60) * 100}%` }}
                    />
                    <div
                      className="h-6 bg-green-500/50 rounded"
                      style={{ width: `${(week.fixed / 60) * 100}%` }}
                    />
                  </div>
                  <div className="w-24 text-right text-sm">
                    <span className="text-red-400">{week.vulns}</span>
                    <span className="text-gray-500"> / </span>
                    <span className="text-green-400">{week.fixed}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500/50 rounded" />
                <span className="text-gray-400">New</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500/50 rounded" />
                <span className="text-gray-400">Fixed</span>
              </div>
            </div>
          </motion.div>

          {/* Top Risks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Risk Categories</h3>
            <div className="space-y-4">
              {topRisks.map((risk, index) => (
                <div key={risk.category} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{risk.category}</span>
                      <span className="font-semibold">{risk.count}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${(risk.count / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className={`w-16 text-right text-sm ${risk.change < 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {risk.change > 0 ? '+' : ''}{risk.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
