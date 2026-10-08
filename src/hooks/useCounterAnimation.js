import { useEffect, useRef } from 'react';
import { animateCounter } from '../animations/counterAnimations';

/**
 * Hook to animate a numeric display value
 */
export const useCounterAnimation = (endValue, options = {}) => {
  const elementRef = useRef(null);
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled || !elementRef.current) return;
    const anim = animateCounter(elementRef.current, endValue, options);

    return () => {
      if (anim && typeof anim.pause === 'function') {
        anim.pause();
      }
    };
  }, [endValue, enabled]);

  return elementRef;
};

export default useCounterAnimation;
