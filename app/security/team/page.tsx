'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Trash2 } from 'lucide-react';

export default function TeamPage() {
  const [members] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'owner', avatar: 'J', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', avatar: 'J', status: 'active' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'member', avatar: 'B', status: 'pending' },
  ]);

  const getRoleBadge = (role: string) => {
    if (role === "owner") return "text-yellow-400 bg-yellow-500/20";
    if (role === "admin") return "text-purple-400 bg-purple-500/20";
    return "text-gray-400 bg-gray-500/20";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Team Members</h1>
            </div>
            <p className="text-gray-400">Manage your team</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg">
            <Plus className="w-5 h-5" />Invite
          </button>
        </motion.div>
        <div className="space-y-4">
          {members.map((member, i) => (
            <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">{member.avatar}</div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getRoleBadge(member.role)}`}>{member.role}</span>
                  <button className="p-2 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
