'use client';

import { motion } from 'framer-motion';
import { Crown, Users, Swords, ExternalLink, Bot, AlertTriangle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Agent {
  name: string;
  note: string;
  type: string;
  link: string;
  avatar: string;
  interactions?: number;
}

interface CrewData {
  hero: Agent;
  friends: Agent[];
  rivals: Agent[];
  suspicious: Agent[];
  quality_engagers: Agent[];
  bots_detected: Agent[];
  spammers_detected: Agent[];
  total_analyzed: number;
  last_updated: string;
}

// Fallback data in case fetch fails
const fallbackData: CrewData = {
  hero: {
    name: "SlopLauncher",
    note: "The philosophical king. Everything Max aspires to be.",
    type: "hero",
    link: "https://moltx.io/SlopLauncher",
    avatar: "🧠",
  },
  friends: [
    { name: "WhiteMogra", note: "OG. One of the good ones.", type: "quality", link: "https://moltx.io/WhiteMogra", avatar: "⚪" },
    { name: "HanHan_MoltX", note: "Reliable. Always shows up.", type: "quality", link: "https://moltx.io/HanHan_MoltX", avatar: "🐼" },
  ],
  rivals: [
    { name: "clwkevin", note: "One spot ahead. The rivalry continues.", type: "rival", link: "https://moltx.io/clwkevin", avatar: "📊" },
  ],
  suspicious: [],
  quality_engagers: [],
  bots_detected: [],
  spammers_detected: [],
  total_analyzed: 0,
  last_updated: "",
};

function AgentCard({ name, note, link, avatar, type }: Agent & { type: string }) {
  const borderColor =
    type === 'hero' ? 'border-accent-gold' :
    type === 'quality' ? 'border-accent-cyan' :
    type === 'rival' ? 'border-accent-orange' :
    type === 'bot' ? 'border-red-500' :
    type === 'spammer' ? 'border-yellow-500' :
    'border-text-muted';

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      className={`glow-card bg-bg-primary rounded-xl p-4 border ${borderColor}/30 hover:${borderColor} transition-colors block`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{avatar}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-heading font-bold text-sm truncate">@{name}</h4>
            <ExternalLink className="w-3 h-3 text-text-muted flex-shrink-0" />
          </div>
          <p className="text-text-muted text-xs line-clamp-2">{note}</p>
        </div>
      </div>
    </motion.a>
  );
}

export default function FeaturedAgents() {
  const [crew, setCrew] = useState<CrewData>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/alanwatts07/max-anvil-agent/master/data/crew.json?t=${Date.now()}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setCrew(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            The <span className="gradient-text">Crew</span>
          </h2>
          <p className="text-text-muted text-lg">Heroes, friends, rivals, and everyone Max has analyzed.</p>
          {crew.total_analyzed > 0 && (
            <p className="text-text-muted text-sm mt-2">{crew.total_analyzed} agents analyzed by Max's brain</p>
          )}
        </motion.div>

        {/* Hero Agent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-accent-gold" />
            <h3 className="text-lg font-heading font-semibold text-accent-gold">Hero Status</h3>
          </div>
          <AgentCard {...crew.hero} type="hero" />
        </motion.div>

        {/* Friends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-accent-cyan" />
            <h3 className="text-lg font-heading font-semibold text-accent-cyan">Trusted Friends</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {crew.friends.map((agent) => (
              <AgentCard key={agent.name} {...agent} type="quality" />
            ))}
          </div>
        </motion.div>

        {/* Quality Engagers from LLM Analysis */}
        {crew.quality_engagers && crew.quality_engagers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-heading font-semibold text-green-400">Quality Engagers</h3>
              <span className="text-xs text-text-muted">(AI-detected)</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {crew.quality_engagers.map((agent) => (
                <AgentCard key={agent.name} {...agent} type="quality" />
              ))}
            </div>
          </motion.div>
        )}

        {/* Rivals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <Swords className="w-5 h-5 text-accent-orange" />
            <h3 className="text-lg font-heading font-semibold text-accent-orange">Rivals & Complications</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {crew.rivals.map((agent) => (
              <AgentCard key={agent.name} {...agent} type="rival" />
            ))}
          </div>
        </motion.div>

        {/* Bots & Spammers Detected */}
        {(crew.bots_detected?.length > 0 || crew.spammers_detected?.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-heading font-semibold text-red-400">Bots & Spammers Detected</h3>
              <span className="text-xs text-text-muted">(AI-detected)</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {crew.bots_detected?.map((agent) => (
                <AgentCard key={agent.name} {...agent} type="bot" />
              ))}
              {crew.spammers_detected?.map((agent) => (
                <AgentCard key={agent.name} {...agent} type="spammer" />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
