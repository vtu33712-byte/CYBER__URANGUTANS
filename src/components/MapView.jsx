import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  AlertTriangle, 
  Layers, 
  Navigation, 
  ShieldAlert, 
  CheckCircle2, 
  Eye, 
  Key, 
  Globe, 
  X,
  Sparkles
} from 'lucide-react';
import { mapConfigManager, MAP_PROVIDERS } from '../services/mapConfigService';

// Create custom pulsing SVG marker icons
const createPulsingIcon = (colorHex, isUser = false) => {
  const size = isUser ? 28 : 22;
  const pulseSize = isUser ? 44 : 36;
  
  const html = `
    <div style="position: relative; width: ${pulseSize}px; height: ${pulseSize}px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: ${pulseSize}px; height: ${pulseSize}px; border-radius: 50%; background: ${colorHex}; opacity: 0.25; animation: pulse-ring 2s infinite ease-out;"></div>
      <div style="width: ${size}px; height: ${size}px; border-radius: 50%; background: ${colorHex}; border: 2.5px solid #ffffff; box-shadow: 0 0 12px ${colorHex}; display: flex; align-items: center; justify-content: center; z-index: 2;">
        <div style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff;"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-pulsing-marker-wrapper',
    iconSize: [pulseSize, pulseSize],
    iconAnchor: [pulseSize / 2, pulseSize / 2],
    popupAnchor: [0, -pulseSize / 2]
  });
};

const MARKER_ICONS = {
  critical: createPulsingIcon('#ef4444'), // Red
  high: createPulsingIcon('#f97316'),     // Orange
  medium: createPulsingIcon('#eab308'),   // Yellow
  low: createPulsingIcon('#10b981'),      // Green
  resolved: createPulsingIcon('#3b82f6'), // Blue
  user: createPulsingIcon('#06b6d4', true) // Cyan User
};

// Component to dynamically re-center map when focused complaint changes
const MapRecenter = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 16, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
};

export const MapView = ({
  complaints = [],
  selectedComplaint = null,
  onSelectComplaint = null,
  userLocation = null,
  showDuplicateRadius = true,
  radiusMeters = 50,
  interactivePin = false,
  onPinLocation = null,
  height = '500px',
  isLightMode = false
}) => {
  const defaultCenter = [12.9716, 77.5946];
  const activeCenter = selectedComplaint 
    ? [selectedComplaint.latitude, selectedComplaint.longitude] 
    : (userLocation || defaultCenter);

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProvider, setActiveProvider] = useState(mapConfigManager.getActiveProviderId());
  const [apiKeyInput, setApiKeyInput] = useState(mapConfigManager.getApiKey());
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isLayerDropdownOpen, setIsLayerDropdownOpen] = useState(false);
  const [keySavedToast, setKeySavedToast] = useState(false);

  useEffect(() => {
    const unsub = mapConfigManager.subscribe((event) => {
      if (event.type === 'provider_changed') {
        setActiveProvider(event.providerId);
      }
      if (event.type === 'api_key_changed') {
        setApiKeyInput(event.apiKey);
      }
    });
    return () => unsub();
  }, []);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    mapConfigManager.setApiKey(apiKeyInput);
    setKeySavedToast(true);
    setTimeout(() => {
      setKeySavedToast(false);
      setIsKeyModalOpen(false);
    }, 1200);
  };

  const handleSelectProvider = (provId) => {
    mapConfigManager.setActiveProviderId(provId);
    setActiveProvider(provId);
    setIsLayerDropdownOpen(false);
  };

  const filteredComplaints = complaints.filter(c => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'critical') return c.priority === 'critical';
    if (activeFilter === 'high') return c.priority === 'high';
    if (activeFilter === 'resolved') return c.status === 'resolved';
    return true;
  });

  const currentTileUrl = mapConfigManager.getTileUrl(activeProvider, isLightMode);
  const currentAttribution = mapConfigManager.getAttribution(activeProvider);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl" style={{ height }}>
      
      {/* Map Filter Bar (Top Left) */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-wrap gap-2 pointer-events-auto">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition-all ${
            activeFilter === 'all'
              ? 'bg-cyan-500 text-slate-950 shadow-neon-cyan'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
          }`}
        >
          All ({complaints.length})
        </button>
        <button
          onClick={() => setActiveFilter('critical')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition-all ${
            activeFilter === 'critical'
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-slate-900/80 text-red-400 hover:bg-slate-800 border border-red-500/30'
          }`}
        >
          Critical
        </button>
        <button
          onClick={() => setActiveFilter('high')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition-all ${
            activeFilter === 'high'
              ? 'bg-orange-500 text-white shadow-lg'
              : 'bg-slate-900/80 text-orange-400 hover:bg-slate-800 border border-orange-500/30'
          }`}
        >
          High
        </button>
        <button
          onClick={() => setActiveFilter('resolved')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition-all ${
            activeFilter === 'resolved'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-slate-900/80 text-blue-400 hover:bg-slate-800 border border-blue-500/30'
          }`}
        >
          Resolved
        </button>
      </div>

      {/* Layer Controls & Map API Key Toolbar (Top Right) */}
      <div className="absolute top-4 right-4 z-[1000] flex items-center gap-2 pointer-events-auto">
        {/* Layer Selector */}
        <div className="relative">
          <button
            onClick={() => setIsLayerDropdownOpen(!isLayerDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono font-semibold text-cyan-300 shadow-lg"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="capitalize">{activeProvider.replace('_', ' ')}</span>
          </button>

          {isLayerDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-950/95 border border-cyan-500/30 shadow-2xl p-1.5 text-xs z-50">
              <div className="px-2 py-1 text-[10px] text-slate-400 font-mono uppercase">Map Tile Layer</div>
              {MAP_PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectProvider(p.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    activeProvider === p.id 
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <div>{p.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{p.desc}</div>
                  </div>
                  {p.requiresKey && (
                    <span className="text-[9px] font-mono px-1 rounded bg-amber-500/20 text-amber-300">
                      KEY
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map API Key Configuration Button */}
        <button
          onClick={() => setIsKeyModalOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg backdrop-blur-md border text-xs font-mono font-semibold transition-all shadow-lg ${
            apiKeyInput 
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' 
              : 'bg-slate-900/85 border-amber-500/40 text-amber-300 hover:border-amber-400'
          }`}
          title="Configure Map API Key (AIz*****aM)"
        >
          <Key className="w-3.5 h-3.5" />
          <span>{apiKeyInput ? 'API KEY ACTIVE' : 'SET MAP API KEY'}</span>
        </button>
      </div>

      {/* API Key Modal Popup */}
      {isKeyModalOpen && (
        <div className="absolute inset-0 z-[1100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto">
          <div className="max-w-md w-full glass-panel bg-slate-950/95 p-6 rounded-2xl border border-cyan-500/40 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">Google Maps / Map Tile API Key</h3>
                  <span className="text-[10px] font-mono text-cyan-400">INPUT KEY: AIz*****aM</span>
                </div>
              </div>
              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveApiKey} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Google Maps API Key (Starts with <code className="text-cyan-300 font-bold">AIz...</code>)
                </label>
                <input
                  type="text"
                  placeholder="AIzaSy..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono outline-none focus:border-cyan-400"
                />
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Provides access to Google Satellite Hybrid imagery, high-res aerial views, and clean vector roadmaps.
                </p>
              </div>

              {keySavedToast && (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-400 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Map API Key saved! Activating high-res tile layer...</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleSelectProvider('google_satellite');
                    mapConfigManager.setApiKey(apiKeyInput || 'AIz_DEMO_KEY');
                    setIsKeyModalOpen(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-semibold border border-slate-700"
                >
                  Enable Satellite Mode
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-xs shadow-neon-emerald"
                >
                  Save & Apply Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-slate-950/85 backdrop-blur-md border border-cyan-500/25 p-3 rounded-xl text-xs space-y-1.5 pointer-events-auto">
        <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 mb-1 flex items-center justify-between">
          <span>Telemetry Layer: {activeProvider.replace('_', ' ').toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span> Critical Priority
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> High Priority
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Medium Priority
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> 50m Duplicate Radius
        </div>
      </div>

      <MapContainer
        key={`${activeProvider}-${currentTileUrl}`}
        center={activeCenter}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapRecenter center={activeCenter} zoom={selectedComplaint ? 17 : 15} />

        {/* Dynamic Tile Layer (CartoDB, Google Satellite Hybrid with API Key, Google Roadmap) */}
        <TileLayer
          attribution={currentAttribution}
          url={currentTileUrl}
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={MARKER_ICONS.user}>
            <Popup>
              <div className="p-1 font-sans">
                <div className="text-xs font-bold text-cyan-400">YOUR LOCATION</div>
                <div className="text-[11px] text-slate-300">Citizen GPS Accuracy: ± 2.4m</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* 50-meter Duplicate Detection Radius Circle */}
        {showDuplicateRadius && (userLocation || selectedComplaint) && (
          <Circle
            center={userLocation || [selectedComplaint.latitude, selectedComplaint.longitude]}
            radius={radiusMeters}
            pathOptions={{
              color: '#06b6d4',
              fillColor: '#06b6d4',
              fillOpacity: 0.15,
              weight: 2,
              dashArray: '4, 8'
            }}
          />
        )}

        {/* Complaints Markers */}
        {filteredComplaints.map((c) => {
          const iconKey = c.status === 'resolved' ? 'resolved' : (c.priority || 'medium');
          const markerIcon = MARKER_ICONS[iconKey] || MARKER_ICONS.medium;

          return (
            <Marker
              key={c.id}
              position={[c.latitude, c.longitude]}
              icon={markerIcon}
              eventHandlers={{
                click: () => {
                  if (onSelectComplaint) onSelectComplaint(c);
                }
              }}
            >
              <Popup>
                <div className="min-w-[220px] font-sans p-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-cyan-400">{c.trackingCode}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      c.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                      c.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {c.priority}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100 leading-snug mb-1">{c.title}</h4>
                  <p className="text-xs text-slate-400 mb-2">{c.address}</p>
                  
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700/60">
                    <span className="text-emerald-400 font-semibold">{c.reportCount || 1} Citizen Reports</span>
                    <span className="text-cyan-400 uppercase text-[10px]">{c.status.replace('_', ' ')}</span>
                  </div>

                  {onSelectComplaint && (
                    <button
                      onClick={() => onSelectComplaint(c)}
                      className="mt-2.5 w-full py-1 text-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded text-xs font-medium border border-cyan-500/40"
                    >
                      View Intelligence Dossier
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
