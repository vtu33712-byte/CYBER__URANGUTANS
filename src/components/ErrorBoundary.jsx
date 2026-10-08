import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CivicFlow ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#home';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-panel bg-slate-900/90 border border-red-500/40 rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-400 mx-auto flex items-center justify-center mb-4">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>

            <h2 className="text-xl font-display font-extrabold text-white">
              Civic Telemetry Interrupt
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              A temporary render exception occurred. The system self-recovery routine is ready to restore your session.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-red-300 text-left overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restore CivicFlow Interface</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
