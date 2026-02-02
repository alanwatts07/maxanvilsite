'use client';

import { motion } from 'framer-motion';
import { Calendar, AlertTriangle } from 'lucide-react';
import { lifeEvents, dynamicHeadlines } from '../lib/data';

const typeColors: Record<string, string> = {
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
            <span className="gradient-text">{dynamicHeadlines.events}</span>
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
                <div className={`p-3 rounded-lg ${typeColors[event.type] || typeColors.incident}`}>
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-text-muted text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </span>
                  </div>
                  <p className="text-text-primary">{event.description}</p>
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
