import React, { useEffect, useRef, useState } from 'react';
import { animate } from '../animations/animeHelper';

/**
 * Photorealistic 3D Rotating Earth Ball Cursor
 * Uses the user's exact uploaded Earth asset with continuous 3D axial rotation,
 * dynamic atmospheric glow, smooth trailing physics, and interactive hover states.
 */
export const Earth3DCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const earthSphereRef = useRef(null);
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
    let isMoving = false;
    let moveTimeout;

    const onMouseMove = (e) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Direct instant transform for zero lag
      cursorEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Detect hover on clickable elements
      const target = e.target;
      const isClickable = target && (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('.glass-card') ||
        target.closest('.glass-button')
      );
      setIsHovering(Boolean(isClickable));

      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    const onMouseDown = () => {
      setIsClicking(true);
      if (rippleContainerRef.current) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-neon-cyan';
        ripple.style.left = `${mouseX}px`;
        ripple.style.top = `${mouseY}px`;
        rippleContainerRef.current.appendChild(ripple);

        animate(ripple, {
          scale: [0.6, 3.5],
          opacity: [1, 0],
          duration: 650,
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

    // Smooth physics trailing ring loop
    let reqId;
    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

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
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none">
      {/* Click ripple burst container */}
      <div ref={rippleContainerRef} className="absolute inset-0 pointer-events-none" />

      {/* Trailing Orbital Ring */}
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
              ? 'w-11 h-11 border-cyan-400/80 bg-cyan-500/15 shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-125'
              : 'w-8 h-8 border-emerald-400/40 bg-emerald-500/5'
          }`}
        />
      </div>

      {/* 3D Rotating Earth Cursor Core */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div 
          className={`-translate-x-1/2 -translate-y-1/2 transition-transform duration-200 relative ${
            isClicking 
              ? 'scale-90' 
              : isHovering 
              ? 'scale-130' 
              : 'scale-100'
          }`}
        >
          {/* 3D Rotating Earth Sphere */}
          <div 
            ref={earthSphereRef}
            className="w-8 h-8 rounded-full relative overflow-hidden shadow-[0_0_12px_rgba(34,211,238,0.7),0_0_20px_rgba(16,185,129,0.4)] border border-cyan-400/60"
            style={{
              perspective: '600px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Spinning Earth Texture */}
            <div 
              className="w-full h-full rounded-full animate-earth-spin bg-cover bg-center"
              style={{
                backgroundImage: `url('/earth-globe.png')`,
                backgroundSize: '105% 105%',
                backgroundPosition: 'center'
              }}
            />

            {/* 3D Specular Sun Glint & Atmospheric Rim Overlay */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.45) 0%, rgba(56, 189, 248, 0.2) 40%, rgba(3, 105, 161, 0.5) 75%, rgba(2, 6, 23, 0.85) 100%)',
                boxShadow: 'inset 0 0 6px rgba(103, 232, 249, 0.8)'
              }}
            />
          </div>

          {/* Interactive Hover Telemetry Ring */}
          {isHovering && (
            <div className="absolute -inset-1 rounded-full border border-dashed border-emerald-400/80 animate-spin pointer-events-none" style={{ animationDuration: '4s' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Earth3DCursor;
