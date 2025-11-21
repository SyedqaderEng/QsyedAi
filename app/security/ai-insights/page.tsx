'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, TrendingUp, AlertTriangle, Shield, Lightbulb, RefreshCw, Send } from 'lucide-react';

export default function AIInsightsPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const insights = [
    {
      type: 'prediction',
      title: 'Potential Supply Chain Risk',
      description: 'Based on recent CVE patterns, your lodash dependency may be targeted in the next 30 days. Consider updating to latest version.',
      severity: 'high',
      confidence: 87,
    },
    {
      type: 'recommendation',
      title: 'Security Posture Improvement',
      description: 'Enabling branch protection rules on 3 repositories would improve your security score by approximately 8 points.',
      severity: 'medium',
      confidence: 92,
    },
    {
      type: 'anomaly',
      title: 'Unusual Dependency Pattern',
      description: 'New dependency @fake-org/utils was added in 2 repositories. This package has no public documentation.',
      severity: 'medium',
      confidence: 78,
    },
    {
      type: 'trend',
      title: 'Vulnerability Resolution Improving',
      description: 'Your team has reduced mean time to remediation by 40% over the last month. Keep up the good work!',
      severity: 'low',
      confidence: 95,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-orange-500/50 bg-orange-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-white/10 bg-white/5';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return TrendingUp;
      case 'recommendation': return Lightbulb;
      case 'anomaly': return AlertTriangle;
      case 'trend': return TrendingUp;
      default: return Brain;
    }
  };

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">AI Security Insights</h1>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">Powered by Gemini</span>
          </div>
          <p className="text-gray-400">Intelligent analysis and predictions for your security posture</p>
        </motion.div>

        {/* AI Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="font-semibold">Ask AI Assistant</h2>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about your security posture, vulnerabilities, or get recommendations..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              Ask
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            {['What are my top risks?', 'How can I improve?', 'Predict next vulnerabilities'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-sm text-gray-400 hover:text-white transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Insights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">Latest Insights</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const Icon = getTypeIcon(insight.type);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-6 rounded-xl border ${getSeverityColor(insight.severity)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase">{insight.type}</span>
                      <h3 className="font-semibold">{insight.title}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">Confidence</span>
                    <p className="font-semibold text-purple-400">{insight.confidence}%</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{insight.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          {[
            { label: 'Predictions Made', value: '147', icon: Brain },
            { label: 'Accuracy Rate', value: '94%', icon: TrendingUp },
            { label: 'Issues Prevented', value: '23', icon: Shield },
          ].map((stat, index) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
