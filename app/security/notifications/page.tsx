'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    email: { critical: true, high: true, medium: false, low: false },
    slack: { critical: true, high: false, medium: false, low: false },
    push: { critical: true, high: true, medium: true, low: false },
  });

  const channels = [
    { id: 'email', name: 'Email', icon: Mail, description: 'Get notified via email' },
    { id: 'slack', name: 'Slack', icon: MessageSquare, description: 'Slack notifications' },
    { id: 'push', name: 'Push', icon: Smartphone, description: 'Browser push notifications' },
  ];

  const severities = ['critical', 'high', 'medium', 'low'];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Notification Settings</h1>
          </div>
          <p className="text-gray-400">Configure how you receive security alerts</p>
        </motion.div>
        <div className="space-y-6">
          {channels.map((channel, index) => (
            <motion.div key={channel.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-xl"><channel.icon className="w-6 h-6 text-purple-400" /></div>
                <div>
                  <h3 className="font-semibold">{channel.name}</h3>
                  <p className="text-sm text-gray-400">{channel.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {severities.map((severity) => {
                  const key = channel.id as keyof typeof settings;
                  const isEnabled = settings[key][severity as keyof typeof settings.email];
                  return (
                    <button key={severity} onClick={() => setSettings({...settings, [channel.id]: {...settings[key], [severity]: !isEnabled}})} className={`p-3 rounded-lg text-sm capitalize transition-colors ${isEnabled ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'bg-white/5 text-gray-400 border border-white/10'}`}>
                      {severity}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
          <button className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold">Save Settings</button>
        </motion.div>
      </div>
    </div>
  );
}
