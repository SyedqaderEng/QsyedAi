'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Globe, Cloud, Shield, AlertTriangle, Search, Filter, Plus } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'server' | 'database' | 'api' | 'cloud' | 'application';
  environment: 'production' | 'staging' | 'development';
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  vulnerabilities: number;
  lastScanned: string;
  status: 'active' | 'inactive';
}

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const assets: Asset[] = [
    { id: '1', name: 'api-gateway-prod', type: 'api', environment: 'production', riskLevel: 'high', vulnerabilities: 12, lastScanned: '2 hours ago', status: 'active' },
    { id: '2', name: 'user-database', type: 'database', environment: 'production', riskLevel: 'critical', vulnerabilities: 5, lastScanned: '1 hour ago', status: 'active' },
    { id: '3', name: 'web-server-01', type: 'server', environment: 'production', riskLevel: 'medium', vulnerabilities: 8, lastScanned: '3 hours ago', status: 'active' },
    { id: '4', name: 'aws-s3-storage', type: 'cloud', environment: 'production', riskLevel: 'low', vulnerabilities: 2, lastScanned: '30 min ago', status: 'active' },
    { id: '5', name: 'staging-api', type: 'api', environment: 'staging', riskLevel: 'medium', vulnerabilities: 15, lastScanned: '1 day ago', status: 'active' },
    { id: '6', name: 'analytics-db', type: 'database', environment: 'production', riskLevel: 'high', vulnerabilities: 7, lastScanned: '4 hours ago', status: 'active' },
    { id: '7', name: 'frontend-app', type: 'application', environment: 'production', riskLevel: 'low', vulnerabilities: 3, lastScanned: '2 hours ago', status: 'active' },
    { id: '8', name: 'dev-server', type: 'server', environment: 'development', riskLevel: 'medium', vulnerabilities: 20, lastScanned: '2 days ago', status: 'inactive' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'server': return Server;
      case 'database': return Database;
      case 'api': return Globe;
      case 'cloud': return Cloud;
      default: return Shield;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || asset.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Assets', value: assets.length, icon: Server },
    { label: 'Critical Risk', value: assets.filter(a => a.riskLevel === 'critical').length, icon: AlertTriangle, color: 'text-red-400' },
    { label: 'High Risk', value: assets.filter(a => a.riskLevel === 'high').length, icon: Shield, color: 'text-orange-400' },
    { label: 'Total Vulnerabilities', value: assets.reduce((sum, a) => sum + a.vulnerabilities, 0), icon: AlertTriangle, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Asset Inventory</h1>
            <p className="text-gray-400">Monitor and manage your infrastructure assets</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Add Asset
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
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
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 appearance-none"
            >
              <option value="all">All Types</option>
              <option value="server">Servers</option>
              <option value="database">Databases</option>
              <option value="api">APIs</option>
              <option value="cloud">Cloud</option>
              <option value="application">Applications</option>
            </select>
          </div>
        </motion.div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset, index) => {
            const Icon = getTypeIcon(asset.type);
            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{asset.name}</h3>
                      <p className="text-sm text-gray-400 capitalize">{asset.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(asset.riskLevel)}`}>
                    {asset.riskLevel}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Environment</span>
                    <span className="capitalize">{asset.environment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vulnerabilities</span>
                    <span className={asset.vulnerabilities > 10 ? 'text-red-400' : 'text-white'}>
                      {asset.vulnerabilities}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Scanned</span>
                    <span>{asset.lastScanned}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
