'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, ArrowRight, TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react';

export default function ComparePage() {
  const [timeRange1, setTimeRange1] = useState('last-week');
  const [timeRange2, setTimeRange2] = useState('this-week');

  const comparison = {
    period1: { label: 'Last Week', date: 'Jan 8-14' },
    period2: { label: 'This Week', date: 'Jan 15-21' },
    metrics: [
      { name: 'Total Vulnerabilities', value1: 145, value2: 128, unit: '' },
      { name: 'Critical', value1: 5, value2: 3, unit: '' },
      { name: 'High', value1: 18, value2: 15, unit: '' },
      { name: 'Medium', value1: 52, value2: 48, unit: '' },
      { name: 'Security Score', value1: 72, value2: 78, unit: '%' },
      { name: 'MTTR', value1: 3.2, value2: 2.1, unit: ' days' },
      { name: 'Scan Coverage', value1: 88, value2: 94, unit: '%' },
      { name: 'Compliance', value1: 82, value2: 87, unit: '%' },
    ],
  };

  const getChangeIndicator = (v1: number, v2: number, inverse = false) => {
    const diff = v2 - v1;
    const percentChange = ((diff / v1) * 100).toFixed(1);
    const isPositive = inverse ? diff < 0 : diff > 0;

    if (diff === 0) {
      return { icon: Minus, color: 'text-gray-400', text: 'No change' };
    }
    return {
      icon: isPositive ? TrendingUp : TrendingDown,
      color: isPositive ? 'text-green-400' : 'text-red-400',
      text: `${diff > 0 ? '+' : ''}${percentChange}%`,
    };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <GitCompare className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Security Comparison</h1>
          </div>
          <p className="text-gray-400">Compare security metrics across time periods</p>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-8 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Period 1</span>
            </div>
            <select
              value={timeRange1}
              onChange={(e) => setTimeRange1(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">{comparison.period1.date}</p>
          </div>

          <ArrowRight className="w-8 h-8 text-purple-400" />

          <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Period 2</span>
            </div>
            <select
              value={timeRange2}
              onChange={(e) => setTimeRange2(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-quarter">This Quarter</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">{comparison.period2.date}</p>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="p-6">Metric</th>
                <th className="p-6 text-center">{comparison.period1.label}</th>
                <th className="p-6 text-center">{comparison.period2.label}</th>
                <th className="p-6 text-center">Change</th>
              </tr>
            </thead>
            <tbody>
              {comparison.metrics.map((metric, index) => {
                const inverse = ['Total Vulnerabilities', 'Critical', 'High', 'Medium', 'MTTR'].includes(metric.name);
                const change = getChangeIndicator(metric.value1, metric.value2, inverse);
                const ChangeIcon = change.icon;

                return (
                  <motion.tr
                    key={metric.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="border-b border-white/5"
                  >
                    <td className="p-6 font-medium">{metric.name}</td>
                    <td className="p-6 text-center text-gray-400">
                      {metric.value1}{metric.unit}
                    </td>
                    <td className="p-6 text-center font-semibold">
                      {metric.value2}{metric.unit}
                    </td>
                    <td className="p-6">
                      <div className={`flex items-center justify-center gap-2 ${change.color}`}>
                        <ChangeIcon className="w-5 h-5" />
                        <span>{change.text}</span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <p className="text-gray-400">
            Your security posture has improved this week. Vulnerabilities decreased by 11.7%,
            security score increased by 8.3%, and mean time to remediation improved by 34.4%.
            Keep up the great work!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
