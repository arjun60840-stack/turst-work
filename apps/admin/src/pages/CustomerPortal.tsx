import { useState, useEffect } from 'react';
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
  CheckCircleIcon
} from '@heroicons/react/24/outline';

type BookingStep = 'category' | 'details' | 'matching' | 'tracking' | 'completed';

export default function CustomerPortal() {
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr' | 'pa'>('en');
  const [selectedCategory, setSelectedCategory] = useState<typeof DEFAULT_SERVICE_CATEGORIES[number] | null>(null);
  const [selectedSubcat, setSelectedSubcat] = useState<string>('');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [problemNotes, setProblemNotes] = useState<string>('');
  const [locationAddress, setLocationAddress] = useState<string>('Nashik Agro Market Yard, Maharashtra');
  const [step, setStep] = useState<BookingStep>('category');
  const [matchCountdown, setMatchCountdown] = useState(25);
  const [rating, setRating] = useState(5);
  const [voiceActive, setVoiceActive] = useState(false);

  // Simulated matched worker
  const matchedWorker = {
    name: 'Santosh Gavit',
    phone: '+91 97654 32109',
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

  const calculateEstimate = () => {
    if (!selectedCategory) return 500;
    let total = selectedCategory.baseWage;
    if (isEmergency) total += 150;
    return total;
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
              Instant Rural & Household <span className="gradient-text-tech">Booking Console</span>
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
                className={`px-3 py-1.5 rounded-lg transition-colors ${language === 'en' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('hi')} 
                className={`px-3 py-1.5 rounded-lg transition-colors ${language === 'hi' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                हिन्दी
              </button>
              <button 
                onClick={() => setLanguage('mr')} 
                className={`px-3 py-1.5 rounded-lg transition-colors ${language === 'mr' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                मराठी
              </button>
              <button 
                onClick={() => setLanguage('pa')} 
                className={`px-3 py-1.5 rounded-lg transition-colors ${language === 'pa' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ਪੰਜਾਬੀ
              </button>
            </div>

            {/* Emergency SOS Toggle */}
            <button
              onClick={() => setIsEmergency(!isEmergency)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
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

        {/* Voice-First Smart Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 relative z-10">
          <div className="relative flex-1 w-full">
            <MapPinIcon className="w-4 h-4 absolute left-3 top-3.5 text-cyan-400" />
            <input
              type="text"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              placeholder="Your village / farm location..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
            />
          </div>

          <button
            onClick={handleVoiceBooking}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-md ${
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

      {/* Step 1: Category Selection */}
      {step === 'category' && (
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

      {/* Step 2: Problem Details & Price Estimate */}
      {step === 'details' && selectedCategory && (
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
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300"
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
                      className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
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
                  placeholder="e.g., Need 2 daily-wage workers for sugarcane cutting & field clearing..."
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
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>Find Nearby Cooperative Worker</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: High-Tech Matching Radar */}
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
              // BROADCASTING GEOSPATIAL RADAR...
            </h3>
            <p className="text-xs text-slate-400">
              Querying nearest cooperative nodes in Nashik District. Evaluating DigiLocker credentials and rota equality scores.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
            <span>3 VERIFIED WORKERS IN PROXIMITY MESH</span>
          </div>
        </div>
      )}

      {/* Step 4: Live Tracking & Execution */}
      {step === 'tracking' && (
        <div className="tech-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-in fade-in duration-200">
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="font-bold text-sm text-emerald-300">Worker Matched & Dispatched!</h4>
                <p className="text-xs text-slate-400">Assigned from {matchedWorker.coop}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Arrival OTP Code:</span>
              <span className="text-xl font-mono font-black text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-cyan-500/40">
                {matchedWorker.otp}
              </span>
            </div>
          </div>

          {/* Worker Profile Card */}
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
                    </h4>
                    <p className="text-xs text-slate-400">{matchedWorker.coop}</p>
                    <div className="flex items-center space-x-3 mt-1 text-xs font-mono">
                      <span className="text-amber-400 font-bold">⭐ {matchedWorker.rating}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{matchedWorker.jobs} GIGS</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => alert(`Calling worker at ${matchedWorker.phone}`)}
                    className="p-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-xs"
                    title="Direct Call"
                  >
                    <PhoneIcon className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => alert(`Opening encrypted telemetry chat with ${matchedWorker.name}`)}
                    className="p-3 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-xs"
                    title="In-App Chat"
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
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
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all"
              >
                Confirm Completion & Release Escrow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Completed */}
      {step === 'completed' && (
        <div className="tech-glass-card rounded-3xl p-8 max-w-lg mx-auto text-center border border-emerald-500/40 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircleIcon className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-xl font-black text-white font-mono">SERVICE EXECUTION SETTLED</h3>
            <p className="text-xs text-slate-400 mt-1">
              ₹{calculateEstimate()} escrow successfully disbursed: 80% to {matchedWorker.name} via UPI, and 10% to the Cooperative Welfare Corpus.
            </p>
          </div>

          <div className="py-2">
            <label className="block text-xs font-mono font-bold text-slate-400 mb-2">RATE WORKER TELEMETRY:</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-transform hover:scale-125 ${star <= rating ? 'text-amber-400' : 'text-slate-700'}`}
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-md transition-all"
          >
            Dispatch Another Service
          </button>
        </div>
      )}
    </div>
  );
}
