'use client';

import { motion } from 'framer-motion';
import { Lock, Shield, Eye, Server } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    { icon: Lock, title: 'Data Encryption', description: 'All data is encrypted at rest using AES-256 and in transit using TLS 1.3.' },
    { icon: Shield, title: 'Access Control', description: 'Role-based access control ensures only authorized users can access sensitive data.' },
    { icon: Eye, title: 'Data Retention', description: 'You control how long your data is retained. Default retention is 90 days.' },
    { icon: Server, title: 'Data Location', description: 'Your data is stored in secure data centers with SOC 2 Type II certification.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Privacy & Security</h1>
          </div>
          <p className="text-gray-400">How we protect your data</p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl"><section.icon className="w-6 h-6 text-purple-400" /></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                  <p className="text-gray-400">{section.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
