/**
 * Premium Animation Variants for Framer Motion
 * 
 * Design Principles:
 * - Fast, elegant, responsive
 * - Subtle travel distances (10px to 30px)
 * - Custom spring easings for premium feedback
 */

export const EASE_CUSTOM = [0.16, 1, 0.3, 1]; // Premium cubic-bezier easing

export const transitionPremium = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
  ease: EASE_CUSTOM
};

// 1. Smooth reveal animations (fade + translateY)
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 24 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_CUSTOM
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_CUSTOM }
  }
};

// 2. Staggered card entrances
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// 3. Image hover micro-interactions
export const hoverScale = {
  rest: { scale: 1, filter: 'brightness(1)' },
  hover: { 
    scale: 1.03, 
    filter: 'brightness(1.05)',
    transition: { duration: 0.4, ease: EASE_CUSTOM }
  }
};

// 4. Smooth card hover elevations
export const cardHover = {
  rest: { y: 0, borderColor: 'rgba(201, 185, 163, 0.1)' },
  hover: { 
    y: -4, 
    borderColor: 'rgba(166, 106, 68, 0.3)', // Copper glow border
    transition: { duration: 0.3, ease: EASE_CUSTOM }
  }
};

// 5. Floating image movement (slow infinite vertical drift)
export const floatingY = (duration = 6, yDistance = 8) => ({
  animate: {
    y: [0, -yDistance, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
});

// 6. Magnetic button animations
export const magneticHover = {
  rest: { scale: 1, x: 0, y: 0 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};
