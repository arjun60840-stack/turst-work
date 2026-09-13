import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  UsersIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  StarIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  MapPinIcon
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
      header: 'Worker Profile',
      accessor: (row: Worker) => (
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-xs flex items-center">
              {row.name}
              {row.status === 'verified' && (
                <CheckBadgeIcon className="w-3.5 h-3.5 ml-1 text-blue-600 inline" title="DigiLocker Verified" />
              )}
            </p>
            <span className="text-[11px] text-slate-400 font-mono">{row.phone}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Primary Skills & Trades',
      accessor: (row: Worker) => (
        <div className="max-w-xs">
          <p className="text-xs font-medium text-slate-800">{row.skills}</p>
          <span className="text-[10px] text-blue-600 font-medium">Coop: {row.cooperative}</span>
        </div>
      ),
    },
    {
      header: 'Location',
      accessor: (row: Worker) => (
        <span className="text-xs text-slate-600 flex items-center">
          <MapPinIcon className="w-3.5 h-3.5 mr-1 text-slate-400" /> {row.district}
        </span>
      ),
    },
    {
      header: 'Performance & Rating',
      accessor: (row: Worker) => (
        <div>
          <span className="text-xs font-bold text-amber-600 block">⭐ {row.rating} / 5.0</span>
          <span className="text-[11px] text-slate-500">{row.jobsCompleted} gigs done</span>
        </div>
      ),
    },
    {
      header: 'Reliability Index',
      accessor: (row: Worker) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full ${row.reliabilityScore >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
              style={{ width: `${row.reliabilityScore}%` }}
            ></div>
          </div>
          <span className="text-xs font-bold text-slate-700">{row.reliabilityScore}%</span>
        </div>
      ),
    },
    {
      header: 'Daily Base Wage',
      accessor: (row: Worker) => (
        <span className="text-xs font-semibold text-slate-800">{row.dailyRate}</span>
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
          className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-colors border border-slate-200"
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
          icon={<UsersIcon className="w-5 h-5 text-blue-600" />} 
          trend={{ value: 12, isPositive: true }} 
        />
        <StatCard 
          title="Verified Skill Passports" 
          value="198 Active" 
          icon={<CheckBadgeIcon className="w-5 h-5 text-emerald-600" />} 
          trend={{ value: 8, isPositive: true }} 
        />
        <StatCard 
          title="Pending KYC Review" 
          value="14 Pending" 
          icon={<ClockIcon className="w-5 h-5 text-amber-600" />} 
          trend={{ value: 3, isPositive: false }} 
        />
        <StatCard 
          title="Avg Reliability Score" 
          value="94.6%" 
          icon={<ShieldCheckIcon className="w-5 h-5 text-indigo-600" />} 
          trend={{ value: 2, isPositive: true }} 
        />
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search worker, trade, district, coop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Workers ({initialWorkers.length})</option>
            <option value="verified">Verified Only</option>
            <option value="active">Active Only</option>
            <option value="pending">Pending Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Worker Skill Passport Registry</h3>
          <span className="text-xs text-slate-500">{filtered.length} workers registered</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Worker Skill Passport Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {selectedWorker.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center">
                    {selectedWorker.name}
                    {selectedWorker.status === 'verified' && (
                      <CheckBadgeIcon className="w-4 h-4 ml-1.5 text-blue-600" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedWorker.id} • {selectedWorker.district}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedWorker(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wide">Work Trust Skill Passport</span>
                  <p className="text-sm font-bold text-blue-900 mt-0.5">{selectedWorker.skills}</p>
                  <span className="text-[11px] text-blue-700">Affiliated: {selectedWorker.cooperative}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-emerald-700 block">{selectedWorker.reliabilityScore}%</span>
                  <span className="text-[10px] text-slate-500">Trust Score</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Telephone</span>
                  <span className="font-semibold text-slate-800">{selectedWorker.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Fair Base Wage</span>
                  <span className="font-semibold text-emerald-700">{selectedWorker.dailyRate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Jobs Completed</span>
                  <span className="font-semibold text-slate-800">{selectedWorker.jobsCompleted} gigs</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Customer Feedback</span>
                  <span className="font-bold text-amber-600">⭐ {selectedWorker.rating} / 5.0</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700 block mb-1">SIH 2026 Skill Passport Verification:</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Verified via Aadhaar OTP, ITI/PMKVY Trade Certification, and Cooperative Society Recommendation. 
                  Entitled to 80% instant direct payout and 10% welfare dividend coverage.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedWorker(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
