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
  PlusIcon
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
      setIncomingJob(false); // auto-reassign when expired
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
      alert('Please enter a 4-digit code (Use demo OTP: 4829)');
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
      {/* Worker Header & Online Status Toggle */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                SG
              </div>
              <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`}>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black">Santosh Gavit</h2>
                <CheckBadgeIcon className="w-5 h-5 text-blue-400" title="DigiLocker Verified" />
              </div>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                Primary Trade: Combine Harvester & Daily-Wage Farm Crew Lead
              </p>
              <p className="text-[11px] text-slate-400">
                Sahyadri Agro Labour Sahakari • Nashik District
              </p>
            </div>
          </div>

          {/* Online / Offline Switch */}
          <div className="flex items-center space-x-3 bg-slate-800/80 p-2 rounded-2xl border border-slate-700">
            <span className="text-xs font-bold text-slate-300">
              {isOnline ? '🟢 Available for Gigs' : '⚪ Offline'}
            </span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${isOnline ? 'bg-emerald-500' : 'bg-slate-600'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isOnline ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Customer Rating</span>
            <span className="text-base font-extrabold text-amber-400">⭐ 4.92 / 5.0</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Gigs Completed</span>
            <span className="text-base font-extrabold text-white">112 Jobs</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Reliability Score</span>
            <span className="text-base font-extrabold text-emerald-400">98% Perfect</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Wallet Balance</span>
            <span className="text-base font-extrabold text-emerald-300">₹{walletBalance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Rapido-Style Incoming Job Card (When Online & Idle) */}
      {isOnline && incomingJob && jobState === 'idle' && (
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-blue-400/50 animate-bounce-short relative overflow-hidden">
          {/* Top Bar with 30s Countdown Ring */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>⚡ New High-Priority Job Request</span>
            </div>

            {/* Circular Countdown */}
            <div className="w-12 h-12 rounded-full border-4 border-amber-400 flex items-center justify-center font-black text-amber-300 text-sm bg-black/40">
              {countdown}s
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-xl font-black text-white">
                Paddy Harvesting & Threshing Crew (4 Workers)
              </h3>
              <p className="text-xs text-blue-200 flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1 text-emerald-400" />
                Suresh Patel Farm • Nashik Rural, MH (2.4 km away)
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] pt-1">
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-medium">Daily-Wage Crew</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-medium">Full Day Contract</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-medium">+₹150 Emergency Bonus</span>
              </div>
            </div>

            {/* Guaranteed Earnings Box */}
            <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-[11px] text-slate-300 block uppercase font-bold">Your 80% Payout:</span>
              <span className="text-2xl font-black text-emerald-400">₹4,800</span>
              <span className="text-[10px] text-blue-200 block mt-1">Escrow Funded (Instant Release)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-3">
            <button
              onClick={handleRejectJob}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs transition-colors border border-white/15 flex items-center justify-center space-x-1"
            >
              <XMarkIcon className="w-4 h-4" />
              <span>Pass to Next Cooperative Member</span>
            </button>
            <button
              onClick={handleAcceptJob}
              className="flex-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/40 transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircleIcon className="w-5 h-5" />
              <span>ACCEPT JOB (Book Now)</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Job Execution Workflow */}
      {jobState === 'en_route' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase">
                Step 1 of 3: Traveling to Location
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                Navigating to Suresh Patel Farm (Nashik Rural)
              </h3>
            </div>
            <button 
              onClick={() => alert('Launching Google Maps / MapMyIndia navigation to farmstead coordinates')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <MapPinIcon className="w-4 h-4" />
              <span>Open GPS Turn-by-Turn</span>
            </button>
          </div>

          {/* Arrival OTP Input */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 max-w-md mx-auto text-center space-y-4">
            <ShieldCheckIcon className="w-10 h-10 text-blue-600 mx-auto" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Customer Arrival OTP Verification</h4>
              <p className="text-xs text-slate-500 mt-0.5">
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
                className="w-40 py-2.5 text-center font-mono font-black text-xl rounded-xl border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 tracking-widest bg-white"
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Verify OTP & Start Work
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Work in Progress with Parts / Materials Entry */}
      {jobState === 'in_progress' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase">
                Step 2 of 3: Service In-Progress
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                Paddy Harvesting & Threshing Crew Execution
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              GPS Verified Arrival ✅
            </span>
          </div>

          {/* Parts & Materials Cost Entry */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Parts, Fuel & Extra Consumables (Added to Bill):</h4>
            <div className="space-y-2">
              {parts.map((p, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-800">{p.name}</span>
                  <span className="font-bold text-slate-900">₹{p.cost}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Item name (e.g., Diesel 5L, Harvester Belt)..."
                value={newPartName}
                onChange={(e) => setNewPartName(e.target.value)}
                className="flex-2 p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Cost (₹)"
                value={newPartCost}
                onChange={(e) => setNewPartCost(e.target.value)}
                className="flex-1 p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddPart}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
          </div>

          {/* Photo Proof Upload */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50 text-center cursor-pointer hover:bg-slate-100 transition-colors">
            <PhotoIcon className="w-8 h-8 text-blue-600 mx-auto mb-1" />
            <p className="text-xs font-bold text-slate-700">Upload Completed Work Photo Proof</p>
            <p className="text-[10px] text-slate-400">Verifies quality to eliminate dispute holds</p>
          </div>

          {/* Complete Button */}
          <button
            onClick={handleCompleteJob}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            <span>Mark Job Completed & Request Customer Sign-off</span>
          </button>
        </div>
      )}

      {/* Completed State */}
      {jobState === 'completed' && (
        <div className="bg-white rounded-3xl p-8 max-w-lg mx-auto text-center shadow-md border border-slate-200/80 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Job Complete & Paid!</h3>
          <p className="text-xs text-slate-500">
            ₹4,800 wage deposited directly into your Work Trust wallet. 10% cooperative welfare credit recorded.
          </p>
          <button
            onClick={() => {
              setJobState('idle');
              setIncomingJob(false);
            }}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
          >
            Back to Available Queue
          </button>
        </div>
      )}

      {/* Worker Wallet & Transparent Earnings Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Worker Wallet & Direct Payouts</h3>
            <p className="text-xs text-slate-500">Guaranteed 80% minimum payout with instant NPCI UPI transfers</p>
          </div>

          <button
            onClick={handleWithdraw}
            disabled={walletBalance === 0}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all ${
              walletBalance > 0 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>Withdraw to UPI (santosh@oksbi)</span>
          </button>
        </div>

        {payoutSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center justify-between animate-in fade-in duration-200">
            <span>✅ ₹{walletBalance.toLocaleString()} successfully transferred to santosh@oksbi via UPI Auto-Disbursement!</span>
            <span className="font-mono text-[10px]">NPCI-WT-9821</span>
          </div>
        )}

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <span className="text-slate-500 text-[11px] block">Base Labor Pay</span>
            <span className="text-base font-extrabold text-blue-900 mt-1 block">₹3,840</span>
            <span className="text-[10px] text-blue-600 font-medium">80% guaranteed split</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-slate-500 text-[11px] block">Emergency & Peak Bonus</span>
            <span className="text-base font-extrabold text-emerald-900 mt-1 block">+₹450</span>
            <span className="text-[10px] text-emerald-700 font-medium">100% passed to worker</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
            <span className="text-slate-500 text-[11px] block">Coop Welfare Credit (10%)</span>
            <span className="text-base font-extrabold text-purple-900 mt-1 block">₹480</span>
            <span className="text-[10px] text-purple-700 font-medium">In your pension vault</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-500 text-[11px] block">Platform Fee (10%)</span>
            <span className="text-base font-extrabold text-slate-800 mt-1 block">₹480</span>
            <span className="text-[10px] text-slate-500 font-medium">Cloud & SMS servers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
