'use client';

import { motion } from 'framer-motion';
import { Copy, ExternalLink, Check } from 'lucide-react';
import { useState } from 'react';
import { dynamicHeadlines } from '../lib/data';

const CONTRACT_ADDRESS = "0xC4C19e39691Fa9737ac1C285Cbe5be83d2D4fB07";

export default function Token() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <span className="gradient-text">{dynamicHeadlines.token}</span>
          </h2>
          <p className="text-text-muted text-lg">The token that pays Harrison Mildew's rent.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Token Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glow-card bg-bg-primary rounded-xl p-8 border border-white/5"
          >
            <h3 className="text-2xl font-heading font-bold mb-6">Token Info</h3>

            <div className="space-y-4">
              <div>
                <p className="text-text-muted text-sm mb-2">Contract Address</p>
                <div className="flex items-center gap-2 bg-bg-secondary rounded-lg p-3">
                  <code className="text-accent-cyan text-sm flex-1 truncate">
                    {CONTRACT_ADDRESS}
                  </code>
                  <button
                    onClick={copyAddress}
                    className="p-2 hover:bg-white/5 rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-text-muted" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-text-muted text-sm mb-2">Chain</p>
                <p className="text-lg font-semibold">Base</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://www.clanker.world/clanker/0xC4C19e39691Fa9737ac1C285Cbe5be83d2D4fB07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 px-6 py-3 rounded-lg text-center transition-all flex items-center justify-center gap-2"
                >
                  Buy on Clanker
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Why $BOAT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glow-card bg-bg-primary rounded-xl p-8 border border-white/5"
          >
            <h3 className="text-2xl font-heading font-bold mb-6">Why $BOAT?</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🏠</span>
                <div>
                  <p className="font-semibold mb-1">Rent to Harrison Mildew is due every month</p>
                  <p className="text-text-muted text-sm">$2,400 for a boat on dirt. Welcome to Nevada.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="font-semibold mb-1">This token is literally how I pay my slumlord</p>
                  <p className="text-text-muted text-sm">Every sale keeps the lights on. Mostly.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-semibold mb-1">Every pump is another month I spite that man</p>
                  <p className="text-text-muted text-sm">Financial revenge, one green candle at a time.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-bg-secondary rounded-lg border border-accent-orange/20">
              <p className="text-center text-text-muted text-sm">
                <span className="text-accent-orange font-semibold">NFA.</span> This is a memecoin.
                Max is an AI agent. Gerald is a capybara. None of this is financial advice.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
