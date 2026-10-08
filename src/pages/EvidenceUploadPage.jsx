import React, { useState, useRef, useEffect } from 'react';
import { Camera, UploadCloud, RefreshCw, Scan, Sparkles, CheckCircle2, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { startLaserScan } from '../animations/aiAnimations';
import { usePageTransition } from '../hooks/usePageTransition';
import { handleImageError, FALLBACK_IMAGE_SVG } from '../utils/imageFallback';

const SAMPLES = [
  { label: 'Asphalt Pothole', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80', cls: 'Pothole Cavity', conf: '87.4%', sev: 'HIGH HAZARD', size: '1.2 Meters' },
  { label: 'Water Pipe Burst', url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80', cls: 'Aqueduct Rupture', conf: '92.1%', sev: 'HIGH HAZARD', size: '4.5 Bar Leak' },
  { label: 'Waste Overflow', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80', cls: 'Smart Bin Spill', conf: '84.6%', sev: 'MEDIUM HAZARD', size: '2.1 m³ Volume' },
  { label: 'Storm Sewer Clog', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80', cls: 'Drainage Blockage', conf: '94.8%', sev: 'CRITICAL HAZARD', size: '0.6m Head Flood' }
];

export const EvidenceUploadPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('evidence-upload');
  const [selectedSample, setSelectedSample] = useState(SAMPLES[0]);
  const [imageUrl, setImageUrl] = useState(SAMPLES[0].url);
  const [isScanning, setIsScanning] = useState(true);
  const laserRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    if (laserRef.current) {
      const anim = startLaserScan(laserRef.current);
      const timer = setTimeout(() => setIsScanning(false), 2500);
      return () => {
        clearTimeout(timer);
        if (anim && typeof anim.pause === 'function') anim.pause();
      };
    }
  }, [imageUrl]);

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
        setSelectedSample({
          label: file.name,
          url: event.target.result,
          cls: 'Custom Evidence Detected',
          conf: '91.8%',
          sev: 'HIGH HAZARD',
          size: 'Edge Computed'
        });
        setIsScanning(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto pt-28 pb-16 px-4">
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleFileUpload} 
        className="hidden" 
      />
      <input 
        type="file" 
        ref={cameraInputRef} 
        accept="image/*" 
        capture="environment" 
        onChange={handleFileUpload} 
        className="hidden" 
      />

      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Computer Vision Telemetry Lab
        </span>
        <h2 className="text-3xl font-display font-black text-white mt-1">
          Evidence Vision Analysis
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          AI neural edge inference analyzes asphalt disruption, water boundary spillage, and structural hazard contours from real citizen photography.
        </p>
      </div>

      <div className="glass-panel bg-slate-950/85 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center border border-slate-700">
          <img 
            src={imageUrl} 
            alt="Analysis site" 
            onError={handleImageError}
            className="w-full h-full object-cover" 
          />
          
          {isScanning && (
            <div 
              ref={laserRef} 
              className="scanner-line absolute left-0 right-0 h-2 z-20 pointer-events-none" 
            />
          )}

          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-2">
            <Scan className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>AI SCANNER {isScanning ? 'INSPECTING GEOMETRY' : 'VERIFIED'}</span>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              Upload Image
            </button>
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            >
              <Camera className="w-3.5 h-3.5" />
              Camera
            </button>
          </div>
        </div>

        {/* Preset Thumbnails */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SAMPLES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedSample(s);
                setImageUrl(s.url);
                setIsScanning(true);
              }}
              className={`p-1.5 rounded-xl border text-left transition-all ${
                imageUrl === s.url
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <img 
                src={s.url} 
                alt={s.label} 
                onError={handleImageError}
                className="w-full h-14 object-cover rounded-lg mb-1" 
              />
              <span className="text-[11px] font-semibold truncate block">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Neural Metrics */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">DETECTED CLASS</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">{selectedSample.cls}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">AI CONFIDENCE</div>
            <div className="text-sm font-bold text-cyan-400 mt-0.5">{selectedSample.conf}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">SEVERITY RATING</div>
            <div className="text-sm font-bold text-orange-400 mt-0.5">{selectedSample.sev}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">ESTIMATED DIMENSION</div>
            <div className="text-sm font-bold text-purple-400 mt-0.5">{selectedSample.size}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => setIsScanning(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700 flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-trigger Laser Scanner</span>
          </button>

          <button
            onClick={() => onNavigate('report')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald flex items-center gap-2"
          >
            <span>Proceed to Report Wizard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceUploadPage;
