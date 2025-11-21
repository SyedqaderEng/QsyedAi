'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Download, Search, Filter, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

interface Dependency {
  name: string;
  version: string;
  license: string;
  vulnerabilities: number;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'none';
  lastUpdated: string;
  ecosystem: string;
}

export default function SBOMPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLicense, setFilterLicense] = useState('all');

  const dependencies: Dependency[] = [
    { name: 'react', version: '18.2.0', license: 'MIT', vulnerabilities: 0, severity: 'none', lastUpdated: '2023-06-14', ecosystem: 'npm' },
    { name: 'next', version: '14.0.0', license: 'MIT', vulnerabilities: 0, severity: 'none', lastUpdated: '2023-10-26', ecosystem: 'npm' },
    { name: 'lodash', version: '4.17.20', license: 'MIT', vulnerabilities: 2, severity: 'high', lastUpdated: '2020-08-12', ecosystem: 'npm' },
    { name: 'axios', version: '1.6.0', license: 'MIT', vulnerabilities: 0, severity: 'none', lastUpdated: '2023-11-08', ecosystem: 'npm' },
    { name: 'express', version: '4.18.2', license: 'MIT', vulnerabilities: 1, severity: 'medium', lastUpdated: '2022-10-08', ecosystem: 'npm' },
    { name: 'jsonwebtoken', version: '9.0.0', license: 'MIT', vulnerabilities: 0, severity: 'none', lastUpdated: '2023-02-14', ecosystem: 'npm' },
    { name: 'bcrypt', version: '5.1.0', license: 'MIT', vulnerabilities: 0, severity: 'none', lastUpdated: '2023-05-22', ecosystem: 'npm' },
    { name: 'mongoose', version: '7.5.0', license: 'MIT', vulnerabilities: 1, severity: 'low', lastUpdated: '2023-09-01', ecosystem: 'npm' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-green-400 bg-green-500/20';
    }
  };

  const filteredDeps = dependencies.filter(dep =>
    dep.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterLicense === 'all' || dep.license === filterLicense)
  );

  const stats = {
    total: dependencies.length,
    vulnerable: dependencies.filter(d => d.vulnerabilities > 0).length,
    licenses: [...new Set(dependencies.map(d => d.license))].length,
    outdated: 3,
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
            <h1 className="text-3xl font-bold mb-2">Software Bill of Materials</h1>
            <p className="text-gray-400">Complete inventory of software dependencies</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            Export SBOM
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Dependencies', value: stats.total, icon: Package },
            { label: 'Vulnerable', value: stats.vulnerable, icon: AlertTriangle, color: 'text-orange-400' },
            { label: 'Unique Licenses', value: stats.licenses, icon: CheckCircle },
            { label: 'Outdated', value: stats.outdated, icon: AlertTriangle, color: 'text-yellow-400' },
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
              placeholder="Search dependencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <select
            value={filterLicense}
            onChange={(e) => setFilterLicense(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Licenses</option>
            <option value="MIT">MIT</option>
            <option value="Apache-2.0">Apache-2.0</option>
            <option value="BSD-3">BSD-3</option>
          </select>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="p-4">Package</th>
                <th className="p-4">Version</th>
                <th className="p-4">License</th>
                <th className="p-4">Vulnerabilities</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredDeps.map((dep, index) => (
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
                    <span className="px-2 py-1 bg-white/10 rounded text-sm">{dep.license}</span>
                  </td>
                  <td className="p-4">
                    {dep.vulnerabilities > 0 ? (
                      <span className={`px-2 py-1 rounded text-sm ${getSeverityColor(dep.severity)}`}>
                        {dep.vulnerabilities} {dep.severity}
                      </span>
                    ) : (
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Clean
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-400 text-sm">{dep.lastUpdated}</td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
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
