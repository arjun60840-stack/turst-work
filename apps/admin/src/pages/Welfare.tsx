import { useState } from 'react';
import StatCard from '../components/StatCard';
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  CurrencyRupeeIcon, 
  AcademicCapIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function Welfare() {
  const benefits = [
    { title: 'Emergency Accidental Cover (₹5,00,000)', desc: '100% cashless treatment at rural district empanelled hospitals for on-duty farm & trade accidents.', icon: '🏥', status: 'Active (All 254 Workers)' },
    { title: 'Worker Daughter Education & Scholarship', desc: '₹15,000 annual education grant for children of registered daily-wage labourers scoring >75% in school.', icon: '🎓', status: '28 Grants Disbursed' },
    { title: 'Annual Free Health & Eye Checkup Camp', desc: 'Quarterly mobile clinic visiting village cooperatives for diabetes, vision & occupational health testing.', icon: '🩺', status: 'Next: 20 Sep (Nashik)' },
    { title: 'Old-Age Cooperative Pension Corpus (10%)', desc: 'Compounded statutory pension accumulation funded via 10% cooperative contribution on every gig.', icon: '💰', status: '₹6,42,000 in Vault' },
  ];

  const claims = [
    { id: 'CLM-101', worker: 'Maniram Gurjar', incident: 'Finger injury during drip pipe trenching', hospital: 'Jaipur Rural Civil Hospital', amount: '₹14,500', status: 'Approved & Settled', date: 'Yesterday' },
    { id: 'CLM-098', worker: 'Santosh Gavit', incident: 'Daughter 10th grade scholarship grant', hospital: 'District Education Board', amount: '₹15,000', status: 'Disbursed to Bank', date: '04 Sep 2026' },
    { id: 'CLM-094', worker: 'Bikramjit Dhaliwal', incident: 'Harvester hydraulic belt snap hand burn', hospital: 'Ludhiana Trauma Center', amount: '₹8,200', status: 'Approved & Settled', date: '28 Aug 2026' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950/90 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-emerald-500/30 tech-glow-emerald relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold mb-2">
            <HeartIcon className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>WORKER WELFARE & SOCIAL SECURITY NETWORK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            Social Protection for Rural & Daily-Wage Workers
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-2xl leading-relaxed">
            Unlike private aggregators that offer zero protections, Work Trust automatically deposits 10% of every completed gig into a collective social security and healthcare safety net.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Welfare Corpus" 
          value="₹6.42 Lakhs" 
          icon={<CurrencyRupeeIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 18, isPositive: true }}
          gradient="from-emerald-600 to-teal-500" 
        />
        <StatCard 
          title="e-Shram Linked Workers" 
          value="248 / 254" 
          icon={<ShieldCheckIcon className="w-5 h-5 text-blue-400" />} 
          trend={{ value: 97.6, isPositive: true }}
          gradient="from-blue-600 to-cyan-500" 
        />
        <StatCard 
          title="Insurance Claims Settled" 
          value="₹1.85 Lakhs" 
          icon={<HeartIcon className="w-5 h-5 text-rose-400" />} 
          badge="100% Ratio"
          gradient="from-rose-600 to-amber-500" 
        />
        <StatCard 
          title="Education Grants Given" 
          value="28 Students" 
          icon={<AcademicCapIcon className="w-5 h-5 text-purple-400" />} 
          gradient="from-purple-600 to-indigo-500" 
        />
      </div>

      {/* Welfare Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((b, i) => (
          <div key={i} className="tech-glass-card p-6 rounded-2xl border border-slate-800/80 space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-3xl filter drop-shadow-md">{b.icon}</span>
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                {b.status}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white">{b.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Recent Insurance & Welfare Claims Table */}
      <div className="tech-glass-card rounded-3xl border border-cyan-500/20 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/60">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <h3 className="text-base font-extrabold text-white">Recent Welfare & Medical Claims</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Auto-approved by Cooperative Welfare Committee</p>
          </div>
          <button 
            onClick={() => alert('New claim submission form: Upload medical discharge slip and cooperative recommendation.')}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold transition-all flex items-center shadow-lg"
          >
            <PlusIcon className="w-4 h-4 mr-1" /> Submit Claim
          </button>
        </div>

        <div className="divide-y divide-slate-800/60 text-xs">
          {claims.map((c) => (
            <div key={c.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/40 transition-colors">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[11px] text-cyan-400 font-bold bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">{c.id}</span>
                  <span className="font-extrabold text-white">{c.worker}</span>
                  <span className="text-slate-500 font-mono text-[11px]">• {c.date}</span>
                </div>
                <p className="text-slate-300 mt-1 font-medium">{c.incident}</p>
                <p className="text-[11px] text-slate-500">Hospital/Authority: {c.hospital}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm font-black font-mono text-emerald-400">{c.amount}</span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
