import { anime } from './animeHelper';

/**
 * Animate a numeric counter element from 0 (or startVal) to targetVal
 */
export const animateCounter = (targetElement, endValue, options = {}) => {
  if (!targetElement) return null;

  const {
    duration = 2000,
    prefix = '',
    suffix = '',
    decimals = 0,
    ease = 'outExpo'
  } = options;

  const obj = { val: 0 };

  return anime(obj, {
    val: endValue,
    duration,
    ease,
    onUpdate: () => {
      const formatted = decimals > 0 
        ? obj.val.toFixed(decimals)
        : Math.round(obj.val).toLocaleString();
      targetElement.textContent = `${prefix}${formatted}${suffix}`;
    }
  });
};
