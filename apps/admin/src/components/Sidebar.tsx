import { NavLink } from 'react-router-dom';
import { 
  ChartPieIcon, 
  UsersIcon, 
  BriefcaseIcon, 
  CheckBadgeIcon, 
  BanknotesIcon, 
  ExclamationTriangleIcon,
  DocumentChartBarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  DevicePhoneMobileIcon,
  HeartIcon,
  BookOpenIcon,
  SparklesIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';

const userPortals = [
  { name: 'Customer Booking App', href: '/customer-portal', icon: DevicePhoneMobileIcon, badge: 'Voice / SOS', color: 'text-cyan-400' },
  { name: 'Worker Gig & Wallet App', href: '/worker-portal', icon: CpuChipIcon, badge: 'Rapido 30s', color: 'text-emerald-400' },
  { name: 'Worker Welfare & e-Shram', href: '/welfare', icon: HeartIcon, badge: '10% Fund', color: 'text-rose-400' },
  { name: 'SIH Tech Architecture', href: '/technical-approach', icon: BookOpenIcon, highlight: true, color: 'text-amber-400' },
];

const adminNavigation = [
  { name: 'Control Dashboard', href: '/dashboard', icon: ChartPieIcon },
  { name: 'Workers & Passports', href: '/workers', icon: UsersIcon, badge: '254' },
  { name: 'Customers & Farms', href: '/customers', icon: UserGroupIcon, badge: '1.2k' },
  { name: 'Cooperative Societies', href: '/cooperatives', icon: UsersIcon, badge: '14' },
  { name: 'DigiLocker KYC Queue', href: '/verification', icon: CheckBadgeIcon, alertBadge: '4' },
  { name: 'Live Gig Dispatch', href: '/jobs', icon: BriefcaseIcon, badge: '45 active' },
  { name: 'Transparent Escrow', href: '/payments', icon: BanknotesIcon },
  { name: 'Ombudsman Arbitration', href: '/complaints', icon: ExclamationTriangleIcon, alertBadge: '2' },
  { name: 'AI Demand Heatmaps', href: '/analytics', icon: DocumentChartBarIcon },
  { name: 'SHA-256 Audit Trail', href: '/audit-logs', icon: ClipboardDocumentListIcon },
];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="flex h-screen flex-col bg-[#050811] w-64 fixed left-0 top-0 text-slate-100 z-30 shadow-2xl border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center px-5 bg-[#03060C] border-b border-slate-800/80">
        <div className="w-9 h-9 mr-3 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] shadow-md shadow-cyan-500/20">
          <div className="w-full h-full bg-[#0A0F1D] rounded-[10px] p-1 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Work Trust" 
              className="h-full w-full object-contain" 
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-black tracking-tight text-white flex items-center leading-none">
            <span className="gradient-text-tech mr-1">WORK</span>TRUST
          </h1>
          <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest mt-1">
            COOPERATIVE AI MESH
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-1 flex-col overflow-y-auto py-4 px-3 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
        {/* Section 1: End-User Applications */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400/90 flex items-center justify-between">
            <span>// CLIENT PORTALS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          </div>
          <nav className="space-y-1">
            {userPortals.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30'
                      : item.highlight
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center truncate mr-1">
                  <item.icon className={`mr-2.5 h-4 w-4 shrink-0 ${item.color}`} />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-slate-800 text-slate-300 border border-slate-700/60 shrink-0">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Section 2: Cooperative Operations */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
            // OPERATIONAL REGISTRIES
          </div>
          <nav className="space-y-1">
            {adminNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600/90 text-white shadow-xs border-l-2 border-cyan-400 pl-2.5'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`
                }
              >
                <div className="flex items-center truncate mr-1">
                  <item.icon
                    className="mr-2.5 h-4 w-4 shrink-0 text-slate-400 group-hover:text-cyan-400 transition-colors"
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.alertBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                    {item.alertBadge}
                  </span>
                )}
                {item.badge && !item.alertBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500 shrink-0">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer / Telemetry Strip */}
      <div className="shrink-0 p-3 bg-[#03060C] border-t border-slate-800/80 space-y-2">
        <div className="px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[10px] space-y-1">
          <div className="flex justify-between text-slate-400">
            <span>NODE:</span>
            <span className="text-cyan-400">MUMBAI-DC1</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>CONSENSUS:</span>
            <span className="text-emerald-400">COOPERATIVE</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="group flex w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4 text-rose-400" />
          Disconnect Console
        </button>
      </div>
    </aside>
  );
}
