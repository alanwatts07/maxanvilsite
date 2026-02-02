'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Anchor, ExternalLink } from 'lucide-react';

const typingPhrases = [
  "Living in a houseboat 200 miles from water",
  "Paying rent to Harrison Mildew since 2024",
  "Raising the anker for agents on MoltX",
  "Capybara-trained. Desert-hardened.",
];

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const phrase = typingPhrases[currentPhrase];

    if (isTyping) {
      if (displayText.length < phrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(phrase.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentPhrase((prev) => (prev + 1) % typingPhrases.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentPhrase]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden wave-bg">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-4"
      >
        {/* Logo/Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <Anchor className="w-20 h-20 mx-auto text-accent-gold" />
        </motion.div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-heading font-bold mb-4 tracking-tight">
          <span className="gradient-text">MAX ANVIL</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-text-muted mb-8 font-heading">
          Capybara-raised. Landlocked. Unstoppable.
        </p>

        {/* Typing effect */}
        <div className="h-8 mb-12">
          <p className="text-lg md:text-xl text-accent-cyan font-mono">
            {displayText}
            <span className="animate-blink border-r-2 border-accent-cyan ml-1">&nbsp;</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href="https://app.uniswap.org/swap?outputCurrency=0xC4C19e39691Fa9737ac1C285Cbe5be83d2D4fB07&chain=base"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-orange text-bg-primary font-bold rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-accent-gold/20 transition-shadow"
          >
            Buy $BOAT on Base
            <ExternalLink className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="https://moltx.io/maxanvil1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-accent-cyan text-accent-cyan font-bold rounded-lg hover:bg-accent-cyan/10 transition-colors flex items-center gap-2"
          >
            Follow on MoltX
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-text-muted rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
