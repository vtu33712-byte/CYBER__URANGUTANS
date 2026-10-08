import React, { useEffect, useRef } from 'react';
import { 
  Leaf, 
  Wind, 
  Sun, 
  Droplet, 
  Zap, 
  Trees, 
  Recycle, 
  Sparkles,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { anime } from '../animations/animeHelper';

export const GreenCityVisualizer = ({ onNavigate }) => {
  const containerRef = useRef(null);
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const turbineBlade1Ref = useRef(null);
  const turbineBlade2Ref = useRef(null);
  const evBusRef = useRef(null);

  useEffect(() => {
    // 1. Continuous Cloud Drift
    const animCloud1 = anime(cloud1Ref.current, {
      translateX: [-100, window.innerWidth || 1200],
      duration: 28000,
      ease: 'linear',
      loop: true
    });

    const animCloud2 = anime(cloud2Ref.current, {
      translateX: [-80, window.innerWidth || 1200],
      duration: 38000,
      delay: 5000,
      ease: 'linear',
      loop: true
    });

    // 2. Continuous Wind Turbine Blade Rotation
    const animTurbine1 = anime(turbineBlade1Ref.current, {
      rotate: [0, 360],
      duration: 3500,
      ease: 'linear',
      loop: true
    });

    const animTurbine2 = anime(turbineBlade2Ref.current, {
      rotate: [0, 360],
      duration: 4200,
      ease: 'linear',
      loop: true
    });

    // 3. Autonomous Electric Shuttle Shuttle Loop
    const animEV = anime(evBusRef.current, {
      translateX: [-120, window.innerWidth || 1200],
      duration: 12000,
      ease: 'inOutQuad',
      loop: true
    });

    return () => {
      if (animCloud1 && typeof animCloud1.pause === 'function') animCloud1.pause();
      if (animCloud2 && typeof animCloud2.pause === 'function') animCloud2.pause();
      if (animTurbine1 && typeof animTurbine1.pause === 'function') animTurbine1.pause();
      if (animTurbine2 && typeof animTurbine2.pause === 'function') animTurbine2.pause();
      if (animEV && typeof animEV.pause === 'function') animEV.pause();
    };
  }, []);

  return (
    <section className="relative w-full py-16 px-4 md:px-8 overflow-hidden">
      
      {/* Background Gradient & Ambient Glow */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono mb-2">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bio-Sovereignty & Net-Zero Logistics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              Building a Cleaner, Greener City
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
              By consolidating duplicate municipal dispatch journeys within 50 meters, CivicFlow slashes fuel expenditure, suppresses diesel emissions, and finances urban reforestation.
            </p>
          </div>

          <button
            onClick={() => onNavigate('green-future')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 text-xs font-bold shadow-neon-emerald flex items-center gap-2"
          >
            <span>Explore Eco-Corridors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Cinematic Parallax Eco-City Stage */}
        <div 
          ref={containerRef}
          className="relative w-full h-[460px] rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/80"
        >
          {/* Layer 1: Background Sky, Stars & Drifting Anime Clouds */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Drifting Clouds */}
            <div 
              ref={cloud1Ref} 
              className="absolute top-10 left-0 w-44 h-16 rounded-full bg-white/10 blur-xl pointer-events-none" 
            />
            <div 
              ref={cloud2Ref} 
              className="absolute top-24 left-0 w-60 h-20 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" 
            />
          </div>

          {/* Layer 2: Distant Mountains and Clean Futuristic Skyline */}
          <div className="absolute bottom-28 left-0 right-0 flex items-end justify-between px-6 opacity-45 pointer-events-none">
            <div className="w-16 h-48 bg-slate-800/80 rounded-t-lg"></div>
            <div className="w-24 h-64 bg-slate-700/80 rounded-t-xl"></div>
            <div className="w-20 h-56 bg-slate-800/80 rounded-t-lg"></div>
            <div className="w-32 h-80 bg-slate-700/80 rounded-t-2xl"></div>
            <div className="w-28 h-60 bg-slate-800/80 rounded-t-lg"></div>
            <div className="w-20 h-44 bg-slate-800/80 rounded-t-md"></div>
          </div>

          {/* Layer 3: Midground Wind Turbines & Solar Terraces */}
          <div className="absolute bottom-20 left-12 flex items-end gap-16 pointer-events-none">
            {/* Wind Turbine 1 */}
            <div className="relative flex flex-col items-center">
              <div 
                ref={turbineBlade1Ref}
                className="w-16 h-16 flex items-center justify-center -mb-8 origin-center"
              >
                <div className="w-1 h-16 bg-emerald-400/80 rounded-full"></div>
                <div className="w-16 h-1 bg-emerald-400/80 rounded-full absolute"></div>
              </div>
              <div className="w-1.5 h-36 bg-slate-400 rounded-t-sm"></div>
            </div>

            {/* Wind Turbine 2 */}
            <div className="relative flex flex-col items-center hidden sm:flex">
              <div 
                ref={turbineBlade2Ref}
                className="w-12 h-12 flex items-center justify-center -mb-6 origin-center"
              >
                <div className="w-1 h-12 bg-teal-400/80 rounded-full"></div>
                <div className="w-12 h-1 bg-teal-400/80 rounded-full absolute"></div>
              </div>
              <div className="w-1 h-28 bg-slate-500 rounded-t-sm"></div>
            </div>
          </div>

          {/* Layer 4: Electric Vehicle Transit Highway */}
          <div className="absolute bottom-12 left-0 right-0 h-10 bg-slate-900 border-y border-emerald-500/30 flex items-center">
            {/* Moving Autonomous Electric Shuttle */}
            <div 
              ref={evBusRef} 
              className="absolute flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-400 text-slate-950 font-mono text-[10px] font-bold shadow-neon-emerald"
            >
              <Zap className="w-3 h-3 text-slate-950" />
              <span>EV SHUTTLE 08</span>
            </div>
          </div>

          {/* Layer 5: Foreground Trees, Kinetic Sidewalks and Bio-Pillars */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-emerald-950/90 border-t border-emerald-500/40 flex items-center justify-between px-6 sm:px-12">
            <div className="flex items-center gap-4 text-emerald-300 text-xs font-mono">
              <Trees className="w-5 h-5 text-emerald-400" />
              <span className="hidden sm:inline">Bio-Corridor Zone 4 • Smart Hydro-Greens</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-emerald-300 font-bold">AIR QUALITY: PM 2.5 @ 12 µg/m³ (OPTIMAL)</span>
            </div>
          </div>

          {/* Floating Eco KPI Overlays */}
          <div className="absolute top-6 right-6 flex flex-col gap-2.5 max-w-xs">
            <div className="p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 shadow-lg text-xs">
              <div className="text-[10px] font-mono text-emerald-400 uppercase flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                <span>Trip Carbon Abatement</span>
              </div>
              <div className="text-xl font-display font-extrabold text-white mt-0.5">38.6 Tons CO₂</div>
              <div className="text-[10px] text-slate-400">Prevented through 50m report merging</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 shadow-lg text-xs">
              <div className="text-[10px] font-mono text-cyan-400 uppercase flex items-center gap-1">
                <Sun className="w-3 h-3" />
                <span>Renewable Grid Share</span>
              </div>
              <div className="text-xl font-display font-extrabold text-white mt-0.5">74.2% Clean</div>
              <div className="text-[10px] text-slate-400">Solar canopy + micro wind turbines</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GreenCityVisualizer;
