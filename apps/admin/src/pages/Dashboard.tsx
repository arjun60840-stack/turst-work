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
  ArrowRightIcon
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
      title: 'Registered Gig Workers', 
      value: '254', 
      icon: <UsersIcon className="w-6 h-6" />, 
      trend: { value: 14.2, isPositive: true },
      gradient: 'from-blue-600 to-cyan-500',
      badge: '98% Active'
    },
    { 
      title: 'Verified Skill Passports', 
      value: '198', 
      icon: <CheckBadgeIcon className="w-6 h-6" />, 
      trend: { value: 8.5, isPositive: true },
      gradient: 'from-emerald-500 to-teal-600',
      badge: 'DigiLocker KYC'
    },
    { 
      title: 'Live Active Dispatches', 
      value: '45 Gigs', 
      icon: <BriefcaseIcon className="w-6 h-6" />, 
      trend: { value: 'Live Now', isPositive: true },
      gradient: 'from-amber-500 to-orange-500',
      badge: 'Escrow Locked'
    },
    { 
      title: 'Total Platform Volume', 
      value: '₹32.4 Lakhs', 
      icon: <CurrencyRupeeIcon className="w-6 h-6" />, 
      trend: { value: 22.4, isPositive: true },
      gradient: 'from-purple-600 to-indigo-600',
      badge: '80% Worker Direct'
    },
  ];

  const pieData = [
    { name: 'Completed & Paid', value: 420 },
    { name: 'In Progress (OTP Match)', value: 45 },
    { name: 'Matching / Assigned', value: 32 },
    { name: 'Under Arbitration', value: 2 },
  ];
  const PIE_COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#F43F5E'];

  const barData = [
    { name: 'Harvesting', demand: 520, fill: '#2563EB' },
    { name: 'Solar Pumps', demand: 340, fill: '#059669' },
    { name: 'Drip Irrig.', demand: 290, fill: '#6366F1' },
    { name: 'Machinery', demand: 245, fill: '#F59E0B' },
    { name: 'Cold Storage', demand: 180, fill: '#EC4899' },
    { name: 'Silo Sealing', demand: 160, fill: '#8B5CF6' },
  ];

  const liveEvents = [
    { id: '1', title: 'Paddy Harvesting Crew Payout Released', desc: '₹4,800 sent via UPI to Santosh Gavit + 3 workers', time: '5m ago', type: 'payment', color: 'bg-emerald-500' },
    { id: '2', title: 'New Worker Skill Passport Issued', desc: 'Pooja Waghmare approved for Micro-Irrigation (Score: 98)', time: '18m ago', type: 'verify', color: 'bg-blue-500' },
    { id: '3', title: 'GPS Geofence Check-in Confirmed', desc: 'OTP attendance matched for Solar Pump Repair at Pune Farm', time: '34m ago', type: 'job', color: 'bg-amber-500' },
    { id: '4', title: 'Cooperative Welfare Fund Deposited', desc: '₹850 (10%) credited to Doaba Farm Society Welfare Vault', time: '1h ago', type: 'coop', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        {/* Radiant decorative blobs */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-60 h-60 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-200">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart India Hackathon 2026 • Problem Statement ID: 26089</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Work Trust Operations Control Center
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Real-time cooperative gig dispatch connecting verified rural workers, farmer clients, and Self-Help Groups with 100% transparent escrow settlements.
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/verification"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition-all flex items-center space-x-1.5"
            >
              <CheckBadgeIcon className="w-4 h-4" />
              <span>Review KYC (4)</span>
            </Link>
            <Link
              to="/jobs"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-900/30 transition-all flex items-center space-x-1.5"
            >
              <BriefcaseIcon className="w-4 h-4" />
              <span>Live Gigs (45)</span>
            </Link>
            <Link
              to="/payments"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs transition-all flex items-center space-x-1.5"
            >
              <CurrencyRupeeIcon className="w-4 h-4" />
              <span>Escrow Ledger</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Colorful Gradient Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Status Donut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Gig Execution by Lifecycle Status</h3>
              <p className="text-[11px] text-slate-500">Real-time breakdown of all platform service requests</p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              98.2% Success Rate
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
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Demand by Category Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">High-Demand Agricultural Services</h3>
              <p className="text-[11px] text-slate-500">Service requests matched by AI geospatial engine</p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
              Kharif Season Surge
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="demand" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Live Activity Feed & Cooperative Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity Stream */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h3 className="text-sm font-bold text-slate-900">Live Platform Activity Stream</h3>
            </div>
            <Link to="/audit-logs" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
              View Audit Trail <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {liveEvents.map((evt) => (
              <div key={evt.id} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors">
                <span className={`w-2 h-2 mt-1.5 rounded-full ${evt.color} shrink-0`}></span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900">{evt.title}</p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{evt.desc}</p>
                </div>
                <span className="text-[10px] font-medium text-slate-400 shrink-0">{evt.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Cooperative Spotlight Card */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 rounded-2xl text-white shadow-md border border-indigo-900/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider">
                🌟 Star Cooperative
              </span>
              <BuildingOffice2Icon className="w-5 h-5 text-indigo-300" />
            </div>

            <h3 className="text-base font-extrabold text-white mt-2">
              Sahyadri Agro Labour Sahakari
            </h3>
            <p className="text-xs text-slate-300 flex items-center mt-1">
              <MapPinIcon className="w-3.5 h-3.5 text-blue-400 mr-1" /> Nashik & Pune District, MH
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Workers Enrolled</span>
                <span className="text-lg font-bold text-white">84 Crew</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block">Welfare Fund</span>
                <span className="text-lg font-bold text-emerald-300">₹1,45,000</span>
              </div>
            </div>

            <p className="text-[11px] text-indigo-200 mt-4 leading-relaxed">
              Self-Help Group managing collective crop harvesting and automated 10% dividend distributions.
            </p>
          </div>

          <Link
            to="/cooperatives"
            className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center transition-colors shadow-xs"
          >
            Audit Cooperative Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
