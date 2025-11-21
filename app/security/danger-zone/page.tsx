'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, Trash2, Download, RefreshCw } from 'lucide-react';

export default function DangerZonePage() {
  const [confirmDelete, setConfirmDelete] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertOctagon className="w-8 h-8 text-red-400" />
            <h1 className="text-3xl font-bold">Danger Zone</h1>
          </div>
          <p className="text-gray-400">Destructive actions - proceed with caution</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-red-500/10 backdrop-blur-xl rounded-xl border border-red-500/30 p-6">
            <h3 className="font-semibold text-lg mb-2">Export All Data</h3>
            <p className="text-sm text-gray-400 mb-4">Download all your security data, scan results, and configurations.</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"><Download className="w-4 h-4" />Export Data</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-red-500/10 backdrop-blur-xl rounded-xl border border-red-500/30 p-6">
            <h3 className="font-semibold text-lg mb-2">Reset All Scan Data</h3>
            <p className="text-sm text-gray-400 mb-4">Clear all vulnerability data and scan history. This cannot be undone.</p>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg"><RefreshCw className="w-4 h-4" />Reset Data</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-red-500/10 backdrop-blur-xl rounded-xl border border-red-500/30 p-6">
            <h3 className="font-semibold text-lg mb-2">Delete Organization</h3>
            <p className="text-sm text-gray-400 mb-4">Permanently delete your organization and all associated data. Type your organization name to confirm.</p>
            <input type="text" value={confirmDelete} onChange={(e) => setConfirmDelete(e.target.value)} placeholder="Type organization name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg mb-4 focus:outline-none focus:border-red-500" />
            <button disabled={confirmDelete !== 'my-org'} className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"><Trash2 className="w-4 h-4" />Delete Organization</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
