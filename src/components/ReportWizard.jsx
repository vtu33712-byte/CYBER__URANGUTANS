import React, { useState, useRef, useEffect } from 'react';
import { 
  AlertOctagon, 
  Compass, 
  Trash2, 
  Droplets, 
  Sun, 
  Waves, 
  Car, 
  HelpCircle,
  UploadCloud,
  Camera,
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Cpu,
  Scan,
  GitMerge,
  Send,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { ISSUE_CATEGORIES } from '../data/mockData';
import { MapView } from './MapView';
import { startLaserScan, animateConfidenceCircle, playReportMergeAnimation, animateCheckmarksStagger } from '../animations/aiAnimations';
import { apply3DTilt, reset3DTilt, animateCardSelect } from '../animations/cardAnimations';
import { findDuplicateMatch } from '../services/duplicateService';
import { createNewComplaint, mergeReportIntoComplaint } from '../services/complaintService';
import { handleImageError, FALLBACK_IMAGE_SVG } from '../utils/imageFallback';
import confetti from 'canvas-confetti';

const SAMPLE_EVIDENCE_IMAGES = [
  {
    category: 'pothole',
    label: 'Crater Asphalt Cavity',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    tags: ['Pothole (87%)', 'Road Distress', 'Subsurface Cavity'],
    severity: 'HIGH'
  },
  {
    category: 'water_leak',
    label: 'Sidewalk Pipe Rupture',
    url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
    tags: ['Water Leak (92%)', 'Pipeline Valve', 'Sidewalk Flood'],
    severity: 'HIGH'
  },
  {
    category: 'garbage',
    label: 'Commercial Waste Overflow',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    tags: ['Garbage Overflow (84%)', 'Sensor Jam', 'Waste Dispersion'],
    severity: 'MEDIUM'
  },
  {
    category: 'drainage',
    label: 'Underpass Flooding Grate',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80',
    tags: ['Drain Blockage (94%)', 'Grate Clog', 'Flood Hazard'],
    severity: 'CRITICAL'
  }
];

export const ReportWizard = ({ onNavigate, onCompleteSubmission, initialCategory = null }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'pothole');
  
  // Evidence state
  const [evidenceImage, setEvidenceImage] = useState(SAMPLE_EVIDENCE_IMAGES[0].url);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState({
    detected: ['Pothole (87%)', 'Road Damage'],
    confidence: 87,
    severity: 'HIGH'
  });

  // Location state (defaults close to CIV-001 for 18m duplicate match demonstration)
  const [locationCoords, setLocationCoords] = useState([12.97175, 77.59472]);
  const [address, setAddress] = useState('Avenue of Sovereignty, Cross-street 4, Ward 14');
  const [wardNumber, setWardNumber] = useState(14);
  const [roadSegment, setRoadSegment] = useState('Seg-14-AS4');

  // Description state
  const [title, setTitle] = useState('Deep asphalt cavity causing vehicle swerving');
  const [description, setDescription] = useState('Large deep crater in the middle lane causing abrupt braking and scooter accidents during rain.');
  const [citizenName, setCitizenName] = useState('Maya Vance');

  // AI Pipeline state (Step 5)
  const [aiStepIndex, setAiStepIndex] = useState(0);
  const [duplicateMatch, setDuplicateMatch] = useState(null);

  // Merge Animation state (Step 6)
  const [isMerging, setIsMerging] = useState(false);
  const [mergeCompleteData, setMergeCompleteData] = useState(null);

  // Refs for animations & file inputs
  const laserRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const confidenceCircleRef = useRef(null);
  const confidenceNumberRef = useRef(null);
  const sourceCardRef = useRef(null);
  const targetCardRef = useRef(null);
  const counterRef = useRef(null);
  const badgeRef = useRef(null);
  const notificationRef = useRef(null);
  const checkmarksListRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const processUploadedFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target.result;
      setEvidenceImage(resultUrl);
      setIsScanning(true);
      const catLabel = selectedCategory ? selectedCategory.replace('_', ' ').toUpperCase() : 'CIVIC DEFECT';
      setScanResult({
        detected: [`${catLabel} (92%)`, 'Photographic Surface Evidence', 'Edge Disruption'],
        confidence: 92,
        severity: selectedCategory === 'drainage' ? 'CRITICAL' : selectedCategory === 'other' ? 'LOW' : 'HIGH'
      });
      setTimeout(() => setIsScanning(false), 2400);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const stepsList = [
    { num: '01', title: 'Issue' },
    { num: '02', title: 'Evidence' },
    { num: '03', title: 'Location' },
    { num: '04', title: 'Description' },
    { num: '05', title: 'AI Verification' },
    { num: '06', title: 'Submit' }
  ];

  // Trigger laser scanner animation when evidence changes or step 2 mounted
  useEffect(() => {
    if (currentStep === 2 && laserRef.current) {
      setIsScanning(true);
      const scanAnim = startLaserScan(laserRef.current);
      const timer = setTimeout(() => {
        setIsScanning(false);
      }, 2500);
      return () => {
        clearTimeout(timer);
        if (scanAnim && typeof scanAnim.pause === 'function') scanAnim.pause();
      };
    }
  }, [currentStep, evidenceImage]);

  // AI Verification Step (Step 5) multi-step sequence
  useEffect(() => {
    if (currentStep === 5) {
      setAiStepIndex(0);
      const timer1 = setTimeout(() => setAiStepIndex(1), 500);  // Location Check
      const timer2 = setTimeout(() => setAiStepIndex(2), 1000); // Image Similarity
      const timer3 = setTimeout(() => setAiStepIndex(3), 1500); // Description Similarity
      const timer4 = setTimeout(() => setAiStepIndex(4), 2000); // Spatial Clustering
      const timer5 = setTimeout(() => setAiStepIndex(5), 2500); // Priority Calculation
      const timer6 = setTimeout(() => {
        setAiStepIndex(6); // Final Decision
        // Evaluate duplicate matching
        const match = findDuplicateMatch({
          category: selectedCategory,
          latitude: locationCoords[0],
          longitude: locationCoords[1],
          description,
          imageSimulatedScore: scanResult.confidence
        });
        setDuplicateMatch(match);
        setTimeout(() => setCurrentStep(6), 700);
      }, 3100);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
        clearTimeout(timer6);
      };
    }
  }, [currentStep]);

  // Step 6 animations (Confidence circle & explainable AI checkmarks)
  useEffect(() => {
    if (currentStep === 6 && duplicateMatch) {
      setTimeout(() => {
        animateConfidenceCircle({
          circleRef: confidenceCircleRef.current,
          numberRef: confidenceNumberRef.current,
          targetPercent: duplicateMatch.compositeConfidence || 89
        });
        if (checkmarksListRef.current) {
          const checks = checkmarksListRef.current.querySelectorAll('.explain-check');
          animateCheckmarksStagger(checks);
        }
      }, 200);
    }
  }, [currentStep, duplicateMatch]);

  // Execute Merge Report Action
  const handleMergeReport = () => {
    if (!duplicateMatch || !duplicateMatch.candidate) return;
    setIsMerging(true);

    playReportMergeAnimation({
      sourceCardRef: sourceCardRef.current,
      targetCardRef: targetCardRef.current,
      counterRef: counterRef.current,
      badgeRef: badgeRef.current,
      notificationRef: notificationRef.current,
      onComplete: () => {
        const result = mergeReportIntoComplaint(duplicateMatch.candidate.id, {
          citizenName,
          description,
          image: evidenceImage
        });
        setMergeCompleteData(result);
        setIsMerging(false);

        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    });
  };

  // Submit as New Standalone Ticket
  const handleCreateIndependent = () => {
    const created = createNewComplaint({
      title,
      category: selectedCategory,
      latitude: locationCoords[0],
      longitude: locationCoords[1],
      address,
      wardNumber,
      citizenName,
      description,
      image: evidenceImage,
      aiSeverity: scanResult.severity
    });
    if (onCompleteSubmission) {
      onCompleteSubmission(created);
    } else {
      onNavigate('tracker', { searchCode: created.trackingCode });
    }
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'AlertOctagon': return AlertOctagon;
      case 'Compass': return Compass;
      case 'Trash2': return Trash2;
      case 'Droplets': return Droplets;
      case 'Sun': return Sun;
      case 'Waves': return Waves;
      case 'Car': return Car;
      default: return HelpCircle;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      
      {/* Wizard Header & Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Guided Civic Reporting Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
              File a Grievance
            </h2>
          </div>
          <div className="text-right">
            <span className="text-sm font-mono font-bold text-emerald-400">
              Step {currentStep} of {stepsList.length}
            </span>
          </div>
        </div>

        {/* Steps Progress Track */}
        <div className="grid grid-cols-6 gap-2">
          {stepsList.map((st, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div 
                key={st.num}
                onClick={() => { if (stepNum < currentStep) setCurrentStep(stepNum); }}
                className={`cursor-pointer group flex flex-col items-center sm:items-start p-2 rounded-xl border transition-all ${
                  isCurrent 
                    ? 'bg-cyan-500/15 border-cyan-400 shadow-neon-cyan' 
                    : isCompleted 
                    ? 'bg-slate-900/80 border-emerald-500/50 hover:border-emerald-400' 
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-1.5 w-full">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isCurrent ? 'bg-cyan-400 text-slate-950' : isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {st.num}
                  </span>
                  <span className={`text-xs font-semibold hidden md:inline truncate ${
                    isCurrent ? 'text-cyan-300' : isCompleted ? 'text-emerald-300' : 'text-slate-400'
                  }`}>
                    {st.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Panels */}
      <div className="glass-panel bg-slate-950/80 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
        
        {/* ================= STEP 01: ISSUE SELECTION ================= */}
        {currentStep === 1 && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Select Issue Category
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Choose the primary category that describes the civic infrastructure disruption.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ISSUE_CATEGORIES.map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                const isSelected = selectedCategory === cat.id;

                return (
                  <div
                    key={cat.id}
                    onClick={(e) => {
                      setSelectedCategory(cat.id);
                      animateCardSelect(e.currentTarget);
                    }}
                    onMouseMove={(e) => apply3DTilt(e.currentTarget, e)}
                    onMouseLeave={(e) => reset3DTilt(e.currentTarget)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 shadow-neon-cyan scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${cat.color}25`, border: `1px solid ${cat.color}60` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: cat.color }} />
                        </div>
                        <span 
                          className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase"
                          style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                        >
                          {cat.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Default Urgency:</span>
                      <span className={`font-bold ${cat.defaultSeverity === 'CRITICAL' ? 'text-red-400' : cat.defaultSeverity === 'HIGH' ? 'text-orange-400' : 'text-yellow-400'}`}>
                        {cat.defaultSeverity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 02: EVIDENCE UPLOAD ================= */}
        {currentStep === 2 && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-cyan-400" />
                Evidence Upload & AI Vision Scan
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Upload authentic site photography or capture live from your device. Our neural models perform instant edge, contour, and depth hazard detection.
              </p>
            </div>

            {/* Hidden native file and camera inputs */}
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
            />
            <input 
              type="file" 
              ref={cameraInputRef} 
              accept="image/*" 
              capture="environment" 
              onChange={handleFileChange} 
              className="hidden" 
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Dropzone & Image Scanner */}
              <div className="lg:col-span-7 space-y-4">
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative rounded-2xl overflow-hidden border-2 border-dashed p-4 text-center transition-all ${
                    isDragging 
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-neon-cyan scale-[1.01]' 
                      : 'border-cyan-500/40 bg-slate-900/50 hover:border-cyan-400'
                  }`}
                >
                  {evidenceImage ? (
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-black flex items-center justify-center">
                      <img 
                        src={evidenceImage} 
                        alt="Evidence Preview" 
                        onError={handleImageError}
                        className="w-full h-full object-cover" 
                      />

                      {/* Laser Scanner Bar (Anime.js animated) */}
                      {isScanning && (
                        <div 
                          ref={laserRef}
                          className="scanner-line absolute left-0 right-0 h-2 z-20 pointer-events-none"
                          style={{ top: '0%' }}
                        />
                      )}

                      {/* Scanning HUD Overlay */}
                      <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                        <Scan className="w-3 h-3 text-cyan-400 animate-spin" />
                        <span>AI VISION SCANNER {isScanning ? 'ACTIVE' : 'READY'}</span>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="py-12 flex flex-col items-center justify-center cursor-pointer"
                    >
                      <UploadCloud className="w-12 h-12 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="text-sm font-bold text-white">Drop your evidence here, or browse</h4>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG, HEIC, WEBP from your device</p>
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      Upload Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Use Camera
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsScanning(true);
                        setTimeout(() => setIsScanning(false), 2000);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Re-scan Image
                    </button>
                  </div>
                </div>

                {/* Sample Presets */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Or select verified sensor capture sample:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                    {SAMPLE_EVIDENCE_IMAGES.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setEvidenceImage(sample.url);
                          setSelectedCategory(sample.category);
                          setScanResult({
                            detected: sample.tags,
                            confidence: 87 + idx * 3,
                            severity: sample.severity
                          });
                        }}
                        className={`p-1.5 rounded-xl border text-left text-xs transition-all ${
                          evidenceImage === sample.url
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <img 
                          src={sample.url} 
                          alt={sample.label} 
                          onError={handleImageError}
                          className="w-full h-14 object-cover rounded-lg mb-1" 
                        />
                        <span className="truncate block font-semibold text-[11px]">{sample.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Vision Telemetry Breakdown */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">AI Vision Analysis</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      {scanResult.confidence}% Confidence
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="text-xs text-slate-400">Primary Classification:</span>
                      <div className="text-sm font-bold text-white mt-0.5 capitalize">{selectedCategory.replace('_', ' ')}</div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400">Detected Feature Tags:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {scanResult.detected.map((tag, tIdx) => (
                          <span key={tIdx} className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400">Estimated Hazard Severity:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-mono font-bold px-2 py-1 rounded uppercase ${
                          scanResult.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                          scanResult.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                        }`}>
                          {scanResult.severity}
                        </span>
                        <span className="text-xs text-slate-400">Automated dispatch weight applied</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-200">
                  ✓ Computer vision edge neural model (ResNet-Civic-v2) inference concluded in 142ms.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 03: LOCATION SELECTION ================= */}
        {currentStep === 3 && (
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Select Exact Grievance Coordinates
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pinpoint location on the interactive GIS map. Active complaints within 50m are visible with telemetry rings.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <MapView 
                  userLocation={locationCoords}
                  height="380px"
                  showDuplicateRadius={true}
                  radiusMeters={50}
                />
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400">Detected Civic Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Ward Number</label>
                    <select
                      value={wardNumber}
                      onChange={(e) => setWardNumber(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 outline-none"
                    >
                      <option value={14}>Ward 14 (Aero-Vista)</option>
                      <option value={8}>Ward 08 (Aqua-Reserve)</option>
                      <option value={2}>Ward 02 (North Nexus)</option>
                      <option value={3}>Ward 03 (Verdant Central)</option>
                      <option value={7}>Ward 07 (Mobility Hub)</option>
                      <option value={11}>Ward 11 (Metro South)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400">Road Segment</label>
                    <input
                      type="text"
                      value={roadSegment}
                      onChange={(e) => setRoadSegment(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400">GPS Telemetry:</div>
                  <div className="font-mono text-cyan-300">Lat: {locationCoords[0].toFixed(5)}, Lng: {locationCoords[1].toFixed(5)}</div>
                  <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                    ✓ 50-meter PostGIS spatial circle query primed
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 04: DESCRIPTION ================= */}
        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white">Describe the Incident</h3>
              <p className="text-xs text-slate-400 mt-1">
                Provide concise notes to help the municipal response squad allocate tools and equipment.
              </p>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400">Brief Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 focus:border-cyan-400 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400">Detailed Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 focus:border-cyan-400 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400">Reporting Citizen</label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400">Citizen Rewards Program</label>
                <div className="mt-1 px-3 py-2 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-semibold">
                  +50 Civic Eco-Credits on verification
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 05: AI VERIFICATION (ANIMATED SCANNING) ================= */}
        {currentStep === 5 && (
          <div className="max-w-xl mx-auto py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 shadow-neon-cyan mb-4 animate-pulse">
              <Cpu className="w-8 h-8 text-cyan-400" />
            </div>
            
            <h3 className="text-2xl font-display font-extrabold text-white">AI Civic Intelligence</h3>
            <p className="text-xs text-cyan-300 font-mono mt-1">Analyzing nearby civic reports...</p>

            {/* Checklist Pipeline */}
            <div className="mt-8 space-y-3 text-left">
              {[
                { title: 'Location Check', desc: 'Evaluating 50m spatial cluster radius' },
                { title: 'Image Similarity', desc: 'Comparing surface distress edge features' },
                { title: 'Description Similarity', desc: 'Running natural language context matching' },
                { title: 'Spatial Clustering', desc: 'Grouping road segment density' },
                { title: 'Priority Calculation', desc: 'Recalculating urgency impact index' },
                { title: 'Final Decision', desc: 'Formulating master ticket consensus' }
              ].map((stepItem, idx) => {
                const isPassed = aiStepIndex > idx;
                const isCurrent = aiStepIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                      isPassed
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                        : isCurrent
                        ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-neon-cyan'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-700 flex-shrink-0" />
                      )}
                      <div>
                        <div className="text-xs font-bold">{stepItem.title}</div>
                        <div className="text-[10px] text-slate-400">{stepItem.desc}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase">
                      {isPassed ? 'VERIFIED' : isCurrent ? 'PROCESSING' : 'QUEUED'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 06: DUPLICATE RESULT & MERGING ================= */}
        {currentStep === 6 && (
          <div>
            {duplicateMatch ? (
              <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                      Spatial AI Consensus
                    </span>
                    <h3 className="text-2xl font-display font-black text-white mt-0.5">
                      Duplicate Issue Detected
                    </h3>
                  </div>

                  {/* Circular Confidence Meter */}
                  <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-2xl border border-cyan-500/30">
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-slate-800"
                          fill="transparent"
                        />
                        <circle
                          ref={confidenceCircleRef}
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-cyan-400"
                          fill="transparent"
                          strokeDasharray="282.74"
                          strokeDashoffset="282.74"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span 
                        ref={confidenceNumberRef}
                        className="absolute font-mono font-black text-xs text-white"
                      >
                        0%
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">Confidence Match</div>
                      <div className="text-[10px] text-cyan-400 font-mono">Distance: {duplicateMatch.distance}m</div>
                    </div>
                  </div>
                </div>

                {/* Side-by-Side Comparison: YOUR REPORT vs EXISTING REPORT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  
                  {/* Left: YOUR REPORT (Source) */}
                  <div 
                    ref={sourceCardRef}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 relative overflow-hidden"
                  >
                    <div className="text-[10px] font-mono font-bold text-cyan-400 mb-2 uppercase">
                      YOUR NEW SUBMISSION
                    </div>
                    <img 
                      src={evidenceImage} 
                      alt="Your submission" 
                      onError={handleImageError}
                      className="w-full h-36 object-cover rounded-xl mb-3"
                    />
                    <h4 className="text-sm font-bold text-white truncate">{title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{description}</p>
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
                      <span>Reporter: {citizenName}</span>
                      <span className="text-cyan-300">Target Ward {wardNumber}</span>
                    </div>
                  </div>

                  {/* Right: EXISTING MASTER REPORT (Target) */}
                  <div 
                    ref={targetCardRef}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 relative overflow-hidden shadow-neon-emerald"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                        EXISTING ACTIVE MASTER RECORD
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-300">
                        {duplicateMatch.candidate.trackingCode}
                      </span>
                    </div>
                    <img 
                      src={duplicateMatch.candidate.image} 
                      alt="Existing report" 
                      onError={handleImageError}
                      className="w-full h-36 object-cover rounded-xl mb-3"
                    />
                    <h4 className="text-sm font-bold text-white truncate">{duplicateMatch.candidate.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{duplicateMatch.candidate.description}</p>
                    
                    {/* Live Metric Badges */}
                    <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px]">Report Count: </span>
                        <span ref={counterRef} className="font-mono font-extrabold text-emerald-300">
                          {mergeCompleteData ? mergeCompleteData.newCount : duplicateMatch.candidate.reportCount}
                        </span>
                      </div>
                      <div>
                        <span 
                          ref={badgeRef}
                          className="font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-orange-500/20 text-orange-400 border border-orange-500/40"
                        >
                          {mergeCompleteData ? mergeCompleteData.newPriority : duplicateMatch.candidate.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Similarity Breakdown Stats */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">DISTANCE</div>
                    <div className="text-base font-bold text-cyan-400">{duplicateMatch.distance}m</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">IMAGE MATCH</div>
                    <div className="text-base font-bold text-emerald-400">{duplicateMatch.imageScore}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">DESCRIPTION MATCH</div>
                    <div className="text-base font-bold text-purple-400">{duplicateMatch.descScore}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400">LOCATION SCORE</div>
                    <div className="text-base font-bold text-teal-400">{duplicateMatch.locationScore}%</div>
                  </div>
                </div>

                {/* Explainable AI: Why did we match these reports? */}
                <div className="mt-6 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Why did we match these reports?
                  </h4>
                  <div ref={checkmarksListRef} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {duplicateMatch.explainableReasons.map((reason, rIdx) => (
                      <div key={rIdx} className="explain-check flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{reason.label}</span>
                        <span className="text-[10px] font-mono text-slate-500">({reason.detail})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success Notification Bar after Merge */}
                {mergeCompleteData && (
                  <div 
                    ref={notificationRef}
                    className="mt-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-400 text-emerald-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      <div>
                        <div className="font-bold text-sm">Report Grouped Successfully!</div>
                        <div className="text-xs text-emerald-300">
                          {duplicateMatch.candidate.trackingCode} report count increased {mergeCompleteData.previousCount} → {mergeCompleteData.newCount}. Priority elevated. Officer dispatch alert SENT.
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('tracker', { searchCode: duplicateMatch.candidate.trackingCode })}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold shadow-neon-emerald"
                    >
                      Track Master Record
                    </button>
                  </div>
                )}

                {/* Action CTA Buttons */}
                {!mergeCompleteData && (
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                    <button
                      onClick={handleCreateIndependent}
                      className="px-4 py-2.5 text-xs text-slate-400 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-700"
                    >
                      Submit as Separate Independent Ticket
                    </button>

                    <button
                      onClick={handleMergeReport}
                      disabled={isMerging}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 font-bold text-sm shadow-neon-emerald hover:opacity-95 flex items-center gap-2"
                    >
                      <GitMerge className="w-4 h-4" />
                      <span>{isMerging ? 'Merging Reports...' : 'Add My Report to Existing Issue'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* No Duplicate detected -> Fresh Unique Ticket Submission */
              <div className="py-6 text-center max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Unique Grievance Verified</h3>
                <p className="text-xs text-slate-400 mt-2">
                  No active complaints found within 50 meters of your coordinates. Ready to route directly to Ward {wardNumber} operations unit.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-1 font-mono">
                  <div>Title: {title}</div>
                  <div>Category: {selectedCategory}</div>
                  <div>Location: {address}</div>
                </div>

                <button
                  onClick={handleCreateIndependent}
                  className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold text-sm shadow-neon-emerald flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Grievance to Municipal Center</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Wizard Bottom Navigation Buttons */}
        {currentStep < 5 && (
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                currentStep === 1 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 text-xs font-bold shadow-neon-cyan hover:opacity-95 flex items-center gap-1.5"
            >
              <span>{currentStep === 4 ? 'Run AI Verification' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ReportWizard;
