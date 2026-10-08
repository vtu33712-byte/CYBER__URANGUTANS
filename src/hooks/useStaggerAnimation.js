import { useEffect, useRef } from 'react';
import { anime, stagger } from '../animations/animeHelper';

/**
 * Hook to stagger-animate child elements of a container
 */
export const useStaggerAnimation = (childSelector = '.stagger-item', options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll(childSelector);
    if (!elements || elements.length === 0) return;

    const anim = anime(elements, {
      opacity: [0, 1],
      translateY: [25, 0],
      delay: stagger(options.delay || 70, { start: options.start || 100 }),
      duration: options.duration || 650,
      ease: 'outExpo'
    });

    return () => {
      if (anim && typeof anim.pause === 'function') {
        anim.pause();
      }
    };
  }, [childSelector]);

  return containerRef;
};

export default useStaggerAnimation;
