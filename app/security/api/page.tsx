'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Code,
  Lock,
  Globe,
  Search,
  PlayCircle,
  PauseCircle,
  Settings,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

interface APIEndpoint {
  id: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  service: string;
  authenticated: boolean;
  lastScanned: string;
  status: 'scanning' | 'completed' | 'failed' | 'pending';
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  responseTime: number;
  statusCode: number;
}

interface DASTFinding {
  id: string;
  endpoint: string;
  method: string;
  vulnerability: string;
  owaspCategory: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  impact: string;
  proof: string;
  remediation: string;
  cwe: string;
  discoveredAt: string;
  status: 'open' | 'in-progress' | 'resolved' | 'false-positive';
}

export default function APISecurityPage() {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'findings' | 'config'>('endpoints');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [scanning, setScanning] = useState(false);

  const [endpoints] = useState<APIEndpoint[]>([
    {
      id: '1',
      url: '/api/v1/users',
      method: 'GET',
      service: 'User Service',
      authenticated: true,
      lastScanned: '2 minutes ago',
      status: 'completed',
      findings: { critical: 0, high: 1, medium: 2, low: 3 },
      responseTime: 145,
      statusCode: 200,
    },
    {
      id: '2',
      url: '/api/v1/auth/login',
      method: 'POST',
      service: 'Auth Service',
      authenticated: false,
      lastScanned: '5 minutes ago',
      status: 'completed',
      findings: { critical: 2, high: 3, medium: 1, low: 0 },
      responseTime: 230,
      statusCode: 200,
    },
    {
      id: '3',
      url: '/api/v1/payments',
      method: 'POST',
      service: 'Payment Service',
      authenticated: true,
      lastScanned: '10 minutes ago',
      status: 'completed',
      findings: { critical: 1, high: 2, medium: 4, low: 5 },
      responseTime: 890,
      statusCode: 200,
    },
    {
      id: '4',
      url: '/api/v1/admin/users',
      method: 'DELETE',
      service: 'Admin Service',
      authenticated: true,
      lastScanned: '15 minutes ago',
      status: 'completed',
      findings: { critical: 3, high: 1, medium: 0, low: 1 },
      responseTime: 340,
      statusCode: 200,
    },
    {
      id: '5',
      url: '/api/v1/data/export',
      method: 'GET',
      service: 'Export Service',
      authenticated: true,
      lastScanned: 'Never',
      status: 'pending',
      findings: { critical: 0, high: 0, medium: 0, low: 0 },
      responseTime: 0,
      statusCode: 0,
    },
  ]);

  const [findings] = useState<DASTFinding[]>([
    {
      id: '1',
      endpoint: '/api/v1/auth/login',
      method: 'POST',
      vulnerability: 'Broken Authentication',
      owaspCategory: 'API2:2023 Broken Authentication',
      severity: 'critical',
      description: 'No rate limiting on authentication endpoint allows brute force attacks',
      impact: 'Attackers can perform unlimited login attempts to guess credentials',
      proof: 'Successfully sent 10,000 requests in 60 seconds without being blocked',
      remediation: 'Implement rate limiting (max 5 failed attempts per 15 minutes) and account lockout mechanism',
      cwe: 'CWE-307',
      discoveredAt: '2024-01-15T10:30:00Z',
      status: 'open',
    },
    {
      id: '2',
      endpoint: '/api/v1/auth/login',
      method: 'POST',
      vulnerability: 'Weak Password Policy',
      owaspCategory: 'API2:2023 Broken Authentication',
      severity: 'critical',
      description: 'Password requirements do not enforce sufficient complexity',
      impact: 'Users can set weak passwords that are easily guessable',
      proof: 'Successfully registered with password "123456"',
      remediation: 'Enforce minimum 12 characters, uppercase, lowercase, numbers, and special characters',
      cwe: 'CWE-521',
      discoveredAt: '2024-01-15T10:35:00Z',
      status: 'open',
    },
    {
      id: '3',
      endpoint: '/api/v1/users',
      method: 'GET',
      vulnerability: 'Broken Object Level Authorization (BOLA)',
      owaspCategory: 'API1:2023 Broken Object Level Authorization',
      severity: 'high',
      description: 'User can access other users\' data by manipulating user ID parameter',
      impact: 'Unauthorized access to sensitive user information (PII, email, phone)',
      proof: 'GET /api/v1/users/123 returns data for different user when authenticated as user 456',
      remediation: 'Implement proper authorization checks to verify user owns the requested resource',
      cwe: 'CWE-639',
      discoveredAt: '2024-01-15T11:00:00Z',
      status: 'in-progress',
    },
    {
      id: '4',
      endpoint: '/api/v1/admin/users',
      method: 'DELETE',
      vulnerability: 'Broken Function Level Authorization',
      owaspCategory: 'API5:2023 Broken Function Level Authorization',
      severity: 'critical',
      description: 'Regular users can access admin endpoints by directly calling the URL',
      impact: 'Privilege escalation allowing regular users to perform admin actions',
      proof: 'DELETE /api/v1/admin/users/789 executed successfully with regular user token',
      remediation: 'Implement role-based access control (RBAC) middleware for all admin routes',
      cwe: 'CWE-285',
      discoveredAt: '2024-01-15T11:15:00Z',
      status: 'open',
    },
    {
      id: '5',
      endpoint: '/api/v1/payments',
      method: 'POST',
      vulnerability: 'Mass Assignment',
      owaspCategory: 'API6:2023 Unrestricted Access to Sensitive Business Flows',
      severity: 'critical',
      description: 'API accepts arbitrary fields allowing price manipulation',
      impact: 'Attackers can modify payment amount, discount, or other sensitive fields',
      proof: 'POST with {"amount": 0.01, "isAdmin": true} successfully processed',
      remediation: 'Use explicit allow-lists for accepted parameters, reject unexpected fields',
      cwe: 'CWE-915',
      discoveredAt: '2024-01-15T11:30:00Z',
      status: 'open',
    },
    {
      id: '6',
      endpoint: '/api/v1/users',
      method: 'GET',
      vulnerability: 'Excessive Data Exposure',
      owaspCategory: 'API3:2023 Excessive Data Exposure',
      severity: 'high',
      description: 'API response includes sensitive fields like password hash and SSN',
      impact: 'Leakage of sensitive user data that should not be exposed to clients',
      proof: 'Response contains: {"passwordHash": "...", "ssn": "123-45-6789"}',
      remediation: 'Implement response filtering to only return necessary fields',
      cwe: 'CWE-200',
      discoveredAt: '2024-01-15T12:00:00Z',
      status: 'open',
    },
    {
      id: '7',
      endpoint: '/api/v1/auth/login',
      method: 'POST',
      vulnerability: 'Verbose Error Messages',
      owaspCategory: 'API8:2023 Security Misconfiguration',
      severity: 'medium',
      description: 'Error messages reveal whether username exists in the database',
      impact: 'Username enumeration allows attackers to identify valid accounts',
      proof: 'Different errors: "Invalid password" vs "User not found"',
      remediation: 'Return generic error message: "Invalid credentials" for all auth failures',
      cwe: 'CWE-209',
      discoveredAt: '2024-01-15T12:15:00Z',
      status: 'open',
    },
    {
      id: '8',
      endpoint: '/api/v1/payments',
      method: 'POST',
      vulnerability: 'Lack of Resources & Rate Limiting',
      owaspCategory: 'API4:2023 Unrestricted Resource Consumption',
      severity: 'high',
      description: 'No limits on payment creation allows resource exhaustion attacks',
      impact: 'Attackers can create thousands of payment records causing DoS',
      proof: 'Successfully created 50,000 payment records in 5 minutes',
      remediation: 'Implement rate limiting: max 10 payment requests per minute per user',
      cwe: 'CWE-770',
      discoveredAt: '2024-01-15T12:30:00Z',
      status: 'open',
    },
  ]);

  const handleStartScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
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

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'text-green-400 bg-green-500/10';
      case 'POST':
        return 'text-blue-400 bg-blue-500/10';
      case 'PUT':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'DELETE':
        return 'text-red-400 bg-red-500/10';
      case 'PATCH':
        return 'text-purple-400 bg-purple-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const filteredFindings = selectedSeverity === 'all'
    ? findings
    : findings.filter(f => f.severity === selectedSeverity);

  const totalFindings = endpoints.reduce(
    (acc, ep) => ({
      critical: acc.critical + ep.findings.critical,
      high: acc.high + ep.findings.high,
      medium: acc.medium + ep.findings.medium,
      low: acc.low + ep.findings.low,
    }),
    { critical: 0, high: 0, medium: 0, low: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">API Security (DAST)</h1>
                <p className="text-gray-400 mt-1">
                  Dynamic Application Security Testing for REST APIs
                </p>
              </div>
            </div>
            <button
              onClick={handleStartScan}
              disabled={scanning}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scanning ? (
                <>
                  <PauseCircle className="w-5 h-5" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5" />
                  <span>Start Full Scan</span>
                </>
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mt-6">
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Activity className="w-4 h-4" />
                <span>Total Endpoints</span>
              </div>
              <div className="text-2xl font-bold text-white">{endpoints.length}</div>
            </div>
            <div className="glass-panel p-4 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Critical</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{totalFindings.critical}</div>
            </div>
            <div className="glass-panel p-4 border-orange-500/20">
              <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>High</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">{totalFindings.high}</div>
            </div>
            <div className="glass-panel p-4 border-yellow-500/20">
              <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Medium</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{totalFindings.medium}</div>
            </div>
            <div className="glass-panel p-4 border-blue-500/20">
              <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Low</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{totalFindings.low}</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10">
          {(['endpoints', 'findings', 'config'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Endpoints Tab */}
        {activeTab === 'endpoints' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {endpoints.map((endpoint) => (
              <motion.div
                key={endpoint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 hover:border-purple-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-white font-mono text-sm">{endpoint.url}</code>
                      {endpoint.authenticated && (
                        <div className="flex items-center gap-1 text-green-400 text-xs">
                          <Lock className="w-3 h-3" />
                          <span>Auth Required</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span>{endpoint.service}</span>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Last scan: {endpoint.lastScanned}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>{endpoint.responseTime}ms</span>
                      </div>
                      <span className="text-green-400">Status: {endpoint.statusCode}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {endpoint.findings.critical > 0 && (
                      <span className="px-3 py-1 rounded-lg text-xs font-medium text-red-400 bg-red-500/10">
                        {endpoint.findings.critical} Critical
                      </span>
                    )}
                    {endpoint.findings.high > 0 && (
                      <span className="px-3 py-1 rounded-lg text-xs font-medium text-orange-400 bg-orange-500/10">
                        {endpoint.findings.high} High
                      </span>
                    )}
                    {endpoint.findings.medium > 0 && (
                      <span className="px-3 py-1 rounded-lg text-xs font-medium text-yellow-400 bg-yellow-500/10">
                        {endpoint.findings.medium} Medium
                      </span>
                    )}
                    {endpoint.findings.low > 0 && (
                      <span className="px-3 py-1 rounded-lg text-xs font-medium text-blue-400 bg-blue-500/10">
                        {endpoint.findings.low} Low
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Findings Tab */}
        {activeTab === 'findings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Filters */}
            <div className="flex gap-3">
              {['all', 'critical', 'high', 'medium', 'low'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedSeverity === sev
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {sev.charAt(0).toUpperCase() + sev.slice(1)}
                </button>
              ))}
            </div>

            {/* Findings List */}
            {filteredFindings.map((finding) => (
              <motion.div
                key={finding.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`px-3 py-1 rounded-lg text-xs font-medium border ${getSeverityColor(finding.severity)}`}>
                      {finding.severity.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">{finding.vulnerability}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <span className={`px-2 py-1 rounded ${getMethodColor(finding.method)}`}>
                          {finding.method}
                        </span>
                        <code className="text-purple-400">{finding.endpoint}</code>
                        <span className="text-yellow-400">{finding.owaspCategory}</span>
                        <span className="text-blue-400">{finding.cwe}</span>
                      </div>
                      <p className="text-gray-300 mb-4">{finding.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass-panel p-4">
                          <div className="text-orange-400 font-medium mb-2">Impact</div>
                          <p className="text-gray-300 text-sm">{finding.impact}</p>
                        </div>
                        <div className="glass-panel p-4">
                          <div className="text-green-400 font-medium mb-2">Remediation</div>
                          <p className="text-gray-300 text-sm">{finding.remediation}</p>
                        </div>
                      </div>

                      <div className="glass-panel p-4 mt-4 bg-black/30">
                        <div className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Proof of Concept
                        </div>
                        <code className="text-gray-300 text-sm font-mono">{finding.proof}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Config Tab */}
        {activeTab === 'config' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">DAST Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="text-gray-300 font-medium mb-2 block">Base URL</label>
                <input
                  type="text"
                  placeholder="https://api.example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-300 font-medium mb-2 block">Authentication Token</label>
                <input
                  type="password"
                  placeholder="Bearer token or API key"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-300 font-medium mb-2 block">Scan Depth</label>
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none">
                  <option>Light (Fast, fewer tests)</option>
                  <option>Medium (Balanced)</option>
                  <option>Deep (Thorough, slower)</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="owasp" className="w-4 h-4" defaultChecked />
                <label htmlFor="owasp" className="text-gray-300">Test for OWASP API Top 10</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="auth" className="w-4 h-4" defaultChecked />
                <label htmlFor="auth" className="text-gray-300">Test Authentication & Authorization</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="injection" className="w-4 h-4" defaultChecked />
                <label htmlFor="injection" className="text-gray-300">Test for Injection Attacks</label>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                Save Configuration
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
