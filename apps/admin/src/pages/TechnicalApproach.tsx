import { useState } from 'react';
import { 
  SparklesIcon, 
  CpuChipIcon, 
  ServerIcon, 
  DevicePhoneMobileIcon, 
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  MapPinIcon
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
      {/* SIH 2026 Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 p-8 text-white shadow-xl relative overflow-hidden border border-blue-900/60">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold mb-3">
          <SparklesIcon className="w-3.5 h-3.5 text-amber-300" />
          <span>Smart India Hackathon 2026 • Technical Presentation & System Architecture</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Work Trust: Technical Approach & Cooperative Framework
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Problem Statement ID: <strong>26089</strong> • Theme: <strong>Agriculture, Foodtech & Rural Development</strong>. 
          A cooperative-first digital platform replacing extractive private gig monopolies with decentralized worker ownership, 100% transparent escrow, and AI geospatial allocation.
        </p>
      </div>

      {/* 1. Comparison: Private Gig Monopoly vs Work Trust Cooperative */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            1. Comparative Analysis: Private Aggregators vs Work Trust Cooperative
          </h2>
          <p className="text-xs text-slate-500">
            Why the cooperative model is structurally superior for rural daily-wage labourers and technicians
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[11px]">
              <tr>
                <th className="p-3.5">Evaluation Dimension</th>
                <th className="p-3.5 text-rose-700 bg-rose-50/50">Private Platforms (Urban Co, Uber, TaskRabbit)</th>
                <th className="p-3.5 text-emerald-800 bg-emerald-50/70">Work Trust (SIH Cooperative Platform)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Platform Commission</td>
                <td className="p-3.5 text-rose-600 font-medium">25% – 35% cut + hidden fees</td>
                <td className="p-3.5 text-emerald-700 font-bold">Flat 10% Platform + 10% Coop Welfare Fund (80% to Worker)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Platform Ownership</td>
                <td className="p-3.5 text-slate-600">Foreign VC equity holders & private corporations</td>
                <td className="p-3.5 text-blue-700 font-bold">100% Owned by Registered Rural Cooperatives & Worker Guilds</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Social Security & Insurance</td>
                <td className="p-3.5 text-rose-600">Zero benefits; workers classified as disposable contractors</td>
                <td className="p-3.5 text-emerald-700 font-medium">Integrated e-Shram, group health insurance & daughter education fund</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Payment Speed</td>
                <td className="p-3.5 text-slate-600">Weekly/monthly batches with arbitrary chargeback holds</td>
                <td className="p-3.5 text-emerald-700 font-bold">Instant UPI settlement upon customer arrival OTP confirmation</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Dispatch Algorithm</td>
                <td className="p-3.5 text-slate-600">Opaque black-box prioritizing platform margin</td>
                <td className="p-3.5 text-blue-700 font-medium">Open-source weighted scoring (Skill + Geofence + Rota fairness)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">Daily-Wage Labourer Inclusion</td>
                <td className="p-3.5 text-rose-600">Excluded (only focuses on urban AC/salon high-margin niches)</td>
                <td className="p-3.5 text-emerald-700 font-bold">First-class support for farm harvesters, loaders, and daily labourers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Technologies to be Used */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            2. Technology Stack & Architectural Specifications
          </h2>
          <p className="text-xs text-slate-500">
            Production-grade stack engineered for high rural throughput and resilient offline operation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Layer 1: Frontend & Mobile */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <DevicePhoneMobileIcon className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Client Interfaces</h3>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              <li>• <strong>React 18 & Vite 5</strong>: Admin operations portal</li>
              <li>• <strong>React Native / Expo Router</strong>: Mobile user app</li>
              <li>• <strong>Tailwind CSS v4</strong>: Mobile-first responsive styling</li>
              <li>• <strong>Recharts</strong>: Interactive analytics engine</li>
              <li>• <strong>Web Speech API</strong>: Multilingual voice booking</li>
            </ul>
          </div>

          {/* Layer 2: Backend & Distributed Services */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <ServerIcon className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Backend Engine</h3>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              <li>• <strong>Node.js & TypeScript</strong>: Type-safe REST API</li>
              <li>• <strong>Express.js & Knex.js</strong>: Query builder & migrations</li>
              <li>• <strong>SQLite3 / PostgreSQL</strong>: 27 relational schemas</li>
              <li>• <strong>Socket.io & WebSockets</strong>: Live radar & 30s timers</li>
              <li>• <strong>JWT & bcryptjs</strong>: Role-based cryptographic auth</li>
            </ul>
          </div>

          {/* Layer 3: AI & Predictive Models */}
          <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <CpuChipIcon className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">AI & Forecasting</h3>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              <li>• <strong>Haversine Geospatial Indexing</strong>: Proximity search</li>
              <li>• <strong>XGBoost Regressor</strong>: Kharif crop harvest surge</li>
              <li>• <strong>Multi-criteria Rota Scoring</strong>: Fair wage equality</li>
              <li>• <strong>TF-IDF & Cosine Match</strong>: Trade skill classification</li>
              <li>• <strong>NLP Entity Extractor</strong>: Voice booking to booking</li>
            </ul>
          </div>

          {/* Layer 4: Hardware, IoT & Gov APIs */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Hardware & Gov Rails</h3>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              <li>• <strong>GPS Geofencing</strong>: Farm boundary OTP lock</li>
              <li>• <strong>DigiLocker & Aadhaar API</strong>: Instant e-KYC</li>
              <li>• <strong>NPCI UPI 2.0 AutoSplit</strong>: Escrow disbursement</li>
              <li>• <strong>SHA-256 Audit Hashes</strong>: Tamper-evident trail</li>
              <li>• <strong>e-Shram Portal Sync</strong>: Social security linkage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Methodology & System Flowchart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            3. Implementation Methodology & Core Process Flow
          </h2>
          <p className="text-xs text-slate-500">
            Step-by-step lifecycle from voice booking to instant escrow disbursement
          </p>
        </div>

        {/* Visual Flow Chart Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold mx-auto flex items-center justify-center">1</div>
            <p className="font-bold text-slate-900 mt-2">Demand Ingestion</p>
            <p className="text-[11px] text-slate-500">Farmer books via voice/app across 14 categories. Escrow wage funded.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold mx-auto flex items-center justify-center">2</div>
            <p className="font-bold text-slate-900 mt-2">Geospatial Matching</p>
            <p className="text-[11px] text-slate-500">Nearest verified cooperative worker notified with 30s Rapido accept timer.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold mx-auto flex items-center justify-center">3</div>
            <p className="font-bold text-slate-900 mt-2">Geofence Check-in</p>
            <p className="text-[11px] text-slate-500">Worker arrives at farmstead. GPS boundary confirmed via 4-digit OTP.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold mx-auto flex items-center justify-center">4</div>
            <p className="font-bold text-slate-900 mt-2">Execution & Proof</p>
            <p className="text-[11px] text-slate-500">Work completed. Spare parts billed. Photo proof uploaded to eliminate disputes.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold mx-auto flex items-center justify-center">5</div>
            <p className="font-bold text-emerald-950 mt-2">80/10/10 Split</p>
            <p className="text-[11px] text-emerald-800">80% instant UPI to worker, 10% to Coop Welfare, 10% platform operations.</p>
          </div>
        </div>
      </div>

      {/* 4. Interactive Earnings Calculator */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/50 space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2">
            <CurrencyRupeeIcon className="w-3.5 h-3.5" />
            <span>Interactive Fair Wage Simulator</span>
          </div>
          <h2 className="text-xl font-black">
            Calculate Worker Take-Home: Private Exploitation vs Work Trust
          </h2>
          <p className="text-xs text-slate-300">
            See how much more rural workers and daily labourers earn every month under our cooperative structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Sliders */}
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Average Completed Gigs per Day:</span>
                <span className="text-amber-400 text-sm font-extrabold">{dailyGigs} gigs</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={dailyGigs}
                onChange={(e) => setDailyGigs(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Average Service Fee per Job (₹):</span>
                <span className="text-emerald-400 text-sm font-extrabold">₹{averageWage}</span>
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

            <p className="text-[11px] text-slate-400">
              *Simulated across 26 monthly work days for agricultural labourers, electricians, and mechanics.
            </p>
          </div>

          {/* Result Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3 text-xs">
            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-slate-400">Total Monthly Gross Generated:</span>
              <span className="font-bold text-white text-sm">₹{monthlyGross.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-rose-300">
              <span>Private Platform Cut (28% loss):</span>
              <span className="font-semibold">-₹{privatePlatformDeduction.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-emerald-300 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30">
              <div>
                <span className="font-bold block">Work Trust Worker Net (80%):</span>
                <span className="text-[10px] text-emerald-400">+ ₹{workTrustCoopWelfare.toLocaleString()} in your Welfare Vault</span>
              </div>
              <span className="text-lg font-black text-emerald-400">₹{workTrustWorkerNet.toLocaleString()}</span>
            </div>

            <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30 text-[11px] text-blue-200">
              <strong>Cooperative Dividend:</strong> Worker takes home an extra <strong>₹{(workTrustWorkerNet - privateNet).toLocaleString()}</strong> every month compared to private aggregators!
            </div>
          </div>
        </div>
      </div>

      {/* 5. Phased Roadmap (MVP, Phase 2, Phase 3) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            5. Phased Implementation Roadmap
          </h2>
          <p className="text-xs text-slate-500">
            Structured delivery plan aligned with Smart India Hackathon guidelines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase">
              MVP (Deployed & Live)
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">Core Cooperative Gig Engine</h4>
            <ul className="space-y-1 text-slate-600 text-[11px]">
              <li>✅ 14 Service categories including Labourers</li>
              <li>✅ Smart nearby matching with 30s timer</li>
              <li>✅ OTP geofenced arrival check-in</li>
              <li>✅ Transparent 80/10/10 escrow split</li>
              <li>✅ DigiLocker KYC verification console</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase">
              Phase 2 (In Progress)
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">Welfare & Multilingual Voice</h4>
            <ul className="space-y-1 text-slate-600 text-[11px]">
              <li>🔄 Automated UPI 2.0 bulk escrow release</li>
              <li>🔄 e-Shram social security registry link</li>
              <li>🔄 Speech-to-Text vernacular dialect booking</li>
              <li>🔄 District Cooperative Federation mapping</li>
              <li>🔄 Digital Skill Passport cryptographic PGP</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white uppercase">
              Phase 3 (Scale)
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">AI Forecasting & Operations</h4>
            <ul className="space-y-1 text-slate-600 text-[11px]">
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
