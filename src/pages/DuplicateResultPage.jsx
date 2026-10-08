import React, { useState, useRef, useEffect } from 'react';
import { 
  GitMerge, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Bell, 
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { animateConfidenceCircle, playReportMergeAnimation, animateCheckmarksStagger } from '../animations/aiAnimations';
import { mergeReportIntoComplaint, getComplaintByTrackingCode } from '../services/complaintService';
import { usePageTransition } from '../hooks/usePageTransition';
import confetti from 'canvas-confetti';

export const DuplicateResultPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('duplicate-result');
  const [complaint, setComplaint] = useState(null);
  const [isMerged, setIsMerged] = useState(false);
  const [mergeResult, setMergeResult] = useState(null);

  const circleRef = useRef(null);
  const numberRef = useRef(null);
  const checkmarksRef = useRef(null);
  const sourceCardRef = useRef(null);
  const targetCardRef = useRef(null);
  const counterRef = useRef(null);
  const badgeRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const c = getComplaintByTrackingCode('CIV-001');
    setComplaint(c);

    setTimeout(() => {
      animateConfidenceCircle({
        circleRef: circleRef.current,
        numberRef: numberRef.current,
        targetPercent: 89,
        duration: 2000
      });

      if (checkmarksRef.current) {
        animateCheckmarksStagger(checkmarksRef.current.querySelectorAll('.explain-check'));
      }
    }, 200);
  }, []);

  const handleMergeAction = () => {
    if (!complaint || isMerged) return;

    playReportMergeAnimation({
      sourceCardRef: sourceCardRef.current,
      targetCardRef: targetCardRef.current,
      counterRef: counterRef.current,
      badgeRef: badgeRef.current,
      notificationRef: notificationRef.current,
      onComplete: () => {
        const result = mergeReportIntoComplaint(complaint.id, {
          citizenName: 'Maya Vance',
          description: 'Pothole expanded following midnight rainfall. Verified within 18m.'
        });
        setMergeResult(result);
        setIsMerged(true);
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    });
  };

  const explainableReasons = [
    { label: 'Same category', detail: 'Pothole / Road Surface' },
    { label: 'Within 50 meters', detail: '18m distance (threshold 50m)' },
    { label: 'Similar image features', detail: '87% visual edge match' },
    { label: 'Similar description', detail: '82% context keyword overlap' },
    { label: 'Same road segment', detail: 'Seg-14-AS4 (Avenue of Sovereignty)' },
    { label: 'Existing active complaint', detail: 'Master ticket CIV-001 In Progress' }
  ];

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto pt-28 pb-16 px-4">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Spatial Clustering Consensus
        </span>
        <h2 className="text-3xl font-display font-black text-white mt-1">
          AI Civic Intelligence
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Analyzing nearby civic reports within 50 meters to prevent duplicate dispatches...
        </p>
      </div>

      <div className="glass-panel bg-slate-950/85 p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl space-y-8">
        
        {/* Top Confidence Banner */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              POTENTIAL DUPLICATE FOUND
            </span>
            <h3 className="text-2xl font-display font-extrabold text-white mt-0.5">
              Duplicate Issue Detected
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Reported defect is located 18m from active master complaint CIV-001.
            </p>
          </div>

          {/* Confidence Ring */}
          <div className="flex items-center gap-4 bg-slate-900/90 px-5 py-3 rounded-2xl border border-cyan-500/30">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  ref={circleRef}
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-cyan-400"
                  fill="transparent"
                  strokeDasharray="282.74"
                  strokeDashoffset="282.74"
                  strokeLinecap="round"
                />
              </svg>
              <span ref={numberRef} className="absolute font-mono font-black text-sm text-white">
                0%
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Duplicate Confidence</div>
              <div className="text-[11px] text-cyan-400 font-mono">Distance: 18m</div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison: YOUR REPORT vs EXISTING REPORT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* Left: YOUR REPORT (Source) */}
          <div 
            ref={sourceCardRef}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 relative overflow-hidden transition-all"
          >
            <div className="text-[10px] font-mono font-bold text-cyan-400 mb-2 uppercase">
              YOUR REPORT
            </div>
            <img 
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80" 
              alt="Your submission" 
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h4 className="text-sm font-bold text-white">Severe Asphalt Cavity</h4>
            <p className="text-xs text-slate-400 mt-1">
              Deep asphalt depression causing vehicles to swerve unexpectedly.
            </p>
            <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
              <span>Category: Pothole</span>
              <span className="text-cyan-400">Ward 14</span>
            </div>
          </div>

          {/* Right: EXISTING MASTER REPORT (Target) */}
          <div 
            ref={targetCardRef}
            className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 relative overflow-hidden shadow-neon-emerald transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                EXISTING REPORT
              </span>
              <span className="text-xs font-mono font-bold text-emerald-300">
                CIV-001
              </span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80" 
              alt="Existing Master" 
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h4 className="text-sm font-bold text-white">Severe Asphalt Cavity & Pothole</h4>
            <p className="text-xs text-slate-400 mt-1">
              Large deep crater in middle lane. Asphalt cold-mix patching crew assigned.
            </p>
            
            {/* Live Reactive Metrics */}
            <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Report Count: </span>
                <span ref={counterRef} className="font-mono font-extrabold text-emerald-300 text-sm">
                  {mergeResult ? mergeResult.newCount : (complaint?.reportCount || 7)}
                </span>
              </div>
              <div>
                <span 
                  ref={badgeRef}
                  className="font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-orange-500/20 text-orange-400 border border-orange-500/40"
                >
                  {mergeResult ? mergeResult.newPriority : (complaint?.priority || 'high')}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Metric Telemetry Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">DISTANCE</div>
            <div className="text-base font-bold text-cyan-400">18m</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">IMAGE SIMILARITY</div>
            <div className="text-base font-bold text-emerald-400">87%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">DESCRIPTION SIMILARITY</div>
            <div className="text-base font-bold text-purple-400">82%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">LOCATION MATCH</div>
            <div className="text-base font-bold text-teal-400">100%</div>
          </div>
        </div>

        {/* Explainable AI */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Why did we match these reports?
          </h4>
          <div ref={checkmarksRef} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {explainableReasons.map((reason, idx) => (
              <div key={idx} className="explain-check flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold">{reason.label}</span>
                <span className="text-[11px] font-mono text-slate-500">({reason.detail})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Notification Banner Triggered by Merge */}
        {isMerged && (
          <div 
            ref={notificationRef}
            className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-400 text-emerald-200 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm">✓ Report grouped successfully</div>
                <div className="text-xs text-emerald-300">
                  Report count: {mergeResult?.previousCount || 7} → {mergeResult?.newCount || 8} • Priority: {mergeResult?.previousPriority || 'MEDIUM'} → {mergeResult?.newPriority || 'HIGH'} • Officer notification: SENT
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('tracker', { searchCode: 'CIV-001' })}
              className="px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs shadow-neon-emerald"
            >
              Track CIV-001 Progress →
            </button>
          </div>
        )}

        {/* CTA Controls */}
        {!isMerged ? (
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigate('report')}
              className="px-4 py-2.5 text-xs text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
            >
              Back to Wizard
            </button>

            <button
              onClick={handleMergeAction}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-neon-emerald hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <GitMerge className="w-4 h-4" />
              <span>Add My Report</span>
            </button>
          </div>
        ) : (
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => { setIsMerged(false); setMergeResult(null); }}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Animation Demo</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DuplicateResultPage;
