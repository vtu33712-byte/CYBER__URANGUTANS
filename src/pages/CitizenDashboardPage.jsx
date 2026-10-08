import React, { useState, useEffect } from 'react';
import { 
  User, 
  Award, 
  Leaf, 
  PlusCircle, 
  Search, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  GitMerge, 
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { fetchComplaints } from '../services/complaintService';
import { usePageTransition } from '../hooks/usePageTransition';

export const CitizenDashboardPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('citizen-dashboard');
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    setComplaints(fetchComplaints());
  }, []);

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto pt-28 pb-16 px-4 space-y-8">
      
      {/* Citizen Profile Banner */}
      <div className="glass-panel bg-slate-950/85 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-400 p-0.5 shadow-neon-emerald">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                alt="Maya Vance" 
                className="w-full h-full object-cover rounded-[14px]"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-display font-black text-white">Maya Vance</h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  LVL 4 CIVIC SENTINEL
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Ward 14 (Aero-Vista Tech District) • Sensor Contributor
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs font-mono">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" /> 820 Eco-Credits
                </span>
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <GitMerge className="w-3.5 h-3.5" /> 19 Duplicates Grouped
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('report')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Grievance</span>
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="px-5 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-semibold text-xs hover:bg-slate-800"
            >
              City Map
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Health Index + Badges + Active Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (4 cols): Neighborhood Health & Eco Badges */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Ward 14 Health Index Card */}
          <div className="glass-card p-5 rounded-3xl border border-emerald-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Ward 14 Health Index
              </span>
              <span className="text-xs font-mono font-bold text-white">92.4 / 100</span>
            </div>
            
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full w-[92.4%] rounded-full"></div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Pothole Repair Speed:</span>
                <span className="text-emerald-400 font-mono font-bold">4.2 hrs avg</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Clean Water Index:</span>
                <span className="text-cyan-400 font-mono font-bold">98.1%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Streetlight Illumination:</span>
                <span className="text-teal-400 font-mono font-bold">99.4%</span>
              </div>
            </div>
          </div>

          {/* Eco-Badges Card */}
          <div className="glass-card p-5 rounded-3xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">
              Earned Civic Badges
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center gap-2 text-emerald-300">
                <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-[11px]">50m Scout</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center gap-2 text-cyan-300">
                <Leaf className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="font-semibold text-[11px]">Eco Champion</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center gap-2 text-purple-300">
                <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="font-semibold text-[11px]">AI Visionary</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/30 flex items-center gap-2 text-teal-300">
                <TrendingUp className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="font-semibold text-[11px]">Top Sentinel</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (8 cols): My Recent Submitted Grievances */}
        <div className="lg:col-span-8 glass-panel bg-slate-950/80 p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Your Grievance Dossier</h3>
              <p className="text-xs text-slate-400">Reports filed or validated by your profile</p>
            </div>
            <button
              onClick={() => onNavigate('my-reports')}
              className="text-xs font-semibold text-cyan-400 hover:underline"
            >
              View Full History →
            </button>
          </div>

          <div className="space-y-3">
            {complaints.slice(0, 4).map((c) => (
              <div
                key={c.id}
                onClick={() => onNavigate('tracker', { searchCode: c.trackingCode })}
                className="cursor-pointer p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">{c.trackingCode}</span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                        c.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                        c.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {c.priority}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-0.5 truncate max-w-sm sm:max-w-md">{c.title}</h4>
                    <p className="text-xs text-slate-400">{c.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">
                      {c.reportCount || 1} Citizen Reports
                    </div>
                    <div className="text-xs text-cyan-300 font-semibold uppercase mt-0.5">
                      {c.status.replace('_', ' ')}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default CitizenDashboardPage;
