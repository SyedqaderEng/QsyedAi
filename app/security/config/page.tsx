'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cog, Save } from 'lucide-react';

export default function ConfigPage() {
  const [config, setConfig] = useState({
    autoScan: true,
    notifications: true,
    blockCritical: false,
    aiAssist: true,
    publicReports: false,
  });

  const settings = [
    { key: 'autoScan', label: 'Auto Scan on Push', description: 'Automatically scan code when pushed to repository' },
    { key: 'notifications', label: 'Email Notifications', description: 'Receive email alerts for new vulnerabilities' },
    { key: 'blockCritical', label: 'Block Critical PRs', description: 'Prevent merging PRs with critical vulnerabilities' },
    { key: 'aiAssist', label: 'AI Assistance', description: 'Enable AI-powered fix suggestions' },
    { key: 'publicReports', label: 'Public Reports', description: 'Make security reports publicly accessible' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Cog className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Configuration</h1>
            </div>
            <p className="text-gray-400">Manage your security settings</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Save className="w-4 h-4" />Save Changes</button>
        </motion.div>

        <div className="space-y-4">
          {settings.map((setting, index) => (
            <motion.div key={setting.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">{setting.label}</h3>
                  <p className="text-sm text-gray-400">{setting.description}</p>
                </div>
                <button onClick={() => setConfig({...config, [setting.key]: !config[setting.key as keyof typeof config]})} className={`w-12 h-6 rounded-full transition-colors ${config[setting.key as keyof typeof config] ? 'bg-purple-500' : 'bg-white/20'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${config[setting.key as keyof typeof config] ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
