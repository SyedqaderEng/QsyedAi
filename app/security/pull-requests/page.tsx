'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, CheckCircle, XCircle, Clock, AlertTriangle, MessageSquare, User, Calendar } from 'lucide-react';

interface PullRequest {
  id: string;
  number: number;
  title: string;
  author: string;
  repository: string;
  status: 'passed' | 'failed' | 'pending' | 'in_review';
  findings: { critical: number; high: number; medium: number; low: number };
  createdAt: string;
  comments: number;
}

export default function PullRequestsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const pullRequests: PullRequest[] = [
    { id: '1', number: 423, title: 'Add user authentication flow', author: 'john.doe', repository: 'frontend', status: 'passed', findings: { critical: 0, high: 0, medium: 2, low: 5 }, createdAt: '2 hours ago', comments: 3 },
    { id: '2', number: 422, title: 'Update payment processing logic', author: 'sarah.m', repository: 'api-service', status: 'failed', findings: { critical: 1, high: 2, medium: 4, low: 8 }, createdAt: '4 hours ago', comments: 7 },
    { id: '3', number: 421, title: 'Refactor database queries', author: 'mike.r', repository: 'backend', status: 'pending', findings: { critical: 0, high: 0, medium: 0, low: 0 }, createdAt: '6 hours ago', comments: 1 },
    { id: '4', number: 420, title: 'Fix XSS vulnerability in comments', author: 'emily.k', repository: 'frontend', status: 'passed', findings: { critical: 0, high: 0, medium: 0, low: 2 }, createdAt: '1 day ago', comments: 5 },
    { id: '5', number: 419, title: 'Add rate limiting middleware', author: 'tom.h', repository: 'api-gateway', status: 'in_review', findings: { critical: 0, high: 1, medium: 3, low: 6 }, createdAt: '1 day ago', comments: 12 },
    { id: '6', number: 418, title: 'Update dependencies', author: 'lisa.p', repository: 'shared-lib', status: 'failed', findings: { critical: 2, high: 3, medium: 5, low: 10 }, createdAt: '2 days ago', comments: 4 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'in_review': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return CheckCircle;
      case 'failed': return XCircle;
      case 'pending': return Clock;
      case 'in_review': return AlertTriangle;
      default: return Clock;
    }
  };

  const filteredPRs = pullRequests.filter(pr =>
    filterStatus === 'all' || pr.status === filterStatus
  );

  const stats = {
    total: pullRequests.length,
    passed: pullRequests.filter(pr => pr.status === 'passed').length,
    failed: pullRequests.filter(pr => pr.status === 'failed').length,
    pending: pullRequests.filter(pr => pr.status === 'pending' || pr.status === 'in_review').length,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Pull Request Security</h1>
          <p className="text-gray-400">Security scan results for all pull requests</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total PRs', value: stats.total, icon: GitPullRequest },
            { label: 'Passed', value: stats.passed, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Failed', value: stats.failed, icon: XCircle, color: 'text-red-400' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-400' },
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6"
        >
          {['all', 'passed', 'failed', 'pending', 'in_review'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterStatus === status
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {status === 'in_review' ? 'In Review' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* PR List */}
        <div className="space-y-4">
          {filteredPRs.map((pr, index) => {
            const StatusIcon = getStatusIcon(pr.status);
            return (
              <motion.div
                key={pr.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(pr.status)}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{pr.title}</h3>
                        <span className="text-gray-400">#{pr.number}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {pr.author}
                        </span>
                        <span>{pr.repository}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {pr.createdAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {pr.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {(pr.findings.critical > 0 || pr.findings.high > 0 || pr.findings.medium > 0) && (
                      <div className="flex items-center gap-3 text-sm">
                        {pr.findings.critical > 0 && (
                          <span className="text-red-400">{pr.findings.critical}C</span>
                        )}
                        {pr.findings.high > 0 && (
                          <span className="text-orange-400">{pr.findings.high}H</span>
                        )}
                        {pr.findings.medium > 0 && (
                          <span className="text-yellow-400">{pr.findings.medium}M</span>
                        )}
                      </div>
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(pr.status)}`}>
                      {pr.status === 'in_review' ? 'In Review' : pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
