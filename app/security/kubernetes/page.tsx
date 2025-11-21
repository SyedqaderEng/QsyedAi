'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Shield, AlertTriangle, CheckCircle, Server, Container, Layers, Lock } from 'lucide-react';

interface K8sResource {
  id: string;
  name: string;
  namespace: string;
  type: 'deployment' | 'pod' | 'service' | 'configmap' | 'secret';
  cluster: string;
  issues: number;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'none';
  compliant: boolean;
}

export default function KubernetesPage() {
  const [selectedCluster, setSelectedCluster] = useState('all');

  const resources: K8sResource[] = [
    { id: '1', name: 'api-deployment', namespace: 'production', type: 'deployment', cluster: 'prod-cluster', issues: 2, severity: 'high', compliant: false },
    { id: '2', name: 'web-service', namespace: 'production', type: 'service', cluster: 'prod-cluster', issues: 0, severity: 'none', compliant: true },
    { id: '3', name: 'auth-pod', namespace: 'production', type: 'pod', cluster: 'prod-cluster', issues: 1, severity: 'medium', compliant: true },
    { id: '4', name: 'db-secret', namespace: 'production', type: 'secret', cluster: 'prod-cluster', issues: 3, severity: 'critical', compliant: false },
    { id: '5', name: 'cache-deployment', namespace: 'staging', type: 'deployment', cluster: 'staging-cluster', issues: 1, severity: 'low', compliant: true },
    { id: '6', name: 'app-config', namespace: 'staging', type: 'configmap', cluster: 'staging-cluster', issues: 0, severity: 'none', compliant: true },
  ];

  const clusters = ['all', 'prod-cluster', 'staging-cluster'];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-green-400 bg-green-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deployment': return Layers;
      case 'pod': return Container;
      case 'service': return Server;
      case 'secret': return Lock;
      default: return Box;
    }
  };

  const filteredResources = resources.filter(r =>
    selectedCluster === 'all' || r.cluster === selectedCluster
  );

  const stats = {
    total: resources.length,
    critical: resources.filter(r => r.severity === 'critical').length,
    nonCompliant: resources.filter(r => !r.compliant).length,
    totalIssues: resources.reduce((sum, r) => sum + r.issues, 0),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Box className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Kubernetes Security</h1>
          </div>
          <p className="text-gray-400">Monitor security posture of your Kubernetes clusters</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Resources', value: stats.total, icon: Box },
            { label: 'Critical Issues', value: stats.critical, icon: AlertTriangle, color: 'text-red-400' },
            { label: 'Non-Compliant', value: stats.nonCompliant, icon: Shield, color: 'text-orange-400' },
            { label: 'Total Issues', value: stats.totalIssues, icon: AlertTriangle, color: 'text-yellow-400' },
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

        {/* Cluster Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6"
        >
          {clusters.map((cluster) => (
            <button
              key={cluster}
              onClick={() => setSelectedCluster(cluster)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedCluster === cluster
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cluster === 'all' ? 'All Clusters' : cluster}
            </button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource, index) => {
            const Icon = getTypeIcon(resource.type);
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`bg-white/5 backdrop-blur-xl rounded-xl border p-6 hover:bg-white/10 transition-all cursor-pointer ${
                  resource.severity === 'critical' ? 'border-red-500/30' : 'border-white/10'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{resource.name}</h3>
                      <p className="text-sm text-gray-400">{resource.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(resource.severity)}`}>
                    {resource.severity === 'none' ? 'Clean' : resource.severity}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Namespace</span>
                    <span>{resource.namespace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cluster</span>
                    <span>{resource.cluster}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Issues</span>
                    <span className={resource.issues > 0 ? 'text-orange-400' : 'text-green-400'}>
                      {resource.issues}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Compliance</span>
                    {resource.compliant ? (
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Compliant
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Non-Compliant
                      </span>
                    )}
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
