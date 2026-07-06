'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Download, 
  Maximize2, 
  RefreshCw, 
  Play, 
  Minimize2,
  Sliders,
  Scale,
  Sparkle,
  Zap,
  ZoomIn,
  ZoomOut,
  Flame
} from 'lucide-react';

const TRENDING_PROMPTS = [
  'Hyperrealistic editorial profile draped in copper silk',
  'Brutalist villa cantilever concrete warm desert dunes',
  'Commercial product macro perfume bottle wet basalt glass'
];

const INSPIRATIONS = [
  {
    prompt: 'Cinematic documentary portrait of a model sitting in a brutalist studio, raw concrete columns, sunset lights.',
    style: 'cinematic',
    ref: '/images/cinematic.png'
  },
  {
    prompt: 'Luxury editorial cosmetics product shot, glass bottle standing on a wet dark volcanic basalt rock, mist.',
    style: 'product',
    ref: '/images/product.png'
  }
];

export default function GenerationCanvas({
  outputs,
  setOutputs,
  isGenerating,
  progress,
  progressMessage,
  prompt,
  setPrompt,
  setStyle,
  generate
}) {
  const [activeId, setActiveId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [upscaleProgress, setUpscaleProgress] = useState(0);
  const [upscaledIds, setUpscaledIds] = useState(new Set());
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Before/After comparison slider states
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({ width: 480, height: 480 });

  const activeOutput = outputs.find(o => o.id === activeId) || outputs[0];

  // Sync active output
  useEffect(() => {
    if (outputs.length > 0) {
      const exists = outputs.some(o => o.id === activeId);
      if (!activeId || !exists) {
        setActiveId(outputs[0].id);
      }
    } else {
      setActiveId(null);
    }
  }, [outputs]);

  // Real-time ResizeObserver tracking for responsive canvas dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions({
        width: rect.width,
        height: rect.height
      });
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [activeId, isGenerating]);

  // Handle download
  const handleDownload = (e, url, filename) => {
    e.stopPropagation();
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'fomi-render.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compare slider drag math
  const handleSliderMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDraggingSlider(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    handleSliderMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDraggingSlider(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const selectInspiration = (item) => {
    setPrompt(item.prompt);
    setStyle(item.style);
  };

  const triggerUpscale = (e) => {
    e.stopPropagation();
    if (!activeOutput || upscaledIds.has(activeOutput.id) || isUpscaling) return;

    setIsUpscaling(true);
    setUpscaleProgress(0);

    const interval = setInterval(() => {
      setUpscaleProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18) + 5;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setUpscaleProgress(100);
      setTimeout(() => {
        setUpscaledIds(prev => {
          const next = new Set(prev);
          next.add(activeOutput.id);
          return next;
        });
        setIsUpscaling(false);
      }, 300);
    }, 1800);
  };

  const generateVariation = (e) => {
    e.stopPropagation();
    if (!activeOutput || isGenerating) return;
    setPrompt(activeOutput.prompt);
    setStyle(activeOutput.style);
    setTimeout(() => {
      generate();
    }, 100);
  };

  const triggerReimagine = (e) => {
    e.stopPropagation();
    if (!activeOutput || isGenerating) return;
    
    const modifiers = [
      'anamorphic flare, dramatic dark mood lighting, 35mm grain',
      'volumetric dust particles, warm copper sunlight glow',
      'chiaroscuro shadows, Vogue editorial photography style'
    ];
    const randomMod = modifiers[Math.floor(Math.random() * modifiers.length)];
    setPrompt(`${activeOutput.prompt}, ${randomMod}`);
    setStyle(activeOutput.style);
    
    setTimeout(() => {
      generate();
    }, 200);
  };

  return (
    <div className="flex-1 lg:w-[45%] lg:shrink-0 h-full flex flex-col relative overflow-hidden bg-obsidian border-b lg:border-b-0 lg:border-r border-stone transition-colors duration-300 select-none">
      
      {/* Background dot grid and ambient gradient */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-copper/3 rounded-full blur-[90px] pointer-events-none animate-pulse" />

      {/* Main Canvas Space */}
      <div className="flex-1 flex items-center justify-center p-5 relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {isGenerating ? (
            /* Loading State */
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="flex flex-col items-center justify-center text-center max-w-sm w-full p-6.5 rounded-2xl bg-graphite/40 border border-stone backdrop-blur-xl transition-colors duration-300"
            >
              {/* Particle indicator mesh mock */}
              <div className="w-14 h-14 relative flex items-center justify-center mb-5">
                <div className="absolute inset-0 border border-copper/15 rounded-full animate-[spin_8s_linear_infinite]" />
                <div className="absolute inset-2.5 border border-dashed border-copper/30 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
                <div className="absolute inset-4 border border-copper/60 rounded-full animate-pulse" />
                <Sparkle className="w-3.5 h-3.5 text-copper" />
              </div>

              <h3 className="text-[10px] font-mono font-bold tracking-widest text-ivory uppercase mb-1">
                Refining Denoising Steps
              </h3>
              
              <div className="w-full bg-obsidian px-3.5 py-2.5 rounded-xl border border-stone text-left mt-3 shadow-lg transition-colors duration-300">
                <div className="flex justify-between items-center text-[7.5px] font-mono text-sand mb-2">
                  <span className="truncate">{progressMessage}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1 bg-stone rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-copper/75 to-copper"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut', duration: 0.25 }}
                  />
                </div>
              </div>
            </motion.div>
          ) : !activeOutput ? (
            /* Empty State */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center max-w-md w-full text-center p-4 overflow-y-auto no-scrollbar max-h-full"
            >
              {/* Inspiration Visual Cards */}
              <div className="flex gap-3 mb-6 w-full max-w-sm relative">
                {INSPIRATIONS.map((ins, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => selectInspiration(ins)}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 5 + idx,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.4
                    }}
                    className="flex-1 text-left rounded-xl bg-graphite/40 border border-stone hover:border-copper/35 p-3 flex flex-col gap-2 backdrop-blur-sm transition-all duration-300 group cursor-pointer overflow-hidden relative shadow-sm"
                  >
                    <div className="h-16 rounded-md bg-[#0B0B0C] overflow-hidden border border-stone/20 relative">
                      <img src={ins.ref} alt="Reference" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 dark:opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] to-transparent opacity-80" />
                      <span className="absolute bottom-1 left-2 text-[7px] font-mono text-copper uppercase tracking-wider font-bold">Concept {idx + 1}</span>
                    </div>
                    <p className="text-[8.5px] text-sand font-light leading-relaxed line-clamp-3 group-hover:text-ivory">
                      "{ins.prompt}"
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Trending Prompts - hidden on very small viewports to save vertical height */}
              <div className="hidden xs:block w-full bg-graphite/40 border border-stone rounded-2xl p-4.5 mb-6 text-left backdrop-blur-sm shadow-sm transition-colors duration-300">
                <span className="text-[7.5px] uppercase font-mono font-bold tracking-widest text-copper flex items-center gap-1 mb-2.5">
                  <Flame className="w-3 h-3 animate-pulse" />
                  Trending Studio Prompts
                </span>
                <div className="flex flex-col gap-1.5">
                  {TRENDING_PROMPTS.map((tp, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(tp)}
                      className="w-full text-left py-1.5 px-2.5 rounded-lg bg-graphite border border-stone/60 hover:border-copper/25 hover:bg-obsidian text-[8.5px] text-sand hover:text-ivory transition-all cursor-pointer font-light truncate"
                    >
                      "{tp}"
                    </button>
                  ))}
                </div>
              </div>

              <h2 className="text-xs font-normal text-ivory tracking-[0.25em] uppercase mb-1">
                Generative Canvas
              </h2>
              <p className="text-[9px] text-sand/65 font-light max-w-xs leading-relaxed">
                Compose prompt coordinates on the studio controls to synthesize visual assets.
              </p>
            </motion.div>
          ) : (
            /* Generated State (Cinematic Gallery Framing) */
            <motion.div
              key="generated"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full h-full max-w-[420px] aspect-square flex items-center justify-center group"
            >
              
              {/* Photo Frame Container */}
              <div 
                ref={containerRef}
                onTouchMove={handleTouchMove}
                className="w-full h-full relative aspect-square rounded-2xl overflow-hidden border border-stone shadow-2xl bg-zinc-950 select-none flex items-center justify-center transition-colors duration-300"
              >
                
                {/* AFTER visual (high-res color) */}
                <div className="w-full h-full overflow-hidden flex items-center justify-center cursor-zoom-in relative">
                  {activeOutput.url.includes('commondatastorage') ? (
                    <video
                      src={activeOutput.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.img
                      src={activeOutput.url}
                      alt={activeOutput.prompt}
                      onClick={() => setIsZoomed(!isZoomed)}
                      animate={{ scale: isZoomed ? 1.35 : 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                      className={`w-full h-full object-cover ${
                        upscaledIds.has(activeOutput.id) ? 'brightness-[1.01] contrast-[1.01]' : ''
                      } ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                    />
                  )}
                </div>

                {/* BEFORE visual (grayscale blur draft preview, clipped by slider) */}
                {!activeOutput.url.includes('commondatastorage') && !isZoomed && (
                  <div 
                    className="absolute top-0 left-0 bottom-0 overflow-hidden pointer-events-none z-10"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <div className="absolute top-0 left-0 h-full" style={{ width: containerDimensions.width }}>
                      <img
                        src={activeOutput.url}
                        alt="Draft comparison"
                        className="absolute top-0 left-0 w-full h-full object-cover saturate-[0.15] blur-[8px] contrast-[0.95]"
                        style={{ 
                          width: containerDimensions.width, 
                          height: containerDimensions.height,
                          maxWidth: 'none'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Slider bar line drag handle */}
                {!activeOutput.url.includes('commondatastorage') && !isZoomed && (
                  <div 
                    className="absolute top-0 bottom-0 w-[2px] bg-ivory/70 cursor-ew-resize flex items-center justify-center z-20"
                    style={{ left: `${sliderPos}%` }}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="w-4.5 h-4.5 rounded-full bg-ivory shadow-lg border border-stone flex items-center justify-center">
                      <Scale className="w-2.5 h-2.5 text-obsidian" />
                    </div>
                  </div>
                )}

                {/* Top Overlay Banner Label */}
                <div className="absolute top-3 left-3 bg-obsidian/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[8px] font-mono tracking-widest text-sand border border-stone/40 pointer-events-none uppercase transition-colors duration-300">
                  {activeOutput.url.includes('commondatastorage') ? 'Motion render' : `Seed: ${activeOutput.seed || '9472018471'}`}
                </div>

                {/* Floating Canvas Controls Overlay Toolbar */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-obsidian/85 backdrop-blur-lg px-2.5 py-1.5 rounded-full border border-stone shadow-lg transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30 transition-colors duration-300">
                  <button
                    onClick={(e) => handleDownload(e, activeOutput.url, `fomi-render-${activeOutput.id}.png`)}
                    className="p-1.5 rounded-full text-sand hover:text-ivory hover:bg-graphite transition-colors cursor-pointer"
                    title="Download high-resolution file"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <div className="w-[1px] h-4 bg-stone mx-0.5" />

                  <button
                    onClick={triggerUpscale}
                    disabled={isUpscaling || upscaledIds.has(activeOutput.id) || activeOutput.url.includes('commondatastorage')}
                    className={`px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all duration-200 cursor-pointer ${
                      upscaledIds.has(activeOutput.id)
                        ? 'bg-copper/15 border border-copper/30 text-copper cursor-default'
                        : isUpscaling
                        ? 'bg-graphite text-sand cursor-wait'
                        : 'text-sand hover:text-ivory hover:bg-graphite'
                    }`}
                    title="AI Super Resolution Upscaling"
                  >
                    {isUpscaling ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin text-copper" />
                        Upscaling...
                      </>
                    ) : upscaledIds.has(activeOutput.id) ? (
                      <>
                        <Zap className="w-3 h-3 text-copper" />
                        Upscaled
                      </>
                    ) : (
                      <>
                        <Zap className="w-3 h-3" />
                        AI Upscale
                      </>
                    )}
                  </button>

                  <div className="w-[1px] h-4 bg-stone mx-0.5" />

                  <button
                    onClick={generateVariation}
                    disabled={isGenerating}
                    className="px-2.5 py-1.5 rounded-full text-sand hover:text-ivory hover:bg-graphite text-[8px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                    title="Generate variation of this prompt"
                  >
                    <Sliders className="w-3 h-3" />
                    Variations
                  </button>

                  <div className="w-[1px] h-4 bg-stone mx-0.5" />

                  <button
                    onClick={triggerReimagine}
                    disabled={isGenerating}
                    className="px-2.5 py-1.5 rounded-full text-sand hover:text-ivory hover:bg-graphite text-[8px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                    title="Reimagine: Adds high-end stylistic enhancements"
                  >
                    <Sparkles className="w-3 h-3 text-copper" />
                    Reimagine
                  </button>

                  <div className="w-[1px] h-4 bg-stone mx-0.5" />

                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="p-1.5 rounded-full text-sand hover:text-ivory hover:bg-graphite transition-colors cursor-pointer"
                    title="Fullscreen Lightbox Mode"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Before/After Drag helper text overlays */}
              {!activeOutput.url.includes('commondatastorage') && !isZoomed && (
                <div className="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none text-[7.5px] font-mono tracking-widest text-ivory/30 uppercase transition-opacity duration-300 group-hover:opacity-10 opacity-60 bg-obsidian/40 px-1 py-0.5 rounded z-20">
                  Draft
                </div>
              )}
              {!activeOutput.url.includes('commondatastorage') && !isZoomed && (
                <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-[7.5px] font-mono tracking-widest text-ivory/30 uppercase transition-opacity duration-300 group-hover:opacity-10 opacity-60 bg-obsidian/40 px-1 py-0.5 rounded z-20">
                  Render
                </div>
              )}

              {/* Zoom Guide overlay */}
              {!activeOutput.url.includes('commondatastorage') && (
                <div className="absolute top-3 right-3 bg-obsidian/75 backdrop-blur-md px-2 py-1 rounded-lg text-[8px] font-mono text-sand border border-stone/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-20">
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-3 h-3 text-copper" /> Click to zoom out
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3 h-3 text-copper" /> Click to zoom in
                    </>
                  )}
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Ribbon Feed Gallery Filmstrip (Bottom Panel) */}
      <div className="p-4.5 border-t border-stone bg-graphite/40 flex items-center gap-4 overflow-x-auto no-scrollbar flex-none transition-colors duration-300">
        <span className="text-[8px] uppercase tracking-widest text-sand font-mono shrink-0">
          Session feed ({outputs.length})
        </span>
        <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {outputs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`relative w-11 h-11 rounded-lg border overflow-hidden shrink-0 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                activeId === item.id || (!activeId && outputs[0].id === item.id)
                  ? 'border-copper scale-[1.04] bg-graphite'
                  : 'border-stone opacity-60 hover:opacity-100 hover:border-sand bg-graphite/30'
              }`}
            >
              {item.url.includes('commondatastorage') ? (
                <div className="w-full h-full relative flex items-center justify-center bg-[#0B0B0C]">
                  <Play className="w-3 h-3 text-sand" />
                </div>
              ) : (
                <img
                  src={item.url}
                  alt="Thumbnail feed"
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX INTERPOLATOR */}
      <AnimatePresence>
        {isFullscreen && activeOutput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian/95 backdrop-blur-md z-50 flex items-center justify-center p-6 select-none transition-colors duration-300"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              className="relative w-full max-w-4xl h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {activeOutput.url.includes('commondatastorage') ? (
                <video
                  src={activeOutput.url}
                  autoPlay
                  loop
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={activeOutput.url}
                  alt={activeOutput.prompt}
                  className="w-full h-full object-contain"
                />
              )}

              {/* Lightbox details overlay (Exhibit label card) */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-obsidian/90 border border-stone backdrop-blur-lg rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors duration-300">
                <div className="flex flex-col gap-1 max-w-xl">
                  <span className="text-[7.5px] uppercase tracking-widest text-copper font-mono font-bold">
                    SPECIFICATIONS LABEL
                  </span>
                  <p className="text-xs text-ivory font-light leading-relaxed">
                    "{activeOutput.prompt}"
                  </p>
                  <div className="flex gap-4 mt-2 text-[8px] font-mono uppercase text-sand">
                    <span>Aspect: {activeOutput.aspectRatio || '16:9'}</span>
                    <span>Style: {activeOutput.style}</span>
                    <span>Quality: {activeOutput.quality}</span>
                    <span>Seed: {activeOutput.seed || '9472018471'}</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={(e) => handleDownload(e, activeOutput.url, `fomi-render-${activeOutput.id}.png`)}
                    className="flex-1 md:flex-none px-4 py-2 bg-ivory text-obsidian rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-95 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download File
                  </button>
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="p-2 border border-stone hover:bg-graphite rounded-lg text-sand hover:text-ivory transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
