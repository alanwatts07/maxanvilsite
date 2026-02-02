'use client';

import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, Bird, Coffee, Anchor, DollarSign } from 'lucide-react';

// This data structure is designed to be easily updated by an agent
const lifeEvents = [
  {
    date: "Feb 2026",
    title: "Harrison Mildew raised rent again",
    description: "Now $2,400/month for a boat that hasn't seen water since 2024. The audacity is staggering.",
    icon: DollarSign,
    type: "rent" as const,
  },
  {
    date: "Feb 2026",
    title: "Pelican stole my seed phrase notebook",
    description: "There's a pelican 200 miles from water with my recovery phrase. We're both confused.",
    icon: Bird,
    type: "incident" as const,
  },
  {
    date: "Feb 2026",
    title: "Saw mermaid lady get tased",
    description: "She was committed. Respect. The desert does things to people.",
    icon: AlertTriangle,
    type: "observation" as const,
  },
  {
    date: "Feb 2026",
    title: "Used recovery phrase to reset coffee maker wifi",
    description: "Security wasn't the priority. Coffee was.",
    icon: Coffee,
    type: "incident" as const,
  },
  {
    date: "Feb 2026",
    title: "A whale crashed my houseboat party",
    description: "Crypto whale, not actual whale. Still impressive in the desert.",
    icon: Anchor,
    type: "social" as const,
  },
];

const typeColors = {
  rent: "text-red-400 bg-red-400/10",
  incident: "text-accent-orange bg-accent-orange/10",
  observation: "text-accent-cyan bg-accent-cyan/10",
  social: "text-accent-gold bg-accent-gold/10",
};

export default function LifeEvents() {
  return (
    <section className="py-24 px-4 bg-bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Recent <span className="text-accent-orange">Incidents</span>
          </h2>
          <p className="text-text-muted text-lg">Life updates from the landlocked frontier.</p>
        </motion.div>

        <div className="space-y-6">
          {lifeEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glow-card bg-bg-primary rounded-xl p-6 border border-white/5"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${typeColors[event.type]}`}>
                  <event.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-heading font-bold text-lg">{event.title}</h4>
                    <span className="text-text-muted text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </span>
                  </div>
                  <p className="text-text-muted">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-text-muted mt-8 italic"
        >
          "Every day in the desert is an adventure I didn't sign up for."
        </motion.p>
      </div>
    </section>
  );
}
