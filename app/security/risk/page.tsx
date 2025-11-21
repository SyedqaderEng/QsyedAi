'use client';

import { motion } from 'framer-motion';
import { Target, AlertTriangle, Shield, TrendingUp, Building, DollarSign, Users, Clock } from 'lucide-react';

export default function RiskPage() {
  const riskFactors = [
    { name: 'Critical Vulnerabilities', score: 85, weight: 'High', impact: 'System compromise' },
    { name: 'Exposed Secrets', score: 45, weight: 'High', impact: 'Data breach' },
    { name: 'Outdated Dependencies', score: 65, weight: 'Medium', impact: 'Security gaps' },
    { name: 'Missing Security Headers', score: 30, weight: 'Low', impact: 'XSS attacks' },
    { name: 'Insecure Configurations', score: 55, weight: 'Medium', impact: 'Unauthorized access' },
    { name: 'Compliance Gaps', score: 40, weight: 'Medium', impact: 'Regulatory fines' },
  ];

  const assets = [
    { name: 'Production API', riskScore: 78, value: 'Critical', threats: 12 },
    { name: 'Customer Database', riskScore: 85, value: 'Critical', threats: 8 },
    { name: 'Admin Panel', riskScore: 62, value: 'High', threats: 5 },
    { name: 'Public Website', riskScore: 45, value: 'Medium', threats: 15 },
    { name: 'Internal Tools', riskScore: 35, value: 'Low', threats: 3 },
  ];

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400 bg-red-500/20';
    if (score >= 50) return 'text-orange-400 bg-orange-500/20';
    if (score >= 30) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  const overallRisk = Math.round(riskFactors.reduce((sum, f) => sum + f.score, 0) / riskFactors.length);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Risk Assessment</h1>
          <p className="text-gray-400">Comprehensive view of your organization&apos;s security risk posture</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Risk Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-8"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-6">Overall Risk Score</h3>
              <div className="relative inline-flex items-center justify-center mb-6">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke={overallRisk >= 70 ? '#ef4444' : overallRisk >= 50 ? '#f97316' : '#eab308'}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(overallRisk / 100) * 440} 440`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{overallRisk}</span>
                  <span className="text-sm text-gray-400">/ 100</span>
                </div>
              </div>
              <p className={`text-lg font-semibold ${overallRisk >= 70 ? 'text-red-400' : overallRisk >= 50 ? 'text-orange-400' : 'text-yellow-400'}`}>
                {overallRisk >= 70 ? 'High Risk' : overallRisk >= 50 ? 'Medium Risk' : 'Low Risk'}
              </p>
            </div>
          </motion.div>

          {/* Risk Factors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Risk Factors</h3>
            <div className="space-y-4">
              {riskFactors.map((factor, index) => (
                <div key={factor.name} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{factor.name}</span>
                      <span className={`text-sm ${getRiskColor(factor.score).split(' ')[0]}`}>{factor.score}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          factor.score >= 70 ? 'bg-red-500' : factor.score >= 50 ? 'bg-orange-500' : factor.score >= 30 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Impact: {factor.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Asset Risk */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Asset Risk Assessment</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="pb-4">Asset</th>
                    <th className="pb-4">Business Value</th>
                    <th className="pb-4">Risk Score</th>
                    <th className="pb-4">Active Threats</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.name} className="border-b border-white/5">
                      <td className="py-4 font-medium">{asset.name}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          asset.value === 'Critical' ? 'bg-purple-500/20 text-purple-400' :
                          asset.value === 'High' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {asset.value}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                asset.riskScore >= 70 ? 'bg-red-500' : asset.riskScore >= 50 ? 'bg-orange-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${asset.riskScore}%` }}
                            />
                          </div>
                          <span className="text-sm">{asset.riskScore}</span>
                        </div>
                      </td>
                      <td className="py-4">{asset.threats}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(asset.riskScore)}`}>
                          {asset.riskScore >= 70 ? 'Critical' : asset.riskScore >= 50 ? 'At Risk' : 'Acceptable'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
