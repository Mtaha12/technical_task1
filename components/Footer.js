'use client';

import { ArrowUpRight } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Curation Tools',
    links: [
      { name: 'Image Synthesis', href: '#workspace' },
      { name: 'Precision Canvas', href: '#features' },
      { name: 'Motion Vectors', href: '#features' },
      { name: 'Detail Resolution', href: '#features' },
    ]
  },
  {
    title: 'Archive',
    links: [
      { name: 'Curated Showcase', href: '#explore' },
      { name: 'API Reference', href: '#' },
      { name: 'Changelog', href: '#' },
      { name: 'Community Boards', href: '#' },
    ]
  },
  {
    title: 'Curation Inc',
    links: [
      { name: 'Brand Story', href: '#' },
      { name: 'Design Ethos', href: '#' },
      { name: 'Visual Research', href: '#' },
      { name: 'Workspace Kit', href: '#' },
    ]
  }
];

export default function Footer() {
  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-obsidian py-16 px-6 md:px-12 border-t border-ivory/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <a 
              href="#" 
              onClick={handleScrollTop}
              className="text-lg font-normal tracking-[0.3em] text-ivory self-start"
            >
              fomi.
            </a>
            <p className="text-sand text-xs font-light leading-relaxed max-w-sm">
              fomi is an editorial platform and creative studio synthesizing high-fidelity visual concepts. We combine minimalist structural workflows with tailored reference generation.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 items-center">
              {['Twitter', 'Instagram', 'Framer', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[9px] uppercase tracking-widest text-sand hover:text-ivory transition-colors duration-300 flex items-center gap-0.5"
                >
                  {social}
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 md:gap-8">
            {SECTIONS.map((sec) => (
              <div key={sec.title} className="flex flex-col gap-4">
                <h4 className="text-[9px] uppercase tracking-widest text-ivory font-bold">
                  {sec.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {sec.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-xs text-sand hover:text-ivory font-light transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Separator */}
        <div className="h-[1px] bg-ivory/5 w-full" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[9px] text-sand/50 font-mono tracking-widest uppercase">
          <div className="flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} FOMI INC.</span>
            <span>&bull;</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ivory transition-colors">PRIVACY CODE</a>
            <a href="#" className="hover:text-ivory transition-colors">TERMS OF USE</a>
            <a href="#" className="hover:text-ivory transition-colors">STUDIO COMPLIANCE</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
