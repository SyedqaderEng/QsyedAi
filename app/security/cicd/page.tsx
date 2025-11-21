'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, CheckCircle, XCircle, Clock, AlertTriangle, Play, Settings, RefreshCw } from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  repository: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  securityGate: 'passed' | 'failed' | 'skipped';
  findings: { critical: number; high: number; medium: number };
  duration: string;
  triggeredBy: string;
  timestamp: string;
}

export default function CICDPage() {
  const pipelines: Pipeline[] = [
    { id: '1', name: 'main-deploy', repository: 'api-service', status: 'passed', securityGate: 'passed', findings: { critical: 0, high: 0, medium: 3 }, duration: '4m 23s', triggeredBy: 'john.doe', timestamp: '10 min ago' },
    { id: '2', name: 'feature/auth', repository: 'frontend', status: 'failed', securityGate: 'failed', findings: { critical: 1, high: 2, medium: 5 }, duration: '2m 15s', triggeredBy: 'sarah.m', timestamp: '25 min ago' },
    { id: '3', name: 'develop', repository: 'backend', status: 'running', securityGate: 'passed', findings: { critical: 0, high: 1, medium: 2 }, duration: '3m 45s', triggeredBy: 'mike.r', timestamp: '5 min ago' },
    { id: '4', name: 'hotfix/security', repository: 'api-service', status: 'passed', securityGate: 'passed', findings: { critical: 0, high: 0, medium: 0 }, duration: '5m 12s', triggeredBy: 'emily.k', timestamp: '1 hour ago' },
    { id: '5', name: 'release/v2.0', repository: 'frontend', status: 'pending', securityGate: 'skipped', findings: { critical: 0, high: 0, medium: 0 }, duration: '-', triggeredBy: 'system', timestamp: '2 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'running': return 'text-blue-400 bg-blue-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return CheckCircle;
      case 'failed': return XCircle;
      case 'running': return RefreshCw;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const stats = {
    total: pipelines.length,
    passed: pipelines.filter(p => p.status === 'passed').length,
    failed: pipelines.filter(p => p.status === 'failed').length,
    blocked: pipelines.filter(p => p.securityGate === 'failed').length,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">CI/CD Security</h1>
            <p className="text-gray-400">Monitor security gates in your pipelines</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            Configure Gates
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Pipelines', value: stats.total, icon: GitBranch },
            { label: 'Passed', value: stats.passed, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Failed', value: stats.failed, icon: XCircle, color: 'text-red-400' },
            { label: 'Security Blocked', value: stats.blocked, icon: AlertTriangle, color: 'text-orange-400' },
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

        {/* Pipelines List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold">Recent Pipelines</h3>
          </div>
          <div className="divide-y divide-white/5">
            {pipelines.map((pipeline, index) => {
              const StatusIcon = getStatusIcon(pipeline.status);
              return (
                <motion.div
                  key={pipeline.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getStatusColor(pipeline.status)}`}>
                        <StatusIcon className={`w-5 h-5 ${pipeline.status === 'running' ? 'animate-spin' : ''}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{pipeline.name}</h4>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-400">{pipeline.repository}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>by {pipeline.triggeredBy}</span>
                          <span>{pipeline.timestamp}</span>
                          <span>{pipeline.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {pipeline.securityGate !== 'skipped' && (
                        <div className="flex items-center gap-3 text-sm">
                          {pipeline.findings.critical > 0 && (
                            <span className="text-red-400">{pipeline.findings.critical}C</span>
                          )}
                          {pipeline.findings.high > 0 && (
                            <span className="text-orange-400">{pipeline.findings.high}H</span>
                          )}
                          {pipeline.findings.medium > 0 && (
                            <span className="text-yellow-400">{pipeline.findings.medium}M</span>
                          )}
                        </div>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        pipeline.securityGate === 'passed' ? 'bg-green-500/20 text-green-400' :
                        pipeline.securityGate === 'failed' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        Gate: {pipeline.securityGate}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
