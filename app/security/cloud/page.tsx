'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, Cloud, Server, Database, Shield, AlertTriangle,
  CheckCircle, Lock, Globe, Filter, Plus
} from 'lucide-react';

interface CloudAccount {
  id: string;
  provider: 'aws' | 'azure' | 'gcp';
  name: string;
  accountId: string;
  region: string;
  status: 'connected' | 'error' | 'syncing';
  lastSync: string;
  resources: number;
  issues: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

interface CloudFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  category: 'cspm' | 'exposed-assets' | 'misconfiguration' | 'compliance';
  provider: 'aws' | 'azure' | 'gcp';
  description: string;
  resource: string;
  resourceType: string;
  region: string;
  account: string;
  recommendation: string;
  compliance: string[];
  autoRemediationAvailable: boolean;
}

export default function CloudSecurityPage() {
  const [accounts, setAccounts] = useState<CloudAccount[]>([
    {
      id: '1',
      provider: 'aws',
      name: 'Production AWS',
      accountId: '123456789012',
      region: 'us-east-1',
      status: 'connected',
      lastSync: new Date(Date.now() - 300000).toISOString(),
      resources: 342,
      issues: { critical: 8, high: 23, medium: 45, low: 67 },
    },
    {
      id: '2',
      provider: 'azure',
      name: 'Azure Enterprise',
      accountId: 'sub-abcd-1234',
      region: 'eastus',
      status: 'connected',
      lastSync: new Date(Date.now() - 600000).toISOString(),
      resources: 156,
      issues: { critical: 3, high: 12, medium: 28, low: 34 },
    },
    {
      id: '3',
      provider: 'gcp',
      name: 'GCP Analytics',
      accountId: 'project-123456',
      region: 'us-central1',
      status: 'syncing',
      lastSync: new Date(Date.now() - 120000).toISOString(),
      resources: 89,
      issues: { critical: 1, high: 5, medium: 15, low: 22 },
    },
  ]);

  const [findings, setFindings] = useState<CloudFinding[]>([
    {
      id: '1',
      severity: 'critical',
      title: 'S3 Bucket Publicly Accessible',
      category: 'exposed-assets',
      provider: 'aws',
      description: 'S3 bucket "acme-user-data" is configured with public read access, exposing sensitive user data to the internet.',
      resource: 'arn:aws:s3:::acme-user-data',
      resourceType: 'S3 Bucket',
      region: 'us-east-1',
      account: 'Production AWS',
      recommendation: 'Remove public access permissions and implement bucket policies with least privilege. Use CloudFront with signed URLs for public content.',
      compliance: ['PCI-DSS', 'SOC2', 'HIPAA', 'GDPR'],
      autoRemediationAvailable: true,
    },
    {
      id: '2',
      severity: 'critical',
      title: 'Security Group Allows All Traffic from Internet',
      category: 'misconfiguration',
      provider: 'aws',
      description: 'Security group allows ingress from 0.0.0.0/0 on all ports, creating excessive attack surface.',
      resource: 'sg-0123456789abcdef0',
      resourceType: 'Security Group',
      region: 'us-east-1',
      account: 'Production AWS',
      recommendation: 'Restrict security group rules to specific IP ranges and only required ports. Use AWS Systems Manager for SSH access.',
      compliance: ['CIS AWS Foundations', 'SOC2'],
      autoRemediationAvailable: true,
    },
    {
      id: '3',
      severity: 'high',
      title: 'RDS Instance Not Encrypted',
      category: 'cspm',
      provider: 'aws',
      description: 'RDS database instance does not have encryption at rest enabled.',
      resource: 'arn:aws:rds:us-east-1:123456789012:db:production-db',
      resourceType: 'RDS Instance',
      region: 'us-east-1',
      account: 'Production AWS',
      recommendation: 'Enable encryption at rest for RDS instances. Note: Requires creating a new encrypted instance and migrating data.',
      compliance: ['PCI-DSS', 'HIPAA', 'GDPR'],
      autoRemediationAvailable: false,
    },
    {
      id: '4',
      severity: 'high',
      title: 'Azure Storage Account Without Network Rules',
      category: 'misconfiguration',
      provider: 'azure',
      description: 'Storage account allows access from all networks without firewall rules.',
      resource: '/subscriptions/.../storageAccounts/acmestorage',
      resourceType: 'Storage Account',
      region: 'eastus',
      account: 'Azure Enterprise',
      recommendation: 'Configure network rules to restrict access to specific virtual networks and IP addresses.',
      compliance: ['CIS Azure Foundations', 'SOC2'],
      autoRemediationAvailable: true,
    },
    {
      id: '5',
      severity: 'high',
      title: 'GCP Compute Instance with Default Service Account',
      category: 'cspm',
      provider: 'gcp',
      description: 'VM instance uses default service account with Editor role, granting excessive permissions.',
      resource: 'projects/project-123456/zones/us-central1-a/instances/api-server',
      resourceType: 'Compute Instance',
      region: 'us-central1',
      account: 'GCP Analytics',
      recommendation: 'Create custom service accounts with minimal required permissions following principle of least privilege.',
      compliance: ['CIS GCP Foundations'],
      autoRemediationAvailable: false,
    },
    {
      id: '6',
      severity: 'medium',
      title: 'CloudWatch Logs Not Encrypted',
      category: 'cspm',
      provider: 'aws',
      description: 'CloudWatch log groups are not encrypted with KMS.',
      resource: '/aws/lambda/api-handler',
      resourceType: 'CloudWatch Log Group',
      region: 'us-east-1',
      account: 'Production AWS',
      recommendation: 'Enable KMS encryption for CloudWatch log groups to protect sensitive log data.',
      compliance: ['PCI-DSS', 'HIPAA'],
      autoRemediationAvailable: true,
    },
  ]);

  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  const getProviderLogo = (provider: string) => {
    switch (provider) {
      case 'aws': return '☁️ AWS';
      case 'azure': return '🔷 Azure';
      case 'gcp': return '🌩️ GCP';
      default: return provider;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'syncing': return 'text-blue-400';
      default: return 'text-gray-400';
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

  const totalIssues = accounts.reduce((acc, acct) => ({
    critical: acc.critical + acct.issues.critical,
    high: acc.high + acct.issues.high,
    medium: acc.medium + acct.issues.medium,
    low: acc.low + acct.issues.low,
  }), { critical: 0, high: 0, medium: 0, low: 0 });

  const totalResources = accounts.reduce((acc, acct) => acc + acct.resources, 0);

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
              <Cloud className="w-10 h-10 text-neon-blue" />
              Cloud Security (CSPM)
            </motion.h1>
            <p className="text-gray-400">Cloud Security Posture Management - Multi-Cloud Monitoring</p>
          </div>

          <button
            onClick={() => setShowAddAccountModal(true)}
            className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Cloud Account
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{totalResources}</div>
            <div className="text-xs text-gray-400">Resources</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{accounts.length}</div>
            <div className="text-xs text-gray-400">Accounts</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-4 rounded-xl border border-red-500/30">
            <div className="text-2xl font-bold text-red-400 mb-1">{totalIssues.critical}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-4 rounded-xl border border-orange-500/30">
            <div className="text-2xl font-bold text-orange-400 mb-1">{totalIssues.high}</div>
            <div className="text-xs text-gray-400">High</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-4 rounded-xl border border-yellow-500/30">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{totalIssues.medium}</div>
            <div className="text-xs text-gray-400">Medium</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass p-4 rounded-xl border border-blue-500/30">
            <div className="text-2xl font-bold text-blue-400 mb-1">{totalIssues.low}</div>
            <div className="text-xs text-gray-400">Low</div>
          </motion.div>
        </div>

        {/* Cloud Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Connected Cloud Accounts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {accounts.map((account, idx) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-strong p-6 rounded-2xl hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl">{getProviderLogo(account.provider)}</div>
                  <div className={`flex items-center gap-2 text-sm ${getStatusColor(account.status)}`}>
                    {account.status === 'connected' && <CheckCircle className="w-4 h-4" />}
                    {account.status === 'syncing' && <Server className="w-4 h-4 animate-spin" />}
                    {account.status === 'error' && <AlertTriangle className="w-4 h-4" />}
                    <span className="capitalize">{account.status}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{account.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{account.accountId}</p>
                <p className="text-sm text-gray-500 mb-4">{account.region}</p>

                <div className="glass p-3 rounded-lg mb-4">
                  <div className="text-sm text-gray-400 mb-2">{account.resources} resources scanned</div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-red-400">{account.issues.critical}</div>
                      <div className="text-gray-500">Critical</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-orange-400">{account.issues.high}</div>
                      <div className="text-gray-500">High</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-yellow-400">{account.issues.medium}</div>
                      <div className="text-gray-500">Medium</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-400">{account.issues.low}</div>
                      <div className="text-gray-500">Low</div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Last sync: {new Date(account.lastSync).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Findings */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Cloud Security Findings</h2>
          <div className="space-y-4">
            {findings.map((finding, idx) => (
              <motion.div
                key={finding.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`glass-strong p-6 rounded-2xl border-2 ${getSeverityColor(finding.severity)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityColor(finding.severity)}`}>
                        {finding.severity}
                      </span>
                      <span className="glass px-3 py-1 rounded text-xs">
                        {getProviderLogo(finding.provider)}
                      </span>
                      <span className="glass px-3 py-1 rounded text-xs capitalize">
                        {finding.category}
                      </span>
                      {finding.autoRemediationAvailable && (
                        <span className="glass px-3 py-1 rounded text-xs text-neon-green">
                          Auto-remediation
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{finding.title}</h3>
                    <p className="text-gray-400 mb-4">{finding.description}</p>

                    <div className="glass p-4 rounded-lg mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Resource:</span>
                        <span className="text-gray-300 font-mono text-xs">{finding.resource}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{finding.resourceType}</span>
                        <span>•</span>
                        <span>{finding.region}</span>
                        <span>•</span>
                        <span>{finding.account}</span>
                      </div>
                    </div>

                    <div className="glass-strong p-4 rounded-lg mb-4">
                      <h4 className="text-sm font-semibold text-neon-blue mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Recommendation
                      </h4>
                      <p className="text-sm text-gray-300">{finding.recommendation}</p>
                    </div>

                    {finding.compliance.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Compliance:</span>
                        {finding.compliance.map((item, i) => (
                          <span key={i} className="glass px-2 py-1 rounded text-xs text-purple-400">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                  {finding.autoRemediationAvailable && (
                    <button className="bg-gradient-to-r from-neon-green to-neon-blue px-4 py-2 rounded-lg font-semibold hover:shadow-neon-green transition-all">
                      Auto-Remediate
                    </button>
                  )}
                  <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Mark as Fixed
                  </button>
                  <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all">
                    View in Console
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddAccountModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setShowAddAccountModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong p-8 rounded-2xl max-w-2xl w-full"
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Connect Cloud Provider
            </h2>

            <div className="space-y-4 mb-8">
              <button className="w-full glass p-6 rounded-xl hover:glass-strong transition-all flex items-center gap-4">
                <div className="text-4xl">☁️</div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-white">Amazon Web Services (AWS)</h3>
                  <p className="text-sm text-gray-400">Connect via IAM Role or Access Keys</p>
                </div>
              </button>

              <button className="w-full glass p-6 rounded-xl hover:glass-strong transition-all flex items-center gap-4">
                <div className="text-4xl">🔷</div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-white">Microsoft Azure</h3>
                  <p className="text-sm text-gray-400">Connect via Service Principal</p>
                </div>
              </button>

              <button className="w-full glass p-6 rounded-xl hover:glass-strong transition-all flex items-center gap-4">
                <div className="text-4xl">🌩️</div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-white">Google Cloud Platform (GCP)</h3>
                  <p className="text-sm text-gray-400">Connect via Service Account</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowAddAccountModal(false)}
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
