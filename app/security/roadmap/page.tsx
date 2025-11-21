'use client';

import { motion } from 'framer-motion';
import { Map, CheckCircle, Clock, Circle, ArrowRight, Calendar, Target } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  quarter: string;
  tasks: { name: string; completed: boolean }[];
}

export default function RoadmapPage() {
  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'Foundation Security',
      description: 'Establish baseline security controls',
      status: 'completed',
      quarter: 'Q3 2023',
      tasks: [
        { name: 'Enable SAST scanning', completed: true },
        { name: 'Implement SCA', completed: true },
        { name: 'Secret detection', completed: true },
        { name: 'Basic CI/CD gates', completed: true },
      ],
    },
    {
      id: '2',
      title: 'Enhanced Detection',
      description: 'Improve vulnerability detection coverage',
      status: 'in_progress',
      quarter: 'Q4 2023',
      tasks: [
        { name: 'DAST scanning', completed: true },
        { name: 'Container security', completed: true },
        { name: 'IaC scanning', completed: false },
        { name: 'API security testing', completed: false },
      ],
    },
    {
      id: '3',
      title: 'Automation & Remediation',
      description: 'Automate security workflows',
      status: 'planned',
      quarter: 'Q1 2024',
      tasks: [
        { name: 'Auto-fix capabilities', completed: false },
        { name: 'Intelligent triage', completed: false },
        { name: 'Risk-based prioritization', completed: false },
        { name: 'SLA tracking', completed: false },
      ],
    },
    {
      id: '4',
      title: 'Compliance & Governance',
      description: 'Meet regulatory requirements',
      status: 'planned',
      quarter: 'Q2 2024',
      tasks: [
        { name: 'SOC 2 compliance', completed: false },
        { name: 'ISO 27001', completed: false },
        { name: 'Policy automation', completed: false },
        { name: 'Audit reporting', completed: false },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500';
      case 'in_progress': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
      case 'planned': return 'text-gray-400 bg-gray-500/20 border-gray-500';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return Clock;
      default: return Circle;
    }
  };

  const completedTasks = milestones.flatMap(m => m.tasks).filter(t => t.completed).length;
  const totalTasks = milestones.flatMap(m => m.tasks).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Map className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Security Roadmap</h1>
          </div>
          <p className="text-gray-400">Your path to a mature security program</p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Overall Progress</h3>
              <p className="text-gray-400">{completedTasks} of {totalTasks} tasks completed</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-purple-400">{Math.round((completedTasks / totalTasks) * 100)}%</p>
            </div>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const StatusIcon = getStatusIcon(milestone.status);
            const completedInMilestone = milestone.tasks.filter(t => t.completed).length;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                {index < milestones.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-white/10" />
                )}
                <div className={`bg-white/5 backdrop-blur-xl rounded-xl border p-6 ${
                  milestone.status === 'in_progress' ? 'border-yellow-500/50' : 'border-white/10'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${getStatusColor(milestone.status).split(' ').slice(1).join(' ')}`}>
                      <StatusIcon className={`w-6 h-6 ${getStatusColor(milestone.status).split(' ')[0]}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{milestone.title}</h3>
                          <p className="text-sm text-gray-400">{milestone.description}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(milestone.status)}`}>
                            {milestone.status.replace('_', ' ')}
                          </span>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {milestone.quarter}
                          </p>
                        </div>
                      </div>

                      {/* Tasks */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {milestone.tasks.map((task, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2 p-2 rounded ${
                              task.completed ? 'text-green-400' : 'text-gray-500'
                            }`}
                          >
                            {task.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                            <span className="text-sm">{task.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Progress */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span>{completedInMilestone}/{milestone.tasks.length}</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              milestone.status === 'completed' ? 'bg-green-500' :
                              milestone.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-500'
                            }`}
                            style={{ width: `${(completedInMilestone / milestone.tasks.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
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
