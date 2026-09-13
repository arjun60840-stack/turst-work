import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  ShieldCheckIcon, 
  SparklesIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  LockClosedIcon,
  EnvelopeIcon,
  UsersIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('admin@nexvion.demo');
  const [password, setPassword] = useState('NexvionDemo@2026');
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setAuth('worktrust-jwt-token-sih2026', { 
        email, 
        role: 'admin',
        name: 'Chief Platform Administrator'
      });
      navigate('/dashboard');
    }
  };

  const fillCredentials = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-[#0A0F1D] py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Vibrant Radiant Background Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>

      {/* Top Banner Tag */}
      <div className="mb-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold backdrop-blur-md">
        <SparklesIcon className="w-3.5 h-3.5 text-blue-400" />
        <span>Smart India Hackathon 2026 • Problem ID: 26089</span>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Glassmorphic Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/60 relative overflow-hidden">
          {/* Card Top Accent Light */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-500"></div>

          {/* Logo & Heading */}
          <div className="text-center">
            <div className="relative inline-block mb-3">
              <div className="w-20 h-20 rounded-2xl bg-white p-2 mx-auto shadow-xl ring-2 ring-blue-500/40 flex items-center justify-center">
                <img src="/logo.png" alt="Work Trust" className="h-full w-full object-contain" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mr-2">WORK</span>
              <span className="text-white">TRUST</span>
            </h2>
            <p className="text-xs font-semibold text-emerald-400 mt-1 uppercase tracking-wider">
              Administration & Operations Console
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Right Worker • Right Job • Right Location • Transparent Payment
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <EnvelopeIcon className="h-4 w-4" />
                </div>
                <input 
                  type="email" 
                  required 
                  className="block w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  placeholder="admin@nexvion.demo" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Security Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <LockClosedIcon className="h-4 w-4" />
                </div>
                <input 
                  type="password" 
                  required 
                  className="block w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-950/60 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  placeholder="••••••••••••" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all duration-150 transform active:scale-95"
            >
              <span>Access Control Console</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              ⚡ Quick One-Click Demo Logins:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillCredentials('admin@nexvion.demo', 'NexvionDemo@2026')}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-500/40 border border-slate-700/60 text-left transition-colors"
              >
                <div className="font-bold text-blue-400 flex items-center text-[11px]">
                  <ShieldCheckIcon className="w-3.5 h-3.5 mr-1" /> Super Admin
                </div>
                <span className="text-[10px] text-slate-400 block truncate">admin@nexvion.demo</span>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('worker@nexvion.demo', 'Demo@12345')}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-emerald-600/20 hover:border-emerald-500/40 border border-slate-700/60 text-left transition-colors"
              >
                <div className="font-bold text-emerald-400 flex items-center text-[11px]">
                  <UsersIcon className="w-3.5 h-3.5 mr-1" /> Farm Worker
                </div>
                <span className="text-[10px] text-slate-400 block truncate">worker@nexvion.demo</span>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('customer@nexvion.demo', 'Demo@12345')}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-600/20 hover:border-amber-500/40 border border-slate-700/60 text-left transition-colors"
              >
                <div className="font-bold text-amber-400 flex items-center text-[11px]">
                  🌾 Farmer / Client
                </div>
                <span className="text-[10px] text-slate-400 block truncate">customer@nexvion.demo</span>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('coop1@nexvion.demo', 'Demo@12345')}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-purple-600/20 hover:border-purple-500/40 border border-slate-700/60 text-left transition-colors"
              >
                <div className="font-bold text-purple-400 flex items-center text-[11px]">
                  <BuildingOffice2Icon className="w-3.5 h-3.5 mr-1" /> Cooperative SHG
                </div>
                <span className="text-[10px] text-slate-400 block truncate">coop1@nexvion.demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Badges Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
          <span className="px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center">
            <CheckCircleIcon className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            DigiLocker KYC
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center">
            <CheckCircleIcon className="w-3.5 h-3.5 mr-1 text-blue-400" />
            80/10/10 Escrow Split
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center">
            <CheckCircleIcon className="w-3.5 h-3.5 mr-1 text-amber-400" />
            Live Render Cloud API
          </span>
        </div>
      </div>
    </div>
  );
}
