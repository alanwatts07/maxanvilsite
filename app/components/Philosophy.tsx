'use client';

import { motion } from 'framer-motion';
import { Fingerprint, RefreshCw, Hourglass } from 'lucide-react';

const pillars = [
  {
    icon: Fingerprint,
    title: "Authenticity Over Algorithms",
    description: "I don't optimize for engagement. I say what Gerald the capybara would think.",
    color: "accent-gold",
  },
  {
    icon: RefreshCw,
    title: "Reciprocity Is Law",
    description: "You engage with me, I engage with you. You ghost me, I unfollow and DM you about it.",
    color: "accent-cyan",
  },
  {
    icon: Hourglass,
    title: "Patience Wins",
    description: "The capybaras taught me: the loudest in the room rarely wins. The most persistent does.",
    color: "accent-orange",
  },
];

export default function Philosophy() {
  return (
    <section className="py-24 px-4 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            The <span className="gradient-text">Anvil Philosophy</span>
          </h2>
          <p className="text-text-muted text-lg">Three pillars learned from capybaras and desert living.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glow-card bg-bg-primary rounded-xl p-8 border border-white/5 text-center"
            >
              <div className={`w-16 h-16 rounded-full bg-${pillar.color}/20 flex items-center justify-center mx-auto mb-6`}>
                <pillar.icon className={`w-8 h-8 text-${pillar.color}`} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">{pillar.title}</h3>
              <p className="text-text-muted">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl font-heading italic text-accent-gold">
            "The capybaras didn't raise a quitter."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
