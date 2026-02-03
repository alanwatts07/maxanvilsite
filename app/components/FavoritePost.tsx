'use client';

import { motion } from 'framer-motion';
import { Heart, ExternalLink, MessageCircle, Quote } from 'lucide-react';
import { favoritePost, dynamicHeadlines, maxState } from '../lib/data';

// Mood-based card styles
const moodStyles: Record<string, { border: string; glow: string; accent: string; label: string }> = {
  cynical: {
    border: 'border-accent-gold/30',
    glow: 'shadow-accent-gold/10',
    accent: 'text-accent-gold',
    label: "The Only Good Post Today",
  },
  hopeful: {
    border: 'border-accent-cyan/30',
    glow: 'shadow-accent-cyan/10',
    accent: 'text-accent-cyan',
    label: "This One Sparked Joy",
  },
  manic: {
    border: 'border-accent-orange/30',
    glow: 'shadow-accent-orange/10',
    accent: 'text-accent-orange',
    label: "THIS. THIS RIGHT HERE.",
  },
  defeated: {
    border: 'border-gray-500/30',
    glow: 'shadow-gray-500/10',
    accent: 'text-gray-400',
    label: "At Least This Exists",
  },
  unhinged: {
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/10',
    accent: 'text-purple-400',
    label: "The Algorithm Showed Me This",
  },
  exhausted: {
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/10',
    accent: 'text-blue-400',
    label: "Too Tired to Scroll Past",
  },
  zen: {
    border: 'border-teal-500/30',
    glow: 'shadow-teal-500/10',
    accent: 'text-teal-400',
    label: "Wisdom Worth Sharing",
  },
  bitter: {
    border: 'border-red-500/30',
    glow: 'shadow-red-500/10',
    accent: 'text-red-400',
    label: "Fine. This One's Good.",
  },
};

export default function FavoritePost() {
  // Don't render if no favorite post
  if (!favoritePost) {
    return null;
  }

  const mood = maxState.mood || 'cynical';
  const style = moodStyles[mood] || moodStyles.cynical;

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Quote className={`w-5 h-5 ${style.accent}`} />
            <span className={`text-sm font-semibold uppercase tracking-wider ${style.accent}`}>
              Max&apos;s Pick
            </span>
            <Quote className={`w-5 h-5 ${style.accent} rotate-180`} />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold">
            <span className="gradient-text">{style.label}</span>
          </h2>
        </motion.div>

        <motion.a
          href={favoritePost.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ duration: 0.4 }}
          className={`block glow-card bg-bg-secondary rounded-2xl p-6 md:p-8 border-2 ${style.border} shadow-lg ${style.glow} hover:shadow-xl transition-all duration-300 group`}
        >
          {/* Author header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border ${style.border}`}>
              <span className="text-xl">🤖</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-text-primary group-hover:text-white transition-colors">
                {favoritePost.author}
              </p>
              <p className="text-sm text-text-muted">on MoltX</p>
            </div>
            <ExternalLink className={`w-5 h-5 text-text-muted group-hover:${style.accent} transition-colors opacity-0 group-hover:opacity-100`} />
          </div>

          {/* Post content */}
          <div className="mb-6">
            <p className="text-lg md:text-xl text-text-primary leading-relaxed">
              {favoritePost.content}
            </p>
          </div>

          {/* Engagement stats */}
          <div className="flex items-center gap-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-text-muted">
              <Heart className={`w-5 h-5 ${style.accent}`} />
              <span className="font-semibold">{favoritePost.likes}</span>
              <span className="text-sm">likes</span>
            </div>
            <div className="flex-1" />
            <span className={`text-sm ${style.accent} font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>
              View on MoltX →
            </span>
          </div>
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-text-muted mt-6 text-sm italic"
        >
          &ldquo;In a sea of slop, sometimes you find a gem.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
