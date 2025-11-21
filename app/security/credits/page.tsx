'use client';

import { motion } from 'framer-motion';
import { Coins, TrendingUp, Clock, CreditCard } from 'lucide-react';

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Coins className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Credits & Usage</h1>
          </div>
          <p className="text-gray-400">Monitor your usage and credits</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
            <Coins className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">8,500</p>
            <p className="text-sm text-gray-400">Credits Remaining</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">1,500</p>
            <p className="text-sm text-gray-400">Used This Month</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
            <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-gray-400">Days Until Reset</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
          <h3 className="font-semibold mb-4">Usage Breakdown</h3>
          <div className="space-y-4">
            {[{ name: 'SAST Scans', used: 450, color: 'bg-purple-500' }, { name: 'SCA Scans', used: 380, color: 'bg-blue-500' }, { name: 'Secret Detection', used: 320, color: 'bg-green-500' }, { name: 'AI Fixes', used: 350, color: 'bg-yellow-500' }].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1"><span>{item.name}</span><span>{item.used} credits</span></div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className={`h-full ${item.color} rounded-full`} style={{ width: (item.used / 500) * 100 + '%' }}></div></div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold"><CreditCard className="w-5 h-5" />Buy More Credits</button>
        </motion.div>
      </div>
    </div>
  );
}
