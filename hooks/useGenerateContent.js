'use client';

import { useState, useEffect, useRef } from 'react';

// Pre-seeded high-quality images to populate the workspace output initially so it's not blank
const INITIAL_OUTPUTS = [
  {
    id: 'seed-1',
    url: '/images/fashion.png',
    prompt: 'Avant-garde editorial fashion portrait, copper tones, high contrast, studio lighting.',
    style: 'fashion',
    aspectRatio: '4:5',
    quality: 'cinematic',
    seed: 5829104820,
    createdAt: new Date().toISOString()
  },
  {
    id: 'seed-2',
    url: '/images/architecture.png',
    prompt: 'Minimalist brutalist architecture concrete villa, desert dunes, dramatic warm sunset light.',
    style: 'architecture',
    aspectRatio: '16:9',
    quality: 'cinematic',
    seed: 9472018471,
    createdAt: new Date().toISOString()
  }
];

export function useGenerateContent() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [quality, setQuality] = useState('balanced');
  const [type, setType] = useState('image'); // 'image' | 'video'
  
  // Advanced creative settings
  const [creativity, setCreativity] = useState(65);
  const [guidance, setGuidance] = useState(7.5);
  const [seed, setSeed] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [visualPrompt, setVisualPrompt] = useState(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState(null);
  const [outputs, setOutputs] = useState(INITIAL_OUTPUTS);

  // Creative Intelligence States
  const [creativeScore, setCreativeScore] = useState(40);
  const [promptEvolution, setPromptEvolution] = useState([]);
  const [styleDNA, setStyleDNA] = useState([
    { name: 'Cinematic Lighting', weight: 60 },
    { name: 'Geometric form', weight: 25 },
    { name: 'Latent noise', weight: 15 }
  ]);

  const progressIntervalRef = useRef(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Live calculation of Creative Score & Style DNA
  useEffect(() => {
    // 1. Calculate Creative Score
    let score = 30;
    
    // Prompt complexity
    const wordCount = prompt.split(/\s+/).filter(Boolean).length;
    score += Math.min(25, wordCount * 1.5);
    
    // Creativity slider
    score += creativity * 0.35;
    
    // Guidance deviation (extreme values are experimental)
    score += Math.abs(guidance - 7.5) * 1.5;
    
    // Style factor
    if (['fantasy', 'architecture', 'fashion'].includes(style)) {
      score += 12;
    } else if (style === 'portrait') {
      score += 5;
    }

    // Negative prompt adds intent
    if (negativePrompt.trim().length > 0) {
      score += 8;
    }

    setCreativeScore(Math.max(10, Math.min(100, Math.round(score))));

    // 2. Calculate Style DNA
    let baseDNA = [];
    const noiseWeight = Math.round(creativity * 0.3);
    const structureWeight = Math.round((100 - creativity) * 0.25);
    const thematicWeight = 100 - noiseWeight - structureWeight;

    switch (style) {
      case 'portrait':
        baseDNA = [
          { name: 'Facial Geometry', weight: thematicWeight },
          { name: 'Chiaroscuro Details', weight: structureWeight },
          { name: 'Grainy Noise', weight: noiseWeight }
        ];
        break;
      case 'cinematic':
        baseDNA = [
          { name: 'Atmospheric Fog', weight: thematicWeight },
          { name: 'Anamorphic Glow', weight: structureWeight },
          { name: 'Grainy Noise', weight: noiseWeight }
        ];
        break;
      case 'fashion':
        baseDNA = [
          { name: 'High-Fashion Hue', weight: thematicWeight },
          { name: 'Fabric Contrast', weight: structureWeight },
          { name: 'Grainy Noise', weight: noiseWeight }
        ];
        break;
      case 'product':
        baseDNA = [
          { name: 'Refraction Highlights', weight: thematicWeight },
          { name: 'Macro Depth Focus', weight: structureWeight },
          { name: 'Grainy Noise', weight: noiseWeight }
        ];
        break;
      case 'fantasy':
        baseDNA = [
          { name: 'Ethereal Sketch lines', weight: thematicWeight },
          { name: 'Nebula Abstraction', weight: structureWeight },
          { name: 'Grainy Noise', weight: noiseWeight }
        ];
        break;
      case 'architecture':
        baseDNA = [
          { name: 'Spatial concrete volume', weight: thematicWeight },
          { name: 'Sunset Sun Shadow', weight: structureWeight },
          { name: 'Grainy Noise', weight: noiseWeight }
        ];
        break;
      default:
        baseDNA = [
          { name: 'Thematic Contrast', weight: thematicWeight },
          { name: 'Compositional Frame', weight: structureWeight },
          { name: 'Grainy Noise', weight: noiseWeight }
        ];
    }
    setStyleDNA(baseDNA);
  }, [prompt, style, creativity, guidance, negativePrompt]);

  // Enhanced prompt history simulation
  const enhancePrompt = async () => {
    if (!prompt || !prompt.trim() || isEnhancing) return;
    setIsEnhancing(true);

    const original = prompt.trim();
    setPromptEvolution([
      { step: 'Idea Core', text: original },
      { step: 'Analyzing...', text: 'Evaluating composition parameters...' }
    ]);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const pLower = original.toLowerCase();
    let step2Text = '';
    let step3Text = '';
    let finalEnhanced = '';

    if (pLower.includes("model") || pLower.includes("fashion") || pLower.includes("woman") || pLower.includes("man") || pLower.includes("person")) {
      step2Text = "Avant-garde editorial fashion portrait of a model, copper tones.";
      step3Text = "Avant-garde editorial fashion portrait of a model, copper tones, high contrast, studio chiaroscuro lighting, draped raw silk textures.";
      finalEnhanced = "Avant-garde editorial fashion portrait. A model styled in stone-beige draped raw silk, captured on warm 35mm film grain, high-contrast chiaroscuro studio lighting, neutral muted tones, Vogue magazine aesthetic, detailed fabric textures, shot on Hasselblad.";
    } else if (pLower.includes("house") || pLower.includes("villa") || pLower.includes("concrete") || pLower.includes("architecture") || pLower.includes("building") || pLower.includes("interior")) {
      step2Text = "Minimalist brutalist concrete villa, desert sand dunes.";
      step3Text = "Minimalist brutalist concrete villa cantilevering over desert sand dunes, dramatic warm sunset sunlight, editorial photography style.";
      finalEnhanced = "Minimalist brutalist concrete villa cantilevering over desert sand dunes, dramatic warm sunset light, long architectural shadows, high-contrast, dust particles in the air, editorial photography, archdaily style, 8k resolution.";
    } else if (pLower.includes("perfume") || pLower.includes("bottle") || pLower.includes("product") || pLower.includes("cosmetic") || pLower.includes("glass")) {
      step2Text = "Cosmetic perfume glass bottle standing on a wet dark rock.";
      step3Text = "Luxury cosmetic perfume glass bottle standing on wet volcanic basalt rock, champagne gold ambient reflections, cinematic soft fog.";
      finalEnhanced = "Luxury cosmetic perfume glass bottle standing on a wet, dark volcanic basalt rock. Cinematic soft volumetric fog, champagne gold reflections, macro lens detail, splashing water drops, elegant stone-beige background, editorial commercial shoot.";
    } else if (pLower.includes("car") || pLower.includes("vehicle") || pLower.includes("porsche") || pLower.includes("drive")) {
      step2Text = "Vintage sports car on a wet coastal cliffside highway at dusk.";
      step3Text = "Vintage sports car on a wet coastal cliffside highway at dusk, soft silver and copper reflections, mist rising.";
      finalEnhanced = "Vintage sports car on a wet coastal cliffside highway at dusk, mood-lit editorial shot, soft silver and muted copper reflections, mist rising from ocean waves, 35mm vintage photography style, cinematic lighting.";
    } else if (pLower.includes("anime") || pLower.includes("character") || pLower.includes("art") || pLower.includes("ethereal")) {
      step2Text = "Ethereal anime sketch of a figure lost in an nebula.";
      step3Text = "Ethereal anime sketch of a figure lost in an nebula, floating pastel petals, gold foil textures, delicate ink lines.";
      finalEnhanced = "Ethereal anime sketch of a figure lost in an abstract nebula. Floating pastel petals, gold foil textures, delicate ink line art, Makoto Shinkai style, soft dreamy atmosphere, high details, canvas paper texture.";
    } else {
      step2Text = `${original}, cinematic composition, editorial photography style.`;
      step3Text = `${original}, cinematic composition, editorial photography, raw details, 35mm film grain, muted copper tones.`;
      finalEnhanced = `${original}, cinematic composition, editorial photography style, raw texture detail, captured on 35mm lens, curated muted color palette, warm soft natural lighting, high-end professional creative direction.`;
    }

    setPromptEvolution([
      { step: 'Idea Core', text: original },
      { step: 'Semantic Mix', text: step2Text }
    ]);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setPromptEvolution([
      { step: 'Idea Core', text: original },
      { step: 'Semantic Mix', text: step2Text },
      { step: 'Medium Add', text: step3Text }
    ]);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setPromptEvolution([
      { step: 'Idea Core', text: original },
      { step: 'Semantic Mix', text: step2Text },
      { step: 'Medium Add', text: step3Text },
      { step: 'Final Synthesis', text: finalEnhanced }
    ]);

    // Typewriter effect simulation to make it feel extremely polished
    let currentText = "";
    const words = finalEnhanced.split(" ");
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      setPrompt(currentText);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    setIsEnhancing(false);
  };

  const generate = async () => {
    if (!prompt || prompt.trim() === '') {
      setError('Please provide a descriptive prompt to generate visuals.');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setProgressMessage('Connecting to latent space...');
    setError(null);

    // Simulate progress counting up to 95%
    let currentProgress = 0;
    progressIntervalRef.current = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2; // random increment between 2% and 9%
      
      if (currentProgress >= 95) {
        currentProgress = 95;
        setProgressMessage('Refining visual details & denoising textures...');
      } else if (currentProgress > 75) {
        setProgressMessage('Color grading & balancing contrast levels...');
      } else if (currentProgress > 45) {
        setProgressMessage('Synthesizing details & upscaling resolution...');
      } else if (currentProgress > 15) {
        setProgressMessage('Analyzing geometry & drawing lines...');
      }
      
      setProgress(currentProgress);
    }, 150);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          style,
          aspectRatio,
          quality,
          type,
          creativity,
          guidance,
          seed: seed || Math.floor(Math.random() * 9999999999).toString(),
          negativePrompt,
          visualPrompt
        })
      });

      const data = await response.json();

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Latent Diffusion generation failed.');
      }

      setProgress(100);
      setProgressMessage('Generation completed successfully.');

      // Short delay before resetting loader state
      setTimeout(() => {
        setIsGenerating(false);
        // Prepend new images or videos to output feed
        if (type === 'video') {
          setOutputs((prev) => [...data.videos, ...prev]);
        } else {
          setOutputs((prev) => [...data.images, ...prev]);
        }
      }, 500);

    } catch (err) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setIsGenerating(false);
      setError(err.message || 'An error occurred during rendering.');
    }
  };

  const clearError = () => setError(null);

  return {
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
  };
}
