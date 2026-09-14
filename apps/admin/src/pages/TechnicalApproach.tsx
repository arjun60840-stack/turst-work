import { useState } from 'react';
import { 
  SparklesIcon, 
  CpuChipIcon, 
  ServerIcon, 
  DevicePhoneMobileIcon, 
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function TechnicalApproach() {
  const [dailyGigs, setDailyGigs] = useState<number>(3);
  const [averageWage, setAverageWage] = useState<number>(650);

  // Earnings calculation comparison
  const monthlyGross = dailyGigs * averageWage * 26; // 26 working days
  const privatePlatformDeduction = monthlyGross * 0.28; // 28% private commission
  const privateNet = monthlyGross - privatePlatformDeduction;
  
  const workTrustWorkerNet = monthlyGross * 0.80; // 80% guaranteed
  const workTrustCoopWelfare = monthlyGross * 0.10; // 10% pension & health
  const workTrustPlatform = monthlyGross * 0.10; // 10% tech maintenance

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Enterprise Architecture Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950/90 to-indigo-950 p-8 text-white shadow-2xl relative overflow-hidden border border-cyan-500/30 tech-glow-blue">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 text-xs font-mono font-bold mb-3">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>ENTERPRISE SPECIFICATION & SYSTEM ARCHITECTURE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-sans">
            NEXVION: Technical Architecture & Cooperative Framework
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Decentralized Cooperative Platform for Skilled & Manual Labor. Combining AI geospatial dispatch, DigiLocker KYC, zero-trust geofencing, and instant 80/10/10 UPI escrow settlements.
          </p>
        </div>
      </div>

      {/* 1. Comparison: Private Gig Monopoly vs NEXVION Cooperative */}
      <div className="tech-glass-card rounded-3xl p-6 sm:p-8 space-y-4 border border-cyan-500/20">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h2 className="text-lg font-black text-white tracking-wide">
              1. Comparative Analysis: Private Aggregators vs NEXVION Cooperative
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Why the cooperative model is structurally superior for rural daily-wage labourers and technicians
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden font-sans">
            <thead className="bg-slate-900/90 text-slate-400 font-mono font-bold uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4">Evaluation Dimension</th>
                <th className="p-4 text-rose-400 bg-rose-950/20">Private Platforms (Urban Co, Uber, TaskRabbit)</th>
                <th className="p-4 text-emerald-400 bg-emerald-950/20">NEXVION (Cooperative Platform)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-mono text-[11px]">Platform Commission</td>
                <td className="p-4 text-rose-400 font-medium">25% – 35% cut + hidden surge penalty</td>
                <td className="p-4 text-emerald-400 font-bold font-mono">Flat 10% Ops + 10% Welfare (80% to Worker)</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-mono text-[11px]">Platform Ownership</td>
                <td className="p-4 text-slate-400">Foreign VC equity holders & private corporations</td>
                <td className="p-4 text-cyan-400 font-bold">100% Owned by Registered Rural Cooperatives & Guilds</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-mono text-[11px]">Social Security & Insurance</td>
                <td className="p-4 text-rose-400">Zero benefits; workers classified as disposable contractors</td>
                <td className="p-4 text-emerald-400 font-medium">Integrated e-Shram, group health insurance & education fund</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-mono text-[11px]">Payment Speed</td>
                <td className="p-4 text-slate-400">Weekly/monthly batches with arbitrary dispute holds</td>
                <td className="p-4 text-emerald-400 font-bold font-mono">Instant UPI settlement upon arrival OTP confirmation</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-mono text-[11px]">Dispatch Algorithm</td>
                <td className="p-4 text-slate-400">Opaque black-box prioritizing platform margin & penalties</td>
                <td className="p-4 text-cyan-400 font-medium font-mono">Open-source weighted scoring (Skill + Geofence + Rota fairness)</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white font-mono text-[11px]">Daily-Wage Labourer Inclusion</td>
                <td className="p-4 text-rose-400">Excluded (only focuses on high-margin urban salon/AC niches)</td>
                <td className="p-4 text-emerald-400 font-bold">First-class support for harvesters, loaders, and daily labourers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Technologies to be Used */}
      <div className="tech-glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-cyan-500/20">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h2 className="text-lg font-black text-white tracking-wide">
              2. Technology Stack & Architectural Specifications
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Production-grade stack engineered for high rural throughput and resilient offline operation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Layer 1: Frontend & Mobile */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-blue-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-400 flex items-center justify-center font-mono">
              <DevicePhoneMobileIcon className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-sm">Client Interfaces</h3>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>• <strong className="text-white">React 18 & Vite 5</strong>: Admin operations portal</li>
              <li>• <strong className="text-white">React Native / Expo Router</strong>: Mobile user app</li>
              <li>• <strong className="text-white">Tailwind CSS v4</strong>: Mobile-first responsive styling</li>
              <li>• <strong className="text-white">Recharts</strong>: Interactive analytics engine</li>
              <li>• <strong className="text-white">Web Speech API</strong>: Multilingual voice booking</li>
            </ul>
          </div>

          {/* Layer 2: Backend & Distributed Services */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center font-mono">
              <ServerIcon className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-sm">Backend Engine</h3>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>• <strong className="text-white">Node.js & TypeScript</strong>: Type-safe REST API</li>
              <li>• <strong className="text-white">Express.js & Knex.js</strong>: Query builder & migrations</li>
              <li>• <strong className="text-white">SQLite3 / PostgreSQL</strong>: 27 relational schemas</li>
              <li>• <strong className="text-white">Socket.io & WebSockets</strong>: Live radar & 30s timers</li>
              <li>• <strong className="text-white">JWT & bcryptjs</strong>: Role-based cryptographic auth</li>
            </ul>
          </div>

          {/* Layer 3: AI & Predictive Models */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-400 flex items-center justify-center font-mono">
              <CpuChipIcon className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-sm">AI & Forecasting</h3>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>• <strong className="text-white">Haversine Geospatial</strong>: Proximity search</li>
              <li>• <strong className="text-white">XGBoost Regressor</strong>: Kharif harvest surge</li>
              <li>• <strong className="text-white">Multi-criteria Rota Scoring</strong>: Fair wage equality</li>
              <li>• <strong className="text-white">TF-IDF & Cosine Match</strong>: Trade skill classification</li>
              <li>• <strong className="text-white">NLP Entity Extractor</strong>: Voice booking pipeline</li>
            </ul>
          </div>

          {/* Layer 4: Hardware, IoT & Gov APIs */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center font-mono">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-white text-sm">Hardware & Gov Rails</h3>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>• <strong className="text-white">GPS Geofencing</strong>: Farm boundary OTP lock</li>
              <li>• <strong className="text-white">DigiLocker & Aadhaar API</strong>: Instant e-KYC</li>
              <li>• <strong className="text-white">NPCI UPI 2.0 AutoSplit</strong>: Escrow disbursement</li>
              <li>• <strong className="text-white">SHA-256 Audit Hashes</strong>: Tamper-evident trail</li>
              <li>• <strong className="text-white">e-Shram Portal Sync</strong>: Social security linkage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Methodology & System Flowchart */}
      <div className="tech-glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-cyan-500/20">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h2 className="text-lg font-black text-white tracking-wide">
              3. Implementation Methodology & Core Process Flow
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Step-by-step lifecycle from voice booking to instant escrow disbursement
          </p>
        </div>

        {/* Visual Flow Chart Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1 hover:border-cyan-500/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-mono font-bold mx-auto flex items-center justify-center">1</div>
            <p className="font-bold text-white mt-2">Demand Ingestion</p>
            <p className="text-[11px] text-slate-400">Client books via voice/app across 14 categories. Escrow wage funded.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1 hover:border-cyan-500/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-mono font-bold mx-auto flex items-center justify-center">2</div>
            <p className="font-bold text-white mt-2">Geospatial Matching</p>
            <p className="text-[11px] text-slate-400">Nearest verified worker notified with 30s Rapido timer.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1 hover:border-cyan-500/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-mono font-bold mx-auto flex items-center justify-center">3</div>
            <p className="font-bold text-white mt-2">Geofence Check-in</p>
            <p className="text-[11px] text-slate-400">Worker arrives at client site. GPS boundary confirmed via 4-digit OTP.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1 hover:border-cyan-500/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-mono font-bold mx-auto flex items-center justify-center">4</div>
            <p className="font-bold text-white mt-2">Execution & Proof</p>
            <p className="text-[11px] text-slate-400">Work completed. Spare parts billed. Photo proof uploaded.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1 hover:border-emerald-400 transition-colors">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono font-bold mx-auto flex items-center justify-center">5</div>
            <p className="font-bold text-emerald-300 mt-2">80/10/10 Split</p>
            <p className="text-[11px] text-emerald-400/80 font-mono">80% instant UPI, 10% Welfare, 10% platform ops.</p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Earnings Calculator */}
      <div className="rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-500/30 space-y-6 tech-glass-card">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold mb-2">
            <CurrencyRupeeIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE FAIR WAGE SIMULATOR</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Calculate Worker Take-Home: Private Exploitation vs NEXVION
          </h2>
          <p className="text-xs text-slate-400">
            See how much more rural workers and daily labourers earn every month under our cooperative structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Sliders */}
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1 text-slate-300">
                <span>Average Completed Gigs per Day:</span>
                <span className="text-amber-400 text-sm font-mono font-extrabold">{dailyGigs} gigs</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={dailyGigs}
                onChange={(e) => setDailyGigs(parseInt(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1 text-slate-300">
                <span>Average Service Fee per Job (₹):</span>
                <span className="text-emerald-400 text-sm font-mono font-extrabold">₹{averageWage}</span>
              </div>
              <input
                type="range"
                min={300}
                max={1500}
                step={50}
                value={averageWage}
                onChange={(e) => setAverageWage(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              *Simulated across 26 monthly work days for agricultural labourers, electricians, and mechanics.
            </p>
          </div>

          {/* Result Card */}
          <div className="bg-slate-950/80 rounded-2xl p-5 border border-cyan-500/30 space-y-3 text-xs">
            <div className="flex justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Total Monthly Gross Generated:</span>
              <span className="font-mono font-bold text-white text-sm">₹{monthlyGross.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-rose-400">
              <span>Private Platform Cut (28% loss):</span>
              <span className="font-mono font-semibold">-₹{privatePlatformDeduction.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
              <div>
                <span className="font-bold block">NEXVION Worker Net (80%):</span>
                <span className="text-[10px] text-emerald-400 font-mono">+ ₹{workTrustCoopWelfare.toLocaleString()} in Welfare Vault</span>
              </div>
              <span className="text-lg font-black font-mono text-emerald-400">₹{workTrustWorkerNet.toLocaleString()}</span>
            </div>

            <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-500/30 text-[11px] text-cyan-200">
              <strong>Cooperative Dividend:</strong> Worker takes home an extra <strong className="font-mono text-emerald-300 font-bold">₹{(workTrustWorkerNet - privateNet).toLocaleString()}</strong> every month compared to private aggregators!
            </div>
          </div>
        </div>
      </div>

      {/* 5. Phased Roadmap (MVP, Phase 2, Phase 3) */}
      <div className="tech-glass-card rounded-3xl p-6 sm:p-8 space-y-4 border border-cyan-500/20">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h2 className="text-lg font-black text-white tracking-wide">
              5. Phased Implementation Roadmap
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured delivery plan aligned with National Skill Development & Cooperative Architecture Standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/40 space-y-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
              MVP (Deployed & Live)
            </span>
            <h4 className="font-extrabold text-white text-sm">Core Cooperative Gig Engine</h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>✅ 14 Service categories including Labourers</li>
              <li>✅ Smart nearby matching with 30s timer</li>
              <li>✅ OTP geofenced arrival check-in</li>
              <li>✅ Transparent 80/10/10 escrow split</li>
              <li>✅ DigiLocker KYC verification console</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-blue-500/40 space-y-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-cyan-300 border border-blue-500/40 uppercase">
              Phase 2 (In Progress)
            </span>
            <h4 className="font-extrabold text-white text-sm">Welfare & Multilingual Voice</h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>🔄 Automated UPI 2.0 bulk escrow release</li>
              <li>🔄 e-Shram social security registry link</li>
              <li>🔄 Speech-to-Text vernacular dialect booking</li>
              <li>🔄 District Cooperative Federation mapping</li>
              <li>🔄 Digital Skill Passport cryptographic PGP</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/40 space-y-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
              Phase 3 (Scale)
            </span>
            <h4 className="font-extrabold text-white text-sm">AI Forecasting & Operations</h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>⚡ Satellite crop harvest calendar AI predictor</li>
              <li>⚡ Dynamic surge & weather disaster incentives</li>
              <li>⚡ Group micro-insurance claims API</li>
              <li>⚡ Village Panchayat public kiosk offline mode</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
