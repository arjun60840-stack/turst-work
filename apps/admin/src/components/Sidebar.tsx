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
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartPieIcon },
  { name: 'Workers', href: '/workers', icon: UsersIcon, badge: '254' },
  { name: 'Customers', href: '/customers', icon: UserGroupIcon, badge: '1.2k' },
  { name: 'Cooperatives', href: '/cooperatives', icon: UsersIcon, badge: '14' },
  { name: 'Verification', href: '/verification', icon: CheckBadgeIcon, alertBadge: '3' },
  { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon, badge: '45 active' },
  { name: 'Payments', href: '/payments', icon: BanknotesIcon },
  { name: 'Complaints', href: '/complaints', icon: ExclamationTriangleIcon, alertBadge: '2' },
  { name: 'Demand Analytics', href: '/analytics', icon: DocumentChartBarIcon },
  { name: 'Audit Logs', href: '/audit-logs', icon: ClipboardDocumentListIcon },
];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="flex h-screen flex-col bg-[#0F172A] w-64 fixed left-0 top-0 text-slate-100 z-30 shadow-xl border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center px-5 bg-[#0A0F1D] border-b border-slate-800">
        <img 
          src="/logo.png" 
          alt="Work Trust" 
          className="h-9 w-9 mr-3 rounded-lg object-contain bg-white p-0.5 shadow-sm ring-1 ring-blue-500/20" 
        />
        <div className="flex flex-col">
          <h1 className="text-base font-extrabold tracking-tight text-white flex items-center leading-none">
            <span className="text-blue-500 mr-1">WORK</span>TRUST
          </h1>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-1">
            Admin Portal
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-1 flex-col overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Platform Operations
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`
              }
            >
              <div className="flex items-center">
                <item.icon
                  className="mr-3 h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>{item.name}</span>
              </div>
              {item.alertBadge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.alertBadge}
                </span>
              )}
              {item.badge && !item.alertBadge && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-slate-800 text-slate-400 group-hover:bg-slate-700">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="shrink-0 p-3 bg-[#0A0F1D]/80 border-t border-slate-800">
        <div className="px-3 py-2 mb-2 bg-slate-900/90 rounded-lg border border-slate-800">
          <p className="text-[11px] font-medium text-slate-300">Theme: Agriculture & Rural</p>
          <p className="text-[10px] text-slate-500">SIH 2026 Problem ID: 26089</p>
        </div>
        <button
          onClick={logout}
          className="group flex w-full items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
          Sign Out of Console
        </button>
      </div>
    </aside>
  );
}
