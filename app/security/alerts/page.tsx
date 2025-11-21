'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  AlertTriangle, XCircle, CheckCircle, Clock, Filter, Brain,
  Code, FileCode, Lock, Cloud, Zap, Eye, EyeOff, Trash2, GitPullRequest
} from 'lucide-react';

interface Alert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'sast' | 'sca' | 'secrets' | 'iac' | 'cloud';
  title: string;
  description: string;
  repository: string;
  file: string;
  line: number;
  cve?: string;
  aiSuggestion: string;
  autofixAvailable: boolean;
  status: 'open' | 'snoozed' | 'resolved' | 'ignored';
  createdAt: string;
  resolvedAt?: string;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'critical',
      type: 'sast',
      title: 'SQL Injection vulnerability in user authentication',
      description: 'Unsanitized user input is directly used in SQL query, allowing potential SQL injection attacks.',
      repository: 'backend/user-service',
      file: 'src/controllers/auth.ts',
      line: 45,
      aiSuggestion: 'Use parameterized queries or ORM to prevent SQL injection. Replace direct string concatenation with prepared statements.',
      autofixAvailable: true,
      status: 'open',
      createdAt: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: '2',
      severity: 'critical',
      type: 'secrets',
      title: 'AWS Access Key exposed in configuration file',
      description: 'AWS_SECRET_ACCESS_KEY found in plaintext in environment configuration.',
      repository: 'infrastructure/terraform',
      file: '.env.production',
      line: 12,
      aiSuggestion: 'Move credentials to AWS Secrets Manager or environment variables. Never commit credentials to version control.',
      autofixAvailable: false,
      status: 'open',
      createdAt: new Date(Date.now() - 600000).toISOString(),
    },
    {
      id: '3',
      severity: 'high',
      type: 'sca',
      title: 'Known vulnerability in express package',
      description: 'express@4.16.0 contains CVE-2024-1234 - Remote Code Execution vulnerability',
      repository: 'frontend/dashboard',
      file: 'package.json',
      line: 23,
      cve: 'CVE-2024-1234',
      aiSuggestion: 'Update express to version 4.18.2 or later to fix this vulnerability.',
      autofixAvailable: true,
      status: 'open',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '4',
      severity: 'high',
      type: 'iac',
      title: 'S3 bucket allows public access',
      description: 'S3 bucket "user-uploads" is configured to allow public read access, potentially exposing sensitive data.',
      repository: 'infrastructure/terraform',
      file: 'modules/storage/s3.tf',
      line: 34,
      aiSuggestion: 'Set block_public_acls and block_public_policy to true. Use CloudFront with signed URLs for public access.',
      autofixAvailable: true,
      status: 'open',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: '5',
      severity: 'medium',
      type: 'sast',
      title: 'Hardcoded encryption key in source code',
      description: 'Encryption key is hardcoded in the application, reducing security.',
      repository: 'backend/user-service',
      file: 'src/utils/crypto.ts',
      line: 8,
      aiSuggestion: 'Store encryption keys in environment variables or a secure key management system.',
      autofixAvailable: false,
      status: 'open',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('open');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default: return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sast': return <FileCode className="w-4 h-4" />;
      case 'sca': return <Code className="w-4 h-4" />;
      case 'secrets': return <Lock className="w-4 h-4" />;
      case 'iac': return <Cloud className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (filterType !== 'all' && alert.type !== filterType) return false;
    if (filterStatus !== 'all' && alert.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
    autofixAvailable: alerts.filter(a => a.autofixAvailable).length,
  };

  const handleSnooze = (alertId: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, status: 'snoozed' as const } : a));
  };

  const handleResolve = (alertId: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? {
      ...a,
      status: 'resolved' as const,
      resolvedAt: new Date().toISOString()
    } : a));
  };

  const handleIgnore = (alertId: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, status: 'ignored' as const } : a));
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
            <Link href="/security" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/security/repositories" className="text-gray-300 hover:text-white transition-colors">Repositories</Link>
            <Link href="/security/alerts" className="text-white font-semibold">Alerts</Link>
            <Link href="/security/cloud" className="text-gray-300 hover:text-white transition-colors">Cloud</Link>
            <Link href="/security/team" className="text-gray-300 hover:text-white transition-colors">Team</Link>
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
            Security Alerts
          </motion.h1>
          <p className="text-gray-400">{filteredAlerts.length} alerts found</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-4 rounded-xl"
          >
            <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-xs text-gray-400">Total</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-4 rounded-xl border border-red-500/30"
          >
            <div className="text-2xl font-bold text-red-400 mb-1">{stats.critical}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-4 rounded-xl border border-orange-500/30"
          >
            <div className="text-2xl font-bold text-orange-400 mb-1">{stats.high}</div>
            <div className="text-xs text-gray-400">High</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-4 rounded-xl border border-yellow-500/30"
          >
            <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.medium}</div>
            <div className="text-xs text-gray-400">Medium</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-4 rounded-xl border border-blue-500/30"
          >
            <div className="text-2xl font-bold text-blue-400 mb-1">{stats.low}</div>
            <div className="text-xs text-gray-400">Low</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-4 rounded-xl border border-neon-purple/30"
          >
            <div className="text-2xl font-bold text-neon-purple mb-1">{stats.autofixAvailable}</div>
            <div className="text-xs text-gray-400">Autofix</div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-4 rounded-xl mb-6 flex items-center gap-4"
        >
          <Filter className="w-5 h-5 text-gray-400" />

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="glass px-4 py-2 rounded-lg text-white outline-none"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="glass px-4 py-2 rounded-lg text-white outline-none"
          >
            <option value="all">All Types</option>
            <option value="sast">SAST</option>
            <option value="sca">SCA</option>
            <option value="secrets">Secrets</option>
            <option value="iac">IaC</option>
            <option value="cloud">Cloud</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="glass px-4 py-2 rounded-lg text-white outline-none"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="snoozed">Snoozed</option>
            <option value="resolved">Resolved</option>
            <option value="ignored">Ignored</option>
          </select>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert, idx) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass-strong p-6 rounded-xl border-2 ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className="glass px-3 py-1 rounded flex items-center gap-1 text-xs">
                      {getTypeIcon(alert.type)}
                      {alert.type.toUpperCase()}
                    </span>
                    {alert.cve && (
                      <span className="glass px-3 py-1 rounded text-xs text-neon-blue">
                        {alert.cve}
                      </span>
                    )}
                    {alert.autofixAvailable && (
                      <span className="glass px-3 py-1 rounded text-xs text-neon-purple flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Autofix Available
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{alert.title}</h3>
                  <p className="text-gray-400 mb-3">{alert.description}</p>

                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      {alert.repository}
                    </span>
                    <span>→</span>
                    <span>{alert.file}:{alert.line}</span>
                    <span>•</span>
                    <span>{new Date(alert.createdAt).toLocaleString()}</span>
                  </div>

                  <div className="glass-strong p-4 rounded-lg flex items-start gap-3">
                    <Brain className="w-5 h-5 text-neon-purple mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-neon-purple mb-1">AI Recommendation</h4>
                      <p className="text-sm text-gray-300">{alert.aiSuggestion}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                {alert.autofixAvailable && alert.status === 'open' && (
                  <button className="bg-gradient-to-r from-neon-purple to-neon-pink px-4 py-2 rounded-lg font-semibold hover:shadow-neon-purple transition-all flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4" />
                    Create Auto-fix PR
                  </button>
                )}
                {alert.status === 'open' && (
                  <>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Resolve
                    </button>
                    <button
                      onClick={() => handleSnooze(alert.id)}
                      className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      Snooze
                    </button>
                    <button
                      onClick={() => handleIgnore(alert.id)}
                      className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2"
                    >
                      <EyeOff className="w-4 h-4" />
                      Ignore
                    </button>
                  </>
                )}
                <Link
                  href={`/security/alerts/${alert.id}`}
                  className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong p-12 rounded-2xl text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No alerts found</h3>
            <p className="text-gray-400">Your code is looking secure!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
