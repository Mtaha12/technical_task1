'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, hoverScale } from '@/animations/motionVariants';

const MASONRY_IMAGES = [
  {
    src: '/images/fashion.png',
    alt: 'Avant-garde Fashion Portrait',
    className: 'aspect-[3/4] md:aspect-[4/5]',
    caption: 'Fashion / Fine Art'
  },
  {
    src: '/images/architecture.png',
    alt: 'Minimalist Brutalist Villa',
    className: 'aspect-[4/3] md:aspect-[3/2]',
    caption: 'Architecture / Spatial'
  },
  {
    src: '/images/product.png',
    alt: 'Minimalist Perfume Glass Bottle',
    className: 'aspect-square',
    caption: 'Product / Editorial'
  },
  {
    src: '/images/cinematic.png',
    alt: 'Cinematic Monolith Explorer',
    className: 'aspect-[16/9]',
    caption: 'Cinematic / Landscape'
  },
  {
    src: '/images/fantasy.png',
    alt: 'Surreal Gold Sphere',
    className: 'aspect-[3/4] md:aspect-[4/5]',
    caption: 'Surrealism / Fantasy'
  },
  {
    src: '/images/portrait.png',
    alt: 'Editorial Male Model Spotlight',
    className: 'aspect-[4/5]',
    caption: 'Portrait / Moody'
  }
];

export default function ImageMasonry() {
  return (
    <motion.div
      variants={staggerContainer(0.12, 0.2)}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 md:gap-6 w-full max-h-[85vh] overflow-y-auto no-scrollbar pr-2 py-4"
    >
      {/* Column 1 */}
      <div className="flex flex-col gap-4 md:gap-6 pt-8">
        {MASONRY_IMAGES.filter((_, i) => i % 2 === 0).map((img, index) => (
          <motion.div
            key={`col1-${index}`}
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-xl bg-graphite fine-border shadow-sm"
          >
            <motion.div
              variants={hoverScale}
              initial="rest"
              whileHover="hover"
              className="relative w-full overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={500}
                height={600}
                className={`w-full object-cover transition-all duration-700 ${img.className}`}
                sizes="(max-width: 768px) 50vw, 33vw"
                priority={index === 0}
              />
              <div className="absolute inset-x-0 bottom-0 bg-graphite/90 backdrop-blur-md border-t border-ivory/5 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col">
                <span className="text-[8px] uppercase tracking-widest text-sand font-bold mb-0.5">
                  Visual Board
                </span>
                <h4 className="text-xs font-semibold text-ivory tracking-tight">
                  {img.caption}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-4 md:gap-6">
        {MASONRY_IMAGES.filter((_, i) => i % 2 !== 0).map((img, index) => (
          <motion.div
            key={`col2-${index}`}
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-xl bg-graphite fine-border shadow-sm"
          >
            <motion.div
              variants={hoverScale}
              initial="rest"
              whileHover="hover"
              className="relative w-full overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={500}
                height={600}
                className={`w-full object-cover transition-all duration-700 ${img.className}`}
                sizes="(max-width: 768px) 50vw, 33vw"
                priority={index === 0}
              />
              <div className="absolute inset-x-0 bottom-0 bg-graphite/90 backdrop-blur-md border-t border-ivory/5 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col">
                <span className="text-[8px] uppercase tracking-widest text-sand font-bold mb-0.5">
                  Visual Board
                </span>
                <h4 className="text-xs font-semibold text-ivory tracking-tight">
                  {img.caption}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
