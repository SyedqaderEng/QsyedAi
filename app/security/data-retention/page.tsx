'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Clock, Trash2, Shield, AlertTriangle, Save } from 'lucide-react';

export default function DataRetentionPage() {
  const [settings, setSettings] = useState({
    scanResults: 90,
    auditLogs: 365,
    vulnerabilities: 180,
    reports: 365,
    notifications: 30,
  });

  const retentionOptions = [
    { key: 'scanResults', label: 'Scan Results', description: 'Raw scan data and findings', icon: Database },
    { key: 'auditLogs', label: 'Audit Logs', description: 'User activity and system events', icon: Shield },
    { key: 'vulnerabilities', label: 'Vulnerabilities', description: 'Detected security issues', icon: AlertTriangle },
    { key: 'reports', label: 'Reports', description: 'Generated security reports', icon: Database },
    { key: 'notifications', label: 'Notifications', description: 'Alert and notification history', icon: Clock },
  ];

  const periods = [
    { value: 30, label: '30 days' },
    { value: 90, label: '90 days' },
    { value: 180, label: '6 months' },
    { value: 365, label: '1 year' },
    { value: 730, label: '2 years' },
    { value: -1, label: 'Forever' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Data Retention</h1>
          </div>
          <p className="text-gray-400">Configure how long data is stored</p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-400">Important</h4>
              <p className="text-sm text-gray-400">
                Reducing retention periods will permanently delete data older than the new limit.
                This action cannot be undone.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Retention Settings */}
        <div className="space-y-4">
          {retentionOptions.map((option, index) => (
            <motion.div
              key={option.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <option.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{option.label}</h3>
                    <p className="text-sm text-gray-400">{option.description}</p>
                  </div>
                </div>
                <select
                  value={settings[option.key as keyof typeof settings]}
                  onChange={(e) => setSettings({ ...settings, [option.key]: parseInt(e.target.value) })}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
                >
                  {periods.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Storage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Storage Usage</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Used</span>
                <span>2.4 GB / 10 GB</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '24%' }} />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-lg font-bold">1.2 GB</p>
                <p className="text-xs text-gray-400">Scan Results</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-lg font-bold">800 MB</p>
                <p className="text-xs text-gray-400">Audit Logs</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-lg font-bold">300 MB</p>
                <p className="text-xs text-gray-400">Reports</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-lg font-bold">100 MB</p>
                <p className="text-xs text-gray-400">Other</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-colors">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-semibold transition-colors">
            <Trash2 className="w-5 h-5" />
            Purge Old Data
          </button>
        </motion.div>
      </div>
    </div>
  );
}
