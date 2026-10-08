import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  User, 
  ShieldCheck, 
  GitMerge, 
  AlertTriangle,
  Share2,
  Calendar
} from 'lucide-react';
import MapView from '../components/MapView';
import { getComplaintById, getComplaintByTrackingCode, fetchComplaints } from '../services/complaintService';
import { usePageTransition } from '../hooks/usePageTransition';
import { handleImageError } from '../utils/imageFallback';

export const ComplaintDetailsPage = ({ complaintId = 'comp-001', onNavigate }) => {
  const pageRef = usePageTransition('complaint-details');
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    let item = getComplaintById(complaintId);
    if (!item) {
      item = getComplaintByTrackingCode('CIV-001');
    }
    setComplaint(item);
  }, [complaintId]);

  if (!complaint) {
    return (
      <div className="pt-32 text-center text-slate-400">
        Loading complaint intelligence...
      </div>
    );
  }

  return (
    <div ref={pageRef} className="max-w-6xl mx-auto pt-28 pb-16 px-4 space-y-6">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('my-reports')}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Reports</span>
        </button>

        <button
          onClick={() => onNavigate('tracker', { searchCode: complaint.trackingCode })}
          className="text-xs font-mono text-cyan-400 hover:underline"
        >
          Open Public Transparency Tracker →
        </button>
      </div>

      {/* Main Dossier Header Card */}
      <div className="glass-panel bg-slate-950/85 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-black text-cyan-400">
                {complaint.trackingCode}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                complaint.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                complaint.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {complaint.priority} PRIORITY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase">
                {complaint.status.replace('_', ' ')}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              {complaint.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{complaint.address}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
              <div className="text-[10px] text-slate-400">MERGED SUBMISSIONS</div>
              <div className="text-xl font-bold text-emerald-400">{complaint.reportCount || 1} Citizen Reports</div>
            </div>
          </div>
        </div>

        {/* 2 Columns: Evidence & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          
          {/* Left: Photos & Citizen Reports Log (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800">
              <img 
                src={complaint.image} 
                alt={complaint.title} 
                onError={handleImageError}
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-cyan-300">
                Verified Computer Vision Capture • 87% Surface Match
              </div>
            </div>

            {/* Merged Citizen Reports List */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase mb-3 flex items-center gap-1.5">
                <GitMerge className="w-4 h-4" />
                <span>Merged Citizen Testimonials ({complaint.reports ? complaint.reports.length : 1})</span>
              </h4>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {complaint.reports && complaint.reports.map((r, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span className="text-cyan-300 font-semibold">{r.user}</span>
                      <span>{r.time}</span>
                    </div>
                    <p className="text-slate-200 mt-1">{r.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: GIS Location & Officer Info (6 cols) */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="rounded-2xl overflow-hidden border border-slate-800 h-64">
              <MapView
                complaints={[complaint]}
                selectedComplaint={complaint}
                showDuplicateRadius={true}
                radiusMeters={50}
                height="100%"
              />
            </div>

            {/* Officer Assignment Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-cyan-400/50">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                    alt="Officer" 
                    onError={handleImageError}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Captain Ramesh Kumar</div>
                  <div className="text-[11px] text-cyan-300 font-mono">Ward 14 Tactical Superintendent</div>
                  <div className="text-[10px] text-slate-400">Badge: OFF-1402 • Status: Dispatched</div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('officer')}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30"
              >
                Ops HUD
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ComplaintDetailsPage;
