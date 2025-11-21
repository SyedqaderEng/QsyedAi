'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Shield,
  Lock,
  Bell,
  Clock,
  GitBranch,
  Database,
  Globe,
  AlertTriangle,
  CheckCircle,
  Save,
  RefreshCw,
  Eye,
  Users,
  Key,
  Mail,
} from 'lucide-react';

interface SecuritySettings {
  scanFrequency: 'hourly' | 'daily' | 'weekly' | 'manual';
  autoScanEnabled: boolean;
  autoFixEnabled: boolean;
  autoFixThreshold: 'critical' | 'high' | 'medium' | 'low';
  requireApproval: boolean;
  notifyOnCritical: boolean;
  notifyOnHigh: boolean;
  notifyOnMedium: boolean;
  slackWebhook: string;
  emailRecipients: string[];
  enforceMfa: boolean;
  sessionTimeout: number;
  ipWhitelist: string[];
  allowPublicRepos: boolean;
  retentionDays: number;
}

export default function SecuritySettingsPage() {
  const [activeTab, setActiveTab] = useState<'scanning' | 'notifications' | 'access' | 'data'>('scanning');
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState<SecuritySettings>({
    scanFrequency: 'daily',
    autoScanEnabled: true,
    autoFixEnabled: true,
    autoFixThreshold: 'high',
    requireApproval: true,
    notifyOnCritical: true,
    notifyOnHigh: true,
    notifyOnMedium: false,
    slackWebhook: '',
    emailRecipients: ['security@company.com', 'devops@company.com'],
    enforceMfa: true,
    sessionTimeout: 480,
    ipWhitelist: [],
    allowPublicRepos: false,
    retentionDays: 365,
  });

  const updateSetting = <K extends keyof SecuritySettings>(key: K, value: SecuritySettings[K]) => {
    setSettings({ ...settings, [key]: value });
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                <Settings className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Security Settings</h1>
                <p className="text-gray-400 mt-1">Configure security scanning and notification preferences</p>
              </div>
            </div>
            <div className="flex gap-3">
              {hasChanges && (
                <span className="flex items-center gap-2 text-yellow-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  Unsaved changes
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10">
          {[
            { id: 'scanning', label: 'Scanning', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'access', label: 'Access Control', icon: Lock },
            { id: 'data', label: 'Data & Privacy', icon: Database },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Scanning Settings */}
        {activeTab === 'scanning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-400" />
                Scan Schedule
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-300 font-medium mb-2 block">Scan Frequency</label>
                  <select
                    value={settings.scanFrequency}
                    onChange={(e) => updateSetting('scanFrequency', e.target.value as SecuritySettings['scanFrequency'])}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="manual">Manual Only</option>
                  </select>
                </div>
                <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer">
                  <div>
                    <div className="text-white font-medium">Auto-scan on Push</div>
                    <div className="text-gray-400 text-sm">Automatically trigger scans when code is pushed</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoScanEnabled}
                    onChange={(e) => updateSetting('autoScanEnabled', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-green-400" />
                Auto-Fix Settings
              </h2>
              <div className="space-y-6">
                <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer">
                  <div>
                    <div className="text-white font-medium">Enable Auto-Fix</div>
                    <div className="text-gray-400 text-sm">Automatically create pull requests to fix vulnerabilities</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoFixEnabled}
                    onChange={(e) => updateSetting('autoFixEnabled', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500"
                  />
                </label>
                <div>
                  <label className="text-gray-300 font-medium mb-2 block">Auto-Fix Threshold</label>
                  <select
                    value={settings.autoFixThreshold}
                    onChange={(e) => updateSetting('autoFixThreshold', e.target.value as SecuritySettings['autoFixThreshold'])}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    disabled={!settings.autoFixEnabled}
                  >
                    <option value="critical">Critical Only</option>
                    <option value="high">High and above</option>
                    <option value="medium">Medium and above</option>
                    <option value="low">All severities</option>
                  </select>
                </div>
                <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer">
                  <div>
                    <div className="text-white font-medium">Require Manual Approval</div>
                    <div className="text-gray-400 text-sm">Require team approval before merging auto-fix PRs</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.requireApproval}
                    onChange={(e) => updateSetting('requireApproval', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500"
                    disabled={!settings.autoFixEnabled}
                  />
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Bell className="w-6 h-6 text-yellow-400" />
                Alert Preferences
              </h2>
              <div className="space-y-4">
                {[
                  { key: 'notifyOnCritical', label: 'Critical Vulnerabilities', color: 'red' },
                  { key: 'notifyOnHigh', label: 'High Vulnerabilities', color: 'orange' },
                  { key: 'notifyOnMedium', label: 'Medium Vulnerabilities', color: 'yellow' },
                ].map(({ key, label, color }) => (
                  <label key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${color}-400`} />
                      <span className="text-white font-medium">{label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings[key as keyof SecuritySettings] as boolean}
                      onChange={(e) => updateSetting(key as keyof SecuritySettings, e.target.checked)}
                      className="w-5 h-5 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6 text-purple-400" />
                Email Recipients
              </h2>
              <div className="space-y-4">
                {settings.emailRecipients.map((email, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                    <button className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all">
                      Remove
                    </button>
                  </div>
                ))}
                <button className="w-full px-4 py-3 border border-dashed border-white/20 text-gray-400 rounded-lg hover:border-blue-500/50 hover:text-blue-400 transition-all">
                  + Add Email Recipient
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Access Control Settings */}
        {activeTab === 'access' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Key className="w-6 h-6 text-green-400" />
                Authentication
              </h2>
              <div className="space-y-6">
                <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer">
                  <div>
                    <div className="text-white font-medium">Enforce Multi-Factor Authentication</div>
                    <div className="text-gray-400 text-sm">Require MFA for all team members</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enforceMfa}
                    onChange={(e) => updateSetting('enforceMfa', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500"
                  />
                </label>
                <div>
                  <label className="text-gray-300 font-medium mb-2 block">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-400" />
                Repository Access
              </h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer">
                  <div>
                    <div className="text-white font-medium">Allow Public Repositories</div>
                    <div className="text-gray-400 text-sm">Scan public repositories in addition to private ones</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.allowPublicRepos}
                    onChange={(e) => updateSetting('allowPublicRepos', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Data & Privacy Settings */}
        {activeTab === 'data' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-purple-400" />
                Data Retention
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-300 font-medium mb-2 block">Scan Data Retention (days)</label>
                  <input
                    type="number"
                    value={settings.retentionDays}
                    onChange={(e) => updateSetting('retentionDays', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Scan results and vulnerability data will be automatically deleted after this period.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 border-red-500/20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                Danger Zone
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Delete All Scan Data</div>
                    <div className="text-gray-400 text-sm">Permanently delete all vulnerability and scan data</div>
                  </div>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all">
                    Delete Data
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Reset All Settings</div>
                    <div className="text-gray-400 text-sm">Reset all security settings to their defaults</div>
                  </div>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all">
                    Reset Settings
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
