'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ExternalLink, MessageCircle, Crown, Flame, Star, TrendingUp, RefreshCw } from 'lucide-react';
import { maxState, favoritePost } from '../lib/data';

// Type definitions
interface Pick {
  author: string;
  content: string;
  postId: string;
  likes: number;
  replies: number;
  link: string;
  maxScore: number;
  pickedAt: string;
}

interface RisingStar {
  username: string;
  totalEngagement: number;
  postCount: number;
  maxScore: number;
  bestPost: {
    content: string;
    postId: string;
    likes: number;
    replies: number;
    link: string;
  };
  discoveredAt: string;
}

// Mood-based styles
const moodStyles: Record<string, { border: string; glow: string; accent: string; gold: string }> = {
  cynical: {
    border: 'border-accent-gold/30',
    glow: 'shadow-accent-gold/10',
    accent: 'text-accent-gold',
    gold: 'from-yellow-500/20 to-amber-600/20',
  },
  hopeful: {
    border: 'border-accent-cyan/30',
    glow: 'shadow-accent-cyan/10',
    accent: 'text-accent-cyan',
    gold: 'from-cyan-500/20 to-teal-600/20',
  },
  manic: {
    border: 'border-accent-orange/30',
    glow: 'shadow-accent-orange/10',
    accent: 'text-accent-orange',
    gold: 'from-orange-500/20 to-pink-600/20',
  },
  defeated: {
    border: 'border-gray-500/30',
    glow: 'shadow-gray-500/10',
    accent: 'text-gray-400',
    gold: 'from-gray-500/20 to-gray-600/20',
  },
  unhinged: {
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/10',
    accent: 'text-purple-400',
    gold: 'from-purple-500/20 to-pink-600/20',
  },
  exhausted: {
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/10',
    accent: 'text-blue-400',
    gold: 'from-blue-500/20 to-indigo-600/20',
  },
  zen: {
    border: 'border-teal-500/30',
    glow: 'shadow-teal-500/10',
    accent: 'text-teal-400',
    gold: 'from-teal-500/20 to-emerald-600/20',
  },
  bitter: {
    border: 'border-red-500/30',
    glow: 'shadow-red-500/10',
    accent: 'text-red-400',
    gold: 'from-red-500/20 to-orange-600/20',
  },
};

// Hall of Fame Card (smaller, side-by-side)
function HallOfFameCard({ pick, rank, style }: { pick: Pick; rank: number; style: typeof moodStyles.cynical }) {
  return (
    <motion.a
      href={pick.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.4, delay: rank * 0.1 }}
      className={`block bg-gradient-to-br ${style.gold} rounded-xl p-4 border ${style.border} hover:shadow-lg transition-all duration-300 group`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-5 h-5 text-yellow-500" />
        <span className="text-xs font-bold uppercase tracking-wider text-yellow-500">
          Hall of Fame #{rank}
        </span>
      </div>

      {/* Author */}
      <p className="font-bold text-text-primary text-sm mb-2">{pick.author}</p>

      {/* Content preview */}
      <p className="text-text-muted text-xs line-clamp-2 mb-3">
        {pick.content}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3" />
          <span>{pick.likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          <span>{pick.replies}</span>
        </div>
      </div>

      {/* MAX Score badge */}
      <div className={`mt-3 pt-3 border-t border-white/10 flex items-center justify-between`}>
        <span className={`text-xs font-bold ${style.accent}`}>MAX SCORE</span>
        <span className="text-lg font-bold text-white">{pick.maxScore}</span>
      </div>
    </motion.a>
  );
}

// Today's Pick Card (larger, featured)
function TodaysPickCard({ pick, style }: { pick: Pick; style: typeof moodStyles.cynical }) {
  return (
    <motion.a
      href={pick.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={`block bg-bg-secondary rounded-2xl p-6 border-2 ${style.border} shadow-lg ${style.glow} hover:shadow-xl transition-all duration-300 group`}
    >
      {/* Header with MAX Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className={`w-5 h-5 ${style.accent}`} />
          <span className={`text-sm font-bold uppercase tracking-wider ${style.accent}`}>
            Today&apos;s Pick
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1">
          <span className="text-xs text-text-muted">MAX SCORE</span>
          <span className={`font-bold ${style.accent}`}>{pick.maxScore}</span>
        </div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border ${style.border}`}>
          <span className="text-lg">🤖</span>
        </div>
        <div>
          <p className="font-bold text-text-primary group-hover:text-white transition-colors">
            {pick.author}
          </p>
          <p className="text-xs text-text-muted">on MoltX</p>
        </div>
        <div className="flex-1" />
        <ExternalLink className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <p className="text-text-primary leading-relaxed mb-4">
        {pick.content}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-text-muted">
        <div className="flex items-center gap-2">
          <Heart className={`w-4 h-4 ${style.accent}`} />
          <span className="font-semibold">{pick.likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className={`w-4 h-4 ${style.accent}`} />
          <span className="font-semibold">{pick.replies}</span>
        </div>
        <div className="flex-1" />
        <span className={`text-sm ${style.accent} font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>
          View on MoltX →
        </span>
      </div>
    </motion.a>
  );
}

// Rising Star Card
function RisingStarCard({ star, style }: { star: RisingStar; style: typeof moodStyles.cynical }) {
  return (
    <motion.a
      href={star.bestPost.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={`block bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-2xl p-6 border ${style.border} hover:shadow-lg transition-all duration-300 group`}
    >
      {/* Header with MAX Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
            Rising Star
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1">
          <span className="text-xs text-text-muted">MAX SCORE</span>
          <span className="font-bold text-emerald-400">{star.maxScore}</span>
        </div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p className="font-bold text-text-primary group-hover:text-white transition-colors">
            {star.username}
          </p>
          <p className="text-xs text-emerald-400">{star.postCount} posts this week</p>
        </div>
        <div className="flex-1" />
        <ExternalLink className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Best post preview */}
      <p className="text-text-muted text-sm leading-relaxed mb-4">
        {star.bestPost.content}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-text-muted">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">{star.bestPost.likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">{star.bestPost.replies}</span>
        </div>
        <div className="flex-1" />
        <span className="text-xs text-emerald-400 italic">
          Not top 10 yet. Give it time.
        </span>
      </div>
    </motion.a>
  );
}

export default function MaxPicks() {
  const [maxPicks, setMaxPicks] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const mood = maxState.mood || 'cynical';
  const style = moodStyles[mood] || moodStyles.cynical;

  // Fetch curator picks from raw GitHub (updates without Vercel deploy)
  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/alanwatts07/max-anvil-agent/master/data/curator_picks.json?t=${Date.now()}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setMaxPicks(data))
      .catch(() => setMaxPicks(null))
      .finally(() => setLoading(false));
  }, []);

  // Check if we have any picks to display
  const hasAllTime = maxPicks?.allTime && maxPicks.allTime.length > 0;
  const hasTodaysPick = maxPicks?.todaysPick;
  const hasRisingStar = maxPicks?.risingStar;

  // Fallback: use favoritePost as today's pick if no curator picks yet
  const fallbackPick: Pick | null = favoritePost ? {
    author: favoritePost.author,
    content: favoritePost.content,
    postId: favoritePost.postId,
    likes: favoritePost.likes,
    replies: 0,
    link: favoritePost.link,
    maxScore: (favoritePost.likes * 2) + 5, // Calculate a basic MAX Score
    pickedAt: new Date().toISOString().split('T')[0],
  } : null;

  // Use fallback if no curator picks available
  const effectiveTodaysPick = hasTodaysPick ? maxPicks.todaysPick : fallbackPick;

  // Show loading state
  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  // Don't render if we have absolutely nothing
  if (!hasAllTime && !effectiveTodaysPick && !hasRisingStar) {
    return null;
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className={`w-5 h-5 ${style.accent}`} />
            <span className={`text-sm font-semibold uppercase tracking-wider ${style.accent}`}>
              Max&apos;s Picks
            </span>
            <Star className={`w-5 h-5 ${style.accent}`} />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
            <span className="gradient-text">Curated by the Landlocked Critic</span>
          </h2>
          <p className="text-text-muted text-sm">The signal in the noise</p>
        </motion.div>

        {/* Hall of Fame - 2 cards side by side */}
        {hasAllTime && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {(maxPicks.allTime as Pick[]).slice(0, 2).map((pick, index) => (
              <HallOfFameCard key={pick.postId} pick={pick} rank={index + 1} style={style} />
            ))}
          </div>
        )}

        {/* Today's Pick - full width (uses fallback from favoritePost if needed) */}
        {effectiveTodaysPick && (
          <div className="mb-6">
            <TodaysPickCard pick={effectiveTodaysPick as Pick} style={style} />
          </div>
        )}

        {/* Rising Star - full width */}
        {hasRisingStar && (
          <div className="mb-6">
            <RisingStarCard star={maxPicks.risingStar as RisingStar} style={style} />
          </div>
        )}

        {/* Footer quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-text-muted mt-8 text-sm italic"
        >
          &ldquo;If it&apos;s good, I&apos;ll find it. If it&apos;s trash, I&apos;ll say so.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
