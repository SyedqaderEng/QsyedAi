'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Shield, Users, Building, CheckCircle, Settings, ExternalLink } from 'lucide-react';

export default function SSOPage() {
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [provider, setProvider] = useState('');

  const providers = [
    { id: 'okta', name: 'Okta', icon: '🔐', configured: false },
    { id: 'azure', name: 'Azure AD', icon: '☁️', configured: false },
    { id: 'google', name: 'Google Workspace', icon: '🔵', configured: true },
    { id: 'onelogin', name: 'OneLogin', icon: '🔑', configured: false },
    { id: 'jumpcloud', name: 'JumpCloud', icon: '⚡', configured: false },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Key className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Single Sign-On</h1>
          </div>
          <p className="text-gray-400">Configure SSO for your organization</p>
        </motion.div>

        {/* SSO Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold">Enable SSO</h3>
                <p className="text-sm text-gray-400">Require SSO for all team members</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={ssoEnabled}
                onChange={() => setSsoEnabled(!ssoEnabled)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-500"></div>
            </label>
          </div>
        </motion.div>

        {/* Identity Providers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Identity Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((p) => (
              <div
                key={p.id}
                className={`p-4 bg-white/5 rounded-xl border transition-all cursor-pointer ${
                  provider === p.id ? 'border-purple-500' : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setProvider(p.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.icon}</span>
                    <span className="font-medium">{p.name}</span>
                  </div>
                  {p.configured ? (
                    <span className="flex items-center gap-1 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Configured
                    </span>
                  ) : (
                    <button className="text-sm text-purple-400 hover:text-purple-300">
                      Configure
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SAML Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4">SAML Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">SSO URL</label>
              <input
                type="text"
                placeholder="https://your-idp.com/sso"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Entity ID</label>
              <input
                type="text"
                placeholder="https://syedai.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">X.509 Certificate</label>
              <textarea
                placeholder="Paste your certificate here..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 font-mono text-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Service Provider Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Service Provider Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">ACS URL</span>
              <code className="text-purple-400">https://syedai.com/auth/saml/callback</code>
            </div>
            <div className="flex justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Entity ID</span>
              <code className="text-purple-400">https://syedai.com</code>
            </div>
            <div className="flex justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Metadata URL</span>
              <code className="text-purple-400">https://syedai.com/auth/saml/metadata</code>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <button className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-colors">
            Save SSO Configuration
          </button>
        </motion.div>
      </div>
    </div>
  );
}
