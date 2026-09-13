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
  CpuChipIcon 
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

const userPortals = [
  { name: 'Client Booking App', href: '/customer-portal', icon: DevicePhoneMobileIcon, badge: 'Voice / SOS', color: 'text-cyan-500' },
  { name: 'Worker Gig & Wallet App', href: '/worker-portal', icon: CpuChipIcon, badge: 'Rapido 30s', color: 'text-emerald-500' },
  { name: 'Worker Welfare & e-Shram', href: '/welfare', icon: HeartIcon, badge: '10% Fund', color: 'text-rose-500' },
];

const adminNavigation = [
  { name: 'Control Dashboard', href: '/dashboard', icon: ChartPieIcon },
  { name: 'Workers & Passports', href: '/workers', icon: UsersIcon, badge: '254' },
  { name: 'Clients & Accounts', href: '/customers', icon: UserGroupIcon, badge: '1.2k' },
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
  const { theme } = useThemeStore();
  const isLight = theme === 'light';

  return (
    <aside className={`flex h-screen flex-col w-64 fixed left-0 top-0 z-30 shadow-2xl select-none transition-colors duration-200 ${
      isLight 
        ? 'bg-white text-slate-800 border-r border-slate-200' 
        : 'bg-[#050811] text-slate-100 border-r border-slate-800/80'
    }`}>
      {/* Brand Header */}
      <div className={`flex h-16 shrink-0 items-center px-5 border-b ${
        isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-[#03060C] border-slate-800/80'
      }`}>
        <div className="w-9 h-9 mr-3 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] shadow-md shadow-cyan-500/20">
          <div className={`w-full h-full rounded-[10px] p-1 flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#0A0F1D]'}`}>
            <img 
              src="/logo.png" 
              alt="Work Trust" 
              className="h-full w-full object-contain" 
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className={`text-base font-black tracking-tight flex items-center leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <span className="gradient-text-tech mr-1">WORK</span>TRUST
          </h1>
          <span className={`text-[9px] font-mono font-bold uppercase tracking-widest mt-1 ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
            COOPERATIVE AI MESH
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-1 flex-col overflow-y-auto py-4 px-3 space-y-5 scrollbar-thin scrollbar-thumb-slate-300">
        {/* Section 1: End-User Applications */}
        <div>
          <div className={`px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-between ${
            isLight ? 'text-cyan-800' : 'text-cyan-400/90'
          }`}>
            <span>// DIRECT CLIENT PORTALS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
          </div>
          <nav className="space-y-1">
            {userPortals.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 !text-white shadow-md shadow-blue-500/20'
                      : isLight 
                        ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center truncate mr-1">
                      <item.icon className={`mr-2.5 h-4 w-4 shrink-0 ${isActive ? 'text-white' : item.color}`} />
                      <span className={`truncate ${isActive ? '!text-white' : ''}`}>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isLight 
                            ? 'bg-slate-100 text-slate-700 border border-slate-200' 
                            : 'bg-slate-800 text-slate-300 border border-slate-700/60'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Section 2: Cooperative Operations */}
        <div>
          <div className={`px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider ${
            isLight ? 'text-slate-400 font-semibold' : 'text-slate-500'
          }`}>
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
                      ? 'bg-blue-600 !text-white shadow-sm font-bold'
                      : isLight 
                        ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center truncate mr-1">
                      <item.icon
                        className={`mr-2.5 h-4 w-4 shrink-0 transition-colors ${
                          isActive 
                            ? 'text-white' 
                            : isLight ? 'text-slate-500 group-hover:text-blue-600' : 'text-slate-400 group-hover:text-cyan-400'
                        }`}
                        aria-hidden="true"
                      />
                      <span className={`truncate ${isActive ? '!text-white font-bold' : ''}`}>{item.name}</span>
                    </div>
                    {item.alertBadge && (
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full shrink-0 ${
                        isActive
                          ? 'bg-white text-blue-700 font-black shadow-xs'
                          : isLight ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {item.alertBadge}
                      </span>
                    )}
                    {item.badge && !item.alertBadge && (
                      <span className={`px-1.5 py-0.5 text-[10px] font-mono shrink-0 ${
                        isActive
                          ? 'bg-blue-700 text-white'
                          : isLight ? 'text-slate-500' : 'text-slate-500'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer / Telemetry Strip */}
      <div className={`shrink-0 p-3 border-t space-y-2 ${
        isLight ? 'bg-slate-50/90 border-slate-200' : 'bg-[#03060C] border-slate-800/80'
      }`}>
        <div className={`px-3 py-2 rounded-xl font-mono text-[10px] space-y-1 ${
          isLight ? 'bg-white border border-slate-200' : 'bg-slate-950 border border-slate-800'
        }`}>
          <div className="flex justify-between">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>NODE:</span>
            <span className={isLight ? 'text-cyan-700 font-bold' : 'text-cyan-400 font-bold'}>MUMBAI-DC1</span>
          </div>
          <div className="flex justify-between">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>CONSENSUS:</span>
            <span className={isLight ? 'text-emerald-700 font-bold' : 'text-emerald-400 font-bold'}>COOPERATIVE</span>
          </div>
        </div>

        <button
          onClick={logout}
          className={`group flex w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
            isLight 
              ? 'text-rose-700 hover:bg-rose-50 border border-rose-200' 
              : 'text-rose-400 hover:bg-rose-500/10 border border-rose-500/20'
          }`}
        >
          <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
          Disconnect Console
        </button>
      </div>
    </aside>
  );
}
