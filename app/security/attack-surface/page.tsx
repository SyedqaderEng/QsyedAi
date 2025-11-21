'use client';

import { motion } from 'framer-motion';
import { Globe, Server, Database, Cloud, Shield, AlertTriangle, ExternalLink, Eye } from 'lucide-react';

interface ExposedAsset {
  id: string;
  name: string;
  type: 'domain' | 'ip' | 'api' | 'service';
  exposure: 'public' | 'private' | 'internal';
  risk: 'critical' | 'high' | 'medium' | 'low';
  ports: number[];
  lastSeen: string;
  services: string[];
}

export default function AttackSurfacePage() {
  const assets: ExposedAsset[] = [
    { id: '1', name: 'api.example.com', type: 'domain', exposure: 'public', risk: 'high', ports: [443, 8080], lastSeen: '5 min ago', services: ['nginx', 'node'] },
    { id: '2', name: 'app.example.com', type: 'domain', exposure: 'public', risk: 'medium', ports: [443], lastSeen: '5 min ago', services: ['nginx', 'react'] },
    { id: '3', name: '52.10.123.45', type: 'ip', exposure: 'public', risk: 'critical', ports: [22, 80, 443, 3306], lastSeen: '1 hour ago', services: ['ssh', 'apache', 'mysql'] },
    { id: '4', name: 'staging-db.internal', type: 'service', exposure: 'internal', risk: 'low', ports: [5432], lastSeen: '2 hours ago', services: ['postgresql'] },
    { id: '5', name: 'auth-service.cluster', type: 'api', exposure: 'private', risk: 'medium', ports: [3000], lastSeen: '10 min ago', services: ['express'] },
    { id: '6', name: 'cdn.example.com', type: 'domain', exposure: 'public', risk: 'low', ports: [443], lastSeen: '5 min ago', services: ['cloudflare'] },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'domain': return Globe;
      case 'ip': return Server;
      case 'api': return Cloud;
      case 'service': return Database;
      default: return Shield;
    }
  };

  const stats = [
    { label: 'Total Assets', value: assets.length, icon: Shield },
    { label: 'Public Exposure', value: assets.filter(a => a.exposure === 'public').length, icon: Globe, color: 'text-blue-400' },
    { label: 'Critical Risk', value: assets.filter(a => a.risk === 'critical').length, icon: AlertTriangle, color: 'text-red-400' },
    { label: 'Open Ports', value: assets.reduce((sum, a) => sum + a.ports.length, 0), icon: Eye, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Attack Surface</h1>
          <p className="text-gray-400">Monitor your external and internal exposure points</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assets.map((asset, index) => {
            const Icon = getTypeIcon(asset.type);
            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={`bg-white/5 backdrop-blur-xl rounded-xl border p-6 hover:bg-white/10 transition-all cursor-pointer ${
                  asset.risk === 'critical' ? 'border-red-500/30' : 'border-white/10'
                }`}
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
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getRiskColor(asset.risk)}`}>
                      {asset.risk}
                    </span>
                    <button className="p-1 hover:bg-white/10 rounded">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Exposure</span>
                    <span className="capitalize">{asset.exposure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Open Ports</span>
                    <span className="font-mono">{asset.ports.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Services</span>
                    <span>{asset.services.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Seen</span>
                    <span>{asset.lastSeen}</span>
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
