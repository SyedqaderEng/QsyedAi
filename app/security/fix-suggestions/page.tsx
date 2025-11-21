'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code, CheckCircle, Clock, ArrowRight, Copy, ExternalLink } from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  file: string;
  line: number;
  suggestion: string;
  codeExample: string;
  status: 'pending' | 'applied' | 'dismissed';
}

export default function FixSuggestionsPage() {
  const [suggestions] = useState<Suggestion[]>([
    {
      id: '1',
      title: 'SQL Injection Vulnerability',
      severity: 'critical',
      type: 'Security',
      file: 'src/api/users.ts',
      line: 45,
      suggestion: 'Use parameterized queries instead of string concatenation',
      codeExample: `// Before (vulnerable)
const query = "SELECT * FROM users WHERE id = " + userId;

// After (safe)
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);`,
      status: 'pending',
    },
    {
      id: '2',
      title: 'XSS Prevention',
      severity: 'high',
      type: 'Security',
      file: 'src/components/Comment.tsx',
      line: 23,
      suggestion: 'Sanitize user input before rendering',
      codeExample: `// Before
<div dangerouslySetInnerHTML={{__html: userInput}} />

// After
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(userInput)}} />`,
      status: 'pending',
    },
    {
      id: '3',
      title: 'Outdated Dependency',
      severity: 'medium',
      type: 'Dependency',
      file: 'package.json',
      line: 12,
      suggestion: 'Update lodash to latest version to fix prototype pollution',
      codeExample: `// Run this command
npm update lodash@latest

// Or update package.json
"lodash": "^4.17.21"`,
      status: 'applied',
    },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold">Fix Suggestions</h1>
          </div>
          <p className="text-gray-400">AI-powered recommendations to fix vulnerabilities</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Pending', value: suggestions.filter(s => s.status === 'pending').length, color: 'text-yellow-400' },
            { label: 'Applied', value: suggestions.filter(s => s.status === 'applied').length, color: 'text-green-400' },
            { label: 'Dismissed', value: suggestions.filter(s => s.status === 'dismissed').length, color: 'text-gray-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 text-center"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Suggestions */}
        <div className="space-y-6">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(suggestion.severity)}`}>
                        {suggestion.severity}
                      </span>
                      <span className="text-sm text-gray-400">{suggestion.type}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{suggestion.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {suggestion.file}:{suggestion.line}
                    </p>
                  </div>
                  {suggestion.status === 'applied' ? (
                    <span className="flex items-center gap-1 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Applied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-400 text-sm">
                      <Clock className="w-4 h-4" />
                      Pending
                    </span>
                  )}
                </div>

                <p className="text-gray-300 mb-4">{suggestion.suggestion}</p>

                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Suggested Fix</span>
                    <button className="text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{suggestion.codeExample}</code>
                  </pre>
                </div>
              </div>

              {suggestion.status === 'pending' && (
                <div className="border-t border-white/10 p-4 flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Apply Fix
                  </button>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    Dismiss
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    View in Editor
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
