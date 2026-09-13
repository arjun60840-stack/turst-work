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
      header: 'Job ID & Title',
      accessor: (row: Job) => (
        <div>
          <span className="text-[11px] font-mono text-blue-600 font-bold block">{row.id}</span>
          <p className="font-semibold text-slate-900 text-xs">{row.title}</p>
          <span className="text-[10px] text-slate-400">{row.date}</span>
        </div>
      ),
    },
    {
      header: 'Service Category',
      accessor: (row: Job) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
          🌾 {row.category}
        </span>
      ),
    },
    {
      header: 'Customer / Farm',
      accessor: (row: Job) => (
        <div>
          <span className="text-xs font-medium text-slate-800 block">{row.customerName}</span>
          <span className="text-[11px] text-slate-400 flex items-center">
            <MapPinIcon className="w-3 h-3 mr-0.5" /> {row.customerLocation}
          </span>
        </div>
      ),
    },
    {
      header: 'Assigned Worker',
      accessor: (row: Job) => (
        <span className={`text-xs font-semibold ${row.workerName === 'Unassigned' ? 'text-amber-600 italic' : 'text-slate-700'}`}>
          {row.workerName}
        </span>
      ),
    },
    {
      header: 'Agreed Wage',
      accessor: (row: Job) => (
        <div>
          <span className="text-xs font-bold text-slate-900 block">{row.wage}</span>
          <span className="text-[10px] text-emerald-600 font-medium">Escrow Locked</span>
        </div>
      ),
    },
    {
      header: 'OTP Verification',
      accessor: (row: Job) => (
        <span className={`inline-flex items-center text-[11px] font-medium ${row.otpStatus === 'verified' ? 'text-emerald-700' : 'text-amber-700'}`}>
          <ShieldCheckIcon className="w-3.5 h-3.5 mr-1 inline" />
          {row.otpStatus === 'verified' ? 'OTP Matched' : 'Pending Start'}
        </span>
      ),
    },
    {
      header: 'Job Status',
      accessor: (row: Job) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Action',
      accessor: (row: Job) => (
        <button
          onClick={() => setSelectedJob(row)}
          className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-colors border border-slate-200"
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
          icon={<BriefcaseIcon className="w-5 h-5" />} 
          trend={{ value: 12, isPositive: true }} 
        />
        <StatCard 
          title="Completed This Month" 
          value="584 Gigs" 
          icon={<CheckBadgeIcon className="w-5 h-5" />} 
          trend={{ value: 28, isPositive: true }} 
        />
        <StatCard 
          title="Avg Matching Speed" 
          value="1.8 mins" 
          icon={<ClockIcon className="w-5 h-5" />} 
          trend={{ value: 15, isPositive: true }} 
        />
        <StatCard 
          title="Escrow Balance Secured" 
          value="₹1.84 Lakhs" 
          icon={<CurrencyRupeeIcon className="w-5 h-5" />} 
          trend={{ value: 20, isPositive: true }} 
        />
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search job title, category, worker, ID..."
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
            <option value="all">All Jobs ({initialJobs.length})</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="booked">Booked</option>
            <option value="requested">Requested</option>
            <option value="disputed">Disputed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Live Gig Dispatch Registry</h3>
          <span className="text-xs text-slate-500">{filtered.length} jobs matched</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Job Lifecycle Timeline Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600">{selectedJob.id}</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedJob.title}</h3>
                <p className="text-xs text-slate-500">{selectedJob.category} • {selectedJob.customerLocation}</p>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[11px]">Customer (Farmer/Enterprise)</span>
                  <span className="font-semibold text-slate-800">{selectedJob.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Assigned Worker/Crew</span>
                  <span className="font-semibold text-slate-800">{selectedJob.workerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Escrow Agreed Wage</span>
                  <span className="font-bold text-emerald-700 text-sm">{selectedJob.wage}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Lifecycle State</span>
                  <StatusBadge status={selectedJob.status} />
                </div>
              </div>

              {/* State Machine Steps */}
              <div>
                <span className="font-bold text-slate-700 block mb-2">Job State Machine Progress:</span>
                <div className="space-y-2 border-l-2 border-blue-500 pl-3 ml-2 text-[11px]">
                  <div className="relative">
                    <div className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                    <p className="font-semibold text-slate-800">1. Job Requested & Geofenced</p>
                    <p className="text-slate-400">Demand matched via AI Location Algorithm</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                    <p className="font-semibold text-slate-800">2. Escrow Funded & Assigned</p>
                    <p className="text-slate-400">100% wage locked in smart escrow contract</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                    <p className="font-semibold text-slate-800">3. OTP Attendance Verified</p>
                    <p className="text-slate-400">Worker arrived at farmstead and verified arrival</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                    <p className="font-semibold text-slate-500">4. Transparent Payout & 10% Welfare Release</p>
                    <p className="text-slate-400">Scheduled upon customer completion feedback</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedJob(null)}
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