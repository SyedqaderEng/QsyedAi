'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, Zap, Plus, Play, Pause, Trash2, Copy, Edit,
  GitPullRequest, MessageSquare, Bell, Code, AlertTriangle, CheckCircle
} from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  trigger: {
    type: 'alert_created' | 'vulnerability_found' | 'scan_completed' | 'pr_merged' | 'schedule';
    config: Record<string, any>;
  };
  conditions: {
    field: string;
    operator: string;
    value: string;
  }[];
  actions: {
    id: string;
    type: 'create_jira_ticket' | 'send_slack_message' | 'create_pr' | 'send_email' | 'webhook' | 'run_script';
    config: Record<string, any>;
  }[];
  executionCount: number;
  lastRun?: string;
  createdAt: string;
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Critical Alert → Jira + Slack',
      description: 'Create Jira ticket and send Slack alert for critical vulnerabilities',
      status: 'active',
      trigger: {
        type: 'alert_created',
        config: { severity: 'critical' },
      },
      conditions: [
        { field: 'severity', operator: 'equals', value: 'critical' },
        { field: 'repository_tags', operator: 'contains', value: 'production' },
      ],
      actions: [
        {
          id: 'a1',
          type: 'create_jira_ticket',
          config: {
            project: 'SEC',
            issueType: 'Bug',
            priority: 'Highest',
            assignee: 'security-team',
          },
        },
        {
          id: 'a2',
          type: 'send_slack_message',
          config: {
            channel: '#security-critical',
            mention: '@security-team',
          },
        },
      ],
      executionCount: 23,
      lastRun: new Date(Date.now() - 7200000).toISOString(),
      createdAt: '2024-10-15',
    },
    {
      id: '2',
      name: 'Auto-fix Dependency Vulnerabilities',
      description: 'Automatically create PRs for SCA findings with available fixes',
      status: 'active',
      trigger: {
        type: 'vulnerability_found',
        config: { type: 'sca' },
      },
      conditions: [
        { field: 'fix_available', operator: 'equals', value: 'true' },
        { field: 'cvss_score', operator: 'greater_than', value: '7.0' },
      ],
      actions: [
        {
          id: 'a3',
          type: 'create_pr',
          config: {
            branch_prefix: 'autofix/dependency',
            reviewers: ['security-team'],
            autoMerge: false,
          },
        },
      ],
      executionCount: 67,
      lastRun: new Date(Date.now() - 3600000).toISOString(),
      createdAt: '2024-11-01',
    },
    {
      id: '3',
      name: 'Weekly Security Digest',
      description: 'Send weekly summary of security findings to stakeholders',
      status: 'active',
      trigger: {
        type: 'schedule',
        config: { cron: '0 9 * * MON' },
      },
      conditions: [],
      actions: [
        {
          id: 'a4',
          type: 'send_email',
          config: {
            recipients: ['security@acme.com', 'cto@acme.com'],
            template: 'weekly_digest',
          },
        },
      ],
      executionCount: 12,
      lastRun: new Date(Date.now() - 86400000).toISOString(),
      createdAt: '2024-09-01',
    },
    {
      id: '4',
      name: 'Secrets Detection → Immediate Alert',
      description: 'Alert security team immediately when secrets are detected',
      status: 'active',
      trigger: {
        type: 'alert_created',
        config: { type: 'secrets' },
      },
      conditions: [
        { field: 'validated_active', operator: 'equals', value: 'true' },
      ],
      actions: [
        {
          id: 'a5',
          type: 'send_slack_message',
          config: {
            channel: '#security-alerts',
            mention: '@channel',
            urgency: 'high',
          },
        },
        {
          id: 'a6',
          type: 'send_email',
          config: {
            recipients: ['security-oncall@acme.com'],
            subject: '🚨 URGENT: Active Secret Detected',
          },
        },
        {
          id: 'a7',
          type: 'webhook',
          config: {
            url: 'https://api.acme.com/security/alerts',
            method: 'POST',
          },
        },
      ],
      executionCount: 8,
      lastRun: new Date(Date.now() - 14400000).toISOString(),
      createdAt: '2024-10-20',
    },
    {
      id: '5',
      name: 'Compliance Report Generation',
      description: 'Generate and email compliance reports monthly',
      status: 'paused',
      trigger: {
        type: 'schedule',
        config: { cron: '0 8 1 * *' },
      },
      conditions: [],
      actions: [
        {
          id: 'a8',
          type: 'run_script',
          config: {
            script: 'generate_compliance_report.sh',
            framework: 'SOC2',
          },
        },
        {
          id: 'a9',
          type: 'send_email',
          config: {
            recipients: ['compliance@acme.com'],
            attachments: true,
          },
        },
      ],
      executionCount: 3,
      lastRun: new Date(Date.now() - 2592000000).toISOString(),
      createdAt: '2024-08-01',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'paused': return 'text-yellow-400';
      case 'draft': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create_jira_ticket': return <CheckCircle className="w-4 h-4" />;
      case 'send_slack_message': return <MessageSquare className="w-4 h-4" />;
      case 'create_pr': return <GitPullRequest className="w-4 h-4" />;
      case 'send_email': return <Bell className="w-4 h-4" />;
      case 'webhook': return <Zap className="w-4 h-4" />;
      case 'run_script': return <Code className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const handleToggleStatus = (workflowId: string) => {
    setWorkflows(workflows.map(w =>
      w.id === workflowId
        ? { ...w, status: w.status === 'active' ? 'paused' as const : 'active' as const }
        : w
    ));
  };

  const handleDelete = (workflowId: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(workflows.filter(w => w.id !== workflowId));
    }
  };

  const handleDuplicate = (workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    if (workflow) {
      const newWorkflow: Workflow = {
        ...workflow,
        id: Date.now().toString(),
        name: `${workflow.name} (Copy)`,
        status: 'draft',
        executionCount: 0,
        lastRun: undefined,
        createdAt: new Date().toISOString(),
      };
      setWorkflows([...workflows, newWorkflow]);
    }
  };

  const stats = {
    total: workflows.length,
    active: workflows.filter(w => w.status === 'active').length,
    paused: workflows.filter(w => w.status === 'paused').length,
    totalExecutions: workflows.reduce((acc, w) => acc + w.executionCount, 0),
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
              <Zap className="w-10 h-10 text-neon-yellow" />
              Workflow Automation
            </motion.h1>
            <p className="text-gray-400">Automate your security operations with custom workflows</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Workflow
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-xs text-gray-400">Total Workflows</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-4 rounded-xl border border-green-500/30">
            <div className="text-2xl font-bold text-green-400 mb-1">{stats.active}</div>
            <div className="text-xs text-gray-400">Active</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-4 rounded-xl border border-yellow-500/30">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.paused}</div>
            <div className="text-xs text-gray-400">Paused</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-4 rounded-xl border border-neon-purple/30">
            <div className="text-2xl font-bold text-neon-purple mb-1">{stats.totalExecutions}</div>
            <div className="text-xs text-gray-400">Total Runs</div>
          </motion.div>
        </div>

        {/* Workflows List */}
        <div className="space-y-6">
          {workflows.map((workflow, idx) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass-strong p-6 rounded-2xl ${workflow.status === 'active' ? 'border-2 border-neon-blue/30' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{workflow.name}</h3>
                    <div className={`px-3 py-1 rounded text-xs font-bold uppercase ${getStatusColor(workflow.status)}`}>
                      {workflow.status}
                    </div>
                    <span className="text-sm text-gray-500">
                      Ran {workflow.executionCount} times
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4">{workflow.description}</p>

                  {/* Trigger */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="glass p-4 rounded-lg flex-1">
                      <h4 className="text-sm font-semibold text-neon-blue mb-2">Trigger</h4>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-neon-blue" />
                        <span className="text-sm text-gray-300 capitalize">
                          {workflow.trigger.type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    {workflow.conditions.length > 0 && (
                      <div className="glass p-4 rounded-lg flex-1">
                        <h4 className="text-sm font-semibold text-neon-yellow mb-2">Conditions ({workflow.conditions.length})</h4>
                        <div className="space-y-1">
                          {workflow.conditions.slice(0, 2).map((cond, i) => (
                            <div key={i} className="text-xs text-gray-400 font-mono">
                              {cond.field} {cond.operator} {cond.value}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="glass p-4 rounded-lg flex-1">
                      <h4 className="text-sm font-semibold text-neon-green mb-2">Actions ({workflow.actions.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {workflow.actions.map((action) => (
                          <span key={action.id} className="glass px-2 py-1 rounded text-xs flex items-center gap-1">
                            {getActionIcon(action.type)}
                            {action.type.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Created: {new Date(workflow.createdAt).toLocaleDateString()}</span>
                    {workflow.lastRun && (
                      <>
                        <span>•</span>
                        <span>Last run: {new Date(workflow.lastRun).toLocaleString()}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-700">
                <button
                  onClick={() => handleToggleStatus(workflow.id)}
                  className={`glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2 ${
                    workflow.status === 'active' ? 'text-yellow-400' : 'text-green-400'
                  }`}
                >
                  {workflow.status === 'active' ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Activate
                    </>
                  )}
                </button>
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDuplicate(workflow.id)}
                  className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all">
                  View Logs
                </button>
                <button
                  onClick={() => handleDelete(workflow.id)}
                  className="glass px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workflow Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-strong p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Workflow Templates</h2>
          <p className="text-gray-400 mb-6">Get started with pre-built automation templates</p>

          <div className="grid md:grid-cols-3 gap-4">
            <button className="glass p-4 rounded-lg hover:glass-strong transition-all text-left">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Critical Alert Response
              </h3>
              <p className="text-sm text-gray-400">Automatically escalate critical findings</p>
            </button>
            <button className="glass p-4 rounded-lg hover:glass-strong transition-all text-left">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-green-400" />
                Auto-remediation
              </h3>
              <p className="text-sm text-gray-400">Create PRs for fixable vulnerabilities</p>
            </button>
            <button className="glass p-4 rounded-lg hover:glass-strong transition-all text-left">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-400" />
                Security Digest
              </h3>
              <p className="text-sm text-gray-400">Weekly summary reports</p>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong p-8 rounded-2xl max-w-2xl w-full"
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Create Workflow
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Workflow Name</label>
                <input
                  type="text"
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                  placeholder="e.g., Critical Alert Response"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Trigger</label>
                <select className="w-full glass px-4 py-3 rounded-lg text-white outline-none">
                  <option>Alert Created</option>
                  <option>Vulnerability Found</option>
                  <option>Scan Completed</option>
                  <option>PR Merged</option>
                  <option>Schedule (Cron)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                  rows={3}
                  placeholder="Describe what this workflow does..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all">
                Create Workflow
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
