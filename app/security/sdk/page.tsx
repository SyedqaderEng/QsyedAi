'use client';

import { motion } from 'framer-motion';
import { Code2, Copy, ExternalLink } from 'lucide-react';

export default function SDKPage() {
  const languages = [
    { name: 'JavaScript/TypeScript', install: 'npm install @syed-ai/sdk', color: 'bg-yellow-500' },
    { name: 'Python', install: 'pip install syed-ai', color: 'bg-blue-500' },
    { name: 'Go', install: 'go get github.com/syed-ai/sdk-go', color: 'bg-cyan-500' },
    { name: 'Ruby', install: 'gem install syed-ai', color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Code2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">SDK Libraries</h1>
          </div>
          <p className="text-gray-400">Integrate Syed.AI into your applications</p>
        </motion.div>

        <div className="space-y-4">
          {languages.map((lang, index) => (
            <motion.div key={lang.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${lang.color}`}></div>
                  <h3 className="font-semibold">{lang.name}</h3>
                </div>
                <a href="#" className="flex items-center gap-1 text-purple-400 text-sm hover:underline">Docs <ExternalLink className="w-3 h-3" /></a>
              </div>
              <div className="bg-black/50 rounded-lg p-3 flex items-center justify-between">
                <code className="text-sm text-green-400">{lang.install}</code>
                <button className="text-gray-400 hover:text-white"><Copy className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
