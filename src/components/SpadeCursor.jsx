import React, { useEffect, useRef, useState } from 'react';
import { animate, createAnimatable, utils } from '../animations/animeHelper';

/**
 * Futuristic Spade-Shaped Cyber Cursor Component
 * Built with Anime.js v4 animatable tracking, smooth interpolation,
 * hover element scaling, and click ripple particle burst.
 */
export const SpadeCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const rippleContainerRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate custom cursor on non-touch pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursorEl = cursorRef.current;
    const ringEl = ringRef.current;
    if (!cursorEl || !ringEl) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    // Direct cursor positioning
    const onMouseMove = (e) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Primary spade follows mouse instantly
      cursorEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Check if hovering over clickable element
      const target = e.target;
      const clickable = target && (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('.glass-card')
      );
      setIsHovering(Boolean(clickable));
    };

    const onMouseDown = () => {
      setIsClicking(true);
      // Create click burst ripple
      if (rippleContainerRef.current) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute w-6 h-6 rounded-full border border-cyan-400 pointer-events-none -translate-x-1/2 -translate-y-1/2';
        ripple.style.left = `${mouseX}px`;
        ripple.style.top = `${mouseY}px`;
        rippleContainerRef.current.appendChild(ripple);

        animate(ripple, {
          scale: [0.8, 3.2],
          opacity: [1, 0],
          duration: 600,
          ease: 'outExpo',
          onComplete: () => ripple.remove()
        });
      }
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth animation loop for lagging trailing ring (Anime.js dampening)
    let reqId;
    const updateRing = () => {
      // Damped trailing interpolation
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      reqId = requestAnimationFrame(updateRing);
    };
    reqId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Container for click ripples */}
      <div ref={rippleContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* Trailing Outer Glow Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div 
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${
            isHovering
              ? 'w-10 h-10 border-cyan-400/80 bg-cyan-500/10 shadow-neon-cyan scale-125'
              : 'w-7 h-7 border-emerald-400/50 bg-emerald-500/5'
          }`}
        />
      </div>

      {/* Primary Spade Cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div 
          className={`-translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${
            isClicking 
              ? 'scale-75' 
              : isHovering 
              ? 'scale-135 -rotate-6' 
              : 'scale-100'
          }`}
        >
          {/* Cyber Spade SVG Emblem (♠) */}
          <svg
            width="28"
            height="32"
            viewBox="0 0 28 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_8px_rgba(6,182,212,0.85)] drop-shadow-[0_0_16px_rgba(16,185,129,0.5)]"
          >
            <defs>
              {/* CivicFlow Cyber Emerald-Cyan Theme Gradient */}
              <linearGradient id="spadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="45%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="spadeCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>

            {/* Spade Main Body: Sharp pointer tip at (14, 2) */}
            <path
              d="M 14 2 
                 C 9.5 7.5 3 11.5 3 17 
                 C 3 21 7 23.5 11 23 
                 C 12.8 22.8 13.6 21 14 19.5 
                 C 14.4 21 15.2 22.8 17 23 
                 C 21 23.5 25 21 25 17 
                 C 25 11.5 18.5 7.5 14 2 Z"
              fill="url(#spadeGrad)"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Spade Stem Base */}
            <path
              d="M 13 20 
                 L 10.5 27 
                 L 17.5 27 
                 L 15 20 Z"
              fill="url(#spadeGrad)"
              stroke="#ffffff"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />

            {/* Cyber Reticle Diamond Core */}
            <polygon
              points="14,10 16.5,14.5 14,19 11.5,14.5"
              fill="url(#spadeCoreGrad)"
              opacity="0.9"
            />

            {/* Micro Aim Point at Apex Tip */}
            <circle cx="14" cy="2.5" r="1.2" fill="#ffffff" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SpadeCursor;
