import React, { useEffect, useRef } from 'react';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Zap, 
  Users, 
  Compass, 
  CheckCircle2, 
  GitMerge,
  AlertTriangle
} from 'lucide-react';
import { CityScene } from './CityScene';
import { playHeroEntrance } from '../animations/heroAnimations';
import { animateCounter } from '../animations/counterAnimations';
import { INITIAL_CITY_STATS } from '../data/mockData';

export const Hero = ({ onNavigate, isLightMode = false }) => {
  const logoBadgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgesRef = useRef(null);
  const statsContainerRef = useRef(null);

  const statVal1 = useRef(null);
  const statVal2 = useRef(null);
  const statVal3 = useRef(null);
  const statVal4 = useRef(null);

  useEffect(() => {
    // 1. Run Anime.js Hero Entrance Timeline
    const tl = playHeroEntrance({
      logoRef: logoBadgeRef.current,
      headlineRef: headlineRef.current,
      subtitleRef: subtitleRef.current,
      buttonsRef: buttonsRef.current,
      statsRef: statsContainerRef.current,
      badgesRef: badgesRef.current
    });

    // 2. Run animated counters with Anime.js
    const timer = setTimeout(() => {
      if (statVal1.current) animateCounter(statVal1.current, INITIAL_CITY_STATS.issuesResolved, { duration: 2200 });
      if (statVal2.current) animateCounter(statVal2.current, INITIAL_CITY_STATS.reportsProcessed, { duration: 2400 });
      if (statVal3.current) animateCounter(statVal3.current, INITIAL_CITY_STATS.duplicatesGrouped, { duration: 2000 });
      if (statVal4.current) animateCounter(statVal4.current, INITIAL_CITY_STATS.responseEfficiency, { suffix: '%', duration: 1800 });
    }, 600);

    return () => {
      clearTimeout(timer);
      if (tl && typeof tl.pause === 'function') tl.pause();
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 md:px-8 overflow-hidden">
      {/* 3D City Background */}
      <CityScene isLightMode={isLightMode} interactive={true} />

      {/* Atmospheric Radial Gradients / Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col lg:flex-row items-center justify-between gap-12 pointer-events-none">
        
        {/* Left Column: Headlines & Call to Actions */}
        <div className="max-w-2xl text-left pointer-events-auto">
          {/* Top Status Pill */}
          <div ref={logoBadgeRef} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/40 backdrop-blur-md mb-6 shadow-neon-emerald">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold tracking-wide uppercase text-emerald-300">
              Civic Intelligence OS 4.0 Online
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-cyan-300 font-medium">50m PostGIS Cluster Active</span>
          </div>

          {/* Main Headline */}
          <div ref={headlineRef}>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-3">
              Civic<span className="cyber-gradient-text">Flow</span>
            </h1>
            <div className="space-y-1 font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-100">
              <span className="block text-emerald-400">Smarter Reports.</span>
              <span className="block text-cyan-400">Faster Response.</span>
              <span className="block text-purple-400">Better Cities.</span>
            </div>
          </div>

          {/* Subtitle */}
          <p ref={subtitleRef} className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-sans font-light">
            AI-powered civic intelligence that connects citizens, municipal officers, and real-time city operations through 50-meter spatial clustering and multi-perspective computer vision.
          </p>

          {/* Action Buttons */}
          <div ref={buttonsRef} className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('report')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 shadow-neon-emerald hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <span>Report an Issue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('map')}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm glass-panel bg-slate-900/60 hover:bg-slate-800/80 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explore 3D City</span>
            </button>

            <button
              onClick={() => onNavigate('officer')}
              className="px-4 py-3.5 rounded-xl font-medium text-xs text-slate-300 hover:text-white glass-panel hover:bg-slate-800/40 border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>Operations HUD</span>
            </button>
          </div>

          {/* Quick Metrics Bar below buttons */}
          <div ref={badgesRef} className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>PostGIS 50m Geo-Index</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Multi-Modal AI Vision</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>24 Wards Synchronized</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Holographic Floating Card */}
        <div className="pointer-events-auto w-full lg:w-auto flex justify-center">
          <div className="relative w-full max-w-sm glass-panel bg-slate-950/85 p-6 rounded-2xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  Live Dispatch Stream
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Ward 14 • Tech Sector</span>
            </div>

            {/* Featured Active Anomaly Snippet */}
            <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/40 flex-shrink-0 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-orange-400">CIV-001</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300">
                    7 Reports Merged
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 truncate mt-0.5">Asphalt Cavity & Pothole</h4>
                <p className="text-[11px] text-slate-400 truncate">Avenue of Sovereignty • 18m nearby</p>
              </div>
            </div>

            {/* Quick Action in Card */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onNavigate('duplicate-demo')}
                className="flex-1 py-2 text-center bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg text-xs font-semibold text-cyan-300 transition-all flex items-center justify-center gap-1.5"
              >
                <GitMerge className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate 50m Merge</span>
              </button>
              <button
                onClick={() => onNavigate('tracker', { searchCode: 'CIV-001' })}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-300"
              >
                Track
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Glass Statistics Cards */}
      <div 
        ref={statsContainerRef} 
        className="relative z-10 max-w-7xl mx-auto w-full mt-10 pointer-events-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Stat 1 */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-mono">
              <span>RESOLVED</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div 
              ref={statVal1} 
              className="text-2xl sm:text-3xl font-display font-extrabold text-white"
            >
              0
            </div>
            <div className="text-xs text-emerald-400 font-medium mt-1">Issues Resolved</div>
          </div>

          {/* Stat 2 */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-mono">
              <span>PROCESSED</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div 
              ref={statVal2} 
              className="text-2xl sm:text-3xl font-display font-extrabold text-white"
            >
              0
            </div>
            <div className="text-xs text-cyan-400 font-medium mt-1">Reports Processed</div>
          </div>

          {/* Stat 3 */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-purple-500/20 hover:border-purple-500/50">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-mono">
              <span>PREVENTED</span>
              <GitMerge className="w-4 h-4 text-purple-400" />
            </div>
            <div 
              ref={statVal3} 
              className="text-2xl sm:text-3xl font-display font-extrabold text-white"
            >
              0
            </div>
            <div className="text-xs text-purple-400 font-medium mt-1">Duplicates Grouped</div>
          </div>

          {/* Stat 4 */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-teal-500/20 hover:border-teal-500/50">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-mono">
              <span>EFFICIENCY</span>
              <TrendingUp className="w-4 h-4 text-teal-400" />
            </div>
            <div 
              ref={statVal4} 
              className="text-2xl sm:text-3xl font-display font-extrabold text-white"
            >
              0%
            </div>
            <div className="text-xs text-teal-400 font-medium mt-1">Response Efficiency</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
