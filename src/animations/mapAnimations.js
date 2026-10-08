import { anime } from './animeHelper';

/**
 * Animate map marker selection bounce
 */
export const animateMarkerSelect = (markerElement) => {
  if (!markerElement) return null;
  return anime(markerElement, {
    scale: [1, 1.35, 1],
    translateY: [0, -10, 0],
    duration: 500,
    ease: 'outBack'
  });
};

/**
 * Radar scan radar sweep animation
 */
export const startRadarSweep = (radarElement) => {
  if (!radarElement) return null;
  return anime(radarElement, {
    rotate: [0, 360],
    duration: 4000,
    ease: 'linear',
    loop: true
  });
};
