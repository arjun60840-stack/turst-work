import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_SERVICE_CATEGORIES } from '../utils/constants';
import { 
  SparklesIcon, 
  MapPinIcon, 
  MicrophoneIcon, 
  BoltIcon, 
  ClockIcon, 
  ShieldCheckIcon,
  CheckBadgeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  CurrencyRupeeIcon,
  PhotoIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  UsersIcon,
  PlusIcon,
  MinusIcon,
  BriefcaseIcon,
  IdentificationIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';

type BookingStep = 'category' | 'details' | 'matching' | 'tracking' | 'completed';
type BookingMode = 'single' | 'group';

interface CrewMemberAssignment {
  name: string;
  trade: string;
  phone: string;
  rating: number;
  distance: string;
  coop: string;
  wage: string;
  avatarLetter: string;
}

export default function CustomerPortal() {
  const [bookingMode, setBookingMode] = useState<BookingMode>('single');
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr' | 'pa'>('en');
  const [selectedCategory, setSelectedCategory] = useState<typeof DEFAULT_SERVICE_CATEGORIES[number] | null>(null);
  const [selectedSubcat, setSelectedSubcat] = useState<string>('');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [problemNotes, setProblemNotes] = useState<string>('');
  const [locationAddress, setLocationAddress] = useState<string>('Bhubaneswar Tech Hub, Odisha');
  const [step, setStep] = useState<BookingStep>('category');
  const [matchCountdown, setMatchCountdown] = useState(25);
  const [rating, setRating] = useState(5);
  const [voiceActive, setVoiceActive] = useState(false);

  // Group Hiring State
  const [crewCounts, setCrewCounts] = useState<Record<string, number>>({
    electrician: 1,
    mason: 2,
    labourer: 3,
    plumber: 1,
    carpenter: 0,
    painter: 0,
    hvac: 0,
    cleaner: 0
  });
  const [shiftDuration, setShiftDuration] = useState<'4hr' | '8hr' | '3day'>('8hr');
  const [projectName, setProjectName] = useState('Commercial Villa Renovation & Rewiring');

  // Multi-Worker Crew Roster for Group Hiring Mode
  // Multi-Worker Crew Roster for Group Hiring Mode (Privacy-Preserving Tokens)
  const assignedSquad = [
    { workerId: 'NX-W4812', name: 'Rajesh S.', trade: 'Master Electrician', rating: 4.96, distance: '1.8 km', coop: 'Bhubaneswar Urban Power Guild', wage: '₹550/hr', avatarLetter: 'R' },
    { workerId: 'NX-W9102', name: 'Dharmendra N.', trade: 'Civil Mason & Tile Layer', rating: 4.95, distance: '2.9 km', coop: 'Capital Builders Federation', wage: '₹680/hr', avatarLetter: 'D' },
    { workerId: 'NX-W3401', name: 'Sunil M.', trade: 'Senior Plumber', rating: 4.92, distance: '2.4 km', coop: 'Coastal Trades Federation', wage: '₹480/hr', avatarLetter: 'S' },
    { workerId: 'NX-W5529', name: 'Prakash J.', trade: 'Mason Assistant', rating: 4.88, distance: '2.9 km', coop: 'Capital Builders Federation', wage: '₹500/hr', avatarLetter: 'P' },
    { workerId: 'NX-W8841', name: 'Ramesh P.', trade: 'Site Lead & Craftsman', rating: 4.94, distance: '3.1 km', coop: 'Kisan Shakti Cooperative', wage: '₹450/hr', avatarLetter: 'R' },
    { workerId: 'NX-W1290', name: 'Bikash M.', trade: 'Daily-Wage Helper', rating: 4.90, distance: '3.4 km', coop: 'Kisan Shakti Cooperative', wage: '₹450/hr', avatarLetter: 'B' },
    { workerId: 'NX-W7719', name: 'Manas R.', trade: 'Material Shifter', rating: 4.89, distance: '3.2 km', coop: 'Kisan Shakti Cooperative', wage: '₹450/hr', avatarLetter: 'M' }
  ];

  // Simulated single matched worker (Zero-PII Tokenized Worker Profile)
  const matchedWorker = {
    name: 'Santosh G.',
    workerId: 'NX-W7821',
    maskedPhone: '+91 80000 0XXXX (Encrypted Relay)',
    rating: 4.9,
    jobs: 112,
    eta: '12 mins',
    distance: '2.4 km away',
    coop: 'Sahyadri Agro Labour Sahakari',
    badge: 'Aadhaar DigiLocker Verified',
    otp: '4829'
  };

  useEffect(() => {
    let timer: any;
    if (step === 'matching') {
      timer = setInterval(() => {
        setMatchCountdown((prev) => {
          if (prev <= 1) {
            setStep('tracking');
            return 25;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  // Group Crew Calculations
  const totalCrewCount = Object.values(crewCounts).reduce((acc, curr) => acc + curr, 0);

  const durationMultiplier = shiftDuration === '4hr' ? 4 : shiftDuration === '8hr' ? 8 : 24;

  const calculateCrewHourlyTotal = () => {
    let hourlySum = 0;
    Object.entries(crewCounts).forEach(([tradeId, count]) => {
      const cat = DEFAULT_SERVICE_CATEGORIES.find((c) => c.id === tradeId);
      const rate = cat ? cat.baseWage : 500;
      hourlySum += rate * count;
    });
    return hourlySum;
  };

  const calculateGroupEstimate = () => {
    const hourly = calculateCrewHourlyTotal();
    return hourly * (durationMultiplier / (shiftDuration === '3day' ? 3 : 1));
  };

  const calculateEstimate = () => {
    if (bookingMode === 'group') {
      return calculateGroupEstimate();
    }
    if (!selectedCategory) return 500;
    let total = selectedCategory.baseWage;
    if (isEmergency) total += 150;
    return total;
  };

  const updateCrewCount = (tradeId: string, delta: number) => {
    setCrewCounts((prev) => {
      const current = prev[tradeId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [tradeId]: next };
    });
  };

  const loadCrewPreset = (preset: 'renovation' | 'harvest' | 'electrical' | 'cleaning') => {
    if (preset === 'renovation') {
      setCrewCounts({ mason: 2, electrician: 1, plumber: 1, labourer: 3, carpenter: 1, painter: 0, hvac: 0, cleaner: 0 });
      setProjectName('Home Renovation & Tiling Squad');
    } else if (preset === 'harvest') {
      setCrewCounts({ labourer: 6, electrician: 0, mason: 0, plumber: 0, carpenter: 0, painter: 0, hvac: 0, cleaner: 0 });
      setProjectName('Agricultural Harvest & Crop Haul Team');
    } else if (preset === 'electrical') {
      setCrewCounts({ electrician: 3, hvac: 2, labourer: 2, mason: 0, plumber: 0, carpenter: 0, painter: 0, cleaner: 0 });
      setProjectName('Commercial Rewiring & Inverter Setup Crew');
    } else if (preset === 'cleaning') {
      setCrewCounts({ cleaner: 4, labourer: 2, electrician: 0, mason: 0, plumber: 0, carpenter: 0, painter: 0, hvac: 0 });
      setProjectName('Post-Construction Deep Sanitization');
    }
  };

  const handleVoiceBooking = () => {
    setVoiceActive(true);
    setTimeout(() => {
      setVoiceActive(false);
      const labour = DEFAULT_SERVICE_CATEGORIES.find(c => c.id === 'labourer') || DEFAULT_SERVICE_CATEGORIES[7];
      setSelectedCategory(labour);
      setSelectedSubcat('Crop Harvesting & Threshing');
      setProblemNotes('2 workers required for sugarcane & paddy harvesting at farm field #4');
      setStep('details');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Onboarding Alert for Artisans */}
      <div className="p-3.5 rounded-2xl bg-blue-950/50 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-blue-600/30 text-blue-300">
            <IdentificationIcon className="w-4 h-4" />
          </span>
          <span className="text-slate-300">
            Are you a certified technician or daily-wage artisan looking for work?
          </span>
        </div>
        <Link
          to="/worker-register"
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold transition flex items-center gap-1.5 shrink-0"
        >
          <span>Worker Registration (Aadhaar + Certificate + Resume)</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* High-Tech Top Banner */}
      <div className="tech-glass-card rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-cyan-500/30">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>// DISPATCH CLIENT CONSOLE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Instant Household & Multi-Worker <span className="gradient-text-tech">Booking Console</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Guaranteed fair rates, zero private aggregator exploitation, and 100% cooperative backed.
            </p>
          </div>

          {/* Language & Emergency Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Language Switcher */}
            <div className="flex bg-slate-950/80 rounded-xl p-1 border border-slate-800 text-xs font-mono font-bold">
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${language === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('hi')} 
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${language === 'hi' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                हिन्दी
              </button>
              <button 
                onClick={() => setLanguage('mr')} 
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${language === 'mr' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                मराठी
              </button>
              <button 
                onClick={() => setLanguage('pa')} 
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${language === 'pa' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ਪੰਜਾਬੀ
              </button>
            </div>

            {/* Emergency SOS Toggle */}
            <button
              onClick={() => setIsEmergency(!isEmergency)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                isEmergency 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 ring-2 ring-rose-400 animate-pulse' 
                  : 'bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30'
              }`}
            >
              <BoltIcon className="w-4 h-4 text-amber-300" />
              <span>{isEmergency ? '⚡ Emergency: ACTIVE' : 'Emergency SOS'}</span>
            </button>
          </div>
        </div>

        {/* DPDP Act 2023 Privacy Protection Banner */}
        <div className="mt-5 p-3 rounded-2xl bg-slate-950/70 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-emerald-400">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-bold text-white">DPDP ACT 2023 PRIVACY MESH:</span>
            <span className="text-slate-300 hidden md:inline">
              Personal telephone numbers, residential coordinates, and other customers' orders are cryptographically isolated. Direct voice calls use masked VoIP proxies.
            </span>
            <span className="text-slate-300 md:hidden">
              Zero PII Exposure: Direct phone numbers and client data are masked.
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] shrink-0 font-bold">
            ZERO-PII SECURE
          </span>
        </div>

        {/* MODE SELECTOR: Single Worker vs Group Hiring (Multi-Worker Crew) */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => {
                setBookingMode('single');
                setStep('category');
              }}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                bookingMode === 'single'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BriefcaseIcon className="w-4 h-4" />
              <span>Single Worker Booking</span>
            </button>

            <button
              onClick={() => {
                setBookingMode('group');
                setStep('category');
              }}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                bookingMode === 'group'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <UserGroupIcon className="w-4 h-4 text-teal-300" />
              <span>Group Hiring / Big Works Squad ({totalCrewCount} Selected)</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Autonomous Synergy Dispatch Engine Active</span>
          </div>
        </div>

        {/* Location & Voice Bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 relative z-10">
          <div className="relative flex-1 w-full">
            <MapPinIcon className="w-4 h-4 absolute left-3 top-3.5 text-cyan-400" />
            <input
              type="text"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              placeholder="Your village / project site location..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
            />
          </div>

          <button
            onClick={handleVoiceBooking}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer ${
              voiceActive 
                ? 'bg-rose-600 ring-4 ring-rose-500/40 animate-pulse' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20'
            }`}
          >
            <MicrophoneIcon className="w-4 h-4" />
            <span>{voiceActive ? 'Listening in हिन्दी / मराठी...' : 'Voice Booking (बोलकर बुक करें)'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE B: GROUP HIRING & BIG CREW DISPATCH (Multi-Worker)   */}
      {/* ========================================================= */}
      {bookingMode === 'group' && step === 'category' && (
        <div className="tech-glass-card rounded-3xl p-6 sm:p-8 border border-teal-500/40 space-y-6 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-mono font-bold mb-1">
                <UserGroupIcon className="w-3.5 h-3.5" />
                <span>MULTI-WORKER CREW SQUAD BUILDER</span>
              </div>
              <h3 className="text-xl font-black text-white">
                Assemble a Multi-Trade Crew for Big Works
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Hire multiple workers together with synchronized radial arrival, unified escrow, and single OTP check-in.
              </p>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Total Squad Size:</span>
              <span className="text-2xl font-mono font-black text-teal-400">{totalCrewCount} Workers</span>
            </div>
          </div>

          {/* Quick 1-Click Crew Presets */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-400 mb-2 uppercase tracking-wide">
              ⚡ 1-Click Common Big Work Presets:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => loadCrewPreset('renovation')}
                className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/50 text-left transition cursor-pointer group"
              >
                <div className="font-bold text-xs text-white group-hover:text-teal-400 flex items-center gap-1.5">
                  <span>🏗️ Villa Renovation Squad</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">2 Masons + 1 Elec + 1 Plumb + 3 Helpers</div>
              </button>

              <button
                type="button"
                onClick={() => loadCrewPreset('harvest')}
                className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 text-left transition cursor-pointer group"
              >
                <div className="font-bold text-xs text-white group-hover:text-emerald-400 flex items-center gap-1.5">
                  <span>🌾 Agri Harvest & Haul Team</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">6 Harvester Labourers + Transport Lead</div>
              </button>

              <button
                type="button"
                onClick={() => loadCrewPreset('electrical')}
                className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 text-left transition cursor-pointer group"
              >
                <div className="font-bold text-xs text-white group-hover:text-blue-400 flex items-center gap-1.5">
                  <span>⚡ Commercial Rewire & HVAC</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">3 Electricians + 2 HVAC Techs + 2 Helpers</div>
              </button>

              <button
                type="button"
                onClick={() => loadCrewPreset('cleaning')}
                className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/50 text-left transition cursor-pointer group"
              >
                <div className="font-bold text-xs text-white group-hover:text-purple-400 flex items-center gap-1.5">
                  <span>🧹 Deep Post-Construction Clean</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">4 Cleaners + 2 Heavy Shifters</div>
              </button>
            </div>
          </div>

          {/* Project Details & Shift Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 mb-1">Project Name / Scope of Work</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none font-medium"
                placeholder="e.g. 4-Bedroom Villa Full Renovation & Rewiring"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 mb-1">Work Duration / Shift</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setShiftDuration('4hr')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    shiftDuration === '4hr'
                      ? 'bg-teal-600 text-white border-teal-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Half-Day (4h)
                </button>
                <button
                  type="button"
                  onClick={() => setShiftDuration('8hr')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    shiftDuration === '8hr'
                      ? 'bg-teal-600 text-white border-teal-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Full-Day (8h)
                </button>
                <button
                  type="button"
                  onClick={() => setShiftDuration('3day')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    shiftDuration === '3day'
                      ? 'bg-teal-600 text-white border-teal-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Multi-Day (3d)
                </button>
              </div>
            </div>
          </div>

          {/* Trade Counter Grid */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-400 mb-3 uppercase tracking-wide">
              Customize Worker Counts for Each Trade:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'electrician', name: 'Electrician', icon: '⚡', rate: '₹550/hr' },
                { id: 'mason', name: 'Civil Mason & Tiler', icon: '🧱', rate: '₹680/hr' },
                { id: 'plumber', name: 'Plumber & Fitter', icon: '🔧', rate: '₹480/hr' },
                { id: 'labourer', name: 'Daily-Wage Labourer', icon: '👷', rate: '₹450/hr' },
                { id: 'carpenter', name: 'Precision Carpenter', icon: '🪚', rate: '₹620/hr' },
                { id: 'painter', name: 'Finish Painter', icon: '🎨', rate: '₹500/hr' },
                { id: 'hvac', name: 'HVAC & AC Mechanic', icon: '❄️', rate: '₹580/hr' },
                { id: 'cleaner', name: 'Deep Cleaner', icon: '🧹', rate: '₹420/hr' }
              ].map((trade) => {
                const count = crewCounts[trade.id] || 0;
                return (
                  <div
                    key={trade.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      count > 0
                        ? 'bg-slate-900 border-teal-500/50 shadow-md shadow-teal-500/10'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                        <span>{trade.icon}</span>
                        <span>{trade.name}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">{trade.rate}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateCrewCount(trade.id, -1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold transition cursor-pointer"
                      >
                        <MinusIcon className="w-3.5 h-3.5" />
                      </button>

                      <span className={`w-6 text-center font-mono font-bold text-xs ${count > 0 ? 'text-teal-300' : 'text-slate-500'}`}>
                        {count}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateCrewCount(trade.id, 1)}
                        className="w-7 h-7 rounded-lg bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center font-bold transition cursor-pointer shadow-xs"
                      >
                        <PlusIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group Pricing & Escrow Summary */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-xs">
              <div className="text-slate-300 font-bold">
                Multi-Worker Squad: <span className="text-teal-400 font-mono font-black">{totalCrewCount} Workers Assigned</span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Coordinated synchronized arrival within 3.8 km • Zero middleman fee deduction
              </div>
              <div className="text-[11px] text-emerald-400 font-mono pt-1">
                80% Workers (₹{Math.round(calculateGroupEstimate() * 0.8).toLocaleString()}) • 10% Welfare (₹{Math.round(calculateGroupEstimate() * 0.1).toLocaleString()}) • 10% Platform (₹{Math.round(calculateGroupEstimate() * 0.1).toLocaleString()})
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Total Escrow Lock:</span>
                <span className="text-2xl font-mono font-black text-emerald-400">
                  ₹{calculateGroupEstimate().toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setStep('matching')}
                disabled={totalCrewCount === 0}
                className={`px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-xl ${
                  totalCrewCount === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-teal-500/20'
                }`}
              >
                <span>Dispatch Matched Crew Squad</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE A: SINGLE WORKER BOOKING                             */}
      {/* ========================================================= */}
      {bookingMode === 'single' && step === 'category' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <div>
              <h3 className="text-base font-black text-white font-mono uppercase tracking-wide">// 14 VERIFIED SERVICE TRADES</h3>
              <p className="text-xs text-slate-400">Cooperative backed daily-wage labourers, electricians, mechanics & technicians</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-md border border-cyan-500/30">
              14 TRADES ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {DEFAULT_SERVICE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory?.id === cat.id;
              const isLabourer = cat.id === 'labourer';

              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubcat(cat.subcategories[0]);
                    setStep('details');
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between relative overflow-hidden group tech-glass-card ${
                    isSelected 
                      ? 'border-cyan-500 ring-2 ring-cyan-500 shadow-xl shadow-cyan-500/10' 
                      : 'border-slate-800/80 hover:border-cyan-500/50 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {isLabourer && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-black bg-amber-500 text-black uppercase tracking-wider">
                      HIGH DEMAND
                    </span>
                  )}

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 text-2xl flex items-center justify-center transition-colors mb-3">
                      {cat.icon}
                    </div>
                    <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="font-black text-emerald-400">₹{cat.baseWage} <span className="text-[10px] font-normal text-slate-500">BASE</span></span>
                    <span className="text-[11px] font-bold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center">
                      BOOK <ArrowRightIcon className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Problem Details & Price Estimate (Single Worker) */}
      {step === 'details' && selectedCategory && bookingMode === 'single' && (
        <div className="tech-glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedCategory.icon}</span>
              <div>
                <h3 className="font-extrabold text-white text-lg">{selectedCategory.name}</h3>
                <p className="text-xs text-slate-400">Task Specifications & AI Geofence Setup</p>
              </div>
            </div>
            <button 
              onClick={() => setStep('category')}
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              [← CHANGE TRADE]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {/* Subcategories */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-2 uppercase tracking-wide">
                  Select Specific Task / Subcategory:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCategory.subcategories.map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setSelectedSubcat(sub)}
                      className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                        selectedSubcat === sub 
                          ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-600/30' 
                          : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-900'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                  Describe Problem / Work Notes:
                </label>
                <textarea
                  rows={3}
                  value={problemNotes}
                  onChange={(e) => setProblemNotes(e.target.value)}
                  placeholder="e.g., Need daily-wage worker for equipment repair and field work..."
                  className="w-full p-3 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
              </div>

              {/* Photo Upload Mockup */}
              <div className="border border-dashed border-slate-700 rounded-2xl p-4 bg-slate-950/40 flex items-center justify-center space-x-3 cursor-pointer hover:bg-slate-900 transition-colors">
                <PhotoIcon className="w-6 h-6 text-slate-400" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-300">Attach Site / Equipment Photo (Optional)</p>
                  <p className="text-[10px] text-slate-500">Helps the cooperative worker bring the exact tools needed</p>
                </div>
              </div>
            </div>

            {/* Price Estimate Card */}
            <div className="tech-glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="font-mono font-bold text-white text-sm mb-3">// ESCROW SETTLEMENT PREVIEW</h4>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Service Wage:</span>
                    <span className="font-bold text-white">₹{selectedCategory.baseWage}</span>
                  </div>
                  {isEmergency && (
                    <div className="flex justify-between text-rose-400 font-bold">
                      <span>Emergency 30-min SOS:</span>
                      <span>+₹150</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Geofence Distance Fee:</span>
                    <span className="font-bold text-emerald-400">₹0 (Free)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Welfare Social Security:</span>
                    <span className="text-cyan-400 font-bold">INCLUDED</span>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="font-bold text-white">Escrow Deposit:</span>
                    <span className="font-black text-2xl text-emerald-400">₹{calculateEstimate()}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-cyan-950/60 rounded-xl border border-cyan-500/30 text-[11px] text-cyan-200 space-y-1 font-mono">
                  <p className="font-bold">🛡️ ZERO-TRUST GUARANTEE:</p>
                  <p className="text-slate-300 leading-snug">
                    Wage locked in smart escrow contract. Released to worker only AFTER arrival OTP is verified.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep('matching')}
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Find Nearby Cooperative Worker</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: High-Tech Matching Radar (Supports Single & Group Mode) */}
      {step === 'matching' && (
        <div className="tech-glass-card rounded-3xl p-12 text-center border border-cyan-500/30 space-y-6">
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            {/* Multi-Ring Cyber Radar */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping"></div>
            <div className="absolute inset-4 rounded-full border border-cyan-400/40 animate-pulse"></div>
            <div className="absolute inset-8 rounded-full border border-dashed border-emerald-500/40"></div>
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex flex-col items-center justify-center shadow-xl shadow-cyan-500/30">
              <SparklesIcon className="w-6 h-6 text-amber-300 animate-spin" />
              <span className="text-xs font-mono font-black mt-1">{matchCountdown}s</span>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-black text-white font-mono">
              {bookingMode === 'group' ? '// AI CREW SQUAD FORMATION RADAR...' : '// BROADCASTING GEOSPATIAL RADAR...'}
            </h3>
            <p className="text-xs text-slate-400">
              {bookingMode === 'group'
                ? `Synchronizing ${totalCrewCount} multi-trade specialists within 3.8 km cluster in Bhubaneswar Tech District.`
                : 'Querying nearest cooperative nodes. Evaluating DigiLocker credentials and rota equality scores.'}
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
            <span>{bookingMode === 'group' ? `✓ TEAM ALPHA: ${totalCrewCount} WORKERS FORMING UNIT` : '3 VERIFIED WORKERS IN PROXIMITY MESH'}</span>
          </div>
        </div>
      )}

      {/* Step 4: Live Tracking & Execution */}
      {step === 'tracking' && (
        <div className="tech-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-in fade-in duration-200">
          
          {/* Top Status Header */}
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-emerald-300">
                  {bookingMode === 'group' ? `Coordinated Squad Dispatched (${totalCrewCount} Workers)!` : 'Worker Matched & Dispatched!'}
                </h4>
                <p className="text-xs text-slate-400">
                  {bookingMode === 'group' ? `Project: ${projectName}` : `Assigned from ${matchedWorker.coop}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Single Arrival Check-in OTP:</span>
              <span className="text-xl font-mono font-black text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-cyan-500/40">
                {bookingMode === 'group' ? '9482' : matchedWorker.otp}
              </span>
            </div>
          </div>

          {/* SQUAD ROSTER (If Group Mode) */}
          {bookingMode === 'group' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                <span>ASSIGNED SQUAD ROSTER ({assignedSquad.length} CONFIRMED TALENT)</span>
                <span className="text-teal-400">SYNCHRONIZED ETA: 14 MINS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {assignedSquad.map((member, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                        {member.avatarLetter}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-1">
                          <span>{member.name}</span>
                          <CheckBadgeIcon className="w-3.5 h-3.5 text-teal-400" />
                        </div>
                        <div className="text-[11px] text-teal-400 font-semibold">{member.trade}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{member.distance} • ⭐ {member.rating}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono font-bold text-emerald-400">{member.wage}</div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">En Route</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Execution Controls for Crew */}
              <div className="p-5 rounded-2xl bg-[#060A13] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs">
                  <div className="font-bold text-white">Smart Escrow Total: ₹{calculateEstimate().toLocaleString()}</div>
                  <div className="text-slate-400 text-[11px]">80% splits instantly to individual worker wallets upon OTP sign-off</div>
                </div>

                <button
                  onClick={() => setStep('completed')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  Verify Arrival OTP & Release Multi-Worker Escrow
                </button>
              </div>
            </div>
          ) : (
            /* Single Worker Profile Card */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-cyan-500/20">
                      {matchedWorker.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-white text-base flex items-center">
                        {matchedWorker.name}
                        <CheckBadgeIcon className="w-4 h-4 ml-1.5 text-cyan-400" />
                        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                          {matchedWorker.workerId}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">{matchedWorker.coop}</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs font-mono">
                        <span className="text-amber-400 font-bold">⭐ {matchedWorker.rating}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">{matchedWorker.jobs} GIGS</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-emerald-400 font-semibold flex items-center">
                          <ShieldCheckIcon className="w-3.5 h-3.5 mr-0.5 inline" />
                          DPDP 2023 Masked
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert('🔒 Secure In-App Voice Relay Connected.\n\nWorker personal telephone number is masked under DPDP Act 2023.\nRouting via Nexvion Encrypted Voice Bridge (+91 80000 0XXXX).')}
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs cursor-pointer flex items-center space-x-1.5 text-xs font-mono font-bold"
                      title="Encrypted Masked Call"
                    >
                      <PhoneIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Secure Call</span>
                    </button>
                    <button 
                      onClick={() => alert(`🔒 End-to-End Encrypted Chat session established with ${matchedWorker.name} (${matchedWorker.workerId}). No personal contact data is shared.`)}
                      className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shadow-xs cursor-pointer flex items-center space-x-1.5 text-xs font-mono font-bold"
                      title="In-App Secure Chat"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Secure Chat</span>
                    </button>
                  </div>
                </div>

                {/* Live Tracking Telemetry */}
                <div className="p-5 rounded-2xl bg-[#060A13] border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-cyan-400 uppercase tracking-wider">// GPS TELEMETRY</span>
                    <span className="text-slate-300">ETA: {matchedWorker.eta} ({matchedWorker.distance})</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-bold">
                    <div className="p-2 rounded-lg bg-cyan-600 text-white">1. ACCEPTED</div>
                    <div className="p-2 rounded-lg bg-cyan-600 text-white animate-pulse">2. EN ROUTE</div>
                    <div className="p-2 rounded-lg bg-slate-900 text-slate-500">3. IN WORK</div>
                    <div className="p-2 rounded-lg bg-slate-900 text-slate-500">4. SETTLED</div>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center font-mono">
                    Share OTP <strong>{matchedWorker.otp}</strong> upon physical arrival to verify geofence.
                  </p>
                </div>
              </div>

              {/* Complete Job Action Card */}
              <div className="tech-glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono font-bold text-white text-sm mb-2">// EXECUTION CONTROL</h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Confirm completion to unlock and release smart escrow payout.
                  </p>

                  <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Trade:</span>
                      <span className="font-bold text-white">{selectedCategory?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Escrow:</span>
                      <span className="font-black text-emerald-400">₹{calculateEstimate()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('completed')}
                  className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  Confirm Completion & Release Escrow
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Completed */}
      {step === 'completed' && (
        <div className="tech-glass-card rounded-3xl p-8 max-w-lg mx-auto text-center border border-emerald-500/40 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircleIcon className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-xl font-black text-white font-mono">
              {bookingMode === 'group' ? 'CREW SQUAD EXECUTION SETTLED' : 'SERVICE EXECUTION SETTLED'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              ₹{calculateEstimate().toLocaleString()} escrow successfully disbursed: 80% to {bookingMode === 'group' ? `all ${totalCrewCount} crew members` : matchedWorker.name} via instant UPI, and 10% deposited to the Cooperative Welfare Corpus.
            </p>
          </div>

          <div className="py-2">
            <label className="block text-xs font-mono font-bold text-slate-400 mb-2">RATE EXECUTION QUALITY:</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-transform hover:scale-125 cursor-pointer ${star <= rating ? 'text-amber-400' : 'text-slate-700'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setStep('category');
              setSelectedCategory(null);
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Dispatch Another Service or Squad
          </button>
        </div>
      )}
    </div>
  );
}
