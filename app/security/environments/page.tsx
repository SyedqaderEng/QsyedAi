'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, AlertTriangle, CheckCircle, Clock, RefreshCw, Settings } from 'lucide-react';

interface Environment {
  id: string;
  name: string;
  type: 'production' | 'staging' | 'development' | 'testing';
  status: 'healthy' | 'warning' | 'critical';
  lastScan: string;
  vulnerabilities: { critical: number; high: number; medium: number; low: number };
  compliance: number;
  services: number;
}

export default function EnvironmentsPage() {
  const [selectedEnv, setSelectedEnv] = useState<string | null>(null);

  const environments: Environment[] = [
    { id: '1', name: 'Production', type: 'production', status: 'healthy', lastScan: '5 min ago', vulnerabilities: { critical: 0, high: 2, medium: 8, low: 15 }, compliance: 94, services: 12 },
    { id: '2', name: 'Staging', type: 'staging', status: 'warning', lastScan: '1 hour ago', vulnerabilities: { critical: 1, high: 5, medium: 12, low: 20 }, compliance: 78, services: 10 },
    { id: '3', name: 'Development', type: 'development', status: 'warning', lastScan: '2 hours ago', vulnerabilities: { critical: 3, high: 8, medium: 25, low: 40 }, compliance: 65, services: 8 },
    { id: '4', name: 'Testing', type: 'testing', status: 'healthy', lastScan: '30 min ago', vulnerabilities: { critical: 0, high: 1, medium: 5, low: 10 }, compliance: 88, services: 6 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'production': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'staging': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'development': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'testing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
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
            <h1 className="text-3xl font-bold mb-2">Environments</h1>
            <p className="text-gray-400">Monitor security across all deployment environments</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5" />
            Scan All
          </button>
        </motion.div>

        {/* Environment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {environments.map((env, index) => (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/5 backdrop-blur-xl rounded-2xl border p-6 transition-all cursor-pointer ${
                selectedEnv === env.id ? 'border-purple-500' : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedEnv(selectedEnv === env.id ? null : env.id)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Server className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{env.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs border ${getTypeColor(env.type)}`}>
                      {env.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(env.status)}`}>
                    {env.status}
                  </span>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Vulnerability Summary */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-red-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-red-400">{env.vulnerabilities.critical}</p>
                  <p className="text-xs text-gray-400">Critical</p>
                </div>
                <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-orange-400">{env.vulnerabilities.high}</p>
                  <p className="text-xs text-gray-400">High</p>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-400">{env.vulnerabilities.medium}</p>
                  <p className="text-xs text-gray-400">Medium</p>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-blue-400">{env.vulnerabilities.low}</p>
                  <p className="text-xs text-gray-400">Low</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Shield className="w-4 h-4" />
                    {env.compliance}% compliant
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Server className="w-4 h-4" />
                    {env.services} services
                  </span>
                </div>
                <span className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  {env.lastScan}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Cross-Environment Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Total Environments</p>
              <p className="text-2xl font-bold">{environments.length}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Healthy</p>
              <p className="text-2xl font-bold text-green-400">
                {environments.filter(e => e.status === 'healthy').length}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Services</p>
              <p className="text-2xl font-bold">{environments.reduce((sum, e) => sum + e.services, 0)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Compliance</p>
              <p className="text-2xl font-bold">
                {Math.round(environments.reduce((sum, e) => sum + e.compliance, 0) / environments.length)}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
