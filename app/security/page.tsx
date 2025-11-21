'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp,
  Code, Cloud, Lock, Activity, Zap, Brain, FileCode, Server
} from 'lucide-react';

interface SecurityMetrics {
  riskScore: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
  resolvedToday: number;
  scannedRepos: number;
  totalRepos: number;
  lastScanTime: string;
}

export default function SecurityDashboard() {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    riskScore: 68,
    criticalIssues: 12,
    highIssues: 34,
    mediumIssues: 78,
    lowIssues: 156,
    resolvedToday: 8,
    scannedRepos: 24,
    totalRepos: 30,
    lastScanTime: new Date().toISOString(),
  });

  const [alerts] = useState([
    {
      id: 1,
      severity: 'critical',
      title: 'SQL Injection vulnerability in user-service',
      repo: 'backend/user-service',
      file: 'src/controllers/auth.ts',
      line: 45,
      time: '5 minutes ago',
      aiSuggestion: 'Use parameterized queries',
    },
    {
      id: 2,
      severity: 'high',
      title: 'Exposed AWS credentials in config file',
      repo: 'infrastructure/terraform',
      file: '.env.production',
      line: 12,
      time: '12 minutes ago',
      aiSuggestion: 'Move to AWS Secrets Manager',
    },
    {
      id: 3,
      severity: 'high',
      title: 'Outdated dependency: express@4.16.0 (CVE-2024-1234)',
      repo: 'frontend/dashboard',
      file: 'package.json',
      line: 23,
      time: '1 hour ago',
      aiSuggestion: 'Update to express@4.18.2',
    },
  ]);

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default: return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass-strong border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Aikido Security
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/security" className="text-white font-semibold">Dashboard</Link>
            <Link href="/security/repositories" className="text-gray-300 hover:text-white transition-colors">Repositories</Link>
            <Link href="/security/alerts" className="text-gray-300 hover:text-white transition-colors">Alerts</Link>
            <Link href="/security/cloud" className="text-gray-300 hover:text-white transition-colors">Cloud</Link>
            <Link href="/security/team" className="text-gray-300 hover:text-white transition-colors">Team</Link>
            <Link href="/dashboard/settings" className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all">
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 text-white"
          >
            Security Overview
          </motion.h1>
          <p className="text-gray-400">Last scan: {new Date(metrics.lastScanTime).toLocaleString()}</p>
        </div>

        {/* Risk Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-8 rounded-2xl mb-8 border-2 border-neon-blue/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl text-gray-400 mb-2">Security Risk Score</h2>
              <div className="flex items-baseline gap-4">
                <span className={`text-6xl font-bold ${getRiskColor(metrics.riskScore)}`}>
                  {metrics.riskScore}
                </span>
                <span className="text-gray-400">/ 100</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {metrics.riskScore >= 80 ? 'High Risk' : metrics.riskScore >= 60 ? 'Medium Risk' : 'Low Risk'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Shield className="w-24 h-24 text-neon-blue opacity-20" />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-xl border-2 border-red-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <XCircle className="w-8 h-8 text-red-400" />
              <span className="text-3xl font-bold text-red-400">{metrics.criticalIssues}</span>
            </div>
            <h3 className="text-gray-400 text-sm">Critical Issues</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-xl border-2 border-orange-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-400" />
              <span className="text-3xl font-bold text-orange-400">{metrics.highIssues}</span>
            </div>
            <h3 className="text-gray-400 text-sm">High Severity</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-xl border-2 border-yellow-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold text-yellow-400">{metrics.mediumIssues}</span>
            </div>
            <h3 className="text-gray-400 text-sm">Medium Issues</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-xl border-2 border-green-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-green-400">{metrics.resolvedToday}</span>
            </div>
            <h3 className="text-gray-400 text-sm">Resolved Today</h3>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Latest Alerts */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-neon-yellow" />
                  Latest Alerts
                </h2>
                <Link href="/security/alerts" className="text-neon-blue hover:text-neon-purple transition-colors">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`glass p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          <span className="text-gray-500 text-sm">{alert.time}</span>
                        </div>
                        <h3 className="text-white font-semibold mb-1">{alert.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">
                          <Code className="w-3 h-3 inline mr-1" />
                          {alert.repo} → {alert.file}:{alert.line}
                        </p>
                        <div className="flex items-center gap-2 glass-strong p-2 rounded">
                          <Brain className="w-4 h-4 text-neon-purple" />
                          <span className="text-sm text-gray-300">AI Suggestion: {alert.aiSuggestion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Scan Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-neon-green" />
                Scan Coverage
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Repositories</span>
                  <span className="text-white">{metrics.scannedRepos}/{metrics.totalRepos}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full"
                    style={{ width: `${(metrics.scannedRepos / metrics.totalRepos) * 100}%` }}
                  ></div>
                </div>
              </div>
              <Link
                href="/security/repositories"
                className="block w-full bg-gradient-to-r from-neon-blue to-neon-purple py-2 rounded-lg text-center font-semibold hover:shadow-neon-blue transition-all"
              >
                Scan Repositories
              </Link>
            </motion.div>

            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-4">Security Features</h3>
              <div className="space-y-3">
                <Link href="/security/sast" className="flex items-center gap-3 glass p-3 rounded-lg hover:glass-strong transition-all">
                  <FileCode className="w-5 h-5 text-neon-blue" />
                  <span className="text-gray-300">SAST Scanning</span>
                </Link>
                <Link href="/security/sca" className="flex items-center gap-3 glass p-3 rounded-lg hover:glass-strong transition-all">
                  <Lock className="w-5 h-5 text-neon-purple" />
                  <span className="text-gray-300">SCA Analysis</span>
                </Link>
                <Link href="/security/secrets" className="flex items-center gap-3 glass p-3 rounded-lg hover:glass-strong transition-all">
                  <Shield className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">Secrets Detection</span>
                </Link>
                <Link href="/security/cloud" className="flex items-center gap-3 glass p-3 rounded-lg hover:glass-strong transition-all">
                  <Cloud className="w-5 h-5 text-neon-yellow" />
                  <span className="text-gray-300">Cloud Security</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
