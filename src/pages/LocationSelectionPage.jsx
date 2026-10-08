import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';
import MapView from '../components/MapView';
import { fetchComplaints } from '../services/complaintService';
import { usePageTransition } from '../hooks/usePageTransition';

export const LocationSelectionPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('location-selection');
  const [complaints] = useState(fetchComplaints());
  const [userLocation, setUserLocation] = useState([12.97175, 77.59472]);
  const [address, setAddress] = useState('Avenue of Sovereignty, Cross-street 4, Ward 14');

  return (
    <div ref={pageRef} className="max-w-6xl mx-auto pt-28 pb-16 px-4">
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          Spatial GIS Telemetry
        </span>
        <h2 className="text-3xl font-display font-black text-white mt-1">
          Location Geocoding & Ward Geofencing
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          PostGIS evaluates geographic distance against active civic reports in the immediate 50-meter micro-cluster.
        </p>
      </div>

      <div className="glass-panel bg-slate-950/85 p-6 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <MapView
              complaints={complaints}
              userLocation={userLocation}
              showDuplicateRadius={true}
              radiusMeters={50}
              height="450px"
            />
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Target Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ward Number:</span>
                  <span className="text-white font-bold font-mono">Ward 14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Council District:</span>
                  <span className="text-cyan-300 font-semibold">Aero-Vista Tech District</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">50m Spatial Radius:</span>
                  <span className="text-emerald-400 font-bold font-mono">ACTIVE (1 Master Match)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('report')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald flex items-center justify-center gap-2"
            >
              <span>Use This Location in Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelectionPage;
