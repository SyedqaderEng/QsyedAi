'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Network,
  Shield,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Activity,
  Globe,
  Server,
  Wifi,
  Eye,
  EyeOff,
  Filter,
  TrendingUp,
  Zap,
  Cloud,
} from 'lucide-react';

interface NetworkRule {
  id: string;
  name: string;
  type: 'allow' | 'deny';
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'ALL';
  source: string;
  destination: string;
  port: string;
  action: string;
  priority: number;
  enabled: boolean;
  hitCount: number;
  lastHit: string;
}

interface OpenPort {
  id: string;
  port: number;
  protocol: 'TCP' | 'UDP';
  service: string;
  status: 'open' | 'filtered' | 'closed';
  risk: 'critical' | 'high' | 'medium' | 'low';
  publiclyAccessible: boolean;
  process: string;
  host: string;
}

interface NetworkSegment {
  id: string;
  name: string;
  cidr: string;
  type: 'public' | 'private' | 'dmz' | 'management';
  hosts: number;
  isolation: 'full' | 'partial' | 'none';
  encryption: boolean;
  monitoring: boolean;
}

interface TrafficLog {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  port: number;
  protocol: string;
  bytes: number;
  packets: number;
  action: 'allowed' | 'blocked' | 'monitored';
  threat: boolean;
}

export default function NetworkSecurityPage() {
  const [activeTab, setActiveTab] = useState<'firewall' | 'ports' | 'segments' | 'traffic'>('firewall');
  const [showBlocked, setShowBlocked] = useState(false);

  const [firewallRules] = useState<NetworkRule[]>([
    {
      id: '1',
      name: 'Allow HTTPS from Internet',
      type: 'allow',
      protocol: 'TCP',
      source: '0.0.0.0/0',
      destination: '10.0.1.0/24',
      port: '443',
      action: 'ACCEPT',
      priority: 100,
      enabled: true,
      hitCount: 45832,
      lastHit: '2 minutes ago',
    },
    {
      id: '2',
      name: 'Block SSH from Public',
      type: 'deny',
      protocol: 'TCP',
      source: '0.0.0.0/0',
      destination: '*',
      port: '22',
      action: 'DROP',
      priority: 50,
      enabled: true,
      hitCount: 1247,
      lastHit: '5 minutes ago',
    },
    {
      id: '3',
      name: 'Allow Internal Database Access',
      type: 'allow',
      protocol: 'TCP',
      source: '10.0.1.0/24',
      destination: '10.0.2.0/24',
      port: '5432',
      action: 'ACCEPT',
      priority: 200,
      enabled: true,
      hitCount: 23456,
      lastHit: '1 minute ago',
    },
    {
      id: '4',
      name: 'Deny All Outbound to Tor Nodes',
      type: 'deny',
      protocol: 'ALL',
      source: '*',
      destination: 'tor-exit-nodes',
      port: '*',
      action: 'REJECT',
      priority: 10,
      enabled: true,
      hitCount: 89,
      lastHit: '1 hour ago',
    },
    {
      id: '5',
      name: 'Allow DNS Queries',
      type: 'allow',
      protocol: 'UDP',
      source: '10.0.0.0/16',
      destination: '8.8.8.8',
      port: '53',
      action: 'ACCEPT',
      priority: 150,
      enabled: true,
      hitCount: 98765,
      lastHit: '30 seconds ago',
    },
  ]);

  const [openPorts] = useState<OpenPort[]>([
    {
      id: '1',
      port: 22,
      protocol: 'TCP',
      service: 'SSH',
      status: 'open',
      risk: 'critical',
      publiclyAccessible: true,
      process: 'sshd',
      host: 'web-server-01',
    },
    {
      id: '2',
      port: 3389,
      protocol: 'TCP',
      service: 'RDP',
      status: 'open',
      risk: 'critical',
      publiclyAccessible: true,
      process: 'rdp',
      host: 'admin-server',
    },
    {
      id: '3',
      port: 443,
      protocol: 'TCP',
      service: 'HTTPS',
      status: 'open',
      risk: 'low',
      publiclyAccessible: true,
      process: 'nginx',
      host: 'web-server-01',
    },
    {
      id: '4',
      port: 5432,
      protocol: 'TCP',
      service: 'PostgreSQL',
      status: 'open',
      risk: 'high',
      publiclyAccessible: false,
      process: 'postgres',
      host: 'db-server-01',
    },
    {
      id: '5',
      port: 6379,
      protocol: 'TCP',
      service: 'Redis',
      status: 'open',
      risk: 'medium',
      publiclyAccessible: false,
      process: 'redis-server',
      host: 'cache-server',
    },
    {
      id: '6',
      port: 27017,
      protocol: 'TCP',
      service: 'MongoDB',
      status: 'open',
      risk: 'high',
      publiclyAccessible: true,
      process: 'mongod',
      host: 'db-server-02',
    },
  ]);

  const [segments] = useState<NetworkSegment[]>([
    {
      id: '1',
      name: 'Public Web Tier',
      cidr: '10.0.1.0/24',
      type: 'public',
      hosts: 12,
      isolation: 'partial',
      encryption: true,
      monitoring: true,
    },
    {
      id: '2',
      name: 'Application Tier',
      cidr: '10.0.2.0/24',
      type: 'private',
      hosts: 45,
      isolation: 'full',
      encryption: true,
      monitoring: true,
    },
    {
      id: '3',
      name: 'Database Tier',
      cidr: '10.0.3.0/24',
      type: 'private',
      hosts: 8,
      isolation: 'full',
      encryption: true,
      monitoring: true,
    },
    {
      id: '4',
      name: 'DMZ',
      cidr: '10.0.10.0/24',
      type: 'dmz',
      hosts: 6,
      isolation: 'partial',
      encryption: true,
      monitoring: true,
    },
    {
      id: '5',
      name: 'Management Network',
      cidr: '10.0.100.0/24',
      type: 'management',
      hosts: 3,
      isolation: 'full',
      encryption: true,
      monitoring: true,
    },
  ]);

  const [trafficLogs] = useState<TrafficLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15T14:30:45Z',
      source: '203.0.113.45',
      destination: '10.0.1.10:443',
      port: 443,
      protocol: 'HTTPS',
      bytes: 45678,
      packets: 234,
      action: 'allowed',
      threat: false,
    },
    {
      id: '2',
      timestamp: '2024-01-15T14:30:42Z',
      source: '198.51.100.89',
      destination: '10.0.1.10:22',
      port: 22,
      protocol: 'SSH',
      bytes: 1234,
      packets: 12,
      action: 'blocked',
      threat: true,
    },
    {
      id: '3',
      timestamp: '2024-01-15T14:30:38Z',
      source: '10.0.1.15',
      destination: '10.0.3.5:5432',
      port: 5432,
      protocol: 'PostgreSQL',
      bytes: 98765,
      packets: 456,
      action: 'allowed',
      threat: false,
    },
    {
      id: '4',
      timestamp: '2024-01-15T14:30:35Z',
      source: '192.0.2.123',
      destination: '10.0.1.10:3389',
      port: 3389,
      protocol: 'RDP',
      bytes: 567,
      packets: 8,
      action: 'blocked',
      threat: true,
    },
    {
      id: '5',
      timestamp: '2024-01-15T14:30:30Z',
      source: '10.0.2.20',
      destination: '8.8.8.8:53',
      port: 53,
      protocol: 'DNS',
      bytes: 234,
      packets: 2,
      action: 'allowed',
      threat: false,
    },
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'high':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getSegmentTypeColor = (type: string) => {
    switch (type) {
      case 'public':
        return 'text-orange-400 bg-orange-500/10';
      case 'private':
        return 'text-green-400 bg-green-500/10';
      case 'dmz':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'management':
        return 'text-purple-400 bg-purple-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const criticalPorts = openPorts.filter(p => p.risk === 'critical' && p.publiclyAccessible).length;
  const totalRules = firewallRules.length;
  const activeRules = firewallRules.filter(r => r.enabled).length;
  const blockedConnections = trafficLogs.filter(t => t.action === 'blocked').length;
  const threatDetections = trafficLogs.filter(t => t.threat).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/20 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl border border-green-500/30">
                <Network className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Network Security</h1>
                <p className="text-gray-400 mt-1">
                  Firewall rules, port scanning, and network segmentation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-sm">Real-time Monitoring</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4">
            <div className="glass-panel p-4 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Critical Ports</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{criticalPorts}</div>
            </div>
            <div className="glass-panel p-4 border-blue-500/20">
              <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                <Shield className="w-4 h-4" />
                <span>Firewall Rules</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{totalRules}</div>
            </div>
            <div className="glass-panel p-4 border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Active Rules</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{activeRules}</div>
            </div>
            <div className="glass-panel p-4 border-orange-500/20">
              <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
                <Zap className="w-4 h-4" />
                <span>Blocked Today</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">{blockedConnections}</div>
            </div>
            <div className="glass-panel p-4 border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                <Eye className="w-4 h-4" />
                <span>Threats Detected</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{threatDetections}</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10">
          {(['firewall', 'ports', 'segments', 'traffic'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === tab
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Firewall Rules Tab */}
        {activeTab === 'firewall' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {firewallRules.map((rule) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-panel p-6 ${rule.type === 'deny' ? 'border-red-500/20' : 'border-green-500/20'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {rule.type === 'allow' ? (
                      <Shield className="w-6 h-6 text-green-400 mt-1" />
                    ) : (
                      <Shield className="w-6 h-6 text-red-400 mt-1" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold text-lg">{rule.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rule.type === 'allow' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {rule.type.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                          Priority: {rule.priority}
                        </span>
                        {rule.enabled ? (
                          <span className="flex items-center gap-1 text-green-400 text-xs">
                            <CheckCircle className="w-3 h-3" />
                            Enabled
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-400 text-xs">
                            <EyeOff className="w-3 h-3" />
                            Disabled
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Protocol</div>
                          <code className="text-purple-400 font-medium">{rule.protocol}</code>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Source</div>
                          <code className="text-blue-400 text-sm">{rule.source}</code>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Destination</div>
                          <code className="text-blue-400 text-sm">{rule.destination}</code>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Port</div>
                          <code className="text-orange-400 font-medium">{rule.port}</code>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span>{rule.hitCount.toLocaleString()} hits</span>
                        </div>
                        <span>Last hit: {rule.lastHit}</span>
                        <span>Action: <code className="text-white">{rule.action}</code></span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-all">
                    Edit Rule
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Open Ports Tab */}
        {activeTab === 'ports' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {openPorts.map((port) => (
              <motion.div
                key={port.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-panel p-6 border ${port.risk === 'critical' ? 'border-red-500/30' : 'border-white/10'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-cyan-500/10 rounded-xl">
                      <Server className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-white font-semibold text-lg">
                          Port {port.port} - {port.service}
                        </h3>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getRiskColor(port.risk)}`}>
                          {port.risk.toUpperCase()}
                        </span>
                        {port.publiclyAccessible ? (
                          <div className="flex items-center gap-1 text-orange-400 text-sm">
                            <Globe className="w-4 h-4" />
                            <span>Publicly Accessible</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-green-400 text-sm">
                            <Lock className="w-4 h-4" />
                            <span>Internal Only</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Protocol</div>
                          <code className="text-purple-400">{port.protocol}</code>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Status</div>
                          <span className={`${port.status === 'open' ? 'text-green-400' : 'text-gray-400'}`}>
                            {port.status}
                          </span>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Process</div>
                          <code className="text-blue-400 text-sm">{port.process}</code>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-xs mb-1">Host</div>
                          <span className="text-white text-sm">{port.host}</span>
                        </div>
                      </div>

                      {port.risk === 'critical' && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="flex items-center gap-2 text-red-400 text-sm">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-medium">Security Risk:</span>
                            <span>
                              {port.service} should not be exposed to the internet. Restrict access immediately.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all">
                    Block Port
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Network Segments Tab */}
        {activeTab === 'segments' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-6"
          >
            {segments.map((segment) => (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl">
                    <Wifi className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{segment.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSegmentTypeColor(segment.type)}`}>
                        {segment.type.toUpperCase()}
                      </span>
                      <code className="text-blue-400 text-sm">{segment.cidr}</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400 text-sm">Hosts</span>
                    <span className="text-white font-medium">{segment.hosts}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400 text-sm">Isolation</span>
                    <span className={`font-medium ${
                      segment.isolation === 'full' ? 'text-green-400' :
                      segment.isolation === 'partial' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {segment.isolation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400 text-sm">Encryption</span>
                    {segment.encryption ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400 text-sm">Monitoring</span>
                    {segment.monitoring ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Traffic Logs Tab */}
        {activeTab === 'traffic' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setShowBlocked(!showBlocked)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showBlocked
                    ? 'bg-red-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Show Blocked Only
              </button>
            </div>

            {trafficLogs
              .filter(log => !showBlocked || log.action === 'blocked')
              .map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass-panel p-6 ${log.threat ? 'border-red-500/30' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="text-gray-400 text-sm">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-blue-400">{log.source}</code>
                        <span className="text-gray-500">→</span>
                        <code className="text-purple-400">{log.destination}</code>
                      </div>
                      <span className="text-gray-400 text-sm">{log.protocol}</span>
                      <span className="text-gray-400 text-sm">
                        {(log.bytes / 1024).toFixed(2)} KB ({log.packets} packets)
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        log.action === 'allowed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {log.action.toUpperCase()}
                      </span>
                      {log.threat && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                          THREAT
                        </span>
                      )}
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
