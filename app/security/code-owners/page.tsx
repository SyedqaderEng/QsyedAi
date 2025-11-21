'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FolderTree, User, Mail, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface CodeOwner {
  id: string;
  path: string;
  owners: { name: string; email: string }[];
  repository: string;
  coverage: number;
  vulnerabilities: number;
}

export default function CodeOwnersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const codeOwners: CodeOwner[] = [
    { id: '1', path: '/src/auth/**', owners: [{ name: 'Security Team', email: 'security@example.com' }], repository: 'backend', coverage: 100, vulnerabilities: 2 },
    { id: '2', path: '/src/api/**', owners: [{ name: 'API Team', email: 'api@example.com' }, { name: 'John Doe', email: 'john@example.com' }], repository: 'backend', coverage: 85, vulnerabilities: 5 },
    { id: '3', path: '/src/components/**', owners: [{ name: 'Frontend Team', email: 'frontend@example.com' }], repository: 'frontend', coverage: 92, vulnerabilities: 1 },
    { id: '4', path: '/infrastructure/**', owners: [{ name: 'DevOps', email: 'devops@example.com' }], repository: 'infra', coverage: 100, vulnerabilities: 0 },
    { id: '5', path: '/src/payments/**', owners: [{ name: 'Payments Team', email: 'payments@example.com' }, { name: 'Security Team', email: 'security@example.com' }], repository: 'backend', coverage: 100, vulnerabilities: 3 },
    { id: '6', path: '/tests/**', owners: [{ name: 'QA Team', email: 'qa@example.com' }], repository: 'backend', coverage: 45, vulnerabilities: 0 },
  ];

  const stats = {
    totalPaths: codeOwners.length,
    avgCoverage: Math.round(codeOwners.reduce((sum, co) => sum + co.coverage, 0) / codeOwners.length),
    ownedVulns: codeOwners.reduce((sum, co) => sum + co.vulnerabilities, 0),
    fullCoverage: codeOwners.filter(co => co.coverage === 100).length,
  };

  const filteredOwners = codeOwners.filter(co =>
    co.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    co.owners.some(o => o.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Code Owners</h1>
          <p className="text-gray-400">Track code ownership and security responsibility</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Owned Paths', value: stats.totalPaths, icon: FolderTree },
            { label: 'Avg Coverage', value: `${stats.avgCoverage}%`, icon: Shield },
            { label: 'Vulnerabilities', value: stats.ownedVulns, icon: AlertTriangle, color: 'text-orange-400' },
            { label: 'Full Coverage', value: stats.fullCoverage, icon: CheckCircle, color: 'text-green-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color || 'text-gray-400'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <input
            type="text"
            placeholder="Search paths or owners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </motion.div>

        {/* Code Owners List */}
        <div className="space-y-4">
          {filteredOwners.map((co, index) => (
            <motion.div
              key={co.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <FolderTree className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-lg">{co.path}</h3>
                    <p className="text-sm text-gray-400 mb-3">{co.repository}</p>
                    <div className="flex flex-wrap gap-2">
                      {co.owners.map((owner, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-sm">
                          <User className="w-3 h-3 text-gray-400" />
                          <span>{owner.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-sm text-gray-400">Coverage</p>
                    <p className={`font-semibold ${co.coverage === 100 ? 'text-green-400' : co.coverage > 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {co.coverage}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Vulnerabilities</p>
                    <p className={`font-semibold ${co.vulnerabilities === 0 ? 'text-green-400' : 'text-orange-400'}`}>
                      {co.vulnerabilities}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
