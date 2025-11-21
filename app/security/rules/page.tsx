'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ListChecks, Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export default function RulesPage() {
  const [rules] = useState([
    { id: '1', name: 'Block critical vulnerabilities', description: 'Prevent merging PRs with critical severity issues', enabled: true, scope: 'All repos' },
    { id: '2', name: 'Require security review', description: 'Mandate security team approval for sensitive changes', enabled: true, scope: 'Production' },
    { id: '3', name: 'Auto-fix dependencies', description: 'Automatically update vulnerable dependencies', enabled: false, scope: 'All repos' },
    { id: '4', name: 'Secret detection block', description: 'Block commits containing secrets', enabled: true, scope: 'All repos' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ListChecks className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Security Rules</h1>
            </div>
            <p className="text-gray-400">Configure automated security policies</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />New Rule</button>
        </motion.div>

        <div className="space-y-4">
          {rules.map((rule, index) => (
            <motion.div key={rule.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{rule.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">{rule.scope}</span>
                  </div>
                  <p className="text-sm text-gray-400">{rule.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-white/10 rounded-lg"><Edit2 className="w-4 h-4 text-gray-400" /></button>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  <button className="p-2">{rule.enabled ? <ToggleRight className="w-8 h-8 text-green-400" /> : <ToggleLeft className="w-8 h-8 text-gray-400" />}</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
