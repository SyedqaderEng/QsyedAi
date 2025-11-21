'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, User, Calendar, ArrowRight, Filter } from 'lucide-react';

interface RemediationTask {
  id: string;
  title: string;
  vulnerability: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  assignee: string;
  dueDate: string;
  progress: number;
  repository: string;
}

export default function RemediationPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const tasks: RemediationTask[] = [
    { id: '1', title: 'Update lodash to 4.17.21', vulnerability: 'CVE-2021-23337', severity: 'critical', status: 'in_progress', assignee: 'John D.', dueDate: '2024-01-20', progress: 60, repository: 'api-service' },
    { id: '2', title: 'Fix SQL injection in user query', vulnerability: 'CWE-89', severity: 'critical', status: 'pending', assignee: 'Sarah M.', dueDate: '2024-01-18', progress: 0, repository: 'backend-api' },
    { id: '3', title: 'Patch OpenSSL vulnerability', vulnerability: 'CVE-2023-5678', severity: 'high', status: 'completed', assignee: 'Mike R.', dueDate: '2024-01-15', progress: 100, repository: 'auth-service' },
    { id: '4', title: 'Remove hardcoded credentials', vulnerability: 'CWE-798', severity: 'high', status: 'in_progress', assignee: 'Emily K.', dueDate: '2024-01-22', progress: 40, repository: 'config-service' },
    { id: '5', title: 'Update React to latest version', vulnerability: 'CVE-2023-4567', severity: 'medium', status: 'blocked', assignee: 'Tom H.', dueDate: '2024-01-25', progress: 20, repository: 'web-app' },
    { id: '6', title: 'Fix XSS in comment section', vulnerability: 'CWE-79', severity: 'high', status: 'pending', assignee: 'Lisa P.', dueDate: '2024-01-19', progress: 0, repository: 'frontend' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'in_progress': return 'text-blue-400 bg-blue-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'blocked': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 border-red-500/50';
      case 'high': return 'text-orange-400 border-orange-500/50';
      case 'medium': return 'text-yellow-400 border-yellow-500/50';
      case 'low': return 'text-green-400 border-green-500/50';
      default: return 'text-gray-400 border-gray-500/50';
    }
  };

  const filteredTasks = tasks.filter(task =>
    filterStatus === 'all' || task.status === filterStatus
  );

  const stats = [
    { label: 'Total Tasks', value: tasks.length, color: 'text-white' },
    { label: 'In Progress', value: tasks.filter(t => t.status === 'in_progress').length, color: 'text-blue-400' },
    { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'text-green-400' },
    { label: 'Blocked', value: tasks.filter(t => t.status === 'blocked').length, color: 'text-red-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Remediation Tracking</h1>
          <p className="text-gray-400">Track and manage vulnerability remediation tasks</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center"
            >
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-6"
        >
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            {['all', 'pending', 'in_progress', 'completed', 'blocked'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filterStatus === status
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tasks */}
        <div className="space-y-4">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(task.severity)}`}>
                      {task.severity}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{task.vulnerability} · {task.repository}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          task.progress === 100 ? 'bg-green-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Due: {task.dueDate}
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg transition-colors">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
