import React from 'react';
import { Home, PlusCircle, MapPin, Search, User, Bell, Activity } from 'lucide-react';

export const MobileBottomNav = ({ activePage, onNavigate, notificationsCount = 0 }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[990] bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-semibold transition-colors ${
            activePage === 'home' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        {/* Map */}
        <button
          onClick={() => onNavigate('map')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-semibold transition-colors ${
            activePage === 'map' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Map</span>
        </button>

        {/* Big Report Button (Center) */}
        <button
          onClick={() => onNavigate('report')}
          className="flex flex-col items-center -mt-5 p-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 shadow-neon-emerald"
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-[9px] font-extrabold uppercase mt-0.5">Report</span>
        </button>

        {/* Track */}
        <button
          onClick={() => onNavigate('tracker')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-semibold transition-colors ${
            activePage === 'tracker' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Track</span>
        </button>

        {/* Operations / Queue */}
        <button
          onClick={() => onNavigate('officer')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-semibold transition-colors ${
            activePage === 'officer' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Command</span>
        </button>

      </div>
    </div>
  );
};

export default MobileBottomNav;
