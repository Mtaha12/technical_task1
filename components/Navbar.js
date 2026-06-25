'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { EASE_CUSTOM } from '@/animations/motionVariants';

const NAV_LINKS = [
  { name: 'Studio Board', href: '#workspace' },
  { name: 'Curated Feed', href: '#explore' },
  { name: 'Capabilities', href: '#features' },
  { name: 'Reviews', href: '#testimonials' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');

  // Load and apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('fomi-theme') || 'light';
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

  // Add subtle blur background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_CUSTOM }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-obsidian/85 backdrop-blur-md py-4 fine-border-b' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="text-lg font-normal tracking-[0.3em] text-ivory flex items-center gap-1"
          >
            fomi.
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-xs text-sand hover:text-ivory font-semibold tracking-widest uppercase transition-colors duration-300 py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-ivory transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Call to Action & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-ivory/10 hover:border-ivory/30 text-sand hover:text-ivory transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center bg-graphite/40 shadow-sm"
              aria-label="Toggle visual theme"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
            <a
              href="#workspace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory text-obsidian font-semibold text-[10px] tracking-widest uppercase hover:opacity-90 transition-all duration-300 group"
            >
              Get Started
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle & Theme Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-ivory/10 text-sand hover:text-ivory transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center bg-graphite/40"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sand hover:text-ivory p-1 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_CUSTOM }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-obsidian/95 backdrop-blur-lg flex flex-col justify-between px-8 py-12 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, ease: EASE_CUSTOM }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-medium text-sand hover:text-ivory tracking-wider uppercase text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, ease: EASE_CUSTOM }}
              className="flex flex-col gap-6"
            >
              <div className="h-[1px] bg-sand/10 w-full" />
              <div className="flex gap-4">
                <button
                  onClick={toggleTheme}
                  className="flex-1 py-4 rounded-full border border-ivory/15 text-ivory font-semibold text-xs hover:bg-ivory/5 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4" /> Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4" /> Light Mode
                    </>
                  )}
                </button>
                <a
                  href="#workspace"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-4 rounded-full bg-ivory text-obsidian font-semibold tracking-wider uppercase text-xs hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
