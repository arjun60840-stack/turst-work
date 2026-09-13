import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { 
  BellIcon, 
  CheckCircleIcon, 
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function Layout() {
  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard': return 'Dashboard Overview';
      case '/workers': return 'Worker Directory & Profiles';
      case '/customers': return 'Customer Accounts';
      case '/cooperatives': return 'Worker Cooperatives (SHGs)';
      case '/verification': return 'Worker KYC & Skill Verification';
      case '/jobs': return 'Live Job Dispatch & Lifecycle';
      case '/payments': return 'Transparent Payments & Escrow Ledger';
      case '/complaints': return 'Dispute Resolution & Grievances';
      case '/analytics': return 'Demand & Supply Analytics';
      case '/audit-logs': return 'Security & Compliance Audit Trail';
      default: return 'Work Trust Administration';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-8 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {getPageTitle(location.pathname)}
            </h2>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              <SparklesIcon className="w-3 h-3 mr-1 text-blue-500" />
              SIH 2026 #26089
            </span>
          </div>

          <div className="flex items-center space-x-5">
            {/* Live API Health Status */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-medium text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>API: Connected (Render)</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                type="button" 
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors relative"
                title="3 pending verifications"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500"></span>
              </button>
            </div>

            {/* Admin Profile */}
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-xs ring-2 ring-white">
                WT
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">Admin Console</p>
                <p className="text-[11px] text-slate-500 flex items-center">
                  <ShieldCheckIcon className="w-3 h-3 text-emerald-600 mr-0.5" /> Super Admin
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
