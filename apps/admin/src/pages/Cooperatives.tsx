import { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { 
  BuildingOffice2Icon, 
  UsersIcon, 
  MapIcon, 
  BanknotesIcon,
  MagnifyingGlassIcon,
  CheckBadgeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface Cooperative {
  id: string;
  name: string;
  regNumber: string;
  district: string;
  state: string;
  leadOfficer: string;
  phone: string;
  workersCount: number;
  activeGigs: number;
  welfareCorpus: string;
  status: 'verified' | 'active' | 'pending';
}

const initialCooperatives: Cooperative[] = [
  { id: 'COOP-01', name: 'Sahyadri Agro Labour Sahakari Sanstha', regNumber: 'MAH/PUN/COOP/2022/419', district: 'Pune Rural', state: 'Maharashtra', leadOfficer: 'Balasaheb Shinde', phone: '+91 94220 18291', workersCount: 84, activeGigs: 12, welfareCorpus: '₹1,45,000', status: 'verified' },
  { id: 'COOP-02', name: 'Krishak Vikas Shramik Sangh', regNumber: 'RAJ/JAI/2021/882', district: 'Jaipur Rural', state: 'Rajasthan', leadOfficer: 'Rameshwar Meena', phone: '+91 98290 33410', workersCount: 62, activeGigs: 8, welfareCorpus: '₹98,400', status: 'verified' },
  { id: 'COOP-03', name: 'Godavari Harvesters & Farm Crew', regNumber: 'AP/EG/COOP/2023/112', district: 'East Godavari', state: 'Andhra Pradesh', leadOfficer: 'S. Ramakrishna', phone: '+91 99480 66231', workersCount: 95, activeGigs: 16, welfareCorpus: '₹1,82,000', status: 'verified' },
  { id: 'COOP-04', name: 'Malwa Kisan & Mason Cooperative', regNumber: 'MP/IND/2024/093', district: 'Indore', state: 'Madhya Pradesh', leadOfficer: 'Devendra Choudhary', phone: '+91 97550 44123', workersCount: 48, activeGigs: 5, welfareCorpus: '₹64,200', status: 'active' },
  { id: 'COOP-05', name: 'Nashik Grape Orchard Labour Union', regNumber: 'MAH/NSK/2022/741', district: 'Nashik', state: 'Maharashtra', leadOfficer: 'Kailas Jadhav', phone: '+91 98231 77890', workersCount: 110, activeGigs: 21, welfareCorpus: '₹2,10,000', status: 'verified' },
  { id: 'COOP-06', name: 'Doaba Farm Artisans Society', regNumber: 'PB/JAL/2023/305', district: 'Jalandhar', state: 'Punjab', leadOfficer: 'Harpreet Dhillon', phone: '+91 98140 22987', workersCount: 55, activeGigs: 7, welfareCorpus: '₹88,000', status: 'pending' },
  { id: 'COOP-07', name: 'Chittoor Micro Irrigation Crew', regNumber: 'AP/CTR/2024/512', district: 'Chittoor', state: 'Andhra Pradesh', leadOfficer: 'N. Mohan Reddy', phone: '+91 94401 55678', workersCount: 32, activeGigs: 4, welfareCorpus: '₹54,000', status: 'active' },
];

export default function Cooperatives() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoop, setSelectedCoop] = useState<Cooperative | null>(null);

  const filtered = initialCooperatives.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.regNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Cooperative Society',
      accessor: (row: Cooperative) => (
        <div>
          <p className="font-bold text-slate-900 text-xs flex items-center">
            {row.name}
            {row.status === 'verified' && <CheckBadgeIcon className="w-3.5 h-3.5 ml-1 text-blue-600 inline" />}
          </p>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">{row.regNumber}</p>
        </div>
      ),
    },
    {
      header: 'District / State',
      accessor: (row: Cooperative) => (
        <div>
          <span className="text-xs font-medium text-slate-700 block">{row.district}</span>
          <span className="text-[11px] text-slate-400 block">{row.state}</span>
        </div>
      ),
    },
    {
      header: 'Lead Officer',
      accessor: (row: Cooperative) => (
        <div>
          <span className="text-xs font-semibold text-slate-800 block">{row.leadOfficer}</span>
          <span className="text-[11px] text-slate-500 block">{row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Affiliated Workers',
      accessor: (row: Cooperative) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
          👥 {row.workersCount} workers
        </span>
      ),
    },
    {
      header: 'Active Gigs',
      accessor: (row: Cooperative) => (
        <span className="text-xs font-semibold text-slate-700">{row.activeGigs} active</span>
      ),
    },
    {
      header: 'Welfare Corpus (10%)',
      accessor: (row: Cooperative) => (
        <span className="text-xs font-bold text-emerald-700">{row.welfareCorpus}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Cooperative) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Action',
      accessor: (row: Cooperative) => (
        <button
          onClick={() => setSelectedCoop(row)}
          className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-medium transition-colors border border-slate-200"
        >
          Audit Society
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Registered Cooperatives" 
          value="14 Active" 
          icon={<BuildingOffice2Icon className="w-5 h-5" />} 
          trend={{ value: 16, isPositive: true }} 
        />
        <StatCard 
          title="Affiliated Rural Workers" 
          value="486 Members" 
          icon={<UsersIcon className="w-5 h-5" />} 
          trend={{ value: 24, isPositive: true }} 
        />
        <StatCard 
          title="Rural Districts Covered" 
          value="12 Districts" 
          icon={<MapIcon className="w-5 h-5" />} 
          trend={{ value: 3, isPositive: true }} 
        />
        <StatCard 
          title="Total Welfare Corpus (10%)" 
          value="₹6.42 Lakhs" 
          icon={<BanknotesIcon className="w-5 h-5" />} 
          trend={{ value: 18, isPositive: true }} 
        />
      </div>

      {/* Search & Actions */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search cooperative, district, reg #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => alert('Cooperative onboarding form: Upload Society Bylaws, District Registrar Certificate, and Secretary Aadhaar.')}
          className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center transition-colors shadow-xs"
        >
          + Register New Cooperative
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Affiliated Cooperative Societies</h3>
          <span className="text-xs text-slate-500">{filtered.length} cooperatives active</span>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Cooperative Detail Modal */}
      {selectedCoop && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selectedCoop.name}</h3>
                <p className="text-xs text-slate-500">{selectedCoop.district}, {selectedCoop.state} • {selectedCoop.regNumber}</p>
              </div>
              <button 
                onClick={() => setSelectedCoop(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-blue-700 font-semibold block">Cooperative Welfare Fund</span>
                  <span className="text-lg font-bold text-blue-900">{selectedCoop.welfareCorpus}</span>
                </div>
                <button 
                  onClick={() => alert(`Initiating welfare dividend payout for members of ${selectedCoop.name}`)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium text-xs hover:bg-blue-700"
                >
                  Disburse Dividends
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[11px]">Representative / President</span>
                  <span className="font-semibold text-slate-800">{selectedCoop.leadOfficer}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Telephone</span>
                  <span className="font-semibold text-slate-800">{selectedCoop.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Active Group Gigs</span>
                  <span className="font-semibold text-slate-800">{selectedCoop.activeGigs} agricultural contracts</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Verification Status</span>
                  <StatusBadge status={selectedCoop.status} />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-700 block mb-1 text-xs">Compliance Verification:</span>
                <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                  <li>Registrar of Co-operative Societies (RCS) Registration: Verified ✅</li>
                  <li>Bank Escrow Mandate: Active (Bank of Baroda Rural Branch) ✅</li>
                  <li>10% Statutory Welfare Contribution: Compliant ✅</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => setSelectedCoop(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}