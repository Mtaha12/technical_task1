'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Square, 
  Tv, 
  Smartphone, 
  Maximize2, 
  Download, 
  AlertCircle, 
  RefreshCw, 
  Play,
  Film,
  Image as ImageIcon
} from 'lucide-react';
import { useGenerateContent } from '@/hooks/useGenerateContent';
import { fadeInUp, staggerContainer, transitionPremium, EASE_CUSTOM } from '@/animations/motionVariants';

const STYLES = [
  { id: 'cinematic', name: 'Editorial 35mm', desc: 'Grainy film stock & daylight shadow' },
  { id: 'fashion', name: 'Avant-Garde Studio', desc: 'High-contrast studio portraits' },
  { id: 'architecture', name: 'Spatial Brutalism', desc: 'Raw concrete structures & dunes' },
  { id: 'product', name: 'Commercial Still', desc: 'Clean, detailed product capture' },
  { id: 'fantasy', name: 'Ethereal Canvas', desc: 'Abstract textures & floating objects' },
];

const RATIOS = [
  { id: '1:1', name: 'Square', icon: Square, desc: '1:1', cssClass: 'w-5 h-5' },
  { id: '16:9', name: 'Landscape', icon: Tv, desc: '16:9', cssClass: 'w-7 h-4' },
  { id: '4:5', name: 'Editorial', icon: Square, desc: '4:5', cssClass: 'w-5 h-6.5' },
  { id: '9:16', name: 'Mobile', icon: Smartphone, desc: '9:16', cssClass: 'w-4 h-7' },
];

const QUALITIES = [
  { id: 'draft', name: 'Draft' },
  { id: 'balanced', name: 'Standard' },
  { id: 'cinematic', name: 'HD Render' },
];

export default function PromptGenerator({ initialPrompt, onClearInitialPrompt }) {
  const {
    prompt,
    setPrompt,
    style,
    setStyle,
    aspectRatio,
    setAspectRatio,
    quality,
    setQuality,
    type,
    setType,
    isGenerating,
    progress,
    progressMessage,
    error,
    clearError,
    outputs,
    generate
  } = useGenerateContent();

  const [activeOutput, setActiveOutput] = useState(null);
  const workspaceRef = useRef(null);

  // Sync initial prompt from Hero section and scroll to workspace
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      if (workspaceRef.current) {
        workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Trigger generation immediately
      setTimeout(() => {
        generate();
        onClearInitialPrompt();
      }, 600);
    }
  }, [initialPrompt]);

  const handleDownload = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name || 'fomi-generation.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      ref={workspaceRef}
      id="workspace" 
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full scroll-mt-24"
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <span className="text-[10px] tracking-[0.2em] text-sand uppercase font-bold">
            Studio Workbench
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-ivory tracking-tight mt-2">
            Visual Workspace
          </h2>
        </div>
        <p className="text-sand text-xs md:text-sm font-light max-w-md leading-relaxed">
          Configure aspect ratios, select camera mediums, and compile prompt directions to synthesize high-fidelity image reference boards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls Panel */}
        <div className="lg:col-span-5 bg-graphite rounded-2xl p-6 md:p-8 border border-ivory/10 flex flex-col gap-6 shadow-sm">
          {/* Media Type Toggle */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-sand font-bold mb-3 block">
              Output Format
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-obsidian p-1 rounded-lg border border-ivory/5">
              <button
                type="button"
                onClick={() => setType('image')}
                className={`py-2 px-3 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                  type === 'image' 
                    ? 'bg-graphite text-ivory shadow-sm' 
                    : 'text-sand/65 hover:text-ivory'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Image Grid
              </button>
              <button
                type="button"
                onClick={() => setType('video')}
                className={`py-2 px-3 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                  type === 'video' 
                    ? 'bg-graphite text-ivory shadow-sm' 
                    : 'text-sand/65 hover:text-ivory'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                Motion Clip
              </button>
            </div>
          </div>

          {/* Prompt Textarea */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] uppercase tracking-widest text-sand font-bold">
                Direction Prompt
              </label>
              <span className="text-[9px] text-sand font-mono">
                {prompt.length}/500 chars
              </span>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
              placeholder="Enter descriptive subjects, textures, angles, and lighting parameters..."
              className="w-full min-h-[110px] bg-obsidian rounded-xl p-4 text-xs text-ivory font-light placeholder-sand/40 border border-ivory/10 focus:border-ivory/30 outline-none resize-none transition-all duration-300 focus:ring-0 shadow-inner"
              maxLength={500}
            />
          </div>

          {/* Style Selector */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-sand font-bold mb-3 block">
              Camera Medium
            </label>
            <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
              {STYLES.map((styleItem) => (
                <button
                  key={styleItem.id}
                  type="button"
                  onClick={() => setStyle(styleItem.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                    style === styleItem.id
                      ? 'bg-obsidian border-ivory/20 text-ivory font-semibold shadow-sm'
                      : 'bg-transparent border-transparent text-sand hover:bg-obsidian/30 hover:text-ivory'
                  }`}
                >
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider uppercase">
                      {styleItem.name}
                    </h4>
                    <p className="text-[9px] text-sand font-light mt-0.5">
                      {styleItem.desc}
                    </p>
                  </div>
                  {style === styleItem.id && (
                    <motion.div layoutId="activeStyleBadge" className="w-1.5 h-1.5 rounded-full bg-ivory" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-sand font-bold mb-3 block">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-4 gap-2">
              {RATIOS.map((ratio) => {
                return (
                  <button
                    key={ratio.id}
                    type="button"
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`py-3 px-1 rounded-xl transition-all duration-300 flex flex-col items-center gap-2 border cursor-pointer ${
                      aspectRatio === ratio.id
                        ? 'bg-obsidian border-ivory/20 text-ivory shadow-sm font-semibold'
                        : 'bg-transparent border-transparent text-sand hover:bg-obsidian/30 hover:text-ivory'
                    }`}
                  >
                    <div className="h-8 flex items-center justify-center">
                      <div className={`border rounded transition-colors duration-300 ${
                        aspectRatio === ratio.id ? 'border-ivory bg-ivory/5' : 'border-sand/40 bg-transparent'
                      } ${ratio.cssClass}`} />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-bold">
                      {ratio.name}
                    </span>
                    <span className="text-[8px] text-sand/40 font-mono">
                      {ratio.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quality Selector */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-sand font-bold mb-3 block">
              Render Quality
            </label>
            <div className="grid grid-cols-3 gap-1 bg-obsidian p-1 rounded-lg border border-ivory/5">
              {QUALITIES.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setQuality(q.id)}
                  className={`py-2 px-1 rounded-md text-[9px] font-bold uppercase tracking-widest text-center transition-all duration-300 ${
                    quality === q.id 
                      ? 'bg-graphite text-ivory shadow-sm' 
                      : 'text-sand/65 hover:text-ivory'
                  }`}
                >
                  {q.name}
                </button>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-clay/5 border border-clay/20 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-clay shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[10px] font-bold text-ivory uppercase tracking-widest">
                  Rendering Exception
                </h4>
                <p className="text-[10px] text-sand mt-1 leading-relaxed">
                  {error}
                </p>
                <button
                  onClick={clearError}
                  className="text-[9px] text-ivory hover:underline transition-all duration-300 font-bold uppercase mt-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Generate Submit Button */}
          <button
            onClick={generate}
            disabled={isGenerating || !prompt.trim()}
            className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              isGenerating || !prompt.trim()
                ? 'bg-stone text-sand cursor-not-allowed border border-ivory/5'
                : 'bg-ivory text-obsidian hover:opacity-90 cursor-pointer shadow-sm'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Compiling visual...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Compile Canvas
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: Outputs Panel */}
        <div className="lg:col-span-7 bg-graphite/40 rounded-2xl p-6 md:p-8 border border-ivory/10 min-h-[500px] lg:min-h-[720px] flex flex-col justify-between relative overflow-hidden backdrop-blur-sm shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-ivory/5 mb-6">
            <span className="text-[10px] uppercase tracking-widest text-sand font-bold">
              Board feed ({outputs.length} outputs)
            </span>
            <span className="text-[9px] text-sand/60 font-mono tracking-wider">Studio Output • Online</span>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                /* LOADING STATE */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-sm mx-auto"
                >
                  {/* Glowing progress ring/indicator */}
                  <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke="rgba(18, 18, 18, 0.04)"
                        strokeWidth="3"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="34"
                        stroke="#121212"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={213.6}
                        strokeDashoffset={213.6 - (213.6 * progress) / 100}
                        transition={{ ease: 'easeOut', duration: 0.2 }}
                      />
                    </svg>
                    <span className="absolute text-sm font-semibold text-ivory font-mono">
                      {progress}%
                    </span>
                  </div>

                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-ivory mb-1">
                    Rendering Canvas
                  </h3>
                  <p className="text-[10px] text-sand min-h-[30px] leading-relaxed">
                    {progressMessage}
                  </p>
                  
                  {/* Simulated progress tracker */}
                  <div className="mt-8 w-full bg-obsidian p-3 rounded-lg border border-ivory/5 text-left">
                    <div className="flex justify-between items-center text-[8px] text-sand font-mono mb-2 tracking-wider">
                      <span>Curating elements...</span>
                      <span>Medium: 35mm Film</span>
                    </div>
                    <div className="w-full h-[3px] bg-stone rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-ivory"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : outputs.length === 0 ? (
                /* EMPTY STATE */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-obsidian border border-ivory/5 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-4 h-4 text-sand/50" />
                  </div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-ivory mb-1">
                    No visual outputs compiled
                  </h3>
                  <p className="text-[10px] text-sand max-w-[200px] mx-auto leading-relaxed">
                    Type a subject in the control board and click Compile to initialize.
                  </p>
                </motion.div>
              ) : (
                /* GRID OF GENERATED OUTPUTS */
                <motion.div
                  variants={staggerContainer(0.08, 0)}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[560px] overflow-y-auto pr-1 no-scrollbar"
                >
                  {outputs.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      className="group relative overflow-hidden rounded-xl bg-obsidian border border-ivory/5 aspect-square flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      {item.url ? (
                        <Image
                          src={item.url}
                          alt={item.prompt}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      ) : item.videos && item.videos.length > 0 || item.url === undefined && item.url !== null ? (
                        <video
                          src={item.url || item.videos?.[0]}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        />
                      ) : null}

                      {/* Video indicator badge */}
                      {item.url && item.url.includes('mixkit') && (
                        <div className="absolute top-3 left-3 bg-obsidian/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold text-ivory tracking-widest uppercase flex items-center gap-1 border border-ivory/5">
                          <Play className="w-2 h-2 fill-ivory text-ivory" /> Clip
                        </div>
                      )}

                      {/* Grid Item Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-graphite/95 border-t border-ivory/5 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <p className="text-[10px] text-ivory font-medium truncate max-w-[65%]">
                          {item.prompt}
                        </p>
                        <div className="flex gap-1.5 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(item.url, `fomi-${item.style}-${item.id}.png`);
                            }}
                            className="p-1.5 rounded bg-obsidian/5 hover:bg-obsidian/10 text-ivory transition-colors duration-200"
                            title="Download"
                          >
                            <Download className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveOutput(item);
                            }}
                            className="p-1.5 rounded bg-ivory text-obsidian hover:opacity-90 transition-opacity duration-200"
                            title="Inspect Specs"
                          >
                            <Maximize2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Metadata */}
          <div className="pt-4 border-t border-ivory/5 mt-6 flex justify-between items-center text-[9px] text-sand/40 font-mono tracking-widest uppercase">
            <span>fomi. studio board</span>
            <span>aspect: {aspectRatio}</span>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL / LIGHTBOX */}
      <AnimatePresence>
        {activeOutput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveOutput(null)}
            className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_CUSTOM }}
              onClick={(e) => e.stopPropagation()}
              className="bg-obsidian border border-ivory/10 rounded-2xl w-full max-w-5xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[80vh] shadow-2xl"
            >
              {/* Left Column: Visual display */}
              <div className="md:col-span-7 bg-obsidian flex items-center justify-center relative aspect-square md:aspect-auto md:h-full border-r border-ivory/5">
                {activeOutput.url.includes('mixkit') ? (
                  <video
                    src={activeOutput.url}
                    autoPlay
                    loop
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={activeOutput.url}
                    alt={activeOutput.prompt}
                    fill
                    className="object-contain p-4"
                    sizes="60vw"
                  />
                )}
              </div>

              {/* Right Column: Metadata details (exhibit card label) */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-graphite">
                <div className="flex flex-col gap-6">
                  {/* Close button & header */}
                  <div className="flex justify-between items-center pb-4 border-b border-ivory/5">
                    <span className="text-[9px] uppercase tracking-widest text-sand font-bold">
                      Board Specifications
                    </span>
                    <button
                      onClick={() => setActiveOutput(null)}
                      className="text-ivory hover:opacity-70 text-[9px] tracking-widest uppercase font-bold transition-colors focus:outline-none"
                    >
                      Close
                    </button>
                  </div>

                  {/* Prompt text */}
                  <div>
                    <h4 className="text-[8px] uppercase tracking-widest text-sand font-bold mb-2">
                      Prompt Instruction
                    </h4>
                    <p className="text-xs font-normal text-ivory leading-relaxed tracking-wide">
                      "{activeOutput.prompt}"
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-ivory/5 py-4">
                    <div>
                      <h4 className="text-[8px] uppercase tracking-widest text-sand font-bold mb-1">
                        Camera Medium
                      </h4>
                      <p className="text-[10px] text-ivory font-semibold uppercase tracking-wider">
                        {activeOutput.style}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[8px] uppercase tracking-widest text-sand font-bold mb-1">
                        Aspect Ratio
                      </h4>
                      <p className="text-[10px] text-ivory font-mono font-semibold">
                        {activeOutput.aspectRatio}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[8px] uppercase tracking-widest text-sand font-bold mb-1">
                        Quality Preset
                      </h4>
                      <p className="text-[10px] text-ivory font-semibold uppercase tracking-wider">
                        {activeOutput.quality}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[8px] uppercase tracking-widest text-sand font-bold mb-1">
                        Studio Board Seed
                      </h4>
                      <p className="text-[10px] text-ivory font-mono font-semibold">
                        {activeOutput.seed || '6892401827'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions bottom */}
                <div className="pt-6 mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleDownload(activeOutput.url, `fomi-${activeOutput.style}-${activeOutput.id}.png`)}
                    className="flex-1 py-3 px-4 rounded-xl bg-ivory text-obsidian text-[10px] font-bold uppercase tracking-widest text-center hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download File
                  </button>
                  <button
                    disabled
                    className="flex-1 py-3 px-4 rounded-xl border border-ivory/15 bg-graphite/40 text-sand/40 text-[9px] font-bold uppercase tracking-widest text-center cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    Magnify Upscale
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
