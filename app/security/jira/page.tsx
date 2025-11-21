'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Plus, CheckCircle, Clock, AlertTriangle, Settings, ExternalLink } from 'lucide-react';

interface JiraTicket {
  id: string;
  key: string;
  summary: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'highest' | 'high' | 'medium' | 'low';
  vulnerability: string;
  assignee: string;
  created: string;
}

export default function JiraPage() {
  const tickets: JiraTicket[] = [
    { id: '1', key: 'SEC-123', summary: 'Fix critical SQL injection in login', status: 'in_progress', priority: 'highest', vulnerability: 'CVE-2023-1234', assignee: 'john.doe', created: '2 days ago' },
    { id: '2', key: 'SEC-124', summary: 'Update lodash to patch CVE', status: 'open', priority: 'high', vulnerability: 'CVE-2023-5678', assignee: 'sarah.m', created: '3 days ago' },
    { id: '3', key: 'SEC-125', summary: 'Remove exposed API keys', status: 'resolved', priority: 'highest', vulnerability: 'SECRET-001', assignee: 'mike.r', created: '5 days ago' },
    { id: '4', key: 'SEC-126', summary: 'Fix XSS in comment section', status: 'open', priority: 'medium', vulnerability: 'CWE-79', assignee: 'emily.k', created: '1 week ago' },
    { id: '5', key: 'SEC-127', summary: 'Upgrade express framework', status: 'closed', priority: 'low', vulnerability: 'CVE-2023-9012', assignee: 'tom.h', created: '2 weeks ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-500/20';
      case 'in_progress': return 'text-yellow-400 bg-yellow-500/20';
      case 'resolved': return 'text-green-400 bg-green-500/20';
      case 'closed': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'highest': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length,
    critical: tickets.filter(t => t.priority === 'highest').length,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#0052CC] rounded-xl">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Jira Integration</h1>
              <p className="text-gray-400">Track vulnerabilities as Jira tickets</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0052CC] hover:bg-[#0065FF] rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              Create Ticket
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Tickets', value: stats.total, icon: Ticket },
            { label: 'Open', value: stats.open, icon: Clock, color: 'text-blue-400' },
            { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Critical', value: stats.critical, icon: AlertTriangle, color: 'text-red-400' },
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

        {/* Tickets Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold">Security Tickets</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="p-4">Key</th>
                <th className="p-4">Summary</th>
                <th className="p-4">Status</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Assignee</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <span className="font-mono text-[#0052CC]">{ticket.key}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{ticket.summary}</p>
                      <p className="text-xs text-gray-500">{ticket.vulnerability}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className={`p-4 font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </td>
                  <td className="p-4 text-gray-400">{ticket.assignee}</td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
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
