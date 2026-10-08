/**
 * Horizon sections and the 10-scene scroll story narrative
 */
export const HORIZONS = [
  {
    id: 'horizon-01',
    number: '01',
    title: 'Futuristic City Skyline',
    tagline: 'Living architectural intelligence powered by ambient sensors',
    bgGradient: 'from-slate-950 via-slate-900 to-emerald-950',
    stats: '1.2M Citizens Connected • 99.8% Sensor Coverage',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
    details: 'Autonomous towers with integrated solar micro-grids and smart rainwater retention matrices.'
  },
  {
    id: 'horizon-02',
    number: '02',
    title: 'Smart Transportation Grid',
    tagline: 'Hyper-coordinated autonomous transit and responsive road networks',
    bgGradient: 'from-slate-950 via-cyan-950 to-slate-900',
    stats: '450km Smart Transit Lanes • 0% Gridlock Stalls',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    details: 'Real-time vehicle-to-infrastructure (V2X) beacons reroute municipal emergency vehicles seamlessly.'
  },
  {
    id: 'horizon-03',
    number: '03',
    title: 'Green Energy Eco-Sovereignty',
    tagline: 'Harmonizing renewable wind arrays, solar canopies, and living bio-walls',
    bgGradient: 'from-slate-950 via-teal-950 to-emerald-950',
    stats: '74% Clean Energy Share • 14,800 Trees Maintained',
    icon: 'Leaf',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    details: 'Kinetic sidewalks and vertical urban forest towers capturing 320 tons of carbon annually.'
  },
  {
    id: 'horizon-04',
    number: '04',
    title: 'AI City Operations Core',
    tagline: '50-meter PostGIS spatial clustering with multi-modal neural verification',
    bgGradient: 'from-slate-950 via-indigo-950 to-purple-950',
    stats: '89% Duplicate Accuracy • 438 Duplicates Prevented',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    details: 'Zero redundant work orders. Automated multi-perspective computer vision eliminates municipal waste.'
  },
  {
    id: 'horizon-05',
    number: '05',
    title: 'Municipal Command Center',
    tagline: 'Real-time tactical situational awareness for ward superintendents',
    bgGradient: 'from-slate-950 via-blue-950 to-slate-900',
    stats: '24 Wards Synchronized • Sub-8 Minute Dispatch',
    icon: 'Radio',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    details: 'Interactive holographic mapping, dynamic priority queues, and instant officer-to-citizen feedback loops.'
  },
  {
    id: 'horizon-06',
    number: '06',
    title: 'Cleaner Future City',
    tagline: 'A regenerative metropolis that heals as fast as grievances occur',
    bgGradient: 'from-slate-950 via-emerald-950 to-teal-950',
    stats: '92% Satisfaction Index • Net-Zero Municipal Footprint',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    details: 'Transparent civic governance where community collaboration produces tangible urban beauty.'
  }
];

export const SCROLL_STORY_SCENES = [
  {
    id: 'scene-01',
    step: '01',
    title: 'Civic Anomalies Appear',
    summary: 'Weather, traffic wear, and infrastructure age produce thousands of daily urban issues across 24 wards.',
    icon: 'AlertTriangle',
    color: '#ef4444',
    metric: '1,200+ Daily Events',
    status: 'SURFACE DEFECTS DETECTED'
  },
  {
    id: 'scene-02',
    step: '02',
    title: 'Duplicate Reports Multiply',
    summary: 'Multiple concerned citizens photograph the same pothole or water leak from different angles.',
    icon: 'Copy',
    color: '#f59e0b',
    metric: '7-12 Reports per Incident',
    status: 'SYSTEM OVERLOAD RISK'
  },
  {
    id: 'scene-03',
    step: '03',
    title: 'AI Neural Scanning Initiates',
    summary: 'CivicFlow neural engines parse image textures, road distress features, and natural language descriptions.',
    icon: 'Eye',
    color: '#06b6d4',
    metric: '99.4% Computer Vision Accuracy',
    status: 'EDGE INFERENCE ACTIVE'
  },
  {
    id: 'scene-04',
    step: '04',
    title: '50-Meter Spatial Clusters Form',
    summary: 'PostGIS spatial indexing draws micro-geofences grouping reports within 50 meters on the same street segment.',
    icon: 'MapPin',
    color: '#3b82f6',
    metric: '50m Radius Geofence',
    status: 'GEO-TOPOLOGY SYNCHRONIZED'
  },
  {
    id: 'scene-05',
    step: '05',
    title: 'Autonomous Report Merging',
    summary: 'Secondary submissions seamlessly append to the primary issue master record instead of creating redundant tickets.',
    icon: 'GitMerge',
    color: '#8b5cf6',
    metric: '1 Single Master Ticket',
    status: 'REDUNDANCY ELIMINATED'
  },
  {
    id: 'scene-06',
    step: '06',
    title: 'Dynamic Priority Escalation',
    summary: 'With every citizen validation, priority dynamically elevates from LOW to MEDIUM to HIGH to CRITICAL.',
    icon: 'TrendingUp',
    color: '#ec4899',
    metric: 'Priority Weight: +18% per Report',
    status: 'URGENCY RECALCULATED'
  },
  {
    id: 'scene-07',
    step: '07',
    title: 'Tactical Officer Alert',
    summary: 'Ward operations officers receive a bundled dossier with multi-angle photos, exact coordinates, and required materials.',
    icon: 'BellRing',
    color: '#10b981',
    metric: '< 2 Sec Supabase Realtime Push',
    status: 'COMMAND NOTIFIED'
  },
  {
    id: 'scene-08',
    step: '08',
    title: 'Precision Crew Dispatch',
    summary: 'Repair squads are dispatched with optimal route planning, cutting transit fuel and CO2 emissions.',
    icon: 'Truck',
    color: '#14b8a6',
    metric: '35% Route Fuel Saved',
    status: 'CREW EN ROUTE'
  },
  {
    id: 'scene-09',
    step: '09',
    title: 'Rapid Municipal Resolution',
    summary: 'The defect is repaired, after-photos uploaded to Supabase Storage, and verified by AI computer vision.',
    icon: 'CheckCircle2',
    color: '#22c55e',
    metric: 'Resolved in 4.2 Hours',
    status: 'INFRASTRUCTURE RESTORED'
  },
  {
    id: 'scene-10',
    step: '10',
    title: 'A Smarter, Greener Metropolis',
    summary: 'All reporting citizens receive resolution notifications, earn eco-credits, and the city thrives sustainably.',
    icon: 'Sparkles',
    color: '#34d399',
    metric: '+50 Eco-Credits Awarded',
    status: 'COMMUNITY SATISFACTION 100%'
  }
];
