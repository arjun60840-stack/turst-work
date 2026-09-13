import { useState } from 'react';
import { 
  UsersIcon, 
  CheckBadgeIcon, 
  BriefcaseIcon, 
  CurrencyRupeeIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CpuChipIcon,
  SignalIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { 
      title: 'Active Registered Workers', 
      value: '254', 
      icon: <UsersIcon className="w-5 h-5" />, 
      trend: { value: 14.2, isPositive: true },
      gradient: 'from-cyan-500 to-blue-600',
      badge: '98% ROTA'
    },
    { 
      title: 'DigiLocker Skill Passports', 
      value: '198', 
      icon: <CheckBadgeIcon className="w-5 h-5" />, 
      trend: { value: 8.5, isPositive: true },
      gradient: 'from-emerald-500 to-teal-600',
      badge: 'AADHAAR KYC'
    },
    { 
      title: 'Live Dispatched Gigs', 
      value: '45', 
      icon: <BriefcaseIcon className="w-5 h-5" />, 
      trend: { value: 'RADAR ON', isPositive: true },
      gradient: 'from-amber-500 to-orange-600',
      badge: 'GEOFENCE OTP'
    },
    { 
      title: 'Total Escrow Volume', 
      value: '₹32.4L', 
      icon: <CurrencyRupeeIcon className="w-5 h-5" />, 
      trend: { value: 22.4, isPositive: true },
      gradient: 'from-purple-500 to-indigo-600',
      badge: '80/10/10 SPLIT'
    },
  ];

  const pieData = [
    { name: 'Completed & Paid', value: 420 },
    { name: 'In Progress (OTP Match)', value: 45 },
    { name: 'Matching / Assigned', value: 32 },
    { name: 'Under Arbitration', value: 2 },
  ];
  const PIE_COLORS = ['#10B981', '#38BDF8', '#F59E0B', '#F43F5E'];

  const barData = [
    { name: 'Harvesting', demand: 520, fill: '#06B6D4' },
    { name: 'Solar Pumps', demand: 340, fill: '#10B981' },
    { name: 'Drip Irrig.', demand: 290, fill: '#3B82F6' },
    { name: 'Machinery', demand: 245, fill: '#F59E0B' },
    { name: 'Cold Storage', demand: 180, fill: '#EC4899' },
    { name: 'Silo Sealing', demand: 160, fill: '#8B5CF6' },
  ];

  const liveEvents = [
    { id: '1', title: 'Paddy Harvesting Crew Payout Settled', desc: '₹4,800 transferred via NPCI UPI 2.0 to Santosh Gavit', time: '11:42:10 IST', type: 'payment', dot: 'bg-emerald-400' },
    { id: '2', title: 'New Worker Skill Passport Verified', desc: 'Pooja Waghmare approved for Micro-Irrigation (Score: 98)', time: '11:38:05 IST', type: 'verify', dot: 'bg-cyan-400' },
    { id: '3', title: 'Geofenced OTP Attendance Check-in', desc: 'OTP 4829 validated at (18.9690, 72.8193) for Farm Pump Repair', time: '11:24:19 IST', type: 'job', dot: 'bg-amber-400' },
    { id: '4', title: 'Cooperative Welfare Fund Deposited', desc: '₹850 (10%) credited to Doaba Farm Society Welfare Corpus', time: '10:55:00 IST', type: 'coop', dot: 'bg-purple-400' },
  ];

  return (
    <div className="space-y-6">
      {/* High-Tech Mission Control Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl tech-glass-card p-6 sm:p-8 text-white shadow-2xl border border-cyan-500/20">
        {/* Animated Neon Ambient Background */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>NEURAL DISPATCH ENGINE • SIH 2026 #26089</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Work Trust <span className="gradient-text-tech">Command Center</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Decentralized cooperative platform for agricultural & rural household services. Combining AI geospatial dispatch, DigiLocker KYC, and instant 80/10/10 UPI escrow settlements.
            </p>
          </div>

          {/* Quick High-Tech Launchers */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/customer-portal"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2"
            >
              <BoltIcon className="w-4 h-4 text-cyan-200" />
              <span>Launch Customer App</span>
            </Link>

            <Link
              to="/worker-portal"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2"
            >
              <CpuChipIcon className="w-4 h-4 text-emerald-200" />
              <span>Launch Worker App</span>
            </Link>

            <Link
              to="/technical-approach"
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border border-amber-500/40 font-bold text-xs transition-all flex items-center space-x-2"
            >
              <SparklesIcon className="w-4 h-4 text-amber-400" />
              <span>SIH Presentation</span>
            </Link>
          </div>
        </div>

        {/* Telemetry Status Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>AI MATCHING ENGINE: <strong className="text-white">ONLINE (1.8s)</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>ZERO-TRUST GEOFENCE: <strong className="text-white">ACTIVE (100%)</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>ESCROW VAULT: <strong className="text-white">₹1.84L SECURED</strong></span>
          </div>
        </div>
      </div>

      {/* 4 Upgraded Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Status Donut Chart */}
        <div className="tech-glass-card p-6 rounded-2xl border border-slate-800/80">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-black text-white font-mono tracking-wide uppercase">// GIG LIFECYCLE MESH</h3>
              <p className="text-[11px] text-slate-400">Real-time breakdown of all platform service transactions</p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              98.2% FULFILLMENT
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie 
                data={pieData} 
                innerRadius={65} 
                outerRadius={95} 
                paddingAngle={6} 
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0B1120', borderColor: '#1E293B', borderRadius: '12px', fontSize: '11px', color: '#F8FAFC' }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px', color: '#94A3B8' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Demand by Category Bar Chart */}
        <div className="tech-glass-card p-6 rounded-2xl border border-slate-800/80">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-black text-white font-mono tracking-wide uppercase">// RURAL SERVICE DEMAND</h3>
              <p className="text-[11px] text-slate-400">Service requests matched by AI geospatial engine</p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              KHARIF SURGE (+42%)
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0B1120', borderColor: '#1E293B', borderRadius: '12px', fontSize: '11px', color: '#F8FAFC' }} 
              />
              <Bar dataKey="demand" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Live Activity Stream & Cooperative Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity Stream */}
        <div className="lg:col-span-2 tech-glass-card p-6 rounded-2xl border border-slate-800/80">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <h3 className="text-sm font-black font-mono text-white tracking-wide uppercase">// REAL-TIME TELEMETRY FEED</h3>
            </div>
            <Link to="/audit-logs" className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center">
              SHA-256 LOGS <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="space-y-3">
            {liveEvents.map((evt) => (
              <div key={evt.id} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                <span className={`w-2 h-2 mt-1.5 rounded-full ${evt.dot} shrink-0`}></span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white">{evt.title}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{evt.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-500 shrink-0">{evt.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Cooperative Spotlight Card */}
        <div className="tech-glass-card p-6 rounded-2xl border border-indigo-500/30 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                ★ FEATURED COOP
              </span>
              <BuildingOffice2Icon className="w-5 h-5 text-indigo-400" />
            </div>

            <h3 className="text-base font-black text-white mt-1">
              Sahyadri Agro Labour Sahakari
            </h3>
            <p className="text-xs text-slate-400 flex items-center mt-1 font-mono">
              <MapPinIcon className="w-3.5 h-3.5 text-cyan-400 mr-1" /> NASHIK & PUNE DISTRICT
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">CREW MEMBERS</span>
                <span className="text-lg font-black text-white">84 WORKERS</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">WELFARE VAULT</span>
                <span className="text-lg font-black text-emerald-300">₹1.45 LAKHS</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              Pioneering Primary Agricultural Credit Society (PACS) managing harvest crews and statutory 10% dividend distributions.
            </p>
          </div>

          <Link
            to="/cooperatives"
            className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs text-center transition-all shadow-md shadow-blue-600/30"
          >
            Audit Cooperative Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
