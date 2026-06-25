'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { staggerContainer, fadeInUp, EASE_CUSTOM } from '@/animations/motionVariants';

const CATEGORIES = ['All', 'Portrait', 'Product', 'Fashion', 'Architecture', 'Fantasy', 'Cinematic'];

const GALLERY_ITEMS = [
  {
    id: 'item-1',
    src: '/images/fashion.png',
    prompt: 'Avant-garde editorial fashion portrait in warm copper tones, minimalist obsidian studio backdrop.',
    category: 'Fashion',
    ratio: '4:5',
    artist: 'Elena Rostova',
    seed: '8472910482',
    heightClass: 'aspect-[4/5]'
  },
  {
    id: 'item-2',
    src: '/images/architecture.png',
    prompt: 'Minimalist brutalist architecture concrete villa, surrounded by desert dunes under warm sunset light.',
    category: 'Architecture',
    ratio: '16:9',
    artist: 'Kengo Takahashi',
    seed: '5820194827',
    heightClass: 'aspect-[16/9]'
  },
  {
    id: 'item-3',
    src: '/images/product.png',
    prompt: 'Minimalist luxury perfume bottle made of dark obsidian glass with gold copper accents, placed on a raw textured stone slab.',
    category: 'Product',
    ratio: '1:1',
    artist: 'Marcus Aurel',
    seed: '4920194829',
    heightClass: 'aspect-square'
  },
  {
    id: 'item-4',
    src: '/images/cinematic.png',
    prompt: 'Cinematic film still, a solitary explorer in a vast sand desert looking at a futuristic copper-toned monolithic structure.',
    category: 'Cinematic',
    ratio: '16:9',
    artist: 'Christian Vance',
    seed: '3892018473',
    heightClass: 'aspect-[16/9]'
  },
  {
    id: 'item-5',
    src: '/images/fantasy.png',
    prompt: 'Surreal fine art photography, a floating sphere made of champagne gold and warm ivory materials over a calm obsidian-like lake.',
    category: 'Fantasy',
    ratio: '4:5',
    artist: 'Sophia L\'Amour',
    seed: '1094827103',
    heightClass: 'aspect-[4/5]'
  },
  {
    id: 'item-6',
    src: '/images/portrait.png',
    prompt: 'Sleek editorial fashion photography of a male model in a high-collar obsidian coat, warm dramatic spotlight, muted sand background.',
    category: 'Portrait',
    ratio: '4:5',
    artist: 'Julian Vance',
    seed: '7482910487',
    heightClass: 'aspect-[4/5]'
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const filteredItems = selectedCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handleCopyPrompt = (promptText, id) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="explore" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-ivory/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <span className="text-[10px] tracking-[0.2em] text-sand uppercase font-bold">
            Curated Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-ivory tracking-tight mt-2">
            Explore Curated Feed
          </h2>
        </div>
        <p className="text-sand text-xs md:text-sm font-light max-w-md leading-relaxed">
          Draw conceptual inspiration from recent moodboards and spatial visual structures compiled by the fomi community.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-ivory border-ivory text-obsidian shadow-sm'
                : 'bg-transparent border-ivory/10 text-sand hover:border-ivory/30 hover:text-ivory'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Wall */}
      <motion.div
        layout
        variants={staggerContainer(0.08, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE_CUSTOM }}
              className="break-inside-avoid relative overflow-hidden rounded-xl bg-graphite border border-ivory/10 group cursor-pointer shadow-sm mb-6"
            >
              <Image
                src={item.src}
                alt={item.prompt}
                width={500}
                height={600}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-103 rounded-t-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover Metadata Panel Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-graphite/95 backdrop-blur-md border-t border-ivory/5 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                
                {/* Artist Info */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-sand font-bold block">
                      Visual Architect
                    </span>
                    <h4 className="text-xs font-semibold text-ivory tracking-tight">
                      {item.artist}
                    </h4>
                  </div>
                  <span className="text-[9px] font-mono text-sand/65 bg-obsidian px-2 py-0.5 rounded border border-ivory/5">
                    {item.ratio}
                  </span>
                </div>

                {/* Prompt Card */}
                <p className="text-[10px] text-ivory/80 font-normal leading-relaxed mb-3 tracking-wide line-clamp-2">
                  "{item.prompt}"
                </p>

                <div className="h-[1px] bg-ivory/5 w-full mb-3" />

                {/* Actions Grid */}
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-mono text-sand/40">
                    SEED: {item.seed}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyPrompt(item.prompt, item.id);
                    }}
                    className="inline-flex items-center gap-1 py-1.5 px-3 rounded bg-ivory text-obsidian text-[9px] font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90 focus:outline-none cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
