'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldOff, Plus, Calendar, User, AlertTriangle, CheckCircle, Clock, Trash2 } from 'lucide-react';

interface Exception {
  id: string;
  vulnerability: string;
  reason: string;
  status: 'active' | 'expired' | 'pending_review';
  createdBy: string;
  createdAt: string;
  expiresAt: string;
  repository: string;
  approvedBy: string | null;
}

export default function ExceptionsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const exceptions: Exception[] = [
    { id: '1', vulnerability: 'CVE-2023-1234', reason: 'False positive - code path not reachable', status: 'active', createdBy: 'john.doe', createdAt: '2024-01-10', expiresAt: '2024-04-10', repository: 'api-service', approvedBy: 'security-team' },
    { id: '2', vulnerability: 'CWE-79', reason: 'Mitigated by WAF rules', status: 'active', createdBy: 'sarah.m', createdAt: '2024-01-05', expiresAt: '2024-03-05', repository: 'frontend', approvedBy: 'security-team' },
    { id: '3', vulnerability: 'CVE-2023-5678', reason: 'Accepted risk - internal tool only', status: 'pending_review', createdBy: 'mike.r', createdAt: '2024-01-15', expiresAt: '2024-04-15', repository: 'internal-tools', approvedBy: null },
    { id: '4', vulnerability: 'SAST-001', reason: 'Legacy code - planned refactor in Q2', status: 'expired', createdBy: 'emily.k', createdAt: '2023-10-01', expiresAt: '2024-01-01', repository: 'backend', approvedBy: 'security-team' },
    { id: '5', vulnerability: 'CVE-2023-9012', reason: 'Compensating controls in place', status: 'active', createdBy: 'tom.h', createdAt: '2024-01-08', expiresAt: '2024-07-08', repository: 'auth-service', approvedBy: 'ciso' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'expired': return 'text-red-400 bg-red-500/20';
      case 'pending_review': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'expired': return AlertTriangle;
      case 'pending_review': return Clock;
      default: return Clock;
    }
  };

  const filteredExceptions = exceptions.filter(e =>
    filterStatus === 'all' || e.status === filterStatus
  );

  const stats = {
    total: exceptions.length,
    active: exceptions.filter(e => e.status === 'active').length,
    pending: exceptions.filter(e => e.status === 'pending_review').length,
    expired: exceptions.filter(e => e.status === 'expired').length,
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
            <h1 className="text-3xl font-bold mb-2">Security Exceptions</h1>
            <p className="text-gray-400">Manage accepted risks and vulnerability exceptions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
            <Plus className="w-5 h-5" />
            Request Exception
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Exceptions', value: stats.total, icon: ShieldOff },
            { label: 'Active', value: stats.active, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'text-yellow-400' },
            { label: 'Expired', value: stats.expired, icon: AlertTriangle, color: 'text-red-400' },
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
          className="flex gap-2 mb-6"
        >
          {['all', 'active', 'pending_review', 'expired'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterStatus === status
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {status === 'pending_review' ? 'Pending' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Exceptions List */}
        <div className="space-y-4">
          {filteredExceptions.map((exception, index) => {
            const StatusIcon = getStatusIcon(exception.status);
            return (
              <motion.div
                key={exception.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(exception.status)}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{exception.vulnerability}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(exception.status)}`}>
                          {exception.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{exception.reason}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {exception.createdBy}
                        </span>
                        <span>{exception.repository}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Expires: {exception.expiresAt}
                        </span>
                        {exception.approvedBy && (
                          <span className="text-green-400">Approved by: {exception.approvedBy}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {exception.status === 'pending_review' && (
                      <button className="px-3 py-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg text-sm transition-colors">
                        Approve
                      </button>
                    )}
                    <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
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
