import React from 'react';
import { Building2, Car, Leaf, Cpu, Radio, Sparkles, ArrowRight } from 'lucide-react';
import { HORIZONS } from '../data/horizonStories';
import { apply3DTilt, reset3DTilt } from '../animations/cardAnimations';

const HORIZON_ICONS = {
  Building2,
  Car,
  Leaf,
  Cpu,
  Radio,
  Sparkles
};

export const HorizonGalleries = ({ onNavigate }) => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Multi-Dimensional Urban Horizons
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
          Six Horizons of Smart Urban Governance
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto mt-1">
          Explore how CivicFlow interconnects architecture, mobility, clean energy, and artificial intelligence into one unified digital organism.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HORIZONS.map((horizon) => {
          const Icon = HORIZON_ICONS[horizon.icon] || Sparkles;

          return (
            <div
              key={horizon.id}
              onMouseMove={(e) => apply3DTilt(e.currentTarget, e, 6)}
              onMouseLeave={(e) => reset3DTilt(e.currentTarget)}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between group transition-all duration-300 relative"
            >
              <div>
                {/* Visual Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={horizon.image} 
                    alt={horizon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Floating Horizon Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>HORIZON {horizon.number}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {horizon.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-400 mt-1">
                    {horizon.tagline}
                  </p>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-light">
                    {horizon.details}
                  </p>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{horizon.stats}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HorizonGalleries;
