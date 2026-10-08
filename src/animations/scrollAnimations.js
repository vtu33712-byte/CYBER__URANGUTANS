import { anime, stagger } from './animeHelper';

/**
 * Reveal container children with anime stagger on scroll trigger
 */
export const revealOnScroll = (element, options = {}) => {
  if (!element) return null;
  const { delay = 100, translateY = [40, 0], duration = 800 } = options;

  return anime(element, {
    opacity: [0, 1],
    translateY,
    duration,
    ease: 'outExpo'
  });
};

/**
 * Apply parallax translate factors to foreground, middleground, and background layers
 */
export const updateParallaxLayers = ({
  foregroundRef,
  midgroundRef,
  backgroundRef,
  scrollY = 0
}) => {
  if (backgroundRef) {
    backgroundRef.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
  if (midgroundRef) {
    midgroundRef.style.transform = `translateY(${scrollY * 0.35}px)`;
  }
  if (foregroundRef) {
    foregroundRef.style.transform = `translateY(${scrollY * 0.6}px)`;
  }
};
