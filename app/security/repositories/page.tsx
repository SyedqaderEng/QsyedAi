'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  GitBranch, AlertTriangle, CheckCircle, Clock, Play, Settings,
  Github, GitlabIcon as Gitlab, Code, Shield, Lock, FileCode, XCircle
} from 'lucide-react';

interface Repository {
  id: string;
  name: string;
  provider: 'github' | 'gitlab' | 'bitbucket';
  url: string;
  branch: string;
  lastScan: string;
  status: 'scanned' | 'scanning' | 'pending' | 'failed';
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  scanTypes: {
    sast: boolean;
    sca: boolean;
    secrets: boolean;
    iac: boolean;
  };
}

export default function RepositoriesPage() {
  const [repositories, setRepositories] = useState<Repository[]>([
    {
      id: '1',
      name: 'backend/user-service',
      provider: 'github',
      url: 'https://github.com/acme/user-service',
      branch: 'main',
      lastScan: new Date(Date.now() - 300000).toISOString(),
      status: 'scanned',
      findings: { critical: 3, high: 8, medium: 15, low: 42 },
      scanTypes: { sast: true, sca: true, secrets: true, iac: false },
    },
    {
      id: '2',
      name: 'frontend/dashboard',
      provider: 'github',
      url: 'https://github.com/acme/dashboard',
      branch: 'main',
      lastScan: new Date(Date.now() - 600000).toISOString(),
      status: 'scanned',
      findings: { critical: 0, high: 2, medium: 12, low: 28 },
      scanTypes: { sast: true, sca: true, secrets: true, iac: false },
    },
    {
      id: '3',
      name: 'infrastructure/terraform',
      provider: 'gitlab',
      url: 'https://gitlab.com/acme/terraform',
      branch: 'main',
      lastScan: new Date(Date.now() - 900000).toISOString(),
      status: 'scanned',
      findings: { critical: 5, high: 12, medium: 8, low: 5 },
      scanTypes: { sast: false, sca: false, secrets: true, iac: true },
    },
    {
      id: '4',
      name: 'mobile/ios-app',
      provider: 'github',
      url: 'https://github.com/acme/ios-app',
      branch: 'develop',
      lastScan: '',
      status: 'pending',
      findings: { critical: 0, high: 0, medium: 0, low: 0 },
      scanTypes: { sast: true, sca: true, secrets: true, iac: false },
    },
  ]);

  const [showConnectModal, setShowConnectModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scanned': return 'text-green-400';
      case 'scanning': return 'text-blue-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'gitlab': return <Gitlab className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const handleScanRepo = (repoId: string) => {
    setRepositories(repos =>
      repos.map(repo =>
        repo.id === repoId ? { ...repo, status: 'scanning' as const } : repo
      )
    );

    // Simulate scan
    setTimeout(() => {
      setRepositories(repos =>
        repos.map(repo =>
          repo.id === repoId
            ? {
                ...repo,
                status: 'scanned' as const,
                lastScan: new Date().toISOString(),
                findings: {
                  critical: Math.floor(Math.random() * 5),
                  high: Math.floor(Math.random() * 15),
                  medium: Math.floor(Math.random() * 30),
                  low: Math.floor(Math.random() * 50),
                },
              }
            : repo
        )
      );
    }, 3000);
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
            <Link href="/security/repositories" className="text-white font-semibold">Repositories</Link>
            <Link href="/security/alerts" className="text-gray-300 hover:text-white transition-colors">Alerts</Link>
            <Link href="/security/cloud" className="text-gray-300 hover:text-white transition-colors">Cloud</Link>
            <Link href="/security/team" className="text-gray-300 hover:text-white transition-colors">Team</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-2 text-white"
            >
              Repositories
            </motion.h1>
            <p className="text-gray-400">{repositories.length} repositories connected</p>
          </div>

          <button
            onClick={() => setShowConnectModal(true)}
            className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all flex items-center gap-2"
          >
            <GitBranch className="w-5 h-5" />
            Connect Repository
          </button>
        </div>

        {/* Repositories List */}
        <div className="space-y-4">
          {repositories.map((repo, idx) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-strong p-6 rounded-2xl hover:scale-[1.01] transition-all"
            >
              <div className="flex items-start justify-between">
                {/* Repo Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="glass p-2 rounded-lg">
                      {getProviderIcon(repo.provider)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{repo.name}</h3>
                      <p className="text-sm text-gray-400">{repo.branch} branch</p>
                    </div>
                  </div>

                  {/* Scan Status */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex items-center gap-2 ${getStatusColor(repo.status)}`}>
                      {repo.status === 'scanned' && <CheckCircle className="w-4 h-4" />}
                      {repo.status === 'scanning' && <Clock className="w-4 h-4 animate-spin" />}
                      {repo.status === 'pending' && <Clock className="w-4 h-4" />}
                      {repo.status === 'failed' && <XCircle className="w-4 h-4" />}
                      <span className="text-sm capitalize">{repo.status}</span>
                    </div>
                    {repo.lastScan && (
                      <span className="text-sm text-gray-500">
                        Last scan: {new Date(repo.lastScan).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Scan Types */}
                  <div className="flex items-center gap-2 mb-4">
                    {repo.scanTypes.sast && (
                      <span className="glass px-3 py-1 rounded text-xs flex items-center gap-1">
                        <FileCode className="w-3 h-3" />
                        SAST
                      </span>
                    )}
                    {repo.scanTypes.sca && (
                      <span className="glass px-3 py-1 rounded text-xs flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        SCA
                      </span>
                    )}
                    {repo.scanTypes.secrets && (
                      <span className="glass px-3 py-1 rounded text-xs flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Secrets
                      </span>
                    )}
                    {repo.scanTypes.iac && (
                      <span className="glass px-3 py-1 rounded text-xs flex items-center gap-1">
                        <Code className="w-3 h-3" />
                        IaC
                      </span>
                    )}
                  </div>

                  {/* Findings */}
                  {repo.status === 'scanned' && (
                    <div className="flex items-center gap-4">
                      {repo.findings.critical > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-300">
                            <span className="font-bold text-red-400">{repo.findings.critical}</span> Critical
                          </span>
                        </div>
                      )}
                      {repo.findings.high > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-300">
                            <span className="font-bold text-orange-400">{repo.findings.high}</span> High
                          </span>
                        </div>
                      )}
                      {repo.findings.medium > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm text-gray-300">
                            <span className="font-bold text-yellow-400">{repo.findings.medium}</span> Medium
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-300">
                          <span className="font-bold text-blue-400">{repo.findings.low}</span> Low
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleScanRepo(repo.id)}
                    disabled={repo.status === 'scanning'}
                    className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <Play className="w-4 h-4" />
                    {repo.status === 'scanning' ? 'Scanning...' : 'Scan'}
                  </button>
                  <Link
                    href={`/security/repositories/${repo.id}`}
                    className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all"
                  >
                    View Details
                  </Link>
                  <button className="glass p-2 rounded-lg hover:glass-strong transition-all">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connect Repository Modal */}
      {showConnectModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setShowConnectModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong p-8 rounded-2xl max-w-2xl w-full"
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Connect Git Provider
            </h2>

            <div className="space-y-4 mb-8">
              <button className="w-full glass p-6 rounded-xl hover:glass-strong transition-all flex items-center gap-4">
                <Github className="w-8 h-8" />
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-white">GitHub</h3>
                  <p className="text-sm text-gray-400">Connect your GitHub repositories</p>
                </div>
              </button>

              <button className="w-full glass p-6 rounded-xl hover:glass-strong transition-all flex items-center gap-4">
                <Gitlab className="w-8 h-8" />
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-white">GitLab</h3>
                  <p className="text-sm text-gray-400">Connect your GitLab repositories</p>
                </div>
              </button>

              <button className="w-full glass p-6 rounded-xl hover:glass-strong transition-all flex items-center gap-4">
                <Code className="w-8 h-8" />
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-white">Bitbucket</h3>
                  <p className="text-sm text-gray-400">Connect your Bitbucket repositories</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowConnectModal(false)}
              className="w-full glass px-6 py-3 rounded-lg hover:glass-strong transition-all"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
