'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Lock, Key, AlertTriangle, Eye, EyeOff, Trash2, CheckCircle } from 'lucide-react';

interface SecretFinding {
  id: string;
  severity: 'critical' | 'high';
  type: 'api-key' | 'aws-key' | 'private-key' | 'password' | 'token' | 'certificate' | 'database-url';
  title: string;
  description: string;
  repository: string;
  file: string;
  line: number;
  secret: string;
  maskedSecret: string;
  entropy: number;
  validatedActive: boolean;
  lastCommit: string;
  author: string;
}

export default function SecretsPage() {
  const [findings, setFindings] = useState<SecretFinding[]>([
    {
      id: '1',
      severity: 'critical',
      type: 'aws-key',
      title: 'AWS Secret Access Key Exposed',
      description: 'AWS_SECRET_ACCESS_KEY found in plaintext configuration file. This key provides full access to AWS resources.',
      repository: 'infrastructure/terraform',
      file: '.env.production',
      line: 12,
      secret: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
      maskedSecret: 'wJalr***************AMPLEKEY',
      entropy: 4.5,
      validatedActive: true,
      lastCommit: '2024-11-15',
      author: 'john.doe@acme.com',
    },
    {
      id: '2',
      severity: 'critical',
      type: 'private-key',
      title: 'RSA Private Key in Repository',
      description: 'RSA private key found in version control. Anyone with repository access can decrypt encrypted data.',
      repository: 'backend/auth-service',
      file: 'config/jwt-private.key',
      line: 1,
      secret: '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA...',
      maskedSecret: '-----BEGIN RSA PRIVATE KEY-----\nMIIE***...',
      entropy: 5.2,
      validatedActive: true,
      lastCommit: '2024-10-28',
      author: 'jane.smith@acme.com',
    },
    {
      id: '3',
      severity: 'critical',
      type: 'token',
      title: 'GitHub Personal Access Token',
      description: 'GitHub token with repo and workflow permissions exposed in CI/CD configuration.',
      repository: 'devops/github-actions',
      file: '.github/workflows/deploy.yml',
      line: 23,
      secret: 'ghp_abcdef1234567890abcdef1234567890abcd',
      maskedSecret: 'ghp_***********************************',
      entropy: 4.8,
      validatedActive: true,
      lastCommit: '2024-11-01',
      author: 'mike.johnson@acme.com',
    },
    {
      id: '4',
      severity: 'critical',
      type: 'database-url',
      title: 'Database Connection String with Credentials',
      description: 'PostgreSQL connection string containing username and password in source code.',
      repository: 'backend/user-service',
      file: 'src/config/database.ts',
      line: 8,
      secret: 'postgresql://admin:SuperSecret123@db.acme.com:5432/production',
      maskedSecret: 'postgresql://admin:***********@db.acme.com:5432/production',
      entropy: 3.9,
      validatedActive: true,
      lastCommit: '2024-09-15',
      author: 'sarah.williams@acme.com',
    },
    {
      id: '5',
      severity: 'high',
      type: 'api-key',
      title: 'Stripe API Secret Key',
      description: 'Stripe secret key found in frontend code, allowing unauthorized payment operations.',
      repository: 'frontend/checkout',
      file: 'src/utils/payment.ts',
      line: 15,
      secret: 'sk_test_EXAMPLE_KEY_DO_NOT_USE_1234567890',
      maskedSecret: 'sk_test_**************************',
      entropy: 4.2,
      validatedActive: false,
      lastCommit: '2024-08-20',
      author: 'john.doe@acme.com',
    },
    {
      id: '6',
      severity: 'high',
      type: 'password',
      title: 'Hardcoded Admin Password',
      description: 'Admin password hardcoded in authentication logic.',
      repository: 'backend/admin-panel',
      file: 'src/middleware/auth.ts',
      line: 45,
      secret: 'AdminP@ssw0rd2024!',
      maskedSecret: 'Admin*************',
      entropy: 3.7,
      validatedActive: true,
      lastCommit: '2024-11-10',
      author: 'admin@acme.com',
    },
  ]);

  const [revealedSecrets, setRevealedSecrets] = useState<Set<string>>(new Set());

  const getSeverityColor = (severity: string) => {
    return severity === 'critical'
      ? 'bg-red-500/20 border-red-500/50 text-red-400'
      : 'bg-orange-500/20 border-orange-500/50 text-orange-400';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'aws-key': return '☁️';
      case 'private-key': return '🔐';
      case 'token': return '🎫';
      case 'database-url': return '🗄️';
      case 'api-key': return '🔑';
      case 'password': return '🔒';
      default: return '🔑';
    }
  };

  const toggleSecretVisibility = (id: string) => {
    setRevealedSecrets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const stats = {
    total: findings.length,
    critical: findings.filter(f => f.severity === 'critical').length,
    high: findings.filter(f => f.severity === 'high').length,
    active: findings.filter(f => f.validatedActive).length,
    aws: findings.filter(f => f.type === 'aws-key').length,
    apiKeys: findings.filter(f => f.type === 'api-key' || f.type === 'token').length,
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
            <Lock className="w-10 h-10 text-neon-green" />
            Secrets Detection
          </motion.h1>
          <p className="text-gray-400">Exposed Credentials & API Keys in Version Control</p>
        </div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border-2 border-red-500 p-6 rounded-xl mb-8"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-2">⚠️ URGENT: Active Secrets Detected</h3>
              <p className="text-gray-300 mb-3">
                {stats.active} validated active secrets were found in your repositories. These credentials are currently functional and pose an immediate security risk.
              </p>
              <p className="text-sm text-gray-400">
                <strong>Immediate Actions Required:</strong>
              </p>
              <ul className="text-sm text-gray-400 list-disc list-inside mt-2 space-y-1">
                <li>Rotate all exposed credentials immediately</li>
                <li>Remove secrets from git history using tools like git-filter-repo</li>
                <li>Implement secret scanning in CI/CD pipeline</li>
                <li>Use environment variables or secret management services</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-xs text-gray-400">Total Secrets</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-4 rounded-xl border border-red-500/30">
            <div className="text-2xl font-bold text-red-400 mb-1">{stats.critical}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-4 rounded-xl border border-orange-500/30">
            <div className="text-2xl font-bold text-orange-400 mb-1">{stats.high}</div>
            <div className="text-xs text-gray-400">High</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-4 rounded-xl border border-neon-pink/30">
            <div className="text-2xl font-bold text-neon-pink mb-1">{stats.active}</div>
            <div className="text-xs text-gray-400">Active</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-blue-400 mb-1">{stats.aws}</div>
            <div className="text-xs text-gray-400">AWS Keys</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-purple-400 mb-1">{stats.apiKeys}</div>
            <div className="text-xs text-gray-400">API Keys</div>
          </motion.div>
        </div>

        {/* Findings List */}
        <div className="space-y-6">
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
                      {getTypeIcon(finding.type)} {finding.type.replace('-', ' ').toUpperCase()}
                    </span>
                    {finding.validatedActive && (
                      <span className="glass px-3 py-1 rounded text-xs text-red-400 font-bold flex items-center gap-1">
                        <Key className="w-3 h-3" />
                        ACTIVE
                      </span>
                    )}
                    <span className="glass px-3 py-1 rounded text-xs text-gray-400">
                      Entropy: {finding.entropy.toFixed(1)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{finding.title}</h3>
                  <p className="text-gray-400 mb-4">{finding.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span>{finding.repository}</span>
                    <span>→</span>
                    <span>{finding.file}:{finding.line}</span>
                  </div>

                  {/* Secret Display */}
                  <div className="glass p-4 rounded-lg mb-4 bg-gray-900/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Exposed Secret</span>
                      <button
                        onClick={() => toggleSecretVisibility(finding.id)}
                        className="glass px-3 py-1 rounded text-xs hover:glass-strong transition-all flex items-center gap-1"
                      >
                        {revealedSecrets.has(finding.id) ? (
                          <>
                            <EyeOff className="w-3 h-3" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            Reveal
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-sm text-white font-mono overflow-x-auto">
                      <code>{revealedSecrets.has(finding.id) ? finding.secret : finding.maskedSecret}</code>
                    </pre>
                  </div>

                  {/* Git Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Last commit: {finding.lastCommit}</span>
                    <span>•</span>
                    <span>Author: {finding.author}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                <button className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Rotate Credential
                </button>
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Remove from Git History
                </button>
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Mark as Resolved
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
