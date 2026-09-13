import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  ExclamationTriangleIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  ShieldExclamationIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface Complaint {
  id: string;
  jobId: string;
  complainant: string;
  role: 'Customer' | 'Worker' | 'Cooperative';
  category: string;
  subject: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  status: 'disputed' | 'under_review' | 'resolved';
  date: string;
}

const initialComplaints: Complaint[] = [
  { id: 'CMP-701', jobId: 'JOB-8828', complainant: 'Suresh Patel', role: 'Customer', category: 'Equipment Failure', subject: 'Tractor hydraulic line damaged during field prep', description: 'Worker hydraulic attachment leaked fluid into orchard ditch. Requesting partial escrow hold for repair costs.', severity: 'high', status: 'disputed', date: '09 Sep, 04:30 PM' },
  { id: 'CMP-702', jobId: 'JOB-8815', complainant: 'Santosh Gavit', role: 'Worker', category: 'Payment Dispute', subject: 'Additional 2 acres harvested beyond initial booking', description: 'Customer requested 2 additional acres of paddy reaping beyond the 4 acres booked. Seeking fair supplementary wage payment.', severity: 'medium', status: 'under_review', date: '08 Sep, 06:10 PM' },
  { id: 'CMP-695', jobId: 'JOB-8790', complainant: 'Meena Sharma', role: 'Customer', category: 'Attendance / Delay', subject: 'Crew delayed by 3 hours due to transport breakdown', description: 'Harvesting team arrived 3 hours late. Cooperative provided replacement worker and resolved delay.', severity: 'low', status: 'resolved', date: '05 Sep, 11:00 AM' },
  { id: 'CMP-688', jobId: 'JOB-8762', complainant: 'Rajesh Verma', role: 'Customer', category: 'Service Quality', subject: 'Cold storage sensor calibration mismatch', description: 'Sensor wiring needed re-testing. Certified electrician revisited and cleared calibration testing.', severity: 'medium', status: 'resolved', date: '01 Sep, 02:45 PM' },
];

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [selectedCmp, setSelectedCmp] = useState<Complaint | null>(null);

  const handleResolve = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'resolved' } : c));
    if (selectedCmp?.id === id) {
      setSelectedCmp({ ...selectedCmp, status: 'resolved' });
    }
  };

  const filtered = complaints.filter(c => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || c.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const columns = [
    {
      header: 'Dispute ID & Date',
      accessor: (row: Complaint) => (
        <div>
          <span className="font-mono text-xs font-bold text-rose-600 block">{row.id}</span>
          <span className="text-[10px] text-slate-400">{row.date}</span>
        </div>
      ),
    },
    {
      header: 'Complainant',
      accessor: (row: Complaint) => (
        <div>
          <span className="text-xs font-semibold text-slate-800 block">{row.complainant}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">{row.role}</span>
        </div>
      ),
    },
    {
      header: 'Dispute Subject',
      accessor: (row: Complaint) => (
        <div className="max-w-xs">
          <p className="font-semibold text-slate-900 text-xs truncate">{row.subject}</p>
          <span className="text-[11px] text-slate-500 font-medium">Category: {row.category}</span>
        </div>
      ),
    },
    {
      header: 'Job Reference',
      accessor: (row: Complaint) => (
        <span className="text-xs font-mono text-blue-600 font-bold">{row.jobId}</span>
      ),
    },
    {
      header: 'Severity',
      accessor: (row: Complaint) => {
        const colors = {
          high: 'bg-rose-100 text-rose-700 border-rose-200',
          medium: 'bg-amber-100 text-amber-700 border-amber-200',
          low: 'bg-slate-100 text-slate-700 border-slate-200',
        };
        return (
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${colors[row.severity]}`}>
            {row.severity.toUpperCase()}
          </span>
        );
      },
    },
    {
      header: 'Status',
      accessor: (row: Complaint) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Arbitration',
      accessor: (row: Complaint) => (
        <button
          onClick={() => setSelectedCmp(row)}
          className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-colors border border-slate-200"
        >
          Arbitrate
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Open Grievances" 
          value="2 Pending" 
          icon={<ExclamationTriangleIcon className="w-5 h-5 text-rose-600" />} 
          trend={{ value: 25, isPositive: false }} 
        />
        <StatCard 
          title="Resolved This Month" 
          value="41 Resolved" 
          icon={<CheckBadgeIcon className="w-5 h-5 text-emerald-600" />} 
          trend={{ value: 18, isPositive: true }} 
        />
        <StatCard 
          title="Avg Arbitration Time" 
          value="3.4 Hours" 
          icon={<ClockIcon className="w-5 h-5 text-blue-600" />} 
          trend={{ value: 30, isPositive: true }} 
        />
        <StatCard 
          title="Overall Dispute Rate" 
          value="0.6% (Low)" 
          icon={<ShieldExclamationIcon className="w-5 h-5 text-emerald-600" />} 
          trend={{ value: 2, isPositive: true }} 
        />
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search dispute, complainant, subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium">Severity:</span>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="high">High Severity</option>
            <option value="medium">Medium Severity</option>
            <option value="low">Low Severity</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Arbitration Registry</h3>
          <span className="text-xs text-slate-500">{filtered.length} disputes logged</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Arbitration Modal */}
      {selectedCmp && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-rose-600">{selectedCmp.id}</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedCmp.subject}</h3>
                <p className="text-xs text-slate-500">Related Job: {selectedCmp.jobId} • {selectedCmp.date}</p>
              </div>
              <button 
                onClick={() => setSelectedCmp(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Complainant:</span>
                  <span className="font-semibold text-slate-800">{selectedCmp.complainant} ({selectedCmp.role})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-semibold text-slate-800">{selectedCmp.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Status:</span>
                  <StatusBadge status={selectedCmp.status} />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60">
                <span className="text-amber-800 font-bold block mb-1">Grievance Statement:</span>
                <p className="text-amber-950 leading-relaxed text-xs">{selectedCmp.description}</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-blue-900 font-bold block mb-1">Cooperative Ombudsman Protocol:</span>
                <p className="text-[11px] text-blue-800">
                  Under SIH 2026 Cooperative Guidelines, escrow funds are temporarily held. Arbitrators may release 50% to worker and refund 50% to customer, or approve full release upon proof.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedCmp(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
              {selectedCmp.status !== 'resolved' && (
                <button
                  onClick={() => handleResolve(selectedCmp.id)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center shadow-xs"
                >
                  <CheckBadgeIcon className="w-4 h-4 mr-1" />
                  Issue Resolution & Release Escrow
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}