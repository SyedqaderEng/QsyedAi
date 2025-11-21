'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp, Code, GitBranch, Key, Cloud, Container, Settings } from 'lucide-react';

export default function OverviewPage() {
  const stats = [
    { label: 'Security Score', value: '78', suffix: '/100', color: 'text-purple-400', trend: '+6' },
    { label: 'Critical Issues', value: '3', color: 'text-red-400', trend: '-2' },
    { label: 'Open Vulnerabilities', value: '45', color: 'text-orange-400', trend: '-12' },
    { label: 'Repositories Scanned', value: '24', color: 'text-blue-400', trend: '+3' },
  ];

  const scanTypes = [
    { name: 'SAST', icon: Code, status: 'healthy', findings: 12, href: '/security/sast' },
    { name: 'SCA', icon: GitBranch, status: 'warning', findings: 28, href: '/security/sca' },
    { name: 'Secrets', icon: Key, status: 'healthy', findings: 2, href: '/security/secrets' },
    { name: 'IaC', icon: Settings, status: 'critical', findings: 8, href: '/security/iac' },
    { name: 'Cloud', icon: Cloud, status: 'healthy', findings: 5, href: '/security/cloud' },
    { name: 'Containers', icon: Container, status: 'warning', findings: 10, href: '/security/containers' },
  ];

  const recentActivity = [
    { action: 'Fixed critical vulnerability', repo: 'api-service', time: '2 hours ago', type: 'fix' },
    { action: 'New scan completed', repo: 'frontend', time: '4 hours ago', type: 'scan' },
    { action: 'High severity issue detected', repo: 'backend', time: '6 hours ago', type: 'alert' },
    { action: 'Dependencies updated', repo: 'shared-lib', time: '1 day ago', type: 'update' },
    { action: 'Security policy violated', repo: 'data-pipeline', time: '1 day ago', type: 'violation' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Security Overview</h1>
          <p className="text-gray-400">Your organization&apos;s security at a glance</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                  <span className="text-lg text-gray-500">{stat.suffix}</span>
                </p>
                <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scan Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Scan Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {scanTypes.map((scan) => (
                <Link
                  key={scan.name}
                  href={scan.href}
                  className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <scan.icon className="w-6 h-6 text-purple-400" />
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(scan.status)}`} />
                  </div>
                  <h4 className="font-semibold">{scan.name}</h4>
                  <p className="text-sm text-gray-400">{scan.findings} findings</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-1 rounded ${
                    activity.type === 'fix' ? 'bg-green-500/20 text-green-400' :
                    activity.type === 'alert' ? 'bg-red-500/20 text-red-400' :
                    activity.type === 'violation' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {activity.type === 'fix' ? <CheckCircle className="w-4 h-4" /> :
                     activity.type === 'alert' || activity.type === 'violation' ? <AlertTriangle className="w-4 h-4" /> :
                     <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.repo} · {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'View All Vulnerabilities', href: '/security', icon: Shield },
            { label: 'Run New Scan', href: '/security/repositories', icon: TrendingUp },
            { label: 'Security Settings', href: '/security/settings', icon: Settings },
            { label: 'View Reports', href: '/security/reports', icon: Clock },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <link.icon className="w-5 h-5 text-purple-400" />
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
