import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  UserGroupIcon, 
  CheckCircleIcon, 
  CurrencyRupeeIcon, 
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  totalJobs: number;
  totalSpent: string;
  ratingGiven: number;
  status: 'active' | 'verified' | 'pending';
  joinedDate: string;
}

const initialCustomers: Customer[] = [
  { id: 'CUST-101', name: 'Suresh Patel', phone: '+91 98234 11201', email: 'suresh.patel@agrofarm.in', location: 'Nashik, Maharashtra', totalJobs: 18, totalSpent: '₹42,500', ratingGiven: 4.9, status: 'verified', joinedDate: '12 Jan 2026' },
  { id: 'CUST-102', name: 'Meena Sharma', phone: '+91 97112 44320', email: 'meena.sharma@gmail.com', location: 'Jaipur Rural, Rajasthan', totalJobs: 9, totalSpent: '₹18,200', ratingGiven: 4.7, status: 'active', joinedDate: '02 Feb 2026' },
  { id: 'CUST-103', name: 'Kisan Seva Kendra', phone: '+91 94032 88711', email: 'info@kisanseva.org', location: 'Pune Rural, Maharashtra', totalJobs: 34, totalSpent: '₹1,12,000', ratingGiven: 4.8, status: 'verified', joinedDate: '15 Dec 2025' },
  { id: 'CUST-104', name: 'Rajesh Verma', phone: '+91 98901 22345', email: 'rajesh.verma@coldchain.com', location: 'Indore, Madhya Pradesh', totalJobs: 12, totalSpent: '₹28,600', ratingGiven: 4.6, status: 'active', joinedDate: '18 Jan 2026' },
  { id: 'CUST-105', name: 'Ananya Deshmukh', phone: '+91 91234 56789', email: 'ananya.d@greenvalleylabs.com', location: 'Kolhapur, Maharashtra', totalJobs: 7, totalSpent: '₹14,300', ratingGiven: 5.0, status: 'verified', joinedDate: '28 Feb 2026' },
  { id: 'CUST-106', name: 'Venkatesh Naidu', phone: '+91 99887 76655', email: 'v.naidu@apagro.gov.in', location: 'Guntur, Andhra Pradesh', totalJobs: 26, totalSpent: '₹89,000', ratingGiven: 4.9, status: 'verified', joinedDate: '05 Jan 2026' },
  { id: 'CUST-107', name: 'Gurpreet Singh', phone: '+91 98765 43210', email: 'gurpreet.farm@punjab.in', location: 'Ludhiana, Punjab', totalJobs: 15, totalSpent: '₹52,000', ratingGiven: 4.5, status: 'active', joinedDate: '14 Feb 2026' },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredData = initialCustomers.filter((cust) => {
    const matchesSearch = 
      cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || cust.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      header: 'Customer Node',
      accessor: (row: Customer) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shadow-xs">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-white text-xs">{row.name}</p>
            <p className="text-[11px] text-slate-400 font-mono">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact & Geolocation',
      accessor: (row: Customer) => (
        <div>
          <p className="text-xs text-slate-300 flex items-center font-mono">
            <PhoneIcon className="w-3 h-3 mr-1 text-cyan-400" /> {row.phone}
          </p>
          <p className="text-[11px] text-slate-400 flex items-center mt-0.5 font-mono">
            <MapPinIcon className="w-3 h-3 mr-1 text-slate-500" /> {row.location}
          </p>
        </div>
      ),
    },
    {
      header: 'Jobs Commissioned',
      accessor: (row: Customer) => (
        <span className="font-mono font-semibold text-slate-300 text-xs">{row.totalJobs} gigs</span>
      ),
    },
    {
      header: 'Gross Volume Paid',
      accessor: (row: Customer) => (
        <span className="font-mono font-bold text-emerald-400 text-xs">{row.totalSpent}</span>
      ),
    },
    {
      header: 'Avg Review Score',
      accessor: (row: Customer) => (
        <span className="text-xs font-mono font-bold text-amber-400">⭐ {row.ratingGiven} / 5.0</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Customer) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Profile',
      accessor: (row: Customer) => (
        <button
          onClick={() => setSelectedCustomer(row)}
          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer shadow-xs"
        >
          Inspect
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Metrics for Customers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Active Farm Customers" 
          value="1,420 Users" 
          icon={<UserGroupIcon className="w-5 h-5 text-cyan-400" />} 
          trend={{ value: 16, isPositive: true }} 
        />
        <StatCard 
          title="Verified Farmsteads" 
          value="984 Verified" 
          icon={<CheckCircleIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 9, isPositive: true }} 
        />
        <StatCard 
          title="Avg Escrow Ticket" 
          value="₹2,480" 
          icon={<CurrencyRupeeIcon className="w-5 h-5 text-blue-400" />} 
          trend={{ value: 8, isPositive: true }} 
        />
        <StatCard 
          title="Repeat Booking Ratio" 
          value="74.2%" 
          icon={<ArrowTrendingUpIcon className="w-5 h-5 text-purple-400" />} 
          trend={{ value: 12, isPositive: true }} 
        />
      </div>

      {/* Filter and Search */}
      <div className="tech-glass-card p-4 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-cyan-400/60" />
          <input
            type="text"
            placeholder="Search customer, location, phone..."
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
            <option value="all">ALL FARM CLIENTS ({initialCustomers.length})</option>
            <option value="verified">VERIFIED ONLY</option>
            <option value="active">ACTIVE ONLY</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="tech-glass-card rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="text-sm font-bold text-white tracking-wide">Customer Account Registry</h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">{filteredData.length} active clients</span>
        </div>
        <DataTable columns={columns} data={filteredData} />
      </div>

      {/* Customer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="tech-glass-card bg-slate-950/95 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-cyan-500/30 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center font-bold text-base font-mono">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{selectedCustomer.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedCustomer.id} • Registered {selectedCustomer.joinedDate}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 block text-[11px]">TELEPHONE</span>
                  <span className="font-semibold text-slate-200">{selectedCustomer.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">LOCATION</span>
                  <span className="font-semibold text-slate-200">{selectedCustomer.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">TOTAL ESCROW SPENT</span>
                  <span className="font-bold text-emerald-400">{selectedCustomer.totalSpent}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">TOTAL BOOKINGS</span>
                  <span className="font-bold text-white">{selectedCustomer.totalJobs} jobs</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/40 rounded-2xl border border-slate-800">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Verified Farmstead Account with direct NPCI Auto-Escrow capability. 
                  Zero cancellation fee penalty history recorded.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
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