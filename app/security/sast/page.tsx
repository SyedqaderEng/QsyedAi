'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileCode, AlertTriangle, Code, GitPullRequest, Brain, Filter, CheckCircle } from 'lucide-react';

interface SASTFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  category: 'sql-injection' | 'xss' | 'command-injection' | 'path-traversal' | 'insecure-crypto' | 'hardcoded-secrets';
  cwe: string;
  description: string;
  repository: string;
  file: string;
  line: number;
  endLine: number;
  codeSnippet: string;
  recommendation: string;
  autofixAvailable: boolean;
  references: string[];
}

export default function SASTPage() {
  const [findings, setFindings] = useState<SASTFinding[]>([
    {
      id: '1',
      severity: 'critical',
      title: 'SQL Injection in user authentication query',
      category: 'sql-injection',
      cwe: 'CWE-89',
      description: 'User input is directly concatenated into SQL query without proper sanitization, allowing attackers to execute arbitrary SQL commands.',
      repository: 'backend/user-service',
      file: 'src/controllers/auth.ts',
      line: 45,
      endLine: 48,
      codeSnippet: `const query = \`SELECT * FROM users WHERE email = '\${email}' AND password = '\${password}'\`;
const result = await db.query(query);`,
      recommendation: 'Use parameterized queries or an ORM to prevent SQL injection. Replace string concatenation with prepared statements.',
      autofixAvailable: true,
      references: ['https://owasp.org/www-community/attacks/SQL_Injection'],
    },
    {
      id: '2',
      severity: 'critical',
      title: 'Cross-Site Scripting (XSS) vulnerability in template',
      category: 'xss',
      cwe: 'CWE-79',
      description: 'User-controlled data is rendered in HTML without proper encoding, allowing attackers to inject malicious scripts.',
      repository: 'frontend/dashboard',
      file: 'src/components/UserProfile.tsx',
      line: 23,
      endLine: 23,
      codeSnippet: `<div dangerouslySetInnerHTML={{ __html: userBio }} />`,
      recommendation: 'Use React\'s default JSX rendering which auto-escapes content, or use a sanitization library like DOMPurify.',
      autofixAvailable: true,
      references: ['https://owasp.org/www-community/attacks/xss/'],
    },
    {
      id: '3',
      severity: 'high',
      title: 'Command Injection in file processing',
      category: 'command-injection',
      cwe: 'CWE-78',
      description: 'User input is passed directly to shell command execution without validation.',
      repository: 'backend/file-processor',
      file: 'src/utils/imageProcessor.ts',
      line: 67,
      endLine: 69,
      codeSnippet: `const command = \`convert \${filename} -resize 800x600 output.jpg\`;
exec(command);`,
      recommendation: 'Validate and sanitize filename input. Use array-based command execution instead of shell strings.',
      autofixAvailable: false,
      references: ['https://owasp.org/www-community/attacks/Command_Injection'],
    },
    {
      id: '4',
      severity: 'high',
      title: 'Insecure cryptographic algorithm (MD5)',
      category: 'insecure-crypto',
      cwe: 'CWE-327',
      description: 'MD5 is used for password hashing, which is cryptographically broken and unsuitable for security purposes.',
      repository: 'backend/user-service',
      file: 'src/utils/hash.ts',
      line: 12,
      endLine: 12,
      codeSnippet: `const hash = crypto.createHash('md5').update(password).digest('hex');`,
      recommendation: 'Use bcrypt, scrypt, or Argon2 for password hashing. These are designed specifically for password storage.',
      autofixAvailable: true,
      references: ['https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html'],
    },
    {
      id: '5',
      severity: 'medium',
      title: 'Path Traversal vulnerability in file access',
      category: 'path-traversal',
      cwe: 'CWE-22',
      description: 'User-supplied path is used without validation, allowing access to files outside intended directory.',
      repository: 'backend/file-service',
      file: 'src/controllers/download.ts',
      line: 34,
      endLine: 35,
      codeSnippet: `const filepath = path.join('/uploads', req.query.file);
res.sendFile(filepath);`,
      recommendation: 'Validate file path against a whitelist and use path.normalize() to prevent directory traversal.',
      autofixAvailable: false,
      references: ['https://owasp.org/www-community/attacks/Path_Traversal'],
    },
  ]);

  const [filter, setFilter] = useState({
    severity: 'all',
    category: 'all',
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

  const filteredFindings = findings.filter(f => {
    if (filter.severity !== 'all' && f.severity !== filter.severity) return false;
    if (filter.category !== 'all' && f.category !== filter.category) return false;
    if (filter.repository !== 'all' && f.repository !== filter.repository) return false;
    return true;
  });

  const stats = {
    total: findings.length,
    critical: findings.filter(f => f.severity === 'critical').length,
    high: findings.filter(f => f.severity === 'high').length,
    medium: findings.filter(f => f.severity === 'medium').length,
    low: findings.filter(f => f.severity === 'low').length,
    autofix: findings.filter(f => f.autofixAvailable).length,
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
            <FileCode className="w-10 h-10 text-neon-blue" />
            SAST Findings
          </motion.h1>
          <p className="text-gray-400">Static Application Security Testing - Code Vulnerabilities</p>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-4 rounded-xl border border-blue-500/30">
            <div className="text-2xl font-bold text-blue-400 mb-1">{stats.low}</div>
            <div className="text-xs text-gray-400">Low</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass p-4 rounded-xl border border-neon-purple/30">
            <div className="text-2xl font-bold text-neon-purple mb-1">{stats.autofix}</div>
            <div className="text-xs text-gray-400">Autofix</div>
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
          <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })} className="glass px-4 py-2 rounded-lg text-white outline-none">
            <option value="all">All Categories</option>
            <option value="sql-injection">SQL Injection</option>
            <option value="xss">XSS</option>
            <option value="command-injection">Command Injection</option>
            <option value="path-traversal">Path Traversal</option>
            <option value="insecure-crypto">Insecure Crypto</option>
            <option value="hardcoded-secrets">Hardcoded Secrets</option>
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
              className={`glass-strong p-6 rounded-2xl border-2 ${getSeverityColor(finding.severity)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityColor(finding.severity)}`}>
                      {finding.severity}
                    </span>
                    <span className="glass px-3 py-1 rounded text-xs">{finding.cwe}</span>
                    <span className="glass px-3 py-1 rounded text-xs capitalize">{finding.category.replace('-', ' ')}</span>
                    {finding.autofixAvailable && (
                      <span className="glass px-3 py-1 rounded text-xs text-neon-purple">Autofix Available</span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{finding.title}</h3>
                  <p className="text-gray-400 mb-4">{finding.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      {finding.repository}
                    </span>
                    <span>→</span>
                    <span>{finding.file}:{finding.line}-{finding.endLine}</span>
                  </div>

                  {/* Code Snippet */}
                  <div className="glass p-4 rounded-lg mb-4 bg-gray-900/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-mono">{finding.file}</span>
                      <span className="text-xs text-gray-500">Lines {finding.line}-{finding.endLine}</span>
                    </div>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{finding.codeSnippet}</code>
                    </pre>
                  </div>

                  {/* AI Recommendation */}
                  <div className="glass-strong p-4 rounded-lg flex items-start gap-3 mb-4">
                    <Brain className="w-5 h-5 text-neon-purple mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-neon-purple mb-1">Recommendation</h4>
                      <p className="text-sm text-gray-300">{finding.recommendation}</p>
                    </div>
                  </div>

                  {/* References */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">References:</span>
                    {finding.references.map((ref, i) => (
                      <a key={i} href={ref} target="_blank" rel="noopener noreferrer" className="text-xs text-neon-blue hover:text-neon-purple transition-colors">
                        OWASP
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                {finding.autofixAvailable && (
                  <button className="bg-gradient-to-r from-neon-purple to-neon-pink px-4 py-2 rounded-lg font-semibold hover:shadow-neon-purple transition-all flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4" />
                    Create Auto-fix PR
                  </button>
                )}
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Mark as Fixed
                </button>
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all">
                  View in Code
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
