'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, CreditCard, Bell, Shield, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'notifications' | 'security'>('profile');

  // Profile form
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    company: '',
  });

  // Billing info
  const [subscription, setSubscription] = useState({
    plan: 'Free',
    status: 'active',
    nextBilling: '2025-12-21',
    amount: '$0',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setProfileData({
        name: parsed.name || '',
        email: parsed.email || '',
        company: '',
      });
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Profile updated successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ] as const;

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
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Aikido Builder
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
        >
          Settings
        </motion.h1>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="glass-strong p-4 rounded-2xl space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                        : 'text-gray-400 hover:text-white hover:glass'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            <div className="glass-strong p-8 rounded-2xl">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                        placeholder="Acme Inc."
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
                    >
                      Save Changes
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Billing & Subscription</h2>

                  {/* Current Plan */}
                  <div className="glass p-6 rounded-xl mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Current Plan: {subscription.plan}</h3>
                        <p className="text-gray-400">Status: <span className="text-green-400">{subscription.status}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                          {subscription.amount}
                        </p>
                        <p className="text-sm text-gray-400">per month</p>
                      </div>
                    </div>
                    {subscription.plan !== 'Free' && (
                      <p className="text-sm text-gray-400">
                        Next billing date: {subscription.nextBilling}
                      </p>
                    )}
                  </div>

                  {/* Upgrade Plans */}
                  <h3 className="text-xl font-bold text-white mb-4">Upgrade Your Plan</h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="glass p-6 rounded-xl hover:glass-strong transition-all">
                      <h4 className="text-lg font-bold text-white mb-2">Pro</h4>
                      <p className="text-3xl font-bold text-neon-blue mb-4">$29<span className="text-sm text-gray-400">/mo</span></p>
                      <ul className="space-y-2 text-sm text-gray-400 mb-6">
                        <li>✓ Unlimited projects</li>
                        <li>✓ Custom domains</li>
                        <li>✓ Priority support</li>
                        <li>✓ Advanced AI features</li>
                      </ul>
                      <button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple py-2 rounded-lg font-semibold hover:shadow-neon-blue transition-all">
                        Upgrade
                      </button>
                    </div>

                    <div className="glass p-6 rounded-xl hover:glass-strong transition-all border-2 border-neon-purple">
                      <div className="inline-block bg-gradient-to-r from-neon-blue to-neon-purple px-3 py-1 rounded-full text-xs font-bold mb-2">
                        MOST POPULAR
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">Business</h4>
                      <p className="text-3xl font-bold text-neon-purple mb-4">$99<span className="text-sm text-gray-400">/mo</span></p>
                      <ul className="space-y-2 text-sm text-gray-400 mb-6">
                        <li>✓ Everything in Pro</li>
                        <li>✓ Team collaboration</li>
                        <li>✓ White-label exports</li>
                        <li>✓ Advanced analytics</li>
                      </ul>
                      <button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple py-2 rounded-lg font-semibold hover:shadow-neon-purple transition-all">
                        Upgrade
                      </button>
                    </div>

                    <div className="glass p-6 rounded-xl hover:glass-strong transition-all">
                      <h4 className="text-lg font-bold text-white mb-2">Enterprise</h4>
                      <p className="text-3xl font-bold text-neon-green mb-4">Custom</p>
                      <ul className="space-y-2 text-sm text-gray-400 mb-6">
                        <li>✓ Everything in Business</li>
                        <li>✓ Dedicated support</li>
                        <li>✓ Custom integrations</li>
                        <li>✓ SLA guarantees</li>
                      </ul>
                      <button className="w-full glass py-2 rounded-lg font-semibold hover:glass-strong transition-all">
                        Contact Sales
                      </button>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <h3 className="text-xl font-bold text-white mb-4">Payment Methods</h3>
                  <div className="glass p-6 rounded-xl">
                    <p className="text-gray-400">No payment methods added yet.</p>
                    <button className="mt-4 glass px-6 py-2 rounded-lg hover:glass-strong transition-all">
                      Add Payment Method
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between glass p-4 rounded-lg">
                      <div>
                        <h4 className="text-white font-semibold">Email Notifications</h4>
                        <p className="text-sm text-gray-400">Receive updates via email</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-neon-blue" />
                    </div>

                    <div className="flex items-center justify-between glass p-4 rounded-lg">
                      <div>
                        <h4 className="text-white font-semibold">Project Updates</h4>
                        <p className="text-sm text-gray-400">Get notified when projects are updated</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-neon-blue" />
                    </div>

                    <div className="flex items-center justify-between glass p-4 rounded-lg">
                      <div>
                        <h4 className="text-white font-semibold">Marketing Emails</h4>
                        <p className="text-sm text-gray-400">Receive news and promotional content</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-neon-blue" />
                    </div>

                    <div className="flex items-center justify-between glass p-4 rounded-lg">
                      <div>
                        <h4 className="text-white font-semibold">Billing Alerts</h4>
                        <p className="text-sm text-gray-400">Get notified about billing and payments</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-neon-blue" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

                  {/* Change Password */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <input
                        type="password"
                        placeholder="Current password"
                        className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                      />
                      <button className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all">
                        Update Password
                      </button>
                    </form>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Two-Factor Authentication</h3>
                    <div className="glass p-6 rounded-xl">
                      <p className="text-gray-400 mb-4">Add an extra layer of security to your account</p>
                      <button className="glass px-6 py-2 rounded-lg hover:glass-strong transition-all">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h3>
                    <div className="glass p-6 rounded-xl border border-red-500/50">
                      <h4 className="text-white font-semibold mb-2">Delete Account</h4>
                      <p className="text-gray-400 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button className="flex items-center gap-2 bg-red-500/20 px-6 py-2 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/50 text-red-400">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
