'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, MessageCircle, Video, FileText, ExternalLink, ChevronRight, Mail, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { icon: Book, title: 'Getting Started', description: 'Learn the basics of Syed.AI', articles: 12, href: '#' },
    { icon: HelpCircle, title: 'Security Scanning', description: 'Configure and run security scans', articles: 24, href: '#' },
    { icon: FileText, title: 'Integrations', description: 'Connect your tools and services', articles: 18, href: '#' },
    { icon: Video, title: 'Video Tutorials', description: 'Watch step-by-step guides', articles: 8, href: '#' },
  ];

  const faqs = [
    { q: 'How do I connect my GitHub repository?', a: 'Go to Integrations > GitHub and authorize Syed.AI to access your repositories.' },
    { q: 'What types of vulnerabilities does SAST detect?', a: 'SAST scans for SQL injection, XSS, hardcoded secrets, insecure configurations, and more.' },
    { q: 'How often are scans run automatically?', a: 'By default, scans run on every push and pull request. You can customize this in Settings.' },
    { q: 'Can I export security reports?', a: 'Yes, go to Reports > Export to download PDF or CSV reports.' },
  ];

  const popularArticles = [
    'Setting up your first repository scan',
    'Understanding vulnerability severity levels',
    'Configuring automated remediation',
    'Managing team permissions and access',
    'Integrating with CI/CD pipelines',
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
          <p className="text-gray-400 mb-8">Search our knowledge base or browse categories below</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 text-lg"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <Link
              key={category.title}
              href={category.href}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-purple-500/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <category.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{category.description}</p>
                  <span className="text-xs text-purple-400">{category.articles} articles</span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Popular Articles</h2>
          <div className="space-y-3">
            {popularArticles.map((article, index) => (
              <Link
                key={index}
                href="#"
                className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors group"
              >
                <span>{article}</span>
                <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-medium mb-2">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl">
            <MessageCircle className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-400 text-sm mb-4">Chat with our support team in real-time</p>
            <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
              Start Chat
            </button>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <Mail className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-gray-400 text-sm mb-4">Get help via email within 24 hours</p>
            <button className="px-4 py-2 border border-white/20 hover:bg-white/5 rounded-lg transition-colors">
              Send Email
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
