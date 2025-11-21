'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Target,
  Shield,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Users,
  GitBranch,
  Code,
} from 'lucide-react';

interface TrendData {
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  resolved: number;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeMetric, setActiveMetric] = useState<'vulnerabilities' | 'mttr' | 'coverage'>('vulnerabilities');

  const [trendData] = useState<TrendData[]>([
    { date: '2024-01-01', critical: 15, high: 32, medium: 48, low: 75, resolved: 12 },
    { date: '2024-01-05', critical: 18, high: 35, medium: 52, low: 78, resolved: 15 },
    { date: '2024-01-10', critical: 12, high: 28, medium: 45, low: 70, resolved: 22 },
    { date: '2024-01-15', critical: 8, high: 22, medium: 38, low: 65, resolved: 28 },
  ]);

  const stats = {
    totalVulnerabilities: 245,
    trend: -12.5, // negative means improvement
    criticalOpen: 8,
    highOpen: 22,
    mediumOpen: 38,
    lowOpen: 65,
    resolvedThisMonth: 89,
    mttr: 3.2, // days
    mttrTrend: -18.3, // improvement
    scanCoverage: 87, // percentage
    coverageTrend: 5.2,
    activeDevelopers: 23,
    scansThisMonth: 156,
  };

  const vulnerabilityTypes = [
    { name: 'SQL Injection', count: 45, severity: 'critical', trend: -8 },
    { name: 'XSS', count: 38, severity: 'high', trend: 12 },
    { name: 'Broken Authentication', count: 32, severity: 'critical', trend: -15 },
    { name: 'Sensitive Data Exposure', count: 28, severity: 'high', trend: 5 },
    { name: 'XML External Entities', count: 22, severity: 'medium', trend: -3 },
    { name: 'Broken Access Control', count: 18, severity: 'high', trend: 7 },
    { name: 'Security Misconfiguration', count: 15, severity: 'medium', trend: -12 },
    { name: 'Insecure Deserialization', count: 12, severity: 'critical', trend: -5 },
  ];

  const teamPerformance = [
    { name: 'John Doe', resolved: 45, avgTime: 2.1, scansTrigger ed: 23 },
    { name: 'Jane Smith', resolved: 38, avgTime: 2.8, scansTriggered: 19 },
    { name: 'Bob Wilson', resolved: 32, avgTime: 3.5, scansTriggered: 15 },
    { name: 'Alice Johnson', resolved: 28, avgTime: 2.3, scansTriggered: 21 },
    { name: 'Charlie Brown', resolved: 22, avgTime: 4.1, scansTriggered: 12 },
  ];

  const repositoryStats = [
    { name: 'frontend-app', vulnerabilities: 45, coverage: 95, lastScan: '2 hours ago' },
    { name: 'backend-api', vulnerabilities: 32, coverage: 88, lastScan: '4 hours ago' },
    { name: 'mobile-app', vulnerabilities: 28, coverage: 92, lastScan: '1 day ago' },
    { name: 'infrastructure', vulnerabilities: 18, coverage: 78, lastScan: '3 days ago' },
    { name: 'microservices', vulnerabilities: 52, coverage: 85, lastScan: '6 hours ago' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/10';
      case 'high':
        return 'text-orange-400 bg-orange-500/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'low':
        return 'text-blue-400 bg-blue-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Security Analytics</h1>
                <p className="text-gray-400 mt-1">Trends, metrics, and insights</p>
              </div>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Total Vulnerabilities</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">{stats.totalVulnerabilities}</div>
                <div className={`flex items-center gap-1 text-sm ${stats.trend < 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.trend < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  <span>{Math.abs(stats.trend)}%</span>
                </div>
              </div>
            </div>
            <div className="glass-panel p-4 border-blue-500/20">
              <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                <Clock className="w-4 h-4" />
                <span>Mean Time to Resolve</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-blue-400">{stats.mttr}d</div>
                <div className={`flex items-center gap-1 text-sm ${stats.mttrTrend < 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.mttrTrend < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  <span>{Math.abs(stats.mttrTrend)}%</span>
                </div>
              </div>
            </div>
            <div className="glass-panel p-4 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Resolved This Month</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{stats.resolvedThisMonth}</div>
            </div>
            <div className="glass-panel p-4 border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                <Target className="w-4 h-4" />
                <span>Scan Coverage</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-purple-400">{stats.scanCoverage}%</div>
                <div className={`flex items-center gap-1 text-sm ${stats.coverageTrend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.coverageTrend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{Math.abs(stats.coverageTrend)}%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vulnerability Trends Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-blue-400" />
            Vulnerability Trends
          </h2>

          {/* Simple Bar Chart Visualization */}
          <div className="space-y-4">
            {trendData.map((data, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-gray-400 text-sm">{new Date(data.date).toLocaleDateString()}</div>
                <div className="flex items-center gap-2 h-12">
                  <div className="w-20 text-gray-400 text-sm">Critical</div>
                  <div className="flex-1 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="h-12 bg-gradient-to-r from-red-500 to-red-600 flex items-center px-3 text-white font-medium"
                      style={{ width: `${(data.critical / 100) * 100}%` }}
                    >
                      {data.critical}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 h-12">
                  <div className="w-20 text-gray-400 text-sm">High</div>
                  <div className="flex-1 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="h-12 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center px-3 text-white font-medium"
                      style={{ width: `${(data.high / 100) * 100}%` }}
                    >
                      {data.high}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 h-12">
                  <div className="w-20 text-gray-400 text-sm">Resolved</div>
                  <div className="flex-1 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="h-12 bg-gradient-to-r from-green-500 to-green-600 flex items-center px-3 text-white font-medium"
                      style={{ width: `${(data.resolved / 100) * 100}%` }}
                    >
                      {data.resolved}
                    </div>
                  </div>
                </div>
                {idx < trendData.length - 1 && <div className="border-t border-white/10 my-4" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Vulnerability Types */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <PieChart className="w-6 h-6 text-purple-400" />
            Top Vulnerability Types
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {vulnerabilityTypes.map((vuln, idx) => (
              <div key={idx} className="glass-panel p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                    <span className="text-white font-medium">{vuln.name}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{vuln.count}</div>
                </div>
                <div className={`flex items-center gap-1 ${vuln.trend < 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {vuln.trend < 0 ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                  <span className="font-medium">{Math.abs(vuln.trend)}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {/* Team Performance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-green-400" />
              Team Performance
            </h2>
            <div className="space-y-4">
              {teamPerformance.map((member, idx) => (
                <div key={idx} className="glass-panel p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">{member.name}</span>
                    <span className="text-green-400 font-bold">{member.resolved} resolved</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Avg: {member.avgTime}d</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Activity className="w-4 h-4" />
                      <span>{member.scansTriggered} scans</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Repository Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-blue-400" />
              Repository Statistics
            </h2>
            <div className="space-y-4">
              {repositoryStats.map((repo, idx) => (
                <div key={idx} className="glass-panel p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-purple-400" />
                      <span className="text-white font-medium">{repo.name}</span>
                    </div>
                    <span className="text-orange-400 font-bold">{repo.vulnerabilities} issues</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 mb-1">Coverage</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${repo.coverage}%` }}
                          />
                        </div>
                        <span className="text-white font-medium">{repo.coverage}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{repo.lastScan}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Severity Distribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-yellow-400" />
            Current Severity Distribution
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="glass-panel p-6 border-red-500/20 text-center">
              <div className="text-red-400 text-sm mb-2">Critical</div>
              <div className="text-4xl font-bold text-red-400 mb-2">{stats.criticalOpen}</div>
              <div className="text-gray-400 text-xs">Open Issues</div>
            </div>
            <div className="glass-panel p-6 border-orange-500/20 text-center">
              <div className="text-orange-400 text-sm mb-2">High</div>
              <div className="text-4xl font-bold text-orange-400 mb-2">{stats.highOpen}</div>
              <div className="text-gray-400 text-xs">Open Issues</div>
            </div>
            <div className="glass-panel p-6 border-yellow-500/20 text-center">
              <div className="text-yellow-400 text-sm mb-2">Medium</div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">{stats.mediumOpen}</div>
              <div className="text-gray-400 text-xs">Open Issues</div>
            </div>
            <div className="glass-panel p-6 border-blue-500/20 text-center">
              <div className="text-blue-400 text-sm mb-2">Low</div>
              <div className="text-4xl font-bold text-blue-400 mb-2">{stats.lowOpen}</div>
              <div className="text-gray-400 text-xs">Open Issues</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
