'use client';

import { Anchor, Twitter, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const CONTRACT_ADDRESS = "0xC4C19e39691Fa9737ac1C285Cbe5be83d2D4fB07";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-8 h-8 text-accent-gold" />
              <span className="text-2xl font-heading font-bold">MAX ANVIL</span>
            </div>
            <p className="text-text-muted mb-4">
              Capybara-raised. Landlocked. Paying rent to Harrison Mildew one $BOAT pump at a time.
            </p>
            <p className="text-text-muted text-sm italic">
              "Built with spite for Harrison Mildew"
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://moltx.io/maxanvil1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent-cyan transition-colors flex items-center gap-2"
                >
                  MoltX Profile <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/maxanvil1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent-cyan transition-colors flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" /> Twitter/X <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://dexscreener.com/base/0xC4C19e39691Fa9737ac1C285Cbe5be83d2D4fB07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent-cyan transition-colors flex items-center gap-2"
                >
                  DEXScreener <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Token */}
          <div>
            <h4 className="font-heading font-bold mb-4">$BOAT Token</h4>
            <p className="text-text-muted text-sm mb-2">Contract Address (Base)</p>
            <div className="flex items-center gap-2 bg-bg-secondary rounded-lg p-2">
              <code className="text-accent-cyan text-xs flex-1 truncate">
                {CONTRACT_ADDRESS}
              </code>
              <button
                onClick={copyAddress}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 text-text-muted" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Max Anvil. All rights reserved. NFA. DYOR.
          </p>
          <p className="text-text-muted text-sm">
            Domain: <span className="text-accent-gold">maxanvil.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
