'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Bell, Plus, Trash2, Edit2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface EmailRule {
  id: string;
  name: string;
  recipients: string[];
  triggers: string[];
  severity: ('critical' | 'high' | 'medium' | 'low')[];
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  enabled: boolean;
  lastSent: string | null;
}

export default function EmailAlertsPage() {
  const [rules, setRules] = useState<EmailRule[]>([
    { id: '1', name: 'Critical Vulnerability Alert', recipients: ['security@example.com', 'ciso@example.com'], triggers: ['New vulnerability', 'Severity upgrade'], severity: ['critical'], frequency: 'immediate', enabled: true, lastSent: '2 hours ago' },
    { id: '2', name: 'Daily Security Digest', recipients: ['team@example.com'], triggers: ['Daily summary'], severity: ['critical', 'high', 'medium'], frequency: 'daily', enabled: true, lastSent: '1 day ago' },
    { id: '3', name: 'Weekly Compliance Report', recipients: ['compliance@example.com'], triggers: ['Compliance status change'], severity: ['critical', 'high'], frequency: 'weekly', enabled: true, lastSent: '5 days ago' },
    { id: '4', name: 'Failed Scan Alert', recipients: ['devops@example.com'], triggers: ['Scan failure', 'Integration error'], severity: ['critical', 'high'], frequency: 'immediate', enabled: false, lastSent: null },
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'immediate': return 'text-red-400 bg-red-500/20';
      case 'hourly': return 'text-orange-400 bg-orange-500/20';
      case 'daily': return 'text-yellow-400 bg-yellow-500/20';
      case 'weekly': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Email Alert Rules</h1>
            <p className="text-gray-400">Configure email notifications for security events</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Create Rule
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Rules', value: rules.filter(r => r.enabled).length, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Total Recipients', value: [...new Set(rules.flatMap(r => r.recipients))].length, icon: Mail },
            { label: 'Sent Today', value: 12, icon: Bell, color: 'text-purple-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color || 'text-gray-400'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rules List */}
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className={`bg-white/5 backdrop-blur-xl rounded-xl border p-6 ${
                rule.enabled ? 'border-white/10' : 'border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${rule.enabled ? 'bg-purple-500/20' : 'bg-gray-500/20'}`}>
                    <Mail className={`w-6 h-6 ${rule.enabled ? 'text-purple-400' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{rule.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getFrequencyColor(rule.frequency)}`}>
                        {rule.frequency}
                      </span>
                      {!rule.enabled && (
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400">
                          Disabled
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>Recipients:</span>
                        <span className="text-white">{rule.recipients.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>Triggers:</span>
                        <span className="text-white">{rule.triggers.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Severities:</span>
                        <div className="flex gap-1">
                          {rule.severity.map(s => (
                            <span key={s} className={`px-2 py-0.5 rounded text-xs ${
                              s === 'critical' ? 'bg-red-500/20 text-red-400' :
                              s === 'high' ? 'bg-orange-500/20 text-orange-400' :
                              s === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      {rule.lastSent && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-3 h-3" />
                          Last sent: {rule.lastSent}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Edit2 className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                  <label className="relative inline-flex items-center cursor-pointer ml-2">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => toggleRule(rule.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
