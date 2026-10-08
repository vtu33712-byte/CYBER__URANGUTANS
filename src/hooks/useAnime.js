import { useEffect, useRef } from 'react';
import { anime } from '../animations/animeHelper';

/**
 * Custom React hook to run an Anime.js animation with automatic unmount cleanup
 */
export const useAnime = (animFunc, deps = []) => {
  const animInstanceRef = useRef(null);

  useEffect(() => {
    // Execute animation function that returns anime instance or timeline
    const anim = animFunc();
    animInstanceRef.current = anim;

    return () => {
      if (animInstanceRef.current) {
        try {
          if (typeof animInstanceRef.current.pause === 'function') {
            animInstanceRef.current.pause();
          }
          if (typeof animInstanceRef.current.revert === 'function') {
            animInstanceRef.current.revert();
          }
        } catch (e) {
          // Safe cleanup
        }
      }
    };
  }, deps);

  return animInstanceRef;
};

export default useAnime;
