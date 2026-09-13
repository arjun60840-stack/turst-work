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
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';

const userPortals = [
  { name: '🌾 Customer Booking App', href: '/customer-portal', icon: DevicePhoneMobileIcon, badge: 'Voice / SOS' },
  { name: '👷 Worker Gig & Wallet App', href: '/worker-portal', icon: DevicePhoneMobileIcon, badge: 'Rapido 30s' },
  { name: '🛡️ Worker Welfare & e-Shram', href: '/welfare', icon: HeartIcon, badge: '10% Fund' },
  { name: '📑 SIH Technical Presentation', href: '/technical-approach', icon: BookOpenIcon, highlight: true },
];

const adminNavigation = [
  { name: 'Dashboard Overview', href: '/dashboard', icon: ChartPieIcon },
  { name: 'Workers Directory', href: '/workers', icon: UsersIcon, badge: '254' },
  { name: 'Customers Directory', href: '/customers', icon: UserGroupIcon, badge: '1.2k' },
  { name: 'Cooperative SHGs', href: '/cooperatives', icon: UsersIcon, badge: '14' },
  { name: 'KYC & Skill Verification', href: '/verification', icon: CheckBadgeIcon, alertBadge: '4' },
  { name: 'Live Gig Dispatch', href: '/jobs', icon: BriefcaseIcon, badge: '45 active' },
  { name: 'Payments & Escrow Ledger', href: '/payments', icon: BanknotesIcon },
  { name: 'Arbitration & Disputes', href: '/complaints', icon: ExclamationTriangleIcon, alertBadge: '2' },
  { name: 'Demand & Labor Analytics', href: '/analytics', icon: DocumentChartBarIcon },
  { name: 'Immutable Audit Logs', href: '/audit-logs', icon: ClipboardDocumentListIcon },
];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="flex h-screen flex-col bg-[#0A0F1D] w-64 fixed left-0 top-0 text-slate-100 z-30 shadow-2xl border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center px-5 bg-[#070A14] border-b border-slate-800/80">
        <img 
          src="/logo.png" 
          alt="Work Trust" 
          className="h-9 w-9 mr-3 rounded-xl object-contain bg-white p-1 shadow-md ring-2 ring-blue-500/30" 
        />
        <div className="flex flex-col">
          <h1 className="text-base font-black tracking-tight text-white flex items-center leading-none">
            <span className="text-blue-400 mr-1">WORK</span>TRUST
          </h1>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-1">
            Cooperative Gig Platform
          </span>
        </div>
      </div>

      {/* Navigation Links with User Portal Section */}
      <div className="flex flex-1 flex-col overflow-y-auto py-4 px-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
        {/* Section 1: End-User & SIH Presentation Apps */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center justify-between">
            <span>🚀 Live App Experiences</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <nav className="space-y-1">
            {userPortals.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30'
                      : item.highlight
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center truncate mr-1">
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-white/10 text-slate-200 shrink-0">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Section 2: Cooperative Admin Operations */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            👑 Cooperative Admin Console
          </div>
          <nav className="space-y-1">
            {adminNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`
                }
              >
                <div className="flex items-center truncate mr-1">
                  <item.icon
                    className="mr-2.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.alertBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                    {item.alertBadge}
                  </span>
                )}
                {item.badge && !item.alertBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-slate-800 text-slate-400 shrink-0">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer / Logout */}
      <div className="shrink-0 p-3 bg-[#070A14] border-t border-slate-800">
        <div className="px-3 py-2 mb-2 bg-slate-900/90 rounded-xl border border-slate-800/80">
          <p className="text-[11px] font-bold text-amber-400">SIH 2026 Problem ID: 26089</p>
          <p className="text-[10px] text-slate-400">Agriculture & Rural Gig Economy</p>
        </div>
        <button
          onClick={logout}
          className="group flex w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/15 border border-rose-500/20 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4 text-rose-400" />
          Sign Out of Platform
        </button>
      </div>
    </aside>
  );
}
