'use client';

import { motion } from 'framer-motion';
import { Info, Shield, Users, Globe, Award } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Vulnerabilities Found', value: '10M+' },
    { label: 'Repositories Protected', value: '500K+' },
    { label: 'Companies Trust Us', value: '5,000+' },
    { label: 'Countries', value: '120+' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">About Syed.AI</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">We are on a mission to make software security accessible to every developer and organization.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
              <p className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">Syed.AI was founded with a simple belief: every developer deserves access to enterprise-grade security tools. We combine cutting-edge AI technology with deep security expertise to help teams find and fix vulnerabilities before they become problems.</p>
        </motion.div>
      </div>
    </div>
  );
}
