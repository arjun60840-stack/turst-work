import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  BanknotesIcon, 
  CurrencyRupeeIcon, 
  CheckCircleIcon, 
  LockClosedIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  jobId: string;
  jobTitle: string;
  workerName: string;
  workerUpi: string;
  grossAmount: number;
  workerShare: number; // 80%
  coopShare: number;   // 10%
  platformFee: number; // 10%
  paymentMode: string;
  status: 'paid' | 'processing' | 'pending';
  timestamp: string;
}

const initialTransactions: Transaction[] = [
  { id: 'TXN-90218', jobId: 'JOB-8824', jobTitle: 'Combine Harvester 10-Acre Reaping', workerName: 'Bikramjit Dhaliwal', workerUpi: 'bikramjit@oksbi', grossAmount: 8500, workerShare: 6800, coopShare: 850, platformFee: 850, paymentMode: 'UPI Instant Payout', status: 'paid', timestamp: 'Yesterday, 05:40 PM' },
  { id: 'TXN-90219', jobId: 'JOB-8825', jobTitle: 'Farmstead Cold Storage Wiring', workerName: 'Ravi Kumar', workerUpi: 'ravi.kumar@apl', grossAmount: 1800, workerShare: 1440, coopShare: 180, platformFee: 180, paymentMode: 'Escrow Auto-Release', status: 'paid', timestamp: '11 Sep, 02:15 PM' },
  { id: 'TXN-90220', jobId: 'JOB-8826', jobTitle: 'Grain Silo Concrete Floor Sealing', workerName: 'Amit Singh', workerUpi: 'amitsingh@paytm', grossAmount: 3400, workerShare: 2720, coopShare: 340, platformFee: 340, paymentMode: 'IMPS Direct Bank', status: 'paid', timestamp: '10 Sep, 06:10 PM' },
  { id: 'TXN-90221', jobId: 'JOB-8821', jobTitle: 'Paddy Harvesting & Threshing Crew', workerName: 'Santosh Gavit + Crew', workerUpi: 'gavit.crew@okhdfc', grossAmount: 4800, workerShare: 3840, coopShare: 480, platformFee: 480, paymentMode: 'Escrow Locked', status: 'processing', timestamp: 'Today, 08:30 AM' },
  { id: 'TXN-90222', jobId: 'JOB-8822', jobTitle: 'Solar Drip Irrigation Pump Repair', workerName: 'Pooja Waghmare', workerUpi: 'pooja.tech@ybl', grossAmount: 1500, workerShare: 1200, coopShare: 150, platformFee: 150, paymentMode: 'Escrow Locked', status: 'processing', timestamp: 'Today, 09:15 AM' },
  { id: 'TXN-90223', jobId: 'JOB-8823', jobTitle: 'Orchard Micro-Trenching', workerName: 'Maniram Gurjar', workerUpi: 'maniram@barodampay', grossAmount: 2200, workerShare: 1760, coopShare: 220, platformFee: 220, paymentMode: 'Customer Funded', status: 'pending', timestamp: 'Today, 11:00 AM' },
];

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  const filtered = initialTransactions.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.workerUpi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      header: 'Transaction Hash',
      accessor: (row: Transaction) => (
        <div>
          <span className="font-mono text-xs font-bold text-cyan-400 block">{row.id}</span>
          <span className="text-[10px] font-mono text-slate-400">{row.timestamp}</span>
        </div>
      ),
    },
    {
      header: 'Service Job',
      accessor: (row: Transaction) => (
        <div>
          <p className="font-semibold text-white text-xs">{row.jobTitle}</p>
          <span className="text-[11px] font-mono text-cyan-400">{row.jobId}</span>
        </div>
      ),
    },
    {
      header: 'Worker & UPI Rail',
      accessor: (row: Transaction) => (
        <div>
          <p className="font-medium text-slate-200 text-xs">{row.workerName}</p>
          <span className="text-[11px] text-slate-400 font-mono">{row.workerUpi}</span>
        </div>
      ),
    },
    {
      header: 'Gross Volume',
      accessor: (row: Transaction) => (
        <span className="font-mono font-bold text-white text-xs">₹{row.grossAmount.toLocaleString()}</span>
      ),
    },
    {
      header: 'Worker Net (80%)',
      accessor: (row: Transaction) => (
        <span className="font-mono font-bold text-emerald-400 text-xs">₹{row.workerShare.toLocaleString()}</span>
      ),
    },
    {
      header: 'Cooperative (10%)',
      accessor: (row: Transaction) => (
        <span className="text-xs font-mono font-semibold text-cyan-300">₹{row.coopShare.toLocaleString()}</span>
      ),
    },
    {
      header: 'Escrow Status',
      accessor: (row: Transaction) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Split Receipt',
      accessor: (row: Transaction) => (
        <button
          onClick={() => setSelectedTxn(row)}
          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer shadow-xs"
        >
          View Split
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Metrics for Transparent 80/10/10 Model */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Escrow Volume" 
          value="₹32.4 Lakhs" 
          icon={<CurrencyRupeeIcon className="w-5 h-5 text-cyan-400" />} 
          trend={{ value: 19, isPositive: true }} 
        />
        <StatCard 
          title="Direct Worker Payouts (80%)" 
          value="₹25.92 Lakhs" 
          icon={<CheckCircleIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 21, isPositive: true }} 
        />
        <StatCard 
          title="Coop Welfare Corpus (10%)" 
          value="₹3.24 Lakhs" 
          icon={<BanknotesIcon className="w-5 h-5 text-blue-400" />} 
          trend={{ value: 14, isPositive: true }} 
        />
        <StatCard 
          title="Escrow Vault Locked" 
          value="₹1.84 Lakhs" 
          icon={<LockClosedIcon className="w-5 h-5 text-amber-400" />} 
          trend={{ value: 5, isPositive: false }} 
        />
      </div>

      {/* Transparent Model Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white shadow-xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-wide">Work Trust 100% Transparent Fee Split Model</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Guaranteed 80% to Worker • 10% to Village Cooperative Welfare Fund • 10% Platform Maintenance
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono font-bold">
          <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
            Zero Hidden Deductions
          </span>
          <span className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
            NPCI UPI 2.0 Settlement
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="tech-glass-card p-4 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-cyan-400/60" />
          <input
            type="text"
            placeholder="Search txn ID, job, worker, UPI..."
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
            <option value="all">ALL SETTLEMENTS</option>
            <option value="paid">DISBURSED (PAID)</option>
            <option value="processing">IN ESCROW (PROCESSING)</option>
            <option value="pending">PENDING RELEASE</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="tech-glass-card rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="text-sm font-bold text-white tracking-wide">Financial Ledger & Escrow Registry</h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">{filtered.length} transactions</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Split Breakdown Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="tech-glass-card bg-slate-950/95 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-cyan-500/30 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">{selectedTxn.id}</span>
                <h3 className="font-extrabold text-white text-base mt-0.5">Escrow Settlement Breakdown</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedTxn.jobTitle}</p>
              </div>
              <button 
                onClick={() => setSelectedTxn(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-slate-900/80 p-4 rounded-2xl space-y-2 border border-slate-800 font-mono">
                <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-slate-800">
                  <span>Gross Customer Payment:</span>
                  <span className="font-bold text-sm text-white">₹{selectedTxn.grossAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 pt-1">
                  <span>Worker Payout (80%):</span>
                  <span className="font-bold text-sm">₹{selectedTxn.workerShare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-cyan-400">
                  <span>Coop Welfare Corpus (10%):</span>
                  <span className="font-bold text-sm">₹{selectedTxn.coopShare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Platform Operations (10%):</span>
                  <span className="font-bold text-sm">₹{selectedTxn.platformFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-2xl">
                <p className="text-[11px] text-emerald-300 font-bold font-mono">UPI DIRECT SETTLEMENT DISPATCHED:</p>
                <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{selectedTxn.workerUpi}</p>
                <p className="text-[10px] text-slate-400 mt-1 font-mono">NPCI Reference Hash: WT-NPCI-2026-9812903</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedTxn(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Exporting GST & Tax compliant voucher for ${selectedTxn.id}`);
                  setSelectedTxn(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center cursor-pointer shadow-lg"
              >
                <ArrowDownTrayIcon className="w-3.5 h-3.5 mr-1" />
                Tax Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}