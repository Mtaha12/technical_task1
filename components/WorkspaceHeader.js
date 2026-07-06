'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Film, Compass, Bell, Coins, Sun, Moon } from 'lucide-react';

export default function WorkspaceHeader({ type, setType }) {
  const [theme, setTheme] = useState('dark');

  // Load and apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('fomi-theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fomi-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fomi-theme', 'light');
    }
  };

  const tabs = [
    { id: 'image', label: 'Images', icon: ImageIcon },
    { id: 'video', label: 'Videos', icon: Film },
    { id: 'explore', label: 'Explore', icon: Compass }
  ];

  return (
    <header className="h-20 flex-none flex items-center justify-between px-4 sm:px-8 bg-obsidian/85 backdrop-blur-xl border-b border-stone/40 z-30 select-none transition-colors duration-300">
      {/* Left Brand Identity */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        <span className="text-sm sm:text-base font-normal tracking-[0.3em] text-ivory flex items-center gap-0.5 select-none">
          FOMI<span className="text-copper">.</span>
        </span>
        <div className="hidden sm:block h-5 w-[1px] bg-stone/70" />
        <span className="hidden sm:inline text-[9.5px] uppercase tracking-widest text-sand/80 font-mono">
          Command Center
        </span>
      </div>

      {/* Center Tabs Navigation */}
      <div className="flex bg-graphite/80 p-1 rounded-full border border-stone relative shadow-inner transition-colors duration-300">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = type === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setType(tab.id)}
              className={`relative z-10 px-3.5 sm:px-6 py-2 rounded-full text-[10px] sm:text-[10.5px] font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                isActive ? 'text-obsidian font-bold' : 'text-sand hover:text-ivory'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="header-mode-bg"
                  className="absolute inset-0 bg-ivory rounded-full -z-10 shadow-sm"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right User Utility */}
      <div className="flex items-center gap-2.5 sm:gap-4.5">
        {/* Credits counter */}
        <div className="hidden xs:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 bg-graphite rounded-full border border-stone text-sand hover:border-copper/35 transition-all duration-300 cursor-default">
          <Coins className="w-3.5 h-3.5 text-copper" />
          <span className="text-[9.5px] sm:text-[10px] font-mono font-bold tracking-wider text-ivory">
            120<span className="hidden sm:inline"> Credits</span>
          </span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 text-sand hover:text-ivory transition-all duration-300 border border-stone/50 bg-graphite/40 hover:bg-graphite rounded-full cursor-pointer flex items-center justify-center active:scale-95 shadow-sm"
          aria-label="Toggle visual theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-copper" />
          ) : (
            <Sun className="w-4 h-4 text-copper" />
          )}
        </button>

        {/* Notifications */}
        <button className="hidden sm:flex p-2.5 text-sand hover:text-ivory transition-all duration-300 relative border border-stone/50 bg-graphite/40 hover:bg-graphite rounded-full cursor-pointer group active:scale-95 shadow-sm">
          <Bell className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-copper rounded-full animate-pulse" />
        </button>

        <div className="hidden sm:block h-5 w-[1px] bg-stone/70" />

        {/* User profile avatar */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-ivory group-hover:text-copper transition-colors">Alexander V.</span>
            <span className="text-[8.5px] text-sand/65 font-mono tracking-widest uppercase">Creative Dir</span>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-copper/30 bg-graphite group-hover:border-copper flex items-center justify-center text-[10px] text-ivory font-bold overflow-hidden shadow-inner relative transition-colors duration-300">
            AV
            <div className="absolute inset-0 bg-copper/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </header>
  );
}
