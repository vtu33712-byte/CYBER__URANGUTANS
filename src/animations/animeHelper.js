import { 
  animate, 
  createTimeline, 
  stagger, 
  createTimer, 
  createSpring, 
  createAnimatable,
  remove, 
  set, 
  utils,
  svg,
  splitText,
  waapi
} from 'animejs';

/**
 * Universal Anime.js bridge supporting both Anime.js v3 and v4 paradigms.
 * Allows calling anime({ targets, ...params }) or anime(targets, params)
 */
export const anime = (arg1, arg2) => {
  if (!arg1) return null;
  
  // Pattern 1: anime({ targets: '.elem', opacity: [0, 1], ... })
  if (typeof arg1 === 'object' && arg1.targets !== undefined && arg2 === undefined) {
    const { targets, ...params } = arg1;
    return animate(targets, params);
  }
  
  // Pattern 2: anime(targets, params)
  return animate(arg1, arg2 || {});
};

// Timeline helper
anime.timeline = (params = {}) => {
  const tl = createTimeline(params);
  // Enhance timeline with chainable .add(targets, params, offset) or .add({ targets, ...params })
  const originalAdd = tl.add.bind(tl);
  tl.add = (a1, a2, a3) => {
    if (typeof a1 === 'object' && a1.targets !== undefined && a2 === undefined) {
      const { targets, ...opts } = a1;
      return originalAdd(targets, opts);
    }
    return originalAdd(a1, a2, a3);
  };
  return tl;
};

// Stagger helper
anime.stagger = stagger;

// Remove/Clean helper
anime.remove = (targets) => {
  try {
    if (targets) remove(targets);
  } catch (err) {
    // Graceful cleanup
  }
};

// Set values helper
anime.set = set;

// SVG helper
anime.svg = svg;

// Create animatable helper
anime.createAnimatable = createAnimatable;

// Utilities helper
anime.utils = utils;

// SplitText helper
anime.splitText = splitText;

// WAAPI helper
anime.waapi = waapi;

// Direct named exports
export { 
  animate, 
  createTimeline, 
  stagger, 
  createTimer, 
  createSpring, 
  createAnimatable,
  remove, 
  set, 
  utils,
  svg,
  splitText,
  waapi 
};

export default anime;
