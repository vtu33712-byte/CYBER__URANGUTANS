import React, { useState } from 'react';
import { Cpu, CheckCircle2, RefreshCw, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import useAIAnimation from '../hooks/useAIAnimation';
import { usePageTransition } from '../hooks/usePageTransition';

export const AIVerificationPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('ai-verification');
  const [isActive, setIsActive] = useState(true);

  const { steps, currentStepIndex, progressPercent, completedSteps, isDone } = useAIAnimation(
    isActive,
    () => console.log('AI pipeline finished')
  );

  return (
    <div ref={pageRef} className="max-w-3xl mx-auto pt-28 pb-16 px-4">
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Autonomous Neural Engine
        </span>
        <h2 className="text-3xl font-display font-black text-white mt-1">
          AI Civic Intelligence Pipeline
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Six sequential verification phases validate spatial closeness, visual consistency, and priority escalation weights.
        </p>
      </div>

      <div className="glass-panel bg-slate-950/85 p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Pipeline Execution</h4>
              <span className="text-[10px] font-mono text-cyan-300">
                {isDone ? 'CONSENSUS REACHED' : 'PROCESSING STAGES'}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-mono font-black text-emerald-400">{progressPercent}%</span>
          </div>
        </div>

        {/* Progress Track */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-6">
          <div 
            className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step List */}
        <div className="space-y-3">
          {steps.map((st, idx) => {
            const isCompleted = completedSteps.includes(st.id);
            const isCurrent = currentStepIndex === idx;

            return (
              <div
                key={st.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                  isCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : isCurrent
                    ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-neon-cyan'
                    : 'bg-slate-900/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : isCurrent ? (
                    <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-700 flex-shrink-0" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-white">{st.title}</div>
                    <div className="text-[11px] text-slate-400">{st.desc}</div>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase">
                  {isCompleted ? 'VERIFIED' : isCurrent ? 'RUNNING' : 'QUEUED'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => { setIsActive(false); setTimeout(() => setIsActive(true), 100); }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restart Pipeline</span>
          </button>

          <button
            onClick={() => onNavigate('duplicate-demo')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald flex items-center gap-1.5"
          >
            <span>View Duplicate Result Screen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIVerificationPage;
