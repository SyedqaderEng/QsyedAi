'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, FileText, Download, Calendar, CheckCircle, XCircle,
  AlertTriangle, TrendingUp, Shield, Filter
} from 'lucide-react';

interface ComplianceReport {
  id: string;
  framework: 'SOC2' | 'ISO27001' | 'PCI-DSS' | 'HIPAA' | 'GDPR' | 'CIS';
  type: 'full' | 'summary' | 'delta';
  status: 'compliant' | 'non-compliant' | 'partial';
  score: number;
  findings: {
    passed: number;
    failed: number;
    warning: number;
    total: number;
  };
  generatedAt: string;
  period: string;
  size: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ComplianceReport[]>([
    {
      id: '1',
      framework: 'SOC2',
      type: 'full',
      status: 'partial',
      score: 78,
      findings: {
        passed: 45,
        failed: 8,
        warning: 12,
        total: 65,
      },
      generatedAt: new Date(Date.now() - 86400000).toISOString(),
      period: 'Q4 2024',
      size: '2.4 MB',
    },
    {
      id: '2',
      framework: 'ISO27001',
      type: 'full',
      status: 'compliant',
      score: 92,
      findings: {
        passed: 112,
        failed: 2,
        warning: 8,
        total: 122,
      },
      generatedAt: new Date(Date.now() - 172800000).toISOString(),
      period: 'Q4 2024',
      size: '3.1 MB',
    },
    {
      id: '3',
      framework: 'PCI-DSS',
      type: 'full',
      status: 'non-compliant',
      score: 65,
      findings: {
        passed: 34,
        failed: 18,
        warning: 6,
        total: 58,
      },
      generatedAt: new Date(Date.now() - 259200000).toISOString(),
      period: 'Q4 2024',
      size: '1.8 MB',
    },
    {
      id: '4',
      framework: 'HIPAA',
      type: 'summary',
      status: 'partial',
      score: 81,
      findings: {
        passed: 67,
        failed: 12,
        warning: 9,
        total: 88,
      },
      generatedAt: new Date(Date.now() - 345600000).toISOString(),
      period: 'Q4 2024',
      size: '980 KB',
    },
    {
      id: '5',
      framework: 'GDPR',
      type: 'full',
      status: 'compliant',
      score: 94,
      findings: {
        passed: 52,
        failed: 1,
        warning: 3,
        total: 56,
      },
      generatedAt: new Date(Date.now() - 432000000).toISOString(),
      period: 'Q3 2024',
      size: '1.6 MB',
    },
    {
      id: '6',
      framework: 'CIS',
      type: 'full',
      status: 'partial',
      score: 76,
      findings: {
        passed: 145,
        failed: 38,
        warning: 22,
        total: 205,
      },
      generatedAt: new Date(Date.now() - 518400000).toISOString(),
      period: 'Q3 2024',
      size: '4.2 MB',
    },
  ]);

  const [selectedFramework, setSelectedFramework] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400';
      case 'non-compliant': return 'text-red-400';
      case 'partial': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-5 h-5" />;
      case 'non-compliant': return <XCircle className="w-5 h-5" />;
      case 'partial': return <AlertTriangle className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredReports = selectedFramework === 'all'
    ? reports
    : reports.filter(r => r.framework === selectedFramework);

  const overallStats = {
    totalReports: reports.length,
    compliant: reports.filter(r => r.status === 'compliant').length,
    nonCompliant: reports.filter(r => r.status === 'non-compliant').length,
    partial: reports.filter(r => r.status === 'partial').length,
    avgScore: Math.round(reports.reduce((acc, r) => acc + r.score, 0) / reports.length),
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
            Aikido Security
          </Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-2 text-white flex items-center gap-3"
            >
              <FileText className="w-10 h-10 text-neon-green" />
              Compliance Reports
            </motion.h1>
            <p className="text-gray-400">Security compliance across multiple frameworks</p>
          </div>

          <button className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Generate Report
          </button>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{overallStats.totalReports}</div>
            <div className="text-xs text-gray-400">Total Reports</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-4 rounded-xl border border-green-500/30">
            <div className="text-2xl font-bold text-green-400 mb-1">{overallStats.compliant}</div>
            <div className="text-xs text-gray-400">Compliant</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-4 rounded-xl border border-yellow-500/30">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{overallStats.partial}</div>
            <div className="text-xs text-gray-400">Partial</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-4 rounded-xl border border-red-500/30">
            <div className="text-2xl font-bold text-red-400 mb-1">{overallStats.nonCompliant}</div>
            <div className="text-xs text-gray-400">Non-Compliant</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-4 rounded-xl border border-neon-purple/30">
            <div className="text-2xl font-bold text-neon-purple mb-1">{overallStats.avgScore}%</div>
            <div className="text-xs text-gray-400">Avg Score</div>
          </motion.div>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-4 rounded-xl mb-6 flex items-center gap-4"
        >
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
            className="glass px-4 py-2 rounded-lg text-white outline-none"
          >
            <option value="all">All Frameworks</option>
            <option value="SOC2">SOC 2</option>
            <option value="ISO27001">ISO 27001</option>
            <option value="PCI-DSS">PCI-DSS</option>
            <option value="HIPAA">HIPAA</option>
            <option value="GDPR">GDPR</option>
            <option value="CIS">CIS Benchmarks</option>
          </select>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-400">Export Format:</span>
            <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all text-sm">PDF</button>
            <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all text-sm">CSV</button>
            <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all text-sm">JSON</button>
          </div>
        </motion.div>

        {/* Reports List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredReports.map((report, idx) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-strong p-6 rounded-2xl hover:scale-[1.02] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-white">{report.framework}</h3>
                    <div className={`flex items-center gap-2 ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="text-sm font-semibold capitalize">{report.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="glass px-3 py-1 rounded text-xs capitalize">{report.type} Report</span>
                    <span className="glass px-3 py-1 rounded text-xs">{report.period}</span>
                    <span className="glass px-3 py-1 rounded text-xs">{report.size}</span>
                  </div>

                  {/* Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Compliance Score</span>
                      <span className={`text-2xl font-bold ${getScoreColor(report.score)}`}>
                        {report.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          report.score >= 90 ? 'bg-green-400' :
                          report.score >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${report.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="glass p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Findings Breakdown</h4>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">{report.findings.total}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-400">{report.findings.passed}</div>
                        <div className="text-xs text-gray-500">Passed</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-yellow-400">{report.findings.warning}</div>
                        <div className="text-xs text-gray-500">Warning</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-red-400">{report.findings.failed}</div>
                        <div className="text-xs text-gray-500">Failed</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Generated {new Date(report.generatedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                <button className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple py-2 rounded-lg font-semibold hover:shadow-neon-blue transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex-1 glass py-2 rounded-lg hover:glass-strong transition-all">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance Framework Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-strong p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-neon-blue" />
            Compliance Frameworks
          </h2>
          <p className="text-gray-400 mb-6">Track your compliance across industry-standard security frameworks</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">🔒 SOC 2</h3>
              <p className="text-sm text-gray-400">Service Organization Control - Trust Services Criteria</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">🌍 ISO 27001</h3>
              <p className="text-sm text-gray-400">Information Security Management Systems</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">💳 PCI-DSS</h3>
              <p className="text-sm text-gray-400">Payment Card Industry Data Security Standard</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">🏥 HIPAA</h3>
              <p className="text-sm text-gray-400">Health Insurance Portability and Accountability Act</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">🇪🇺 GDPR</h3>
              <p className="text-sm text-gray-400">General Data Protection Regulation</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">⚙️ CIS Benchmarks</h3>
              <p className="text-sm text-gray-400">Center for Internet Security Controls</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
