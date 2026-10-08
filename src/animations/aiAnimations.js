import { anime } from './animeHelper';

/**
 * Sweeping laser scan line over evidence image
 */
export const startLaserScan = (lineElement) => {
  if (!lineElement) return null;
  return anime(lineElement, {
    translateY: ['0%', '100%'],
    opacity: [0.8, 1, 0.8],
    duration: 1800,
    ease: 'inOutQuad',
    alternate: true,
    loop: true
  });
};

/**
 * Circular confidence meter animation (0 to target percentage)
 */
export const animateConfidenceCircle = ({
  circleRef,
  numberRef,
  targetPercent = 89,
  duration = 2000,
  onComplete
}) => {
  const tl = anime.timeline({
    defaults: { ease: 'outExpo' }
  });

  const circumference = 2 * Math.PI * 45; // r = 45 -> circumference approx 282.74

  if (circleRef) {
    tl.add(circleRef, {
      strokeDashoffset: [circumference, circumference - (circumference * targetPercent) / 100],
      duration
    });
  }

  if (numberRef) {
    const counter = { val: 0 };
    tl.add(counter, {
      val: targetPercent,
      duration,
      onUpdate: () => {
        numberRef.textContent = `${Math.round(counter.val)}%`;
      }
    }, 0);
  }

  if (onComplete) {
    tl.then(onComplete);
  }

  return tl;
};

/**
 * Animated checkmarks in Explainable AI sequence
 */
export const animateCheckmarksStagger = (checkmarks) => {
  if (!checkmarks) return null;
  return anime(checkmarks, {
    opacity: [0, 1],
    translateX: [-15, 0],
    scale: [0.8, 1],
    delay: anime.stagger(150, { start: 200 }),
    duration: 500,
    ease: 'outBack'
  });
};

/**
 * Cinematic Report Merging Animation:
 * Source report card translates toward existing target complaint, shrinks into pulse,
 * triggers counter increment, badge transition, and notification burst!
 */
export const playReportMergeAnimation = ({
  sourceCardRef,
  targetCardRef,
  counterRef,
  badgeRef,
  notificationRef,
  onComplete
}) => {
  const tl = anime.timeline({
    defaults: { ease: 'outExpo' }
  });

  if (sourceCardRef && targetCardRef) {
    const sourceRect = sourceCardRef.getBoundingClientRect();
    const targetRect = targetCardRef.getBoundingClientRect();
    const deltaX = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
    const deltaY = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);

    // 1. Source card glows and flies toward target
    tl.add(sourceCardRef, {
      translateX: [0, deltaX],
      translateY: [0, deltaY],
      scale: [1, 0.45],
      opacity: [1, 0.2],
      duration: 1100,
      ease: 'inOutCubic'
    });

    // 2. Target card pulses with energy absorption
    tl.add(targetCardRef, {
      scale: [1, 1.08, 1],
      boxShadow: [
        '0 0 0px rgba(16, 185, 129, 0)',
        '0 0 35px rgba(52, 211, 153, 0.9)',
        '0 0 15px rgba(16, 185, 129, 0.4)'
      ],
      duration: 600,
      ease: 'outBack'
    }, '-=300');
  }

  // 3. Counter bumps from 7 -> 8
  if (counterRef) {
    tl.add(counterRef, {
      scale: [1, 1.4, 1],
      color: ['#f8fafc', '#34d399', '#f8fafc'],
      duration: 500
    }, '-=200');
  }

  // 4. Priority badge switches (MEDIUM -> HIGH)
  if (badgeRef) {
    tl.add(badgeRef, {
      scale: [1, 1.25, 1],
      duration: 450,
      ease: 'outElastic'
    }, '-=300');
  }

  // 5. Notification card slides in
  if (notificationRef) {
    tl.add(notificationRef, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      ease: 'outExpo'
    }, '-=100');
  }

  if (onComplete) {
    tl.then(onComplete);
  }

  return tl;
};
