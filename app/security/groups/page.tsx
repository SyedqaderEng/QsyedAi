'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, Plus, Settings, Users, Shield } from 'lucide-react';

export default function GroupsPage() {
  const [groups] = useState([
    { id: '1', name: 'Production Services', description: 'All production applications', repos: 12, members: 8, severity: 'high' },
    { id: '2', name: 'Frontend Apps', description: 'Web and mobile frontends', repos: 6, members: 5, severity: 'medium' },
    { id: '3', name: 'API Services', description: 'Backend API microservices', repos: 15, members: 10, severity: 'high' },
    { id: '4', name: 'Infrastructure', description: 'DevOps and infrastructure', repos: 8, members: 4, severity: 'critical' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Folder className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Groups</h1>
            </div>
            <p className="text-gray-400">Organize repositories into logical groups</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />Create Group</button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group, index) => (
            <motion.div key={group.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{group.name}</h3>
                  <p className="text-sm text-gray-400">{group.description}</p>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg"><Settings className="w-4 h-4 text-gray-400" /></button>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-1 text-gray-400"><Shield className="w-4 h-4" />{group.repos} repos</span>
                <span className="flex items-center gap-1 text-gray-400"><Users className="w-4 h-4" />{group.members} members</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
