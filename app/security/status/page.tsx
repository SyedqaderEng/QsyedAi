'use client';

import { motion } from 'framer-motion';
import { Activity, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function StatusPage() {
  const services = [
    { name: 'API', status: 'operational', uptime: '99.99%' },
    { name: 'Scanning Engine', status: 'operational', uptime: '99.95%' },
    { name: 'Dashboard', status: 'operational', uptime: '100%' },
    { name: 'Webhooks', status: 'degraded', uptime: '98.5%' },
    { name: 'Authentication', status: 'operational', uptime: '99.99%' },
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'operational') return { icon: CheckCircle, color: 'text-green-400' };
    if (status === 'degraded') return { icon: AlertTriangle, color: 'text-yellow-400' };
    return { icon: XCircle, color: 'text-red-400' };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">System Status</h1>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full mt-4">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">All Systems Operational</span>
          </div>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, index) => {
            const { icon: Icon, color } = getStatusIcon(service.status);
            return (
              <motion.div key={service.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Uptime: {service.uptime}</span>
                    <span className={`text-sm capitalize ${color}`}>{service.status}</span>
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
