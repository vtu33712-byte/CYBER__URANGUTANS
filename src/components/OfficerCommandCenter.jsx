import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Activity, 
  CheckCircle2, 
  MapPin, 
  UserCheck, 
  Clock, 
  Radio, 
  TrendingUp, 
  Send, 
  Filter,
  Layers,
  ChevronRight,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { MapView } from './MapView';
import { fetchComplaints, updateComplaintStatus } from '../services/complaintService';
import { anime } from '../animations/animeHelper';
import { handleImageError } from '../utils/imageFallback';

export const OfficerCommandCenter = ({ onNavigate }) => {
  const [complaints, setComplaints] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [officerNotes, setOfficerNotes] = useState('');
  const queueContainerRef = useRef(null);

  useEffect(() => {
    const list = fetchComplaints();
    setComplaints(list);
    if (list.length > 0) {
      setSelectedIssue(list[0]);
    }
  }, []);

  // Compute operational statistics
  const stats = {
    critical: complaints.filter(c => c.priority === 'critical' && c.status !== 'resolved').length,
    high: complaints.filter(c => c.priority === 'high' && c.status !== 'resolved').length,
    medium: complaints.filter(c => c.priority === 'medium' && c.status !== 'resolved').length,
    active: complaints.filter(c => c.status !== 'resolved').length,
    resolvedToday: complaints.filter(c => c.status === 'resolved').length + 14
  };

  // Sort complaints by priority urgency and report count
  const sortedQueue = [...complaints].sort((a, b) => {
    const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
    const scoreA = (priorityWeight[a.priority] || 1) * 10 + (a.reportCount || 1);
    const scoreB = (priorityWeight[b.priority] || 1) * 10 + (b.reportCount || 1);
    return scoreB - scoreA;
  });

  const handleStatusChange = (newStatus) => {
    if (!selectedIssue) return;
    const updated = updateComplaintStatus(selectedIssue.id, newStatus, officerNotes);
    if (updated) {
      setSelectedIssue(updated);
      setComplaints(fetchComplaints());
      setOfficerNotes('');

      // Animate queue update with Anime.js
      if (queueContainerRef.current) {
        anime({
          targets: queueContainerRef.current.querySelectorAll('.queue-item'),
          scale: [0.98, 1],
          duration: 350,
          ease: 'outQuad'
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      
      {/* Top Operations Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Live Tactical Operations Feed
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
            CITY OPERATIONS CENTER
          </h2>
          <p className="text-xs text-slate-400">
            Real-time municipal dispatch, 50m spatial cluster telemetry, and automated crew routing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>DISPATCH SYNC: 100%</span>
          </div>
          <button
            onClick={() => onNavigate('priority-queue')}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold"
          >
            Full Queue View
          </button>
        </div>
      </div>

      {/* Top Statistics KPI Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="glass-card p-3.5 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-slate-900">
          <div className="text-[10px] font-mono text-red-400 uppercase">Critical Urgency</div>
          <div className="text-2xl font-display font-black text-white mt-0.5">{stats.critical}</div>
          <div className="text-[10px] text-slate-400">Immediate hazard</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-950/40 to-slate-900">
          <div className="text-[10px] font-mono text-orange-400 uppercase">High Priority</div>
          <div className="text-2xl font-display font-black text-white mt-0.5">{stats.high}</div>
          <div className="text-[10px] text-slate-400">Multi-citizen validated</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-950/40 to-slate-900">
          <div className="text-[10px] font-mono text-yellow-400 uppercase">Medium Priority</div>
          <div className="text-2xl font-display font-black text-white mt-0.5">{stats.medium}</div>
          <div className="text-[10px] text-slate-400">Scheduled maintenance</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-900">
          <div className="text-[10px] font-mono text-cyan-400 uppercase">Active Total</div>
          <div className="text-2xl font-display font-black text-white mt-0.5">{stats.active}</div>
          <div className="text-[10px] text-slate-400">Across 24 wards</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900 col-span-2 sm:col-span-1">
          <div className="text-[10px] font-mono text-emerald-400 uppercase">Resolved Today</div>
          <div className="text-2xl font-display font-black text-white mt-0.5">{stats.resolvedToday}</div>
          <div className="text-[10px] text-emerald-300 font-semibold">94% on-time pace</div>
        </div>
      </div>

      {/* Main 3-Column Operations Layout:
          Col 1 (Queue) | Col 2 (Map) | Col 3 (Issue Intelligence) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column (3.5 cols): Priority Queue */}
        <div className="lg:col-span-4 glass-panel bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col h-[640px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Priority Queue</span>
            <span className="text-[10px] font-mono text-slate-400">{sortedQueue.length} Issues Ranked</span>
          </div>

          <div ref={queueContainerRef} className="mt-3 flex-1 overflow-y-auto space-y-2.5 pr-1">
            {sortedQueue.map((item) => {
              const isSelected = selectedIssue?.id === item.id;
              const isCritical = item.priority === 'critical';
              const isHigh = item.priority === 'high';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedIssue(item)}
                  className={`queue-item cursor-pointer p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-neon-cyan'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        isCritical ? 'bg-red-500 animate-ping' :
                        isHigh ? 'bg-orange-500' :
                        item.priority === 'medium' ? 'bg-yellow-400' : 'bg-emerald-400'
                      }`} />
                      <span className="font-mono text-xs font-bold text-white">{item.trackingCode}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                        {item.reportCount || 1} Reports
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                        isCritical ? 'bg-red-500/20 text-red-400' :
                        isHigh ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-center mt-2">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        onError={handleImageError}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-100 truncate">{item.title}</h4>
                      <div className="mt-0.5 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="truncate">{item.wardName || `Ward ${item.wardNumber}`}</span>
                        <span className="text-cyan-400 uppercase text-[10px]">{item.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column (5 cols): Operational City Map */}
        <div className="lg:col-span-5 glass-panel bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex flex-col h-[640px]">
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              GIS Tactical Surface View
            </span>
            <span className="text-[10px] font-mono text-slate-400">Carto Dark Layer</span>
          </div>

          <div className="flex-1 rounded-xl overflow-hidden">
            <MapView
              complaints={complaints}
              selectedComplaint={selectedIssue}
              onSelectComplaint={(c) => setSelectedIssue(c)}
              height="100%"
            />
          </div>
        </div>

        {/* Right Column (3.5 cols): Issue Intelligence & Dispatch Action */}
        <div className="lg:col-span-3 glass-panel bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between h-[640px]">
          {selectedIssue ? (
            <div className="space-y-3.5 overflow-y-auto pr-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">{selectedIssue.trackingCode}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    selectedIssue.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                    selectedIssue.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {selectedIssue.priority} PRIORITY
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1 leading-snug">{selectedIssue.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedIssue.address}</p>
              </div>

              <img 
                src={selectedIssue.image} 
                alt="Site evidence" 
                onError={handleImageError}
                className="w-full h-32 object-cover rounded-xl border border-slate-800"
              />

              {/* Dossier Meta */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ward:</span>
                  <span className="text-slate-200 font-semibold">{selectedIssue.wardName} (#{selectedIssue.wardNumber})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Citizen Reports:</span>
                  <span className="text-emerald-400 font-mono font-bold">{selectedIssue.reportCount || 1} Merged</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Officer:</span>
                  <span className="text-cyan-300 font-semibold">{selectedIssue.assignedOfficer || 'Capt. Ramesh Kumar'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="text-amber-400 uppercase font-mono">{selectedIssue.status.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Notes input */}
              <div>
                <label className="text-[11px] font-mono text-slate-400">Dispatch Notes / Work Order:</label>
                <input
                  type="text"
                  placeholder="e.g. Dispatched asphalt crew #4..."
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStatusChange('in_progress')}
                    className="py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold"
                  >
                    Set In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange('resolved')}
                    className="py-2 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-bold shadow-neon-emerald"
                  >
                    Mark Resolved
                  </button>
                </div>

                <button
                  onClick={() => onNavigate('tracker', { searchCode: selectedIssue.trackingCode })}
                  className="w-full py-1.5 text-center bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-800 flex items-center justify-center gap-1"
                >
                  <span>Open Citizen Timeline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select an issue from queue or map to inspect intelligence dossier.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OfficerCommandCenter;
