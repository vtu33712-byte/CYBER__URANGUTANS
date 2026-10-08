/**
 * Map Configuration & Google Maps Tile Provider Service
 * Allows users to input and persist their Map API Key (e.g. AIz*****aM)
 * and seamlessly switch between CartoDB Dark, Google Satellite Hybrid,
 * Google Roadmap, and OpenStreetMap tiles.
 */

const STORAGE_KEY_MAP_API = 'civicflow_map_api_key';
const STORAGE_KEY_MAP_PROVIDER = 'civicflow_map_provider';

export const MAP_PROVIDERS = [
  {
    id: 'carto_dark',
    name: 'CartoDB Cyber Dark',
    desc: 'Futuristic high-contrast neon metropolis',
    requiresKey: false,
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
  },
  {
    id: 'google_satellite',
    name: 'Google Satellite Hybrid',
    desc: 'High-resolution photorealistic satellite with street overlays',
    requiresKey: true,
    url: (apiKey) => `https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${apiKey || ''}`,
    attribution: '&copy; Google Maps Satellite'
  },
  {
    id: 'google_roadmap',
    name: 'Google Clean Roadmap',
    desc: 'Google Maps road network & vector municipal grid',
    requiresKey: true,
    url: (apiKey) => `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey || ''}`,
    attribution: '&copy; Google Maps'
  },
  {
    id: 'carto_light',
    name: 'CartoDB Voyager Light',
    desc: 'Clean mint eco-city day vision',
    requiresKey: false,
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
  },
  {
    id: 'osm',
    name: 'OpenStreetMap Standard',
    desc: 'Community open geospatial road data',
    requiresKey: false,
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }
];

class MapConfigManager {
  constructor() {
    this.listeners = new Set();
  }

  getApiKey() {
    return (
      localStorage.getItem(STORAGE_KEY_MAP_API) ||
      import.meta.env.VITE_MAP_API_KEY ||
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
      ''
    );
  }

  setApiKey(key) {
    const trimmed = (key || '').trim();
    localStorage.setItem(STORAGE_KEY_MAP_API, trimmed);
    this.notify({ type: 'api_key_changed', apiKey: trimmed });
    return trimmed;
  }

  getActiveProviderId() {
    return localStorage.getItem(STORAGE_KEY_MAP_PROVIDER) || 'carto_dark';
  }

  setActiveProviderId(providerId) {
    localStorage.setItem(STORAGE_KEY_MAP_PROVIDER, providerId);
    this.notify({ type: 'provider_changed', providerId });
  }

  getTileUrl(providerId, isLightMode = false) {
    const apiKey = this.getApiKey();
    const targetId = providerId || this.getActiveProviderId();

    if (targetId === 'google_satellite') {
      if (apiKey) {
        return `https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&key=${apiKey}`;
      }
      // Fallback to Google public tile if key not yet entered
      return 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
    }

    if (targetId === 'google_roadmap') {
      if (apiKey) {
        return `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey}`;
      }
      return 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    }

    if (targetId === 'carto_light' || (targetId === 'carto_dark' && isLightMode)) {
      return 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    }

    if (targetId === 'osm') {
      return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }

    return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  }

  getAttribution(providerId) {
    const p = MAP_PROVIDERS.find(item => item.id === providerId);
    return p ? p.attribution : '&copy; <a href="https://carto.com/">CARTO</a>';
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event) {
    this.listeners.forEach(fn => {
      try {
        fn(event);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

export const mapConfigManager = new MapConfigManager();
export default mapConfigManager;
