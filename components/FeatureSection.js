'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Edit3, Film, ZoomIn, LayoutGrid, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer, transitionPremium, EASE_CUSTOM } from '@/animations/motionVariants';

const FEATURES = [
  {
    id: 'text-to-image',
    tag: 'Synthesis',
    title: 'Text-to-Image Compilation',
    desc: 'Render conceptual prompt subjects into highly structured high-resolution references. Style controls allow visual architects to map composition layout and daylight angles precisely.',
    icon: Sparkles,
    imgSrc: '/images/fashion.png',
    actionText: 'Open Board',
    badge: 'Dual Synthesis'
  },
  {
    id: 'image-editing',
    tag: 'Canvas',
    title: 'Context-Aware Spatial Infill',
    desc: 'Modify specific areas of your canvas with brush masking. Seamlessly extend compositions or replace visual components while preserving resolution, textures, and cast shadows.',
    icon: Edit3,
    imgSrc: '/images/architecture.png',
    actionText: 'Launch Editor',
    badge: 'Spatial Mask'
  },
  {
    id: 'text-to-video',
    tag: 'Motion',
    title: 'Cinematic Motion Vectoring',
    desc: 'Inject subtle physical animation into static scenes. Generate high-framerate vector clips that accurately replicate environmental factors like wind, fluid movement, and camera drifts.',
    icon: Film,
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    imgSrc: '/images/cinematic.png',
    actionText: 'Generate Motion',
    badge: 'Motion Vector'
  },
  {
    id: 'upscaling',
    tag: 'Resolution',
    title: 'Detail Scale Multiplier',
    desc: 'Enhance image references by injecting organic texture details like fabric weaves, skin pores, and spatial reflections. Scale assets 4x without losing structural clarity.',
    icon: ZoomIn,
    imgSrc: '/images/product.png',
    actionText: 'Super Resolve',
    badge: '4x Scale'
  },
  {
    id: 'templates',
    tag: 'Mediums',
    title: 'Visual Medium Templates',
    desc: 'Browse preset board parameters configured by visual directors. Instantly import style states, shutter values, contrast weights, and color boards.',
    icon: LayoutGrid,
    imgSrc: '/images/fantasy.png',
    actionText: 'Browse Presets',
    badge: '20+ Mediums'
  }
];

export default function FeatureSection() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-ivory/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-24">
        <div>
          <span className="text-[10px] tracking-[0.2em] text-sand uppercase font-bold">
            Studio Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-ivory tracking-tight mt-2">
            Surgical Workspace Tools
          </h2>
        </div>
        <p className="text-sand text-xs md:text-sm font-light max-w-md leading-relaxed">
          A dedicated workbench of image utilities built to support creative directors, brand designers, and visual researchers.
        </p>
      </div>

      {/* Feature Rows */}
      <div className="flex flex-col gap-32 md:gap-40">
        {FEATURES.map((feat, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={feat.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              {/* Text Side */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: EASE_CUSTOM }}
                className={`lg:col-span-5 flex flex-col justify-center ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                {/* Tagline */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[8px] uppercase tracking-widest text-sand font-bold">
                    {feat.tag}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-sand/30" />
                  <span className="text-[8px] uppercase tracking-widest text-sand/50 font-mono">
                    {feat.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-light text-ivory tracking-tight mb-5">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-sand text-xs md:text-sm font-light leading-relaxed mb-8">
                  {feat.desc}
                </p>

                {/* Action Link */}
                <a
                  href="#workspace"
                  className="inline-flex items-center gap-1.5 self-start text-[10px] font-bold uppercase tracking-widest text-ivory hover:opacity-70 transition-opacity duration-300 group animate-none"
                >
                  {feat.actionText}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>

              {/* Visual Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: EASE_CUSTOM }}
                className={`lg:col-span-7 w-full flex items-center justify-center ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                {/* Video Feature */}
                {feat.videoSrc ? (
                  <div className="relative w-full aspect-[16/10] bg-graphite rounded-xl overflow-hidden border border-ivory/10 shadow-sm">
                    {feat.imgSrc && (
                      <Image
                        src={feat.imgSrc}
                        alt={feat.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}
                    <video
                      src={feat.videoSrc}
                      poster={feat.imgSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                  </div>
                ) : feat.id === 'upscaling' ? (
                  /* Upscaler Slider Demo */
                  <div className="relative w-full aspect-[16/10] bg-graphite rounded-xl overflow-hidden border border-ivory/10 shadow-sm select-none">
                    {/* Low Res (Background) */}
                    <div className="absolute inset-0 filter blur-xs opacity-75">
                      <Image
                        src={feat.imgSrc}
                        alt="Low Res Upscale Demo"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    
                    {/* High Res (Foreground clipped) */}
                    <div 
                      className="absolute inset-y-0 left-0 right-0 overflow-hidden"
                      style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                    >
                      <Image
                        src={feat.imgSrc}
                        alt="High Res Upscale Demo"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    {/* Slider Line Indicator */}
                    <div 
                      className="absolute inset-y-0 w-[1px] bg-ivory/70 cursor-ew-resize z-10"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-ivory text-obsidian flex items-center justify-center text-[10px] shadow-md border border-ivory/5 select-none font-bold">
                        ||
                      </div>
                    </div>

                    {/* Slider input */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                      aria-label="Upscaler comparison slider"
                    />
                  </div>
                ) : (
                  /* Standard Static Visual Card */
                  <div className="relative w-full aspect-[16/10] bg-graphite rounded-xl overflow-hidden border border-ivory/10 group shadow-sm">
                    <Image
                      src={feat.imgSrc}
                      alt={feat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
