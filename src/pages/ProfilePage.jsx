import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Moon, 
  Sun, 
  Database, 
  ShieldCheck, 
  Bell, 
  Sliders, 
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { mockStore, isRealSupabaseConfigured } from '../supabase/supabaseClient';
import { usePageTransition } from '../hooks/usePageTransition';

export const ProfilePage = ({
  currentUserRole,
  onSwitchUserRole,
  isLightMode,
  onToggleTheme
}) => {
  const pageRef = usePageTransition('profile');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState(
    localStorage.getItem('civicflow_supabase_url') ||
    import.meta.env.VITE_SUPABASE_URL ||
    'https://vibecoding-civicflow.supabase.co'
  );
  const [supabaseKey, setSupabaseKey] = useState(
    localStorage.getItem('civicflow_supabase_key') ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    'sb_publishable_7lRSsVFYZpn0zej4ZuIqBQ_7z8Uy6fH'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeChar = CHARACTERS.find(c => c.id === currentUserRole) || CHARACTERS[0];

  const handleSaveConfig = (e) => {
    e.preventDefault();
    localStorage.setItem('civicflow_supabase_url', supabaseUrl.trim());
    localStorage.setItem('civicflow_supabase_key', supabaseKey.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetData = () => {
    if (confirm('Reset simulated complaints and alerts back to initial defaults?')) {
      mockStore.resetToDefault();
      alert('Local civic data reset successfully!');
    }
  };

  return (
    <div ref={pageRef} className="max-w-4xl mx-auto pt-28 pb-16 px-4 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Persona & System Settings
        </span>
        <h2 className="text-3xl font-display font-black text-white mt-1">
          Profile & Preferences
        </h2>
      </div>

      {/* Active Persona Banner */}
      <div className="glass-panel bg-slate-950/85 p-6 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl flex flex-wrap items-center gap-6">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/60 p-0.5 shadow-neon-cyan flex-shrink-0">
          <img src={activeChar.avatar} alt={activeChar.name} className="w-full h-full object-cover rounded-[14px]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">{activeChar.name}</h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase" style={{ backgroundColor: `${activeChar.color}25`, color: activeChar.color }}>
              {activeChar.badge}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5 font-semibold">{activeChar.title}</p>
          <p className="text-xs text-slate-400 mt-1 italic font-light">"{activeChar.quote}"</p>
        </div>
      </div>

      {/* Role Switcher Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">
          Switch Simulated Persona:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CHARACTERS.map((char) => (
            <button
              key={char.id}
              onClick={() => onSwitchUserRole(char.id)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                currentUserRole === char.id
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-neon-cyan scale-105'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden mx-auto mb-1.5 border border-slate-700">
                <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs font-bold text-white truncate">{char.name.split(' ')[0]}</div>
              <div className="text-[10px] text-slate-400 font-mono truncate">{char.role.split(' ')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Preferences & System Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Visual & Accessibility */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>Display & Accessibility</span>
          </h4>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Visual Theme</div>
              <div className="text-[11px] text-slate-400">{isLightMode ? 'Mint Light Mode' : 'Cyber Navy Dark Mode'}</div>
            </div>
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Reduced Motion Mode</div>
              <div className="text-[11px] text-slate-400">Restricts 3D camera pan & heavy tweens</div>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-400"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Local Simulation Store</div>
              <div className="text-[11px] text-slate-400">Reset test grievances to defaults</div>
            </div>
            <button
              onClick={handleResetData}
              className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-semibold hover:bg-red-500/30 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Supabase Backend Connectivity */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Supabase Connection</span>
            </h4>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              isRealSupabaseConfigured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-300'
            }`}>
              {isRealSupabaseConfigured ? 'CONNECTED' : 'LOCAL EMULATOR'}
            </span>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-3">
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">VITE_SUPABASE_URL</label>
              <input
                type="text"
                placeholder="https://xyzcompany.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">VITE_SUPABASE_ANON_KEY</label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono text-emerald-400 block">
                  MAP API KEY (Google Maps / Satellite)
                </label>
                <span className="text-[10px] font-mono text-cyan-300">AIz*****aM</span>
              </div>
              <input
                type="text"
                placeholder="AIzaSy..."
                value={localStorage.getItem('civicflow_map_api_key') || ''}
                onChange={(e) => localStorage.setItem('civicflow_map_api_key', e.target.value.trim())}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-emerald-400 font-mono"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Enables high-resolution Google Satellite Hybrid & Roadmap tiles across all live maps.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald flex items-center justify-center gap-1.5"
            >
              {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : null}
              <span>{savedSuccess ? 'Settings Updated!' : 'Save Credentials'}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
