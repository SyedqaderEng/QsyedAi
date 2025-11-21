'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  Search,
  Code,
  Shield,
  Key,
  Cloud,
  Globe,
  Package,
  GitBranch,
  Target,
} from 'lucide-react';

interface ScanRecord {
  id: string;
  type: 'sast' | 'sca' | 'secrets' | 'iac' | 'dast' | 'cloud' | 'container';
  repository?: string;
  branch?: string;
  target: string;
  startedAt: string;
  completedAt: string;
  duration: number;
  status: 'completed' | 'failed' | 'partial';
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  };
  resolved: number;
  newFindings: number;
  triggeredBy: 'manual' | 'schedule' | 'commit' | 'pr' | 'api';
  triggeredByUser?: string;
  commitHash?: string;
}

export default function ScanHistoryPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');

  const [scanHistory] = useState<ScanRecord[]>([
    {
      id: '1',
      type: 'sast',
      repository: 'frontend-app',
      branch: 'main',
      target: 'github.com/company/frontend-app',
      startedAt: '2024-01-15T14:30:00Z',
      completedAt: '2024-01-15T14:45:00Z',
      duration: 900,
      status: 'completed',
      findings: { critical: 2, high: 8, medium: 15, low: 23, total: 48 },
      resolved: 5,
      newFindings: 3,
      triggeredBy: 'commit',
      triggeredByUser: 'john.doe',
      commitHash: 'a1b2c3d',
    },
    {
      id: '2',
      type: 'sca',
      repository: 'frontend-app',
      branch: 'main',
      target: 'github.com/company/frontend-app',
      startedAt: '2024-01-15T14:20:00Z',
      completedAt: '2024-01-15T14:35:00Z',
      duration: 900,
      status: 'completed',
      findings: { critical: 5, high: 12, medium: 8, low: 15, total: 40 },
      resolved: 2,
      newFindings: 7,
      triggeredBy: 'commit',
      triggeredByUser: 'john.doe',
      commitHash: 'a1b2c3d',
    },
    {
      id: '3',
      type: 'secrets',
      repository: 'backend-api',
      branch: 'develop',
      target: 'github.com/company/backend-api',
      startedAt: '2024-01-15T13:00:00Z',
      completedAt: '2024-01-15T13:05:00Z',
      duration: 300,
      status: 'completed',
      findings: { critical: 3, high: 1, medium: 0, low: 0, total: 4 },
      resolved: 0,
      newFindings: 4,
      triggeredBy: 'pr',
      triggeredByUser: 'jane.smith',
      commitHash: 'x9y8z7w',
    },
    {
      id: '4',
      type: 'dast',
      target: 'https://api.example.com',
      startedAt: '2024-01-15T12:00:00Z',
      completedAt: '2024-01-15T12:45:00Z',
      duration: 2700,
      status: 'completed',
      findings: { critical: 4, high: 7, medium: 12, low: 18, total: 41 },
      resolved: 1,
      newFindings: 6,
      triggeredBy: 'schedule',
    },
    {
      id: '5',
      type: 'iac',
      repository: 'infrastructure',
      branch: 'main',
      target: 'github.com/company/infrastructure',
      startedAt: '2024-01-15T11:00:00Z',
      completedAt: '2024-01-15T11:10:00Z',
      duration: 600,
      status: 'completed',
      findings: { critical: 1, high: 4, medium: 9, low: 12, total: 26 },
      resolved: 3,
      newFindings: 1,
      triggeredBy: 'manual',
      triggeredByUser: 'admin',
    },
    {
      id: '6',
      type: 'cloud',
      target: 'AWS Account (prod-123456)',
      startedAt: '2024-01-15T10:00:00Z',
      completedAt: '2024-01-15T10:30:00Z',
      duration: 1800,
      status: 'completed',
      findings: { critical: 6, high: 15, medium: 22, low: 31, total: 74 },
      resolved: 8,
      newFindings: 2,
      triggeredBy: 'schedule',
    },
    {
      id: '7',
      type: 'container',
      repository: 'microservices',
      branch: 'main',
      target: 'Docker images (5 images)',
      startedAt: '2024-01-15T09:00:00Z',
      completedAt: '2024-01-15T09:20:00Z',
      duration: 1200,
      status: 'completed',
      findings: { critical: 8, high: 18, medium: 25, low: 42, total: 93 },
      resolved: 4,
      newFindings: 12,
      triggeredBy: 'commit',
      triggeredByUser: 'devops',
      commitHash: 'f5e4d3c',
    },
    {
      id: '8',
      type: 'sast',
      repository: 'mobile-app',
      branch: 'feature/auth',
      target: 'github.com/company/mobile-app',
      startedAt: '2024-01-15T08:00:00Z',
      completedAt: '2024-01-15T08:00:00Z',
      duration: 0,
      status: 'failed',
      findings: { critical: 0, high: 0, medium: 0, low: 0, total: 0 },
      resolved: 0,
      newFindings: 0,
      triggeredBy: 'pr',
      triggeredByUser: 'bob.wilson',
    },
  ]);

  const getScanTypeIcon = (type: string) => {
    switch (type) {
      case 'sast':
        return <Code className="w-5 h-5" />;
      case 'sca':
        return <Package className="w-5 h-5" />;
      case 'secrets':
        return <Key className="w-5 h-5" />;
      case 'iac':
        return <Shield className="w-5 h-5" />;
      case 'dast':
        return <Globe className="w-5 h-5" />;
      case 'cloud':
        return <Cloud className="w-5 h-5" />;
      case 'container':
        return <Target className="w-5 h-5" />;
      default:
        return <Search className="w-5 h-5" />;
    }
  };

  const getScanTypeColor = (type: string) => {
    switch (type) {
      case 'sast':
        return 'text-blue-400 bg-blue-500/10';
      case 'sca':
        return 'text-green-400 bg-green-500/10';
      case 'secrets':
        return 'text-red-400 bg-red-500/10';
      case 'iac':
        return 'text-purple-400 bg-purple-500/10';
      case 'dast':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'cloud':
        return 'text-cyan-400 bg-cyan-500/10';
      case 'container':
        return 'text-orange-400 bg-orange-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const filteredScans = scanHistory.filter((scan) => {
    if (selectedType !== 'all' && scan.type !== selectedType) return false;
    if (searchTerm && !scan.target.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalScans = filteredScans.length;
  const completedScans = filteredScans.filter((s) => s.status === 'completed').length;
  const failedScans = filteredScans.filter((s) => s.status === 'failed').length;
  const totalFindings = filteredScans.reduce((acc, scan) => acc + scan.findings.total, 0);
  const avgDuration = filteredScans.reduce((acc, scan) => acc + scan.duration, 0) / totalScans || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-8">
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
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Scan History</h1>
                <p className="text-gray-400 mt-1">Complete audit trail of all security scans</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4">
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                <span>Total Scans</span>
              </div>
              <div className="text-2xl font-bold text-white">{totalScans}</div>
            </div>
            <div className="glass-panel p-4 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Completed</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{completedScans}</div>
            </div>
            <div className="glass-panel p-4 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Failed</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{failedScans}</div>
            </div>
            <div className="glass-panel p-4 border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                <Target className="w-4 h-4" />
                <span>Total Findings</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{totalFindings}</div>
            </div>
            <div className="glass-panel p-4 border-blue-500/20">
              <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                <Clock className="w-4 h-4" />
                <span>Avg Duration</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{formatDuration(Math.floor(avgDuration))}</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by repository, target, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Scan Types</option>
              <option value="sast">SAST</option>
              <option value="sca">SCA</option>
              <option value="secrets">Secrets</option>
              <option value="iac">IaC</option>
              <option value="dast">DAST</option>
              <option value="cloud">Cloud</option>
              <option value="container">Container</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </motion.div>

        {/* Scan History Timeline */}
        <div className="space-y-4">
          {filteredScans.map((scan, index) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-panel p-6 hover:border-purple-500/30 transition-all ${
                scan.status === 'failed' ? 'border-red-500/20' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Scan Type Icon */}
                  <div className={`p-3 rounded-xl ${getScanTypeColor(scan.type)}`}>
                    {getScanTypeIcon(scan.type)}
                  </div>

                  {/* Scan Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold text-lg">
                        {scan.type.toUpperCase()} Scan
                      </h3>
                      {scan.status === 'completed' ? (
                        <span className="flex items-center gap-1 text-green-400 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </span>
                      ) : scan.status === 'failed' ? (
                        <span className="flex items-center gap-1 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          Failed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-400 text-sm">
                          <Clock className="w-4 h-4" />
                          Partial
                        </span>
                      )}
                    </div>

                    <div className="text-gray-400 text-sm mb-3">{scan.target}</div>

                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(scan.startedAt).toLocaleString()}</span>
                      </div>
                      <span>Duration: {formatDuration(scan.duration)}</span>
                      {scan.repository && (
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4" />
                          <span>{scan.branch}</span>
                        </div>
                      )}
                      {scan.commitHash && (
                        <code className="text-purple-400">{scan.commitHash}</code>
                      )}
                      <span>
                        Triggered by: <span className="text-white">{scan.triggeredBy}</span>
                        {scan.triggeredByUser && ` (${scan.triggeredByUser})`}
                      </span>
                    </div>

                    {/* Findings Summary */}
                    {scan.status === 'completed' && (
                      <div className="flex items-center gap-4">
                        <div className="glass-panel px-4 py-2 border-red-500/20">
                          <span className="text-red-400 font-medium">{scan.findings.critical}</span>
                          <span className="text-gray-400 text-sm ml-2">Critical</span>
                        </div>
                        <div className="glass-panel px-4 py-2 border-orange-500/20">
                          <span className="text-orange-400 font-medium">{scan.findings.high}</span>
                          <span className="text-gray-400 text-sm ml-2">High</span>
                        </div>
                        <div className="glass-panel px-4 py-2 border-yellow-500/20">
                          <span className="text-yellow-400 font-medium">{scan.findings.medium}</span>
                          <span className="text-gray-400 text-sm ml-2">Medium</span>
                        </div>
                        <div className="glass-panel px-4 py-2 border-blue-500/20">
                          <span className="text-blue-400 font-medium">{scan.findings.low}</span>
                          <span className="text-gray-400 text-sm ml-2">Low</span>
                        </div>
                        {scan.newFindings > 0 && (
                          <div className="flex items-center gap-2 text-orange-400">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">{scan.newFindings} new</span>
                          </div>
                        )}
                        {scan.resolved > 0 && (
                          <div className="flex items-center gap-2 text-green-400">
                            <TrendingDown className="w-4 h-4" />
                            <span className="text-sm">{scan.resolved} resolved</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-all">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
