'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Webhook, Plus, Trash2, CheckCircle, XCircle, RefreshCw, Copy } from 'lucide-react';

export default function WebhooksPage() {
  const [webhooks] = useState([
    { id: '1', name: 'Slack Notifications', url: 'https://hooks.slack.com/services/...', events: ['vulnerability.found', 'scan.complete'], active: true, lastTriggered: '2 hours ago' },
    { id: '2', name: 'Jira Integration', url: 'https://jira.example.com/webhook/...', events: ['vulnerability.found'], active: true, lastTriggered: '1 day ago' },
    { id: '3', name: 'Custom Alert', url: 'https://api.example.com/alerts', events: ['scan.failed'], active: false, lastTriggered: 'Never' },
  ]);

  const [showForm, setShowForm] = useState(false);

  const eventTypes = ['vulnerability.found', 'scan.complete', 'scan.failed', 'report.generated', 'severity.critical'];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Webhook className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Webhooks</h1>
            </div>
            <p className="text-gray-400">Receive real-time notifications via HTTP callbacks</p>
          </div>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Add Webhook
          </button>
        </motion.div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">New Webhook</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input type="text" placeholder="My Webhook" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Endpoint URL</label>
                <input type="url" placeholder="https://example.com/webhook" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Events</label>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((event) => (
                    <label key={event} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">Create Webhook</button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">Cancel</button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {webhooks.map((webhook, index) => (
            <motion.div key={webhook.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{webhook.name}</h3>
                    {webhook.active ? (
                      <span className="flex items-center gap-1 text-green-400 text-sm"><CheckCircle className="w-4 h-4" />Active</span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400 text-sm"><XCircle className="w-4 h-4" />Inactive</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-sm text-gray-400 bg-black/30 px-2 py-1 rounded">{webhook.url}</code>
                    <button className="text-gray-400 hover:text-white"><Copy className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><RefreshCw className="w-4 h-4 text-gray-400" /></button>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-2">
                  {webhook.events.map((event) => (
                    <span key={event} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">{event}</span>
                  ))}
                </div>
                <span className="text-gray-400">Last triggered: {webhook.lastTriggered}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
