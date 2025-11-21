'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Plus, Hash, Bell, CheckCircle, Settings, Trash2 } from 'lucide-react';

interface SlackChannel {
  id: string;
  name: string;
  workspace: string;
  notifyOn: string[];
  enabled: boolean;
  messagesSent: number;
}

export default function SlackPage() {
  const [channels, setChannels] = useState<SlackChannel[]>([
    { id: '1', name: '#security-alerts', workspace: 'Acme Corp', notifyOn: ['Critical vulnerabilities', 'Failed scans'], enabled: true, messagesSent: 156 },
    { id: '2', name: '#dev-team', workspace: 'Acme Corp', notifyOn: ['New findings', 'PR security status'], enabled: true, messagesSent: 89 },
    { id: '3', name: '#compliance', workspace: 'Acme Corp', notifyOn: ['Compliance changes', 'Policy violations'], enabled: false, messagesSent: 45 },
  ]);

  const toggleChannel = (id: string) => {
    setChannels(channels.map(ch =>
      ch.id === id ? { ...ch, enabled: !ch.enabled } : ch
    ));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#4A154B] rounded-xl">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Slack Integration</h1>
              <p className="text-gray-400">Send security alerts to Slack channels</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4A154B] hover:bg-[#5a1a5f] rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Add Channel
          </button>
        </motion.div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="font-semibold">Connected to Slack</h3>
                <p className="text-sm text-gray-400">Workspace: Acme Corp</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configure
            </button>
          </div>
        </motion.div>

        {/* Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold mb-4">Configured Channels</h2>
          {channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`bg-white/5 backdrop-blur-xl rounded-xl border p-6 ${
                channel.enabled ? 'border-white/10' : 'border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#4A154B]/30 rounded-lg">
                    <Hash className="w-5 h-5 text-[#E01E5A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{channel.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{channel.workspace}</p>
                    <div className="flex flex-wrap gap-2">
                      {channel.notifyOn.map((trigger) => (
                        <span key={trigger} className="px-2 py-1 bg-white/10 rounded text-xs">
                          {trigger}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      <Bell className="w-3 h-3 inline mr-1" />
                      {channel.messagesSent} messages sent
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channel.enabled}
                      onChange={() => toggleChannel(channel.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A154B]"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
