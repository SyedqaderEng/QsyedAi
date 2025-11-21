'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Server, Database, AlertTriangle, Plus, RefreshCw, CheckCircle } from 'lucide-react';

interface DiscoveredAsset {
  id: string;
  name: string;
  type: 'domain' | 'subdomain' | 'ip' | 'service' | 'database';
  status: 'new' | 'verified' | 'ignored';
  risk: 'high' | 'medium' | 'low' | 'unknown';
  discoveredAt: string;
  source: string;
}

export default function DiscoverPage() {
  const [scanning, setScanning] = useState(false);

  const assets: DiscoveredAsset[] = [
    { id: '1', name: 'api.staging.example.com', type: 'subdomain', status: 'new', risk: 'medium', discoveredAt: '2 hours ago', source: 'DNS enumeration' },
    { id: '2', name: 'dev.example.com', type: 'subdomain', status: 'new', risk: 'high', discoveredAt: '2 hours ago', source: 'Certificate transparency' },
    { id: '3', name: '52.14.234.56', type: 'ip', status: 'verified', risk: 'low', discoveredAt: '1 day ago', source: 'Network scan' },
    { id: '4', name: 'jenkins.internal.example.com', type: 'service', status: 'new', risk: 'high', discoveredAt: '3 hours ago', source: 'Port scan' },
    { id: '5', name: 'old-api.example.com', type: 'subdomain', status: 'ignored', risk: 'medium', discoveredAt: '5 days ago', source: 'DNS enumeration' },
    { id: '6', name: 'db-replica.example.com', type: 'database', status: 'verified', risk: 'low', discoveredAt: '2 days ago', source: 'Asset correlation' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-yellow-400 bg-yellow-500/20';
      case 'verified': return 'text-green-400 bg-green-500/20';
      case 'ignored': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'domain':
      case 'subdomain': return Globe;
      case 'ip': return Server;
      case 'service': return Server;
      case 'database': return Database;
      default: return Globe;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Asset Discovery</h1>
            </div>
            <p className="text-gray-400">Automatically discover your external attack surface</p>
          </div>
          <button
            onClick={() => setScanning(true)}
            disabled={scanning}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${scanning ? 'animate-spin' : ''}`} />
            {scanning ? 'Scanning...' : 'Run Discovery'}
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Discovered', value: assets.length, icon: Globe },
            { label: 'New Assets', value: assets.filter(a => a.status === 'new').length, icon: Plus, color: 'text-yellow-400' },
            { label: 'High Risk', value: assets.filter(a => a.risk === 'high').length, icon: AlertTriangle, color: 'text-red-400' },
            { label: 'Verified', value: assets.filter(a => a.status === 'verified').length, icon: CheckCircle, color: 'text-green-400' },
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

        {/* Assets List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold">Discovered Assets</h3>
          </div>
          <div className="divide-y divide-white/5">
            {assets.map((asset, index) => {
              const Icon = getTypeIcon(asset.type);
              return (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{asset.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="capitalize">{asset.type}</span>
                          <span>·</span>
                          <span>{asset.source}</span>
                          <span>·</span>
                          <span>{asset.discoveredAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-medium ${getRiskColor(asset.risk)}`}>
                        {asset.risk} risk
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
