import React from 'react';
import Hero from '../components/Hero';
import CharacterRoster from '../components/CharacterRoster';
import ScrollStorySection from '../components/ScrollStorySection';
import GreenCityVisualizer from '../components/GreenCityVisualizer';
import HorizonGalleries from '../components/HorizonGalleries';
import { usePageTransition } from '../hooks/usePageTransition';
import { ArrowRight, Sparkles, ShieldCheck, GitMerge, Zap } from 'lucide-react';

export const HomePage = ({ onNavigate, isLightMode }) => {
  const pageRef = usePageTransition('home');

  return (
    <div ref={pageRef} className="space-y-12">
      {/* 1. Cinematic 3D Hero */}
      <Hero onNavigate={onNavigate} isLightMode={isLightMode} />

      {/* 2. Quick Highlight Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-slate-900 p-8 rounded-3xl border border-cyan-500/30 flex flex-wrap items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Automated 50-Meter Grouping
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              Zero Redundant Work Orders. 60% Faster Dispatches.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              When a pothole or water leak is reported, CivicFlow queries active complaints within 50 meters using PostGIS. It compares visual contours and semantic descriptions, merging duplicates into one high-priority master record.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('duplicate-demo')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold text-xs shadow-neon-cyan flex items-center gap-2"
            >
              <GitMerge className="w-4 h-4" />
              <span>Try 50m Duplicate Demo</span>
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-xs hover:border-slate-500"
            >
              Report Issue
            </button>
          </div>
        </div>
      </section>

      {/* 3. Guardians / Character Showcase */}
      <CharacterRoster onSelectCharacter={(char) => onNavigate('profile', { charId: char.id })} />

      {/* 4. 10-Scene Civic Journey Scroll Story */}
      <ScrollStorySection />

      {/* 5. Parallax Green Eco-City Visualization */}
      <GreenCityVisualizer onNavigate={onNavigate} />

      {/* 6. Six Urban Horizons */}
      <HorizonGalleries onNavigate={onNavigate} />

      {/* 7. Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="glass-panel p-10 rounded-3xl border border-emerald-500/40 shadow-neon-emerald bg-gradient-to-b from-slate-950 to-emerald-950/40">
          <Sparkles className="w-10 h-10 text-emerald-400 mx-auto mb-3 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            Experience the Future of Smart Cities Today
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2">
            Join thousands of active citizens, ward superintendents, and municipal engineers building a cleaner, safer, responsive metropolis.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('report')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 font-bold text-sm shadow-neon-emerald hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span>File a Grievance Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('officer')}
              className="px-8 py-4 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-semibold text-sm hover:bg-slate-800 transition-colors"
            >
              Access Operations Command
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
