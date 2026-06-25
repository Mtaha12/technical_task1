'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, EASE_CUSTOM } from '@/animations/motionVariants';

export default function CTA({ onStartGenerate }) {
  const [ctaPrompt, setCtaPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ctaPrompt.trim() !== '') {
      onStartGenerate(ctaPrompt);
    }
  };

  return (
    <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-ivory/10 relative overflow-hidden">
      <div className="bg-graphite border border-ivory/10 rounded-2xl p-10 md:p-20 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="max-w-2xl flex flex-col items-center"
        >
          {/* Tagline */}
          <span className="text-[9px] tracking-[0.2em] text-sand uppercase font-bold mb-6 block">
            Instant Compilation
          </span>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-light text-ivory tracking-tight leading-[1.15] mb-6">
            Curate your next <br />
            <span className="font-semibold text-ivory">
              visual boards.
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-sand text-xs md:text-sm font-light max-w-md mb-12 leading-relaxed">
            Enter the workspace to configure your spatial boards. Select your medium, write your instructions, and compile details in seconds.
          </p>

          {/* Prompt Field */}
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-obsidian rounded-xl p-1.5 border border-ivory/10 focus-within:border-ivory/30 transition-all duration-300 flex flex-col sm:flex-row items-center gap-2 shadow-inner"
          >
            <input
              type="text"
              value={ctaPrompt}
              onChange={(e) => setCtaPrompt(e.target.value)}
              placeholder="Type a creative direction..."
              className="w-full bg-transparent border-none outline-none text-ivory placeholder-sand/40 text-xs py-3 px-4 font-light focus:ring-0"
              aria-label="Masterpiece Prompt"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg bg-ivory text-obsidian text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all duration-300 shrink-0 group cursor-pointer"
            >
              Compile
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </form>

          {/* Muted details */}
          <span className="text-[8px] text-sand/40 font-mono tracking-widest uppercase mt-4">
            FREE CURATION ACCOUNT &bull; 50 INITIAL COMPILATIONS
          </span>
        </motion.div>
      </div>
    </section>
  );
}
