'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Download,
  Eye,
  Clock,
  Award,
  FileText,
  Target,
  Activity,
  Calendar,
} from 'lucide-react';

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  score: number;
  trend: number;
  status: 'compliant' | 'partial' | 'non-compliant';
  lastAssessment: string;
  nextAssessment: string;
  controls: {
    total: number;
    passed: number;
    failed: number;
    warning: number;
  };
  categories: ComplianceCategory[];
}

interface ComplianceCategory {
  id: string;
  name: string;
  controls: number;
  passed: number;
  failed: number;
  score: number;
}

interface ComplianceControl {
  id: string;
  framework: string;
  category: string;
  control: string;
  description: string;
  status: 'pass' | 'fail' | 'warning';
  evidence: string[];
  remediationSteps?: string[];
  owner: string;
  lastChecked: string;
}

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'frameworks' | 'controls'>('overview');
  const [selectedFramework, setSelectedFramework] = useState<string>('soc2');

  const [frameworks] = useState<ComplianceFramework[]>([
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2 - Trust Services Criteria',
      score: 87,
      trend: 5.2,
      status: 'partial',
      lastAssessment: '2024-01-01',
      nextAssessment: '2024-04-01',
      controls: { total: 64, passed: 56, failed: 5, warning: 3 },
      categories: [
        { id: '1', name: 'Security', controls: 25, passed: 22, failed: 2, score: 88 },
        { id: '2', name: 'Availability', controls: 12, passed: 11, failed: 1, score: 92 },
        { id: '3', name: 'Processing Integrity', controls: 10, passed: 9, failed: 0, score: 90 },
        { id: '4', name: 'Confidentiality', controls: 9, passed: 7, failed: 2, score: 78 },
        { id: '5', name: 'Privacy', controls: 8, passed: 7, failed: 0, score: 88 },
      ],
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      description: 'Information Security Management System',
      score: 92,
      trend: 3.1,
      status: 'compliant',
      lastAssessment: '2023-12-15',
      nextAssessment: '2024-06-15',
      controls: { total: 114, passed: 105, failed: 4, warning: 5 },
      categories: [
        { id: '1', name: 'Information Security Policies', controls: 8, passed: 8, failed: 0, score: 100 },
        { id: '2', name: 'Organization of Information Security', controls: 15, passed: 14, failed: 1, score: 93 },
        { id: '3', name: 'Human Resource Security', controls: 12, passed: 11, failed: 1, score: 92 },
        { id: '4', name: 'Asset Management', controls: 18, passed: 17, failed: 0, score: 94 },
        { id: '5', name: 'Access Control', controls: 20, passed: 19, failed: 1, score: 95 },
      ],
    },
    {
      id: 'pcidss',
      name: 'PCI-DSS 4.0',
      description: 'Payment Card Industry Data Security Standard',
      score: 78,
      trend: -2.3,
      status: 'partial',
      lastAssessment: '2024-01-10',
      nextAssessment: '2024-02-10',
      controls: { total: 328, passed: 256, failed: 45, warning: 27 },
      categories: [
        { id: '1', name: 'Secure Network', controls: 54, passed: 48, failed: 4, score: 89 },
        { id: '2', name: 'Protect Cardholder Data', controls: 62, passed: 50, failed: 10, score: 81 },
        { id: '3', name: 'Vulnerability Management', controls: 48, passed: 35, failed: 8, score: 73 },
        { id: '4', name: 'Access Control', controls: 68, passed: 55, failed: 9, score: 81 },
        { id: '5', name: 'Monitoring & Testing', controls: 96, passed: 68, failed: 14, score: 71 },
      ],
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      description: 'Health Insurance Portability and Accountability Act',
      score: 95,
      trend: 1.8,
      status: 'compliant',
      lastAssessment: '2023-12-20',
      nextAssessment: '2024-03-20',
      controls: { total: 54, passed: 51, failed: 1, warning: 2 },
      categories: [
        { id: '1', name: 'Administrative Safeguards', controls: 18, passed: 17, failed: 1, score: 94 },
        { id: '2', name: 'Physical Safeguards', controls: 12, passed: 12, failed: 0, score: 100 },
        { id: '3', name: 'Technical Safeguards', controls: 15, passed: 14, failed: 0, score: 93 },
        { id: '4', name: 'Organizational Requirements', controls: 9, passed: 8, failed: 0, score: 89 },
      ],
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'General Data Protection Regulation',
      score: 89,
      trend: 4.5,
      status: 'partial',
      lastAssessment: '2024-01-05',
      nextAssessment: '2024-04-05',
      controls: { total: 42, passed: 37, failed: 3, warning: 2 },
      categories: [
        { id: '1', name: 'Lawfulness, Fairness, Transparency', controls: 8, passed: 7, failed: 1, score: 88 },
        { id: '2', name: 'Purpose Limitation', controls: 6, passed: 6, failed: 0, score: 100 },
        { id: '3', name: 'Data Minimization', controls: 7, passed: 6, failed: 1, score: 86 },
        { id: '4', name: 'Accuracy', controls: 5, passed: 5, failed: 0, score: 100 },
        { id: '5', name: 'Storage Limitation', controls: 6, passed: 5, failed: 0, score: 83 },
        { id: '6', name: 'Integrity & Confidentiality', controls: 10, passed: 8, failed: 1, score: 80 },
      ],
    },
    {
      id: 'cis',
      name: 'CIS Controls',
      description: 'Center for Internet Security Critical Security Controls',
      score: 84,
      trend: 6.7,
      status: 'partial',
      lastAssessment: '2024-01-12',
      nextAssessment: '2024-02-12',
      controls: { total: 153, passed: 129, failed: 15, warning: 9 },
      categories: [
        { id: '1', name: 'Basic CIS Controls', controls: 48, passed: 42, failed: 4, score: 88 },
        { id: '2', name: 'Foundational CIS Controls', controls: 55, passed: 46, failed: 6, score: 84 },
        { id: '3', name: 'Organizational CIS Controls', controls: 50, passed: 41, failed: 5, score: 82 },
      ],
    },
  ]);

  const [controls] = useState<ComplianceControl[]>([
    {
      id: '1',
      framework: 'SOC 2',
      category: 'Security',
      control: 'CC6.1 - Logical and Physical Access Controls',
      description: 'The entity implements logical access security software, infrastructure, and architectures over protected information assets.',
      status: 'pass',
      evidence: ['Multi-factor authentication enabled', 'RBAC implemented', 'Access logs monitored'],
      owner: 'Security Team',
      lastChecked: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      framework: 'SOC 2',
      category: 'Security',
      control: 'CC6.6 - Encryption',
      description: 'The entity implements controls to protect data at rest and in transit.',
      status: 'fail',
      evidence: [],
      remediationSteps: [
        'Enable encryption for all S3 buckets',
        'Implement TLS 1.3 for all API endpoints',
        'Configure database encryption at rest'
      ],
      owner: 'DevOps Team',
      lastChecked: '2024-01-15T09:30:00Z',
    },
    {
      id: '3',
      framework: 'PCI-DSS',
      category: 'Secure Network',
      control: 'Req 1.2 - Firewall Configuration',
      description: 'Build firewall and router configurations that restrict connections.',
      status: 'warning',
      evidence: ['Firewall rules configured', 'Some legacy rules need review'],
      remediationSteps: ['Review and remove unused firewall rules', 'Document all firewall exceptions'],
      owner: 'Network Team',
      lastChecked: '2024-01-14T15:00:00Z',
    },
    {
      id: '4',
      framework: 'ISO 27001',
      category: 'Access Control',
      control: 'A.9.2.1 - User Registration',
      description: 'A formal user registration and de-registration process for enabling assignment of access rights.',
      status: 'pass',
      evidence: ['Automated user provisioning', 'Deprovisioning workflow', 'Access review process'],
      owner: 'IT Team',
      lastChecked: '2024-01-15T11:00:00Z',
    },
    {
      id: '5',
      framework: 'GDPR',
      category: 'Integrity & Confidentiality',
      control: 'Art. 32 - Security of Processing',
      description: 'Implement appropriate technical and organizational measures to ensure security.',
      status: 'fail',
      evidence: [],
      remediationSteps: [
        'Implement data encryption for PII',
        'Enable audit logging for data access',
        'Conduct security assessment'
      ],
      owner: 'Privacy Team',
      lastChecked: '2024-01-14T12:00:00Z',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'pass':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'partial':
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'non-compliant':
      case 'fail':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const overallScore = Math.round(frameworks.reduce((acc, f) => acc + f.score, 0) / frameworks.length);
  const totalControls = frameworks.reduce((acc, f) => acc + f.controls.total, 0);
  const passedControls = frameworks.reduce((acc, f) => acc + f.controls.passed, 0);
  const failedControls = frameworks.reduce((acc, f) => acc + f.controls.failed, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/20 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl border border-green-500/30">
                <Award className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Compliance Dashboard</h1>
                <p className="text-gray-400 mt-1">
                  Monitor compliance across multiple security frameworks
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-panel p-6 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <Target className="w-4 h-4" />
                <span>Overall Compliance Score</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-4xl font-bold text-green-400">{overallScore}%</div>
                <div className="text-sm text-gray-400">{frameworks.length} frameworks</div>
              </div>
            </div>
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <FileText className="w-4 h-4" />
                <span>Total Controls</span>
              </div>
              <div className="text-4xl font-bold text-white">{totalControls}</div>
            </div>
            <div className="glass-panel p-6 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Passed</span>
              </div>
              <div className="text-4xl font-bold text-green-400">{passedControls}</div>
            </div>
            <div className="glass-panel p-6 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <XCircle className="w-4 h-4" />
                <span>Failed</span>
              </div>
              <div className="text-4xl font-bold text-red-400">{failedControls}</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10">
          {(['overview', 'frameworks', 'controls'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === tab
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-6"
          >
            {frameworks.map((framework) => (
              <motion.div
                key={framework.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold text-lg">{framework.name}</h3>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(framework.status)}`}>
                          {framework.status === 'compliant' ? 'COMPLIANT' :
                           framework.status === 'partial' ? 'PARTIAL' : 'NON-COMPLIANT'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{framework.description}</p>

                      {/* Score */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Compliance Score</span>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-400">{framework.score}%</span>
                            <div className={`flex items-center gap-1 text-sm ${framework.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {framework.trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                              <span>{Math.abs(framework.trend)}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                            style={{ width: `${framework.score}%` }}
                          />
                        </div>
                      </div>

                      {/* Controls Breakdown */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="glass-panel p-3 text-center">
                          <div className="text-green-400 font-bold text-lg">{framework.controls.passed}</div>
                          <div className="text-gray-400 text-xs">Passed</div>
                        </div>
                        <div className="glass-panel p-3 text-center">
                          <div className="text-yellow-400 font-bold text-lg">{framework.controls.warning}</div>
                          <div className="text-gray-400 text-xs">Warning</div>
                        </div>
                        <div className="glass-panel p-3 text-center">
                          <div className="text-red-400 font-bold text-lg">{framework.controls.failed}</div>
                          <div className="text-gray-400 text-xs">Failed</div>
                        </div>
                      </div>

                      {/* Assessment Dates */}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Last: {new Date(framework.lastAssessment).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Next: {new Date(framework.nextAssessment).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-all">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Frameworks Tab */}
        {activeTab === 'frameworks' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6">
              <h3 className="text-white font-semibold mb-4">Select Framework:</h3>
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:outline-none"
              >
                {frameworks.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            {frameworks.filter(f => f.id === selectedFramework).map((framework) => (
              <div key={framework.id} className="space-y-6">
                {framework.categories.map((category) => (
                  <div key={category.id} className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm">{category.controls} controls</span>
                        <span className="text-2xl font-bold text-green-400">{category.score}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        style={{ width: `${category.score}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-400">Passed: <span className="text-white font-medium">{category.passed}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span className="text-gray-400">Failed: <span className="text-white font-medium">{category.failed}</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        )}

        {/* Controls Tab */}
        {activeTab === 'controls' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {controls.map((control) => (
              <motion.div
                key={control.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-panel p-6 ${control.status === 'fail' ? 'border-red-500/30' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">{control.framework}</span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">{control.category}</span>
                      {control.status === 'pass' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : control.status === 'fail' ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{control.control}</h3>
                    <p className="text-gray-400 text-sm mb-4">{control.description}</p>

                    {control.evidence.length > 0 && (
                      <div className="glass-panel p-4 bg-green-500/5 mb-4">
                        <div className="text-green-400 font-medium mb-2 flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Evidence
                        </div>
                        <ul className="space-y-1">
                          {control.evidence.map((e, idx) => (
                            <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {control.remediationSteps && control.remediationSteps.length > 0 && (
                      <div className="glass-panel p-4 bg-orange-500/5 border border-orange-500/20 mb-4">
                        <div className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Remediation Steps
                        </div>
                        <ol className="space-y-1 list-decimal list-inside">
                          {control.remediationSteps.map((step, idx) => (
                            <li key={idx} className="text-gray-300 text-sm">{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span>Owner: <span className="text-purple-400">{control.owner}</span></span>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Last checked: {new Date(control.lastChecked).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
