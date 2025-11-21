'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertTriangle, CheckCircle, XCircle, Search, Download, Filter } from 'lucide-react';

interface LicenseInfo {
  name: string;
  spdxId: string;
  type: 'permissive' | 'copyleft' | 'proprietary' | 'unknown';
  packages: number;
  compliant: boolean;
  risk: 'low' | 'medium' | 'high';
}

export default function LicensesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const licenses: LicenseInfo[] = [
    { name: 'MIT License', spdxId: 'MIT', type: 'permissive', packages: 145, compliant: true, risk: 'low' },
    { name: 'Apache License 2.0', spdxId: 'Apache-2.0', type: 'permissive', packages: 67, compliant: true, risk: 'low' },
    { name: 'BSD 3-Clause', spdxId: 'BSD-3-Clause', type: 'permissive', packages: 34, compliant: true, risk: 'low' },
    { name: 'GNU GPLv3', spdxId: 'GPL-3.0', type: 'copyleft', packages: 12, compliant: false, risk: 'high' },
    { name: 'GNU LGPLv3', spdxId: 'LGPL-3.0', type: 'copyleft', packages: 8, compliant: true, risk: 'medium' },
    { name: 'ISC License', spdxId: 'ISC', type: 'permissive', packages: 23, compliant: true, risk: 'low' },
    { name: 'Unknown', spdxId: 'UNKNOWN', type: 'unknown', packages: 5, compliant: false, risk: 'high' },
    { name: 'Proprietary', spdxId: 'PROPRIETARY', type: 'proprietary', packages: 3, compliant: false, risk: 'high' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'permissive': return 'text-green-400 bg-green-500/20';
      case 'copyleft': return 'text-yellow-400 bg-yellow-500/20';
      case 'proprietary': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredLicenses = licenses.filter(license =>
    license.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || license.type === filterType)
  );

  const stats = {
    total: licenses.reduce((sum, l) => sum + l.packages, 0),
    compliant: licenses.filter(l => l.compliant).reduce((sum, l) => sum + l.packages, 0),
    nonCompliant: licenses.filter(l => !l.compliant).reduce((sum, l) => sum + l.packages, 0),
    unknown: licenses.filter(l => l.type === 'unknown').reduce((sum, l) => sum + l.packages, 0),
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
            <h1 className="text-3xl font-bold mb-2">License Compliance</h1>
            <p className="text-gray-400">Monitor and manage open source license compliance</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Packages', value: stats.total, icon: Scale },
            { label: 'Compliant', value: stats.compliant, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Non-Compliant', value: stats.nonCompliant, icon: XCircle, color: 'text-red-400' },
            { label: 'Unknown', value: stats.unknown, icon: AlertTriangle, color: 'text-yellow-400' },
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

        {/* Compliance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4">Compliance Overview</h3>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
            <div className="bg-green-500 h-full" style={{ width: `${(stats.compliant / stats.total) * 100}%` }} />
            <div className="bg-red-500 h-full" style={{ width: `${(stats.nonCompliant / stats.total) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-green-400">{Math.round((stats.compliant / stats.total) * 100)}% Compliant</span>
            <span className="text-red-400">{Math.round((stats.nonCompliant / stats.total) * 100)}% Non-Compliant</span>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search licenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Types</option>
            <option value="permissive">Permissive</option>
            <option value="copyleft">Copyleft</option>
            <option value="proprietary">Proprietary</option>
            <option value="unknown">Unknown</option>
          </select>
        </motion.div>

        {/* Licenses Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="p-4">License</th>
                <th className="p-4">SPDX ID</th>
                <th className="p-4">Type</th>
                <th className="p-4">Packages</th>
                <th className="p-4">Status</th>
                <th className="p-4">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredLicenses.map((license, index) => (
                <tr key={license.spdxId} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">{license.name}</td>
                  <td className="p-4 font-mono text-sm text-gray-400">{license.spdxId}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(license.type)}`}>
                      {license.type}
                    </span>
                  </td>
                  <td className="p-4">{license.packages}</td>
                  <td className="p-4">
                    {license.compliant ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <CheckCircle className="w-4 h-4" /> Compliant
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400">
                        <XCircle className="w-4 h-4" /> Non-Compliant
                      </span>
                    )}
                  </td>
                  <td className={`p-4 font-medium ${getRiskColor(license.risk)}`}>
                    {license.risk.toUpperCase()}
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
