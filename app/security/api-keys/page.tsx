'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Key,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Shield,
  Code,
} from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  expiresAt?: string;
  permissions: string[];
  status: 'active' | 'expired' | 'revoked';
  usageCount: number;
}

export default function APIKeysPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'syai_prod_EXAMPLE_KEY_DO_NOT_USE_abcd1234efgh5678ijkl',
      createdAt: '2024-01-01T00:00:00Z',
      lastUsed: '2024-01-15T14:30:00Z',
      expiresAt: '2025-01-01T00:00:00Z',
      permissions: ['read:vulnerabilities', 'write:scans', 'read:reports'],
      status: 'active',
      usageCount: 15234,
    },
    {
      id: '2',
      name: 'CI/CD Integration',
      key: 'syai_cicd_EXAMPLE_KEY_DO_NOT_USE_wxyz9876mnop5432qrst',
      createdAt: '2024-01-10T00:00:00Z',
      lastUsed: '2024-01-15T14:25:00Z',
      permissions: ['read:vulnerabilities', 'write:scans'],
      status: 'active',
      usageCount: 8932,
    },
    {
      id: '3',
      name: 'Development Testing',
      key: 'syai_test_EXAMPLE_KEY_DO_NOT_USE_demo1122aabb3344ccdd',
      createdAt: '2024-01-05T00:00:00Z',
      lastUsed: '2024-01-12T10:00:00Z',
      permissions: ['read:vulnerabilities'],
      status: 'active',
      usageCount: 452,
    },
    {
      id: '4',
      name: 'Legacy Integration',
      key: 'syai_legacy_EXAMPLE_KEY_DO_NOT_USE_old9988zzxx7766yyww',
      createdAt: '2023-06-01T00:00:00Z',
      lastUsed: '2023-12-31T23:59:59Z',
      expiresAt: '2024-01-01T00:00:00Z',
      permissions: ['read:vulnerabilities', 'write:scans', 'admin:settings'],
      status: 'expired',
      usageCount: 45621,
    },
  ]);

  const availablePermissions = [
    { id: 'read:vulnerabilities', name: 'Read Vulnerabilities', description: 'View vulnerability data' },
    { id: 'write:scans', name: 'Trigger Scans', description: 'Start security scans' },
    { id: 'read:reports', name: 'Read Reports', description: 'Access compliance reports' },
    { id: 'write:policies', name: 'Manage Policies', description: 'Create and modify policies' },
    { id: 'read:analytics', name: 'Read Analytics', description: 'View security analytics' },
    { id: 'admin:settings', name: 'Admin Settings', description: 'Full administrative access' },
  ];

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleRevealKey = (id: string) => {
    const newSet = new Set(revealedKeys);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRevealedKeys(newSet);
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString(),
      permissions: selectedPermissions,
      status: 'active',
      usageCount: 0,
    };

    setApiKeys([newKey, ...apiKeys]);
    setShowCreateModal(false);
    setNewKeyName('');
    setSelectedPermissions([]);
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.map(key =>
      key.id === id ? { ...key, status: 'revoked' as const } : key
    ));
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-500/10';
      case 'expired':
        return 'text-orange-400 bg-orange-500/10';
      case 'revoked':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const maskKey = (key: string) => {
    const prefix = key.substring(0, 8);
    const suffix = key.substring(key.length - 4);
    return `${prefix}${'•'.repeat(24)}${suffix}`;
  };

  const activeKeys = apiKeys.filter(k => k.status === 'active').length;
  const totalUsage = apiKeys.reduce((acc, k) => acc + k.usageCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                <Key className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">API Keys</h1>
                <p className="text-gray-400 mt-1">
                  Manage API keys for programmatic access
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create API Key</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Key className="w-4 h-4" />
                <span>Total Keys</span>
              </div>
              <div className="text-2xl font-bold text-white">{apiKeys.length}</div>
            </div>
            <div className="glass-panel p-4 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Active Keys</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{activeKeys}</div>
            </div>
            <div className="glass-panel p-4 border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                <Activity className="w-4 h-4" />
                <span>Total API Calls</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{totalUsage.toLocaleString()}</div>
            </div>
          </div>
        </motion.div>

        {/* API Keys List */}
        <div className="space-y-4">
          {apiKeys.map((apiKey, index) => (
            <motion.div
              key={apiKey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-panel p-6 ${apiKey.status !== 'active' ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold text-lg">{apiKey.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(apiKey.status)}`}>
                      {apiKey.status.toUpperCase()}
                    </span>
                  </div>

                  {/* API Key */}
                  <div className="glass-panel p-4 mb-4 bg-black/30">
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-gray-300 font-mono text-sm">
                        {revealedKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleRevealKey(apiKey.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-all"
                          title={revealedKeys.has(apiKey.id) ? 'Hide' : 'Reveal'}
                        >
                          {revealedKeys.has(apiKey.id) ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopyKey(apiKey.key)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-all"
                          title="Copy"
                        >
                          <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                        {copiedKey === apiKey.key && (
                          <span className="text-green-400 text-sm flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Copied!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-2">Permissions:</div>
                    <div className="flex flex-wrap gap-2">
                      {apiKey.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Created</div>
                      <div className="text-white">{new Date(apiKey.createdAt).toLocaleDateString()}</div>
                    </div>
                    {apiKey.lastUsed && (
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Last Used</div>
                        <div className="text-white">{new Date(apiKey.lastUsed).toLocaleDateString()}</div>
                      </div>
                    )}
                    {apiKey.expiresAt && (
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Expires</div>
                        <div className={`${apiKey.status === 'expired' ? 'text-orange-400' : 'text-white'}`}>
                          {new Date(apiKey.expiresAt).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Usage</div>
                      <div className="text-white">{apiKey.usageCount.toLocaleString()} calls</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {apiKey.status === 'active' && (
                    <button
                      onClick={() => handleRevokeKey(apiKey.id)}
                      className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-all"
                    >
                      Revoke
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteKey(apiKey.id)}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {apiKey.status === 'expired' && (
                <div className="flex items-center gap-2 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>This API key has expired and can no longer be used</span>
                </div>
              )}
              {apiKey.status === 'revoked' && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>This API key has been revoked</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Security Best Practices */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-6 border-blue-500/20"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            API Key Security Best Practices
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <span>Never commit API keys to version control or share them publicly</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <span>Use environment variables to store API keys in your applications</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <span>Rotate API keys regularly and revoke unused keys</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <span>Use the principle of least privilege - grant only necessary permissions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <span>Monitor API key usage and set up alerts for suspicious activity</span>
            </li>
          </ul>
        </motion.div>

        {/* Create API Key Modal */}
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-8 max-w-2xl w-full"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Create New API Key</h2>

              <div className="space-y-6">
                <div>
                  <label className="text-gray-300 font-medium mb-2 block">Key Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production API Key"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-gray-300 font-medium mb-2 block">Permissions</label>
                  <div className="space-y-2">
                    {availablePermissions.map((permission) => (
                      <label
                        key={permission.id}
                        className="flex items-start gap-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="mt-1 w-5 h-5 rounded border-gray-600 bg-white/5 text-blue-500 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="text-white font-medium">{permission.name}</div>
                          <div className="text-gray-400 text-sm">{permission.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCreateKey}
                    disabled={!newKeyName.trim() || selectedPermissions.length === 0}
                    className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create API Key
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
