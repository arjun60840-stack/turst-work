import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  BriefcaseIcon, 
  ClockIcon, 
  CheckBadgeIcon, 
  CurrencyRupeeIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface Job {
  id: string;
  title: string;
  category: string;
  customerName: string;
  customerLocation: string;
  workerName: string;
  wage: string;
  otpStatus: 'verified' | 'pending';
  status: 'in_progress' | 'completed' | 'booked' | 'requested' | 'disputed';
  date: string;
}

const initialJobs: Job[] = [
  { id: 'JOB-8821', title: 'Paddy Harvesting & Threshing Crew (4 Workers)', category: 'Agriculture', customerName: 'Suresh Patel', customerLocation: 'Nashik, MH', workerName: 'Santosh Gavit + Crew', wage: '₹4,800', otpStatus: 'verified', status: 'in_progress', date: 'Today, 08:30 AM' },
  { id: 'JOB-8822', title: 'Solar Drip Irrigation Pump Repair', category: 'Repair & Maintenance', customerName: 'Kisan Seva Kendra', customerLocation: 'Pune Rural, MH', workerName: 'Pooja Waghmare', wage: '₹1,500', otpStatus: 'verified', status: 'in_progress', date: 'Today, 09:15 AM' },
  { id: 'JOB-8823', title: 'Orchard Micro-Trenching & Pipe Laying', category: 'Plumbing', customerName: 'Meena Sharma', customerLocation: 'Jaipur Rural, RJ', workerName: 'Maniram Gurjar', wage: '₹2,200', otpStatus: 'verified', status: 'booked', date: 'Today, 11:00 AM' },
  { id: 'JOB-8824', title: 'Combine Harvester 10-Acre Wheat Reaping', category: 'Agriculture', customerName: 'Gurpreet Singh', customerLocation: 'Ludhiana, PB', workerName: 'Bikramjit Dhaliwal', wage: '₹8,500', otpStatus: 'verified', status: 'completed', date: 'Yesterday' },
  { id: 'JOB-8825', title: 'Farmstead Cold Storage Wiring & Sensor Check', category: 'Electrical', customerName: 'Rajesh Verma', customerLocation: 'Indore, MP', workerName: 'Ravi Kumar', wage: '₹1,800', otpStatus: 'verified', status: 'completed', date: '11 Sep 2026' },
  { id: 'JOB-8826', title: 'Grain Silo Concrete Floor Sealing', category: 'Masonry', customerName: 'Venkatesh Naidu', customerLocation: 'Guntur, AP', workerName: 'Amit Singh', wage: '₹3,400', otpStatus: 'verified', status: 'completed', date: '10 Sep 2026' },
  { id: 'JOB-8827', title: 'Grape Trellis Wood Repair & Wire Tensioning', category: 'Carpentry', customerName: 'Ananya Deshmukh', customerLocation: 'Kolhapur, MH', workerName: 'Unassigned', wage: '₹1,200', otpStatus: 'pending', status: 'requested', date: 'Today, 01:20 PM' },
  { id: 'JOB-8828', title: 'Tractor Hydraulic Line Leak Dispute', category: 'Repair & Maintenance', customerName: 'Suresh Patel', customerLocation: 'Nashik, MH', workerName: 'Santosh Gavit', wage: '₹2,100', otpStatus: 'verified', status: 'disputed', date: '09 Sep 2026' },
];

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filtered = initialJobs.filter(j => {
    const matchesSearch = 
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || j.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      header: 'Job ID & Description',
      accessor: (row: Job) => (
        <div>
          <span className="text-[11px] font-mono text-cyan-400 font-bold block">{row.id}</span>
          <p className="font-extrabold text-white text-xs">{row.title}</p>
          <span className="text-[10px] font-mono text-slate-400">{row.date}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: (row: Job) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
          ⚡ {row.category}
        </span>
      ),
    },
    {
      header: 'Customer / Farmstead',
      accessor: (row: Job) => (
        <div>
          <span className="text-xs font-medium text-slate-200 block">{row.customerName}</span>
          <span className="text-[11px] text-slate-400 flex items-center font-mono">
            <MapPinIcon className="w-3 h-3 mr-0.5 text-cyan-400" /> {row.customerLocation}
          </span>
        </div>
      ),
    },
    {
      header: 'Assigned Specialist',
      accessor: (row: Job) => (
        <span className={`text-xs font-mono font-semibold ${row.workerName === 'Unassigned' ? 'text-amber-400 italic' : 'text-slate-300'}`}>
          {row.workerName}
        </span>
      ),
    },
    {
      header: 'Escrow Wage',
      accessor: (row: Job) => (
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 block">{row.wage}</span>
          <span className="text-[10px] font-mono text-emerald-400/80">ESCROW LOCKED</span>
        </div>
      ),
    },
    {
      header: 'Geofence OTP',
      accessor: (row: Job) => (
        <span className={`inline-flex items-center text-[11px] font-mono font-bold ${row.otpStatus === 'verified' ? 'text-emerald-400' : 'text-amber-400'}`}>
          <ShieldCheckIcon className="w-3.5 h-3.5 mr-1 inline" />
          {row.otpStatus === 'verified' ? 'OTP VERIFIED' : 'PENDING START'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Job) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Audit Trace',
      accessor: (row: Job) => (
        <button
          onClick={() => setSelectedJob(row)}
          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer shadow-xs"
        >
          View Timeline
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Active Jobs In-Progress" 
          value="45 Active" 
          icon={<BriefcaseIcon className="w-5 h-5 text-cyan-400" />} 
          trend={{ value: 12, isPositive: true }} 
        />
        <StatCard 
          title="Completed This Month" 
          value="584 Gigs" 
          icon={<CheckBadgeIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 28, isPositive: true }} 
        />
        <StatCard 
          title="Avg Matching Speed" 
          value="1.8 mins" 
          icon={<ClockIcon className="w-5 h-5 text-amber-400" />} 
          trend={{ value: 15, isPositive: true }} 
        />
        <StatCard 
          title="Escrow Balance Secured" 
          value="₹1.84 Lakhs" 
          icon={<CurrencyRupeeIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 20, isPositive: true }} 
        />
      </div>

      {/* Filter and Search */}
      <div className="tech-glass-card p-4 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-cyan-400/60" />
          <input
            type="text"
            placeholder="Search job title, category, worker, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950/80 text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-cyan-500 font-sans transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-mono">STATUS FILTER:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-slate-950/80 text-cyan-300 border border-slate-800 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="all">ALL JOBS ({initialJobs.length})</option>
            <option value="in_progress">IN PROGRESS</option>
            <option value="completed">COMPLETED</option>
            <option value="booked">BOOKED</option>
            <option value="requested">REQUESTED</option>
            <option value="disputed">DISPUTED</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="tech-glass-card rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="text-sm font-bold text-white tracking-wide">Live Gig Dispatch Registry</h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">{filtered.length} jobs matched</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Job Lifecycle Timeline Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="tech-glass-card bg-slate-950/95 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-cyan-500/30 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">{selectedJob.id}</span>
                <h3 className="font-extrabold text-white text-base mt-0.5">{selectedJob.title}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedJob.category} • {selectedJob.customerLocation}</p>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">CUSTOMER</span>
                  <span className="font-semibold text-slate-200">{selectedJob.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">ASSIGNED WORKER</span>
                  <span className="font-mono font-semibold text-slate-200">{selectedJob.workerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">ESCROW WAGE</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">{selectedJob.wage}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] font-mono">LIFECYCLE STATE</span>
                  <StatusBadge status={selectedJob.status} />
                </div>
              </div>

              {/* State Machine Steps */}
              <div>
                <span className="font-bold text-white block mb-2 font-mono text-xs">STATE MACHINE TRAJECTORY:</span>
                <div className="space-y-3 border-l-2 border-cyan-500/40 pl-4 ml-2 text-[11px]">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                    <p className="font-bold text-white">1. Job Requested & Geofenced</p>
                    <p className="text-slate-400 font-mono">Demand matched via AI Location Algorithm</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                    <p className="font-bold text-white">2. Escrow Funded & Assigned</p>
                    <p className="text-slate-400 font-mono">100% wage locked in smart escrow contract</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    <p className="font-bold text-emerald-300">3. OTP Attendance Verified</p>
                    <p className="text-slate-400 font-mono">Worker arrived at farmstead and verified arrival</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    <p className="font-semibold text-slate-500">4. Transparent Payout & 10% Welfare Release</p>
                    <p className="text-slate-500 font-mono">Scheduled upon customer completion feedback</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
              >
                Close Trace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}