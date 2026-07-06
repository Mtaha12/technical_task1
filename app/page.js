'use client';

import { useState } from 'react';
import { useGenerateContent } from '@/hooks/useGenerateContent';
import AnimatedBackground from '@/components/AnimatedBackground';
import WorkspaceHeader from '@/components/WorkspaceHeader';
import ControlStudio from '@/components/ControlStudio';
import GenerationCanvas from '@/components/GenerationCanvas';
import CreativeIntelligence from '@/components/CreativeIntelligence';
import { SlidersHorizontal } from 'lucide-react';

export default function Home() {
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
    creativity,
    setCreativity,
    guidance,
    setGuidance,
    seed,
    setSeed,
    negativePrompt,
    setNegativePrompt,
    visualPrompt,
    setVisualPrompt,
    isGenerating,
    isEnhancing,
    progress,
    progressMessage,
    error,
    clearError,
    outputs,
    setOutputs,
    generate,
    enhancePrompt,
    creativeScore,
    promptEvolution,
    styleDNA
  } = useGenerateContent();

  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);

  return (
    <div className="relative h-screen w-screen bg-obsidian text-ivory selection:bg-copper selection:text-ivory overflow-hidden flex flex-col p-4 sm:p-5 transition-colors duration-300">
      
      {/* Premium ambient backdrop canvas */}
      <AnimatedBackground />

      {/* Floating Workstation Frame */}
      <div className="flex-1 flex flex-col rounded-2xl border border-stone bg-graphite/40 backdrop-blur-xl overflow-hidden shadow-2xl relative z-10 transition-colors duration-300">
        
        {/* Compact Premium Header (80px high) */}
        <WorkspaceHeader type={type} setType={setType} />

        {/* Three-Panel Split Layout */}
        <div className="flex-1 flex overflow-hidden w-full relative">
          
          {/* Mobile Drawer Overlay Backdrop blur - placed inside to avoid stacking context blocks */}
          {mobileControlsOpen && (
            <div 
              onClick={() => setMobileControlsOpen(false)}
              className="lg:hidden absolute inset-0 z-30 bg-obsidian/45 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
            />
          )}

          {/* Left Panel (Creative Controls — 30%) - Responsive sheet/sidebar */}
          <ControlStudio
            prompt={prompt}
            setPrompt={setPrompt}
            style={style}
            setStyle={setStyle}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            quality={quality}
            setQuality={setQuality}
            type={type}
            creativity={creativity}
            setCreativity={setCreativity}
            guidance={guidance}
            setGuidance={setGuidance}
            seed={seed}
            setSeed={setSeed}
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            visualPrompt={visualPrompt}
            setVisualPrompt={setVisualPrompt}
            isGenerating={isGenerating}
            isEnhancing={isEnhancing}
            generate={generate}
            enhancePrompt={enhancePrompt}
            error={error}
            clearError={clearError}
            mobileControlsOpen={mobileControlsOpen}
            setMobileControlsOpen={setMobileControlsOpen}
          />

          {/* Center Panel (Live Generation Canvas — 45%) */}
          <GenerationCanvas
            outputs={outputs}
            setOutputs={setOutputs}
            isGenerating={isGenerating}
            progress={progress}
            progressMessage={progressMessage}
            prompt={prompt}
            setPrompt={setPrompt}
            setStyle={setStyle}
            generate={generate}
          />

          {/* Right Panel (Creative Intelligence — 25%) */}
          <CreativeIntelligence
            style={style}
            creativeScore={creativeScore}
            promptEvolution={promptEvolution}
            styleDNA={styleDNA}
            prompt={prompt}
            setPrompt={setPrompt}
          />

        </div>
      </div>

      {/* Floating Mobile Controls Sheet Toggle Trigger */}
      <button
        onClick={() => setMobileControlsOpen(!mobileControlsOpen)}
        className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full bg-ivory text-obsidian font-bold text-[10px] tracking-widest uppercase flex items-center gap-2 shadow-2xl active:scale-95 transition-all duration-300 cursor-pointer border border-stone/20"
      >
        <SlidersHorizontal className="w-4 h-4 text-copper" />
        {mobileControlsOpen ? 'Hide Studio Controls' : 'Show Studio Controls'}
      </button>
    </div>
  );
}
