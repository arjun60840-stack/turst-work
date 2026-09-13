import { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  CheckBadgeIcon, 
  MapPinIcon, 
  PhoneIcon, 
  CurrencyRupeeIcon, 
  ShieldCheckIcon,
  ClockIcon,
  SparklesIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  BoltIcon,
  PhotoIcon,
  PlusIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

export default function WorkerPortal() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [incomingJob, setIncomingJob] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(30);
  const [jobState, setJobState] = useState<'idle' | 'en_route' | 'in_progress' | 'completed'>('idle');
  const [otpInput, setOtpInput] = useState<string>('');
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  
  // Materials / Parts used during job
  const [parts, setParts] = useState<{ name: string; cost: number }[]>([
    { name: '10A Ceramic Fuse & Wire', cost: 120 },
  ]);
  const [newPartName, setNewPartName] = useState('');
  const [newPartCost, setNewPartCost] = useState('');

  // Wallet
  const [walletBalance, setWalletBalance] = useState<number>(3840);
  const [payoutSuccess, setPayoutSuccess] = useState<boolean>(false);

  // Rapido-style countdown timer
  useEffect(() => {
    let timer: any;
    if (incomingJob && countdown > 0 && jobState === 'idle') {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && incomingJob) {
      setIncomingJob(false);
    }
    return () => clearInterval(timer);
  }, [incomingJob, countdown, jobState]);

  const handleAcceptJob = () => {
    setIncomingJob(false);
    setJobState('en_route');
  };

  const handleRejectJob = () => {
    setIncomingJob(false);
  };

  const handleVerifyOtp = () => {
    if (otpInput === '4829' || otpInput.length === 4) {
      setOtpVerified(true);
      setJobState('in_progress');
    } else {
      alert('Please enter 4-digit code (Demo OTP: 4829)');
    }
  };

  const handleAddPart = () => {
    if (newPartName && newPartCost) {
      setParts([...parts, { name: newPartName, cost: parseFloat(newPartCost) || 0 }]);
      setNewPartName('');
      setNewPartCost('');
    }
  };

  const handleCompleteJob = () => {
    setJobState('completed');
    setWalletBalance(prev => prev + 950);
  };

  const handleWithdraw = () => {
    setPayoutSuccess(true);
    setTimeout(() => {
      setWalletBalance(0);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Worker Header & Telemetry Status */}
      <div className="tech-glass-card rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-emerald-500/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-black font-mono text-white shadow-lg shadow-emerald-500/20">
                SG
              </div>
              <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#090D16] flex items-center justify-center ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-white">Santosh Gavit</h2>
                <CheckBadgeIcon className="w-5 h-5 text-cyan-400" title="DigiLocker Verified" />
                <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  CREW LEAD
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-mono font-semibold mt-0.5">
                Combine Harvester & Daily-Wage Agricultural Crew
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                Sahyadri Agro Labour Sahakari • Nashik District
              </p>
            </div>
          </div>

          {/* Online / Offline Switch */}
          <div className="flex items-center space-x-3 bg-slate-950/80 p-2 rounded-2xl border border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-300">
              {isOnline ? '🟢 MESH ONLINE' : '⚪ OFFLINE'}
            </span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${isOnline ? 'bg-emerald-500' : 'bg-slate-700'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isOnline ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        {/* Quick Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 text-[10px] uppercase block font-bold">RATING</span>
            <span className="text-base font-black text-amber-400">⭐ 4.92 / 5.0</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase block font-bold">COMPLETED GIGS</span>
            <span className="text-base font-black text-white">112 JOBS</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase block font-bold">RELIABILITY INDEX</span>
            <span className="text-base font-black text-emerald-400">98% PERFECT</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase block font-bold">WALLET BALANCE</span>
            <span className="text-base font-black text-cyan-400">₹{walletBalance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Rapido-Style Incoming Job Card */}
      {isOnline && incomingJob && jobState === 'idle' && (
        <div className="tech-glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-cyan-500/60 relative overflow-hidden animate-pulse-subtle">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>⚡ INCOMING GIG DISPATCH DETECTED</span>
            </div>

            {/* Circular Countdown Timer */}
            <div className="w-14 h-14 rounded-full border-4 border-amber-400 flex items-center justify-center font-mono font-black text-amber-300 text-base bg-slate-950 shadow-lg shadow-amber-500/20">
              {countdown}s
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-xl font-black text-white">
                Paddy Harvesting & Threshing Crew (4 Workers)
              </h3>
              <p className="text-xs text-slate-300 flex items-center font-mono">
                <MapPinIcon className="w-4 h-4 mr-1 text-cyan-400" />
                Suresh Patel Farm • Nashik Rural (2.4 km away)
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono pt-1">
                <span className="px-2 py-0.5 rounded-md bg-slate-900 text-cyan-400 border border-slate-800">DAILY-WAGE CREW</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/30">FULL DAY</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-400 border border-amber-500/30">+₹150 EMERGENCY BONUS</span>
              </div>
            </div>

            {/* Guaranteed Earnings Box */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">GUARANTEED 80% PAYOUT:</span>
              <span className="text-3xl font-black text-emerald-400 mt-1 block">₹4,800</span>
              <span className="text-[10px] text-cyan-400 block mt-1">ESCROW FUNDED</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-3">
            <button
              onClick={handleRejectJob}
              className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 font-mono font-bold text-xs transition-colors border border-slate-800 flex items-center justify-center space-x-1"
            >
              <XMarkIcon className="w-4 h-4" />
              <span>PASS TO NEXT COOP MEMBER</span>
            </button>
            <button
              onClick={handleAcceptJob}
              className="flex-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-black text-xs shadow-lg shadow-emerald-600/40 transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircleIcon className="w-5 h-5" />
              <span>ACCEPT JOB & LOCK ESCROW</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Job Execution Workflow */}
      {jobState === 'en_route' && (
        <div className="tech-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 uppercase">
                // STEP 1: TRAVELING TO LOCATION
              </span>
              <h3 className="text-lg font-extrabold text-white mt-1">
                Navigating to Suresh Patel Farm (Nashik Rural)
              </h3>
            </div>
            <button 
              onClick={() => alert('Launching Google Maps / MapMyIndia navigation to farmstead coordinates')}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <MapPinIcon className="w-4 h-4" />
              <span>Open GPS Turn-by-Turn</span>
            </button>
          </div>

          {/* Arrival OTP Input */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 max-w-md mx-auto text-center space-y-4">
            <ShieldCheckIcon className="w-10 h-10 text-cyan-400 mx-auto" />
            <div>
              <h4 className="font-bold text-white text-sm">Customer Arrival OTP Verification</h4>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Ask customer for their 4-digit security code upon reaching the farmstead.
              </p>
            </div>

            <div className="flex justify-center space-x-2">
              <input
                type="text"
                maxLength={4}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="4829"
                className="w-40 py-2.5 text-center font-mono font-black text-xl rounded-xl border-2 border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 tracking-widest bg-slate-900 text-white"
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-colors shadow-xs font-mono"
            >
              VERIFY OTP & START WORK
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Work in Progress with Parts Entry */}
      {jobState === 'in_progress' && (
        <div className="tech-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 uppercase">
                // STEP 2: IN-PROGRESS EXECUTION
              </span>
              <h3 className="text-lg font-extrabold text-white mt-1">
                Paddy Harvesting & Threshing Crew Execution
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/40">
              GEOFENCE CHECK-IN VERIFIED ✅
            </span>
          </div>

          {/* Parts & Extra Consumables */}
          <div className="space-y-3 font-mono">
            <h4 className="font-bold text-white text-sm">Spare Parts, Fuel & Consumables (Added to Bill):</h4>
            <div className="space-y-2">
              {parts.map((p, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="font-semibold text-slate-300">{p.name}</span>
                  <span className="font-bold text-cyan-400">₹{p.cost}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 font-sans">
              <input
                type="text"
                placeholder="Item name (e.g., Diesel 5L, Belt)..."
                value={newPartName}
                onChange={(e) => setNewPartName(e.target.value)}
                className="flex-2 p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="number"
                placeholder="Cost (₹)"
                value={newPartCost}
                onChange={(e) => setNewPartCost(e.target.value)}
                className="flex-1 p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
              />
              <button
                onClick={handleAddPart}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition-colors flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
          </div>

          {/* Photo Proof */}
          <div className="border border-dashed border-slate-700 rounded-2xl p-4 bg-slate-950 text-center cursor-pointer hover:bg-slate-900 transition-colors">
            <PhotoIcon className="w-8 h-8 text-cyan-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-slate-300">Upload Completed Work Photo Proof</p>
            <p className="text-[10px] text-slate-500">Verifies quality to eliminate dispute holds</p>
          </div>

          {/* Complete Button */}
          <button
            onClick={handleCompleteJob}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-black text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            <span>MARK JOB COMPLETED & RELEASE ESCROW</span>
          </button>
        </div>
      )}

      {/* Completed State */}
      {jobState === 'completed' && (
        <div className="tech-glass-card rounded-3xl p-8 max-w-lg mx-auto text-center border border-emerald-500/40 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-white font-mono">JOB COMPLETE & PAID</h3>
          <p className="text-xs text-slate-400">
            ₹4,800 wage deposited directly into your Work Trust wallet. 10% cooperative welfare credit recorded.
          </p>
          <button
            onClick={() => {
              setJobState('idle');
              setIncomingJob(false);
            }}
            className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-colors"
          >
            RETURN TO AVAILABLE QUEUE
          </button>
        </div>
      )}

      {/* Worker Wallet & Transparent Earnings Card */}
      <div className="tech-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-base font-black text-white font-mono uppercase tracking-wide">// WORKER WALLET & INSTANT PAYOUTS</h3>
            <p className="text-xs text-slate-400">Guaranteed 80% minimum payout with instant NPCI UPI transfers</p>
          </div>

          <button
            onClick={handleWithdraw}
            disabled={walletBalance === 0}
            className={`px-5 py-2.5 rounded-xl font-mono font-bold text-xs flex items-center space-x-2 transition-all ${
              walletBalance > 0 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30' 
                : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
            }`}
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>WITHDRAW TO UPI (santosh@oksbi)</span>
          </button>
        </div>

        {payoutSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-mono font-semibold flex items-center justify-between animate-in fade-in duration-200">
            <span>✅ ₹{walletBalance.toLocaleString()} transferred to santosh@oksbi via UPI Auto-Disbursement!</span>
            <span className="font-mono text-[10px]">NPCI-WT-9821</span>
          </div>
        )}

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">BASE LABOR PAY</span>
            <span className="text-lg font-black text-cyan-400 mt-1 block">₹3,840</span>
            <span className="text-[10px] text-slate-500 font-medium">80% guaranteed split</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">EMERGENCY & PEAK BONUS</span>
            <span className="text-lg font-black text-emerald-400 mt-1 block">+₹450</span>
            <span className="text-[10px] text-emerald-500 font-medium">100% to worker</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">COOP WELFARE (10%)</span>
            <span className="text-lg font-black text-purple-400 mt-1 block">₹480</span>
            <span className="text-[10px] text-purple-400 font-medium">In pension vault</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">PLATFORM OPS (10%)</span>
            <span className="text-lg font-black text-slate-300 mt-1 block">₹480</span>
            <span className="text-[10px] text-slate-500 font-medium">Servers & SMS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
