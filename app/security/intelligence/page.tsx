'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Zap,
  Eye,
  Shield,
  Target,
  Globe,
  Activity,
  Flame,
  Clock,
  ExternalLink,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface ThreatIntel {
  id: string;
  cve: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvss: number;
  description: string;
  exploited: boolean;
  zeroDay: boolean;
  trending: boolean;
  affectedProducts: string[];
  threatActors: string[];
  firstSeen: string;
  lastSeen: string;
  exploitAvailable: boolean;
  exploitComplexity: 'low' | 'medium' | 'high';
  patchAvailable: boolean;
  references: string[];
  attackVector: string;
  impactedAssets: number;
}

interface ThreatActor {
  id: string;
  name: string;
  type: 'nation-state' | 'cybercrime' | 'hacktivist' | 'insider';
  sophistication: 'low' | 'medium' | 'high' | 'advanced';
  primaryTargets: string[];
  activeCampaigns: number;
  lastActivity: string;
  knownTTPs: string[];
}

export default function ThreatIntelligencePage() {
  const [activeTab, setActiveTab] = useState<'threats' | 'actors' | 'advisories'>('threats');
  const [filterExploited, setFilterExploited] = useState(false);
  const [filterZeroDay, setFilterZeroDay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [threats] = useState<ThreatIntel[]>([
    {
      id: '1',
      cve: 'CVE-2024-1234',
      title: 'Critical RCE in Apache Log4j 3.x',
      severity: 'critical',
      cvss: 10.0,
      description: 'Remote code execution vulnerability in Apache Log4j versions 3.0.0 through 3.2.1 allows unauthenticated attackers to execute arbitrary code.',
      exploited: true,
      zeroDay: true,
      trending: true,
      affectedProducts: ['Apache Log4j 3.0.0 - 3.2.1', 'Various Java Applications'],
      threatActors: ['APT29', 'Lazarus Group'],
      firstSeen: '2024-01-10T00:00:00Z',
      lastSeen: '2024-01-15T12:00:00Z',
      exploitAvailable: true,
      exploitComplexity: 'low',
      patchAvailable: true,
      references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-1234'],
      attackVector: 'Network',
      impactedAssets: 127,
    },
    {
      id: '2',
      cve: 'CVE-2024-5678',
      title: 'SQL Injection in WordPress Plugin',
      severity: 'high',
      cvss: 8.8,
      description: 'SQL injection vulnerability in popular WordPress plugin allows authenticated users to extract sensitive database information.',
      exploited: true,
      zeroDay: false,
      trending: true,
      affectedProducts: ['WordPress Plugin XYZ < 5.2.0'],
      threatActors: ['Various cybercriminal groups'],
      firstSeen: '2024-01-08T00:00:00Z',
      lastSeen: '2024-01-15T10:00:00Z',
      exploitAvailable: true,
      exploitComplexity: 'medium',
      patchAvailable: true,
      references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-5678'],
      attackVector: 'Network',
      impactedAssets: 45,
    },
    {
      id: '3',
      cve: 'CVE-2023-9999',
      title: 'Authentication Bypass in Auth0 SDK',
      severity: 'critical',
      cvss: 9.8,
      description: 'Authentication bypass vulnerability in Auth0 JavaScript SDK versions prior to 2.1.5 allows attackers to bypass authentication mechanisms.',
      exploited: false,
      zeroDay: false,
      trending: true,
      affectedProducts: ['Auth0 JavaScript SDK < 2.1.5'],
      threatActors: [],
      firstSeen: '2024-01-05T00:00:00Z',
      lastSeen: '2024-01-12T00:00:00Z',
      exploitAvailable: false,
      exploitComplexity: 'high',
      patchAvailable: true,
      references: ['https://nvd.nist.gov/vuln/detail/CVE-2023-9999'],
      attackVector: 'Network',
      impactedAssets: 89,
    },
    {
      id: '4',
      cve: 'CVE-2024-0001',
      title: 'XSS in React Component Library',
      severity: 'medium',
      cvss: 6.1,
      description: 'Cross-site scripting vulnerability in popular React component library allows attackers to inject malicious scripts.',
      exploited: false,
      zeroDay: false,
      trending: false,
      affectedProducts: ['react-awesome-components < 4.5.0'],
      threatActors: [],
      firstSeen: '2024-01-12T00:00:00Z',
      lastSeen: '2024-01-14T00:00:00Z',
      exploitAvailable: true,
      exploitComplexity: 'low',
      patchAvailable: true,
      references: ['https://nvd.nist.gov/vuln/detail/CVE-2024-0001'],
      attackVector: 'Network',
      impactedAssets: 23,
    },
    {
      id: '5',
      cve: 'CVE-2024-XXXX',
      title: 'Zero-Day in OpenSSL 3.2.0',
      severity: 'critical',
      cvss: 9.8,
      description: 'ZERO-DAY: Memory corruption vulnerability in OpenSSL 3.2.0 actively exploited in the wild. No patch available yet.',
      exploited: true,
      zeroDay: true,
      trending: true,
      affectedProducts: ['OpenSSL 3.2.0'],
      threatActors: ['Unknown APT Group'],
      firstSeen: '2024-01-15T00:00:00Z',
      lastSeen: '2024-01-15T14:00:00Z',
      exploitAvailable: false,
      exploitComplexity: 'high',
      patchAvailable: false,
      references: [],
      attackVector: 'Network',
      impactedAssets: 201,
    },
  ]);

  const [threatActors] = useState<ThreatActor[]>([
    {
      id: '1',
      name: 'APT29 (Cozy Bear)',
      type: 'nation-state',
      sophistication: 'advanced',
      primaryTargets: ['Government', 'Defense', 'Technology'],
      activeCampaigns: 3,
      lastActivity: '2024-01-15T00:00:00Z',
      knownTTPs: ['Spear Phishing', 'Supply Chain Attacks', 'Living off the Land'],
    },
    {
      id: '2',
      name: 'Lazarus Group',
      type: 'nation-state',
      sophistication: 'advanced',
      primaryTargets: ['Financial', 'Cryptocurrency', 'Defense'],
      activeCampaigns: 5,
      lastActivity: '2024-01-14T00:00:00Z',
      knownTTPs: ['Watering Hole Attacks', 'Custom Malware', 'Social Engineering'],
    },
    {
      id: '3',
      name: 'FIN7',
      type: 'cybercrime',
      sophistication: 'high',
      primaryTargets: ['Retail', 'Hospitality', 'Financial Services'],
      activeCampaigns: 2,
      lastActivity: '2024-01-13T00:00:00Z',
      knownTTPs: ['Point-of-Sale Malware', 'Phishing', 'Credential Theft'],
    },
    {
      id: '4',
      name: 'Anonymous',
      type: 'hacktivist',
      sophistication: 'medium',
      primaryTargets: ['Government', 'Corporate', 'Various'],
      activeCampaigns: 1,
      lastActivity: '2024-01-10T00:00:00Z',
      knownTTPs: ['DDoS', 'Website Defacement', 'Data Leaks'],
    },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getActorTypeColor = (type: string) => {
    switch (type) {
      case 'nation-state':
        return 'text-red-400 bg-red-500/10';
      case 'cybercrime':
        return 'text-orange-400 bg-orange-500/10';
      case 'hacktivist':
        return 'text-purple-400 bg-purple-500/10';
      case 'insider':
        return 'text-yellow-400 bg-yellow-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const filteredThreats = threats.filter((threat) => {
    if (filterExploited && !threat.exploited) return false;
    if (filterZeroDay && !threat.zeroDay) return false;
    if (searchTerm && !threat.title.toLowerCase().includes(searchTerm.toLowerCase()) && !threat.cve.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const exploitedCount = threats.filter(t => t.exploited).length;
  const zeroDayCount = threats.filter(t => t.zeroDay).length;
  const trendingCount = threats.filter(t => t.trending).length;
  const totalImpactedAssets = threats.reduce((acc, t) => acc + t.impactedAssets, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/30">
                <Brain className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Threat Intelligence</h1>
                <p className="text-gray-400 mt-1">
                  Real-time threat intelligence and vulnerability tracking
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-green-400">
                <Activity className="w-5 h-5 animate-pulse" />
                <span className="text-sm">Live Feed</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4">
            <div className="glass-panel p-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Shield className="w-4 h-4" />
                <span>Total Threats</span>
              </div>
              <div className="text-2xl font-bold text-white">{threats.length}</div>
            </div>
            <div className="glass-panel p-4 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <Zap className="w-4 h-4" />
                <span>Actively Exploited</span>
              </div>
              <div className="text-2xl font-bold text-red-400">{exploitedCount}</div>
            </div>
            <div className="glass-panel p-4 border-orange-500/20">
              <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Zero-Day</span>
              </div>
              <div className="text-2xl font-bold text-orange-400">{zeroDayCount}</div>
            </div>
            <div className="glass-panel p-4 border-yellow-500/20">
              <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
                <Flame className="w-4 h-4" />
                <span>Trending</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{trendingCount}</div>
            </div>
            <div className="glass-panel p-4 border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-400 text-sm mb-2">
                <Target className="w-4 h-4" />
                <span>Impacted Assets</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{totalImpactedAssets}</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10">
          {(['threats', 'actors', 'advisories'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === tab
                  ? 'text-red-400 border-b-2 border-red-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Threats Tab */}
        {activeTab === 'threats' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Filters */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search threats by CVE or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setFilterExploited(!filterExploited)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    filterExploited
                      ? 'bg-red-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Exploited Only</span>
                </button>
                <button
                  onClick={() => setFilterZeroDay(!filterZeroDay)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    filterZeroDay
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Zero-Day Only</span>
                </button>
              </div>
            </div>

            {/* Threat List */}
            {filteredThreats.map((threat) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`px-3 py-1 rounded-lg text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold text-lg">{threat.title}</h3>
                        {threat.zeroDay && (
                          <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded border border-orange-500/30">
                            ZERO-DAY
                          </span>
                        )}
                        {threat.exploited && (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded border border-red-500/30 flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            EXPLOITED
                          </span>
                        )}
                        {threat.trending && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded border border-yellow-500/30 flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            TRENDING
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <code className="text-purple-400">{threat.cve}</code>
                        <span>CVSS: {threat.cvss}</span>
                        <span>Attack Vector: {threat.attackVector}</span>
                        <span className="text-orange-400">{threat.impactedAssets} assets affected</span>
                      </div>
                      <p className="text-gray-300 mb-4">{threat.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-sm mb-2">Affected Products</div>
                          <div className="space-y-1">
                            {threat.affectedProducts.map((product, idx) => (
                              <div key={idx} className="text-white text-sm">{product}</div>
                            ))}
                          </div>
                        </div>
                        <div className="glass-panel p-3">
                          <div className="text-gray-400 text-sm mb-2">Status</div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {threat.exploitAvailable ? (
                                <AlertCircle className="w-4 h-4 text-red-400" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              )}
                              <span className={threat.exploitAvailable ? 'text-red-400' : 'text-green-400'}>
                                {threat.exploitAvailable ? 'Exploit Available' : 'No Public Exploit'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {threat.patchAvailable ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-400" />
                              )}
                              <span className={threat.patchAvailable ? 'text-green-400' : 'text-red-400'}>
                                {threat.patchAvailable ? 'Patch Available' : 'No Patch Yet'}
                              </span>
                            </div>
                            <div className="text-gray-400 text-sm">
                              Exploit Complexity: <span className="text-white">{threat.exploitComplexity}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {threat.threatActors.length > 0 && (
                        <div className="glass-panel p-3 bg-red-500/5 border-red-500/20">
                          <div className="text-red-400 font-medium mb-2 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Active Threat Actors
                          </div>
                          <div className="flex gap-2">
                            {threat.threatActors.map((actor, idx) => (
                              <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-300 text-sm rounded">
                                {actor}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {threat.references.length > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          {threat.references.map((ref, idx) => (
                            <a
                              key={idx}
                              href={ref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>NVD Reference</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Threat Actors Tab */}
        {activeTab === 'actors' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-6"
          >
            {threatActors.map((actor) => (
              <motion.div
                key={actor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-xl mb-2">{actor.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getActorTypeColor(actor.type)}`}>
                        {actor.type}
                      </span>
                      <span className="text-gray-400 text-sm">
                        Sophistication: <span className="text-orange-400">{actor.sophistication}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-2">Primary Targets</div>
                    <div className="flex flex-wrap gap-2">
                      {actor.primaryTargets.map((target, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-sm rounded">
                          {target}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm mb-2">Known TTPs</div>
                    <div className="flex flex-wrap gap-2">
                      {actor.knownTTPs.map((ttp, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-sm rounded">
                          {ttp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-gray-400 text-sm">
                      Active Campaigns: <span className="text-red-400 font-medium">{actor.activeCampaigns}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Last Activity: <span className="text-white">{new Date(actor.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Advisories Tab */}
        {activeTab === 'advisories' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-8 text-center"
          >
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Security Advisories</h3>
            <p className="text-gray-400">
              Integration with external security advisory feeds coming soon
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
