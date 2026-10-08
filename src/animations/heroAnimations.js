import { anime } from './animeHelper';

/**
 * Orchestrates the cinematic Hero entrance timeline:
 * Logo -> headline -> subtitle -> buttons -> city -> map markers -> statistics
 */
export const playHeroEntrance = ({
  logoRef,
  headlineRef,
  subtitleRef,
  buttonsRef,
  statsRef,
  badgesRef
}) => {
  const tl = anime.timeline({
    defaults: {
      ease: 'outExpo',
      duration: 800
    }
  });

  if (logoRef) {
    tl.add(logoRef, {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 600
    });
  }

  if (headlineRef) {
    tl.add(headlineRef, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 900
    }, '-=300');
  }

  if (subtitleRef) {
    tl.add(subtitleRef, {
      opacity: [0, 1],
      translateY: [25, 0],
      duration: 700
    }, '-=500');
  }

  if (buttonsRef) {
    tl.add(buttonsRef, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.95, 1],
      duration: 600
    }, '-=400');
  }

  if (badgesRef) {
    tl.add(badgesRef, {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 500
    }, '-=300');
  }

  if (statsRef) {
    tl.add(statsRef, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700
    }, '-=300');
  }

  return tl;
};

/**
 * Continuous ambient floating animation for hero UI badges and 3D overlays
 */
export const startAmbientFloat = (target) => {
  if (!target) return null;
  return anime(target, {
    translateY: [-6, 6],
    duration: 3500,
    ease: 'inOutQuad',
    alternate: true,
    loop: true
  });
};

/**
 * Continuous radar/glow pulse for hero status indicators
 */
export const startPulseGlow = (target) => {
  if (!target) return null;
  return anime(target, {
    scale: [1, 1.15],
    opacity: [0.7, 1],
    duration: 2000,
    ease: 'inOutSine',
    alternate: true,
    loop: true
  });
};
