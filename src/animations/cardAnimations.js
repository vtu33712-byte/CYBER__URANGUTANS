import { anime, stagger } from './animeHelper';

/**
 * Animate a group of cards with a staggered entrance
 */
export const animateCardsStagger = (targets, options = {}) => {
  if (!targets) return null;
  const { delay = 50, duration = 600, translateY = [30, 0] } = options;

  return anime(targets, {
    opacity: [0, 1],
    translateY,
    scale: [0.96, 1],
    delay: stagger(delay),
    duration,
    ease: 'outExpo'
  });
};

/**
 * Selection bounce effect when citizen picks an issue card
 */
export const animateCardSelect = (target) => {
  if (!target) return null;
  return anime(target, {
    scale: [1, 1.04, 1],
    duration: 350,
    ease: 'outBack'
  });
};

/**
 * Handle mouse move 3D tilt effect on interactive cards
 */
export const apply3DTilt = (cardElement, event, maxTilt = 8) => {
  if (!cardElement) return;
  const rect = cardElement.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const tiltX = ((y - centerY) / centerY) * -maxTilt;
  const tiltY = ((x - centerX) / centerX) * maxTilt;

  cardElement.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
};

export const reset3DTilt = (cardElement) => {
  if (!cardElement) return;
  cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
};
