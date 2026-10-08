import React from 'react';
import GreenCityVisualizer from '../components/GreenCityVisualizer';
import { 
  Leaf, 
  Wind, 
  Sun, 
  Droplets, 
  Trees, 
  Award, 
  TrendingDown, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { usePageTransition } from '../hooks/usePageTransition';

export const GreenFuturePage = ({ onNavigate }) => {
  const pageRef = usePageTransition('green-future');

  return (
    <div ref={pageRef} className="pt-24 pb-16 space-y-12">
      {/* 1. Interactive Green City Parallax Visualizer */}
      <GreenCityVisualizer onNavigate={onNavigate} />

      {/* 2. Detailed Sustainability Impact Metrics */}
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Net-Zero Ecological Telemetry
          </span>
          <h2 className="text-3xl font-display font-black text-white mt-1">
            Quantifiable Environmental Dividends
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            How autonomous duplicate grouping and precision municipal routing directly accelerate urban decarbonization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-6 rounded-3xl border border-emerald-500/30">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 w-fit mb-3">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div className="text-3xl font-display font-black text-white">38.6 Tons</div>
            <div className="text-xs font-bold text-emerald-400 mt-1">CO₂ Emissions Abated</div>
            <p className="text-[11px] text-slate-400 mt-2">
              Preventing 438 redundant diesel repair truck trips via 50m spatial report grouping.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-cyan-500/30">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 w-fit mb-3">
              <Trees className="w-5 h-5" />
            </div>
            <div className="text-3xl font-display font-black text-white">14,800</div>
            <div className="text-xs font-bold text-cyan-400 mt-1">Sensor-Monitored Trees</div>
            <p className="text-[11px] text-slate-400 mt-2">
              Soil moisture and root canopy IoT nodes across Ward 5 & Ward 14 parks.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-teal-500/30">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 w-fit mb-3">
              <Sun className="w-5 h-5" />
            </div>
            <div className="text-3xl font-display font-black text-white">74.2%</div>
            <div className="text-xs font-bold text-teal-400 mt-1">Renewable Grid Mix</div>
            <p className="text-[11px] text-slate-400 mt-2">
              Distributed rooftop solar canopies and micro vertical-axis wind turbines.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-purple-500/30">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 w-fit mb-3">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-3xl font-display font-black text-white">82,400</div>
            <div className="text-xs font-bold text-purple-400 mt-1">Citizen Eco-Credits</div>
            <p className="text-[11px] text-slate-400 mt-2">
              Rewarded to reporting citizens for verifying infrastructure anomalies and water leaks.
            </p>
          </div>
        </div>

        {/* Eco-Corridor Vision Section */}
        <div className="glass-panel bg-slate-950/85 p-8 rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              Circular Smart City Economy
            </span>
            <h3 className="text-2xl font-display font-bold text-white mt-1">
              Join the Metro Neo-Verdia Clean City Pledge
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Every verified pothole, water line repair, and smart bin maintenance ticket directly safeguards urban biodiversity and preserves freshwater reserves.
            </p>
          </div>

          <button
            onClick={() => onNavigate('report')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald flex items-center gap-2"
          >
            <span>Report Grievance & Earn Credits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GreenFuturePage;
