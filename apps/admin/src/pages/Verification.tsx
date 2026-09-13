import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  CheckBadgeIcon, 
  ClockIcon, 
  ExclamationCircleIcon, 
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
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {row.workerName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-xs">{row.workerName}</p>
            <p className="text-[11px] text-blue-600 font-medium">{row.trade}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Credentials Submitted',
      accessor: (row: VerificationItem) => (
        <div>
          <span className="text-xs text-slate-800 font-medium flex items-center">
            <IdentificationIcon className="w-3.5 h-3.5 mr-1 text-slate-400 inline" /> {row.docType}
          </span>
          <span className="text-[11px] font-mono text-slate-400 block mt-0.5">{row.docNumber}</span>
        </div>
      ),
    },
    {
      header: 'Endorsing Cooperative',
      accessor: (row: VerificationItem) => (
        <span className="text-xs text-slate-700">{row.cooperative}</span>
      ),
    },
    {
      header: 'Trust Score',
      accessor: (row: VerificationItem) => (
        <span className={`text-xs font-bold ${row.score >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
          🛡️ {row.score}/100
        </span>
      ),
    },
    {
      header: 'Submitted',
      accessor: (row: VerificationItem) => (
        <span className="text-[11px] text-slate-500">{row.submittedAt}</span>
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
            className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            Inspect
          </button>
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => handleApprove(row.id)}
                className="p-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold transition-colors"
                title="Approve & Verify"
              >
                <CheckIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleReject(row.id)}
                className="p-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold transition-colors"
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
          icon={<ClockIcon className="w-5 h-5" />} 
          trend={{ value: 8, isPositive: false }} 
        />
        <StatCard 
          title="DigiLocker / Aadhaar Match" 
          value="94.2%" 
          icon={<DocumentCheckIcon className="w-5 h-5" />} 
          trend={{ value: 5, isPositive: true }} 
        />
        <StatCard 
          title="Verified Badges Active" 
          value={`${verifiedCount + 195}`} 
          icon={<CheckBadgeIcon className="w-5 h-5" />} 
          trend={{ value: 12, isPositive: true }} 
        />
        <StatCard 
          title="Avg Turnaround Time" 
          value="14 mins" 
          icon={<ShieldCheckIcon className="w-5 h-5" />} 
          trend={{ value: 18, isPositive: true }} 
        />
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-xl shadow-xs border border-slate-200/80 flex items-center space-x-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'pending'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Pending Review ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab('verified')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'verified'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Approved & Issued ({verifiedCount})
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'rejected'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Flagged / Rejected ({rejectedCount})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Records ({items.length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">
            {activeTab.toUpperCase()} Verification Submissions
          </h3>
          <span className="text-xs text-slate-500">{filtered.length} entries shown</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Inspection Modal */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{inspectItem.workerName}</h3>
                <p className="text-xs text-blue-600 font-medium">{inspectItem.trade} • {inspectItem.cooperative}</p>
              </div>
              <button 
                onClick={() => setInspectItem(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-emerald-50 border border-emerald-200/70 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-800 font-bold block">AI Aadhaar Matching Confidence</span>
                  <span className="text-lg font-bold text-emerald-700">{inspectItem.score}% Match Score</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  Passed DigiLocker
                </span>
              </div>

              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Document Type:</span>
                  <span className="font-semibold text-slate-800">{inspectItem.docType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Masked ID Number:</span>
                  <span className="font-mono font-semibold text-slate-800">{inspectItem.docNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Worker Phone:</span>
                  <span className="font-semibold text-slate-800">{inspectItem.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Endorsing Cooperative:</span>
                  <span className="font-semibold text-slate-800">{inspectItem.cooperative}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Submission Timestamp:</span>
                  <span className="text-slate-700">{inspectItem.submittedAt}</span>
                </div>
              </div>

              <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/50 text-center">
                <DocumentCheckIcon className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-700">Digital Skill Passport Preview</p>
                <p className="text-[11px] text-slate-400">Cryptographically signed by Work Trust Cooperative Authority</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => handleReject(inspectItem.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors"
              >
                Reject / Request Re-upload
              </button>
              <button
                onClick={() => handleApprove(inspectItem.id)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center shadow-xs"
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