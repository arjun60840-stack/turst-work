import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  ExclamationTriangleIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  ShieldExclamationIcon,
  MagnifyingGlassIcon
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
          <span className="font-mono text-xs font-bold text-rose-400 block">{row.id}</span>
          <span className="text-[10px] font-mono text-slate-400">{row.date}</span>
        </div>
      ),
    },
    {
      header: 'Complainant Node',
      accessor: (row: Complaint) => (
        <div>
          <span className="text-xs font-semibold text-white block">{row.complainant}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold">{row.role}</span>
        </div>
      ),
    },
    {
      header: 'Dispute Subject',
      accessor: (row: Complaint) => (
        <div className="max-w-xs">
          <p className="font-semibold text-slate-200 text-xs truncate">{row.subject}</p>
          <span className="text-[11px] font-mono text-slate-400">Category: {row.category}</span>
        </div>
      ),
    },
    {
      header: 'Job Link',
      accessor: (row: Complaint) => (
        <span className="text-xs font-mono text-cyan-400 font-bold">{row.jobId}</span>
      ),
    },
    {
      header: 'Severity Index',
      accessor: (row: Complaint) => {
        const colors = {
          high: 'bg-rose-950/60 text-rose-400 border-rose-500/40',
          medium: 'bg-amber-950/60 text-amber-400 border-amber-500/40',
          low: 'bg-slate-900 text-slate-400 border-slate-700',
        };
        return (
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${colors[row.severity]}`}>
            {row.severity.toUpperCase()}
          </span>
        );
      },
    },
    {
      header: 'Escrow Status',
      accessor: (row: Complaint) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Arbitration',
      accessor: (row: Complaint) => (
        <button
          onClick={() => setSelectedCmp(row)}
          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer shadow-xs"
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
          icon={<ExclamationTriangleIcon className="w-5 h-5 text-rose-400" />} 
          trend={{ value: 25, isPositive: false }} 
        />
        <StatCard 
          title="Resolved This Month" 
          value="41 Resolved" 
          icon={<CheckBadgeIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 18, isPositive: true }} 
        />
        <StatCard 
          title="Avg Arbitration Time" 
          value="3.4 Hours" 
          icon={<ClockIcon className="w-5 h-5 text-cyan-400" />} 
          trend={{ value: 30, isPositive: true }} 
        />
        <StatCard 
          title="Overall Dispute Rate" 
          value="0.6% (Low)" 
          icon={<ShieldExclamationIcon className="w-5 h-5 text-emerald-400" />} 
          trend={{ value: 2, isPositive: true }} 
        />
      </div>

      {/* Filter and Search */}
      <div className="tech-glass-card p-4 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-cyan-400/60" />
          <input
            type="text"
            placeholder="Search dispute, complainant, subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950/80 text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-cyan-500 font-sans transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-mono">SEVERITY:</span>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-slate-950/80 text-cyan-300 border border-slate-800 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="all">ALL SEVERITIES</option>
            <option value="high">HIGH SEVERITY</option>
            <option value="medium">MEDIUM SEVERITY</option>
            <option value="low">LOW SEVERITY</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="tech-glass-card rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="text-sm font-bold text-white tracking-wide">Ombudsman Arbitration Registry</h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">{filtered.length} disputes logged</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Arbitration Modal */}
      {selectedCmp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="tech-glass-card bg-slate-950/95 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-cyan-500/30 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-rose-400">{selectedCmp.id}</span>
                <h3 className="font-extrabold text-white text-base mt-0.5">{selectedCmp.subject}</h3>
                <p className="text-xs text-slate-400 font-mono">Related Job: {selectedCmp.jobId} • {selectedCmp.date}</p>
              </div>
              <button 
                onClick={() => setSelectedCmp(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-2xl space-y-1.5 border border-slate-800 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">COMPLAINANT:</span>
                  <span className="font-semibold text-slate-200">{selectedCmp.complainant} ({selectedCmp.role})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CATEGORY:</span>
                  <span className="font-semibold text-slate-200">{selectedCmp.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CURRENT STATUS:</span>
                  <StatusBadge status={selectedCmp.status} />
                </div>
              </div>

              <div className="p-3.5 bg-amber-950/30 rounded-2xl border border-amber-500/40">
                <span className="text-amber-400 font-bold block mb-1 font-mono text-xs">GRIEVANCE STATEMENT:</span>
                <p className="text-slate-300 leading-relaxed text-xs">{selectedCmp.description}</p>
              </div>

              <div className="p-3.5 bg-slate-900/40 rounded-2xl border border-slate-800">
                <span className="text-cyan-300 font-bold block mb-1 font-mono text-xs">COOPERATIVE OMBUDSMAN PROTOCOL:</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Under Work Trust Cooperative Guidelines, escrow funds are temporarily held. Arbitrators may release 50% to worker and refund 50% to client, or approve full release upon proof.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedCmp(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
              >
                Close
              </button>
              {selectedCmp.status !== 'resolved' && (
                <button
                  onClick={() => handleResolve(selectedCmp.id)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center cursor-pointer shadow-lg"
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