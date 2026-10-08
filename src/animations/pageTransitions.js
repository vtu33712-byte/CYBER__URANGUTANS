import { anime } from './animeHelper';

/**
 * Animate page entrance transition cleanly with Anime.js
 */
export const animatePageEnter = (pageContainer) => {
  if (!pageContainer) return null;

  return anime(pageContainer, {
    opacity: [0, 1],
    translateY: [16, 0],
    scale: [0.99, 1],
    duration: 450,
    ease: 'outQuad'
  });
};

/**
 * Smooth modal backdrop and dialog entrance
 */
export const animateModalEnter = (dialogElement) => {
  if (!dialogElement) return null;

  return anime(dialogElement, {
    opacity: [0, 1],
    scale: [0.92, 1],
    translateY: [20, 0],
    duration: 380,
    ease: 'outBack'
  });
};
