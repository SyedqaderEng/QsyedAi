'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  Key,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Clock,
  Activity,
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: Permission[];
  builtIn: boolean;
  createdAt: string;
  lastModified: string;
}

interface Permission {
  id: string;
  category: string;
  name: string;
  description: string;
  granted: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended' | 'pending';
  lastActive: string;
  mfaEnabled: boolean;
  apiKeyCount: number;
}

interface AccessLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  result: 'success' | 'denied' | 'failed';
  timestamp: string;
  ipAddress: string;
}

export default function AccessControlPage() {
  const [activeTab, setActiveTab] = useState<'roles' | 'users' | 'permissions' | 'logs'>('roles');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Owner',
      description: 'Full administrative access to all features and settings',
      users: 2,
      permissions: [],
      builtIn: true,
      createdAt: '2024-01-01T00:00:00Z',
      lastModified: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access with some restrictions',
      users: 5,
      permissions: [],
      builtIn: true,
      createdAt: '2024-01-01T00:00:00Z',
      lastModified: '2024-01-10T00:00:00Z',
    },
    {
      id: '3',
      name: 'Security Engineer',
      description: 'Can view and manage security findings, configure scans',
      users: 12,
      permissions: [],
      builtIn: false,
      createdAt: '2024-01-05T00:00:00Z',
      lastModified: '2024-01-12T00:00:00Z',
    },
    {
      id: '4',
      name: 'Developer',
      description: 'Can view findings and create pull requests',
      users: 45,
      permissions: [],
      builtIn: false,
      createdAt: '2024-01-05T00:00:00Z',
      lastModified: '2024-01-08T00:00:00Z',
    },
    {
      id: '5',
      name: 'Auditor',
      description: 'Read-only access to reports and compliance data',
      users: 3,
      permissions: [],
      builtIn: false,
      createdAt: '2024-01-06T00:00:00Z',
      lastModified: '2024-01-06T00:00:00Z',
    },
  ]);

  const [permissions] = useState<Permission[]>([
    // Scanning Permissions
    { id: '1', category: 'Scanning', name: 'Trigger Scans', description: 'Manually trigger security scans', granted: true },
    { id: '2', category: 'Scanning', name: 'Configure Scan Settings', description: 'Modify scan configurations', granted: true },
    { id: '3', category: 'Scanning', name: 'View Scan Results', description: 'Access scan results and findings', granted: true },
    { id: '4', category: 'Scanning', name: 'Delete Scan History', description: 'Remove historical scan data', granted: false },

    // Vulnerabilities
    { id: '5', category: 'Vulnerabilities', name: 'View Vulnerabilities', description: 'See security vulnerabilities', granted: true },
    { id: '6', category: 'Vulnerabilities', name: 'Triage Vulnerabilities', description: 'Mark as false positive, resolved, etc.', granted: true },
    { id: '7', category: 'Vulnerabilities', name: 'Request Auto-fix', description: 'Generate auto-fix pull requests', granted: true },
    { id: '8', category: 'Vulnerabilities', name: 'Override Severity', description: 'Change vulnerability severity levels', granted: false },

    // Integrations
    { id: '9', category: 'Integrations', name: 'View Integrations', description: 'See connected integrations', granted: true },
    { id: '10', category: 'Integrations', name: 'Manage Integrations', description: 'Connect and configure integrations', granted: true },
    { id: '11', category: 'Integrations', name: 'Delete Integrations', description: 'Remove integration connections', granted: false },

    // Team Management
    { id: '12', category: 'Team', name: 'View Team', description: 'See team members', granted: true },
    { id: '13', category: 'Team', name: 'Invite Members', description: 'Send team invitations', granted: true },
    { id: '14', category: 'Team', name: 'Manage Roles', description: 'Assign and modify user roles', granted: false },
    { id: '15', category: 'Team', name: 'Remove Members', description: 'Delete team members', granted: false },

    // Policies & Rules
    { id: '16', category: 'Policies', name: 'View Policies', description: 'See security policies', granted: true },
    { id: '17', category: 'Policies', name: 'Create Policies', description: 'Define new security policies', granted: true },
    { id: '18', category: 'Policies', name: 'Modify Policies', description: 'Edit existing policies', granted: true },
    { id: '19', category: 'Policies', name: 'Delete Policies', description: 'Remove policies', granted: false },

    // Reporting
    { id: '20', category: 'Reporting', name: 'View Reports', description: 'Access security reports', granted: true },
    { id: '21', category: 'Reporting', name: 'Export Reports', description: 'Download reports as PDF/CSV', granted: true },
    { id: '22', category: 'Reporting', name: 'Schedule Reports', description: 'Set up automated report generation', granted: false },

    // Billing & Settings
    { id: '23', category: 'Settings', name: 'View Settings', description: 'See organization settings', granted: true },
    { id: '24', category: 'Settings', name: 'Modify Settings', description: 'Change organization settings', granted: false },
    { id: '25', category: 'Settings', name: 'Manage Billing', description: 'Update billing and subscription', granted: false },
    { id: '26', category: 'Settings', name: 'Delete Organization', description: 'Permanently delete organization', granted: false },
  ]);

  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Owner',
      status: 'active',
      lastActive: '2 minutes ago',
      mfaEnabled: true,
      apiKeyCount: 3,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Admin',
      status: 'active',
      lastActive: '10 minutes ago',
      mfaEnabled: true,
      apiKeyCount: 2,
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob.wilson@company.com',
      role: 'Security Engineer',
      status: 'active',
      lastActive: '1 hour ago',
      mfaEnabled: true,
      apiKeyCount: 1,
    },
    {
      id: '4',
      name: 'Alice Johnson',
      email: 'alice.johnson@company.com',
      role: 'Developer',
      status: 'active',
      lastActive: '3 hours ago',
      mfaEnabled: false,
      apiKeyCount: 0,
    },
    {
      id: '5',
      name: 'Charlie Brown',
      email: 'charlie.brown@company.com',
      role: 'Developer',
      status: 'suspended',
      lastActive: '2 days ago',
      mfaEnabled: false,
      apiKeyCount: 0,
    },
  ]);

  const [accessLogs] = useState<AccessLog[]>([
    {
      id: '1',
      user: 'john.doe@company.com',
      action: 'Triggered SAST scan',
      resource: 'frontend-app',
      result: 'success',
      timestamp: '2024-01-15T14:30:00Z',
      ipAddress: '203.0.113.45',
    },
    {
      id: '2',
      user: 'jane.smith@company.com',
      action: 'Modified firewall rule',
      resource: 'prod-firewall',
      result: 'success',
      timestamp: '2024-01-15T14:25:00Z',
      ipAddress: '198.51.100.89',
    },
    {
      id: '3',
      user: 'charlie.brown@company.com',
      action: 'Attempted to delete user',
      resource: 'user:alice.johnson',
      result: 'denied',
      timestamp: '2024-01-15T14:20:00Z',
      ipAddress: '192.0.2.123',
    },
    {
      id: '4',
      user: 'bob.wilson@company.com',
      action: 'Created security policy',
      resource: 'auto-triage-high-severity',
      result: 'success',
      timestamp: '2024-01-15T14:15:00Z',
      ipAddress: '203.0.113.67',
    },
    {
      id: '5',
      user: 'unknown@external.com',
      action: 'Login attempt',
      resource: 'authentication',
      result: 'failed',
      timestamp: '2024-01-15T14:10:00Z',
      ipAddress: '198.51.100.200',
    },
  ]);

  const permissionsByCategory = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  const activeUsers = users.filter(u => u.status === 'active').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;
  const mfaEnabledUsers = users.filter(u => u.mfaEnabled).length;
  const deniedActions = accessLogs.filter(l => l.result === 'denied').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Access Control & RBAC</h1>
                <p className="text-gray-400 mt-1">
                  Role-based access control and permissions management
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
              <UserPlus className="w-5 h-5" />
              <span>Invite User</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4">
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Users className="w-4 h-4" />
                <span>Total Users</span>
              </div>
              <div className="text-2xl font-bold text-white">{users.length}</div>
            </div>
            <div className="glass-panel p-4 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Active</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{activeUsers}</div>
            </div>
            <div className="glass-panel p-4 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <XCircle className="w-4 h-4" />
                <span>Suspended</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{suspendedUsers}</div>
            </div>
            <div className="glass-panel p-4 border-blue-500/20">
              <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                <Lock className="w-4 h-4" />
                <span>MFA Enabled</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{mfaEnabledUsers}</div>
            </div>
            <div className="glass-panel p-4 border-orange-500/20">
              <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Denied Actions</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">{deniedActions}</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10">
          {(['roles', 'users', 'permissions', 'logs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-6"
          >
            {roles.map((role) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                      <Key className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold text-lg">{role.name}</h3>
                        {role.builtIn && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                            Built-in
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{role.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{role.users} users</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Modified {new Date(role.lastModified).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    {!role.builtIn && (
                      <>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {users.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-panel p-6 ${user.status === 'suspended' ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-semibold">{user.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          user.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {user.status}
                        </span>
                        {user.mfaEnabled ? (
                          <span className="flex items-center gap-1 text-green-400 text-xs">
                            <Lock className="w-3 h-3" />
                            MFA
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-orange-400 text-xs">
                            <Unlock className="w-3 h-3" />
                            No MFA
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span>{user.email}</span>
                        <span>Role: <span className="text-purple-400">{user.role}</span></span>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span>Last active: {user.lastActive}</span>
                        </div>
                        <span>{user.apiKeyCount} API keys</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-all">
                      Edit
                    </button>
                    {user.status === 'active' ? (
                      <button className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg text-sm transition-all">
                        Suspend
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm transition-all">
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6 mb-4">
              <h3 className="text-white font-semibold mb-4">Viewing permissions for:</h3>
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none">
                <option>Security Engineer</option>
                <option>Developer</option>
                <option>Auditor</option>
              </select>
            </div>

            {Object.entries(permissionsByCategory).map(([category, perms]) => (
              <div key={category} className="glass-panel p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-purple-400" />
                  {category}
                </h3>
                <div className="space-y-3">
                  {perms.map((perm) => (
                    <div key={perm.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <div className="text-white font-medium mb-1">{perm.name}</div>
                        <div className="text-gray-400 text-sm">{perm.description}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        {perm.granted ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-600" />
                        )}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={perm.granted} className="sr-only peer" readOnly />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Access Logs Tab */}
        {activeTab === 'logs' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {accessLogs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-panel p-6 ${log.result === 'denied' ? 'border-red-500/30' : log.result === 'failed' ? 'border-orange-500/30' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="text-gray-400 text-sm w-32">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">{log.action}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>User: <span className="text-purple-400">{log.user}</span></span>
                        <span>Resource: <code className="text-blue-400">{log.resource}</code></span>
                        <span>IP: <code className="text-cyan-400">{log.ipAddress}</code></span>
                      </div>
                    </div>
                    <div>
                      {log.result === 'success' ? (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                          Success
                        </span>
                      ) : log.result === 'denied' ? (
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Denied
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium">
                          Failed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
