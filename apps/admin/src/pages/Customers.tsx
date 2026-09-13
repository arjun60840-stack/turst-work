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
      header: 'Customer',
      accessor: (row: Customer) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-xs">{row.name}</p>
            <p className="text-[11px] text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact & Location',
      accessor: (row: Customer) => (
        <div>
          <p className="text-xs text-slate-700 flex items-center">
            <PhoneIcon className="w-3 h-3 mr-1 text-slate-400" /> {row.phone}
          </p>
          <p className="text-[11px] text-slate-400 flex items-center mt-0.5">
            <MapPinIcon className="w-3 h-3 mr-1 text-slate-400" /> {row.location}
          </p>
        </div>
      ),
    },
    {
      header: 'Jobs Posted',
      accessor: (row: Customer) => (
        <span className="font-semibold text-slate-700 text-xs">{row.totalJobs} jobs</span>
      ),
    },
    {
      header: 'Total Paid',
      accessor: (row: Customer) => (
        <span className="font-bold text-emerald-700 text-xs">{row.totalSpent}</span>
      ),
    },
    {
      header: 'Rating Given',
      accessor: (row: Customer) => (
        <span className="text-xs font-medium text-amber-600">⭐ {row.ratingGiven}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Customer) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Action',
      accessor: (row: Customer) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCustomer(row);
          }}
          className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-colors border border-slate-200"
        >
          View Profile
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Registered Clients" 
          value="1,248" 
          icon={<UserGroupIcon className="w-5 h-5" />} 
          trend={{ value: 14, isPositive: true }} 
        />
        <StatCard 
          title="Active Requesters (30d)" 
          value="842" 
          icon={<CheckCircleIcon className="w-5 h-5" />} 
          trend={{ value: 9, isPositive: true }} 
        />
        <StatCard 
          title="Total Disbursed Volume" 
          value="₹24.8 Lakhs" 
          icon={<CurrencyRupeeIcon className="w-5 h-5" />} 
          trend={{ value: 22, isPositive: true }} 
        />
        <StatCard 
          title="Repeat Booking Rate" 
          value="68.4%" 
          icon={<ArrowTrendingUpIcon className="w-5 h-5" />} 
          trend={{ value: 4, isPositive: true }} 
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer, phone, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium">Filter Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses ({initialCustomers.length})</option>
            <option value="verified">Verified Only</option>
            <option value="active">Active Only</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Customers Directory</h3>
          <span className="text-xs text-slate-500">{filteredData.length} records found</span>
        </div>
        <DataTable columns={columns} data={filteredData} />
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedCustomer.name}</h3>
                  <p className="text-xs text-slate-500">{selectedCustomer.id} • Joined {selectedCustomer.joinedDate}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                  <span className="font-semibold text-slate-800">{selectedCustomer.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Email Address</span>
                  <span className="font-semibold text-slate-800">{selectedCustomer.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Primary Location</span>
                  <span className="font-semibold text-slate-800">{selectedCustomer.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Account Status</span>
                  <StatusBadge status={selectedCustomer.status} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="p-2 rounded-lg bg-blue-50">
                  <span className="text-[10px] text-blue-600 uppercase font-bold block">Jobs Posted</span>
                  <span className="text-base font-bold text-blue-900">{selectedCustomer.totalJobs}</span>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50">
                  <span className="text-[10px] text-emerald-600 uppercase font-bold block">Total Spend</span>
                  <span className="text-base font-bold text-emerald-900">{selectedCustomer.totalSpent}</span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50">
                  <span className="text-[10px] text-amber-600 uppercase font-bold block">Avg Rating</span>
                  <span className="text-base font-bold text-amber-900">⭐ {selectedCustomer.ratingGiven}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Direct communication link generated for ${selectedCustomer.name}`);
                  setSelectedCustomer(null);
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Contact Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}