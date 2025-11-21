'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, GitBranch, AlertTriangle, RefreshCw, Search, Filter, ArrowRight } from 'lucide-react';

interface Dependency {
  name: string;
  version: string;
  latest: string;
  outdated: boolean;
  vulnerabilities: number;
  directDeps: number;
  transitiveDeps: number;
  ecosystem: string;
}

export default function DependenciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOutdated, setShowOutdated] = useState(false);

  const dependencies: Dependency[] = [
    { name: 'react', version: '18.2.0', latest: '18.2.0', outdated: false, vulnerabilities: 0, directDeps: 2, transitiveDeps: 5, ecosystem: 'npm' },
    { name: 'next', version: '14.0.0', latest: '14.0.4', outdated: true, vulnerabilities: 0, directDeps: 25, transitiveDeps: 120, ecosystem: 'npm' },
    { name: 'lodash', version: '4.17.20', latest: '4.17.21', outdated: true, vulnerabilities: 2, directDeps: 0, transitiveDeps: 0, ecosystem: 'npm' },
    { name: 'axios', version: '1.6.0', latest: '1.6.2', outdated: true, vulnerabilities: 0, directDeps: 4, transitiveDeps: 8, ecosystem: 'npm' },
    { name: 'express', version: '4.18.2', latest: '4.18.2', outdated: false, vulnerabilities: 1, directDeps: 30, transitiveDeps: 45, ecosystem: 'npm' },
    { name: 'mongoose', version: '7.5.0', latest: '8.0.0', outdated: true, vulnerabilities: 0, directDeps: 10, transitiveDeps: 25, ecosystem: 'npm' },
    { name: 'jsonwebtoken', version: '9.0.0', latest: '9.0.2', outdated: true, vulnerabilities: 0, directDeps: 4, transitiveDeps: 12, ecosystem: 'npm' },
    { name: 'bcrypt', version: '5.1.0', latest: '5.1.1', outdated: true, vulnerabilities: 0, directDeps: 2, transitiveDeps: 5, ecosystem: 'npm' },
  ];

  const filteredDeps = dependencies.filter(dep => {
    const matchesSearch = dep.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOutdated = !showOutdated || dep.outdated;
    return matchesSearch && matchesOutdated;
  });

  const stats = {
    total: dependencies.length,
    outdated: dependencies.filter(d => d.outdated).length,
    vulnerable: dependencies.filter(d => d.vulnerabilities > 0).length,
    totalTransitive: dependencies.reduce((sum, d) => sum + d.transitiveDeps, 0),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Dependency Graph</h1>
            <p className="text-gray-400">Analyze and manage your project dependencies</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5" />
            Update All
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Packages', value: stats.total, icon: Package },
            { label: 'Outdated', value: stats.outdated, icon: RefreshCw, color: 'text-yellow-400' },
            { label: 'Vulnerable', value: stats.vulnerable, icon: AlertTriangle, color: 'text-red-400' },
            { label: 'Transitive Deps', value: stats.totalTransitive, icon: GitBranch },
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={() => setShowOutdated(!showOutdated)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showOutdated ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-400'
            }`}
          >
            <Filter className="w-4 h-4" />
            Show Outdated Only
          </button>
        </motion.div>

        {/* Dependencies Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="p-4">Package</th>
                <th className="p-4">Current</th>
                <th className="p-4">Latest</th>
                <th className="p-4">Vulnerabilities</th>
                <th className="p-4">Dependencies</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredDeps.map((dep) => (
                <tr key={dep.name} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="font-medium">{dep.name}</p>
                        <p className="text-xs text-gray-500">{dep.ecosystem}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm">{dep.version}</td>
                  <td className="p-4">
                    <span className={`font-mono text-sm ${dep.outdated ? 'text-yellow-400' : 'text-green-400'}`}>
                      {dep.latest}
                    </span>
                  </td>
                  <td className="p-4">
                    {dep.vulnerabilities > 0 ? (
                      <span className="flex items-center gap-1 text-red-400">
                        <AlertTriangle className="w-4 h-4" />
                        {dep.vulnerabilities}
                      </span>
                    ) : (
                      <span className="text-green-400">None</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {dep.directDeps} direct / {dep.transitiveDeps} transitive
                  </td>
                  <td className="p-4">
                    {dep.outdated && (
                      <button className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg text-sm transition-colors">
                        Update
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
