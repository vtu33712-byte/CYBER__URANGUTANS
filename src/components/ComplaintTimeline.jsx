import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  FileText,
  Calendar,
  Share2,
  ExternalLink
} from 'lucide-react';
import { getComplaintByTrackingCode, fetchComplaints } from '../services/complaintService';
import { animateTimelineProgress } from '../animations/timelineAnimations';

export const ComplaintTimeline = ({ initialSearchCode = 'CIV-001' }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchCode || 'CIV-001');
  const [complaint, setComplaint] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const progressBarRef = useRef(null);
  const nodesRef = useRef(null);

  const performSearch = (code) => {
    const found = getComplaintByTrackingCode(code);
    if (found) {
      setComplaint(found);
      setNotFound(false);
    } else {
      setComplaint(null);
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (initialSearchCode) {
      setSearchQuery(initialSearchCode);
      performSearch(initialSearchCode);
    } else {
      performSearch('CIV-001');
    }
  }, [initialSearchCode]);

  // Animate progress line with Anime.js whenever complaint updates
  useEffect(() => {
    if (!complaint || !complaint.timeline) return;

    const completedCount = complaint.timeline.filter(t => t.done).length;
    const totalSteps = complaint.timeline.length;
    const progressPercent = Math.round(((completedCount - 1) / (totalSteps - 1)) * 100);

    const timer = setTimeout(() => {
      animateTimelineProgress({
        progressBarRef: progressBarRef.current,
        nodesRef: nodesRef.current ? nodesRef.current.querySelectorAll('.timeline-node') : null,
        targetProgressPercent: Math.max(10, progressPercent),
        duration: 1000
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [complaint]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Public Transparency Portal
        </span>
        <h2 className="text-3xl font-display font-black text-white mt-1">
          Track Your Complaint
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Enter your unique tracking code to view live resolution milestones, crew status, and multi-citizen validations.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-6 max-w-md mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="e.g. CIV-001, CIV-014..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-900 border border-cyan-500/30 text-sm text-white placeholder-slate-500 focus:border-cyan-400 outline-none shadow-neon-cyan"
            />
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald hover:opacity-95"
          >
            Track
          </button>
        </form>

        {/* Quick sample pills */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span>Try quick codes:</span>
          {['CIV-001', 'CIV-014', 'CIV-021', 'CIV-008'].map(code => (
            <button
              key={code}
              onClick={() => { setSearchQuery(code); performSearch(code); }}
              className="font-mono text-cyan-400 hover:underline"
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tracking Card */}
      {complaint && (
        <div className="glass-panel bg-slate-950/85 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
          
          {/* Header Summary */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-extrabold text-cyan-400">
                  {complaint.trackingCode}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                  complaint.priority === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                  complaint.priority === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                  'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                }`}>
                  {complaint.priority} PRIORITY
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{complaint.title}</h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{complaint.address}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-mono text-slate-400">MERGED CITIZENS</div>
                <div className="text-lg font-mono font-bold text-emerald-400">
                  {complaint.reportCount || 1} Reports
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-mono text-slate-400">SUPERINTENDENT</div>
                <div className="text-xs font-semibold text-cyan-300">
                  {complaint.assignedOfficer || 'Capt. Ramesh Kumar'}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section with Anime.js Animated Progress Bar */}
          <div className="py-8">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-6">
              Resolution Milestones
            </h4>

            {/* Horizontal progress bar */}
            <div className="relative mb-8">
              {/* Background Track */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full transition-all"
                  style={{ width: '0%' }}
                />
              </div>
            </div>

            {/* Stage Nodes */}
            <div ref={nodesRef} className="grid grid-cols-5 gap-2 text-center">
              {complaint.timeline && complaint.timeline.map((step, idx) => {
                return (
                  <div key={idx} className="timeline-node flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 transition-all ${
                      step.done 
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-neon-emerald' 
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}>
                      {step.done ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="font-mono text-xs">{idx + 1}</span>
                      )}
                    </div>
                    <span className={`text-xs font-bold ${step.done ? 'text-white' : 'text-slate-500'}`}>
                      {step.stage}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {step.time}
                    </span>
                    <span className="text-[9px] text-slate-500 mt-1 max-w-[100px] leading-tight hidden sm:block">
                      {step.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Intelligence / Citations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h5 className="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">
                Incident Description & Telemetry
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                {complaint.description}
              </p>
              <div className="mt-3 text-[11px] font-mono text-slate-400">
                Segment: {complaint.roadSegment} • AI Severity: {complaint.aiSeverity}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase mb-2">
                Citizen Validations ({complaint.reports ? complaint.reports.length : 1})
              </h5>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {complaint.reports && complaint.reports.map((r, idx) => (
                  <div key={idx} className="text-xs p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <div className="flex justify-between font-mono text-[10px] text-slate-400">
                      <span className="text-cyan-300 font-semibold">{r.user}</span>
                      <span>{r.time}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] mt-0.5">{r.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {notFound && (
        <div className="glass-panel p-8 rounded-3xl border border-red-500/30 text-center max-w-md mx-auto">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-white">Tracking Code Not Found</h3>
          <p className="text-xs text-slate-400 mt-1">
            No record matches "{searchQuery}". Please check the ID or try CIV-001.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComplaintTimeline;
