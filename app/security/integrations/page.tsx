'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, Github, MessageSquare, CheckCircle, Settings,
  Slack, Zap, Webhook, Bell, Code, GitBranch, AlertCircle
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  provider: 'github' | 'gitlab' | 'bitbucket' | 'slack' | 'teams' | 'jira' | 'linear' | 'pagerduty' | 'webhook';
  category: 'git' | 'communication' | 'ticketing' | 'notification' | 'custom';
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  icon: any;
  config?: {
    repos?: number;
    channels?: string[];
    workspace?: string;
    lastSync?: string;
  };
  features: string[];
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'GitHub',
      provider: 'github',
      category: 'git',
      description: 'Automatically scan repositories, create pull requests for fixes, and sync issues.',
      status: 'connected',
      icon: Github,
      config: {
        repos: 24,
        workspace: 'acme-corp',
        lastSync: new Date(Date.now() - 300000).toISOString(),
      },
      features: ['Repository Scanning', 'Auto-fix PRs', 'Issue Sync', 'PR Comments'],
    },
    {
      id: '2',
      name: 'Slack',
      provider: 'slack',
      category: 'communication',
      description: 'Receive real-time security alerts and notifications in your Slack channels.',
      status: 'connected',
      icon: MessageSquare,
      config: {
        channels: ['#security-alerts', '#devops'],
        workspace: 'Acme Workspace',
        lastSync: new Date(Date.now() - 600000).toISOString(),
      },
      features: ['Alert Notifications', 'Daily Digests', 'Threat Intelligence', 'Interactive Commands'],
    },
    {
      id: '3',
      name: 'Jira',
      provider: 'jira',
      category: 'ticketing',
      description: 'Create and track security issues in Jira with automatic updates.',
      status: 'connected',
      icon: CheckCircle,
      config: {
        workspace: 'acme.atlassian.net',
        lastSync: new Date(Date.now() - 900000).toISOString(),
      },
      features: ['Issue Creation', 'Status Sync', 'Priority Mapping', 'Custom Fields'],
    },
    {
      id: '4',
      name: 'GitLab',
      provider: 'gitlab',
      category: 'git',
      description: 'Scan GitLab repositories and manage merge requests.',
      status: 'disconnected',
      icon: GitBranch,
      config: {},
      features: ['Repository Scanning', 'Merge Requests', 'Pipeline Integration'],
    },
    {
      id: '5',
      name: 'Microsoft Teams',
      provider: 'teams',
      category: 'communication',
      description: 'Send security notifications to Microsoft Teams channels.',
      status: 'disconnected',
      icon: MessageSquare,
      config: {},
      features: ['Channel Notifications', 'Adaptive Cards', 'Bot Commands'],
    },
    {
      id: '6',
      name: 'Linear',
      provider: 'linear',
      category: 'ticketing',
      description: 'Track security issues in Linear with automatic syncing.',
      status: 'disconnected',
      icon: Zap,
      config: {},
      features: ['Issue Tracking', 'Auto-sync', 'Labels & Projects'],
    },
    {
      id: '7',
      name: 'PagerDuty',
      provider: 'pagerduty',
      category: 'notification',
      description: 'Create incidents for critical security alerts.',
      status: 'disconnected',
      icon: Bell,
      config: {},
      features: ['Incident Creation', 'Escalation Policies', 'On-call Integration'],
    },
    {
      id: '8',
      name: 'Webhooks',
      provider: 'webhook',
      category: 'custom',
      description: 'Send security events to custom endpoints via webhooks.',
      status: 'connected',
      icon: Webhook,
      config: {
        lastSync: new Date(Date.now() - 120000).toISOString(),
      },
      features: ['Custom Payloads', 'Event Filtering', 'Retry Logic', 'HMAC Signatures'],
    },
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowConfigModal(true);
  };

  const handleDisconnect = (integrationId: string) => {
    if (confirm('Are you sure you want to disconnect this integration?')) {
      setIntegrations(integrations.map(i =>
        i.id === integrationId ? { ...i, status: 'disconnected' as const } : i
      ));
    }
  };

  const connectedCount = integrations.filter(i => i.status === 'connected').length;

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
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 text-white flex items-center gap-3"
          >
            <Zap className="w-10 h-10 text-neon-yellow" />
            Integrations
          </motion.h1>
          <p className="text-gray-400">Connect your security platform with your development workflow</p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-6 rounded-2xl mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {connectedCount} Active Integrations
              </h2>
              <p className="text-gray-400">Streamline your security workflow with automated integrations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-blue mb-1">{integrations.filter(i => i.category === 'git').length}</div>
                <div className="text-xs text-gray-400">Git Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-purple mb-1">{integrations.filter(i => i.category === 'communication').length}</div>
                <div className="text-xs text-gray-400">Chat Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green mb-1">{integrations.filter(i => i.category === 'ticketing').length}</div>
                <div className="text-xs text-gray-400">Ticketing</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Integrations Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {integrations.map((integration, idx) => {
            const Icon = integration.icon;
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`glass-strong p-6 rounded-2xl hover:scale-[1.02] transition-all ${
                  integration.status === 'connected' ? 'border-2 border-neon-blue/30' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="glass p-3 rounded-xl">
                      <Icon className="w-8 h-8 text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{integration.name}</h3>
                      <div className={`flex items-center gap-2 text-sm ${getStatusColor(integration.status)}`}>
                        {getStatusIcon(integration.status)}
                        <span className="capitalize">{integration.status}</span>
                      </div>
                    </div>
                  </div>

                  {integration.status === 'connected' && (
                    <button
                      onClick={() => handleDisconnect(integration.id)}
                      className="glass px-3 py-1 rounded text-xs hover:bg-red-500/20 transition-all"
                    >
                      Disconnect
                    </button>
                  )}
                </div>

                <p className="text-gray-400 mb-4">{integration.description}</p>

                {/* Config Info */}
                {integration.status === 'connected' && integration.config && (
                  <div className="glass p-3 rounded-lg mb-4 space-y-1 text-sm">
                    {integration.config.repos !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Repositories:</span>
                        <span className="text-white">{integration.config.repos}</span>
                      </div>
                    )}
                    {integration.config.channels && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Channels:</span>
                        <span className="text-white">{integration.config.channels.length}</span>
                      </div>
                    )}
                    {integration.config.workspace && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Workspace:</span>
                        <span className="text-white">{integration.config.workspace}</span>
                      </div>
                    )}
                    {integration.config.lastSync && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Last sync:</span>
                        <span className="text-white">{new Date(integration.config.lastSync).toLocaleTimeString()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature, i) => (
                      <span key={i} className="glass px-2 py-1 rounded text-xs text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {integration.status === 'disconnected' && (
                    <button
                      onClick={() => handleConnect(integration)}
                      className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple py-2 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
                    >
                      Connect
                    </button>
                  )}
                  {integration.status === 'connected' && (
                    <>
                      <button className="flex-1 glass py-2 rounded-lg hover:glass-strong transition-all flex items-center justify-center gap-2">
                        <Settings className="w-4 h-4" />
                        Configure
                      </button>
                      <button className="flex-1 glass py-2 rounded-lg hover:glass-strong transition-all">
                        View Activity
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Webhook Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-strong p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Webhook className="w-6 h-6 text-neon-purple" />
            Webhook Events
          </h2>
          <p className="text-gray-400 mb-6">Configure webhooks to receive real-time security events at your custom endpoints.</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">Available Events</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-gray-300">alert.created</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-gray-300">alert.resolved</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-300">scan.completed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-300">vulnerability.detected</span>
                </label>
              </div>
            </div>

            <div className="glass p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">Webhook URL</h3>
              <input
                type="url"
                placeholder="https://your-domain.com/webhook"
                className="w-full glass px-4 py-2 rounded-lg text-white placeholder-gray-500 mb-4 outline-none"
              />
              <button className="w-full bg-gradient-to-r from-neon-purple to-neon-pink py-2 rounded-lg font-semibold hover:shadow-neon-purple transition-all">
                Add Webhook
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Connect Modal */}
      {showConfigModal && selectedIntegration && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setShowConfigModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong p-8 rounded-2xl max-w-lg w-full"
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Connect {selectedIntegration.name}
            </h2>

            <p className="text-gray-400 mb-6">{selectedIntegration.description}</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {selectedIntegration.provider === 'github' && 'GitHub Organization'}
                  {selectedIntegration.provider === 'slack' && 'Slack Workspace'}
                  {selectedIntegration.provider === 'jira' && 'Jira Site URL'}
                </label>
                <input
                  type="text"
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none"
                  placeholder={`Enter ${selectedIntegration.name} details`}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIntegrations(integrations.map(i =>
                    i.id === selectedIntegration.id ? { ...i, status: 'connected' as const } : i
                  ));
                  setShowConfigModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
              >
                Connect
              </button>
              <button
                onClick={() => setShowConfigModal(false)}
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
