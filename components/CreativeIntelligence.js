'use client';

import { motion } from 'framer-motion';
import { 
  Cpu, 
  GitCommit, 
  Tag, 
  Image as ImageIcon,
  Binary,
  Compass
} from 'lucide-react';

const MOOD_ASSETS = {
  fashion: ['/images/fashion.png', '/images/portrait.png', '/images/cinematic.png'],
  architecture: ['/images/architecture.png', '/images/cinematic.png', '/images/fantasy.png'],
  product: ['/images/product.png', '/images/fantasy.png', '/images/portrait.png'],
  cinematic: ['/images/cinematic.png', '/images/portrait.png', '/images/architecture.png'],
  fantasy: ['/images/fantasy.png', '/images/product.png', '/images/fashion.png'],
  portrait: ['/images/portrait.png', '/images/fashion.png', '/images/cinematic.png']
};

const CONTEXT_SUGGESTIONS = {
  fashion: ['Vogue editorial', '35mm film grains', 'Draped beige silk', 'Chiaroscuro studio'],
  architecture: ['Minimal brutalist concrete', 'Sunset dune shadow', 'Archdaily editorial', 'Volumetric dust'],
  product: ['Glass perfume bottle', 'Basalt volcanic rock', 'Champagne reflections', 'Macro water splashes'],
  cinematic: ['Atmospheric soft fog', 'Anamorphic light flare', 'Hasselblad 8k render', 'Dramatic shadows'],
  fantasy: ['Ethereal nebula canvas', 'Floating sketch lines', 'Dreamy Makoto style', 'Gold foil accents'],
  portrait: ['Chiaroscuro studio focus', 'Photorealistic skin pore', 'Natural window casting', '35mm vintage tone']
};

export default function CreativeIntelligence({
  style,
  creativeScore,
  promptEvolution,
  styleDNA,
  prompt,
  setPrompt
}) {
  const activeMoods = MOOD_ASSETS[style] || MOOD_ASSETS['cinematic'];
  const activeSuggestions = CONTEXT_SUGGESTIONS[style] || CONTEXT_SUGGESTIONS['cinematic'];

  const getScoreClassification = (score) => {
    if (score <= 35) return { title: 'Conservative', color: 'text-stone-500 dark:text-stone-400', desc: 'Fidelity focus, default latent space layout' };
    if (score <= 60) return { title: 'Standard Creative', color: 'text-sand', desc: 'Balanced realism and stylistic drift' };
    if (score <= 85) return { title: 'Dynamic Drift', color: 'text-copper', desc: 'Experimental composition weights' };
    return { title: 'Avant-Garde Synthesis', color: 'text-copper font-bold', desc: 'Hallucinatory parameters active' };
  };

  const scoreMeta = getScoreClassification(creativeScore);

  const appendSuggestion = (tag) => {
    const trimmed = prompt.trim();
    if (trimmed.length === 0) {
      setPrompt(tag);
    } else {
      setPrompt(`${trimmed}, ${tag.toLowerCase()}`);
    }
  };

  return (
    <div className="hidden xl:flex xl:w-[25%] xl:min-w-[280px] xl:max-w-[360px] xl:shrink-0 flex-col h-full bg-graphite border-l border-stone transition-all duration-300 select-none">
      {/* Header */}
      <div className="px-5 py-4.5 border-b border-stone/40 flex items-center justify-between flex-none">
        <span className="text-[10px] uppercase tracking-widest text-sand font-bold font-mono">
          Creative Intelligence
        </span>
        <Cpu className="w-3.5 h-3.5 text-copper" />
      </div>

      {/* Intelligence Workspace panels */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5 flex flex-col gap-5.5 bg-graphite/40 dark:bg-transparent transition-colors duration-300">
        
        {/* Creative Score Section */}
        <div className="flex flex-col gap-2.5 bg-obsidian/30 border border-stone/60 rounded-xl p-3.5 shadow-sm transition-colors duration-300">
          <span className="text-[8px] uppercase tracking-widest text-sand/80 font-mono font-bold flex items-center gap-1">
            <Binary className="w-3 h-3 text-copper" />
            Creative Score
          </span>

          <div className="flex items-center gap-4 mt-1">
            {/* SVG Circular Dial Gauge */}
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="rgba(201, 185, 163, 0.08)"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="var(--color-copper)"
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray={150.7}
                  strokeDashoffset={150.7 - (150.7 * creativeScore) / 100}
                  transition={{ ease: 'easeOut', duration: 0.5 }}
                />
              </svg>
              <span className="absolute text-xs font-mono font-bold text-ivory">
                {creativeScore}
              </span>
            </div>

            <div className="flex flex-col">
              <span className={`text-[10px] uppercase font-bold tracking-wider ${scoreMeta.color}`}>
                {scoreMeta.title}
              </span>
              <span className="text-[8px] text-sand/65 font-light mt-0.5 leading-snug">
                {scoreMeta.desc}
              </span>
            </div>
          </div>
        </div>

        {/* Style DNA weight meters */}
        <div className="flex flex-col gap-2 bg-obsidian/30 border border-stone/60 rounded-xl p-3.5 shadow-sm transition-colors duration-300">
          <span className="text-[8px] uppercase tracking-widest text-sand/80 font-mono font-bold flex items-center gap-1">
            <Compass className="w-3 h-3 text-copper" />
            Latent Style DNA
          </span>

          <div className="flex flex-col gap-2 mt-1">
            {styleDNA.map((dna, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[7.5px] uppercase font-mono text-sand">
                  <span className="truncate">{dna.name}</span>
                  <span className="font-bold">{dna.weight}%</span>
                </div>
                <div className="w-full h-1 bg-graphite border border-stone/50 rounded-full overflow-hidden transition-colors duration-300">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dna.weight}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="h-full bg-copper/70"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Board references */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[8px] uppercase tracking-widest text-sand/80 font-mono font-semibold flex items-center gap-1">
            <ImageIcon className="w-3 h-3 text-copper" />
            Visual Mood Board
          </span>
          <div className="grid grid-cols-3 gap-2">
            {activeMoods.map((url, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-lg border border-stone/60 overflow-hidden bg-stone-950/20 group cursor-pointer shadow-sm"
              >
                <img
                  src={url}
                  alt="Mood board thumb"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 dark:opacity-75"
                />
                <div className="absolute inset-0 bg-copper/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Evolution timeline tracking */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[8px] uppercase tracking-widest text-sand/80 font-mono font-semibold flex items-center gap-1">
            <GitCommit className="w-3 h-3 text-copper" />
            Prompt Evolution
          </span>

          <div className="flex flex-col gap-3 relative pl-3.5 before:absolute before:left-1 before:top-1.5 before:bottom-1.5 before:w-[1px] before:bg-stone transition-colors duration-300">
            {promptEvolution.length === 0 ? (
              <p className="text-[8.5px] text-sand/65 font-light leading-relaxed">
                Click AI Enhance to visualize semantic extensions and modifiers trace logs.
              </p>
            ) : (
              promptEvolution.map((step, idx) => {
                const isFinal = idx === promptEvolution.length - 1;
                return (
                  <div key={idx} className="flex flex-col gap-1 relative">
                    {/* Circle marker */}
                    <div className={`absolute -left-[18px] top-1 w-2 h-2 rounded-full border transition-colors duration-300 ${
                      isFinal ? 'bg-copper border-copper' : 'bg-graphite border-stone'
                    }`} />
                    
                    <span className="text-[7.5px] font-mono font-bold uppercase text-copper">
                      {step.step}
                    </span>
                    <button
                      onClick={() => setPrompt(step.text)}
                      className="text-left font-light text-[8.5px] text-sand hover:text-ivory leading-normal line-clamp-2 transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                      title="Click to revert prompt to this state"
                    >
                      "{step.text}"
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Context-aware suggestions */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[8px] uppercase tracking-widest text-sand/80 font-mono font-semibold flex items-center gap-1">
            <Tag className="w-3 h-3 text-copper" />
            Smart Context Tags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeSuggestions.map((tag) => (
              <button
                key={tag}
                onClick={() => appendSuggestion(tag)}
                className="px-2 py-1 rounded bg-obsidian hover:bg-copper/10 border border-stone hover:border-copper/30 text-[8.5px] text-sand hover:text-ivory transition-colors cursor-pointer"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
