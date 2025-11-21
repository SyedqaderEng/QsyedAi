'use client';

import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export default function UpgradePage() {
  const plans = [
    { name: 'Starter', price: '$0', period: '/month', features: ['5 repositories', 'Basic scanning', 'Email support'], current: true },
    { name: 'Pro', price: '$49', period: '/month', features: ['Unlimited repos', 'Advanced AI fixes', 'Priority support', 'Custom integrations'], recommended: true },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Everything in Pro', 'SSO/SAML', 'Dedicated support', 'SLA guarantees', 'On-premise option'], current: false },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Upgrade Your Plan</h1>
          </div>
          <p className="text-gray-400">Choose the plan that fits your needs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className={`bg-white/5 backdrop-blur-xl rounded-xl border ${plan.recommended ? 'border-purple-500' : 'border-white/10'} p-6 relative`}>
              {plan.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 text-white text-xs rounded-full">Recommended</span>}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6"><span className="text-4xl font-bold">{plan.price}</span><span className="text-gray-400">{plan.period}</span></div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-400" />{feature}</li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold ${plan.current ? 'bg-white/10 text-gray-400' : plan.recommended ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 hover:bg-white/20'}`}>
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
