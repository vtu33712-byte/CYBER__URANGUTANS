import React, { useState, useRef, useEffect } from 'react';
import { 
  AlertTriangle, 
  Copy, 
  Eye, 
  MapPin, 
  GitMerge, 
  TrendingUp, 
  BellRing, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { SCROLL_STORY_SCENES } from '../data/horizonStories';
import { anime } from '../animations/animeHelper';

const ICON_MAP = {
  AlertTriangle,
  Copy,
  Eye,
  MapPin,
  GitMerge,
  TrendingUp,
  BellRing,
  Truck,
  CheckCircle2,
  Sparkles
};

export const ScrollStorySection = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardDisplayRef = useRef(null);

  const activeScene = SCROLL_STORY_SCENES[activeSceneIndex];
  const CurrentIcon = ICON_MAP[activeScene.icon] || Sparkles;

  // Animate card entrance when active scene changes
  useEffect(() => {
    if (cardDisplayRef.current) {
      anime({
        targets: cardDisplayRef.current,
        opacity: [0.3, 1],
        translateY: [15, 0],
        scale: [0.98, 1],
        duration: 450,
        ease: 'outExpo'
      });
    }
  }, [activeSceneIndex]);

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSceneIndex(prev => (prev + 1) % SCROLL_STORY_SCENES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Cinematic Civic Lifecycle
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            The CivicFlow Journey
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-1">
            Follow the 10-phase sequence from street anomaly detection to autonomous spatial grouping, priority escalation, and urban restoration.
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-300 flex items-center gap-2"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'PAUSE STORY' : 'AUTOPLAY SEQUENCE'}</span>
        </button>
      </div>

      {/* 10-Scene Scrubber Navigation Bar */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 mb-8">
        {SCROLL_STORY_SCENES.map((scene, idx) => {
          const isActive = activeSceneIndex === idx;
          const isPassed = activeSceneIndex > idx;

          return (
            <button
              key={scene.id}
              onClick={() => setActiveSceneIndex(idx)}
              className={`p-2 rounded-xl border text-center transition-all ${
                isActive
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-neon-cyan scale-105'
                  : isPassed
                  ? 'bg-slate-900 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-mono font-bold">{scene.step}</div>
              <div className="text-[9px] font-semibold truncate hidden sm:block">
                {scene.title.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Scene Visual Stage */}
      <div 
        ref={cardDisplayRef}
        className="glass-panel bg-slate-950/85 p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span 
                className="text-xs font-mono font-bold px-2.5 py-1 rounded-md uppercase"
                style={{ backgroundColor: `${activeScene.color}25`, color: activeScene.color }}
              >
                SCENE {activeScene.step} OF 10
              </span>
              <span className="text-xs font-mono text-slate-400 tracking-wider">
                {activeScene.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {activeScene.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {activeScene.summary}
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-6">
              <div>
                <div className="text-[10px] font-mono text-slate-400">TELEMETRY KPI</div>
                <div className="text-base font-mono font-bold text-cyan-300">{activeScene.metric}</div>
              </div>
            </div>
          </div>

          {/* Right Holographic Icon & Pulse Stage */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-2xl">
              {/* Outer Pulsing Ring */}
              <div 
                className="absolute inset-0 rounded-3xl animate-ping opacity-20 pointer-events-none"
                style={{ backgroundColor: activeScene.color }}
              />

              {/* Glowing Icon */}
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: `${activeScene.color}20`, border: `1.5px solid ${activeScene.color}` }}
              >
                <CurrentIcon className="w-12 h-12" style={{ color: activeScene.color }} />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-slate-950 border border-slate-700 text-[10px] font-mono text-slate-300 uppercase shadow-lg">
                Stage {activeScene.step} Confirmed
              </div>
            </div>
          </div>

        </div>

        {/* Step Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => setActiveSceneIndex(prev => (prev - 1 + SCROLL_STORY_SCENES.length) % SCROLL_STORY_SCENES.length)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800"
          >
            ← Previous Scene
          </button>

          <span className="text-xs font-mono text-slate-500">
            {activeSceneIndex + 1} / {SCROLL_STORY_SCENES.length}
          </span>

          <button
            onClick={() => setActiveSceneIndex(prev => (prev + 1) % SCROLL_STORY_SCENES.length)}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Next Scene</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ScrollStorySection;
