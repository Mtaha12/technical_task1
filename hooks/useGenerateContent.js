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

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState(null);
  const [outputs, setOutputs] = useState(INITIAL_OUTPUTS);

  const progressIntervalRef = useRef(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

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
          type
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
    isGenerating,
    progress,
    progressMessage,
    error,
    clearError,
    outputs,
    generate
  };
}
