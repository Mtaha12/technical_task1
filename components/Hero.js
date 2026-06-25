'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ImageMasonry from './ImageMasonry';
import { fadeInUp, staggerContainer, EASE_CUSTOM } from '@/animations/motionVariants';

const PRESET_PROMPTS = [
  { label: 'Brutalist Spatial', text: 'Brutalist architecture retreat on a sand dune, sunrise, soft ivory light.' },
  { label: 'Avant-Garde Studio', text: 'A high-fashion avant-garde editorial portrait in warm copper tones, minimalist obsidian studio backdrop.' },
  { label: 'Commercial Glass', text: 'Luxury perfume bottle of dark obsidian glass, standing on wet black slate rocks, moody studio photography.' }
];

export default function Hero({ onStartGenerate }) {
  const [heroPrompt, setHeroPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (heroPrompt.trim() !== '') {
      onStartGenerate(heroPrompt);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column - Headline & Prompts */}
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col justify-center"
        >
          {/* Subheading Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center self-start px-2.5 py-1 bg-ivory/5 rounded text-sand text-[9px] tracking-[0.2em] uppercase font-bold mb-6"
          >
            Studio Board v2.5
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-ivory leading-[1.1] mb-6"
          >
            A workspace for <br />
            <span className="font-semibold text-ivory">
              visual research.
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={fadeInUp}
            className="text-sand text-sm md:text-base font-light leading-relaxed max-w-xl mb-10"
          >
            An editorial platform for visual curation, concept generation, and spatial design. Built for directors, designers, and visual architects who require structural control and aesthetic integrity.
          </motion.p>

          {/* Prompt Form */}
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-graphite rounded-xl p-1.5 border border-ivory/10 focus-within:border-ivory/30 transition-all duration-300 flex flex-col sm:flex-row items-center gap-2 shadow-sm"
          >
            <input
              type="text"
              value={heroPrompt}
              onChange={(e) => setHeroPrompt(e.target.value)}
              placeholder="Type a creative direction..."
              className="w-full bg-transparent border-none outline-none text-ivory placeholder-sand/40 text-xs py-3 px-4 font-light focus:ring-0"
              aria-label="Vision Prompt"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg bg-ivory text-obsidian text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all duration-300 shrink-0 group"
            >
              Compile
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </motion.form>

          {/* Preset Pills */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            <span className="text-[9px] uppercase tracking-widest text-sand font-bold mr-1">Tuned presets:</span>
            {PRESET_PROMPTS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setHeroPrompt(preset.text)}
                type="button"
                className="px-3 py-1.5 rounded-full border border-ivory/10 hover:border-ivory/30 bg-graphite/40 text-[9px] text-sand hover:text-ivory font-medium tracking-wider transition-all duration-200 cursor-pointer focus:outline-none"
              >
                {preset.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Gallery Wall */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: EASE_CUSTOM }}
          className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end"
        >
          <ImageMasonry />
        </motion.div>
      </div>
    </section>
  );
}
