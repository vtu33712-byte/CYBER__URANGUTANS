/**
 * Comprehensive Mock Data for CivicFlow
 */

export const INITIAL_CITY_STATS = {
  issuesResolved: 1248,
  reportsProcessed: 3421,
  duplicatesGrouped: 438,
  responseEfficiency: 92,
  activeOfficers: 64,
  greenScore: 94.2,
  co2SavedTons: 38.6
};

export const ISSUE_CATEGORIES = [
  {
    id: 'pothole',
    name: 'Pothole',
    icon: 'AlertOctagon',
    color: '#ef4444',
    badge: 'CRITICAL HAZARD',
    description: 'Road surface craters, asphalt subsidence, tire damage hazards',
    defaultSeverity: 'HIGH'
  },
  {
    id: 'road_damage',
    name: 'Road Damage',
    icon: 'Compass',
    color: '#f97316',
    badge: 'INFRASTRUCTURE',
    description: 'Fissures, broken curbing, missing manhole covers, speed breaker damage',
    defaultSeverity: 'HIGH'
  },
  {
    id: 'garbage',
    name: 'Garbage & Waste',
    icon: 'Trash2',
    color: '#eab308',
    badge: 'SANITATION',
    description: 'Overflowing smart bins, illegal dumping, hazardous waste spills',
    defaultSeverity: 'MEDIUM'
  },
  {
    id: 'water_leak',
    name: 'Water Leak',
    icon: 'Droplets',
    color: '#06b6d4',
    badge: 'RESOURCE LOSS',
    description: 'Main pipe burst, drinking water wastage, storm drainage backflow',
    defaultSeverity: 'HIGH'
  },
  {
    id: 'street_light',
    name: 'Street Light',
    icon: 'Sun',
    color: '#3b82f6',
    badge: 'SAFETY & VISIBILITY',
    description: 'Flickering luminary, dark pedestrian zone, solar pole blackout',
    defaultSeverity: 'MEDIUM'
  },
  {
    id: 'drainage',
    name: 'Drainage & Sewage',
    icon: 'Waves',
    color: '#10b981',
    badge: 'FLOOD DEFENSE',
    description: 'Blocked monsoon drain, odor leak, standing flood water',
    defaultSeverity: 'CRITICAL'
  },
  {
    id: 'traffic_issue',
    name: 'Traffic Issue',
    icon: 'Car',
    color: '#8b5cf6',
    badge: 'MOBILITY',
    description: 'Dysfunctional AI traffic signal, sign obstruction, gridlock jam',
    defaultSeverity: 'HIGH'
  },
  {
    id: 'other',
    name: 'Other Civic Defect',
    icon: 'HelpCircle',
    color: '#64748b',
    badge: 'MUNICIPAL',
    description: 'Park vandalization, noise pollution, fallen tree branches',
    defaultSeverity: 'LOW'
  }
];

export const INITIAL_COMPLAINTS = [
  {
    id: 'comp-001',
    trackingCode: 'CIV-001',
    title: 'Severe Asphalt Cavity & Pothole',
    category: 'pothole',
    status: 'in_progress',
    priority: 'high',
    reportCount: 7,
    latitude: 12.9716,
    longitude: 77.5946,
    address: 'Avenue of Sovereignty, Cross-street 4, Ward 14',
    wardNumber: 14,
    wardName: 'Aero-Vista Tech District',
    assignedOfficer: 'Captain Ramesh Kumar',
    officerBadge: 'OFF-1402',
    aiSeverity: 'HIGH',
    roadSegment: 'Seg-14-AS4',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    description: 'Large deep crater in the middle lane causing abrupt braking and scooter accidents during rain.',
    createdAt: '2026-10-06T09:15:00Z',
    updatedAt: '2026-10-08T08:30:00Z',
    reports: [
      { id: 'rep-1', user: 'Maya Vance', time: '2 days ago', note: 'Almost damaged front suspension this morning.' },
      { id: 'rep-2', user: 'Vikram Seth', time: '1 day ago', note: 'Water fills inside crater during rain, invisible hazard.' },
      { id: 'rep-3', user: 'Ananya Roy', time: '20 hours ago', note: 'Multiple two-wheelers slipping here!' },
      { id: 'rep-4', user: 'Siddharth M.', time: '14 hours ago', note: 'Crater has expanded to 1.2m diameter.' },
      { id: 'rep-5', user: 'Elena Rostova', time: '9 hours ago', note: 'Urgent repair needed before rush hour.' },
      { id: 'rep-6', user: 'Arjun Das', time: '5 hours ago', note: 'Traffic police put a makeshift cone.' },
      { id: 'rep-7', user: 'Priya Sharma', time: '2 hours ago', note: 'Pothole edges are crumbling further.' }
    ],
    timeline: [
      { stage: 'Reported', time: 'Oct 6, 09:15 AM', done: true, desc: 'Initial citizen submission by Maya Vance' },
      { stage: 'Verified', time: 'Oct 6, 09:16 AM', done: true, desc: 'AI Vision analysis verified road crater (87% confidence)' },
      { stage: 'Assigned', time: 'Oct 6, 11:20 AM', done: true, desc: 'Assigned to Ward 14 Commander Ramesh Kumar' },
      { stage: 'In Progress', time: 'Oct 7, 02:40 PM', done: true, desc: 'Asphalt cold-mix patching crew dispatched' },
      { stage: 'Resolved', time: 'Pending final compaction', done: false, desc: 'Crew working on surface sealing' }
    ]
  },
  {
    id: 'comp-014',
    trackingCode: 'CIV-014',
    title: 'High-Pressure Aqueduct Water Leak',
    category: 'water_leak',
    status: 'in_progress',
    priority: 'high',
    reportCount: 5,
    latitude: 12.9738,
    longitude: 77.5992,
    address: 'Hydro-Corridor Road, Near Sector 8 Pumping Hub',
    wardNumber: 8,
    wardName: 'Aqua-Reserve Ward',
    assignedOfficer: 'Sarah Jenkins',
    officerBadge: 'OFF-0819',
    aiSeverity: 'HIGH',
    roadSegment: 'Seg-08-HC2',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
    description: 'Clean drinking water gushing onto sidewalk from cracked main pipeline valve.',
    createdAt: '2026-10-07T06:40:00Z',
    updatedAt: '2026-10-08T07:15:00Z',
    reports: [
      { id: 'rep-14-1', user: 'Kiran Patel', time: '1 day ago', note: 'Substantial water pressure loss in block 4.' },
      { id: 'rep-14-2', user: 'David Kim', time: '18 hours ago', note: 'Sidewalk is completely flooded.' }
    ],
    timeline: [
      { stage: 'Reported', time: 'Oct 7, 06:40 AM', done: true, desc: 'Report logged by residential sensor node' },
      { stage: 'Verified', time: 'Oct 7, 06:42 AM', done: true, desc: 'Acoustic leak telemetry confirmed pressure drop' },
      { stage: 'Assigned', time: 'Oct 7, 08:00 AM', done: true, desc: 'Water Board Rapid Repair Unit alerted' },
      { stage: 'In Progress', time: 'Oct 8, 07:00 AM', done: true, desc: 'Isolating section valve for replacement' },
      { stage: 'Resolved', time: 'Estimated 2 hours', done: false, desc: 'Pressure testing replacement gasket' }
    ]
  },
  {
    id: 'comp-021',
    trackingCode: 'CIV-021',
    title: 'Smart Waste Container Spill',
    category: 'garbage',
    status: 'assigned',
    priority: 'medium',
    reportCount: 3,
    latitude: 12.9691,
    longitude: 77.5912,
    address: 'Eco-Square Promenade, Ward 3 Central',
    wardNumber: 3,
    wardName: 'Verdant Central',
    assignedOfficer: 'Aoi Tanaka',
    officerBadge: 'OFF-0304',
    aiSeverity: 'MEDIUM',
    roadSegment: 'Seg-03-ESP',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    description: 'Automated compacting bin jammed with commercial carton debris, spilling onto walkway.',
    createdAt: '2026-10-07T14:10:00Z',
    updatedAt: '2026-10-08T06:00:00Z',
    reports: [
      { id: 'rep-21-1', user: 'Zoya Khan', time: '16 hours ago', note: 'Bin flap stuck open.' }
    ],
    timeline: [
      { stage: 'Reported', time: 'Oct 7, 02:10 PM', done: true, desc: 'Citizen app submission with photo' },
      { stage: 'Verified', time: 'Oct 7, 02:12 PM', done: true, desc: 'Bin ultrasonic level sensor confirmed 115% capacity' },
      { stage: 'Assigned', time: 'Oct 8, 06:00 AM', done: true, desc: 'Assigned to Electric Compactor Truck #4' },
      { stage: 'In Progress', time: 'En route', done: false, desc: 'Truck scheduled in 45 mins' },
      { stage: 'Resolved', time: 'Pending', done: false, desc: 'Container emptying & mechanism reset' }
    ]
  },
  {
    id: 'comp-037',
    trackingCode: 'CIV-037',
    title: 'Pavement Concrete Fracture',
    category: 'road_damage',
    status: 'reported',
    priority: 'low',
    reportCount: 2,
    latitude: 12.9654,
    longitude: 77.5988,
    address: 'Lotus Boulevard, Near Metro Pillar 184',
    wardNumber: 11,
    wardName: 'Metro South',
    assignedOfficer: 'Unassigned',
    officerBadge: 'UNASSIGNED',
    aiSeverity: 'LOW',
    roadSegment: 'Seg-11-LB18',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    description: 'Minor curb fracture caused by tree root expansion.',
    createdAt: '2026-10-08T04:20:00Z',
    updatedAt: '2026-10-08T04:20:00Z',
    reports: [
      { id: 'rep-37-1', user: 'Harish Rao', time: '4 hours ago', note: 'Trip hazard for morning joggers.' }
    ],
    timeline: [
      { stage: 'Reported', time: 'Oct 8, 04:20 AM', done: true, desc: 'Submitted by citizen Harish Rao' },
      { stage: 'Verified', time: 'Oct 8, 04:22 AM', done: true, desc: 'AI Vision graded low severity root displacement' },
      { stage: 'Assigned', time: 'Pending queue', done: false, desc: 'Awaiting officer schedule' },
      { stage: 'In Progress', time: 'Pending', done: false, desc: 'Scheduled in routine walkway maintenance' },
      { stage: 'Resolved', time: 'Pending', done: false, desc: 'Root trimming and curb recast' }
    ]
  },
  {
    id: 'comp-008',
    trackingCode: 'CIV-008',
    title: 'Monsoon Storm Drain Flash Blockage',
    category: 'drainage',
    status: 'in_progress',
    priority: 'critical',
    reportCount: 6,
    latitude: 12.9752,
    longitude: 77.5882,
    address: 'Cybernetic Expressway Underpass, Ward 2',
    wardNumber: 2,
    wardName: 'North Nexus',
    assignedOfficer: 'Kenji Sato',
    officerBadge: 'OFF-0201',
    aiSeverity: 'CRITICAL',
    roadSegment: 'Seg-02-CEU',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80',
    description: 'Storm grates blinded by fallen construction debris, 2 feet water accumulation under the expressway.',
    createdAt: '2026-10-07T21:00:00Z',
    updatedAt: '2026-10-08T07:45:00Z',
    reports: [
      { id: 'rep-8-1', user: 'Naveen Kumar', time: '11 hours ago', note: 'Cars stalling in standing water.' }
    ],
    timeline: [
      { stage: 'Reported', time: 'Oct 7, 09:00 PM', done: true, desc: 'Emergency telematics trigger' },
      { stage: 'Verified', time: 'Oct 7, 09:01 PM', done: true, desc: 'Water level sensors breached 45cm threshold' },
      { stage: 'Assigned', time: 'Oct 7, 09:05 PM', done: true, desc: 'Kenji Sato Civil Defense Unit dispatched' },
      { stage: 'In Progress', time: 'Oct 7, 09:20 PM', done: true, desc: 'Industrial suction gully-emptier operating' },
      { stage: 'Resolved', time: 'Drainage clearing nearing 90%', done: false, desc: 'Receding flood levels' }
    ]
  },
  {
    id: 'comp-005',
    trackingCode: 'CIV-005',
    title: 'Smart Solar Streetlight Failure',
    category: 'street_light',
    status: 'in_progress',
    priority: 'medium',
    reportCount: 4,
    latitude: 12.9701,
    longitude: 77.5961,
    address: 'Solaris Walkway, Near Tower 9, Ward 14',
    wardNumber: 14,
    wardName: 'Aero-Vista Tech District',
    assignedOfficer: 'Captain Ramesh Kumar',
    officerBadge: 'OFF-1402',
    aiSeverity: 'MEDIUM',
    roadSegment: 'Seg-14-SW9',
    image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=800&q=80',
    description: 'Four consecutive LED luminaries flashing erratically, dark safety spot for students.',
    createdAt: '2026-10-07T19:30:00Z',
    updatedAt: '2026-10-08T08:10:00Z',
    reports: [
      { id: 'rep-5-1', user: 'Tanvi Joshi', time: '13 hours ago', note: 'Very dark walkway at night.' }
    ],
    timeline: [
      { stage: 'Reported', time: 'Oct 7, 07:30 PM', done: true, desc: 'Reported via student civic portal' },
      { stage: 'Verified', time: 'Oct 7, 07:31 PM', done: true, desc: 'Smart Pole Telemetry verified voltage flicker' },
      { stage: 'Assigned', time: 'Oct 8, 07:00 AM', done: true, desc: 'Electrical Grid Team assigned' },
      { stage: 'In Progress', time: 'Oct 8, 08:10 AM', done: true, desc: 'Replacing blown inverter unit' },
      { stage: 'Resolved', time: 'Pending', done: false, desc: 'Photocell recalibration' }
    ]
  },
  {
    id: 'comp-019',
    trackingCode: 'CIV-019',
    title: 'Autonomous Traffic Signal Sync Failure',
    category: 'traffic_issue',
    status: 'assigned',
    priority: 'high',
    reportCount: 3,
    latitude: 12.9765,
    longitude: 77.5935,
    address: 'Quantum Junction 4, Ward 7',
    wardNumber: 7,
    wardName: 'Central Mobility Hub',
    assignedOfficer: 'Dr. Ren Takahashi',
    officerBadge: 'ENG-0701',
    aiSeverity: 'HIGH',
    roadSegment: 'Seg-07-QJ4',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80',
    description: 'Pedestrian countdown timer desynchronized with autonomous shuttle priority lane.',
    createdAt: '2026-10-08T02:15:00Z',
    updatedAt: '2026-10-08T06:30:00Z',
    reports: [
      { id: 'rep-19-1', user: 'Shankar Lal', time: '6 hours ago', note: 'Shuttles are pausing unnecessarily.' }
    ],
    timeline: [
      { stage: 'Reported', time: 'Oct 8, 02:15 AM', done: true, desc: 'Autonomous shuttle V2X telemetry alert' },
      { stage: 'Verified', time: 'Oct 8, 02:16 AM', done: true, desc: 'Signal controller lag confirmed (420ms drift)' },
      { stage: 'Assigned', time: 'Oct 8, 06:30 AM', done: true, desc: 'Assigned to Dr. Ren AI Lab' },
      { stage: 'In Progress', time: 'Pending firmware patch', done: false, desc: 'Over-the-air firmware update staging' },
      { stage: 'Resolved', time: 'Pending', done: false, desc: 'Precision sync test' }
    ]
  },
  {
    id: 'comp-042',
    trackingCode: 'CIV-042',
    title: 'Park Bio-Filter Air Sensor Drift',
    category: 'other',
    status: 'resolved',
    priority: 'low',
    reportCount: 1,
    latitude: 12.9680,
    longitude: 77.6025,
    address: 'Verdant Canopy Park, South Pavillion',
    wardNumber: 5,
    wardName: 'Botanical Sanctuary',
    assignedOfficer: 'Aoi Tanaka',
    officerBadge: 'OFF-0501',
    aiSeverity: 'LOW',
    roadSegment: 'Seg-05-VCP',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    description: 'PM2.5 optical sensor reporting negative values due to pollen contamination.',
    createdAt: '2026-10-05T11:00:00Z',
    updatedAt: '2026-10-07T16:00:00Z',
    reports: [
      { id: 'rep-42-1', user: 'EcoSensor-Node-09', time: '3 days ago', note: 'Sensor optical chamber cleaned.' }
    ],
    timeline: [
      { stage: 'Reported', time: 'Oct 5, 11:00 AM', done: true, desc: 'Automatic drift detector flag' },
      { stage: 'Verified', time: 'Oct 5, 11:05 AM', done: true, desc: 'Optical baseline anomaly verified' },
      { stage: 'Assigned', time: 'Oct 6, 09:00 AM', done: true, desc: 'Assigned to Park Maintenance Unit' },
      { stage: 'In Progress', time: 'Oct 7, 02:00 PM', done: true, desc: 'Lens ultrasonic cleaning completed' },
      { stage: 'Resolved', time: 'Oct 7, 04:00 PM', done: true, desc: 'Clean baseline restored & re-calibrated' }
    ]
  }
];

export const WARDS_DATA = [
  { id: 'ward-14', number: 14, name: 'Aero-Vista Tech District', councilor: 'Captain Ramesh Kumar', totalReports: 312, resolved: 288, healthIndex: 92.4, ecoScore: 94.1, budget: '$480,000', activeCritical: 1 },
  { id: 'ward-08', number: 8, name: 'Aqua-Reserve Ward', councilor: 'Sarah Jenkins', totalReports: 245, resolved: 220, healthIndex: 89.8, ecoScore: 96.5, budget: '$420,000', activeCritical: 0 },
  { id: 'ward-02', number: 2, name: 'North Nexus District', councilor: 'Kenji Sato', totalReports: 380, resolved: 335, healthIndex: 84.2, ecoScore: 88.0, budget: '$540,000', activeCritical: 2 },
  { id: 'ward-03', number: 3, name: 'Verdant Central', councilor: 'Aoi Tanaka', totalReports: 189, resolved: 180, healthIndex: 95.1, ecoScore: 98.4, budget: '$390,000', activeCritical: 0 },
  { id: 'ward-07', number: 7, name: 'Central Mobility Hub', councilor: 'Dr. Ren Takahashi', totalReports: 298, resolved: 274, healthIndex: 91.0, ecoScore: 93.2, budget: '$510,000', activeCritical: 1 },
  { id: 'ward-11', number: 11, name: 'Metro South Corridor', councilor: 'Vikram Malhotra', totalReports: 210, resolved: 195, healthIndex: 88.5, ecoScore: 90.1, budget: '$360,000', activeCritical: 0 },
  { id: 'ward-05', number: 5, name: 'Botanical Sanctuary', councilor: 'Elena Chen', totalReports: 142, resolved: 139, healthIndex: 97.3, ecoScore: 99.1, budget: '$320,000', activeCritical: 0 },
  { id: 'ward-01', number: 1, name: 'Neo-Verdia Harbor', councilor: 'Marcus Vance', totalReports: 265, resolved: 240, healthIndex: 90.2, ecoScore: 91.5, budget: '$440,000', activeCritical: 1 }
];

export const ANALYTICS_DATA = {
  trends: [
    { day: 'Mon', reports: 142, resolved: 138, duplicatesMerged: 34 },
    { day: 'Tue', reports: 189, resolved: 175, duplicatesMerged: 48 },
    { day: 'Wed', reports: 165, resolved: 160, duplicatesMerged: 42 },
    { day: 'Thu', reports: 220, resolved: 205, duplicatesMerged: 62 },
    { day: 'Fri', reports: 198, resolved: 192, duplicatesMerged: 51 },
    { day: 'Sat', reports: 135, resolved: 140, duplicatesMerged: 29 },
    { day: 'Sun', reports: 110, resolved: 122, duplicatesMerged: 22 }
  ],
  categoryBreakdown: [
    { category: 'Pothole & Roads', count: 940, percentage: 27.5, color: '#ef4444' },
    { category: 'Drainage & Water', count: 780, percentage: 22.8, color: '#06b6d4' },
    { category: 'Garbage & Waste', count: 620, percentage: 18.1, color: '#eab308' },
    { category: 'Street Lighting', count: 485, percentage: 14.2, color: '#3b82f6' },
    { category: 'Traffic & Mobility', count: 390, percentage: 11.4, color: '#8b5cf6' },
    { category: 'Eco & Parks', count: 206, percentage: 6.0, color: '#10b981' }
  ],
  priorityDistribution: [
    { name: 'Critical', count: 18, color: '#ef4444' },
    { name: 'High', count: 74, color: '#f97316' },
    { name: 'Medium', count: 142, color: '#eab308' },
    { name: 'Low', count: 86, color: '#10b981' }
  ],
  efficiencyKPIs: {
    avgResolutionHours: 4.8,
    duplicatePreventionRate: '87.4%',
    fuelSavedLiters: 1240,
    citizenSatisfaction: '94.8%'
  }
};
