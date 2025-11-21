'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Plus, Settings, Shield, Users, GitBranch } from 'lucide-react';

export default function ProjectsPage() {
  const [projects] = useState([
    { id: '1', name: 'Main Platform', repos: 12, members: 8, issues: 45, lastScan: '2 hours ago' },
    { id: '2', name: 'Mobile Apps', repos: 4, members: 5, issues: 23, lastScan: '1 day ago' },
    { id: '3', name: 'Infrastructure', repos: 8, members: 3, issues: 12, lastScan: '6 hours ago' },
    { id: '4', name: 'Data Services', repos: 6, members: 4, issues: 8, lastScan: '3 hours ago' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <FolderKanban className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Projects</h1>
            </div>
            <p className="text-gray-400">Manage your security projects</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />New Project</button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <button className="p-2 hover:bg-white/10 rounded-lg"><Settings className="w-4 h-4 text-gray-400" /></button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center"><GitBranch className="w-5 h-5 text-purple-400 mx-auto mb-1" /><span className="text-lg font-bold">{project.repos}</span><p className="text-xs text-gray-400">Repos</p></div>
                <div className="text-center"><Users className="w-5 h-5 text-purple-400 mx-auto mb-1" /><span className="text-lg font-bold">{project.members}</span><p className="text-xs text-gray-400">Members</p></div>
                <div className="text-center"><Shield className="w-5 h-5 text-yellow-400 mx-auto mb-1" /><span className="text-lg font-bold">{project.issues}</span><p className="text-xs text-gray-400">Issues</p></div>
              </div>
              <p className="text-sm text-gray-400">Last scan: {project.lastScan}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
