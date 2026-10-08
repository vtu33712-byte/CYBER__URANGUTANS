import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  GitMerge, 
  ArrowRight, 
  Filter,
  PlusCircle
} from 'lucide-react';
import { fetchComplaints } from '../services/complaintService';
import { usePageTransition } from '../hooks/usePageTransition';
import { handleImageError } from '../utils/imageFallback';

export const MyReportsPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('my-reports');
  const [complaints, setComplaints] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setComplaints(fetchComplaints());
  }, []);

  const filtered = complaints.filter(c => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return c.status !== 'resolved';
    if (activeFilter === 'resolved') return c.status === 'resolved';
    if (activeFilter === 'merged') return (c.reportCount || 1) > 1;
    return true;
  });

  return (
    <div ref={pageRef} className="max-w-6xl mx-auto pt-28 pb-16 px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Citizen Grievance Ledger
          </span>
          <h2 className="text-3xl font-display font-black text-white mt-1">
            My Submissions & Validations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracking all civic issues filed, AI multi-perspective merges, and on-site municipal resolutions.
          </p>
        </div>

        <button
          onClick={() => onNavigate('report')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>File New Grievance</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'active', 'merged', 'resolved'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              activeFilter === f
                ? 'bg-cyan-500 text-slate-950 shadow-neon-cyan'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {f === 'all' ? `All Reports (${complaints.length})` : f}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isMerged = (item.reportCount || 1) > 1;

          return (
            <div
              key={item.id}
              onClick={() => onNavigate('complaint-details', { complaintId: item.id })}
              className="cursor-pointer glass-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">{item.trackingCode}</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                      item.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                      item.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.priority}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    item.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-cyan-300'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex gap-3 mb-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      onError={handleImageError}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate">{item.address}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  {isMerged && <GitMerge className="w-3.5 h-3.5" />}
                  {item.reportCount || 1} Citizen Confirmations
                </span>

                <span className="text-slate-400 group-hover:text-cyan-400 flex items-center gap-1 font-semibold text-[11px]">
                  <span>View Dossier</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyReportsPage;
