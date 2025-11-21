'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Plus, Trash2, CheckCircle, Clock, AlertTriangle, RefreshCw, Shield } from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'failed';
  addedAt: string;
  lastScanned: string | null;
  vulnerabilities: number;
  subdomains: number;
}

export default function DomainsPage() {
  const [domains, setDomains] = useState<Domain[]>([
    { id: '1', name: 'example.com', status: 'verified', addedAt: '2024-01-01', lastScanned: '2 hours ago', vulnerabilities: 5, subdomains: 12 },
    { id: '2', name: 'api.example.com', status: 'verified', addedAt: '2024-01-05', lastScanned: '1 hour ago', vulnerabilities: 2, subdomains: 3 },
    { id: '3', name: 'staging.example.com', status: 'pending', addedAt: '2024-01-15', lastScanned: null, vulnerabilities: 0, subdomains: 0 },
    { id: '4', name: 'dev.example.com', status: 'verified', addedAt: '2024-01-10', lastScanned: '1 day ago', vulnerabilities: 8, subdomains: 5 },
  ]);

  const [newDomain, setNewDomain] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return AlertTriangle;
      default: return Clock;
    }
  };

  const handleAddDomain = () => {
    if (!newDomain.trim()) return;
    const domain: Domain = {
      id: Date.now().toString(),
      name: newDomain,
      status: 'pending',
      addedAt: new Date().toISOString().split('T')[0],
      lastScanned: null,
      vulnerabilities: 0,
      subdomains: 0,
    };
    setDomains([...domains, domain]);
    setNewDomain('');
  };

  const handleRemoveDomain = (id: string) => {
    setDomains(domains.filter(d => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Domain Management</h1>
          <p className="text-gray-400">Manage domains for security scanning</p>
        </motion.div>

        {/* Add Domain */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4">Add New Domain</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAddDomain()}
            />
            <button
              onClick={handleAddDomain}
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Domain
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Domains', value: domains.length, icon: Globe },
            { label: 'Verified', value: domains.filter(d => d.status === 'verified').length, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Vulnerabilities', value: domains.reduce((sum, d) => sum + d.vulnerabilities, 0), icon: AlertTriangle, color: 'text-orange-400' },
            { label: 'Subdomains', value: domains.reduce((sum, d) => sum + d.subdomains, 0), icon: Shield },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
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

        {/* Domains List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {domains.map((domain, index) => {
            const StatusIcon = getStatusIcon(domain.status);
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      <Globe className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{domain.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <span>Added: {domain.addedAt}</span>
                        {domain.lastScanned && <span>Last scan: {domain.lastScanned}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {domain.status === 'verified' && (
                      <div className="flex items-center gap-4 text-sm">
                        <span>{domain.vulnerabilities} vulns</span>
                        <span>{domain.subdomains} subdomains</span>
                      </div>
                    )}
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(domain.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      {domain.status}
                    </span>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <RefreshCw className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleRemoveDomain(domain.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
