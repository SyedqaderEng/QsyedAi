'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  BellOff,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Code,
  Shield,
  GitBranch,
  Clock,
  Trash2,
  Check,
  Filter,
  Settings,
  Mail,
  MessageSquare,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  category: 'vulnerability' | 'scan' | 'integration' | 'security' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'critical',
      category: 'vulnerability',
      title: 'Critical Vulnerability Detected',
      message: 'SQL Injection vulnerability found in backend-api repository. Immediate action required.',
      timestamp: '2024-01-15T14:30:00Z',
      read: false,
      actionUrl: '/security/vulnerabilities/VULN-001',
      actionText: 'View Details',
      metadata: { severity: 'critical', cve: 'CVE-2024-1234' },
    },
    {
      id: '2',
      type: 'warning',
      category: 'scan',
      title: 'Scan Completed with Issues',
      message: 'SAST scan for frontend-app completed. Found 8 high severity issues and 23 medium severity issues.',
      timestamp: '2024-01-15T14:15:00Z',
      read: false,
      actionUrl: '/security/sast',
      actionText: 'View Results',
      metadata: { repository: 'frontend-app', findings: 31 },
    },
    {
      id: '3',
      type: 'success',
      category: 'integration',
      title: 'Integration Connected Successfully',
      message: 'GitHub integration for company/backend-api has been connected and is now actively monitoring.',
      timestamp: '2024-01-15T14:00:00Z',
      read: true,
      actionUrl: '/security/integrations',
      actionText: 'Manage Integrations',
    },
    {
      id: '4',
      type: 'critical',
      category: 'security',
      title: 'Unauthorized Access Attempt Blocked',
      message: 'Multiple failed login attempts detected from IP 185.220.100.240. Access has been temporarily blocked.',
      timestamp: '2024-01-15T13:45:00Z',
      read: false,
      actionUrl: '/security/audit',
      actionText: 'View Logs',
      metadata: { ipAddress: '185.220.100.240', attempts: 15 },
    },
    {
      id: '5',
      type: 'info',
      category: 'scan',
      title: 'Scheduled Scan Starting',
      message: 'Daily security scan for all repositories will begin in 5 minutes.',
      timestamp: '2024-01-15T13:30:00Z',
      read: true,
    },
    {
      id: '6',
      type: 'warning',
      category: 'vulnerability',
      title: 'High Severity Dependency Vulnerability',
      message: 'OpenSSL 1.1.1g has a known vulnerability (CVE-2024-5678). Update to 1.1.1w recommended.',
      timestamp: '2024-01-15T13:15:00Z',
      read: false,
      actionUrl: '/security/sca',
      actionText: 'View Details',
      metadata: { package: 'openssl', currentVersion: '1.1.1g', fixedVersion: '1.1.1w' },
    },
    {
      id: '7',
      type: 'success',
      category: 'vulnerability',
      title: 'Auto-Fix PR Merged',
      message: 'Pull request #1337 for fixing CVE-2024-1111 has been successfully merged.',
      timestamp: '2024-01-15T13:00:00Z',
      read: true,
      actionUrl: '/security/autofix',
      actionText: 'View PR',
    },
    {
      id: '8',
      type: 'info',
      category: 'system',
      title: 'Compliance Report Generated',
      message: 'SOC 2 compliance report for Q1 2024 is now available for download.',
      timestamp: '2024-01-15T12:45:00Z',
      read: true,
      actionUrl: '/security/reports',
      actionText: 'Download Report',
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30';
      case 'success':
        return 'bg-green-500/10 border-green-500/30';
      default:
        return 'bg-gray-500/10 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vulnerability':
        return <Shield className="w-4 h-4" />;
      case 'scan':
        return <Code className="w-4 h-4" />;
      case 'integration':
        return <GitBranch className="w-4 h-4" />;
      case 'security':
        return <Zap className="w-4 h-4" />;
      case 'system':
        return <Settings className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (showUnreadOnly && notification.read) return false;
    if (activeFilter !== 'all' && notification.category !== activeFilter) return false;
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <Bell className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Notifications</h1>
                <p className="text-gray-400 mt-1">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Mark All Read</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-all">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {['all', 'vulnerability', 'scan', 'integration', 'security', 'system'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                showUnreadOnly
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Unread Only</span>
            </button>
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel p-12 text-center"
            >
              <BellOff className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {showUnreadOnly
                  ? 'You have no unread notifications'
                  : 'All caught up! No notifications to show.'}
              </p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-panel p-6 border ${getTypeColor(notification.type)} ${
                  !notification.read ? 'border-l-4' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className={`text-lg font-semibold ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          {getCategoryIcon(notification.category)}
                          <span>{notification.category}</span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-all"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-gray-400 hover:text-white" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-3">{notification.message}</p>

                    {/* Metadata */}
                    {notification.metadata && Object.keys(notification.metadata).length > 0 && (
                      <div className="flex gap-3 mb-3">
                        {Object.entries(notification.metadata).map(([key, value]) => (
                          <span key={key} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                            {key}: <span className="text-white">{String(value)}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(notification.timestamp).toLocaleString()}</span>
                      </div>
                      {notification.actionUrl && notification.actionText && (
                        <a
                          href={notification.actionUrl}
                          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg text-sm font-medium transition-all"
                        >
                          {notification.actionText}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Notification Settings Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Settings className="w-6 h-6 text-purple-400" />
            Notification Preferences
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
              {[
                { id: 'email-critical', label: 'Critical vulnerabilities', checked: true },
                { id: 'email-scan', label: 'Scan completions', checked: true },
                { id: 'email-integration', label: 'Integration events', checked: false },
                { id: 'email-weekly', label: 'Weekly summary', checked: true },
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={item.checked}
                    className="w-5 h-5 rounded border-gray-600 bg-white/5 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-gray-300">{item.label}</span>
                </label>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">In-App Notifications</h3>
              {[
                { id: 'app-all', label: 'All notifications', checked: true },
                { id: 'app-mentions', label: 'Mentions and assignments', checked: true },
                { id: 'app-security', label: 'Security events', checked: true },
                { id: 'app-system', label: 'System updates', checked: false },
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={item.checked}
                    className="w-5 h-5 rounded border-gray-600 bg-white/5 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-gray-300">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all">
              Save Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
