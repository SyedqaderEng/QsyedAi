'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Code,
  FileText,
  ExternalLink,
  GitPullRequest,
  Clock,
  User,
  Target,
  Zap,
  Lock,
  Eye,
  Copy,
  Download,
  MessageSquare,
} from 'lucide-react';

interface VulnerabilityDetail {
  id: string;
  title: string;
  cve?: string;
  cwe: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvss: number;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'false-positive';
  description: string;
  impact: string;
  exploitation: string;
  remediation: string;
  discoveredAt: string;
  lastUpdated: string;
  affectedFiles: Array<{
    path: string;
    lineNumber: number;
    snippet: string;
  }>;
  references: Array<{
    title: string;
    url: string;
  }>;
  owaspCategory?: string;
  repository: string;
  branch: string;
  assignedTo?: string;
  comments: Array<{
    id: string;
    user: string;
    text: string;
    timestamp: string;
  }>;
}

export default function VulnerabilityDetailPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Mock data - in real app, fetch based on ID from URL params
  const [vulnerability] = useState<VulnerabilityDetail>({
    id: 'VULN-2024-001',
    title: 'SQL Injection in User Authentication Module',
    cve: 'CVE-2024-1234',
    cwe: 'CWE-89',
    severity: 'critical',
    cvss: 9.8,
    category: 'SQL Injection',
    status: 'open',
    description: 'A critical SQL injection vulnerability has been identified in the user authentication module. The application does not properly sanitize user input in the login form, allowing attackers to inject arbitrary SQL commands through the username parameter.',
    impact: 'An attacker can exploit this vulnerability to bypass authentication, extract sensitive data from the database including user credentials, modify or delete database records, and potentially execute administrative operations on the database server. This could lead to complete compromise of the application and underlying data.',
    exploitation: 'The vulnerability can be exploited by injecting SQL commands in the username field. Example payload: admin\' OR \'1\'=\'1\' -- which bypasses authentication checks.',
    remediation: 'Implement parameterized queries or prepared statements for all database interactions. Use an ORM that handles SQL escaping properly. Add input validation and sanitization. Implement least privilege database access controls.',
    discoveredAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-15T14:30:00Z',
    affectedFiles: [
      {
        path: 'src/auth/login.ts',
        lineNumber: 45,
        snippet: `async function authenticateUser(username: string, password: string) {\n  const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;\n  const result = await db.query(query);\n  return result.rows[0];\n}`,
      },
      {
        path: 'src/auth/register.ts',
        lineNumber: 32,
        snippet: `async function createUser(username: string, email: string) {\n  const query = \`INSERT INTO users (username, email) VALUES ('\${username}', '\${email}')\`;\n  await db.query(query);\n}`,
      },
    ],
    references: [
      {
        title: 'OWASP SQL Injection',
        url: 'https://owasp.org/www-community/attacks/SQL_Injection',
      },
      {
        title: 'CWE-89: SQL Injection',
        url: 'https://cwe.mitre.org/data/definitions/89.html',
      },
      {
        title: 'NVD - CVE-2024-1234',
        url: 'https://nvd.nist.gov/vuln/detail/CVE-2024-1234',
      },
    ],
    owaspCategory: 'A03:2021 – Injection',
    repository: 'backend-api',
    branch: 'main',
    assignedTo: 'john.doe@company.com',
    comments: [
      {
        id: '1',
        user: 'jane.smith@company.com',
        text: 'This is critical and needs immediate attention. I\'m working on a fix using parameterized queries.',
        timestamp: '2024-01-15T11:00:00Z',
      },
      {
        id: '2',
        user: 'security-team@company.com',
        text: 'Please prioritize this for the next release. We should also audit all other database queries in the codebase.',
        timestamp: '2024-01-15T12:30:00Z',
      },
    ],
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'high':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'low':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-red-400 bg-red-500/10';
      case 'in-progress':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'resolved':
        return 'text-green-400 bg-green-500/10';
      case 'false-positive':
        return 'text-gray-400 bg-gray-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(vulnerability.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Alerts</span>
          </button>

          <div className="glass-panel p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${getSeverityColor(vulnerability.severity)}`}>
                    {vulnerability.severity.toUpperCase()}
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(vulnerability.status)}`}>
                    {vulnerability.status.replace('-', ' ').toUpperCase()}
                  </div>
                  {vulnerability.cve && (
                    <code className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium">
                      {vulnerability.cve}
                    </code>
                  )}
                  <code className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium">
                    {vulnerability.cwe}
                  </code>
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">{vulnerability.title}</h1>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyId}
                      className="flex items-center gap-2 hover:text-white transition-all"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{vulnerability.id}</span>
                    </button>
                    {copied && <span className="text-green-400 text-xs">Copied!</span>}
                  </div>
                  <span>CVSS: {vulnerability.cvss}</span>
                  <span>Category: {vulnerability.category}</span>
                  {vulnerability.owaspCategory && <span>{vulnerability.owaspCategory}</span>}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all">
                  <GitPullRequest className="w-4 h-4" />
                  <span>Generate Fix PR</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-4 gap-4">
              <div className="glass-panel p-4">
                <div className="text-gray-400 text-xs mb-1">Repository</div>
                <div className="text-white font-medium">{vulnerability.repository}</div>
              </div>
              <div className="glass-panel p-4">
                <div className="text-gray-400 text-xs mb-1">Branch</div>
                <div className="text-white font-medium">{vulnerability.branch}</div>
              </div>
              <div className="glass-panel p-4">
                <div className="text-gray-400 text-xs mb-1">Discovered</div>
                <div className="text-white font-medium">
                  {new Date(vulnerability.discoveredAt).toLocaleDateString()}
                </div>
              </div>
              <div className="glass-panel p-4">
                <div className="text-gray-400 text-xs mb-1">Assigned To</div>
                <div className="text-white font-medium">{vulnerability.assignedTo || 'Unassigned'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="col-span-2 space-y-6">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-400" />
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed">{vulnerability.description}</p>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6 border-orange-500/20"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                Impact
              </h2>
              <p className="text-gray-300 leading-relaxed">{vulnerability.impact}</p>
            </motion.div>

            {/* Exploitation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 border-red-500/20"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-red-400" />
                Exploitation
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">{vulnerability.exploitation}</p>
              <div className="glass-panel p-4 bg-black/50">
                <code className="text-red-300 text-sm">
                  admin&apos; OR &apos;1&apos;=&apos;1&apos; --
                </code>
              </div>
            </motion.div>

            {/* Remediation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel p-6 border-green-500/20"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-400" />
                Remediation
              </h2>
              <p className="text-gray-300 leading-relaxed">{vulnerability.remediation}</p>
            </motion.div>

            {/* Affected Files */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Code className="w-6 h-6 text-purple-400" />
                Affected Files ({vulnerability.affectedFiles.length})
              </h2>
              <div className="space-y-4">
                {vulnerability.affectedFiles.map((file, index) => (
                  <div key={index} className="glass-panel p-4 bg-black/30">
                    <div className="flex items-center gap-3 mb-3">
                      <code className="text-blue-400">{file.path}</code>
                      <span className="text-gray-400 text-sm">Line {file.lineNumber}</span>
                    </div>
                    <pre className="text-sm text-gray-300 overflow-x-auto p-3 bg-black/50 rounded">
                      <code>{file.snippet}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Comments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
                Comments ({vulnerability.comments.length})
              </h2>
              <div className="space-y-4">
                {vulnerability.comments.map((comment) => (
                  <div key={comment.id} className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {comment.user[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white font-medium">{comment.user}</div>
                        <div className="text-gray-400 text-xs">
                          {new Date(comment.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 ml-11">{comment.text}</p>
                  </div>
                ))}
                <div className="glass-panel p-4">
                  <textarea
                    placeholder="Add a comment..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
                    rows={3}
                  />
                  <button className="mt-3 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all">
                    Post Comment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-2 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all">
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark as Resolved</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-all">
                  <Clock className="w-4 h-4" />
                  <span>Mark In Progress</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-3 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 rounded-lg transition-all">
                  <XCircle className="w-4 h-4" />
                  <span>False Positive</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all">
                  <User className="w-4 h-4" />
                  <span>Reassign</span>
                </button>
              </div>
            </motion.div>

            {/* References */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-blue-400" />
                References
              </h3>
              <div className="space-y-3">
                {vulnerability.references.map((ref, index) => (
                  <a
                    key={index}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">{ref.title}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="text-white font-medium">Discovered</div>
                    <div className="text-gray-400 text-sm">
                      {new Date(vulnerability.discoveredAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="text-white font-medium">Last Updated</div>
                    <div className="text-gray-400 text-sm">
                      {new Date(vulnerability.lastUpdated).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
