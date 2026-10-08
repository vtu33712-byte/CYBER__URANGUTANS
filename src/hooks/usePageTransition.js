import { useEffect, useRef } from 'react';
import { animatePageEnter } from '../animations/pageTransitions';

/**
 * Hook to trigger page entrance animation whenever component mounts or active page changes
 */
export const usePageTransition = (pageKey) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      animatePageEnter(containerRef.current);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pageKey]);

  return containerRef;
};

export default usePageTransition;
