'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileCode, Cloud, Server, Shield, GitPullRequest, Filter, CheckCircle } from 'lucide-react';

interface IaCFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  category: 'access-control' | 'encryption' | 'network' | 'logging' | 'compliance' | 'configuration';
  framework: 'terraform' | 'cloudformation' | 'kubernetes' | 'docker';
  description: string;
  impact: string;
  repository: string;
  file: string;
  line: number;
  resource: string;
  codeSnippet: string;
  recommendation: string;
  autofixAvailable: boolean;
  compliance: string[];
}

export default function IaCPage() {
  const [findings, setFindings] = useState<IaCFinding[]>([
    {
      id: '1',
      severity: 'critical',
      title: 'S3 Bucket Publicly Accessible',
      category: 'access-control',
      framework: 'terraform',
      description: 'S3 bucket is configured to allow public read access without proper access controls.',
      impact: 'Sensitive data stored in the bucket could be accessed by anyone on the internet, leading to data breaches.',
      repository: 'infrastructure/terraform',
      file: 'modules/storage/s3.tf',
      line: 15,
      resource: 'aws_s3_bucket.user_uploads',
      codeSnippet: `resource "aws_s3_bucket" "user_uploads" {
  bucket = "acme-user-uploads"
  acl    = "public-read"  # ⚠️ INSECURE
}`,
      recommendation: 'Set ACL to "private" and use CloudFront with signed URLs or AWS IAM policies for controlled access.',
      autofixAvailable: true,
      compliance: ['PCI-DSS', 'SOC2', 'HIPAA'],
    },
    {
      id: '2',
      severity: 'critical',
      title: 'Security Group Allows Unrestricted SSH Access',
      category: 'network',
      framework: 'terraform',
      description: 'Security group allows SSH (port 22) from any IP address (0.0.0.0/0).',
      impact: 'Attackers can attempt brute-force attacks against SSH service from anywhere on the internet.',
      repository: 'infrastructure/terraform',
      file: 'modules/network/security-groups.tf',
      line: 23,
      resource: 'aws_security_group.web_servers',
      codeSnippet: `ingress {
  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]  # ⚠️ INSECURE
}`,
      recommendation: 'Restrict SSH access to specific IP ranges or use AWS Systems Manager Session Manager instead.',
      autofixAvailable: true,
      compliance: ['CIS AWS Foundations', 'SOC2'],
    },
    {
      id: '3',
      severity: 'high',
      title: 'EBS Volume Encryption Disabled',
      category: 'encryption',
      framework: 'terraform',
      description: 'EBS volumes are created without encryption enabled.',
      impact: 'Data at rest is not encrypted, violating compliance requirements and exposing data if volumes are compromised.',
      repository: 'infrastructure/terraform',
      file: 'modules/compute/ec2.tf',
      line: 45,
      resource: 'aws_ebs_volume.data',
      codeSnippet: `resource "aws_ebs_volume" "data" {
  availability_zone = "us-east-1a"
  size              = 100
  encrypted         = false  # ⚠️ INSECURE
}`,
      recommendation: 'Enable encryption by setting encrypted = true and specify a KMS key for better key management.',
      autofixAvailable: true,
      compliance: ['PCI-DSS', 'HIPAA', 'GDPR'],
    },
    {
      id: '4',
      severity: 'high',
      title: 'Kubernetes Pod Running as Root',
      category: 'configuration',
      framework: 'kubernetes',
      description: 'Container is configured to run as root user (UID 0).',
      impact: 'If container is compromised, attacker has root-level access which can lead to container escape and node compromise.',
      repository: 'infrastructure/k8s',
      file: 'deployments/api-server.yaml',
      line: 28,
      resource: 'Deployment/api-server',
      codeSnippet: `spec:
  containers:
  - name: api
    image: acme/api:latest
    # Missing securityContext  # ⚠️ INSECURE`,
      recommendation: 'Add securityContext with runAsNonRoot: true and runAsUser: <non-zero UID>.',
      autofixAvailable: true,
      compliance: ['CIS Kubernetes Benchmark'],
    },
    {
      id: '5',
      severity: 'high',
      title: 'RDS Instance Without Backup',
      category: 'logging',
      framework: 'terraform',
      description: 'RDS database instance has automated backups disabled.',
      impact: 'Data loss risk in case of instance failure or deletion. Unable to perform point-in-time recovery.',
      repository: 'infrastructure/terraform',
      file: 'modules/database/rds.tf',
      line: 34,
      resource: 'aws_db_instance.primary',
      codeSnippet: `resource "aws_db_instance" "primary" {
  allocated_storage    = 100
  engine               = "postgres"
  backup_retention_period = 0  # ⚠️ INSECURE
}`,
      recommendation: 'Set backup_retention_period to at least 7 days for production databases.',
      autofixAvailable: true,
      compliance: ['SOC2', 'ISO 27001'],
    },
    {
      id: '6',
      severity: 'medium',
      title: 'CloudWatch Logs Retention Not Set',
      category: 'logging',
      framework: 'terraform',
      description: 'CloudWatch log group does not have retention policy configured.',
      impact: 'Logs will be retained indefinitely, leading to unnecessary costs and compliance issues.',
      repository: 'infrastructure/terraform',
      file: 'modules/logging/cloudwatch.tf',
      line: 12,
      resource: 'aws_cloudwatch_log_group.api_logs',
      codeSnippet: `resource "aws_cloudwatch_log_group" "api_logs" {
  name = "/aws/lambda/api"
  # retention_in_days not set  # ⚠️ ISSUE
}`,
      recommendation: 'Set retention_in_days based on your compliance requirements (typically 30, 90, or 365 days).',
      autofixAvailable: true,
      compliance: ['GDPR', 'SOC2'],
    },
  ]);

  const [filter, setFilter] = useState({
    severity: 'all',
    framework: 'all',
    category: 'all',
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default: return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'terraform': return '🏗️';
      case 'cloudformation': return '☁️';
      case 'kubernetes': return '☸️';
      case 'docker': return '🐳';
      default: return '📦';
    }
  };

  const filteredFindings = findings.filter(f => {
    if (filter.severity !== 'all' && f.severity !== filter.severity) return false;
    if (filter.framework !== 'all' && f.framework !== filter.framework) return false;
    if (filter.category !== 'all' && f.category !== filter.category) return false;
    return true;
  });

  const stats = {
    total: findings.length,
    critical: findings.filter(f => f.severity === 'critical').length,
    high: findings.filter(f => f.severity === 'high').length,
    medium: findings.filter(f => f.severity === 'medium').length,
    terraform: findings.filter(f => f.framework === 'terraform').length,
    kubernetes: findings.filter(f => f.framework === 'kubernetes').length,
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
            <Cloud className="w-10 h-10 text-neon-yellow" />
            IaC Security Findings
          </motion.h1>
          <p className="text-gray-400">Infrastructure as Code Misconfigurations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-xs text-gray-400">Total Issues</div>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-blue-400 mb-1">{stats.terraform}</div>
            <div className="text-xs text-gray-400">Terraform</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-purple-400 mb-1">{stats.kubernetes}</div>
            <div className="text-xs text-gray-400">Kubernetes</div>
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
          <select value={filter.framework} onChange={(e) => setFilter({ ...filter, framework: e.target.value })} className="glass px-4 py-2 rounded-lg text-white outline-none">
            <option value="all">All Frameworks</option>
            <option value="terraform">Terraform</option>
            <option value="cloudformation">CloudFormation</option>
            <option value="kubernetes">Kubernetes</option>
            <option value="docker">Docker</option>
          </select>
          <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })} className="glass px-4 py-2 rounded-lg text-white outline-none">
            <option value="all">All Categories</option>
            <option value="access-control">Access Control</option>
            <option value="encryption">Encryption</option>
            <option value="network">Network</option>
            <option value="logging">Logging</option>
            <option value="compliance">Compliance</option>
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
                    <span className="glass px-3 py-1 rounded text-xs">
                      {getFrameworkIcon(finding.framework)} {finding.framework.toUpperCase()}
                    </span>
                    <span className="glass px-3 py-1 rounded text-xs capitalize">
                      {finding.category.replace('-', ' ')}
                    </span>
                    {finding.autofixAvailable && (
                      <span className="glass px-3 py-1 rounded text-xs text-neon-purple">Autofix Available</span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{finding.title}</h3>
                  <p className="text-gray-400 mb-2">{finding.description}</p>
                  <p className="text-sm text-orange-300 mb-4"><strong>Impact:</strong> {finding.impact}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <span>{finding.repository}</span>
                    <span>→</span>
                    <span>{finding.file}:{finding.line}</span>
                  </div>

                  {/* Code Snippet */}
                  <div className="glass p-4 rounded-lg mb-4 bg-gray-900/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 font-mono">{finding.resource}</span>
                      <span className="text-xs text-gray-500">Line {finding.line}</span>
                    </div>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{finding.codeSnippet}</code>
                    </pre>
                  </div>

                  {/* Recommendation */}
                  <div className="glass-strong p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-neon-green mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Remediation
                    </h4>
                    <p className="text-sm text-gray-300">{finding.recommendation}</p>
                  </div>

                  {/* Compliance */}
                  {finding.compliance.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Compliance:</span>
                      {finding.compliance.map((item, i) => (
                        <span key={i} className="glass px-2 py-1 rounded text-xs text-blue-400">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
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
