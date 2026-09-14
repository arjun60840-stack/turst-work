import React, { useState, useEffect } from 'react';
import { 
  UsersIcon, 
  MapPinIcon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  KeyIcon, 
  ClipboardDocumentCheckIcon, 
  CreditCardIcon, 
  ArrowPathIcon,
  BoltIcon,
  Square3Stack3DIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export const SmartGroupMatchingVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState(4); // default on Map / Team formation
  const [isSimulating, setIsSimulating] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Job Requirement',
      desc: 'Customer submits multi-trade task: "Commercial Site Rewiring & Plumbing Overhaul"',
      tag: 'Requirement Ingestion',
      icon: Square3Stack3DIcon,
      accent: 'text-blue-400'
    },
    {
      id: 2,
      title: 'Number + Types of Workers',
      desc: 'System decomposes into 1 Master Electrician, 1 Senior Plumber, 2 Helper Craftsmen',
      tag: 'Composition Matrix',
      icon: UsersIcon,
      accent: 'text-teal-400'
    },
    {
      id: 3,
      title: 'Skill & Availability Filter',
      desc: 'Live query of 1,400+ cooperative members: KYC Level 3, safety ratings >4.8, instant availability',
      tag: 'Cooperative Verification',
      icon: ShieldCheckIcon,
      accent: 'text-indigo-400'
    },
    {
      id: 4,
      title: 'Approximate Distance Check',
      desc: 'Radial geo-filter limits worker cluster within 3.8 km to guarantee under 20-min synchronized arrival',
      tag: 'Geo-Distance Match',
      icon: MapPinIcon,
      accent: 'text-emerald-400'
    },
    {
      id: 5,
      title: '🗺️ Map & AI Team Formation',
      desc: 'Optimal multi-agent graph pairing closest available talent into cohesive unit',
      tag: 'Synergy Engine',
      icon: SparklesIcon,
      accent: 'text-amber-400'
    },
    {
      id: 6,
      title: 'Best Worker Group',
      desc: 'Team "Bhubaneswar Alpha" selected: 98.2% combined synergy index & lowest latency',
      tag: 'Consensus Match',
      icon: CheckCircleIcon,
      accent: 'text-emerald-400'
    },
    {
      id: 7,
      title: 'Group Booking',
      desc: 'Single unified client deposit securely locked into NEXVION Smart Escrow',
      tag: 'Smart Escrow Lock',
      icon: CreditCardIcon,
      accent: 'text-blue-400'
    },
    {
      id: 8,
      title: 'OTP + Attendance',
      desc: 'Geo-fenced arrival verified with client-issued 6-digit cryptographic OTP',
      tag: 'Zero Fraud Check-in',
      icon: KeyIcon,
      accent: 'text-purple-400'
    },
    {
      id: 9,
      title: 'Work Tracking',
      desc: 'Milestone checklist, safety compliance photo uploads, and live client chat',
      tag: 'Real-Time Audit',
      icon: ClipboardDocumentCheckIcon,
      accent: 'text-teal-400'
    },
    {
      id: 10,
      title: 'Fair Wage Distribution + Payment',
      desc: 'Automated instant disbursement direct to each worker bank account/UPI with zero deductions',
      tag: 'Transparent Payouts',
      icon: BoltIcon,
      accent: 'text-green-400'
    }
  ];

  // Auto progression demo if simulating
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsSimulating(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleSimulate = () => {
    setActiveStep(0);
    setIsSimulating(true);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <SparklesIcon className="w-3.5 h-3.5" />
            NEXVION Autonomous Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span>🤖 SMART GROUP MATCHING</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Watch how NEXVION takes a complex multi-worker project and instantly assembles, coordinates, tracks, and pays verified teams.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
              isSimulating
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white shadow-lg shadow-blue-500/20'
            }`}
          >
            <ArrowPathIcon className={`w-4 h-4 ${isSimulating ? 'animate-spin text-teal-300' : ''}`} />
            <span>{isSimulating ? 'Simulating Pipeline...' : 'Run Live Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Flow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left: 10-Step Timeline Pipeline */}
        <div className="lg:col-span-6 space-y-2.5 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
          {steps.map((step, idx) => {
            const isCurrent = idx === activeStep;
            const isPassed = idx < activeStep;

            return (
              <div
                key={step.id}
                onClick={() => {
                  setIsSimulating(false);
                  setActiveStep(idx);
                }}
                className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isCurrent
                    ? 'bg-blue-950/60 border-blue-500/60 shadow-lg shadow-blue-500/10 translate-x-1'
                    : isPassed
                    ? 'bg-slate-900/50 border-slate-800/80 opacity-85 hover:opacity-100 hover:bg-slate-800/50'
                    : 'bg-slate-950/40 border-slate-800/40 opacity-60 hover:opacity-90 hover:bg-slate-800/30'
                }`}
              >
                {/* Step Number Circle */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-110'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isPassed ? <CheckCircleIcon className="w-4 h-4" /> : step.id}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                      {step.title}
                    </h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50 shrink-0">
                      {step.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <ChevronRightIcon className={`w-4 h-4 text-slate-500 shrink-0 self-center transition ${isCurrent ? 'text-blue-400 translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
              </div>
            );
          })}
        </div>

        {/* Right: Map & Interactive Simulation Showcase */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Active Step Highlight Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-blue-950/40 border border-blue-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-bold text-blue-400 uppercase tracking-wider">
                Active Phase {activeStep + 1} of 10
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                NEXVION Protocol Active
              </span>
            </div>
            <h3 className="text-xl font-black text-white">
              {steps[activeStep].title}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {steps[activeStep].desc}
            </p>
          </div>

          {/* Map Simulation Diagram */}
          <div className="flex-1 min-h-[340px] rounded-2xl bg-slate-950 border border-slate-800 p-4 relative flex flex-col justify-between overflow-hidden shadow-inner">
            
            {/* Radar Sweep Effect */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  🗺️ Map Engine: Bhubaneswar Tech Zone
                </span>
              </div>
              <span className="text-[11px] text-teal-400 font-mono">Radius: 3.8 km</span>
            </div>

            {/* Central Visual Map / Network Graph */}
            <div className="relative my-auto py-6 flex items-center justify-center">
              
              {/* Concentric Geo-fence rings */}
              <div className="absolute w-64 h-64 rounded-full border border-blue-500/20 animate-ping opacity-25" />
              <div className="absolute w-52 h-52 rounded-full border border-teal-500/20" />
              <div className="absolute w-36 h-36 rounded-full border border-slate-700/40" />

              {/* Central Customer Node */}
              <div className="relative z-20 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-xl shadow-blue-500/30 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex flex-col items-center justify-center text-white">
                    <MapPinIcon className="w-5 h-5 text-rose-400 animate-bounce" />
                    <span className="text-[9px] font-black uppercase text-slate-300">Site</span>
                  </div>
                </div>
                <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-white shadow">
                  Client Location
                </div>
              </div>

              {/* Worker 1 Node (Top Left) */}
              <div className="absolute top-2 left-6 flex flex-col items-center animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/50 flex items-center justify-center shadow-lg text-xs font-bold">
                  ⚡
                </div>
                <span className="text-[9px] font-semibold text-slate-300 mt-1 bg-slate-900/80 px-1.5 rounded">
                  Rajesh (Elec) • 1.8km
                </span>
              </div>

              {/* Worker 2 Node (Top Right) */}
              <div className="absolute top-2 right-6 flex flex-col items-center animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-teal-600/30 border border-teal-400/50 flex items-center justify-center shadow-lg text-xs font-bold">
                  🔧
                </div>
                <span className="text-[9px] font-semibold text-slate-300 mt-1 bg-slate-900/80 px-1.5 rounded">
                  Sunil (Plumb) • 2.4km
                </span>
              </div>

              {/* Worker 3 Node (Bottom Center) */}
              <div className="absolute bottom-2 flex flex-col items-center animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-amber-600/30 border border-amber-400/50 flex items-center justify-center shadow-lg text-xs font-bold">
                  🧱
                </div>
                <span className="text-[9px] font-semibold text-slate-300 mt-1 bg-slate-900/80 px-1.5 rounded">
                  Dharmendra (Mason) • 2.9km
                </span>
              </div>

              {/* Visual Vector lines connecting to Customer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current text-blue-500/40" strokeWidth="1.5" strokeDasharray="4 4">
                <line x1="25%" y1="20%" x2="50%" y2="50%" />
                <line x1="75%" y1="20%" x2="50%" y2="50%" />
                <line x1="50%" y1="80%" x2="50%" y2="50%" />
              </svg>
            </div>

            {/* Bottom Matched Team Summary Bar */}
            <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold">
                  ✓ Team Alpha Formed
                </span>
                <span className="text-slate-400">Match Confidence: 98.2%</span>
              </div>
              <div className="text-slate-300 font-mono text-[11px]">
                Sync ETA: 14 mins
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SmartGroupMatchingVisual;
