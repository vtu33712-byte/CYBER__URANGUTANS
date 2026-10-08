import React, { useState } from 'react';
import { 
  Building2, 
  KeyRound, 
  Mail, 
  Fingerprint, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Lock,
  Sparkles
} from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { usePageTransition } from '../hooks/usePageTransition';

export const LoginPage = ({ onNavigate, onLoginSuccess }) => {
  const pageRef = usePageTransition('login');
  const [isRegister, setIsRegister] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('citizen');
  const [email, setEmail] = useState('maya.vance@civicflow.io');
  const [password, setPassword] = useState('••••••••••••');

  const handlePersonaSelect = (char) => {
    setSelectedPersona(char.id);
    setEmail(`${char.id}@civicflow.io`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(selectedPersona);
    }
    if (selectedPersona === 'officer') {
      onNavigate('officer');
    } else {
      onNavigate('dashboard');
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full glass-panel bg-slate-950/90 p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 mx-auto flex items-center justify-center p-0.5 shadow-neon-emerald mb-3">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-display font-black text-white">
            Civic<span className="text-emerald-400">Flow</span> Auth
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            SECURE URBAN TELEMETRY ACCESS
          </p>
        </div>

        {/* Quick Persona Fast-Login Buttons */}
        <div className="mb-6">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-2">
            One-Click Quick Persona:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {CHARACTERS.slice(0, 3).map((char) => (
              <button
                key={char.id}
                type="button"
                onClick={() => handlePersonaSelect(char)}
                className={`p-2 rounded-xl border text-center transition-all ${
                  selectedPersona === char.id
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-neon-cyan'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden mx-auto mb-1 border border-slate-700">
                  <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-[11px] font-bold text-white truncate">{char.name.split(' ')[0]}</div>
                <div className="text-[9px] font-mono text-emerald-400 uppercase">{char.role.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Municipal Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-xs text-white outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Encrypted Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 text-xs text-white outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald hover:opacity-95 flex items-center justify-center gap-2 mt-2"
          >
            <span>{isRegister ? 'Register Identity' : 'Authenticate & Enter City'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 font-semibold flex items-center justify-center gap-2"
          >
            <Fingerprint className="w-4 h-4 text-cyan-400" />
            <span>Passkey / WebAuthn Biometric</span>
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-cyan-400 hover:underline"
          >
            {isRegister ? 'Already registered? Sign in' : "Need a citizen account? Register here"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
