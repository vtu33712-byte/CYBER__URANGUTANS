import React from 'react';
import { Shield, Sparkles, Quote, Award, Terminal } from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { apply3DTilt, reset3DTilt } from '../animations/cardAnimations';

export const CharacterRoster = ({ onSelectCharacter }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Civic Ecosystem Personas
        </span>
        <h2 className="text-3xl font-display font-black text-white mt-1">
          The Guardians of CivicFlow
        </h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto mt-1">
          Bridging grassroots citizen vigilance, autonomous AI engineering, and municipal tactical response.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {CHARACTERS.map((char) => {
          return (
            <div
              key={char.id}
              onMouseMove={(e) => apply3DTilt(e.currentTarget, e, 6)}
              onMouseLeave={(e) => reset3DTilt(e.currentTarget)}
              className="glass-card rounded-2xl p-4 border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
                style={{ backgroundColor: char.color }}
              />

              <div>
                {/* Avatar with Glow Badge */}
                <div className="relative mb-3.5">
                  <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                    <img 
                      src={char.avatar} 
                      alt={char.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <span 
                    className="absolute bottom-2 left-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md uppercase border"
                    style={{ color: char.color, borderColor: `${char.color}60` }}
                  >
                    {char.badge}
                  </span>
                </div>

                {/* Identity */}
                <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {char.name}
                </h3>
                <div className="text-xs font-semibold text-emerald-400 mt-0.5">{char.role}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{char.title}</div>

                {/* Quote */}
                <p className="text-[11px] text-slate-300 italic mt-3 line-clamp-3 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                  "{char.quote}"
                </p>
              </div>

              {/* Stats Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1 text-[10px] font-mono">
                {Object.entries(char.stats).map(([k, val]) => (
                  <div key={k} className="flex justify-between text-slate-400">
                    <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-white font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterRoster;
