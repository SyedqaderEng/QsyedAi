'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, Shield, Plus, Edit, Trash2, CheckCircle, Filter,
  AlertTriangle, Zap, Code, Bell
} from 'lucide-react';

interface Policy {
  id: string;
  name: string;
  description: string;
  type: 'auto-triage' | 'severity-override' | 'noise-reduction' | 'auto-fix' | 'notification' | 'compliance';
  status: 'active' | 'inactive';
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  actions: {
    type: string;
    config: Record<string, any>;
  }[];
  triggeredCount: number;
  lastTriggered?: string;
  createdAt: string;
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: '1',
      name: 'Auto-ignore low severity in test environments',
      description: 'Automatically ignore low and info severity findings in repositories tagged as "test" or "staging"',
      type: 'auto-triage',
      status: 'active',
      conditions: [
        { field: 'severity', operator: 'in', value: 'low,info' },
        { field: 'repository_tags', operator: 'contains', value: 'test,staging' },
      ],
      actions: [
        { type: 'ignore', config: { reason: 'Non-production environment' } },
      ],
      triggeredCount: 142,
      lastTriggered: new Date(Date.now() - 300000).toISOString(),
      createdAt: '2024-10-01',
    },
    {
      id: '2',
      name: 'Escalate critical findings in production',
      description: 'Upgrade high severity findings to critical when detected in production repositories',
      type: 'severity-override',
      status: 'active',
      conditions: [
        { field: 'severity', operator: 'equals', value: 'high' },
        { field: 'repository_tags', operator: 'contains', value: 'production' },
      ],
      actions: [
        { type: 'set_severity', config: { severity: 'critical' } },
        { type: 'notify', config: { channels: ['slack:#security-critical', 'pagerduty'] } },
      ],
      triggeredCount: 23,
      lastTriggered: new Date(Date.now() - 7200000).toISOString(),
      createdAt: '2024-09-15',
    },
    {
      id: '3',
      name: 'Auto-fix outdated dependencies',
      description: 'Automatically create PRs to update dependencies with known vulnerabilities',
      type: 'auto-fix',
      status: 'active',
      conditions: [
        { field: 'finding_type', operator: 'equals', value: 'sca' },
        { field: 'fix_available', operator: 'equals', value: 'true' },
        { field: 'cvss_score', operator: 'greater_than', value: '7.0' },
      ],
      actions: [
        { type: 'create_pr', config: { auto_merge: false, reviewers: ['security-team'] } },
      ],
      triggeredCount: 67,
      lastTriggered: new Date(Date.now() - 3600000).toISOString(),
      createdAt: '2024-11-01',
    },
    {
      id: '4',
      name: 'Suppress false positives for specific patterns',
      description: 'Ignore secrets detection alerts for test API keys and mock credentials',
      type: 'noise-reduction',
      status: 'active',
      conditions: [
        { field: 'finding_type', operator: 'equals', value: 'secrets' },
        { field: 'secret_value', operator: 'matches', value: 'sk_test_.*|test_api_key.*|MOCK_.*' },
      ],
      actions: [
        { type: 'ignore', config: { reason: 'Test credentials - not a real secret' } },
      ],
      triggeredCount: 89,
      lastTriggered: new Date(Date.now() - 1800000).toISOString(),
      createdAt: '2024-10-15',
    },
    {
      id: '5',
      name: 'SOC2 Compliance Violations',
      description: 'Flag and notify on findings that violate SOC2 compliance requirements',
      type: 'compliance',
      status: 'active',
      conditions: [
        { field: 'compliance_frameworks', operator: 'contains', value: 'SOC2' },
      ],
      actions: [
        { type: 'add_tag', config: { tag: 'compliance-violation' } },
        { type: 'notify', config: { channels: ['email:compliance@acme.com'] } },
        { type: 'create_jira_ticket', config: { project: 'COMPLIANCE', priority: 'high' } },
      ],
      triggeredCount: 12,
      lastTriggered: new Date(Date.now() - 86400000).toISOString(),
      createdAt: '2024-09-01',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState({
    type: 'all',
    status: 'all',
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'auto-triage': return 'text-blue-400';
      case 'severity-override': return 'text-orange-400';
      case 'noise-reduction': return 'text-purple-400';
      case 'auto-fix': return 'text-green-400';
      case 'notification': return 'text-yellow-400';
      case 'compliance': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'auto-triage': return <Filter className="w-4 h-4" />;
      case 'severity-override': return <AlertTriangle className="w-4 h-4" />;
      case 'noise-reduction': return <Shield className="w-4 h-4" />;
      case 'auto-fix': return <Zap className="w-4 h-4" />;
      case 'notification': return <Bell className="w-4 h-4" />;
      case 'compliance': return <CheckCircle className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const filteredPolicies = policies.filter(p => {
    if (filter.type !== 'all' && p.type !== filter.type) return false;
    if (filter.status !== 'all' && p.status !== filter.status) return false;
    return true;
  });

  const handleToggleStatus = (policyId: string) => {
    setPolicies(policies.map(p =>
      p.id === policyId ? { ...p, status: p.status === 'active' ? 'inactive' as const : 'active' as const } : p
    ));
  };

  const handleDelete = (policyId: string) => {
    if (confirm('Are you sure you want to delete this policy?')) {
      setPolicies(policies.filter(p => p.id !== policyId));
    }
  };

  const stats = {
    total: policies.length,
    active: policies.filter(p => p.status === 'active').length,
    totalTriggered: policies.reduce((acc, p) => acc + p.triggeredCount, 0),
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-2 text-white flex items-center gap-3"
            >
              <Shield className="w-10 h-10 text-neon-purple" />
              Security Policies
            </motion.h1>
            <p className="text-gray-400">Automated rules and logic for security workflows</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Policy
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-xl">
            <div className="text-3xl font-bold text-white mb-2">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Policies</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-xl border border-green-500/30">
            <div className="text-3xl font-bold text-green-400 mb-2">{stats.active}</div>
            <div className="text-sm text-gray-400">Active Policies</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-xl border border-neon-purple/30">
            <div className="text-3xl font-bold text-neon-purple mb-2">{stats.totalTriggered}</div>
            <div className="text-sm text-gray-400">Total Executions</div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong p-4 rounded-xl mb-6 flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })} className="glass px-4 py-2 rounded-lg text-white outline-none">
            <option value="all">All Types</option>
            <option value="auto-triage">Auto-Triage</option>
            <option value="severity-override">Severity Override</option>
            <option value="noise-reduction">Noise Reduction</option>
            <option value="auto-fix">Auto-Fix</option>
            <option value="notification">Notification</option>
            <option value="compliance">Compliance</option>
          </select>
          <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })} className="glass px-4 py-2 rounded-lg text-white outline-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </motion.div>

        {/* Policies List */}
        <div className="space-y-4">
          {filteredPolicies.map((policy, idx) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass-strong p-6 rounded-2xl ${policy.status === 'active' ? 'border-2 border-neon-blue/30' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`glass px-3 py-1 rounded flex items-center gap-2 ${getTypeColor(policy.type)}`}>
                      {getTypeIcon(policy.type)}
                      <span className="text-xs font-semibold capitalize">
                        {policy.type.replace('-', ' ')}
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded text-xs font-bold ${
                      policy.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {policy.status.toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-500">
                      Triggered {policy.triggeredCount} times
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{policy.name}</h3>
                  <p className="text-gray-400 mb-4">{policy.description}</p>

                  {/* Conditions */}
                  <div className="glass p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-neon-blue mb-2">Conditions:</h4>
                    <div className="space-y-2">
                      {policy.conditions.map((condition, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="glass px-2 py-1 rounded text-gray-300 font-mono">{condition.field}</span>
                          <span className="text-gray-500">{condition.operator}</span>
                          <span className="glass px-2 py-1 rounded text-white font-mono">{condition.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="glass p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-neon-green mb-2">Actions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {policy.actions.map((action, i) => (
                        <span key={i} className="glass px-3 py-1 rounded text-xs text-gray-300 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {action.type.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Created: {new Date(policy.createdAt).toLocaleDateString()}</span>
                    {policy.lastTriggered && (
                      <>
                        <span>•</span>
                        <span>Last triggered: {new Date(policy.lastTriggered).toLocaleString()}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                <button
                  onClick={() => handleToggleStatus(policy.id)}
                  className={`glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2 ${
                    policy.status === 'active' ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {policy.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all">
                  View Logs
                </button>
                <button
                  onClick={() => handleDelete(policy.id)}
                  className="glass px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Policy Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-strong p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Policy Templates</h2>
          <p className="text-gray-400 mb-6">Get started quickly with pre-built policy templates</p>

          <div className="grid md:grid-cols-3 gap-4">
            <button className="glass p-4 rounded-lg hover:glass-strong transition-all text-left">
              <h3 className="font-bold text-white mb-2">🎯 Auto-Triage Low Priority</h3>
              <p className="text-sm text-gray-400">Automatically handle low severity findings</p>
            </button>
            <button className="glass p-4 rounded-lg hover:glass-strong transition-all text-left">
              <h3 className="font-bold text-white mb-2">🚀 Dependency Auto-Update</h3>
              <p className="text-sm text-gray-400">Keep dependencies up-to-date automatically</p>
            </button>
            <button className="glass p-4 rounded-lg hover:glass-strong transition-all text-left">
              <h3 className="font-bold text-white mb-2">📊 Compliance Monitoring</h3>
              <p className="text-sm text-gray-400">Track and enforce compliance requirements</p>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Create Policy Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Create Security Policy
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Policy Name</label>
                <input
                  type="text"
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                  placeholder="e.g., Auto-fix critical vulnerabilities"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Policy Type</label>
                <select className="w-full glass px-4 py-3 rounded-lg text-white outline-none">
                  <option>Auto-Triage</option>
                  <option>Severity Override</option>
                  <option>Noise Reduction</option>
                  <option>Auto-Fix</option>
                  <option>Notification</option>
                  <option>Compliance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                  rows={3}
                  placeholder="Describe what this policy does..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all">
                Create Policy
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 glass py-3 rounded-lg hover:glass-strong transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
