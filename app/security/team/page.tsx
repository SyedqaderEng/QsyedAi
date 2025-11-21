'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users, UserPlus, Shield, Crown, Eye, Trash2, Mail, Clock
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'developer' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  joinedAt: string;
  lastActive: string;
  permissions: {
    viewAlerts: boolean;
    resolveAlerts: boolean;
    managePolicies: boolean;
    manageIntegrations: boolean;
    manageTeam: boolean;
    viewReports: boolean;
  };
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@acme.com',
      role: 'owner',
      status: 'active',
      joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 60000).toISOString(),
      permissions: {
        viewAlerts: true,
        resolveAlerts: true,
        managePolicies: true,
        manageIntegrations: true,
        manageTeam: true,
        viewReports: true,
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@acme.com',
      role: 'admin',
      status: 'active',
      joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 3600000).toISOString(),
      permissions: {
        viewAlerts: true,
        resolveAlerts: true,
        managePolicies: true,
        manageIntegrations: true,
        manageTeam: false,
        viewReports: true,
      },
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@acme.com',
      role: 'developer',
      status: 'active',
      joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 7200000).toISOString(),
      permissions: {
        viewAlerts: true,
        resolveAlerts: true,
        managePolicies: false,
        manageIntegrations: false,
        manageTeam: false,
        viewReports: true,
      },
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@acme.com',
      role: 'viewer',
      status: 'active',
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 86400000).toISOString(),
      permissions: {
        viewAlerts: true,
        resolveAlerts: false,
        managePolicies: false,
        manageIntegrations: false,
        manageTeam: false,
        viewReports: true,
      },
    },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'developer' | 'viewer'>('developer');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      case 'admin': return 'bg-purple-500/20 border-purple-500/50 text-purple-400';
      case 'developer': return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      case 'viewer': return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
      default: return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'developer': return <Users className="w-4 h-4" />;
      case 'viewer': return <Eye className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const handleInvite = () => {
    if (!inviteEmail) return;

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'pending',
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      permissions: {
        viewAlerts: true,
        resolveAlerts: inviteRole !== 'viewer',
        managePolicies: inviteRole === 'admin',
        manageIntegrations: inviteRole === 'admin',
        manageTeam: false,
        viewReports: true,
      },
    };

    setMembers([...members, newMember]);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('developer');
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setMembers(members.filter(m => m.id !== memberId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 glass-strong border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Aikido Security
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/security" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/security/repositories" className="text-gray-300 hover:text-white transition-colors">Repositories</Link>
            <Link href="/security/alerts" className="text-gray-300 hover:text-white transition-colors">Alerts</Link>
            <Link href="/security/cloud" className="text-gray-300 hover:text-white transition-colors">Cloud</Link>
            <Link href="/security/team" className="text-white font-semibold">Team</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-2 text-white"
            >
              Team Management
            </motion.h1>
            <p className="text-gray-400">{members.length} team members</p>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Invite Member
          </button>
        </div>

        {/* Role Descriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass p-4 rounded-xl border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-yellow-400">Owner</h3>
            </div>
            <p className="text-xs text-gray-400">Full access to all features and billing</p>
          </div>

          <div className="glass p-4 rounded-xl border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-purple-400">Admin</h3>
            </div>
            <p className="text-xs text-gray-400">Manage policies and integrations</p>
          </div>

          <div className="glass p-4 rounded-xl border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-blue-400">Developer</h3>
            </div>
            <p className="text-xs text-gray-400">View and resolve security alerts</p>
          </div>

          <div className="glass p-4 rounded-xl border border-gray-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-400">Viewer</h3>
            </div>
            <p className="text-xs text-gray-400">Read-only access to reports</p>
          </div>
        </motion.div>

        {/* Team Members List */}
        <div className="space-y-4">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center text-xl font-bold">
                    {member.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border flex items-center gap-1 ${getRoleColor(member.role)}`}>
                        {getRoleIcon(member.role)}
                        {member.role}
                      </span>
                      {member.status === 'pending' && (
                        <span className="glass px-3 py-1 rounded text-xs text-yellow-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Pending Invite
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 mb-4 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </p>

                    {/* Permissions */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {member.permissions.viewAlerts && (
                        <span className="glass px-3 py-1 rounded text-xs text-gray-300">✓ View Alerts</span>
                      )}
                      {member.permissions.resolveAlerts && (
                        <span className="glass px-3 py-1 rounded text-xs text-gray-300">✓ Resolve Issues</span>
                      )}
                      {member.permissions.managePolicies && (
                        <span className="glass px-3 py-1 rounded text-xs text-gray-300">✓ Manage Policies</span>
                      )}
                      {member.permissions.manageIntegrations && (
                        <span className="glass px-3 py-1 rounded text-xs text-gray-300">✓ Integrations</span>
                      )}
                      {member.permissions.manageTeam && (
                        <span className="glass px-3 py-1 rounded text-xs text-gray-300">✓ Manage Team</span>
                      )}
                      {member.permissions.viewReports && (
                        <span className="glass px-3 py-1 rounded text-xs text-gray-300">✓ View Reports</span>
                      )}
                    </div>

                    {/* Activity */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Last active {new Date(member.lastActive).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {member.role !== 'owner' && (
                  <div className="flex items-center gap-2">
                    <button className="glass px-4 py-2 rounded-lg hover:glass-strong transition-all">
                      Edit Role
                    </button>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="glass p-2 rounded-lg hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setShowInviteModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong p-8 rounded-2xl max-w-lg w-full"
          >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Invite Team Member
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'admin' | 'developer' | 'viewer')}
                  className="w-full glass px-4 py-3 rounded-lg text-white outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="developer">Developer</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleInvite}
                className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
              >
                Send Invite
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 glass py-3 rounded-lg hover:glass-strong transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
