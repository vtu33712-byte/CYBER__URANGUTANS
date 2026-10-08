import { useState, useEffect } from 'react';

export const AI_STEPS = [
  { id: 1, title: 'Location Check', desc: 'Evaluating 50m spatial cluster radius' },
  { id: 2, title: 'Image Similarity', desc: 'Comparing edge features & surface disruption' },
  { id: 3, title: 'Description Similarity', desc: 'Analyzing semantic civic category context' },
  { id: 4, title: 'Spatial Clustering', desc: 'Evaluating road segment density' },
  { id: 5, title: 'Priority Calculation', desc: 'Adjusting dynamic civic urgency score' },
  { id: 6, title: 'Final Decision', desc: 'Duplicate grouping consensus generated' }
];

export const useAIAnimation = (isActive, onComplete) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentStepIndex(0);
      setProgressPercent(0);
      setCompletedSteps([]);
      setIsDone(false);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      if (current < AI_STEPS.length) {
        setCompletedSteps(prev => [...prev, AI_STEPS[current].id]);
        current += 1;
        setCurrentStepIndex(current);
        setProgressPercent(Math.round((current / AI_STEPS.length) * 100));
      } else {
        clearInterval(interval);
        setIsDone(true);
        if (onComplete) onComplete();
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isActive]);

  return {
    steps: AI_STEPS,
    currentStepIndex,
    progressPercent,
    completedSteps,
    isDone
  };
};

export default useAIAnimation;
