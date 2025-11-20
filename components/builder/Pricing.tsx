'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingProps {
  id?: string;
  title?: string;
  subtitle?: string;
  billingPeriod?: 'monthly' | 'yearly' | 'both';
  plans?: PricingPlan[];
  onClick?: () => void;
}

export default function Pricing({
  id,
  title,
  subtitle,
  billingPeriod = 'monthly',
  plans = [
    {
      name: 'Starter',
      price: '$9',
      period: 'month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      features: ['All Starter features', 'Feature 4', 'Feature 5', 'Priority support'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['All Pro features', 'Custom integration', 'Dedicated support', 'SLA'],
      highlighted: false,
    },
  ],
  onClick,
}: PricingProps) {
  return (
    <section
      id={id}
      onClick={onClick}
      className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-purple transition-all"
    >
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${
                plan.highlighted
                  ? 'glass-strong scale-105 ring-2 ring-neon-purple'
                  : 'glass'
              } p-8 rounded-2xl hover:scale-105 transition-all duration-300 relative`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-purple to-neon-pink px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 text-neon-blue">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-400 ml-2">/ {plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start gap-2">
                    <Check className="text-neon-green flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:shadow-neon-purple'
                    : 'glass hover:glass-strong'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
