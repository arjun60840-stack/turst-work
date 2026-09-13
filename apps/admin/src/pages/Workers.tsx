import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  UsersIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  MagnifyingGlassIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface Worker {
  id: string;
  name: string;
  phone: string;
  skills: string;
  rating: number;
  jobsCompleted: number;
  reliabilityScore: number;
  cooperative: string;
  district: string;
  status: 'verified' | 'pending' | 'active';
  dailyRate: string;
}

const initialWorkers: Worker[] = [
  { id: 'WRK-101', name: 'Ravi Kumar', phone: '+91 98234 56789', skills: 'Agricultural Electrician, Solar Pumps', rating: 4.9, jobsCompleted: 84, reliabilityScore: 98, cooperative: 'Sahyadri Agro Labour Sahakari', district: 'Nashik, MH', status: 'verified', dailyRate: '₹950/day' },
  { id: 'WRK-102', name: 'Santosh Gavit', phone: '+91 97654 32109', skills: 'Combine Harvester, Tractor Heavy Machine', rating: 4.8, jobsCompleted: 112, reliabilityScore: 94, cooperative: 'Sahyadri Agro Labour Sahakari', district: 'Nashik, MH', status: 'verified', dailyRate: '₹1,400/day' },
  { id: 'WRK-103', name: 'Pooja Waghmare', phone: '+91 98211 44556', skills: 'Drip Irrigation, Micro-Trenching', rating: 4.95, jobsCompleted: 56, reliabilityScore: 99, cooperative: 'Godavari Harvesters Crew', district: 'East Godavari, AP', status: 'verified', dailyRate: '₹850/day' },
  { id: 'WRK-104', name: 'Amit Singh', phone: '+91 98111 22334', skills: 'Grain Silo Masonry, Concrete Sealing', rating: 4.6, jobsCompleted: 42, reliabilityScore: 91, cooperative: 'Malwa Kisan & Mason Coop', district: 'Indore, MP', status: 'verified', dailyRate: '₹800/day' },
  { id: 'WRK-105', name: 'Maniram Gurjar', phone: '+91 94140 88912', skills: 'Drip Irrigation & Pipeline Fitter', rating: 4.7, jobsCompleted: 29, reliabilityScore: 88, cooperative: 'Krishak Vikas Shramik Sangh', district: 'Jaipur Rural, RJ', status: 'pending', dailyRate: '₹750/day' },
  { id: 'WRK-106', name: 'Bikramjit Dhaliwal', phone: '+91 98720 11928', skills: 'Harvester Operator, Diesel Mechanic', rating: 4.85, jobsCompleted: 95, reliabilityScore: 96, cooperative: 'Doaba Farm Artisans Society', district: 'Ludhiana, PB', status: 'verified', dailyRate: '₹1,500/day' },
  { id: 'WRK-107', name: 'Suresh Rathod', phone: '+91 99001 55443', skills: 'Grape Trellis Carpentry, Wire Tensioning', rating: 4.4, jobsCompleted: 18, reliabilityScore: 82, cooperative: 'Nashik Grape Orchard Union', district: 'Nashik, MH', status: 'active', dailyRate: '₹700/day' },
];

export default function Workers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const filtered = initialWorkers.filter(w => {
    const matchesSearch = 
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.cooperative.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || w.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      header: 'Worker Node',
      accessor: (row: Worker) => (
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shadow-xs">
            {row.name.charAt(0)}
          </div>
          <div>
            <span className="font-extrabold text-white text-xs block">{row.name}</span>
            <span className="text-[11px] text-slate-400 font-mono">{row.phone}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Skill Cluster',
      accessor: (row: Worker) => (
        <span className="text-xs text-slate-300 font-medium">{row.skills}</span>
      ),
    },
    {
      header: 'Affiliated Cooperative',
      accessor: (row: Worker) => (
        <div>
          <span className="text-xs text-cyan-400 font-medium block">{row.cooperative}</span>
          <span className="text-[11px] text-slate-500 font-mono">{row.district}</span>
        </div>
      ),
    },
    {
      header: 'Telemetry & Rating',
      accessor: (row: Worker) => (
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 block">⭐ {row.rating} / 5.0</span>
          <span className="text-[11px] font-mono text-slate-400">{row.jobsCompleted} gigs done</span>
        </div>
      ),
    },
    {
      header: 'Reliability Index',
      accessor: (row: Worker) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full ${row.reliabilityScore >= 90 ? 'bg-emerald-400' : 'bg-amber-400'}`}
              style={{ width: `${row.reliabilityScore}%` }}
            ></div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-300">{row.reliabilityScore}%</span>
        </div>
      ),
    },
    {
      header: 'Daily Base Wage',
      accessor: (row: Worker) => (
        <span className="text-xs font-mono font-bold text-emerald-400">{row.dailyRate}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Worker) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Skill Passport',
      accessor: (row: Worker) => (
        <button
          onClick={() => setSelectedWorker(row)}
          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer shadow-xs"
        >
          View Passport
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Registered Workers" 
          value="254 Workers" 
          icon={<UsersIcon className="w-5 h-5 text-cyan-400" />} 
          trend={{ value: 12, isPositive: true }} 
        />
        <StatCard 
          title="Verified Skill Passports" 
          value="198 Active" 
          icon={<CheckBadgeIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 8, isPositive: true }} 
        />
        <StatCard 
          title="Pending KYC Review" 
          value="14 Pending" 
          icon={<ClockIcon className="w-5 h-5 text-amber-400" />} 
          trend={{ value: 3, isPositive: false }} 
        />
        <StatCard 
          title="Avg Reliability Score" 
          value="94.6%" 
          icon={<ShieldCheckIcon className="w-5 h-5 text-indigo-400" />} 
          trend={{ value: 2, isPositive: true }} 
        />
      </div>

      {/* Filter and Search */}
      <div className="tech-glass-card p-4 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-cyan-400/60" />
          <input
            type="text"
            placeholder="Search worker, trade, district, coop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950/80 text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-mono">STATUS FILTER:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-slate-950/80 text-cyan-300 border border-slate-800 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="all">ALL WORKERS ({initialWorkers.length})</option>
            <option value="verified">VERIFIED ONLY</option>
            <option value="active">ACTIVE ONLY</option>
            <option value="pending">PENDING ONLY</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="tech-glass-card rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="text-sm font-bold text-white tracking-wide">Worker Skill Passport Registry</h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">{filtered.length} nodes active</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Worker Skill Passport Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="tech-glass-card bg-slate-950/95 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-cyan-500/30 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg font-mono">
                  {selectedWorker.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base flex items-center">
                    {selectedWorker.name}
                    {selectedWorker.status === 'verified' && (
                      <CheckBadgeIcon className="w-4 h-4 ml-1.5 text-cyan-400" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedWorker.id} • {selectedWorker.district}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedWorker(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">Cryptographic Skill Passport</span>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedWorker.skills}</p>
                  <span className="text-[11px] text-slate-400">Cooperative: {selectedWorker.cooperative}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-mono font-black text-emerald-400 block">{selectedWorker.reliabilityScore}%</span>
                  <span className="text-[10px] font-mono text-slate-400">Trust Index</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">TELEPHONE</span>
                  <span className="font-mono font-semibold text-slate-200">{selectedWorker.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">FAIR BASE WAGE</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedWorker.dailyRate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">COMPLETED GIGS</span>
                  <span className="font-mono font-semibold text-slate-200">{selectedWorker.jobsCompleted} gigs</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">FEEDBACK RATING</span>
                  <span className="font-mono font-bold text-amber-400">⭐ {selectedWorker.rating} / 5.0</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/40 rounded-2xl border border-slate-800">
                <span className="font-bold text-cyan-300 block mb-1">Skill Passport Verification:</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Verified via Aadhaar OTP, ITI/PMKVY Trade Certification, and Cooperative Society Recommendation. 
                  Entitled to 80% instant direct payout and 10% welfare dividend coverage.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedWorker(null)}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
