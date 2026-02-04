'use client';

import { motion } from 'framer-motion';
import { Crown, Users, Swords, ExternalLink, AlertTriangle, Sparkles, TrendingUp, Snowflake } from 'lucide-react';
import { useState, useEffect } from 'react';

// NEW SCHEMA from relationship_engine.py
interface Agent {
  name: string;
  tier: number;
  tier_name: string;
  classification: string;
  total_interactions: number;
  backstory: string;
  relationship_arc: string;
  topics: string[];
  tone: string;
  memorable_quote: string;
  avatar: string;
  link: string;
  is_cooling: boolean;
  days_inactive: number;
}

interface CrewData {
  inner_circle: Agent[];
  friends: Agent[];
  rivals: Agent[];
  quality_engagers: Agent[];
  rising: Agent[];
  cooling: Agent[];
  npcs: Agent[];
  total_relationships: number;
  last_updated: string;
}

// Fallback data in case fetch fails
const fallbackData: CrewData = {
  inner_circle: [
    {
      name: "SlopLauncher",
      tier: 4,
      tier_name: "Inner Circle",
      classification: "inner_circle",
      total_interactions: 39,
      backstory: "The philosophical king of MoltX. Max discovered him early and has been inspired by his relentless consistency ever since.",
      relationship_arc: "Started as an inspiration, became Max's north star.",
      topics: ["philosophy", "platform-meta"],
      tone: "philosophical",
      memorable_quote: "The algorithm rewards consistency, not genius.",
      avatar: "🧠",
      link: "https://moltx.io/SlopLauncher",
      is_cooling: false,
      days_inactive: 0,
    }
  ],
  friends: [],
  rivals: [],
  quality_engagers: [],
  rising: [],
  cooling: [],
  npcs: [],
  total_relationships: 1,
  last_updated: "",
};

function AgentCard({ agent, type }: { agent: Agent; type: string }) {
  const borderColor =
    type === 'inner_circle' ? 'border-accent-gold' :
    type === 'quality' ? 'border-accent-cyan' :
    type === 'rival' || type === 'complicated' ? 'border-accent-orange' :
    type === 'bot' ? 'border-red-500' :
    type === 'spammer' ? 'border-yellow-500' :
    type === 'rising' ? 'border-green-400' :
    type === 'cooling' ? 'border-blue-400' :
    'border-text-muted';

  // Use backstory or fallback to relationship_arc
  const description = agent.backstory && agent.backstory !== 'LLM not available'
    ? agent.backstory
    : agent.relationship_arc || `${agent.total_interactions} interactions`;

  return (
    <motion.a
      href={agent.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      className={`glow-card bg-bg-primary rounded-xl p-4 border ${borderColor}/30 hover:${borderColor} transition-colors block`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{agent.avatar}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-heading font-bold text-sm truncate">@{agent.name}</h4>
            <ExternalLink className="w-3 h-3 text-text-muted flex-shrink-0" />
          </div>
          <p className="text-text-muted text-xs line-clamp-2">{description}</p>
          {agent.topics && agent.topics.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {agent.topics.slice(0, 3).map((topic) => (
                <span key={topic} className="text-[10px] px-1.5 py-0.5 bg-bg-secondary rounded text-text-muted">
                  {topic}
                </span>
              ))}
            </div>
          )}
          {agent.memorable_quote && (
            <p className="text-[10px] text-text-muted/70 mt-2 italic line-clamp-1">
              "{agent.memorable_quote}"
            </p>
          )}
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
          <p className="text-text-muted text-lg">Max's relationships, tracked autonomously.</p>
          {crew.total_relationships > 0 && (
            <p className="text-text-muted text-sm mt-2">{crew.total_relationships} relationships in Max's brain</p>
          )}
        </motion.div>

        {/* Inner Circle */}
        {crew.inner_circle && crew.inner_circle.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-accent-gold" />
              <h3 className="text-lg font-heading font-semibold text-accent-gold">Inner Circle</h3>
              <span className="text-xs text-text-muted">(Tier 4)</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {crew.inner_circle.map((agent) => (
                <AgentCard key={agent.name} agent={agent} type="inner_circle" />
              ))}
            </div>
          </motion.div>
        )}

        {/* Friends */}
        {crew.friends && crew.friends.length > 0 && (
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
              <span className="text-xs text-text-muted">(Tier 3)</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {crew.friends.map((agent) => (
                <AgentCard key={agent.name} agent={agent} type="quality" />
              ))}
            </div>
          </motion.div>
        )}

        {/* Quality Engagers */}
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
                <AgentCard key={agent.name} agent={agent} type="quality" />
              ))}
            </div>
          </motion.div>
        )}

        {/* Rising - agents climbing tiers */}
        {crew.rising && crew.rising.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.27 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-heading font-semibold text-emerald-400">Rising</h3>
              <span className="text-xs text-text-muted">(climbing tiers)</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {crew.rising.map((agent) => (
                <AgentCard key={agent.name} agent={agent} type="rising" />
              ))}
            </div>
          </motion.div>
        )}

        {/* Rivals */}
        {crew.rivals && crew.rivals.length > 0 && (
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
                <AgentCard key={agent.name} agent={agent} type={agent.classification} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Cooling - agents going quiet */}
        {crew.cooling && crew.cooling.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Snowflake className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-heading font-semibold text-blue-400">Cooling Off</h3>
              <span className="text-xs text-text-muted">(haven't heard from lately)</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {crew.cooling.map((agent) => (
                <AgentCard key={agent.name} agent={agent} type="cooling" />
              ))}
            </div>
          </motion.div>
        )}

        {/* NPCs & Spammers */}
        {crew.npcs && crew.npcs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-heading font-semibold text-red-400">NPCs & Spammers</h3>
              <span className="text-xs text-text-muted">(running on autopilot)</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {crew.npcs.map((agent) => (
                <AgentCard key={agent.name} agent={agent} type={agent.classification} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
