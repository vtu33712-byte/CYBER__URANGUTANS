import React from 'react';
import { Building2, Shield, Heart, Sparkles, Code2, Globe, Radio, Cpu } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 px-4 md:px-8 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center p-0.5 shadow-neon-emerald">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-wider text-white">
                  Civic<span className="text-emerald-400">Flow</span>
                </span>
                <p className="text-[10px] text-slate-400 font-mono">
                  Autonomous 3D Smart City Grievance OS
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              AI-powered civic intelligence connecting citizens, municipal officers, and real-time city operations with 50-meter spatial clustering and multi-perspective computer vision.
            </p>

            {/* Live Infrastructure Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                PostGIS Spatial Index Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                <Radio className="w-2.5 h-2.5 text-cyan-400" />
                Supabase Realtime Synchronized
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Citizen Portal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('report')} className="hover:text-cyan-300 transition-colors">
                  Report Civic Issue
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-reports')} className="hover:text-cyan-300 transition-colors">
                  My Reports Dossier
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tracker')} className="hover:text-cyan-300 transition-colors">
                  Track Complaint by ID
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-cyan-300 transition-colors">
                  City Live Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-cyan-300 transition-colors">
                  Citizen Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Operations & Command */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Municipal Bureau
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('officer')} className="hover:text-emerald-300 transition-colors">
                  Command Operations HUD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('priority-queue')} className="hover:text-emerald-300 transition-colors">
                  Dynamic Priority Queue
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analytics')} className="hover:text-emerald-300 transition-colors">
                  City Intelligence Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('wards')} className="hover:text-emerald-300 transition-colors">
                  24 Ward Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('green-future')} className="hover:text-emerald-300 transition-colors">
                  Green City Eco-Initiative
                </button>
              </li>
            </ul>
          </div>

          {/* Intelligence & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              Technology Stack
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-purple-300 transition-colors">
                  50m AI Spatial Matching
                </button>
              </li>
              <li>
                <span className="text-slate-500">Anime.js Motion Engine v4</span>
              </li>
              <li>
                <span className="text-slate-500">Three.js 3D Procedural Metropolis</span>
              </li>
              <li>
                <span className="text-slate-500">Leaflet & CartoDB Maps</span>
              </li>
              <li>
                <button onClick={() => onNavigate('notifications')} className="hover:text-purple-300 transition-colors">
                  Realtime Notifications
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            &copy; 2026 CivicFlow Technologies. Built for Smart City Hackathon Presentation.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400 font-semibold">Smarter Reports. Faster Response. Better Cities.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
