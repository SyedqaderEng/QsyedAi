'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, MoreVertical, Shield, Mail } from 'lucide-react';

export default function UsersPage() {
  const [users] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', lastActive: '2 hours ago', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', lastActive: '1 day ago', status: 'active' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', lastActive: '5 days ago', status: 'inactive' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', lastActive: '3 hours ago', status: 'active' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Users</h1>
            </div>
            <p className="text-gray-400">Manage user access and permissions</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg">Invite User</button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-white/10">
              <th className="text-left p-4 text-gray-400 font-medium">User</th>
              <th className="text-left p-4 text-gray-400 font-medium">Role</th>
              <th className="text-left p-4 text-gray-400 font-medium">Status</th>
              <th className="text-left p-4 text-gray-400 font-medium">Last Active</th>
              <th className="p-4"></th>
            </tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold">{user.name[0]}</div>
                      <div><p className="font-medium">{user.name}</p><p className="text-sm text-gray-400">{user.email}</p></div>
                    </div>
                  </td>
                  <td className="p-4"><span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">{user.role}</span></td>
                  <td className="p-4"><span className={`px-2 py-1 rounded text-sm ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{user.status}</span></td>
                  <td className="p-4 text-gray-400">{user.lastActive}</td>
                  <td className="p-4"><button className="p-2 hover:bg-white/10 rounded-lg"><MoreVertical className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
