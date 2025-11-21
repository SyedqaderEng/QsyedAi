'use client';

import { motion } from 'framer-motion';
import { History, Tag, Star, Bug, Zap } from 'lucide-react';

export default function ChangelogPage() {
  const releases = [
    { version: '2.5.0', date: 'Jan 20, 2024', type: 'feature', title: 'AI-Powered Fix Suggestions', description: 'Automatically generate code fixes for vulnerabilities using AI.' },
    { version: '2.4.2', date: 'Jan 15, 2024', type: 'fix', title: 'Bug Fix Release', description: 'Fixed scanning timeout issues and improved performance.' },
    { version: '2.4.0', date: 'Jan 10, 2024', type: 'feature', title: 'Kubernetes Security Scanning', description: 'Added support for scanning Kubernetes manifests and configurations.' },
    { version: '2.3.1', date: 'Jan 5, 2024', type: 'improvement', title: 'Dashboard Improvements', description: 'Enhanced dashboard with new widgets and better performance.' },
  ];

  const getTypeIcon = (type: string) => {
    if (type === 'feature') return Star;
    if (type === 'fix') return Bug;
    return Zap;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <History className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Changelog</h1>
          </div>
          <p className="text-gray-400">Latest updates and releases</p>
        </motion.div>

        <div className="space-y-6">
          {releases.map((release, index) => {
            const Icon = getTypeIcon(release.type);
            return (
              <motion.div key={release.version} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm"><Tag className="w-3 h-3" />{release.version}</span>
                  <span className="text-sm text-gray-400">{release.date}</span>
                  <Icon className="w-4 h-4 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{release.title}</h3>
                <p className="text-gray-400">{release.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
