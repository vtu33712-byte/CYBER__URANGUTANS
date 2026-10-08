import { useEffect, useRef } from 'react';
import { anime } from '../animations/animeHelper';

/**
 * Hook to trigger an Anime.js entrance when an element scrolls into view
 */
export const useScrollAnimation = (animationProps = {}, observerOptions = { threshold: 0.15 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        anime(element, {
          opacity: [0, 1],
          translateY: [35, 0],
          scale: [0.98, 1],
          duration: 700,
          ease: 'outExpo',
          ...animationProps
        });
        observer.unobserve(element);
      }
    }, observerOptions);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return ref;
};

export default useScrollAnimation;
