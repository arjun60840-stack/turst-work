import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { 
  ShieldCheckIcon,
  CpuChipIcon, 
  DevicePhoneMobileIcon, 
  ChartPieIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

export default function Layout() {
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Synchronize theme class with document element & body
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [theme]);

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard': return 'Admin Operations & Control Center';
      case '/customer-portal': return 'Client Booking & Dispatch Console';
      case '/worker-portal': return 'Worker Telemetry & Instant Wallet';
      case '/technical-approach': return 'Technical Architecture & Specifications';
      case '/welfare': return 'Worker Social Security & Welfare Corpus';
      case '/workers': return 'Worker Skill Passport Registry';
      case '/customers': return 'Client Directory & Accounts';
      case '/cooperatives': return 'District Cooperative Federation (PACS)';
      case '/verification': return 'DigiLocker & Aadhaar KYC Engine';
      case '/jobs': return 'Live Job Dispatch & Geofence Pipeline';
      case '/payments': return 'Transparent 80/10/10 Escrow Ledger';
      case '/complaints': return 'Ombudsman Arbitration Board';
      case '/analytics': return 'AI Predictive Demand Heatmaps';
      case '/audit-logs': return 'Immutable SHA-256 Audit Trail';
      default: return 'Work Trust Neural Node';
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#070A12] text-slate-100'} flex font-sans selection:bg-cyan-500 selection:text-black transition-colors duration-200`}>
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Futuristic High-Tech Mission Control Header */}
        <header className="h-16 bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between px-6 sticky top-0 z-20 shadow-lg shadow-black/40 transition-colors duration-200">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-black tracking-tight text-white flex items-center">
                  <span className="gradient-text-tech mr-1.5">{getPageTitle(location.pathname)}</span>
                </h2>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  v2.6.0-PROD
                </span>
              </div>
            </div>
          </div>

          {/* Quick Experience Switcher Strip (3 Direct Roles: Admin, Client, Worker) */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <Link
              to="/dashboard"
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                location.pathname === '/dashboard'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ChartPieIcon className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>

            <Link
              to="/customer-portal"
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                location.pathname === '/customer-portal'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <DevicePhoneMobileIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Client</span>
            </Link>

            <Link
              to="/worker-portal"
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                location.pathname === '/worker-portal'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CpuChipIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Worker</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {/* Working Dark / Bright Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-mono font-bold shadow-sm select-none hover:scale-105 active:scale-95 ${
                theme === 'light'
                  ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                  : 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 hover:bg-slate-800 hover:text-white'
              }`}
              title={theme === 'dark' ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Bright / Dark Mode"
            >
              {theme === 'dark' ? (
                <>
                  <SunIcon className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="font-mono text-amber-300 text-[11px]">BRIGHT MODE</span>
                </>
              ) : (
                <>
                  <MoonIcon className="w-4 h-4 text-cyan-600" />
                  <span className="font-mono text-slate-800 text-[11px]">DARK MODE</span>
                </>
              )}
            </button>

            {/* Live Telemetry Ping */}
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>RENDER • 14ms</span>
            </div>

            {/* IST Clock */}
            <div className="hidden xl:block font-mono text-xs text-slate-400 font-semibold bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
              {currentTime} IST
            </div>

            {/* Admin Avatar */}
            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-[#0B1120] rounded-[10px] flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
                  WT
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">Admin Console</p>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center">
                  <ShieldCheckIcon className="w-3 h-3 mr-0.5 inline" /> ROOT ACCESS
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
