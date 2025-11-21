'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Layers,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Code,
  Package,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Download,
  PlayCircle,
  AlertCircle,
  Lock,
  Unlock,
} from 'lucide-react';

interface ContainerImage {
  id: string;
  name: string;
  tag: string;
  registry: string;
  digest: string;
  size: string;
  created: string;
  lastScanned: string;
  scanStatus: 'passed' | 'failed' | 'warning' | 'scanning' | 'not-scanned';
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  layers: number;
  baseImage: string;
  hasRootUser: boolean;
  exposedPorts: string[];
  secrets: number;
  compliance: {
    cis: boolean;
    nist: boolean;
  };
}

interface ContainerVulnerability {
  id: string;
  image: string;
  packageName: string;
  installedVersion: string;
  fixedVersion: string;
  cve: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvss: number;
  description: string;
  layer: string;
  path: string;
}

export default function ContainerSecurityPage() {
  const [activeTab, setActiveTab] = useState<'images' | 'vulnerabilities' | 'compliance'>('images');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const [images] = useState<ContainerImage[]>([
    {
      id: '1',
      name: 'frontend-app',
      tag: 'v2.1.0',
      registry: 'docker.io',
      digest: 'sha256:a1b2c3d4...',
      size: '1.2 GB',
      created: '2024-01-15T10:00:00Z',
      lastScanned: '2 hours ago',
      scanStatus: 'failed',
      vulnerabilities: { critical: 8, high: 15, medium: 23, low: 45 },
      layers: 12,
      baseImage: 'node:18-alpine',
      hasRootUser: true,
      exposedPorts: ['3000', '9229'],
      secrets: 2,
      compliance: { cis: false, nist: true },
    },
    {
      id: '2',
      name: 'backend-api',
      tag: 'latest',
      registry: 'gcr.io',
      digest: 'sha256:e5f6g7h8...',
      size: '856 MB',
      created: '2024-01-14T15:30:00Z',
      lastScanned: '4 hours ago',
      scanStatus: 'warning',
      vulnerabilities: { critical: 2, high: 7, medium: 12, low: 28 },
      layers: 8,
      baseImage: 'python:3.11-slim',
      hasRootUser: false,
      exposedPorts: ['8000'],
      secrets: 0,
      compliance: { cis: true, nist: true },
    },
    {
      id: '3',
      name: 'nginx-proxy',
      tag: 'v1.0.5',
      registry: 'docker.io',
      digest: 'sha256:i9j0k1l2...',
      size: '145 MB',
      created: '2024-01-10T08:00:00Z',
      lastScanned: '1 day ago',
      scanStatus: 'passed',
      vulnerabilities: { critical: 0, high: 0, medium: 2, low: 5 },
      layers: 5,
      baseImage: 'nginx:alpine',
      hasRootUser: false,
      exposedPorts: ['80', '443'],
      secrets: 0,
      compliance: { cis: true, nist: true },
    },
    {
      id: '4',
      name: 'database',
      tag: 'postgres-15',
      registry: 'docker.io',
      digest: 'sha256:m3n4o5p6...',
      size: '412 MB',
      created: '2024-01-12T12:00:00Z',
      lastScanned: 'Never',
      scanStatus: 'not-scanned',
      vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
      layers: 10,
      baseImage: 'postgres:15-alpine',
      hasRootUser: true,
      exposedPorts: ['5432'],
      secrets: 0,
      compliance: { cis: false, nist: false },
    },
    {
      id: '5',
      name: 'microservice-auth',
      tag: 'v3.2.1',
      registry: 'gcr.io',
      digest: 'sha256:q7r8s9t0...',
      size: '678 MB',
      created: '2024-01-13T14:20:00Z',
      lastScanned: '6 hours ago',
      scanStatus: 'warning',
      vulnerabilities: { critical: 3, high: 9, medium: 18, low: 32 },
      layers: 9,
      baseImage: 'openjdk:17-slim',
      hasRootUser: false,
      exposedPorts: ['8080', '8443'],
      secrets: 1,
      compliance: { cis: true, nist: false },
    },
  ]);

  const [vulnerabilities] = useState<ContainerVulnerability[]>([
    {
      id: '1',
      image: 'frontend-app:v2.1.0',
      packageName: 'openssl',
      installedVersion: '1.1.1g',
      fixedVersion: '1.1.1w',
      cve: 'CVE-2024-1234',
      severity: 'critical',
      cvss: 9.8,
      description: 'Critical buffer overflow in OpenSSL allows remote code execution',
      layer: 'sha256:a1b2c3d4...',
      path: '/usr/lib/libssl.so.1.1',
    },
    {
      id: '2',
      image: 'frontend-app:v2.1.0',
      packageName: 'libc6',
      installedVersion: '2.31-0',
      fixedVersion: '2.31-13',
      cve: 'CVE-2024-5678',
      severity: 'critical',
      cvss: 8.8,
      description: 'Memory corruption vulnerability in glibc',
      layer: 'sha256:a1b2c3d4...',
      path: '/lib/x86_64-linux-gnu/libc.so.6',
    },
    {
      id: '3',
      image: 'backend-api:latest',
      packageName: 'pip',
      installedVersion: '21.0.1',
      fixedVersion: '23.3.0',
      cve: 'CVE-2023-9999',
      severity: 'high',
      cvss: 7.5,
      description: 'Arbitrary command execution via malicious package installation',
      layer: 'sha256:e5f6g7h8...',
      path: '/usr/local/lib/python3.11/site-packages/pip',
    },
    {
      id: '4',
      image: 'microservice-auth:v3.2.1',
      packageName: 'log4j-core',
      installedVersion: '2.17.0',
      fixedVersion: '2.20.0',
      cve: 'CVE-2023-LOG4J',
      severity: 'critical',
      cvss: 10.0,
      description: 'Remote code execution vulnerability in Log4j (Log4Shell variant)',
      layer: 'sha256:q7r8s9t0...',
      path: '/app/lib/log4j-core-2.17.0.jar',
    },
    {
      id: '5',
      image: 'frontend-app:v2.1.0',
      packageName: 'curl',
      installedVersion: '7.68.0',
      fixedVersion: '7.88.0',
      cve: 'CVE-2023-CURL',
      severity: 'high',
      cvss: 7.8,
      description: 'Authentication bypass in libcurl',
      layer: 'sha256:a1b2c3d4...',
      path: '/usr/bin/curl',
    },
  ]);

  const getScanStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'scanning':
        return <Clock className="w-5 h-5 text-blue-400 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'high':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const totalVulns = images.reduce(
    (acc, img) => ({
      critical: acc.critical + img.vulnerabilities.critical,
      high: acc.high + img.vulnerabilities.high,
      medium: acc.medium + img.vulnerabilities.medium,
      low: acc.low + img.vulnerabilities.low,
    }),
    { critical: 0, high: 0, medium: 0, low: 0 }
  );

  const passedImages = images.filter(img => img.scanStatus === 'passed').length;
  const failedImages = images.filter(img => img.scanStatus === 'failed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900/20 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                <Box className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Container Security</h1>
                <p className="text-gray-400 mt-1">
                  Docker image and Kubernetes security scanning
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all">
              <PlayCircle className="w-5 h-5" />
              <span>Scan All Images</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-6 gap-4">
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Layers className="w-4 h-4" />
                <span>Total Images</span>
              </div>
              <div className="text-2xl font-bold text-white">{images.length}</div>
            </div>
            <div className="glass-panel p-4 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Passed</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{passedImages}</div>
            </div>
            <div className="glass-panel p-4 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <XCircle className="w-4 h-4" />
                <span>Failed</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{failedImages}</div>
            </div>
            <div className="glass-panel p-4 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Critical</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{totalVulns.critical}</div>
            </div>
            <div className="glass-panel p-4 border-orange-500/20">
              <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>High</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">{totalVulns.high}</div>
            </div>
            <div className="glass-panel p-4 border-yellow-500/20">
              <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Medium</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{totalVulns.medium}</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10">
          {(['images', 'vulnerabilities', 'compliance'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === tab
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Images Tab */}
        {activeTab === 'images' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-cyan-500/10 rounded-xl">
                      <Box className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold text-lg">
                          {image.name}:{image.tag}
                        </h3>
                        {getScanStatusIcon(image.scanStatus)}
                        {image.hasRootUser && (
                          <div className="flex items-center gap-1 text-orange-400 text-xs">
                            <Unlock className="w-3 h-3" />
                            <span>Root User</span>
                          </div>
                        )}
                        {image.secrets > 0 && (
                          <div className="flex items-center gap-1 text-red-400 text-xs">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{image.secrets} Secrets</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                        <span>{image.registry}</span>
                        <span>{image.size}</span>
                        <span>{image.layers} layers</span>
                        <span>Base: {image.baseImage}</span>
                        <span>Last scan: {image.lastScanned}</span>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        {image.vulnerabilities.critical > 0 && (
                          <span className="px-3 py-1 rounded-lg text-xs font-medium text-red-400 bg-red-500/10">
                            {image.vulnerabilities.critical} Critical
                          </span>
                        )}
                        {image.vulnerabilities.high > 0 && (
                          <span className="px-3 py-1 rounded-lg text-xs font-medium text-orange-400 bg-orange-500/10">
                            {image.vulnerabilities.high} High
                          </span>
                        )}
                        {image.vulnerabilities.medium > 0 && (
                          <span className="px-3 py-1 rounded-lg text-xs font-medium text-yellow-400 bg-yellow-500/10">
                            {image.vulnerabilities.medium} Medium
                          </span>
                        )}
                        {image.vulnerabilities.low > 0 && (
                          <span className="px-3 py-1 rounded-lg text-xs font-medium text-blue-400 bg-blue-500/10">
                            {image.vulnerabilities.low} Low
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Exposed Ports</div>
                          <div className="flex gap-2">
                            {image.exposedPorts.map((port, idx) => (
                              <code key={idx} className="text-purple-400 text-sm">{port}</code>
                            ))}
                          </div>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Compliance</div>
                          <div className="flex gap-2">
                            <span className={`text-xs ${image.compliance.cis ? 'text-green-400' : 'text-gray-500'}`}>
                              CIS {image.compliance.cis ? '✓' : '✗'}
                            </span>
                            <span className={`text-xs ${image.compliance.nist ? 'text-green-400' : 'text-gray-500'}`}>
                              NIST {image.compliance.nist ? '✓' : '✗'}
                            </span>
                          </div>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Digest</div>
                          <code className="text-blue-400 text-xs">{image.digest}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-all">
                    Rescan
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Vulnerabilities Tab */}
        {activeTab === 'vulnerabilities' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {vulnerabilities.map((vuln) => (
              <motion.div
                key={vuln.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`px-3 py-1 rounded-lg text-xs font-medium border ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold text-lg">{vuln.packageName}</h3>
                        <code className="text-purple-400 text-sm">{vuln.cve}</code>
                        <span className="text-gray-400 text-sm">CVSS: {vuln.cvss}</span>
                      </div>
                      <div className="text-gray-400 text-sm mb-3">Image: {vuln.image}</div>
                      <p className="text-gray-300 mb-4">{vuln.description}</p>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Installed Version</div>
                          <code className="text-orange-400">{vuln.installedVersion}</code>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Fixed Version</div>
                          <code className="text-green-400">{vuln.fixedVersion}</code>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Layer</div>
                          <code className="text-blue-400 text-xs">{vuln.layer.substring(0, 20)}...</code>
                        </div>
                      </div>

                      <div className="mt-4 glass-panel p-3 bg-black/30">
                        <div className="text-gray-400 text-xs mb-1">File Path</div>
                        <code className="text-gray-300 text-sm">{vuln.path}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-400" />
                CIS Docker Benchmark
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Use trusted base images</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Do not use root user</span>
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Scan images for vulnerabilities</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Use minimal base images</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-400" />
                NIST Guidelines
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Image signing & verification</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Regular security updates</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Secrets management</span>
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Runtime security monitoring</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
