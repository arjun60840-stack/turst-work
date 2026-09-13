import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  CheckBadgeIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  DocumentCheckIcon,
  CheckIcon,
  XMarkIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

interface VerificationItem {
  id: string;
  workerName: string;
  phone: string;
  trade: string;
  docType: string;
  docNumber: string;
  cooperative: string;
  submittedAt: string;
  status: 'pending' | 'verified' | 'rejected';
  score: number;
}

const initialRequests: VerificationItem[] = [
  { id: 'VRF-401', workerName: 'Santosh Gavit', phone: '+91 97654 32109', trade: 'Combine Harvester Operator', docType: 'Aadhaar + Heavy Machinery Licence', docNumber: 'XXXX-XXXX-8921', cooperative: 'Sahyadri Agro Labour Sahakari', submittedAt: 'Today, 10:15 AM', status: 'pending', score: 92 },
  { id: 'VRF-402', workerName: 'Pooja Waghmare', phone: '+91 98211 44556', trade: 'Solar Pump & Micro-Irrigation Technician', docType: 'PMKVY Skill Passport + Aadhaar', docNumber: 'XXXX-XXXX-3341', cooperative: 'Godavari Harvesters Crew', submittedAt: 'Today, 11:30 AM', status: 'pending', score: 88 },
  { id: 'VRF-403', workerName: 'Maniram Gurjar', phone: '+91 94140 88912', trade: 'Drip Irrigation & Pipeline Fitter', docType: 'ITI Certificate + Aadhaar', docNumber: 'XXXX-XXXX-6102', cooperative: 'Krishak Vikas Shramik Sangh', submittedAt: 'Yesterday, 04:45 PM', status: 'pending', score: 95 },
  { id: 'VRF-404', workerName: 'Bikramjit Dhaliwal', phone: '+91 98720 11928', trade: 'Tractor Repair & Hydraulic Mechanics', docType: 'Aadhaar + Trade Guild Certificate', docNumber: 'XXXX-XXXX-5520', cooperative: 'Doaba Farm Artisans Society', submittedAt: 'Yesterday, 02:10 PM', status: 'pending', score: 79 },
  { id: 'VRF-390', workerName: 'Ravi Kumar', phone: '+91 98234 56789', trade: 'Agricultural Electrician', docType: 'Aadhaar + Wireman License', docNumber: 'XXXX-XXXX-1122', cooperative: 'Sahyadri Agro Labour Sahakari', submittedAt: '10 Sep 2026', status: 'verified', score: 98 },
  { id: 'VRF-389', workerName: 'Rameshwar Meena', phone: '+91 98290 33410', trade: 'Grain Sorter & Cold-Storage Handler', docType: 'FSSAI Food Handling + Aadhaar', docNumber: 'XXXX-XXXX-4412', cooperative: 'Krishak Vikas Shramik Sangh', submittedAt: '09 Sep 2026', status: 'verified', score: 94 },
  { id: 'VRF-385', workerName: 'Dinesh Rathod', phone: '+91 97123 44556', trade: 'Tree Pruning & Orchard Specialist', docType: 'Blurry ID photo / Unclear Aadhaar', docNumber: 'XXXX-XXXX-9901', cooperative: 'Direct Enrolment', submittedAt: '08 Sep 2026', status: 'rejected', score: 45 },
];

export default function Verification() {
  const [items, setItems] = useState<VerificationItem[]>(initialRequests);
  const [activeTab, setActiveTab] = useState<'pending' | 'verified' | 'rejected' | 'all'>('pending');
  const [inspectItem, setInspectItem] = useState<VerificationItem | null>(null);

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'verified' } : item));
    if (inspectItem?.id === id) setInspectItem(null);
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected' } : item));
    if (inspectItem?.id === id) setInspectItem(null);
  };

  const filtered = items.filter(item => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  const pendingCount = items.filter(i => i.status === 'pending').length;
  const verifiedCount = items.filter(i => i.status === 'verified').length;
  const rejectedCount = items.filter(i => i.status === 'rejected').length;

  const columns = [
    {
      header: 'Worker & Trade',
      accessor: (row: VerificationItem) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shadow-xs">
            {row.workerName.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-white text-xs">{row.workerName}</p>
            <p className="text-[11px] text-cyan-400 font-mono">{row.trade}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Credentials Submitted',
      accessor: (row: VerificationItem) => (
        <div>
          <span className="text-xs text-slate-200 font-medium flex items-center">
            <IdentificationIcon className="w-3.5 h-3.5 mr-1 text-cyan-400 inline" /> {row.docType}
          </span>
          <span className="text-[11px] font-mono text-slate-500 block mt-0.5">{row.docNumber}</span>
        </div>
      ),
    },
    {
      header: 'Endorsing Cooperative',
      accessor: (row: VerificationItem) => (
        <span className="text-xs text-slate-300 font-medium">{row.cooperative}</span>
      ),
    },
    {
      header: 'Trust Score',
      accessor: (row: VerificationItem) => (
        <span className={`text-xs font-mono font-bold ${row.score >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
          🛡️ {row.score}/100
        </span>
      ),
    },
    {
      header: 'Submitted',
      accessor: (row: VerificationItem) => (
        <span className="text-[11px] font-mono text-slate-400">{row.submittedAt}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: VerificationItem) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Review Actions',
      accessor: (row: VerificationItem) => (
        <div className="flex items-center space-x-1.5" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => setInspectItem(row)}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer shadow-xs"
          >
            Inspect
          </button>
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => handleApprove(row.id)}
                className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 transition-all cursor-pointer"
                title="Approve & Verify"
              >
                <CheckIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleReject(row.id)}
                className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-400 transition-all cursor-pointer"
                title="Reject"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Pending Queue" 
          value={`${pendingCount} Requests`} 
          icon={<ClockIcon className="w-5 h-5 text-amber-400" />} 
          trend={{ value: 8, isPositive: false }} 
        />
        <StatCard 
          title="DigiLocker / Aadhaar Match" 
          value="94.2%" 
          icon={<DocumentCheckIcon className="w-5 h-5 text-cyan-400" />} 
          trend={{ value: 5, isPositive: true }} 
        />
        <StatCard 
          title="Verified Badges Active" 
          value={`${verifiedCount + 195}`} 
          icon={<CheckBadgeIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 12, isPositive: true }} 
        />
        <StatCard 
          title="Avg Turnaround Time" 
          value="14 mins" 
          icon={<ShieldCheckIcon className="w-5 h-5 text-indigo-400" />} 
          trend={{ value: 18, isPositive: true }} 
        />
      </div>

      {/* Tabs */}
      <div className="tech-glass-card p-2 rounded-2xl border border-cyan-500/20 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'pending'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          PENDING REVIEW ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab('verified')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'verified'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          APPROVED & ISSUED ({verifiedCount})
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'rejected'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          FLAGGED / REJECTED ({rejectedCount})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          ALL RECORDS ({items.length})
        </button>
      </div>

      {/* Table */}
      <div className="tech-glass-card rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              {activeTab} KYC Submissions
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">{filtered.length} entries shown</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Inspection Modal */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="tech-glass-card bg-slate-950/95 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-cyan-500/30 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-extrabold text-white text-base">{inspectItem.workerName}</h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">{inspectItem.trade} • {inspectItem.cooperative}</p>
              </div>
              <button 
                onClick={() => setInspectItem(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold block">AI AADHAAR MATCHING CONFIDENCE</span>
                  <span className="text-lg font-mono font-black text-emerald-300">{inspectItem.score}% Match Score</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Passed DigiLocker
                </span>
              </div>

              <div className="space-y-2 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">DOCUMENT TYPE:</span>
                  <span className="font-semibold text-slate-200">{inspectItem.docType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MASKED ID HASH:</span>
                  <span className="font-semibold text-cyan-400">{inspectItem.docNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">WORKER PHONE:</span>
                  <span className="font-semibold text-slate-200">{inspectItem.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ENDORSING COOP:</span>
                  <span className="font-semibold text-slate-200">{inspectItem.cooperative}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SUBMISSION TIME:</span>
                  <span className="text-slate-400">{inspectItem.submittedAt}</span>
                </div>
              </div>

              <div className="border border-dashed border-cyan-500/40 rounded-2xl p-4 bg-slate-900/40 text-center">
                <DocumentCheckIcon className="w-8 h-8 text-cyan-400 mx-auto mb-1" />
                <p className="text-xs font-bold text-white font-mono">Digital Skill Passport Certificate</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Cryptographically signed by Work Trust Cooperative Authority</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
              <button
                onClick={() => handleReject(inspectItem.id)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-rose-400 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 transition-all cursor-pointer"
              >
                Reject / Re-upload
              </button>
              <button
                onClick={() => handleApprove(inspectItem.id)}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center cursor-pointer shadow-lg"
              >
                <CheckIcon className="w-3.5 h-3.5 mr-1" />
                Approve & Issue Passport
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}