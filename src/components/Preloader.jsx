import React, { useEffect, useRef, useState } from 'react';
import { animate } from '../animations/animeHelper';
import { Cpu, ShieldCheck, Globe, Sparkles, Activity, Zap } from 'lucide-react';

/**
 * Futuristic CivicFlow 3D Earth Preloader Screen
 * Orchestrated with Anime.js timelines, holographic HUD telemetry,
 * real-time percentage counter, and cinematic entrance curtain wipe.
 */
export const Preloader = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState('CONNECTING TO SMART CITY MESH...');
  const [isDone, setIsDone] = useState(false);
  
  const containerRef = useRef(null);
  const earthGlobeRef = useRef(null);
  const ringsRef = useRef(null);
  const barRef = useRef(null);
  const numberRef = useRef(null);
  const hudRef = useRef(null);

  useEffect(() => {
    // 1. Animate percentage counter from 0 to 100
    const counterObj = { val: 0 };
    
    const steps = [
      { at: 15, text: 'CALIBRATING 3D DIGITAL TWIN TOPOLOGY...' },
      { at: 40, text: 'LOADING POSTGIS 50M SPATIAL RESOLUTION ENGINE...' },
      { at: 70, text: 'SYNCING SUPABASE REALTIME SENSOR NODES...' },
      { at: 90, text: 'AI RESNET-CIVIC-V2 VISION MODEL PRIMED...' },
      { at: 100, text: 'ALL SMART CITY SYSTEMS NOMINAL • WELCOME' }
    ];

    // Anime.js orchestrates the counter and progress bar smoothly
    animate(counterObj, {
      val: 100,
      duration: 2600,
      ease: 'inOutQuad',
      onUpdate: () => {
        const currentVal = Math.floor(counterObj.val);
        setPercent(currentVal);
        if (numberRef.current) {
          numberRef.current.textContent = `${currentVal}%`;
        }
        if (barRef.current) {
          barRef.current.style.width = `${currentVal}%`;
        }

        const currentStep = steps.slice().reverse().find(s => currentVal >= s.at);
        if (currentStep) {
          setStatusText(currentStep.text);
        }
      },
      onComplete: () => {
        setIsDone(true);
        // Cinematic exit curtain animation
        setTimeout(() => {
          if (containerRef.current) {
            animate(containerRef.current, {
              opacity: [1, 0],
              scale: [1, 1.08],
              duration: 700,
              ease: 'inOutExpo',
              onComplete: () => {
                if (onFinish) onFinish();
              }
            });
          } else {
            if (onFinish) onFinish();
          }
        }, 500);
      }
    });

    // 2. Earth Globe Entrance & Pulse Animation
    if (earthGlobeRef.current) {
      animate(earthGlobeRef.current, {
        scale: [0.7, 1],
        opacity: [0, 1],
        duration: 1000,
        ease: 'outElastic(1, .8)'
      });
    }

    // 3. Orbital Rings Pulsing
    if (ringsRef.current) {
      animate(ringsRef.current.querySelectorAll('.orbital-ring'), {
        rotate: [0, 360],
        duration: 12000,
        loop: true,
        ease: 'linear'
      });
    }

    // 4. HUD elements stagger in
    if (hudRef.current) {
      animate(hudRef.current.querySelectorAll('.hud-element'), {
        opacity: [0, 1],
        translateY: [15, 0],
        delay: (el, i) => i * 150 + 200,
        duration: 800,
        ease: 'outCubic'
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999999] bg-[#02130b] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Background Cyber Grid & Radiant Emerald Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-emerald-950/50 via-[#03170e] to-[#010905] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid-bg opacity-40 pointer-events-none" />

      {/* Center 3D Earth Showcase */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Orbital Hologram Rings */}
        <div ref={ringsRef} className="absolute pointer-events-none w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          <div className="orbital-ring absolute inset-0 rounded-full border border-dashed border-emerald-500/40 animate-spin" style={{ animationDuration: '24s' }} />
          <div className="orbital-ring absolute inset-6 rounded-full border border-dotted border-mint-400/50 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
          <div className="orbital-ring absolute inset-12 rounded-full border border-emerald-400/30 shadow-[0_0_35px_rgba(16,185,129,0.35)]" />
        </div>

        {/* 3D Earth Sphere Model */}
        <div 
          ref={earthGlobeRef}
          className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.55),0_0_80px_rgba(52,211,153,0.35)] overflow-hidden border-2 border-emerald-400/80 z-10"
        >
          {/* Earth Texture with continuous 3D rotation */}
          <div 
            className="w-full h-full rounded-full animate-earth-spin bg-cover bg-center"
            style={{
              backgroundImage: `url('/earth-globe.png')`,
              backgroundSize: '105% 105%',
              backgroundPosition: 'center'
            }}
          />

          {/* 3D Spherical Atmosphere Shading & Specular Glint */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.45) 0%, rgba(52, 211, 153, 0.2) 35%, rgba(5, 150, 105, 0.45) 70%, rgba(2, 19, 11, 0.9) 100%)',
              boxShadow: 'inset 0 0 20px rgba(110, 231, 183, 0.9)'
            }}
          />

          {/* Animated Equatorial Scanner Line */}
          <div className="scanner-line absolute left-0 right-0 h-1.5 z-20 pointer-events-none animate-pulse" style={{ top: '50%' }} />
        </div>

        {/* CivicFlow Brand & Loading HUD */}
        <div ref={hudRef} className="mt-8 text-center z-10 max-w-md px-4">
          
          <div className="hud-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>CIVICFLOW GREEN SMART CITY PLATFORM</span>
          </div>

          <h1 className="hud-element text-3xl sm:text-4xl font-display font-black tracking-wider text-white">
            CIVIC<span className="cyber-gradient-text">FLOW</span>
          </h1>

          <p className="hud-element text-xs text-emerald-300/80 mt-1 font-mono">
            Smarter Reports. Faster Response. Better Cities.
          </p>

          {/* Progress Bar Container */}
          <div className="hud-element mt-6 w-64 sm:w-80 mx-auto">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-emerald-400/70 text-[10px]">INITIALIZING CORE</span>
              <span ref={numberRef} className="text-emerald-300 font-bold">
                {percent}%
              </span>
            </div>

            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-emerald-500/40 p-0.5">
              <div 
                ref={barRef}
                className="h-full bg-gradient-to-r from-emerald-500 via-mint to-teal-300 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.85)] transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Status Telemetry Text */}
            <div className="text-[11px] font-mono text-emerald-400 mt-2 truncate flex items-center justify-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>{statusText}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Telemetry Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] font-mono text-emerald-500/60">
        AI EDGE NETWORK • POSTGIS SPATIAL 50M • SUPABASE REALTIME SECURE
      </div>
    </div>
  );
};

export default Preloader;
