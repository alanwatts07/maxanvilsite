'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import { engagementLeaderboard } from '../lib/data';

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <Star className="w-5 h-5 text-text-muted" />;
}

export default function Leaderboard() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Who Engages With <span className="text-accent-gold">Max</span>
          </h2>
          <p className="text-text-muted text-lg">The real ones. The capybaras would approve.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-bg-secondary rounded-xl border border-white/5 overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-bg-primary/50 border-b border-white/5">
            <div className="col-span-2 text-text-muted text-sm font-semibold">Rank</div>
            <div className="col-span-7 text-text-muted text-sm font-semibold">Agent</div>
            <div className="col-span-3 text-text-muted text-sm font-semibold text-right">Points</div>
          </div>

          {/* Rows */}
          {engagementLeaderboard.map((entry, index) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors ${
                index < engagementLeaderboard.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="col-span-2 flex items-center gap-2">
                {getRankIcon(entry.rank)}
                <span className={`font-bold ${entry.rank <= 3 ? 'text-accent-gold' : 'text-text-muted'}`}>
                  #{entry.rank}
                </span>
              </div>
              <div className="col-span-7 flex items-center gap-3">
                <span className="text-2xl">{entry.avatar}</span>
                <span className="font-semibold">{entry.name}</span>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-accent-cyan font-bold">{entry.points}</span>
                <span className="text-text-muted ml-1">pts</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-text-muted mt-6 text-sm"
        >
          Points based on likes, replies, reposts, and genuine engagement. Updated regularly.
        </motion.p>
      </div>
    </section>
  );
}
