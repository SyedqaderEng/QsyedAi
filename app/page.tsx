'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Code,
  Cloud,
  Zap,
  Lock,
  GitBranch,
  BarChart3,
  Bell,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Users,
  Building,
  ChevronRight,
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Syed.AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/security" className="text-gray-300 hover:text-white transition-colors">
                Product
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/security/compliance" className="text-gray-300 hover:text-white transition-colors">
                Compliance
              </Link>
              <Link href="/security/intelligence" className="text-gray-300 hover:text-white transition-colors">
                Resources
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Get Started Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            >
              <div className="flex flex-col gap-4">
                <Link href="/security" className="text-gray-300 hover:text-white transition-colors">
                  Product
                </Link>
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/security/compliance" className="text-gray-300 hover:text-white transition-colors">
                  Compliance
                </Link>
                <Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium text-center"
                >
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-8">
              <Star className="w-4 h-4" />
              <span>Trusted by 1,000+ security teams worldwide</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Security Platform for
              <br />
              Modern Development
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Find and fix vulnerabilities before they reach production. All-in-one security scanning,
              compliance monitoring, and automated remediation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 text-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/security"
                className="px-8 py-4 glass border border-white/20 rounded-xl text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-lg"
              >
                View Demo
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Security Coverage
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to secure your code, cloud, and containers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={feature.href}
                  className="block glass p-8 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer h-full"
                >
                  <div className={`p-3 rounded-xl ${feature.color} w-fit mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 glass border-y border-white/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start free, scale as you grow. No hidden fees.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass p-8 rounded-2xl ${plan.popular ? 'border-2 border-purple-500 relative' : 'border border-white/10'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 rounded-full text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 mb-1">/month</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <Link
                  href={plan.price === 0 ? '/auth/signup' : '/pricing'}
                  className={`block w-full py-3 rounded-lg text-center font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </Link>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-2"
            >
              View full pricing details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl text-center border border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Secure Your Code?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who trust Syed.AI to keep their applications secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/dashboard"
                className="px-8 py-4 glass border border-white/20 rounded-xl text-white font-semibold hover:bg-white/10 transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Syed.AI</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Complete security platform for modern development teams. Find and fix vulnerabilities before they reach production.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/security/sast" className="text-gray-400 hover:text-white transition-colors">SAST</Link></li>
                <li><Link href="/security/sca" className="text-gray-400 hover:text-white transition-colors">SCA</Link></li>
                <li><Link href="/security/secrets" className="text-gray-400 hover:text-white transition-colors">Secrets Detection</Link></li>
                <li><Link href="/security/cloud" className="text-gray-400 hover:text-white transition-colors">Cloud Security</Link></li>
                <li><Link href="/security/containers" className="text-gray-400 hover:text-white transition-colors">Container Security</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/security/compliance" className="text-gray-400 hover:text-white transition-colors">Compliance</Link></li>
                <li><Link href="/security/intelligence" className="text-gray-400 hover:text-white transition-colors">Security Research</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/auth/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/auth/forgot-password" className="text-gray-400 hover:text-white transition-colors">Reset Password</Link></li>
                <li><Link href="/dashboard/settings" className="text-gray-400 hover:text-white transition-colors">Settings</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Syed.AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Code,
    title: 'SAST Scanning',
    description: 'Static Application Security Testing to find vulnerabilities in your source code before deployment.',
    href: '/security/sast',
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    icon: GitBranch,
    title: 'SCA Analysis',
    description: 'Software Composition Analysis to detect vulnerable dependencies and license risks.',
    href: '/security/sca',
    color: 'bg-green-500/20 text-green-400',
  },
  {
    icon: Lock,
    title: 'Secrets Detection',
    description: 'Find exposed API keys, credentials, and sensitive data in your codebase.',
    href: '/security/secrets',
    color: 'bg-red-500/20 text-red-400',
  },
  {
    icon: Cloud,
    title: 'Cloud Security',
    description: 'CSPM for AWS, Azure, and GCP. Find misconfigurations before attackers do.',
    href: '/security/cloud',
    color: 'bg-cyan-500/20 text-cyan-400',
  },
  {
    icon: Zap,
    title: 'Runtime Protection',
    description: 'Real-time attack detection and blocking for your running applications.',
    href: '/security/runtime',
    color: 'bg-yellow-500/20 text-yellow-400',
  },
  {
    icon: BarChart3,
    title: 'Compliance Reports',
    description: 'Automated compliance for SOC 2, ISO 27001, HIPAA, GDPR, and more.',
    href: '/security/compliance',
    color: 'bg-purple-500/20 text-purple-400',
  },
];

const stats = [
  { value: '10M+', label: 'Vulnerabilities Found' },
  { value: '50K+', label: 'Repositories Scanned' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<5min', label: 'Setup Time' },
];

const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for individual developers',
    cta: 'Get Started',
    popular: false,
    features: [
      'Up to 5 repositories',
      'Basic SAST scanning',
      'Dependency scanning',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: 49,
    description: 'For growing development teams',
    cta: 'Start Free Trial',
    popular: true,
    features: [
      'Unlimited repositories',
      'Advanced SAST & SCA',
      'Secrets detection',
      'Cloud security scanning',
      'Slack & Jira integration',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: 199,
    description: 'For large organizations',
    cta: 'Contact Sales',
    popular: false,
    features: [
      'Everything in Pro',
      'SSO & SAML',
      'Custom compliance reports',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise option',
    ],
  },
];
