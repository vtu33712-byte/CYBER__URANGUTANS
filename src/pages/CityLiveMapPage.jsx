import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import { fetchComplaints } from '../services/complaintService';
import { usePageTransition } from '../hooks/usePageTransition';
import { Layers, MapPin, AlertTriangle, ArrowRight, Crosshair, Radio } from 'lucide-react';

export const CityLiveMapPage = ({ onNavigate, isLightMode }) => {
  const pageRef = usePageTransition('city-live-map');
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const list = fetchComplaints();
    setComplaints(list);
    if (list.length > 0) {
      setSelectedComplaint(list[0]);
    }
  }, []);

  return (
    <div ref={pageRef} className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Metropolitan Geospatial HUD
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
            City Live Operations Map
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-emerald-300">
            {complaints.length} Active Nodes
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>4 Patrol Drones Telemetry</span>
          </span>
        </div>
      </div>

      {/* Main Map Container & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map Container (8.5 cols) */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl h-[620px]">
          <MapView
            complaints={complaints}
            selectedComplaint={selectedComplaint}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
            height="100%"
            isLightMode={isLightMode}
          />
        </div>

        {/* Selected Complaint Telemetry Card (3.5 cols) */}
        <div className="lg:col-span-4 glass-panel bg-slate-950/90 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between h-[620px]">
          {selectedComplaint ? (
            <div className="space-y-4 overflow-y-auto pr-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400">{selectedComplaint.trackingCode}</span>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    selectedComplaint.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                    selectedComplaint.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {selectedComplaint.priority} PRIORITY
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1 leading-snug">{selectedComplaint.title}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{selectedComplaint.address}</span>
                </p>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-video bg-black border border-slate-800">
                <img src={selectedComplaint.image} alt={selectedComplaint.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ward District:</span>
                  <span className="text-white font-semibold">{selectedComplaint.wardName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Citizen Reports:</span>
                  <span className="text-emerald-400 font-mono font-bold">{selectedComplaint.reportCount || 1} Merged</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-cyan-300 font-mono uppercase">{selectedComplaint.status.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Road Segment:</span>
                  <span className="text-slate-200 font-mono">{selectedComplaint.roadSegment}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {selectedComplaint.description}
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onNavigate('tracker', { searchCode: selectedComplaint.trackingCode })}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald flex items-center justify-center gap-1.5"
                >
                  <span>Track Full Resolution Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('complaint-details', { complaintId: selectedComplaint.id })}
                  className="w-full py-2 text-slate-300 hover:text-white rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold"
                >
                  View Complete Dossier
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 text-xs">
              Click any node marker on the GIS map to inspect live intelligence.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityLiveMapPage;
