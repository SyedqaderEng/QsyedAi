'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Lock,
  Unlock,
  Shield,
  Key,
  Database,
  Code,
  GitBranch,
  Cloud,
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userId: string;
  action: string;
  category: 'authentication' | 'authorization' | 'data' | 'configuration' | 'security' | 'integration';
  resource: string;
  result: 'success' | 'failure' | 'denied';
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
  location?: string;
}

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedResult, setSelectedResult] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d' | 'custom'>('24h');

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15T14:35:22Z',
      user: 'john.doe@company.com',
      userId: 'user_123',
      action: 'User login',
      category: 'authentication',
      resource: 'authentication_service',
      result: 'success',
      severity: 'low',
      ipAddress: '203.0.113.45',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      details: { mfaUsed: true, method: 'password_mfa' },
      location: 'San Francisco, CA, US',
    },
    {
      id: '2',
      timestamp: '2024-01-15T14:30:15Z',
      user: 'jane.smith@company.com',
      userId: 'user_456',
      action: 'Modified firewall rule',
      category: 'security',
      resource: 'firewall_rule_prod_22',
      result: 'success',
      severity: 'high',
      ipAddress: '198.51.100.89',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/537.36',
      details: {
        oldValue: { port: 22, action: 'ALLOW', source: '0.0.0.0/0' },
        newValue: { port: 22, action: 'DENY', source: '0.0.0.0/0' }
      },
      location: 'New York, NY, US',
    },
    {
      id: '3',
      timestamp: '2024-01-15T14:25:08Z',
      user: 'bob.wilson@company.com',
      userId: 'user_789',
      action: 'Accessed sensitive data',
      category: 'data',
      resource: 'customer_database',
      result: 'success',
      severity: 'medium',
      ipAddress: '192.0.2.123',
      userAgent: 'curl/7.88.1',
      details: { table: 'users', operation: 'SELECT', recordCount: 1500 },
      location: 'Austin, TX, US',
    },
    {
      id: '4',
      timestamp: '2024-01-15T14:20:42Z',
      user: 'charlie.brown@company.com',
      userId: 'user_321',
      action: 'Attempted to delete user',
      category: 'authorization',
      resource: 'user_management',
      result: 'denied',
      severity: 'critical',
      ipAddress: '198.51.100.200',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) Firefox/121.0',
      details: { targetUser: 'alice.johnson@company.com', reason: 'insufficient_permissions' },
      location: 'Seattle, WA, US',
    },
    {
      id: '5',
      timestamp: '2024-01-15T14:15:30Z',
      user: 'system',
      userId: 'system',
      action: 'Automated security scan completed',
      category: 'security',
      resource: 'sast_scanner',
      result: 'success',
      severity: 'low',
      ipAddress: '10.0.1.50',
      userAgent: 'SyedAI-Scanner/1.0',
      details: { repository: 'frontend-app', findings: 48, duration: 900 },
    },
    {
      id: '6',
      timestamp: '2024-01-15T14:10:18Z',
      user: 'alice.johnson@company.com',
      userId: 'user_654',
      action: 'Updated organization settings',
      category: 'configuration',
      resource: 'org_settings',
      result: 'success',
      severity: 'medium',
      ipAddress: '203.0.113.67',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
      details: {
        changes: ['scan_frequency', 'notification_email'],
        oldValues: { scan_frequency: 'daily', notification_email: 'old@company.com' },
        newValues: { scan_frequency: 'hourly', notification_email: 'security@company.com' }
      },
      location: 'Los Angeles, CA, US',
    },
    {
      id: '7',
      timestamp: '2024-01-15T14:05:55Z',
      user: 'unknown',
      userId: 'unknown',
      action: 'Failed login attempt',
      category: 'authentication',
      resource: 'authentication_service',
      result: 'failure',
      severity: 'high',
      ipAddress: '185.220.100.240',
      userAgent: 'python-requests/2.31.0',
      details: { attempts: 15, username: 'admin', reason: 'invalid_credentials' },
      location: 'Unknown (Tor Exit Node)',
    },
    {
      id: '8',
      timestamp: '2024-01-15T14:00:32Z',
      user: 'devops@company.com',
      userId: 'user_999',
      action: 'Connected new integration',
      category: 'integration',
      resource: 'integrations',
      result: 'success',
      severity: 'medium',
      ipAddress: '203.0.113.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/120.0.0.0',
      details: { integration: 'GitHub', repository: 'company/frontend-app', permissions: ['read', 'write'] },
      location: 'Chicago, IL, US',
    },
    {
      id: '9',
      timestamp: '2024-01-15T13:55:10Z',
      user: 'jane.smith@company.com',
      userId: 'user_456',
      action: 'Exported compliance report',
      category: 'data',
      resource: 'compliance_reports',
      result: 'success',
      severity: 'medium',
      ipAddress: '198.51.100.89',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/537.36',
      details: { reportType: 'SOC2', format: 'PDF', period: '2024-Q1' },
      location: 'New York, NY, US',
    },
    {
      id: '10',
      timestamp: '2024-01-15T13:50:45Z',
      user: 'bob.wilson@company.com',
      userId: 'user_789',
      action: 'Created auto-fix pull request',
      category: 'security',
      resource: 'autofix_engine',
      result: 'success',
      severity: 'low',
      ipAddress: '192.0.2.123',
      userAgent: 'SyedAI-API/1.0',
      details: {
        vulnerability: 'CVE-2024-1234',
        repository: 'backend-api',
        branch: 'fix/cve-2024-1234',
        prNumber: 1337
      },
      location: 'Austin, TX, US',
    },
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication':
        return <Key className="w-5 h-5" />;
      case 'authorization':
        return <Shield className="w-5 h-5" />;
      case 'data':
        return <Database className="w-5 h-5" />;
      case 'configuration':
        return <Settings className="w-5 h-5" />;
      case 'security':
        return <Lock className="w-5 h-5" />;
      case 'integration':
        return <GitBranch className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'authentication':
        return 'text-blue-400 bg-blue-500/10';
      case 'authorization':
        return 'text-purple-400 bg-purple-500/10';
      case 'data':
        return 'text-cyan-400 bg-cyan-500/10';
      case 'configuration':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'security':
        return 'text-red-400 bg-red-500/10';
      case 'integration':
        return 'text-green-400 bg-green-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
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

  const filteredLogs = auditLogs.filter((log) => {
    if (selectedCategory !== 'all' && log.category !== selectedCategory) return false;
    if (selectedResult !== 'all' && log.result !== selectedResult) return false;
    if (searchTerm && !log.action.toLowerCase().includes(searchTerm.toLowerCase()) && !log.user.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalLogs = auditLogs.length;
  const successCount = auditLogs.filter(l => l.result === 'success').length;
  const failureCount = auditLogs.filter(l => l.result === 'failure').length;
  const deniedCount = auditLogs.filter(l => l.result === 'denied').length;
  const criticalEvents = auditLogs.filter(l => l.severity === 'critical').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Audit Logs</h1>
                <p className="text-gray-400 mt-1">
                  Complete audit trail of all system activities
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all">
              <Download className="w-5 h-5" />
              <span>Export Logs</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4">
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Activity className="w-4 h-4" />
                <span>Total Events</span>
              </div>
              <div className="text-2xl font-bold text-white">{totalLogs}</div>
            </div>
            <div className="glass-panel p-4 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Success</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{successCount}</div>
            </div>
            <div className="glass-panel p-4 border-orange-500/20">
              <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
                <XCircle className="w-4 h-4" />
                <span>Failures</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">{failureCount}</div>
            </div>
            <div className="glass-panel p-4 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Denied</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{deniedCount}</div>
            </div>
            <div className="glass-panel p-4 border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                <Shield className="w-4 h-4" />
                <span>Critical Events</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{criticalEvents}</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-6"
        >
          <div className="grid grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="authentication">Authentication</option>
              <option value="authorization">Authorization</option>
              <option value="data">Data Access</option>
              <option value="configuration">Configuration</option>
              <option value="security">Security</option>
              <option value="integration">Integration</option>
            </select>
            <select
              value={selectedResult}
              onChange={(e) => setSelectedResult(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Results</option>
              <option value="success">Success</option>
              <option value="failure">Failure</option>
              <option value="denied">Denied</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </motion.div>

        {/* Audit Logs */}
        <div className="space-y-4">
          {filteredLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`glass-panel p-6 ${
                log.result === 'denied' ? 'border-red-500/30' :
                log.result === 'failure' ? 'border-orange-500/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Time */}
                <div className="text-gray-400 text-sm w-24">
                  <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                  <div className="text-xs">{new Date(log.timestamp).toLocaleTimeString()}</div>
                </div>

                {/* Category Icon */}
                <div className={`p-2 rounded-lg ${getCategoryColor(log.category)}`}>
                  {getCategoryIcon(log.category)}
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">{log.action}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className="text-purple-400">{log.user}</span>
                        </div>
                        <span>Resource: <code className="text-blue-400">{log.resource}</code></span>
                        <span>IP: <code className="text-cyan-400">{log.ipAddress}</code></span>
                        {log.location && <span>{log.location}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                        {log.severity.toUpperCase()}
                      </span>
                      {log.result === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : log.result === 'denied' ? (
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          <span>DENIED</span>
                        </div>
                      ) : (
                        <XCircle className="w-5 h-5 text-orange-400" />
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  {Object.keys(log.details).length > 0 && (
                    <div className="glass-panel p-4 bg-black/30">
                      <div className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                        <Eye className="w-3 h-3" />
                        Event Details
                      </div>
                      <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </div>
                  )}

                  {/* User Agent */}
                  <div className="mt-3 text-xs text-gray-500">
                    User Agent: {log.userAgent}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
