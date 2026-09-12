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
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/authStore';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartPieIcon },
  { name: 'Workers', href: '/workers', icon: UsersIcon },
  { name: 'Customers', href: '/customers', icon: UserGroupIcon },
  { name: 'Cooperatives', href: '/cooperatives', icon: UsersIcon },
  { name: 'Verification', href: '/verification', icon: CheckBadgeIcon },
  { name: 'Jobs', href: '/jobs', icon: BriefcaseIcon },
  { name: 'Payments', href: '/payments', icon: BanknotesIcon },
  { name: 'Complaints', href: '/complaints', icon: ExclamationTriangleIcon },
  { name: 'Demand Analytics', href: '/analytics', icon: DocumentChartBarIcon },
  { name: 'Audit Logs', href: '/audit-logs', icon: ClipboardDocumentListIcon },
];

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex h-screen flex-col bg-[#1E293B] w-64 fixed left-0 top-0 text-white">
      <div className="flex h-16 shrink-0 items-center px-6 bg-slate-900">
        <img src="/logo.png" alt="Work Trust" className="h-9 w-9 mr-3 rounded-md object-contain bg-white p-0.5" />
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
          <span className="text-blue-500 mr-1.5">WORK</span>TRUST
        </h1>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="flex-1 space-y-1 px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="shrink-0 p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="group flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <svg className="mr-3 h-5 w-5 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}
