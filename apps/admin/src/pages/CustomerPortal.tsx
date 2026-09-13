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
      // Auto pick Labourer for farm harvesting
      const labour = DEFAULT_SERVICE_CATEGORIES.find(c => c.id === 'labourer') || DEFAULT_SERVICE_CATEGORIES[7];
      setSelectedCategory(labour);
      setSelectedSubcat('Crop Harvesting & Threshing');
      setProblemNotes('2 workers required for sugarcane & paddy harvesting at farm field #4');
      setStep('details');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Customer Portal Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold mb-2">
              <SparklesIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>Customer / Farmer Self-Service Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Book Verified Rural & Household Services
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/90 mt-1">
              Guaranteed fair rates, zero private aggregator exploitation, and 100% cooperative backed.
            </p>
          </div>

          {/* Language & Emergency Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Language Switcher */}
            <div className="flex bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/15 text-xs font-semibold">
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-3 py-1.5 rounded-lg transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('hi')} 
                className={`px-3 py-1.5 rounded-lg transition-colors ${language === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                हिन्दी
              </button>
              <button 
                onClick={() => setLanguage('mr')} 
                className={`px-3 py-1.5 rounded-lg transition-colors ${language === 'mr' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                मराठी
              </button>
              <button 
                onClick={() => setLanguage('pa')} 
                className={`px-3 py-1.5 rounded-lg transition-colors ${language === 'pa' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
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
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20'
              }`}
            >
              <BoltIcon className="w-4 h-4 text-amber-300" />
              <span>{isEmergency ? '⚡ Emergency Mode: ON' : 'Emergency SOS'}</span>
            </button>
          </div>
        </div>

        {/* Voice-First Smart Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 relative z-10">
          <div className="relative flex-1 w-full">
            <MapPinIcon className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              placeholder="Your village / farm location..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleVoiceBooking}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-md ${
              voiceActive 
                ? 'bg-rose-600 ring-4 ring-rose-500/40 animate-pulse' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
            }`}
          >
            <MicrophoneIcon className="w-4 h-4" />
            <span>{voiceActive ? 'Listening in हिन्दी / मराठी...' : 'Voice Booking (बोलकर बुक करें)'}</span>
          </button>
        </div>
      </div>

      {/* Booking Flow Wizard */}
      {step === 'category' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Select Service Category</h3>
              <p className="text-xs text-slate-500">14 Verified Trade & Agricultural Services Backed by Cooperatives</p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              14 Categories Available
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
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500 shadow-md' 
                      : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  {isLabourer && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-500 text-white uppercase tracking-wider">
                      High Demand
                    </span>
                  )}

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-100 text-2xl flex items-center justify-center transition-colors mb-3">
                      {cat.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-700">₹{cat.baseWage} <span className="text-[10px] font-normal text-slate-400">base</span></span>
                    <span className="text-[11px] font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center">
                      Book <ArrowRightIcon className="w-3 h-3 ml-0.5" />
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedCategory.icon}</span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">{selectedCategory.name}</h3>
                <p className="text-xs text-slate-500">Subcategory & Problem Specifications</p>
              </div>
            </div>
            <button 
              onClick={() => setStep('category')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Change Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {/* Subcategories */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
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
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Describe Problem / Work Requirement:
                </label>
                <textarea
                  rows={3}
                  value={problemNotes}
                  onChange={(e) => setProblemNotes(e.target.value)}
                  placeholder="e.g., Need 2 daily-wage workers for 1 full day sugarcane cutting and field clearing..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Photo Upload Mockup */}
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex items-center justify-center space-x-3 cursor-pointer hover:bg-slate-100 transition-colors">
                <PhotoIcon className="w-6 h-6 text-slate-400" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-700">Attach Site / Equipment Photo (Optional)</p>
                  <p className="text-[10px] text-slate-400">Helps the cooperative worker bring the exact tools needed</p>
                </div>
              </div>
            </div>

            {/* Price Estimate Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3">Transparent Price Estimate</h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Service Wage:</span>
                    <span className="font-semibold text-slate-900">₹{selectedCategory.baseWage}</span>
                  </div>
                  {isEmergency && (
                    <div className="flex justify-between text-rose-600 font-semibold">
                      <span>Emergency 30-min SOS:</span>
                      <span>+₹150</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Distance Fee (2.4 km):</span>
                    <span className="font-semibold text-slate-900">₹0 (Free)</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Cooperative Welfare Guarantee:</span>
                    <span className="text-emerald-700 font-semibold">Included</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Total Escrow Deposit:</span>
                    <span className="font-extrabold text-xl text-emerald-700">₹{calculateEstimate()}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100 text-[11px] text-blue-900 space-y-1">
                  <p className="font-bold">🛡️ Escrow Guarantee:</p>
                  <p className="text-blue-800 leading-snug">
                    Amount is held securely in smart escrow. Released to worker only AFTER you confirm satisfaction via arrival OTP.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep('matching')}
                className="w-full mt-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>Find Nearby Cooperative Worker</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Live AI Matching Radar */}
      {step === 'matching' && (
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-slate-200/80 space-y-6">
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            {/* Animated Radar Rings */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping"></div>
            <div className="absolute inset-4 rounded-full border-4 border-emerald-500/30 animate-pulse"></div>
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex flex-col items-center justify-center shadow-xl">
              <SparklesIcon className="w-6 h-6 text-amber-300 animate-spin" />
              <span className="text-xs font-bold mt-1">{matchCountdown}s</span>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900">
              Broadcasting to Nearby Cooperative Workers...
            </h3>
            <p className="text-xs text-slate-500">
              Searching within 5 km radius in Nashik District. Evaluating skill passport certifications and cooperative trust scores.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
            <span>3 Verified Cooperative Workers in Queue</span>
          </div>
        </div>
      )}

      {/* Step 4: Live Tracking & Service Execution */}
      {step === 'tracking' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6 animate-in fade-in duration-200">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
              <div>
                <h4 className="font-bold text-sm text-emerald-950">Worker Matched & Dispatched!</h4>
                <p className="text-xs text-emerald-800">Assigned from {matchedWorker.coop}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Arrival OTP Code:</span>
              <span className="text-lg font-mono font-black text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200">
                {matchedWorker.otp}
              </span>
            </div>
          </div>

          {/* Worker Profile Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {matchedWorker.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base flex items-center">
                      {matchedWorker.name}
                      <CheckBadgeIcon className="w-4 h-4 ml-1.5 text-blue-600" />
                    </h4>
                    <p className="text-xs text-slate-500">{matchedWorker.coop}</p>
                    <div className="flex items-center space-x-3 mt-1 text-xs">
                      <span className="text-amber-600 font-bold">⭐ {matchedWorker.rating}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{matchedWorker.jobs} gigs completed</span>
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
                    onClick={() => alert(`Opening encrypted chat with ${matchedWorker.name}`)}
                    className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-xs"
                    title="In-App Chat"
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Live Tracking Status */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold uppercase tracking-wider text-emerald-400">Live GPS Status</span>
                  <span className="font-mono text-slate-300">ETA: {matchedWorker.eta} ({matchedWorker.distance})</span>
                </div>

                {/* Progress Timeline */}
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded-lg bg-blue-600 text-white font-bold">1. Accepted</div>
                  <div className="p-2 rounded-lg bg-blue-600 text-white font-bold animate-pulse">2. On The Way</div>
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-400">3. In Progress</div>
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-400">4. Completed</div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed text-center">
                  Worker is currently traveling along Nashik-Pune Highway. Share the 4-digit OTP <strong>{matchedWorker.otp}</strong> upon arrival to verify GPS check-in.
                </p>
              </div>
            </div>

            {/* Complete Job Action Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Service Execution</h4>
                <p className="text-xs text-slate-500 mb-4">
                  Once the worker completes your task, confirm completion to release the escrow payment.
                </p>

                <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-semibold text-slate-800">{selectedCategory?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Agreed Wage:</span>
                    <span className="font-bold text-emerald-700">₹{calculateEstimate()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('completed')}
                className="w-full mt-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
              >
                Confirm Completion & Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Completed & Feedback */}
      {step === 'completed' && (
        <div className="bg-white rounded-3xl p-8 max-w-lg mx-auto text-center shadow-md border border-slate-200/80 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircleIcon className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">Job Completed Successfully!</h3>
            <p className="text-xs text-slate-500 mt-1">
              ₹{calculateEstimate()} escrow released: 80% directly to {matchedWorker.name} via UPI, and 10% to the Cooperative Welfare Corpus.
            </p>
          </div>

          {/* Rating */}
          <div className="py-2">
            <label className="block text-xs font-bold text-slate-700 mb-2">Rate Worker Performance:</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-transform hover:scale-125 ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`}
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
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Book Another Service
          </button>
        </div>
      )}
    </div>
  );
}
