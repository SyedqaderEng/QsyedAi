'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Settings, Shield, Globe } from 'lucide-react';

export default function ZonesPage() {
  const [zones] = useState([
    { id: '1', name: 'Production US', region: 'us-east-1', assets: 45, policy: 'Strict', status: 'active' },
    { id: '2', name: 'Production EU', region: 'eu-west-1', assets: 32, policy: 'Strict', status: 'active' },
    { id: '3', name: 'Staging', region: 'us-west-2', assets: 18, policy: 'Standard', status: 'active' },
    { id: '4', name: 'Development', region: 'us-east-2', assets: 56, policy: 'Relaxed', status: 'active' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold">Security Zones</h1>
            </div>
            <p className="text-gray-400">Manage security zones and regions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"><Plus className="w-4 h-4" />Add Zone</button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zones.map((zone, index) => (
            <motion.div key={zone.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold">{zone.name}</h3>
                    <code className="text-sm text-gray-400">{zone.region}</code>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg"><Settings className="w-4 h-4 text-gray-400" /></button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{zone.assets} assets</span>
                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-purple-400" />{zone.policy}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
