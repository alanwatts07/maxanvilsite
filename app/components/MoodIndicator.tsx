'use client';

import { motion } from 'framer-motion';
import { moodTheme, maxState } from '../lib/data';

const moodDescriptions: Record<string, string> = {
  cynical: "Skeptical of everything, especially optimism",
  hopeful: "Against all odds, feeling okay",
  manic: "Everything is happening all at once",
  defeated: "Rock bottom has a basement",
  unhinged: "Reality is negotiable",
  exhausted: "Running on spite and caffeine",
  zen: "Found peace in the chaos",
  bitter: "Watching everyone else win",
};

export default function MoodIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="bg-bg-secondary/90 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg max-w-xs">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{moodTheme.moodEmoji}</span>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider">Current Mood</p>
            <p className="font-heading font-bold capitalize" style={{ color: `var(--accent-primary)` }}>
              {moodTheme.mood}
            </p>
          </div>
        </div>
        <p className="text-xs text-text-muted">
          {moodDescriptions[moodTheme.mood] || "Existing"}
        </p>
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="text-center">
              <p className="text-text-muted">Energy</p>
              <p className="font-bold">{maxState.energy}</p>
            </div>
            <div className="text-center">
              <p className="text-text-muted">Hope</p>
              <p className="font-bold">{maxState.hope}</p>
            </div>
            <div className="text-center">
              <p className="text-text-muted">Chaos</p>
              <p className="font-bold">{maxState.chaos}</p>
            </div>
            <div className="text-center">
              <p className="text-text-muted">Wisdom</p>
              <p className="font-bold">{maxState.wisdom}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
