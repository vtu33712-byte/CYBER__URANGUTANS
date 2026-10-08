import { anime } from './animeHelper';

/**
 * Animate the complaint tracking timeline progress line and step markers
 */
export const animateTimelineProgress = ({
  progressBarRef,
  nodesRef,
  targetProgressPercent = 75,
  duration = 1200
}) => {
  const tl = anime.timeline({
    defaults: { ease: 'outExpo' }
  });

  if (progressBarRef) {
    tl.add(progressBarRef, {
      width: ['0%', `${targetProgressPercent}%`],
      duration
    });
  }

  if (nodesRef) {
    tl.add(nodesRef, {
      opacity: [0, 1],
      scale: [0.7, 1],
      delay: anime.stagger(150),
      duration: 500,
      ease: 'outBack'
    }, '-=800');
  }

  return tl;
};
