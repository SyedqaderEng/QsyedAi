'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Plus, Trash2, Eye, EyeOff, Copy, Clock } from 'lucide-react';

export default function APIKeysPage() {
  const [keys] = useState([
    { id: '1', name: 'Production API Key', key: 'sk_live_xxxx...xxxx', created: '2024-01-01', lastUsed: '2 hours ago', scopes: ['read', 'write'] },
    { id: '2', name: 'CI/CD Integration', key: 'sk_live_yyyy...yyyy', created: '2024-01-10', lastUsed: '1 day ago', scopes: ['read'] },
    { id: '3', name: 'Development', key: 'sk_test_zzzz...zzzz', created: '2024-01-15', lastUsed: 'Never', scopes: ['read', 'write', 'admin'] },
  ]);

  const [showKey, setShowKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Key className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">API Keys</h1>
            </div>
            <p className="text-gray-400">Manage API keys for programmatic access</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Create Key
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-8">
          <p className="text-yellow-400 text-sm">API keys grant access to your account. Keep them secure and never share them publicly.</p>
        </motion.div>

        <div className="space-y-4">
          {keys.map((apiKey, index) => (
            <motion.div key={apiKey.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{apiKey.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-sm text-gray-400 bg-black/30 px-3 py-1 rounded font-mono">
                      {showKey === apiKey.id ? 'sk_live_1234567890abcdef' : apiKey.key}
                    </code>
                    <button onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)} className="text-gray-400 hover:text-white">
                      {showKey === apiKey.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="text-gray-400 hover:text-white"><Copy className="w-4 h-4" /></button>
                  </div>
                </div>
                <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-2">
                  {apiKey.scopes.map((scope) => (
                    <span key={scope} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">{scope}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <span>Created: {apiKey.created}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />Last used: {apiKey.lastUsed}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
