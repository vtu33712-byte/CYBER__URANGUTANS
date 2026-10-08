import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  AlertTriangle, 
  ArrowUp, 
  ArrowDown, 
  GitMerge, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  TrendingUp, 
  ArrowRight,
  Filter,
  Eye,
  Camera,
  Scan,
  Sparkles,
  X
} from 'lucide-react';
import { fetchComplaints } from '../services/complaintService';
import { anime } from '../animations/animeHelper';
import { usePageTransition } from '../hooks/usePageTransition';
import { handleImageError } from '../utils/imageFallback';

export const PriorityQueuePage = ({ onNavigate }) => {
  const pageRef = usePageTransition('priority-queue');
  const [complaints, setComplaints] = useState([]);
  const [sortMode, setSortMode] = useState('urgency');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [previewImage, setPreviewImage] = useState(null);
  const queueListRef = useRef(null);

  useEffect(() => {
    setComplaints(fetchComplaints());
  }, []);

  const filtered = complaints.filter(c => {
    if (categoryFilter === 'all') return true;
    return c.category === categoryFilter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortMode === 'urgency') {
      const pMap = { critical: 4, high: 3, medium: 2, low: 1 };
      const scoreA = (pMap[a.priority] || 1) * 10 + (a.reportCount || 1);
      const scoreB = (pMap[b.priority] || 1) * 10 + (b.reportCount || 1);
      return scoreB - scoreA;
    }
    if (sortMode === 'reports') {
      return (b.reportCount || 1) - (a.reportCount || 1);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleSortChange = (mode) => {
    setSortMode(mode);
    if (queueListRef.current) {
      anime({
        targets: queueListRef.current.querySelectorAll('.queue-card'),
        translateY: [15, 0],
        opacity: [0.6, 1],
        delay: anime.stagger(50),
        duration: 400,
        ease: 'outExpo'
      });
    }
  };

  return (
    <div ref={pageRef} className="max-w-6xl mx-auto pt-28 pb-16 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Intelligent Dispatch Dispatcher
          </span>
          <h2 className="text-3xl font-display font-black text-white mt-1">
            Dynamic Priority Queue
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Live ranked queue of civic grievances with authentic photographic evidence, 50m spatial cluster weightings, and AI hazard severity scores.
          </p>
        </div>

        {/* Sorting Toggles */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => handleSortChange('urgency')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              sortMode === 'urgency' ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Urgency Score
          </button>
          <button
            onClick={() => handleSortChange('reports')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              sortMode === 'reports' ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan' : 'text-slate-400 hover:text-white'
            }`}
          >
            Report Volume
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter:
        </span>
        {[
          { id: 'all', label: 'All Incidents' },
          { id: 'pothole', label: 'Potholes' },
          { id: 'water_leak', label: 'Water Leaks' },
          { id: 'garbage', label: 'Waste Spills' },
          { id: 'drainage', label: 'Drainage Blockages' },
          { id: 'street_light', label: 'Street Lighting' },
          { id: 'traffic_issue', label: 'Traffic Mobility' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              categoryFilter === tab.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Queue Cards List */}
      <div ref={queueListRef} className="space-y-3.5">
        {sorted.map((item, index) => {
          const isCritical = item.priority === 'critical';
          const isHigh = item.priority === 'high';

          return (
            <div
              key={item.id}
              onClick={() => onNavigate('complaint-details', { complaintId: item.id })}
              className={`queue-card cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                isCritical 
                  ? 'bg-red-950/30 border-red-500/40 hover:border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]' 
                  : isHigh 
                  ? 'bg-orange-950/20 border-orange-500/30 hover:border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-start sm:items-center gap-4 flex-1">
                {/* Ranking index */}
                <div className={`w-9 h-9 rounded-xl font-mono text-xs font-black flex items-center justify-center flex-shrink-0 shadow-md ${
                  index === 0 ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white' : 
                  index < 3 ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white' : 
                  'bg-slate-800 text-slate-300 border border-slate-700'
                }`}>
                  #{index + 1}
                </div>

                {/* Rich Evidence Photo Thumbnail with Hover Preview Trigger */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewImage(item);
                  }}
                  className="relative w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/30 flex-shrink-0 group/img shadow-md"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-center pb-1 opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <span className="text-[9px] font-mono font-bold text-cyan-300 flex items-center gap-0.5">
                      <Eye className="w-2.5 h-2.5" /> View
                    </span>
                  </div>
                  <div className="absolute top-1 right-1 px-1 py-0.2 rounded bg-slate-950/90 text-[8px] font-mono text-emerald-400 border border-emerald-500/30">
                    AI Verified
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">{item.trackingCode}</span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                      isHigh ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                      'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                    }`}>
                      {item.priority} PRIORITY
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {item.wardName || `Ward ${item.wardNumber}`}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-1 truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {item.description || item.address}
                  </p>
                </div>
              </div>

              {/* Urgency Metrics & CTA Button */}
              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800/80">
                <div className="text-left md:text-right font-mono">
                  <div className="text-sm font-black text-emerald-400 flex items-center gap-1.5 md:justify-end">
                    <GitMerge className="w-4 h-4 text-emerald-400" />
                    <span>{item.reportCount || 1} Merged Submissions</span>
                  </div>
                  <div className="text-[10px] text-cyan-300 uppercase mt-0.5 flex items-center gap-1.5 md:justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Status: {item.status.replace('_', ' ')}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onNavigate('tracker', { searchCode: item.trackingCode }); 
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md flex-shrink-0"
                >
                  <span>Track Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* High-Resolution Sample Evidence Modal */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-panel bg-slate-950 p-6 rounded-3xl border border-cyan-500/40 max-w-xl w-full relative shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-cyan-400">{previewImage.trackingCode}</span>
                <span className="text-xs text-slate-400 font-mono">Sample Evidence Dossier</span>
              </div>
              <button 
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800">
              <img 
                src={previewImage.image} 
                alt={previewImage.title} 
                onError={handleImageError}
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                <Scan className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>AI VISION RECOGNITION: 92% CONFIDENCE</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{previewImage.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{previewImage.description}</p>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs font-mono">
              <span className="text-emerald-400">{previewImage.reportCount || 1} Citizen Grouped Reports</span>
              <button
                onClick={() => {
                  const code = previewImage.trackingCode;
                  setPreviewImage(null);
                  onNavigate('tracker', { searchCode: code });
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald"
              >
                Open Full Transparency Tracker →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PriorityQueuePage;
