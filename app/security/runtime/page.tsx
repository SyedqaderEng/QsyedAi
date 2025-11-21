'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, Shield, Activity, Zap, AlertTriangle, TrendingUp,
  Globe, Code, Database, Lock, Eye, XCircle
} from 'lucide-react';

interface RuntimeEvent {
  id: string;
  type: 'sql-injection' | 'xss' | 'path-traversal' | 'command-injection' | 'auth-bypass' | 'ddos';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'blocked' | 'detected' | 'monitoring';
  source: {
    ip: string;
    country: string;
    userAgent: string;
  };
  target: {
    endpoint: string;
    method: string;
    service: string;
  };
  payload: string;
  timestamp: string;
  blocked: boolean;
}

interface AgentStatus {
  id: string;
  service: string;
  host: string;
  status: 'healthy' | 'degraded' | 'offline';
  version: string;
  eventsBlocked: number;
  lastHeartbeat: string;
  cpu: number;
  memory: number;
}

export default function RuntimeSecurityPage() {
  const [events, setEvents] = useState<RuntimeEvent[]>([
    {
      id: '1',
      type: 'sql-injection',
      severity: 'critical',
      status: 'blocked',
      source: {
        ip: '203.0.113.45',
        country: 'Unknown',
        userAgent: 'curl/7.68.0',
      },
      target: {
        endpoint: '/api/users',
        method: 'POST',
        service: 'user-service',
      },
      payload: "admin' OR '1'='1",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      blocked: true,
    },
    {
      id: '2',
      type: 'xss',
      severity: 'high',
      status: 'blocked',
      source: {
        ip: '198.51.100.23',
        country: 'Russia',
        userAgent: 'Mozilla/5.0',
      },
      target: {
        endpoint: '/api/comments',
        method: 'POST',
        service: 'api-gateway',
      },
      payload: '<script>alert("XSS")</script>',
      timestamp: new Date(Date.now() - 180000).toISOString(),
      blocked: true,
    },
    {
      id: '3',
      type: 'path-traversal',
      severity: 'high',
      status: 'blocked',
      source: {
        ip: '192.0.2.67',
        country: 'China',
        userAgent: 'python-requests/2.28.0',
      },
      target: {
        endpoint: '/api/files',
        method: 'GET',
        service: 'file-service',
      },
      payload: '../../../etc/passwd',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      blocked: true,
    },
    {
      id: '4',
      type: 'auth-bypass',
      severity: 'critical',
      status: 'detected',
      source: {
        ip: '203.0.113.89',
        country: 'Brazil',
        userAgent: 'PostmanRuntime/7.29.2',
      },
      target: {
        endpoint: '/admin/dashboard',
        method: 'GET',
        service: 'admin-service',
      },
      payload: 'JWT token manipulation attempt',
      timestamp: new Date(Date.now() - 60000).toISOString(),
      blocked: false,
    },
    {
      id: '5',
      type: 'ddos',
      severity: 'medium',
      status: 'monitoring',
      source: {
        ip: '198.51.100.99',
        country: 'Ukraine',
        userAgent: 'Custom Bot',
      },
      target: {
        endpoint: '/api/search',
        method: 'GET',
        service: 'search-service',
      },
      payload: '450 requests in 10 seconds',
      timestamp: new Date(Date.now() - 30000).toISOString(),
      blocked: false,
    },
  ]);

  const [agents, setAgents] = useState<AgentStatus[]>([
    {
      id: '1',
      service: 'user-service',
      host: 'prod-us-east-1a',
      status: 'healthy',
      version: '1.2.3',
      eventsBlocked: 142,
      lastHeartbeat: new Date(Date.now() - 5000).toISOString(),
      cpu: 23,
      memory: 45,
    },
    {
      id: '2',
      service: 'api-gateway',
      host: 'prod-us-east-1b',
      status: 'healthy',
      version: '1.2.3',
      eventsBlocked: 89,
      lastHeartbeat: new Date(Date.now() - 8000).toISOString(),
      cpu: 18,
      memory: 38,
    },
    {
      id: '3',
      service: 'file-service',
      host: 'prod-us-west-2a',
      status: 'degraded',
      version: '1.2.2',
      eventsBlocked: 67,
      lastHeartbeat: new Date(Date.now() - 45000).toISOString(),
      cpu: 78,
      memory: 92,
    },
    {
      id: '4',
      service: 'admin-service',
      host: 'prod-eu-west-1a',
      status: 'healthy',
      version: '1.2.3',
      eventsBlocked: 23,
      lastHeartbeat: new Date(Date.now() - 3000).toISOString(),
      cpu: 12,
      memory: 28,
    },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default: return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'text-green-400';
      case 'detected': return 'text-yellow-400';
      case 'monitoring': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAttackIcon = (type: string) => {
    switch (type) {
      case 'sql-injection': return <Database className="w-4 h-4" />;
      case 'xss': return <Code className="w-4 h-4" />;
      case 'path-traversal': return <Globe className="w-4 h-4" />;
      case 'command-injection': return <Zap className="w-4 h-4" />;
      case 'auth-bypass': return <Lock className="w-4 h-4" />;
      case 'ddos': return <Activity className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const stats = {
    totalEvents: events.length,
    blocked: events.filter(e => e.blocked).length,
    critical: events.filter(e => e.severity === 'critical').length,
    activeAgents: agents.filter(a => a.status === 'healthy').length,
    totalAgents: agents.length,
    totalBlocked: agents.reduce((acc, a) => acc + a.eventsBlocked, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className="relative z-10 glass-strong border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/security" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Security
          </Link>
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Syed.AI Security
          </Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2 text-white flex items-center gap-3"
          >
            <Shield className="w-10 h-10 text-neon-blue" />
            Runtime Security (Zen)
          </motion.h1>
          <p className="text-gray-400">Real-time attack detection and prevention</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{stats.totalEvents}</div>
            <div className="text-xs text-gray-400">Events (1h)</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-4 rounded-xl border border-green-500/30">
            <div className="text-2xl font-bold text-green-400 mb-1">{stats.blocked}</div>
            <div className="text-xs text-gray-400">Blocked</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-4 rounded-xl border border-red-500/30">
            <div className="text-2xl font-bold text-red-400 mb-1">{stats.critical}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-4 rounded-xl">
            <div className="text-2xl font-bold text-white mb-1">{stats.totalBlocked}</div>
            <div className="text-xs text-gray-400">Total Blocked</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-4 rounded-xl border border-neon-blue/30">
            <div className="text-2xl font-bold text-neon-blue mb-1">{stats.activeAgents}/{stats.totalAgents}</div>
            <div className="text-xs text-gray-400">Agents Active</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass p-4 rounded-xl border border-neon-purple/30">
            <div className="text-2xl font-bold text-neon-purple mb-1">99.8%</div>
            <div className="text-xs text-gray-400">Protection Rate</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Real-time Events */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-neon-yellow" />
                  Real-time Attack Feed
                </h2>
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Live
                </div>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {events.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`glass p-4 rounded-lg border ${getSeverityColor(event.severity)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`glass p-2 rounded ${getSeverityColor(event.severity)}`}>
                          {getAttackIcon(event.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white capitalize">
                              {event.type.replace('-', ' ')}
                            </span>
                            <span className={`text-xs font-bold ${getStatusColor(event.status)}`}>
                              {event.blocked ? '🛡️ BLOCKED' : '👁️ DETECTED'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{event.source.ip}</span>
                            <span>•</span>
                            <span>{event.source.country}</span>
                            <span>•</span>
                            <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </span>
                    </div>

                    <div className="glass p-3 rounded mb-3">
                      <div className="flex items-center justify-between mb-2 text-xs">
                        <span className="text-gray-400">Target</span>
                        <span className="text-gray-300 font-mono">{event.target.method} {event.target.endpoint}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Service</span>
                        <span className="text-white">{event.target.service}</span>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 p-2 rounded">
                      <p className="text-xs text-gray-400 mb-1">Payload:</p>
                      <p className="text-xs font-mono text-red-300">{event.payload}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Agent Status */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong p-6 rounded-2xl mb-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-neon-green" />
                Agent Health
              </h2>

              <div className="space-y-3">
                {agents.map((agent, idx) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-white text-sm">{agent.service}</h3>
                        <p className="text-xs text-gray-500">{agent.host}</p>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${getAgentStatusColor(agent.status)}`}>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                        <span className="capitalize">{agent.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                      <div>
                        <p className="text-gray-500">CPU</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full ${agent.cpu > 70 ? 'bg-red-400' : 'bg-green-400'}`}
                              style={{ width: `${agent.cpu}%` }}
                            ></div>
                          </div>
                          <span className="text-white">{agent.cpu}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500">Memory</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-1">
                            <div
                              className={`h-1 rounded-full ${agent.memory > 80 ? 'bg-red-400' : 'bg-green-400'}`}
                              style={{ width: `${agent.memory}%` }}
                            ></div>
                          </div>
                          <span className="text-white">{agent.memory}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>v{agent.version}</span>
                      <span>{agent.eventsBlocked} blocked</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Attack Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neon-purple" />
                Top Attack Vectors
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">SQL Injection</span>
                  <span className="text-sm font-bold text-red-400">38%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">XSS</span>
                  <span className="text-sm font-bold text-orange-400">24%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Path Traversal</span>
                  <span className="text-sm font-bold text-yellow-400">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Auth Bypass</span>
                  <span className="text-sm font-bold text-blue-400">12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">DDoS</span>
                  <span className="text-sm font-bold text-purple-400">8%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-neon-blue" />
            Protection Rules
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-white">Detection Rules</h3>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300 text-sm">SQL Injection</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300 text-sm">XSS Attacks</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300 text-sm">Path Traversal</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300 text-sm">Command Injection</span>
              </label>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-white">Response Actions</h3>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300 text-sm">Auto-block malicious IPs</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300 text-sm">Rate limiting</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-300 text-sm">Alert on detection</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300 text-sm">Log all events</span>
              </label>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-white">Advanced Settings</h3>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300 text-sm">Machine learning detection</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-300 text-sm">Geo-blocking</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-300 text-sm">Custom WAF rules</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-300 text-sm">Threat intelligence feed</span>
              </label>
            </div>
          </div>

          <button className="mt-6 bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all">
            Update Rules
          </button>
        </motion.div>
      </div>
    </div>
  );
}
