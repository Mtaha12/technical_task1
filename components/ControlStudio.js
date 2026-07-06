'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Mic, 
  Paperclip, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Trash2, 
  SlidersHorizontal,
  Plus,
  Clock
} from 'lucide-react';

const STYLES = [
  { id: 'fashion', name: 'Editorial', icon: '📖' },
  { id: 'cinematic', name: 'Cinematic', icon: '🎬' },
  { id: 'product', name: 'Product', icon: '💎' },
  { id: 'fashion', name: 'Luxury', icon: '✨' },
  { id: 'cinematic', name: 'Documentary', icon: '🎥' },
  { id: 'fantasy', name: 'Concept Art', icon: '🎨' },
  { id: 'fashion', name: 'Fashion', icon: '👠' },
  { id: 'portrait', name: 'Hyperreal', icon: '📷' },
  { id: 'fantasy', name: 'Anime', icon: '🌸' }
];

const RATIOS = [
  { id: '1:1', name: 'Square', aspect: 'w-4 h-4' },
  { id: '16:9', name: 'Cinematic', aspect: 'w-6 h-3.5' },
  { id: '9:16', name: 'Portrait', aspect: 'w-3.5 h-6' },
  { id: '4:3', name: 'Editorial', aspect: 'w-5 h-4' },
  { id: '3:2', name: 'Classic', aspect: 'w-5.5 h-4' }
];

const MODELS = [
  { id: 'fomi-latent-2.5', name: 'FOMI Latent Studio v2.5' },
  { id: 'fomi-photoreal-3.0', name: 'FOMI PhotoReal v3.0' },
  { id: 'fomi-ethereal-1.2', name: 'FOMI Ethereal Anime v1.2' }
];

const SUGGESTED_AUTOCOMPLETES = [
  'chiaroscuro dramatic studio shadow',
  'shot on 35mm Hasselblad film stock',
  'architectural editorial concrete details',
  'volumetric dust particles ambient light',
  'draped stone-beige raw silk textures',
  'macro lens refraction details'
];

export default function ControlStudio({
  prompt,
  setPrompt,
  style,
  setStyle,
  aspectRatio,
  setAspectRatio,
  quality,
  setQuality,
  type,
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
  generate,
  enhancePrompt,
  error,
  clearError,
  mobileControlsOpen,
  setMobileControlsOpen
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeChip, setActiveChip] = useState('Cinematic');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [promptHistory, setPromptHistory] = useState([
    'Minimalist architecture villa concrete sunset dunes',
    'Editorial fashion drape copper raw silk lighting'
  ]);
  
  const fileInputRef = useRef(null);

  // Monitor typing for autocomplete matching
  useEffect(() => {
    if (prompt.trim().length > 2) {
      const lastWord = prompt.split(/\s+/).pop().toLowerCase();
      const matches = SUGGESTED_AUTOCOMPLETES.filter(phrase => 
        phrase.toLowerCase().includes(lastWord) && !prompt.toLowerCase().includes(phrase.toLowerCase())
      );
      setFilteredSuggestions(matches.slice(0, 3));
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [prompt]);

  const selectSuggestion = (phrase) => {
    const words = prompt.split(/\s+/);
    words.pop();
    const base = words.join(' ');
    const nextPrompt = base ? `${base} ${phrase}` : phrase;
    setPrompt(nextPrompt);
    setShowSuggestions(false);
  };

  const getCreativityDesc = (val) => {
    if (val <= 20) return 'Fidelity';
    if (val <= 50) return 'Balanced';
    if (val <= 80) return 'Drift';
    return 'Hallucinatory';
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setPrompt('Synthesizing voice transcription...');
      setTimeout(() => {
        setPrompt('A luxury editorial cosmetics product shot, perfume glass bottle on volcanic rock, soft ambient fog, champagne gold reflections.');
        setIsRecording(false);
      }, 1800);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVisualPrompt(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerRandomizeSeed = () => {
    setSeed(Math.floor(Math.random() * 9999999999).toString());
  };

  const handleChipSelect = (st) => {
    setActiveChip(st.name);
    setStyle(st.id);
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-40 h-full w-[320px] max-w-[85vw] border-r border-stone flex flex-col bg-graphite transition-transform duration-300 lg:relative lg:inset-auto lg:z-0 lg:h-full lg:w-[30%] lg:min-w-[340px] lg:max-w-[420px] lg:border-r lg:rounded-none lg:shadow-none transition-colors duration-300 ${
      mobileControlsOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      
      {/* Panel Header */}
      <div className="px-6 py-4.5 border-b border-stone/40 flex items-center justify-between flex-none">
        <span className="text-[10px] uppercase tracking-widest text-sand font-bold font-mono">
          Prompt Studio
        </span>
        <div className="flex items-center gap-1.5 bg-obsidian px-2.5 py-1 rounded-full border border-stone/60 transition-colors duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
          <span className="text-[8px] text-sand/80 font-mono uppercase tracking-wider">Latent Engine</span>
        </div>
      </div>

      {/* Scrollable controls */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-5 flex flex-col gap-6 bg-graphite/40 dark:bg-transparent transition-colors duration-300">
        
        {/* Prompt Input Section */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-[9px] uppercase tracking-widest text-sand font-mono font-bold">
              Creative Direction
            </label>
            <span className="text-[8px] text-sand/50 font-mono">
              {prompt.length}/500 chars
            </span>
          </div>

          <div className="relative bg-obsidian border border-stone rounded-xl p-3.5 focus-within:border-copper/40 transition-all duration-300 shadow-inner group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
              placeholder="Describe the image you want to create..."
              disabled={isGenerating || isEnhancing || isRecording}
              className="w-full h-24 bg-transparent outline-none border-none text-[11px] text-ivory placeholder-sand/30 font-light resize-none tracking-wide leading-relaxed scrollbar-none"
            />
            
            {/* Autocomplete Suggestion Dropdown Pill */}
            <AnimatePresence>
              {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-3 right-3 bottom-14 z-20 bg-graphite border border-stone rounded-xl p-2 shadow-2xl flex flex-col gap-1"
                >
                  <span className="text-[7.5px] uppercase font-mono tracking-wider text-copper px-1.5 block">
                    Autocomplete Suggestions
                  </span>
                  {filteredSuggestions.map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => selectSuggestion(phrase)}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-[9px] text-sand hover:text-ivory hover:bg-obsidian transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">... {phrase}</span>
                      <Plus className="w-2.5 h-2.5 text-copper" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Display Visual Prompt Upload Preview */}
            <AnimatePresence>
              {visualPrompt && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-2 inline-flex items-center gap-2 bg-graphite border border-stone p-1.5 rounded-lg pr-3"
                >
                  <div className="relative w-8 h-8 rounded-md overflow-hidden bg-stone-900 border border-stone/30">
                    <img src={visualPrompt} alt="Visual seed" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-ivory font-medium font-mono">reference_board.jpg</span>
                    <span className="text-[7px] text-copper uppercase tracking-wider font-bold">Image Seed Uploaded</span>
                  </div>
                  <button 
                    onClick={() => setVisualPrompt(null)}
                    className="ml-2 p-1 text-sand hover:text-rose-500 hover:bg-obsidian rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between border-t border-stone/30 pt-2.5 mt-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleRecording}
                  disabled={isGenerating || isEnhancing}
                  className={`p-1.5 rounded-lg border border-stone bg-graphite transition-colors cursor-pointer ${
                    isRecording 
                      ? 'text-rose-500 border-rose-500/30 bg-rose-500/5 animate-pulse' 
                      : 'text-sand hover:text-ivory hover:bg-graphite/80'
                  }`}
                  title="Voice command prompt"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isGenerating || isEnhancing}
                  className="p-1.5 rounded-lg border border-stone bg-graphite text-sand hover:text-ivory hover:bg-graphite/80 transition-colors cursor-pointer"
                  title="Upload visual reference"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* AI Enhance Prompt */}
              <button
                type="button"
                onClick={enhancePrompt}
                disabled={isGenerating || isEnhancing || !prompt.trim()}
                className={`py-1.5 px-3.5 rounded-full flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  !prompt.trim() || isGenerating || isEnhancing
                    ? 'bg-graphite border-stone text-sand/30 cursor-not-allowed'
                    : 'bg-[#A66A44]/10 border-copper/30 hover:border-copper text-copper hover:bg-copper/20'
                }`}
              >
                {isEnhancing ? (
                  <>
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    Expanding...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-2.5 h-2.5" />
                    AI Enhance
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Prompt History Row */}
        {promptHistory.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[8px] uppercase tracking-widest text-sand font-mono font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-copper" />
              Recent Ideations
            </span>
            <div className="flex flex-col gap-1.5">
              {promptHistory.map((hist, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(hist)}
                  className="w-full text-left truncate px-3 py-2 bg-obsidian/30 hover:bg-obsidian border border-stone rounded-lg text-[9px] text-sand hover:text-ivory transition-all cursor-pointer font-light"
                >
                  "{hist}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Style Engine: Visual Chips Grid */}
        <div className="flex flex-col gap-3">
          <label className="text-[9px] uppercase tracking-widest text-sand font-mono font-bold">
            Visual Style DNA Engine
          </label>
          <div className="grid grid-cols-3 gap-2">
            {STYLES.map((st, idx) => {
              const isSelected = activeChip === st.name;
              return (
                <button
                  key={idx}
                  onClick={() => handleChipSelect(st)}
                  disabled={isGenerating || isEnhancing}
                  className={`py-3 px-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isSelected
                      ? 'bg-obsidian border-copper text-ivory shadow-sm scale-[1.02]'
                      : 'bg-obsidian/20 border-stone/50 text-sand hover:bg-obsidian hover:text-ivory hover:border-stone'
                  }`}
                >
                  <span className="text-base select-none">{st.icon}</span>
                  <span className="text-[8.5px] font-bold uppercase tracking-wider">{st.name}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="active-style-chip"
                      className="absolute bottom-1 w-1 h-1 rounded-full bg-copper"
                    />
                  )}
                  {/* Subtle sweep */}
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-copper/3 to-transparent transition-transform duration-500 pointer-events-none -z-10" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Generation Settings accordion */}
        <div className="border-t border-stone/30 pt-4 mt-1">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between text-sand hover:text-ivory transition-colors cursor-pointer py-1"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-copper" />
              <span className="text-[9.5px] uppercase tracking-widest font-bold font-mono">
                Advanced Configurations
              </span>
            </div>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden flex flex-col gap-4.5 pt-4"
              >
                {/* Aspect Ratio Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] uppercase tracking-widest text-sand/80 font-mono font-semibold">
                    Aspect Ratio
                  </span>
                  <div className="grid grid-cols-5 gap-1">
                    {RATIOS.map((ratio) => (
                      <button
                        key={ratio.id}
                        onClick={() => setAspectRatio(ratio.id)}
                        className={`p-1.5 rounded-lg border text-center flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer ${
                          aspectRatio === ratio.id
                            ? 'bg-obsidian border-copper text-ivory'
                            : 'bg-transparent border-stone text-sand hover:border-stone hover:text-ivory'
                        }`}
                      >
                        <div className="h-5 flex items-center justify-center">
                          <div className={`border rounded-[2px] transition-colors ${
                            aspectRatio === ratio.id 
                              ? 'border-copper bg-copper/5' 
                              : 'border-sand/30 bg-transparent'
                          } ${ratio.aspect}`} />
                        </div>
                        <span className="text-[7px] uppercase font-mono font-semibold">{ratio.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Selector */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] uppercase tracking-widest text-sand/80 font-mono font-semibold">
                    Synthesizer Core
                  </span>
                  <select
                    className="w-full bg-obsidian border border-stone rounded-lg p-2.5 text-[9.5px] text-ivory outline-none cursor-pointer focus:border-copper/40"
                    value="fomi-latent-2.5"
                    onChange={() => {}}
                  >
                    {MODELS.map((model) => (
                      <option key={model.id} value={model.id} className="bg-graphite text-ivory">
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Creativity Meter (Slider) */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[8px] font-mono uppercase text-sand/80">
                    <span>Creativity Index</span>
                    <span className="text-copper font-semibold">
                      {creativity}% — {getCreativityDesc(creativity)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={creativity}
                    onChange={(e) => setCreativity(Number(e.target.value))}
                    className="w-full accent-copper bg-obsidian h-1 rounded-lg cursor-pointer appearance-none outline-none border border-stone"
                  />
                </div>

                {/* Guidance Scale CFG (Slider) */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[8px] font-mono uppercase text-sand/80">
                    <span>Guidance Scale (CFG)</span>
                    <span className="text-ivory font-bold">{guidance}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={guidance}
                    onChange={(e) => setGuidance(Number(e.target.value))}
                    className="w-full accent-copper bg-obsidian h-1 rounded-lg cursor-pointer appearance-none outline-none border border-stone"
                  />
                </div>

                {/* Seed Controls */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] uppercase tracking-widest text-sand/80 font-mono font-semibold">
                    Studio seed
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Randomize latent seed..."
                      value={seed}
                      onChange={(e) => setSeed(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 bg-obsidian border border-stone rounded-lg px-3 py-2 text-[9.5px] font-mono text-ivory outline-none placeholder-sand/25 focus:border-copper/40"
                    />
                    <button
                      type="button"
                      onClick={triggerRandomizeSeed}
                      className="px-3 bg-obsidian hover:bg-graphite border border-stone rounded-lg text-sand hover:text-ivory transition-colors flex items-center justify-center cursor-pointer"
                      title="Randomize Seed"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Negative Prompt */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] uppercase tracking-widest text-sand/80 font-mono font-semibold">
                    Negative prompt
                  </span>
                  <textarea
                    placeholder="Avoid low quality, distortions, noise, color offsets..."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    className="w-full h-14 bg-obsidian border border-stone rounded-lg p-2 text-[9px] text-ivory placeholder-sand/25 outline-none resize-none focus:border-copper/40"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Generate Compile Button Footer */}
      <div className="p-5 border-t border-stone/50 bg-graphite/70 flex-none">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            generate();
            setMobileControlsOpen(false); // Auto-close drawer on compile
          }}
          disabled={isGenerating || !prompt.trim() || isEnhancing || isRecording}
          className={`w-full py-3.5 rounded-xl text-[10.5px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border shadow-sm relative group overflow-hidden ${
            !prompt.trim() || isGenerating || isEnhancing || isRecording
              ? 'bg-graphite border-stone text-sand/25 cursor-not-allowed'
              : 'bg-ivory text-obsidian hover:opacity-90 border-transparent cursor-pointer'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-copper" />
              Synthesizing Canvas...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-copper" />
              Compile Canvas
            </>
          )}
          {/* Tactile hover highlight */}
          <div className="absolute inset-0 bg-copper/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.button>
      </div>

    </div>
  );
}
