'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, AlertTriangle, CheckCircle, Lock, Key, Activity } from 'lucide-react';

export default function APISecurityPage() {
  const [apis] = useState([
    { id: '1', name: '/api/users', method: 'GET', auth: true, rateLimit: '100/min', issues: 0, status: 'secure' },
    { id: '2', name: '/api/auth/login', method: 'POST', auth: false, rateLimit: '10/min', issues: 2, status: 'warning' },
    { id: '3', name: '/api/admin', method: 'GET', auth: true, rateLimit: '50/min', issues: 1, status: 'warning' },
    { id: '4', name: '/api/data/export', method: 'POST', auth: true, rateLimit: '5/min', issues: 0, status: 'secure' },
    { id: '5', name: '/api/public/info', method: 'GET', auth: false, rateLimit: 'none', issues: 3, status: 'critical' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-green-400';
      case 'POST': return 'text-blue-400';
      case 'PUT': return 'text-yellow-400';
      case 'DELETE': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">API Security</h1>
          </div>
          <p className="text-gray-400">Monitor and secure your API endpoints</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total APIs', value: apis.length, icon: Globe },
            { label: 'Secure', value: apis.filter(a => a.status === 'secure').length, icon: Shield, color: 'text-green-400' },
            { label: 'With Issues', value: apis.filter(a => a.issues > 0).length, icon: AlertTriangle, color: 'text-yellow-400' },
            { label: 'Auth Enabled', value: apis.filter(a => a.auth).length, icon: Lock },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-6 h-6 ${stat.color || 'text-gray-400'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* API List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="p-4 border-b border-white/10">
            <h3 className="font-semibold">API Endpoints</h3>
          </div>
          <div className="divide-y divide-white/10">
            {apis.map((api) => (
              <div key={api.id} className="p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-sm font-bold ${getMethodColor(api.method)}`}>
                      {api.method}
                    </span>
                    <span className="font-mono">{api.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      {api.auth ? (
                        <span className="flex items-center gap-1 text-green-400">
                          <Lock className="w-4 h-4" />
                          Auth
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400">
                          <Key className="w-4 h-4" />
                          Public
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">{api.rateLimit}</span>
                    {api.issues > 0 && (
                      <span className="text-sm text-yellow-400">{api.issues} issues</span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(api.status)}`}>
                      {api.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
