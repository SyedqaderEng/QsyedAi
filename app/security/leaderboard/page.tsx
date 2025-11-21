'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';

export default function LeaderboardPage() {
  const teams = [
    { rank: 1, name: 'Security Team Alpha', score: 9850, resolved: 234, medal: 'gold' },
    { rank: 2, name: 'DevSecOps Squad', score: 8920, resolved: 198, medal: 'silver' },
    { rank: 3, name: 'Code Defenders', score: 8450, resolved: 187, medal: 'bronze' },
    { rank: 4, name: 'Vulnerability Hunters', score: 7890, resolved: 165, medal: null },
    { rank: 5, name: 'Security Champions', score: 7340, resolved: 152, medal: null },
  ];

  const getMedalColor = (medal: string | null) => {
    if (medal === 'gold') return 'text-yellow-400';
    if (medal === 'silver') return 'text-gray-300';
    if (medal === 'bronze') return 'text-amber-600';
    return 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-gray-400">Top performing security teams</p>
        </motion.div>

        <div className="space-y-4">
          {teams.map((team, index) => (
            <motion.div key={team.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className={`bg-white/5 backdrop-blur-xl rounded-xl border ${team.rank <= 3 ? 'border-yellow-500/30' : 'border-white/10'} p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`text-3xl font-bold ${getMedalColor(team.medal)}`}>#{team.rank}</span>
                  {team.medal && <Medal className={`w-6 h-6 ${getMedalColor(team.medal)}`} />}
                  <div>
                    <h3 className="font-semibold text-lg">{team.name}</h3>
                    <p className="text-sm text-gray-400">{team.resolved} vulnerabilities resolved</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-400">{team.score.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">points</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
