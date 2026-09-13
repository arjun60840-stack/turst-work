import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  ClipboardDocumentListIcon, 
  ShieldCheckIcon, 
  KeyIcon, 
  ServerIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress: string;
  hash: string;
  status: 'success' | 'warning';
}

const initialLogs: AuditLog[] = [
  { id: 'LOG-8812', timestamp: 'Today, 11:32:10 AM', action: 'WORKER_VERIFIED', actor: 'Super Admin (admin@nexvion.demo)', entityType: 'Worker', entityId: 'WRK-401 (Santosh Gavit)', details: 'DigiLocker Aadhaar + Heavy Machinery Licence approved with 92% confidence score', ipAddress: '103.21.144.12', hash: 'e3b0c44298fc1c149afbf4c8996fb924', status: 'success' },
  { id: 'LOG-8811', timestamp: 'Today, 11:15:00 AM', action: 'ESCROW_RELEASED', actor: 'System Auto-Disbursement', entityType: 'Payment', entityId: 'TXN-90218 (₹8,500)', details: '80% ₹6,800 to Bikramjit UPI, 10% ₹850 to Doaba Coop, 10% Platform fee', ipAddress: '127.0.0.1 (API Cron)', hash: 'a591a6d40bf420404a011733cfb7b190', status: 'success' },
  { id: 'LOG-8810', timestamp: 'Today, 10:45:22 AM', action: 'DISPUTE_ARBITRATED', actor: 'Ombudsman (Coop Board)', entityType: 'Complaint', entityId: 'CMP-695', details: 'Transport delay resolved amicably with substitute worker assignment', ipAddress: '115.96.220.45', hash: '2c26b46b68ffc68ff99b453c1d304134', status: 'success' },
  { id: 'LOG-8809', timestamp: 'Today, 09:30:15 AM', action: 'COOPERATIVE_APPROVED', actor: 'Super Admin (admin@nexvion.demo)', entityType: 'Cooperative', entityId: 'COOP-05 (Nashik Grape Union)', details: 'Registrar Certificate verified. 110 affiliated workers enrolled into skill registry', ipAddress: '103.21.144.12', hash: '7d793037a0760186574b0282f2f435e7', status: 'success' },
  { id: 'LOG-8808', timestamp: 'Today, 08:31:00 AM', action: 'OTP_ATTENDANCE_MATCH', actor: 'Worker Mobile App', entityType: 'Job', entityId: 'JOB-8821', details: 'Geofence validated at (18.9690, 72.8193). OTP 123456 verified by customer', ipAddress: '49.36.12.89', hash: '8f434346648f6b96df89dda901c5176b', status: 'success' },
  { id: 'LOG-8807', timestamp: 'Yesterday, 07:42:18 PM', action: 'FLAGGED_LOGIN_ATTEMPT', actor: 'Unknown Client', entityType: 'Auth', entityId: 'User: admin@nexvion.demo', details: 'Invalid credential attempt from unverified IP block. Rate limiter activated.', ipAddress: '185.220.101.5', hash: '4b227777d4dd1fc61c6f884f48641d02', status: 'warning' },
  { id: 'LOG-8806', timestamp: 'Yesterday, 05:12:00 PM', action: 'ADMIN_LOGIN_SUCCESS', actor: 'Super Admin (admin@nexvion.demo)', entityType: 'Auth', entityId: 'Session JWT Created', details: 'Successful 2FA login from Chrome/Windows (Work Trust Admin Console)', ipAddress: '103.21.144.12', hash: 'ef2d127de37b942baad06145e54b0c61', status: 'success' },
];

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  const filtered = initialLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const columns = [
    {
      header: 'Timestamp & ID',
      accessor: (row: AuditLog) => (
        <div>
          <span className="font-semibold text-slate-800 text-xs block">{row.timestamp}</span>
          <span className="font-mono text-[10px] text-slate-400">{row.id}</span>
        </div>
      ),
    },
    {
      header: 'Event Action',
      accessor: (row: AuditLog) => {
        const isWarn = row.status === 'warning';
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold ${isWarn ? 'bg-rose-100 text-rose-700' : 'bg-blue-50 text-blue-700 border border-blue-200/60'}`}>
            {row.action}
          </span>
        );
      },
    },
    {
      header: 'Actor (User / System)',
      accessor: (row: AuditLog) => (
        <div>
          <span className="text-xs font-semibold text-slate-800 block">{row.actor}</span>
          <span className="text-[10px] text-slate-400 font-mono">IP: {row.ipAddress}</span>
        </div>
      ),
    },
    {
      header: 'Target Entity',
      accessor: (row: AuditLog) => (
        <div>
          <span className="text-xs font-medium text-slate-900 block">{row.entityId}</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{row.entityType}</span>
        </div>
      ),
    },
    {
      header: 'Audit Description & Integrity Hash',
      accessor: (row: AuditLog) => (
        <div className="max-w-md">
          <p className="text-xs text-slate-700 leading-snug">{row.details}</p>
          <span className="text-[10px] font-mono text-slate-400 block mt-0.5 truncate">
            SHA-256: {row.hash}
          </span>
        </div>
      ),
    },
    {
      header: 'Integrity',
      accessor: (row: AuditLog) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.status === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
          {row.status === 'success' ? 'VERIFIED' : 'ALERT'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Audited Events" 
          value="3,842 Events" 
          icon={<ClipboardDocumentListIcon className="w-5 h-5 text-blue-600" />} 
          trend={{ value: 16, isPositive: true }} 
        />
        <StatCard 
          title="Identity & KYC Audits" 
          value="1,290 Checks" 
          icon={<ShieldCheckIcon className="w-5 h-5 text-emerald-600" />} 
          trend={{ value: 24, isPositive: true }} 
        />
        <StatCard 
          title="Cryptographic Hash Chain" 
          value="100% Intact" 
          icon={<KeyIcon className="w-5 h-5 text-amber-600" />} 
        />
        <StatCard 
          title="System Node Status" 
          value="Active (Render)" 
          icon={<ServerIcon className="w-5 h-5 text-indigo-600" />} 
        />
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search action, actor, entity, IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Action Categories</option>
            <option value="WORKER_VERIFIED">WORKER_VERIFIED</option>
            <option value="ESCROW_RELEASED">ESCROW_RELEASED</option>
            <option value="DISPUTE_ARBITRATED">DISPUTE_ARBITRATED</option>
            <option value="COOPERATIVE_APPROVED">COOPERATIVE_APPROVED</option>
            <option value="ADMIN_LOGIN_SUCCESS">ADMIN_LOGIN_SUCCESS</option>
          </select>

          <button
            onClick={() => alert('Exporting full tamper-evident audit trail (CSV + PGP Signature) for SIH 2026 jury review.')}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center transition-colors border border-slate-200"
          >
            <ArrowDownTrayIcon className="w-3.5 h-3.5 mr-1" />
            Export Audit Log
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Immutable Compliance & Security Ledger</h3>
          <span className="text-xs text-slate-500">{filtered.length} audit entries</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>
    </div>
  );
}