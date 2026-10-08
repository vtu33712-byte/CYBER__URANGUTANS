import React, { useState } from 'react';
import { Building2, ShieldCheck, Leaf, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';
import { WARDS_DATA } from '../data/mockData';
import { usePageTransition } from '../hooks/usePageTransition';

export const WardManagementPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('ward-management');
  const [selectedWard, setSelectedWard] = useState(WARDS_DATA[0]);

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto pt-28 pb-16 px-4 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Municipal Governance Directory
        </span>
        <h2 className="text-3xl font-display font-black text-white mt-1">
          24 Ward Operations Grid
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Inspect district health indices, allocated infrastructure capital, eco scores, and superintendent coverage.
        </p>
      </div>

      {/* Grid of Wards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {WARDS_DATA.map((w) => {
          const isSelected = selectedWard.id === w.id;

          return (
            <div
              key={w.id}
              onClick={() => setSelectedWard(w)}
              className={`cursor-pointer glass-card p-5 rounded-2xl border transition-all ${
                isSelected 
                  ? 'bg-cyan-950/70 border-cyan-400 shadow-neon-cyan' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                  WARD {w.number}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {w.healthIndex}% Health
                </span>
              </div>

              <h3 className="text-sm font-bold text-white truncate">{w.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-cyan-400" />
                <span>{w.councilor}</span>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Reports:</span>
                  <span className="text-white font-bold">{w.resolved} / {w.totalReports}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Budget:</span>
                  <span className="text-emerald-300">{w.budget}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Ward Inspection Card */}
      {selectedWard && (
        <div className="glass-panel bg-slate-950/85 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                Focused District Inspection
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Ward {selectedWard.number}: {selectedWard.name}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('map')}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30"
            >
              Zoom on Tactical Map
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center font-mono">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">SUPERINTENDENT</div>
              <div className="text-sm font-bold text-white mt-1">{selectedWard.councilor}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">HEALTH INDEX</div>
              <div className="text-sm font-bold text-emerald-400 mt-1">{selectedWard.healthIndex}%</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">ECO-CORRIDOR SCORE</div>
              <div className="text-sm font-bold text-teal-400 mt-1">{selectedWard.ecoScore}%</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">CRITICAL DEFECTS</div>
              <div className="text-sm font-bold text-orange-400 mt-1">{selectedWard.activeCritical} Active</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WardManagementPage;
