'use client';

import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PromptGenerator from '@/components/PromptGenerator';
import Gallery from '@/components/Gallery';
import FeatureSection from '@/components/FeatureSection';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  // State to pass prompt from Hero or CTA into the workspace generator
  const [initialPrompt, setInitialPrompt] = useState('');

  const handleStartGenerate = (promptText) => {
    setInitialPrompt(promptText);
  };

  const handleClearInitialPrompt = () => {
    setInitialPrompt('');
  };

  return (
    <div className="relative min-h-screen text-ivory selection:bg-copper selection:text-ivory flex flex-col">
      {/* Premium ambient backdrop canvas */}
      <AnimatedBackground />

      {/* Floating Header */}
      <Navbar />

      {/* Main Editorial Canvas */}
      <main className="flex-1 flex flex-col w-full relative z-10">
        
        {/* Viewport Height Hero & Quick Prompt */}
        <Hero onStartGenerate={handleStartGenerate} />

        {/* Studio Workspace Area */}
        <PromptGenerator 
          initialPrompt={initialPrompt} 
          onClearInitialPrompt={handleClearInitialPrompt} 
        />

        {/* Gallery Grid Showcase */}
        <Gallery />

        {/* Structured Alternating Capabilities */}
        <FeatureSection />

        {/* Horizontal Testimonial Slide Reviews */}
        <Testimonials />

        {/* High Contrast Final Conversion */}
        <CTA onStartGenerate={handleStartGenerate} />

      </main>

      {/* Editorial Footer Grid */}
      <Footer />
    </div>
  );
}
