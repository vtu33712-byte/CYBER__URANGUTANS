import React from 'react';
import { 
  Building2, 
  Cpu, 
  MapPin, 
  ShieldCheck, 
  GitMerge, 
  Layers, 
  Sparkles, 
  Zap, 
  Code2,
  Database
} from 'lucide-react';
import { usePageTransition } from '../hooks/usePageTransition';

export const AboutPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('about');

  return (
    <div ref={pageRef} className="max-w-5xl mx-auto pt-28 pb-16 px-4 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Platform Architecture & Vision
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white mt-1">
          Inside Civic<span className="text-emerald-400">Flow</span>
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto mt-2 leading-relaxed">
          A living digital operating system designed for the next century of autonomous smart cities, replacing fragmented civic dashboards with unified spatial intelligence.
        </p>
      </div>

      {/* 50-Meter Algorithm Mathematical Breakdown */}
      <div className="glass-panel bg-slate-950/85 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-extrabold text-white">
              The 50-Meter Spatial Duplicate Algorithm
            </h3>
            <p className="text-xs text-slate-400">
              Mathematical specification of multi-perspective civic deduplication
            </p>
          </div>
        </div>

        {/* Formula Box */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center font-mono">
          <span className="text-xs text-slate-400 uppercase block mb-1">Composite Match Formula</span>
          <div className="text-sm sm:text-lg font-bold text-cyan-300">
            Confidence = (Location × 0.40) + (Computer Vision × 0.40) + (NLP Context × 0.20)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="font-mono font-bold text-emerald-400">40% Geodesic Proximity</div>
            <p className="text-slate-300">
              Evaluated via PostGIS <code className="text-cyan-300">ST_DWithin(geom, 50m)</code>. Reports beyond 50m are rejected as potential duplicates to protect street-level fidelity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="font-mono font-bold text-cyan-400">40% Computer Vision</div>
            <p className="text-slate-300">
              Edge convolutional neural network extracts asphalt rupture contours, water pooling boundaries, and lighting grid fixtures to detect identical scene features.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="font-mono font-bold text-purple-400">20% Semantic NLP</div>
            <p className="text-slate-300">
              Natural language models compute cosine similarity between citizen incident notes to verify context alignment (e.g. "middle lane crater" matches "pothole swerve").
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div>
        <h3 className="text-xl font-display font-bold text-white mb-4">
          Engineered With Modern Hackathon Standards
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="font-mono font-bold text-cyan-400 mb-1">FRONTEND</div>
            <div className="text-sm font-bold text-white">React 18+ & Vite</div>
            <p className="text-slate-400 mt-1">Component architecture with custom reactive hooks and Tailwind CSS styling.</p>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="font-mono font-bold text-emerald-400 mb-1">MOTION ENGINE</div>
            <div className="text-sm font-bold text-white">Anime.js v4</div>
            <p className="text-slate-400 mt-1">Timeline orchestration, SVG drawing, counters, 3D card tilts, and laser scans.</p>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="font-mono font-bold text-purple-400 mb-1">3D ENVIRONMENT</div>
            <div className="text-sm font-bold text-white">Three.js WebGL</div>
            <p className="text-slate-400 mt-1">Interactive city blocks, rotating wind turbines, patrol drones, and vehicle trails.</p>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="font-mono font-bold text-teal-400 mb-1">GIS & BACKEND</div>
            <div className="text-sm font-bold text-white">Supabase + PostGIS</div>
            <p className="text-slate-400 mt-1">PostgreSQL spatial queries, Supabase Realtime, Leaflet and CartoDB dark tiles.</p>
          </div>
        </div>
      </div>

      {/* 10 Database Tables Schema Overview */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">Supabase Relational & Spatial Database Schema</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[11px]">
          {['users', 'wards', 'complaints', 'complaint_reports', 'duplicate_matches', 'status_history', 'notifications', 'officers', 'locations', 'analytics'].map(tbl => (
            <div key={tbl} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
              public.{tbl}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
