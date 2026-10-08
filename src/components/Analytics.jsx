import React from 'react';
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  GitMerge, 
  Clock, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  Leaf,
  BarChart3
} from 'lucide-react';
import { ANALYTICS_DATA, WARDS_DATA } from '../data/mockData';

export const Analytics = () => {
  const { trends, categoryBreakdown, priorityDistribution, efficiencyKPIs } = ANALYTICS_DATA;

  const wardChartData = WARDS_DATA.slice(0, 6).map(w => ({
    name: `W-${w.number}`,
    total: w.totalReports,
    resolved: w.resolved,
    rate: Math.round((w.resolved / w.totalReports) * 100)
  }));

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Executive Telemetry Dashboard
        </span>
        <h2 className="text-3xl font-display font-black text-white mt-1">
          City Intelligence
        </h2>
        <p className="text-xs text-slate-400">
          Cross-ward civic trends, multi-modal duplicate suppression rates, and infrastructure turnaround analytics.
        </p>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-cyan-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-mono">
            <span>TOTAL COMPLAINTS</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">3,421</div>
          <div className="text-xs text-cyan-400 font-semibold mt-1">
            ↑ 12% report surge detected
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-purple-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-mono">
            <span>PREVENTED DUPLICATES</span>
            <GitMerge className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">438</div>
          <div className="text-xs text-purple-400 font-semibold mt-1">
            Zero redundant work orders
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-mono">
            <span>PREVENTION RATE</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {efficiencyKPIs.duplicatePreventionRate}
          </div>
          <div className="text-xs text-emerald-400 font-semibold mt-1">
            50m PostGIS spatial accuracy
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-teal-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-mono">
            <span>AVG RESOLUTION TIME</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {efficiencyKPIs.avgResolutionHours} hrs
          </div>
          <div className="text-xs text-teal-400 font-semibold mt-1">
            Sub-5 hour turnaround target
          </div>
        </div>

      </div>

      {/* Primary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Complaints Trend (Area Chart) - 7 cols */}
        <div className="lg:col-span-7 glass-panel bg-slate-950/80 p-5 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-white">Complaints & Resolution Trend</h4>
              <p className="text-[11px] text-slate-400">Weekly intake vs resolved vs merged duplicates</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              REALTIME SYNC
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090e17', borderColor: '#06b6d4', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="reports" stroke="#06b6d4" fillOpacity={1} fill="url(#colorReports)" name="Reports In" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" name="Resolved Out" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Distribution (Donut Chart) - 5 cols */}
        <div className="lg:col-span-5 glass-panel bg-slate-950/80 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Priority Distribution</h4>
            <p className="text-[11px] text-slate-400">Current workload severity allocation</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {priorityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#090e17', borderRadius: '8px', border: '1px solid #334155' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-slate-800">
            {priorityDistribution.map((p, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span>{p.name}: <strong className="text-white">{p.count}</strong></span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Secondary Charts: Categories Breakdown and Ward Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown (Bar Chart) - 6 cols */}
        <div className="lg:col-span-6 glass-panel bg-slate-950/80 p-5 rounded-3xl border border-slate-800">
          <h4 className="text-sm font-bold text-white mb-1">Complaints by Category</h4>
          <p className="text-[11px] text-slate-400 mb-4">Volume per civic domain</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#090e17', borderColor: '#34d399', borderRadius: '12px' }} />
                <Bar dataKey="count" fill="#22d3ee" radius={[6, 6, 0, 0]}>
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-cat-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ward Resolution Rate - 6 cols */}
        <div className="lg:col-span-6 glass-panel bg-slate-950/80 p-5 rounded-3xl border border-slate-800">
          <h4 className="text-sm font-bold text-white mb-1">Ward Resolution Efficiency</h4>
          <p className="text-[11px] text-slate-400 mb-4">Percentage turnaround per district sector</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#090e17', borderColor: '#10b981', borderRadius: '12px' }} />
                <Bar dataKey="rate" fill="#10b981" radius={[6, 6, 0, 0]} name="Resolution Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Analytics;
