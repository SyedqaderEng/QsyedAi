'use client';

import { motion } from 'framer-motion';
import { Github, CheckCircle, Shield, GitPullRequest, AlertTriangle, Settings } from 'lucide-react';

export default function GitHubAppPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <Github className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">GitHub App Integration</h1>
          <p className="text-gray-400">Seamless security scanning for your repositories</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div><h3 className="font-semibold">Connected</h3><p className="text-sm text-gray-400">GitHub App is installed and active</p></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Shield, title: 'Auto Scanning', description: 'Scan on every push' },
            { icon: GitPullRequest, title: 'PR Checks', description: 'Block vulnerable PRs' },
            { icon: AlertTriangle, title: 'Issue Creation', description: 'Auto-create issues' },
          ].map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
              <feature.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl"><Settings className="w-5 h-5" />Configure Settings</button>
        </motion.div>
      </div>
    </div>
  );
}
