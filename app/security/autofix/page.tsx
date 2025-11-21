'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, Brain, GitPullRequest, CheckCircle, Clock, XCircle,
  Code, Zap, TrendingUp, Eye, FileCode
} from 'lucide-react';

interface AutofixPR {
  id: string;
  title: string;
  repository: string;
  branch: string;
  status: 'pending' | 'created' | 'merged' | 'closed' | 'failed';
  vulnerability: {
    type: string;
    severity: 'critical' | 'high' | 'medium';
    cve?: string;
  };
  changes: {
    filesChanged: number;
    additions: number;
    deletions: number;
  };
  aiConfidence: number;
  tests: {
    passed: number;
    failed: number;
    total: number;
  };
  createdAt: string;
  mergedAt?: string;
  prUrl?: string;
}

export default function AutofixPage() {
  const [autofixPRs, setAutofixPRs] = useState<AutofixPR[]>([
    {
      id: '1',
      title: 'Fix SQL Injection in auth controller',
      repository: 'backend/user-service',
      branch: 'autofix/sql-injection-auth-ts-45',
      status: 'created',
      vulnerability: {
        type: 'SQL Injection',
        severity: 'critical',
        cve: 'CWE-89',
      },
      changes: {
        filesChanged: 2,
        additions: 15,
        deletions: 8,
      },
      aiConfidence: 0.95,
      tests: {
        passed: 24,
        failed: 0,
        total: 24,
      },
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      prUrl: 'https://github.com/acme/user-service/pull/123',
    },
    {
      id: '2',
      title: 'Update express to 4.18.2 (CVE-2024-1234)',
      repository: 'frontend/dashboard',
      branch: 'autofix/dependency-express-4-18-2',
      status: 'merged',
      vulnerability: {
        type: 'Known Vulnerability',
        severity: 'high',
        cve: 'CVE-2024-1234',
      },
      changes: {
        filesChanged: 1,
        additions: 1,
        deletions: 1,
      },
      aiConfidence: 0.99,
      tests: {
        passed: 156,
        failed: 0,
        total: 156,
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      mergedAt: new Date(Date.now() - 3600000).toISOString(),
      prUrl: 'https://github.com/acme/dashboard/pull/456',
    },
    {
      id: '3',
      title: 'Replace MD5 with bcrypt for password hashing',
      repository: 'backend/user-service',
      branch: 'autofix/insecure-crypto-hash-ts-12',
      status: 'created',
      vulnerability: {
        type: 'Insecure Cryptography',
        severity: 'high',
      },
      changes: {
        filesChanged: 3,
        additions: 42,
        deletions: 18,
      },
      aiConfidence: 0.88,
      tests: {
        passed: 18,
        failed: 2,
        total: 20,
      },
      createdAt: new Date(Date.now() - 14400000).toISOString(),
      prUrl: 'https://github.com/acme/user-service/pull/124',
    },
    {
      id: '4',
      title: 'Sanitize user input in profile component',
      repository: 'frontend/dashboard',
      branch: 'autofix/xss-userprofile-tsx-23',
      status: 'pending',
      vulnerability: {
        type: 'Cross-Site Scripting',
        severity: 'critical',
      },
      changes: {
        filesChanged: 1,
        additions: 8,
        deletions: 3,
      },
      aiConfidence: 0.92,
      tests: {
        passed: 0,
        failed: 0,
        total: 0,
      },
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: '5',
      title: 'Enable S3 bucket encryption',
      repository: 'infrastructure/terraform',
      branch: 'autofix/s3-encryption-s3-tf-15',
      status: 'failed',
      vulnerability: {
        type: 'Missing Encryption',
        severity: 'high',
      },
      changes: {
        filesChanged: 1,
        additions: 5,
        deletions: 2,
      },
      aiConfidence: 0.78,
      tests: {
        passed: 0,
        failed: 1,
        total: 1,
      },
      createdAt: new Date(Date.now() - 10800000).toISOString(),
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'merged': return 'text-green-400';
      case 'created': return 'text-blue-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      case 'closed': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'merged': return <CheckCircle className="w-4 h-4" />;
      case 'created': return <GitPullRequest className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <GitPullRequest className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default: return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
    }
  };

  const stats = {
    total: autofixPRs.length,
    merged: autofixPRs.filter(pr => pr.status === 'merged').length,
    pending: autofixPRs.filter(pr => pr.status === 'pending').length,
    created: autofixPRs.filter(pr => pr.status === 'created').length,
    failed: autofixPRs.filter(pr => pr.status === 'failed').length,
    avgConfidence: (autofixPRs.reduce((acc, pr) => acc + pr.aiConfidence, 0) / autofixPRs.length * 100).toFixed(0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className="relative z-10 glass-strong border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/security" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Security
          </Link>
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Syed.AI Security
          </Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 text-white flex items-center gap-3"
          >
            <Brain className="w-10 h-10 text-neon-purple" />
            AI Auto-Fix
          </motion.h1>
          <p className="text-gray-400">Automated security fixes powered by AI</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-xs text-gray-400">Total PRs</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-4 rounded-xl border border-green-500/30">
            <div className="text-2xl font-bold text-green-400 mb-1">{stats.merged}</div>
            <div className="text-xs text-gray-400">Merged</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-4 rounded-xl border border-blue-500/30">
            <div className="text-2xl font-bold text-blue-400 mb-1">{stats.created}</div>
            <div className="text-xs text-gray-400">Open</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-4 rounded-xl border border-yellow-500/30">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.pending}</div>
            <div className="text-xs text-gray-400">Pending</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-4 rounded-xl border border-red-500/30">
            <div className="text-2xl font-bold text-red-400 mb-1">{stats.failed}</div>
            <div className="text-xs text-gray-400">Failed</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass p-4 rounded-xl border border-neon-purple/30">
            <div className="text-2xl font-bold text-neon-purple mb-1">{stats.avgConfidence}%</div>
            <div className="text-xs text-gray-400">AI Confidence</div>
          </motion.div>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-6 rounded-2xl mb-8 border-2 border-neon-purple/30"
        >
          <div className="flex items-start gap-4">
            <Brain className="w-8 h-8 text-neon-purple flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">How AI Auto-Fix Works</h3>
              <p className="text-gray-300 mb-3">
                Our AI analyzes security vulnerabilities and automatically generates pull requests with fixes. Each fix is:
              </p>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li>Validated against security best practices and OWASP guidelines</li>
                <li>Tested automatically with your existing test suite</li>
                <li>Reviewed for potential side effects and breaking changes</li>
                <li>Assigned a confidence score based on code complexity and test coverage</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Auto-fix PRs List */}
        <div className="space-y-6">
          {autofixPRs.map((pr, idx) => (
            <motion.div
              key={pr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex items-center gap-2 ${getStatusColor(pr.status)}`}>
                      {getStatusIcon(pr.status)}
                      <span className="text-sm font-semibold uppercase">{pr.status}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getSeverityColor(pr.vulnerability.severity)}`}>
                      {pr.vulnerability.severity}
                    </span>
                    <span className="glass px-3 py-1 rounded text-xs">{pr.vulnerability.type}</span>
                    {pr.vulnerability.cve && (
                      <span className="glass px-3 py-1 rounded text-xs text-neon-blue">{pr.vulnerability.cve}</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{pr.title}</h3>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      {pr.repository}
                    </span>
                    <span>→</span>
                    <span className="font-mono text-xs">{pr.branch}</span>
                  </div>

                  {/* Changes & Tests */}
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="glass p-3 rounded-lg">
                      <h4 className="text-xs text-gray-400 mb-2">Code Changes</h4>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-white">{pr.changes.filesChanged} files</span>
                        <span className="text-green-400">+{pr.changes.additions}</span>
                        <span className="text-red-400">-{pr.changes.deletions}</span>
                      </div>
                    </div>

                    <div className="glass p-3 rounded-lg">
                      <h4 className="text-xs text-gray-400 mb-2">Test Results</h4>
                      <div className="flex items-center gap-3 text-sm">
                        {pr.tests.total > 0 ? (
                          <>
                            <span className="text-green-400">{pr.tests.passed} passed</span>
                            {pr.tests.failed > 0 && (
                              <span className="text-red-400">{pr.tests.failed} failed</span>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-500">Pending</span>
                        )}
                      </div>
                    </div>

                    <div className="glass p-3 rounded-lg">
                      <h4 className="text-xs text-gray-400 mb-2">AI Confidence</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-neon-purple to-neon-pink h-2 rounded-full"
                            style={{ width: `${pr.aiConfidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-neon-purple">{(pr.aiConfidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Created {new Date(pr.createdAt).toLocaleString()}</span>
                    {pr.mergedAt && (
                      <>
                        <span>•</span>
                        <span>Merged {new Date(pr.mergedAt).toLocaleString()}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                {pr.prUrl && (
                  <a
                    href={pr.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View PR
                  </a>
                )}
                {pr.status === 'pending' && (
                  <button className="bg-gradient-to-r from-neon-purple to-neon-pink px-4 py-2 rounded-lg font-semibold hover:shadow-neon-purple transition-all flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4" />
                    Create PR
                  </button>
                )}
                {pr.status === 'created' && (
                  <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Approve & Merge
                  </button>
                )}
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2">
                  <FileCode className="w-4 h-4" />
                  View Diff
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-strong p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-neon-yellow" />
            Auto-Fix Configuration
          </h2>
          <p className="text-gray-400 mb-6">Configure automatic fix generation settings</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-white">Enabled Fix Types</h3>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300">Dependency Updates (SCA)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300">Code Vulnerabilities (SAST)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-300">IaC Misconfigurations</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-300">Cloud Misconfigurations</span>
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-white">Automation Settings</h3>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300">Auto-create PRs for high confidence fixes (≥90%)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-300">Auto-merge PRs with passing tests</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300">Request code review for critical fixes</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300">Run CI/CD tests before creating PR</span>
              </label>
            </div>
          </div>

          <button className="mt-6 bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all">
            Save Configuration
          </button>
        </motion.div>
      </div>
    </div>
  );
}
