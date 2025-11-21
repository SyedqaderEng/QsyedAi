'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out Aikido Builder',
      features: [
        '1 project',
        'Basic components',
        'Export to HTML',
        'Community support',
      ],
      limitations: [
        'No custom domains',
        'No AI features',
        'No team collaboration',
      ],
      cta: 'Get Started',
      ctaLink: '/auth/signup',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For professional designers and developers',
      features: [
        'Unlimited projects',
        'All components',
        'AI-powered generation',
        'Custom domains',
        'Priority support',
        'Advanced export options',
        'Code editor access',
        'Device preview modes',
      ],
      limitations: [],
      cta: 'Start Free Trial',
      ctaLink: '/auth/signup?plan=pro',
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$99',
      period: 'per month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'White-label exports',
        'Advanced analytics',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees',
      ],
      limitations: [],
      cta: 'Start Free Trial',
      ctaLink: '/auth/signup?plan=business',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass-strong">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Aikido Builder
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-2 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className={`glass p-8 rounded-2xl hover:glass-strong transition-all ${
                plan.highlighted ? 'border-2 border-neon-purple scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="inline-block bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-1 rounded-full text-xs font-bold mb-4">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  {plan.price}
                </span>
                <span className="text-gray-400 ml-2">/ {plan.period}</span>
              </div>

              <Link
                href={plan.ctaLink}
                className={`block w-full py-3 rounded-lg font-semibold text-center mb-6 transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-purple'
                    : 'glass hover:glass-strong'
                }`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation) => (
                  <div key={limitation} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500 text-sm">{limitation}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong p-12 rounded-2xl text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Need something more?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Enterprise plans are available with custom features, dedicated support, and SLA guarantees. Contact our sales team to learn more.
          </p>
          <Link
            href="/contact"
            className="inline-block glass px-8 py-3 rounded-lg font-semibold hover:glass-strong transition-all"
          >
            Contact Sales
          </Link>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">Can I switch plans later?</h3>
              <p className="text-gray-400">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via invoice.
              </p>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">Is there a money-back guarantee?</h3>
              <p className="text-gray-400">
                Yes! We offer a 30-day money-back guarantee. If you're not satisfied with Aikido Builder, we'll refund your payment in full.
              </p>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-400">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 glass-strong mt-20">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-gray-400">
            © 2025 Aikido Builder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
