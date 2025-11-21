'use client';

import { motion } from 'framer-motion';
import { Shield, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';

export default function SecurityScorePage() {
  const overallScore = 78;
  const previousScore = 72;
  const trend = overallScore - previousScore;

  const categories = [
    { name: 'Code Security', score: 85, icon: Shield, color: 'from-blue-500 to-cyan-500' },
    { name: 'Dependencies', score: 72, icon: AlertTriangle, color: 'from-orange-500 to-yellow-500' },
    { name: 'Secrets Management', score: 90, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { name: 'Infrastructure', score: 68, icon: Target, color: 'from-purple-500 to-pink-500' },
    { name: 'Cloud Security', score: 75, icon: Shield, color: 'from-indigo-500 to-blue-500' },
    { name: 'Compliance', score: 82, icon: CheckCircle, color: 'from-teal-500 to-green-500' },
  ];

  const recentChanges = [
    { action: 'Fixed critical vulnerability', impact: +5, date: '2 hours ago' },
    { action: 'Updated 12 dependencies', impact: +3, date: '1 day ago' },
    { action: 'New high severity issue detected', impact: -2, date: '2 days ago' },
    { action: 'Enabled MFA for all users', impact: +4, date: '3 days ago' },
    { action: 'Rotated API keys', impact: +2, date: '5 days ago' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Security Score</h1>
          <p className="text-gray-400">Your organization&apos;s overall security posture</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8"
          >
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center mb-6">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle cx="96" cy="96" r="88" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(overallScore / 100) * 553} 553`}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold">{overallScore}</span>
                  <span className="text-2xl font-semibold text-purple-400">{getScoreGrade(overallScore)}</span>
                </div>
              </div>

              <div className={`flex items-center justify-center gap-2 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trend >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span>{trend >= 0 ? '+' : ''}{trend} points from last week</span>
              </div>
            </div>
          </motion.div>

          {/* Category Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Category Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="p-4 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                        <category.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className={`text-xl font-bold ${getScoreColor(category.score)}`}>
                      {category.score}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                      style={{ width: `${category.score}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Changes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Recent Score Changes</h3>
            <div className="space-y-4">
              {recentChanges.map((change, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${change.impact >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {change.impact >= 0 ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{change.action}</p>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {change.date}
                      </p>
                    </div>
                  </div>
                  <span className={`text-lg font-semibold ${change.impact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {change.impact >= 0 ? '+' : ''}{change.impact}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
