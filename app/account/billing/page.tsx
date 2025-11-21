'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, Calendar, Check, AlertCircle, TrendingUp } from 'lucide-react';

export default function BillingPage() {
  const [currentPlan] = useState({
    name: 'Pro',
    price: 49,
    billingCycle: 'monthly',
    nextBilling: '2024-02-15',
    status: 'active',
  });

  const invoices = [
    { id: 'INV-001', date: '2024-01-15', amount: 49, status: 'paid' },
    { id: 'INV-002', date: '2023-12-15', amount: 49, status: 'paid' },
    { id: 'INV-003', date: '2023-11-15', amount: 49, status: 'paid' },
    { id: 'INV-004', date: '2023-10-15', amount: 49, status: 'paid' },
  ];

  const usage = {
    scans: { used: 450, limit: 1000 },
    repos: { used: 12, limit: 50 },
    users: { used: 5, limit: 10 },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
          <p className="text-gray-400">Manage your subscription and billing information</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">{currentPlan.name} Plan</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-gray-400">
                  ${currentPlan.price}/month · Billed {currentPlan.billingCycle}
                </p>
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                Change Plan
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              Next billing date: {currentPlan.nextBilling}
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-400">Expires 12/25</p>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 border border-white/20 hover:bg-white/5 rounded-lg transition-colors">
              Update Payment Method
            </button>
          </motion.div>

          {/* Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Current Usage</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-6">
              {Object.entries(usage).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="capitalize">{key}</span>
                    <span className="text-gray-400">
                      {value.used} / {value.limit}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        value.used / value.limit > 0.8
                          ? 'bg-red-500'
                          : value.used / value.limit > 0.5
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(value.used / value.limit) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left">
                <Download className="w-5 h-5 text-purple-400" />
                Download All Invoices
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                Cancel Subscription
              </button>
            </div>
          </motion.div>

          {/* Invoices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Billing History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="pb-4">Invoice</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-white/5">
                      <td className="py-4 font-medium">{invoice.id}</td>
                      <td className="py-4 text-gray-400">{invoice.date}</td>
                      <td className="py-4">${invoice.amount}.00</td>
                      <td className="py-4">
                        <span className="flex items-center gap-1 text-green-400">
                          <Check className="w-4 h-4" />
                          Paid
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
