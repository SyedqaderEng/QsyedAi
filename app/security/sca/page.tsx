'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Package, AlertTriangle, ExternalLink, GitPullRequest, TrendingUp, Filter } from 'lucide-react';

interface SCAFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  packageName: string;
  currentVersion: string;
  fixedVersion: string;
  cve: string;
  cvss: number;
  description: string;
  repository: string;
  file: string;
  exploitAvailable: boolean;
  patchAvailable: boolean;
  malicious: boolean;
  references: string[];
}

export default function SCAPage() {
  const [findings, setFindings] = useState<SCAFinding[]>([
    {
      id: '1',
      severity: 'critical',
      packageName: 'express',
      currentVersion: '4.16.0',
      fixedVersion: '4.18.2',
      cve: 'CVE-2024-1234',
      cvss: 9.8,
      description: 'Remote Code Execution vulnerability in Express.js middleware handling. An attacker can execute arbitrary code by sending specially crafted HTTP requests.',
      repository: 'frontend/dashboard',
      file: 'package.json',
      exploitAvailable: true,
      patchAvailable: true,
      malicious: false,
      references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1234'],
    },
    {
      id: '2',
      severity: 'critical',
      packageName: 'lodash',
      currentVersion: '4.17.15',
      fixedVersion: '4.17.21',
      cve: 'CVE-2021-23337',
      cvss: 9.1,
      description: 'Prototype pollution vulnerability that allows attackers to modify Object.prototype properties, leading to potential RCE.',
      repository: 'backend/user-service',
      file: 'package.json',
      exploitAvailable: true,
      patchAvailable: true,
      malicious: false,
      references: ['https://nvd.nist.gov/vuln/detail/CVE-2021-23337'],
    },
    {
      id: '3',
      severity: 'high',
      packageName: 'axios',
      currentVersion: '0.21.0',
      fixedVersion: '0.21.4',
      cve: 'CVE-2021-3749',
      cvss: 7.5,
      description: 'Server-Side Request Forgery (SSRF) vulnerability allowing attackers to make requests to internal services.',
      repository: 'backend/api-gateway',
      file: 'package.json',
      exploitAvailable: false,
      patchAvailable: true,
      malicious: false,
      references: ['https://nvd.nist.gov/vuln/detail/CVE-2021-3749'],
    },
    {
      id: '4',
      severity: 'high',
      packageName: 'jsonwebtoken',
      currentVersion: '8.5.0',
      fixedVersion: '9.0.0',
      cve: 'CVE-2022-23529',
      cvss: 7.6,
      description: 'Improper verification of cryptographic signature allowing authentication bypass.',
      repository: 'backend/auth-service',
      file: 'package.json',
      exploitAvailable: false,
      patchAvailable: true,
      malicious: false,
      references: ['https://nvd.nist.gov/vuln/detail/CVE-2022-23529'],
    },
    {
      id: '5',
      severity: 'critical',
      packageName: 'malicious-pkg-v2',
      currentVersion: '1.2.3',
      fixedVersion: 'Remove package',
      cve: 'N/A',
      cvss: 10.0,
      description: 'MALICIOUS PACKAGE: Contains cryptocurrency miner and credential stealer. This package was identified as malware by security researchers.',
      repository: 'backend/worker',
      file: 'package.json',
      exploitAvailable: true,
      patchAvailable: false,
      malicious: true,
      references: ['https://socket.dev/malicious-packages'],
    },
    {
      id: '6',
      severity: 'medium',
      packageName: 'node-fetch',
      currentVersion: '2.6.0',
      fixedVersion: '2.6.7',
      cve: 'CVE-2022-0235',
      cvss: 6.1,
      description: 'Exposure of sensitive information through DNS rebinding attacks.',
      repository: 'backend/scraper',
      file: 'package.json',
      exploitAvailable: false,
      patchAvailable: true,
      malicious: false,
      references: ['https://nvd.nist.gov/vuln/detail/CVE-2022-0235'],
    },
  ]);

  const [filter, setFilter] = useState({
    severity: 'all',
    exploitable: 'all',
    repository: 'all',
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default: return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
    }
  };

  const getCVSSColor = (score: number) => {
    if (score >= 9.0) return 'text-red-400';
    if (score >= 7.0) return 'text-orange-400';
    if (score >= 4.0) return 'text-yellow-400';
    return 'text-blue-400';
  };

  const filteredFindings = findings.filter(f => {
    if (filter.severity !== 'all' && f.severity !== filter.severity) return false;
    if (filter.exploitable === 'true' && !f.exploitAvailable) return false;
    if (filter.repository !== 'all' && f.repository !== filter.repository) return false;
    return true;
  });

  const stats = {
    total: findings.length,
    critical: findings.filter(f => f.severity === 'critical').length,
    high: findings.filter(f => f.severity === 'high').length,
    medium: findings.filter(f => f.severity === 'medium').length,
    exploitable: findings.filter(f => f.exploitAvailable).length,
    malicious: findings.filter(f => f.malicious).length,
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
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 text-white flex items-center gap-3"
          >
            <Package className="w-10 h-10 text-neon-purple" />
            SCA Findings
          </motion.h1>
          <p className="text-gray-400">Software Composition Analysis - Dependency Vulnerabilities</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-xs text-gray-400">Total</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-4 rounded-xl border border-red-500/30">
            <div className="text-2xl font-bold text-red-400 mb-1">{stats.critical}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-4 rounded-xl border border-orange-500/30">
            <div className="text-2xl font-bold text-orange-400 mb-1">{stats.high}</div>
            <div className="text-xs text-gray-400">High</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-4 rounded-xl border border-yellow-500/30">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.medium}</div>
            <div className="text-xs text-gray-400">Medium</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-4 rounded-xl border border-neon-pink/30">
            <div className="text-2xl font-bold text-neon-pink mb-1">{stats.exploitable}</div>
            <div className="text-xs text-gray-400">Exploitable</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass p-4 rounded-xl border border-red-500/50">
            <div className="text-2xl font-bold text-red-500 mb-1">{stats.malicious}</div>
            <div className="text-xs text-gray-400">Malicious</div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong p-4 rounded-xl mb-6 flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select value={filter.severity} onChange={(e) => setFilter({ ...filter, severity: e.target.value })} className="glass px-4 py-2 rounded-lg text-white outline-none">
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select value={filter.exploitable} onChange={(e) => setFilter({ ...filter, exploitable: e.target.value })} className="glass px-4 py-2 rounded-lg text-white outline-none">
            <option value="all">All Packages</option>
            <option value="true">Exploitable Only</option>
          </select>
        </motion.div>

        {/* Findings List */}
        <div className="space-y-6">
          {filteredFindings.map((finding, idx) => (
            <motion.div
              key={finding.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass-strong p-6 rounded-2xl border-2 ${finding.malicious ? 'border-red-500' : getSeverityColor(finding.severity)}`}
            >
              {finding.malicious && (
                <div className="mb-4 bg-red-500/20 border border-red-500 p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-bold">⚠️ MALICIOUS PACKAGE DETECTED</span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityColor(finding.severity)}`}>
                      {finding.severity}
                    </span>
                    {finding.cve !== 'N/A' && (
                      <span className="glass px-3 py-1 rounded text-xs text-neon-blue">{finding.cve}</span>
                    )}
                    <span className={`glass px-3 py-1 rounded text-xs font-bold ${getCVSSColor(finding.cvss)}`}>
                      CVSS {finding.cvss}
                    </span>
                    {finding.exploitAvailable && (
                      <span className="glass px-3 py-1 rounded text-xs text-neon-pink flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Exploit Available
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-white">{finding.packageName}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-red-400">{finding.currentVersion}</span>
                      <span className="text-gray-500">→</span>
                      <span className="text-green-400">{finding.fixedVersion}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4">{finding.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span>{finding.repository}</span>
                    <span>→</span>
                    <span>{finding.file}</span>
                  </div>

                  {/* References */}
                  <div className="flex items-center gap-2">
                    {finding.references.map((ref, i) => (
                      <a
                        key={i}
                        href={ref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass px-3 py-1 rounded text-xs text-neon-blue hover:text-neon-purple transition-colors flex items-center gap-1"
                      >
                        View CVE Details
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                {finding.patchAvailable && !finding.malicious && (
                  <button className="bg-gradient-to-r from-neon-purple to-neon-pink px-4 py-2 rounded-lg font-semibold hover:shadow-neon-purple transition-all flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4" />
                    Auto-Update to {finding.fixedVersion}
                  </button>
                )}
                {finding.malicious && (
                  <button className="bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Remove Package Immediately
                  </button>
                )}
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all">
                  View in Package.json
                </button>
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all">
                  Snooze
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
