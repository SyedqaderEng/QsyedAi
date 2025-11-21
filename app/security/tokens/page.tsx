'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Plus, Trash2, Copy, Eye, EyeOff, Clock } from 'lucide-react';

export default function TokensPage() {
  const [tokens] = useState([
    { id: '1', name: 'GitHub Integration', token: 'ghp_xxxx...xxxx', scope: 'repo, workflow', expires: '2024-12-31', lastUsed: '2 hours ago' },
    { id: '2', name: 'GitLab CI', token: 'glpat-xxxx...xxxx', scope: 'read_api', expires: 'Never', lastUsed: '1 day ago' },
    { id: '3', name: 'Docker Registry', token: 'dckr_xxxx...xxxx', scope: 'push, pull', expires: '2024-06-30', lastUsed: '5 days ago' },
  ]);
  const [showToken, setShowToken] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Coins className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Access Tokens</h1>
            </div>
            <p className="text-gray-400">Manage integration tokens</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />New Token</button>
        </motion.div>

        <div className="space-y-4">
          {tokens.map((token, index) => (
            <motion.div key={token.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{token.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-sm text-gray-400 bg-black/30 px-3 py-1 rounded font-mono">{showToken === token.id ? 'full_token_here_12345' : token.token}</code>
                    <button onClick={() => setShowToken(showToken === token.id ? null : token.id)} className="text-gray-400 hover:text-white">{showToken === token.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                    <button className="text-gray-400 hover:text-white"><Copy className="w-4 h-4" /></button>
                  </div>
                </div>
                <button className="p-2 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>Scope: {token.scope}</span>
                <span>Expires: {token.expires}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />Last used: {token.lastUsed}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
