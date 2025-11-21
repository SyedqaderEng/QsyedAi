'use client';

import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Book, ExternalLink, Mail, Phone } from 'lucide-react';

export default function SupportPage() {
  const resources = [
    { title: 'Documentation', description: 'Browse our comprehensive docs', icon: Book, link: '#' },
    { title: 'Live Chat', description: 'Chat with our support team', icon: MessageSquare, link: '#' },
    { title: 'Email Support', description: 'support@syed.ai', icon: Mail, link: 'mailto:support@syed.ai' },
    { title: 'Phone Support', description: '+1 (555) 123-4567', icon: Phone, link: 'tel:+15551234567' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <HelpCircle className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Support</h1>
          </div>
          <p className="text-gray-400">We are here to help</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <motion.a key={resource.title} href={resource.link} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl"><resource.icon className="w-6 h-6 text-purple-400" /></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{resource.title}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 mt-1">{resource.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
