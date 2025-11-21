'use client';

import { motion } from 'framer-motion';
import { Rocket, Check, ArrowRight, GitBranch, Shield, Bell } from 'lucide-react';

export default function QuickStartPage() {
  const steps = [
    { step: 1, title: 'Connect Repository', description: 'Link your GitHub, GitLab, or Bitbucket account', icon: GitBranch, completed: true },
    { step: 2, title: 'Run First Scan', description: 'Analyze your code for vulnerabilities', icon: Shield, completed: true },
    { step: 3, title: 'Configure Alerts', description: 'Set up notifications for new findings', icon: Bell, completed: false },
    { step: 4, title: 'Review Results', description: 'Analyze and prioritize vulnerabilities', icon: Check, completed: false },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Rocket className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Quick Start Guide</h1>
          </div>
          <p className="text-gray-400">Get up and running in minutes</p>
        </motion.div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className={`bg-white/5 backdrop-blur-xl rounded-xl border ${step.completed ? 'border-green-500/50' : 'border-white/10'} p-6`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                  {step.completed ? <Check className="w-6 h-6" /> : <span className="font-bold">{step.step}</span>}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
                {!step.completed && <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm">Start <ArrowRight className="w-4 h-4" /></button>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
