import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPinIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  TrophyIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';

export interface WorkerProfile {
  id: string;
  name: string;
  trade: string;
  tagline: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  jobsCompleted: number;
  onTimeRate: string;
  wage: string;
  wageUnit: string;
  distance: string;
  eta: string;
  aiMatch: number;
  cooperative: string;
  skills: string[];
  photoUrl: string;
  fallbackSvg: string;
  color: string;
  accentBadge: string;
}

export const WORKER_PROFILES: WorkerProfile[] = [
  {
    id: 'electrician',
    name: 'Rajesh Sharma',
    trade: 'Master Electrician',
    tagline: 'Industrial Wiring & Smart Energy Setup',
    experience: '8+ Years Exp',
    rating: 4.96,
    reviewsCount: 342,
    jobsCompleted: 580,
    onTimeRate: '99.2%',
    wage: '₹550',
    wageUnit: '/ hr',
    distance: '1.8 km',
    eta: '10 min',
    aiMatch: 98,
    cooperative: 'Bhubaneswar Urban Power Guild',
    skills: ['3-Phase Wiring', 'Circuit Breakers', 'Solar Inverters', 'Safety Compliance'],
    photoUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80',
    fallbackSvg: '/assets/workers/electrician.svg',
    color: 'from-blue-600 to-indigo-700',
    accentBadge: 'High Voltage Certified'
  },
  {
    id: 'plumber',
    name: 'Sunil Mahapatra',
    trade: 'Hydro & Pipeline Specialist',
    tagline: 'Leak Detection & High-Pressure Piping',
    experience: '6+ Years Exp',
    rating: 4.92,
    reviewsCount: 289,
    jobsCompleted: 440,
    onTimeRate: '98.5%',
    wage: '₹480',
    wageUnit: '/ hr',
    distance: '2.4 km',
    eta: '14 min',
    aiMatch: 96,
    cooperative: 'Coastal Trades Federation',
    skills: ['PPR & CPVC Piping', 'Hydrojetting', 'Bathroom Fitouts', 'Pump Systems'],
    photoUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    fallbackSvg: '/assets/workers/plumber.svg',
    color: 'from-teal-600 to-emerald-700',
    accentBadge: 'Zero-Leak Warranty'
  },
  {
    id: 'carpenter',
    name: 'Vikram Soren',
    trade: 'Joinery & Modular Carpenter',
    tagline: 'Custom Woodwork & Modular Installations',
    experience: '11+ Years Exp',
    rating: 4.98,
    reviewsCount: 412,
    jobsCompleted: 710,
    onTimeRate: '99.6%',
    wage: '₹620',
    wageUnit: '/ hr',
    distance: '3.1 km',
    eta: '18 min',
    aiMatch: 99,
    cooperative: 'Craftsmen Guild of Odisha',
    skills: ['Modular Kitchens', 'Hardwood Joinery', 'Acoustic Paneling', 'Door Hardware'],
    photoUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80',
    fallbackSvg: '/assets/workers/carpenter.svg',
    color: 'from-amber-600 to-yellow-700',
    accentBadge: 'Precision Joinery'
  },
  {
    id: 'painter',
    name: 'Amit Kumar Sen',
    trade: 'Architectural Finish Painter',
    tagline: 'Airless Spray, Stucco & Waterproofing',
    experience: '7+ Years Exp',
    rating: 4.91,
    reviewsCount: 220,
    jobsCompleted: 390,
    onTimeRate: '97.8%',
    wage: '₹450',
    wageUnit: '/ hr',
    distance: '2.9 km',
    eta: '16 min',
    aiMatch: 94,
    cooperative: 'Allied Artisans Collective',
    skills: ['Texture Finishes', 'Anti-Fungal Coats', 'Airless Spray', 'Exterior Sealing'],
    photoUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=80',
    fallbackSvg: '/assets/workers/painter.svg',
    color: 'from-rose-600 to-pink-700',
    accentBadge: 'Dust-Free Sanding'
  },
  {
    id: 'mason',
    name: 'Dharmendra Nayak',
    trade: 'Civil Mason & Tile Layer',
    tagline: 'Structural Concrete & Precision Tiling',
    experience: '12+ Years Exp',
    rating: 4.95,
    reviewsCount: 510,
    jobsCompleted: 830,
    onTimeRate: '98.9%',
    wage: '₹680',
    wageUnit: '/ hr',
    distance: '4.2 km',
    eta: '22 min',
    aiMatch: 97,
    cooperative: 'Capital Builders Federation',
    skills: ['Laser Level Tiling', 'RCC Brickwork', 'Plaster Restoration', 'Granite Fitting'],
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=900&q=80',
    fallbackSvg: '/assets/workers/mason.svg',
    color: 'from-slate-700 to-zinc-900',
    accentBadge: 'Laser-Precision'
  },
  {
    id: 'agri',
    name: 'Ramesh Pradhan',
    trade: 'Agri-Crew & Irrigation Lead',
    tagline: 'Precision Crop Operations & Drip Systems',
    experience: '9+ Years Exp',
    rating: 4.94,
    reviewsCount: 318,
    jobsCompleted: 620,
    onTimeRate: '99.1%',
    wage: '₹1,800',
    wageUnit: '/ crew day',
    distance: '5.5 km',
    eta: '25 min',
    aiMatch: 95,
    cooperative: 'Kisan Shakti Cooperative',
    skills: ['Drip Irrigation', 'Harvest Management', 'Heavy Equipment Ops', 'Soil Prep'],
    photoUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=900&q=80',
    fallbackSvg: '/assets/workers/agri.svg',
    color: 'from-emerald-700 to-green-800',
    accentBadge: 'Team Lead Verified'
  },
  {
    id: 'cleaner',
    name: 'Pooja Behera',
    trade: 'Industrial Deep Cleaner',
    tagline: 'Steam Extraction & Hospital-Grade Hygiene',
    experience: '5+ Years Exp',
    rating: 4.97,
    reviewsCount: 460,
    jobsCompleted: 680,
    onTimeRate: '99.5%',
    wage: '₹420',
    wageUnit: '/ hr',
    distance: '1.5 km',
    eta: '8 min',
    aiMatch: 99,
    cooperative: 'Urban Green Sanitation League',
    skills: ['Steam Disinfection', 'Post-Construction Clean', 'HVAC Duct Clean', 'Eco Detergents'],
    photoUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    fallbackSvg: '/assets/workers/cleaner.svg',
    color: 'from-indigo-600 to-purple-700',
    accentBadge: 'Hospital Sanitized'
  },
  {
    id: 'technician',
    name: 'Alok Ranjan Das',
    trade: 'HVAC & Inverter Technician',
    tagline: 'Smart Inverter Diagnostics & Chiller Repair',
    experience: '8+ Years Exp',
    rating: 4.93,
    reviewsCount: 375,
    jobsCompleted: 540,
    onTimeRate: '98.7%',
    wage: '₹580',
    wageUnit: '/ hr',
    distance: '2.1 km',
    eta: '12 min',
    aiMatch: 96,
    cooperative: 'Smart Tech Service Union',
    skills: ['Gas Charging R32/R410', 'PCB Diagnostics', 'Split/Cassette AC', 'Energy Auditing'],
    photoUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
    fallbackSvg: '/assets/workers/technician.svg',
    color: 'from-cyan-600 to-blue-700',
    accentBadge: 'OEM Certified'
  }
];

export const WorkerShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto advance every 3.5s unless paused or tab invisible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else if (!isPaused) {
        startTimer();
      }
    };

    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % WORKER_PROFILES.length);
      }, 3500);
    };

    if (!isPaused && !document.hidden) {
      startTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + WORKER_PROFILES.length) % WORKER_PROFILES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % WORKER_PROFILES.length);
  };

  const handleImageError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div 
      className="relative w-full max-w-xl mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Outer Glow Halo */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600 rounded-3xl blur-xl opacity-30 animate-pulse" />

      {/* Main Card Container */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900/95 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
        
        {/* Top Control Bar with Trade Badges */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Live Verified Talent
            </span>
            <span className="text-xs text-slate-400">• Trade {currentIndex + 1} of {WORKER_PROFILES.length}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous worker"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next worker"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Worker Showcase Carousel Content with seamless transition */}
        <div className="relative h-[480px] sm:h-[520px] overflow-hidden">
          {WORKER_PROFILES.map((worker, index) => {
            const isActive = index === currentIndex;
            const useFallback = imgError[worker.id];
            const imageSrc = useFallback ? worker.fallbackSvg : worker.photoUrl;

            return (
              <div
                key={worker.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  isActive 
                    ? 'opacity-100 scale-100 pointer-events-auto z-10' 
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                {/* Background Photo with dynamic gradient overlay */}
                <div className="relative w-full h-full">
                  <img
                    src={imageSrc}
                    alt={worker.name}
                    onError={() => handleImageError(worker.id)}
                    className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out hover:scale-105"
                  />
                  {/* Subtle Top Gradient for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
                  
                  {/* Trade Theme Accent Glow */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${worker.color} opacity-30 rounded-full blur-3xl`} />
                </div>

                {/* Floating Top Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg backdrop-blur-md">
                    <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cooperative Verified</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/90 text-white text-xs font-extrabold shadow-lg backdrop-blur-md border border-blue-400/40 animate-pulse">
                    <SparklesIcon className="w-3.5 h-3.5" />
                    <span>AI Match {worker.aiMatch}%</span>
                  </div>
                </div>

                {/* Mid Floating Badges */}
                <div className="absolute top-16 left-4 flex flex-col gap-2 pointer-events-none">
                  <div className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-slate-200 text-[11px] font-semibold backdrop-blur-md flex items-center gap-1 w-fit">
                    <TrophyIcon className="w-3 h-3 text-amber-400" />
                    <span>{worker.accentBadge}</span>
                  </div>
                </div>

                {/* Floating Bottom Info Pill (Distance & Pricing) */}
                <div className="absolute bottom-[230px] sm:bottom-[210px] left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 text-slate-200 text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <MapPinIcon className="w-3.5 h-3.5 text-rose-400" />
                    <span>{worker.distance}</span>
                    <span className="text-slate-500">•</span>
                    <ClockIcon className="w-3.5 h-3.5 text-teal-400" />
                    <span>{worker.eta}</span>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <BanknotesIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{worker.wage}</span>
                    <span className="text-emerald-400 font-normal text-[11px]">{worker.wageUnit}</span>
                  </div>
                </div>

                {/* Bottom Glass Card - Transitions seamlessly with the worker */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent border-t border-slate-800/80">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {worker.name}
                        </h3>
                        <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>

                      <p className="text-sm font-bold text-teal-400">
                        {worker.trade}
                      </p>

                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {worker.tagline}
                      </p>
                    </div>

                    {/* Rating Pill */}
                    <div className="flex flex-col items-end shrink-0">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-black text-sm">
                        <StarIcon className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{worker.rating.toFixed(2)}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        {worker.reviewsCount} reviews
                      </span>
                    </div>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {worker.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Reliability & Cooperative Trust Bar */}
                  <div className="mt-3 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-teal-400" />
                      <span className="text-slate-300 font-semibold">{worker.onTimeRate}</span>
                      <span>On-Time Arrival</span>
                    </div>

                    <div className="text-slate-400 text-[11px] truncate max-w-[180px]">
                      🏛️ {worker.cooperative}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Thumbnail / Pill Indicators */}
        <div className="px-4 py-3 bg-slate-950 border-t border-slate-800/70 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none max-w-[340px] sm:max-w-md">
            {WORKER_PROFILES.map((w, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={w.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isSelected 
                      ? 'w-7 bg-gradient-to-r from-blue-500 to-teal-400' 
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Select ${w.trade}`}
                  title={w.trade}
                />
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 font-medium shrink-0 ml-2">
            Auto-advancing 3.5s {isPaused && '(Paused)'}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkerShowcase;
