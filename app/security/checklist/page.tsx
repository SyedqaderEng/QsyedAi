'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, CheckCircle, Circle, Shield, AlertTriangle, Lock, Server, Code } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  completed: boolean;
}

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', title: 'Enable MFA for all users', description: 'Require multi-factor authentication', category: 'Authentication', priority: 'critical', completed: true },
    { id: '2', title: 'Rotate API keys quarterly', description: 'Ensure API keys are rotated regularly', category: 'Authentication', priority: 'high', completed: true },
    { id: '3', title: 'Enable SAST in CI/CD', description: 'Run static analysis on every commit', category: 'Code Security', priority: 'critical', completed: true },
    { id: '4', title: 'Enable SCA scanning', description: 'Scan dependencies for vulnerabilities', category: 'Code Security', priority: 'critical', completed: true },
    { id: '5', title: 'Secret scanning enabled', description: 'Detect exposed credentials', category: 'Code Security', priority: 'critical', completed: false },
    { id: '6', title: 'Configure WAF rules', description: 'Web application firewall setup', category: 'Infrastructure', priority: 'high', completed: false },
    { id: '7', title: 'Enable audit logging', description: 'Track all security events', category: 'Infrastructure', priority: 'high', completed: true },
    { id: '8', title: 'Database encryption at rest', description: 'Encrypt stored data', category: 'Infrastructure', priority: 'critical', completed: true },
    { id: '9', title: 'TLS 1.3 enabled', description: 'Use latest TLS version', category: 'Infrastructure', priority: 'high', completed: false },
    { id: '10', title: 'Security training completed', description: 'All developers trained', category: 'Compliance', priority: 'medium', completed: false },
    { id: '11', title: 'Incident response plan', description: 'Document IR procedures', category: 'Compliance', priority: 'high', completed: true },
    { id: '12', title: 'Penetration testing', description: 'Annual pentest scheduled', category: 'Compliance', priority: 'high', completed: false },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Authentication': return Lock;
      case 'Code Security': return Code;
      case 'Infrastructure': return Server;
      case 'Compliance': return Shield;
      default: return Shield;
    }
  };

  const categories = [...new Set(items.map(i => i.category))];
  const completedCount = items.filter(i => i.completed).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Security Checklist</h1>
          </div>
          <p className="text-gray-400">Track your security implementation progress</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Overall Completion</h3>
              <p className="text-gray-400">{completedCount} of {items.length} items completed</p>
            </div>
            <div className="text-3xl font-bold text-purple-400">
              {Math.round((completedCount / items.length) * 100)}%
            </div>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-green-500 rounded-full transition-all"
              style={{ width: `${(completedCount / items.length) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Checklist by Category */}
        {categories.map((category, catIndex) => {
          const categoryItems = items.filter(i => i.category === category);
          const categoryCompleted = categoryItems.filter(i => i.completed).length;
          const CategoryIcon = getCategoryIcon(category);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + catIndex * 0.1 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CategoryIcon className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold">{category}</h2>
                <span className="text-sm text-gray-400">
                  ({categoryCompleted}/{categoryItems.length})
                </span>
              </div>
              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center gap-4 p-4 bg-white/5 rounded-xl border cursor-pointer transition-all ${
                      item.completed ? 'border-green-500/30 opacity-75' : 'border-white/10 hover:border-purple-500/50'
                    }`}
                  >
                    <div className={`p-1 rounded ${item.completed ? 'text-green-400' : 'text-gray-500'}`}>
                      {item.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${item.completed ? 'line-through text-gray-500' : ''}`}>
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
