'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, AlertTriangle, CheckCircle, XCircle, Filter, Search, Eye } from 'lucide-react';

interface ReachabilityVuln {
  id: string;
  cve: string;
  package: string;
  version: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  reachable: boolean;
  exploitPath: string | null;
  confidence: number;
  repository: string;
}

export default function ReachabilityPage() {
  const [showReachable, setShowReachable] = useState<'all' | 'reachable' | 'unreachable'>('all');

  const vulnerabilities: ReachabilityVuln[] = [
    { id: '1', cve: 'CVE-2023-1234', package: 'lodash', version: '4.17.20', severity: 'high', reachable: true, exploitPath: 'src/utils/data.js → lodash.get()', confidence: 95, repository: 'api-service' },
    { id: '2', cve: 'CVE-2023-5678', package: 'express', version: '4.18.2', severity: 'medium', reachable: false, exploitPath: null, confidence: 90, repository: 'backend' },
    { id: '3', cve: 'CVE-2023-9012', package: 'axios', version: '1.5.0', severity: 'critical', reachable: true, exploitPath: 'src/api/client.js → axios.request()', confidence: 88, repository: 'frontend' },
    { id: '4', cve: 'CVE-2023-3456', package: 'jsonwebtoken', version: '9.0.0', severity: 'high', reachable: false, exploitPath: null, confidence: 92, repository: 'auth-service' },
    { id: '5', cve: 'CVE-2023-7890', package: 'mongoose', version: '7.5.0', severity: 'medium', reachable: true, exploitPath: 'src/models/user.js → mongoose.connect()', confidence: 85, repository: 'backend' },
    { id: '6', cve: 'CVE-2023-2345', package: 'crypto-js', version: '4.1.0', severity: 'low', reachable: false, exploitPath: null, confidence: 78, repository: 'frontend' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredVulns = vulnerabilities.filter(v => {
    if (showReachable === 'all') return true;
    if (showReachable === 'reachable') return v.reachable;
    return !v.reachable;
  });

  const stats = {
    total: vulnerabilities.length,
    reachable: vulnerabilities.filter(v => v.reachable).length,
    unreachable: vulnerabilities.filter(v => !v.reachable).length,
    criticalReachable: vulnerabilities.filter(v => v.reachable && (v.severity === 'critical' || v.severity === 'high')).length,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Network className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Reachability Analysis</h1>
          </div>
          <p className="text-gray-400">Identify which vulnerabilities are actually exploitable in your code</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Vulnerabilities', value: stats.total, icon: AlertTriangle },
            { label: 'Reachable', value: stats.reachable, icon: XCircle, color: 'text-red-400' },
            { label: 'Unreachable', value: stats.unreachable, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Critical/High Reachable', value: stats.criticalReachable, icon: AlertTriangle, color: 'text-orange-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color || 'text-gray-400'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl border border-green-500/30 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-2">Noise Reduction Impact</h3>
          <p className="text-gray-400 mb-4">Reachability analysis has filtered out {Math.round((stats.unreachable / stats.total) * 100)}% of vulnerabilities that don&apos;t affect your running code.</p>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${(stats.unreachable / stats.total) * 100}%` }} />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-6"
        >
          {[
            { key: 'all', label: 'All' },
            { key: 'reachable', label: 'Reachable' },
            { key: 'unreachable', label: 'Unreachable' },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setShowReachable(filter.key as typeof showReachable)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                showReachable === filter.key
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Vulnerabilities List */}
        <div className="space-y-4">
          {filteredVulns.map((vuln, index) => (
            <motion.div
              key={vuln.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className={`bg-white/5 backdrop-blur-xl rounded-xl border p-6 ${
                vuln.reachable ? 'border-red-500/30' : 'border-green-500/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${vuln.reachable ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                    {vuln.reachable ? (
                      <XCircle className="w-6 h-6 text-red-400" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{vuln.cve}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(vuln.severity)}`}>
                        {vuln.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        vuln.reachable ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {vuln.reachable ? 'Reachable' : 'Not Reachable'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {vuln.package}@{vuln.version} in {vuln.repository}
                    </p>
                    {vuln.exploitPath && (
                      <p className="text-sm font-mono text-orange-400">
                        Path: {vuln.exploitPath}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Confidence: {vuln.confidence}%
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Eye className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
