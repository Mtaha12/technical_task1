'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EASE_CUSTOM } from '@/animations/motionVariants';

const TESTIMONIALS = [
  {
    quote: "fomi has completely redefined our visual development pipeline. The geometric precision and atmospheric lighting control is incredibly detailed.",
    author: "Sarah K. Jenkins",
    role: "V.P. of Creative Design",
    company: "Aether Agency"
  },
  {
    quote: "Apple-like restraint combined with Pinterest's content focus. fomi is the only workspace that respects spatial scale while curating moodboards.",
    author: "Dimitri Volkoff",
    role: "Principal Art Director",
    company: "Vance Media"
  },
  {
    quote: "The resolution scaling is an absolute game-changer. We compile print-ready editorial compositions starting from a simple ten-word query.",
    author: "Miyu Tanaka",
    role: "Lead Visual Architect",
    company: "Minimalist Studio"
  },
  {
    quote: "Outstanding motion physics. The camera vector clips finally resolve the unpredictable warping of standard generative video loops.",
    author: "Austin Sterling",
    role: "Motion Director",
    company: "Linear Craft"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full border-t border-ivory/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading and Carousel Controls */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full lg:min-h-[220px]">
          <div>
            <span className="text-[10px] tracking-[0.2em] text-sand uppercase font-bold">
              Industry Feedback
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-ivory tracking-tight mt-2">
              Visual Directors
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex gap-3 mt-8 lg:mt-0">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-ivory/10 hover:border-ivory text-sand hover:text-ivory flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-ivory/10 hover:border-ivory text-sand hover:text-ivory flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Sliding Testimonial Quote */}
        <div className="lg:col-span-8 flex flex-col justify-between min-h-[260px] md:min-h-[200px] gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.5, ease: EASE_CUSTOM }}
              className="flex-1 flex flex-col justify-between gap-8"
            >
              {/* Quote text */}
              <blockquote className="text-xl md:text-3xl font-light text-ivory leading-relaxed tracking-wide">
                "{TESTIMONIALS[activeIndex].quote}"
              </blockquote>

              {/* Author details */}
              <div className="flex items-center gap-4 border-l-2 border-ivory/15 pl-4 py-1">
                <div>
                  <cite className="not-italic text-xs font-bold text-ivory tracking-wider uppercase">
                    {TESTIMONIALS[activeIndex].author}
                  </cite>
                  <span className="text-[10px] text-sand font-normal mt-0.5 block tracking-wide">
                    {TESTIMONIALS[activeIndex].role} &mdash; {TESTIMONIALS[activeIndex].company}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots tracker indicators */}
          <div className="flex gap-1.5 justify-end">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'w-5 bg-ivory' : 'w-1 bg-sand/20'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
