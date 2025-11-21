'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Webhook,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Activity,
  Send,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Code,
} from 'lucide-react';

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  status: 'active' | 'inactive' | 'failed';
  createdAt: string;
  lastTriggered?: string;
  successCount: number;
  failureCount: number;
  retryCount: number;
}

interface WebhookDelivery {
  id: string;
  webhookId: string;
  event: string;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  responseCode?: number;
  duration?: number;
  payload: string;
}

export default function WebhooksPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<string | null>(null);
  const [revealedSecrets, setRevealedSecrets] = useState<Set<string>>(new Set());

  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: '1',
      name: 'CI/CD Pipeline Trigger',
      url: 'https://ci.company.com/api/webhooks/security',
      secret: 'whsec_example_secret_key_1234567890abcdef',
      events: ['vulnerability.detected', 'scan.completed'],
      status: 'active',
      createdAt: '2024-01-10T00:00:00Z',
      lastTriggered: '2024-01-15T14:30:00Z',
      successCount: 1234,
      failureCount: 12,
      retryCount: 3,
    },
    {
      id: '2',
      name: 'Slack Notifications',
      url: 'https://hooks.slack.com/services/EXAMPLE/WEBHOOK/URL123',
      secret: 'whsec_example_slack_secret_abcdefghijklmnop',
      events: ['vulnerability.critical', 'alert.created'],
      status: 'active',
      createdAt: '2024-01-05T00:00:00Z',
      lastTriggered: '2024-01-15T14:25:00Z',
      successCount: 567,
      failureCount: 5,
      retryCount: 1,
    },
    {
      id: '3',
      name: 'Jira Integration',
      url: 'https://company.atlassian.net/rest/webhooks/security',
      secret: 'whsec_example_jira_secret_qrstuvwxyz123456',
      events: ['vulnerability.detected', 'autofix.completed'],
      status: 'failed',
      createdAt: '2024-01-01T00:00:00Z',
      lastTriggered: '2024-01-14T12:00:00Z',
      successCount: 89,
      failureCount: 23,
      retryCount: 10,
    },
    {
      id: '4',
      name: 'Internal Analytics',
      url: 'https://analytics.company.com/api/security-events',
      secret: 'whsec_example_analytics_secret_789xyz456abc',
      events: ['scan.completed', 'report.generated'],
      status: 'inactive',
      createdAt: '2023-12-15T00:00:00Z',
      successCount: 345,
      failureCount: 2,
      retryCount: 0,
    },
  ]);

  const [deliveries] = useState<WebhookDelivery[]>([
    {
      id: '1',
      webhookId: '1',
      event: 'vulnerability.detected',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'success',
      responseCode: 200,
      duration: 245,
      payload: '{"event":"vulnerability.detected","severity":"critical"...}',
    },
    {
      id: '2',
      webhookId: '2',
      event: 'alert.created',
      timestamp: '2024-01-15T14:25:00Z',
      status: 'success',
      responseCode: 200,
      duration: 189,
      payload: '{"event":"alert.created","alert_id":"ALT-001"...}',
    },
    {
      id: '3',
      webhookId: '3',
      event: 'vulnerability.detected',
      timestamp: '2024-01-14T12:00:00Z',
      status: 'failed',
      responseCode: 500,
      duration: 30000,
      payload: '{"event":"vulnerability.detected","error":"timeout"...}',
    },
  ]);

  const availableEvents = [
    { id: 'vulnerability.detected', name: 'Vulnerability Detected', description: 'When a new vulnerability is found' },
    { id: 'vulnerability.critical', name: 'Critical Vulnerability', description: 'When a critical severity vulnerability is found' },
    { id: 'vulnerability.resolved', name: 'Vulnerability Resolved', description: 'When a vulnerability is marked as resolved' },
    { id: 'scan.started', name: 'Scan Started', description: 'When a security scan begins' },
    { id: 'scan.completed', name: 'Scan Completed', description: 'When a security scan finishes' },
    { id: 'alert.created', name: 'Alert Created', description: 'When a new security alert is created' },
    { id: 'autofix.completed', name: 'Auto-fix Completed', description: 'When an auto-fix PR is created' },
    { id: 'report.generated', name: 'Report Generated', description: 'When a compliance report is generated' },
  ];

  const toggleSecretVisibility = (id: string) => {
    const newSet = new Set(revealedSecrets);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRevealedSecrets(newSet);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-500/10';
      case 'inactive':
        return 'text-gray-400 bg-gray-500/10';
      case 'failed':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getDeliveryStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const maskSecret = (secret: string) => {
    return `${secret.substring(0, 10)}${'•'.repeat(20)}`;
  };

  const handleToggleStatus = (id: string) => {
    setWebhooks(webhooks.map(w => {
      if (w.id === id) {
        return {
          ...w,
          status: w.status === 'active' ? 'inactive' as const : 'active' as const
        };
      }
      return w;
    }));
  };

  const handleDelete = (id: string) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
  };

  const activeWebhooks = webhooks.filter(w => w.status === 'active').length;
  const totalDeliveries = webhooks.reduce((acc, w) => acc + w.successCount + w.failureCount, 0);
  const failureRate = webhooks.reduce((acc, w) => acc + w.failureCount, 0) / totalDeliveries * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30">
                <Webhook className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Webhooks</h1>
                <p className="text-gray-400 mt-1">
                  Configure webhook endpoints for real-time notifications
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create Webhook</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Webhook className="w-4 h-4" />
                <span>Total Webhooks</span>
              </div>
              <div className="text-2xl font-bold text-white">{webhooks.length}</div>
            </div>
            <div className="glass-panel p-4 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Active</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{activeWebhooks}</div>
            </div>
            <div className="glass-panel p-4 border-blue-500/20">
              <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                <Send className="w-4 h-4" />
                <span>Total Deliveries</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{totalDeliveries.toLocaleString()}</div>
            </div>
            <div className="glass-panel p-4 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Failure Rate</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{failureRate.toFixed(1)}%</div>
            </div>
          </div>
        </motion.div>

        {/* Webhooks List */}
        <div className="space-y-4">
          {webhooks.map((webhook, index) => (
            <motion.div
              key={webhook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-panel p-6 ${webhook.status === 'failed' ? 'border-red-500/30' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold text-lg">{webhook.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(webhook.status)}`}>
                      {webhook.status.toUpperCase()}
                    </span>
                  </div>

                  {/* URL and Secret */}
                  <div className="glass-panel p-4 mb-4 bg-black/30 space-y-3">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Endpoint URL</div>
                      <code className="text-blue-400 text-sm">{webhook.url}</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="text-gray-400 text-xs mb-1">Signing Secret</div>
                        <code className="text-gray-300 text-sm">
                          {revealedSecrets.has(webhook.id) ? webhook.secret : maskSecret(webhook.secret)}
                        </code>
                      </div>
                      <button
                        onClick={() => toggleSecretVisibility(webhook.id)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                      >
                        {revealedSecrets.has(webhook.id) ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <Copy className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Events */}
                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-2">Subscribed Events:</div>
                    <div className="flex flex-wrap gap-2">
                      {webhook.events.map((event) => (
                        <span
                          key={event}
                          className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Created</div>
                      <div className="text-white">{new Date(webhook.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Last Triggered</div>
                      <div className="text-white">
                        {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : 'Never'}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Success</div>
                      <div className="text-green-400">{webhook.successCount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Failures</div>
                      <div className="text-red-400">{webhook.failureCount}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Retries</div>
                      <div className="text-yellow-400">{webhook.retryCount}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(webhook.id)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      webhook.status === 'active'
                        ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400'
                        : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                    }`}
                  >
                    {webhook.status === 'active' ? 'Disable' : 'Enable'}
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                    <RefreshCw className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(webhook.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              {webhook.status === 'failed' && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>This webhook has failed multiple times. Please check the endpoint URL and configuration.</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Recent Deliveries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-blue-400" />
            Recent Deliveries
          </h2>
          <div className="space-y-4">
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="glass-panel p-4 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {getDeliveryStatusIcon(delivery.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white font-medium">{delivery.event}</span>
                      {delivery.responseCode && (
                        <code className={`text-xs ${delivery.responseCode === 200 ? 'text-green-400' : 'text-red-400'}`}>
                          HTTP {delivery.responseCode}
                        </code>
                      )}
                      {delivery.duration && (
                        <span className="text-gray-400 text-xs">{delivery.duration}ms</span>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {new Date(delivery.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 text-sm transition-all">
                  <Code className="w-4 h-4" />
                  View Payload
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available Events Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-6 border-blue-500/20"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <Code className="w-6 h-6 text-blue-400" />
            Available Events
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {availableEvents.map((event) => (
              <div key={event.id} className="glass-panel p-3">
                <code className="text-purple-400 text-sm font-medium">{event.id}</code>
                <div className="text-gray-400 text-xs mt-1">{event.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
