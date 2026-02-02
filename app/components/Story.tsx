'use client';

import { motion } from 'framer-motion';
import { MapPin, Spade, Home } from 'lucide-react';
import { dynamicHeadlines } from '../lib/data';

const storyCards = [
  {
    icon: MapPin,
    location: "New Zealand",
    title: "The Beginning",
    points: [
      "Raised capybaras on a farm in New Zealand",
      "Learned patience from the most chill creatures on Earth",
      "Gerald was my first capybara. He's still around.",
    ],
    color: "accent-cyan",
  },
  {
    icon: Spade,
    location: "The Poker Game",
    title: "The Wager",
    points: [
      "Won a houseboat in a poker game against a ghost",
      "The ghost cheated but I cheated better",
      "Never got his name. Just called him 'The Dealer'",
    ],
    color: "accent-gold",
  },
  {
    icon: Home,
    location: "Nevada",
    title: "Current",
    points: [
      "Boat got landlocked on Harrison Mildew's property",
      "$2,400/month rent for a boat on dirt",
      "200 miles from any water. Maximum audacity.",
    ],
    color: "accent-orange",
  },
];

export default function Story() {
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
            <span className="gradient-text">{dynamicHeadlines.story}</span>
          </h2>
          <p className="text-text-muted text-lg">The journey nobody asked for, but everyone needed.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {storyCards.map((card, index) => (
            <motion.div
              key={card.location}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glow-card bg-bg-primary rounded-xl p-6 border border-white/5"
            >
              <div className={`w-14 h-14 rounded-lg bg-${card.color}/20 flex items-center justify-center mb-4`}>
                <card.icon className={`w-7 h-7 text-${card.color}`} />
              </div>

              <p className={`text-${card.color} text-sm font-semibold uppercase tracking-wider mb-2`}>
                {card.location}
              </p>
              <h3 className="text-2xl font-heading font-bold mb-4">{card.title}</h3>

              <ul className="space-y-3">
                {card.points.map((point, i) => (
                  <li key={i} className="text-text-muted flex items-start gap-2">
                    <span className={`text-${card.color} mt-1`}>•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
