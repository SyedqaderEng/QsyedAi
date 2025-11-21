'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronRight, Code, Shield, Settings, Zap, Users, Cloud } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    {
      title: 'Getting Started',
      icon: Zap,
      color: 'text-yellow-400',
      articles: [
        { title: 'Quick Start Guide', href: '#' },
        { title: 'Installation', href: '#' },
        { title: 'First Scan', href: '#' },
        { title: 'Understanding Results', href: '#' },
      ],
    },
    {
      title: 'Security Scanning',
      icon: Shield,
      color: 'text-green-400',
      articles: [
        { title: 'SAST Configuration', href: '#' },
        { title: 'SCA Scanning', href: '#' },
        { title: 'Secret Detection', href: '#' },
        { title: 'Container Security', href: '#' },
        { title: 'IaC Scanning', href: '#' },
      ],
    },
    {
      title: 'Integrations',
      icon: Code,
      color: 'text-blue-400',
      articles: [
        { title: 'GitHub Integration', href: '#' },
        { title: 'GitLab Integration', href: '#' },
        { title: 'CI/CD Pipelines', href: '#' },
        { title: 'Jira Integration', href: '#' },
        { title: 'Slack Notifications', href: '#' },
      ],
    },
    {
      title: 'Cloud Security',
      icon: Cloud,
      color: 'text-purple-400',
      articles: [
        { title: 'AWS Configuration', href: '#' },
        { title: 'Azure Security', href: '#' },
        { title: 'GCP Integration', href: '#' },
        { title: 'Cloud Posture Management', href: '#' },
      ],
    },
    {
      title: 'Administration',
      icon: Settings,
      color: 'text-orange-400',
      articles: [
        { title: 'User Management', href: '#' },
        { title: 'Team Permissions', href: '#' },
        { title: 'API Keys', href: '#' },
        { title: 'Webhooks', href: '#' },
        { title: 'SSO Setup', href: '#' },
      ],
    },
    {
      title: 'Team & Collaboration',
      icon: Users,
      color: 'text-pink-400',
      articles: [
        { title: 'Team Setup', href: '#' },
        { title: 'Code Owners', href: '#' },
        { title: 'Notifications', href: '#' },
        { title: 'Workflows', href: '#' },
      ],
    },
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(section => section.articles.length > 0 || section.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold">Documentation</h1>
          </div>
          <p className="text-gray-400 mb-8">Everything you need to know about Syed.AI</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 text-lg"
            />
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className={`w-6 h-6 ${section.color}`} />
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
              <div className="space-y-2">
                {section.articles.map((article) => (
                  <Link
                    key={article.title}
                    href={article.href}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      {article.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-400 mb-6">Can&apos;t find what you&apos;re looking for? Our support team is here to help.</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/help"
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/security/api-keys"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
            >
              API Reference
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
