import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserPlusIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  DocumentCheckIcon,
  BriefcaseIcon,
  UsersIcon,
  ArrowRightIcon,
  LockClosedIcon,
  SunIcon,
  MoonIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  SparklesIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';

export const Register: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isLight = theme === 'light';
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [selectedRole, setSelectedRole] = useState<'worker' | 'client'>('worker');

  // Client Registration Form State
  const [clientForm, setClientForm] = useState({
    name: 'Vikramaditya Construction Ltd',
    phone: '+91 98765 00123',
    email: 'contact@vikrambuilders.in',
    location: 'Bhubaneswar Smart City, Odisha',
    hiringNeed: 'big_crew', // 'single' | 'big_crew'
    password: 'Password@2026',
    agreedToTerms: true
  });
  const [isRegisteringClient, setIsRegisteringClient] = useState(false);

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisteringClient(true);
    setTimeout(() => {
      setAuth('client-registered-token-2026', {
        email: clientForm.email,
        role: 'admin',
        name: clientForm.name
      });
      setIsRegisteringClient(false);
      navigate('/customer-portal');
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060913] text-slate-100'} transition-colors duration-200 selection:bg-blue-600 selection:text-white`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-40 ${isLight ? 'bg-white/90 border-slate-200 shadow-xs' : 'bg-slate-950/80 border-slate-800'} backdrop-blur-xl border-b px-4 sm:px-8 py-4 flex items-center justify-between`}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 p-0.5 shadow-md flex items-center justify-center text-white group-hover:scale-105 transition">
            <ShieldCheckIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-tight font-mono">NEXVION</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Registration First
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Join the Decentralized Gig Cooperative Ecosystem</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition cursor-pointer ${isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
          >
            {isLight ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4 text-amber-400" />}
          </button>
          
          <Link
            to="/login"
            className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition"
          >
            Already Registered? Sign In
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        
        {/* Top Headline */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <SparklesIcon className="w-3.5 h-3.5" />
            <span>Create Your Account First</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Register on NEXVION
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Please select your account type below to complete your registration before accessing dispatch and booking.
          </p>
        </div>

        {/* 2 Big Role Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Choice 1: Worker / Artisan */}
          <button
            type="button"
            onClick={() => setSelectedRole('worker')}
            className={`p-6 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              selectedRole === 'worker'
                ? 'bg-gradient-to-br from-teal-950/80 via-slate-900 to-slate-950 border-teal-500/60 shadow-xl shadow-teal-500/10 ring-2 ring-teal-500/30'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                  <IdentificationIcon className="w-6 h-6" />
                </div>
                {selectedRole === 'worker' && (
                  <span className="px-2.5 py-1 rounded-full bg-teal-500 text-black text-[10px] font-black uppercase tracking-wider">
                    Selected
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-white mb-1">
                I am a Worker / Skilled Artisan
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Register with your Aadhaar e-KYC, ITI / Trade Certificate, and Resume. Get verified, generate your Digital Skill Passport, and receive 100% direct payouts with zero cuts.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-teal-400">
              <span>AADHAAR + ITI + RESUME</span>
              <span>4-Step KYC →</span>
            </div>
          </button>

          {/* Choice 2: Client / Employer */}
          <button
            type="button"
            onClick={() => setSelectedRole('client')}
            className={`p-6 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              selectedRole === 'client'
                ? 'bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-950 border-blue-500/60 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/30'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <UsersIcon className="w-6 h-6" />
                </div>
                {selectedRole === 'client' && (
                  <span className="px-2.5 py-1 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-wider">
                    Selected
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-white mb-1">
                I am a Client / Contractor (Hire Gigs)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Register to hire verified single technicians or assemble multi-worker squads for big works (house renovation, harvest, electrical fitouts) with Smart Escrow protection.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-blue-400">
              <span>SINGLE & BIG CREW SQUADS</span>
              <span>Instant Setup →</span>
            </div>
          </button>
        </div>

        {/* ROLE 1: WORKER ENROLLMENT CALLOUT */}
        {selectedRole === 'worker' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-teal-500/40 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span>Skilled Worker Enrollment & e-KYC Verification</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                    UIDAI Sandbox Ready
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complete your 4-step registration to unlock your verified Digital Skill Passport and begin receiving job broadcasts.
                </p>
              </div>

              <Link
                to="/worker-register"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-teal-500/25 transition flex items-center gap-2 shrink-0"
              >
                <span>Launch Worker Registration Form</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* 3 Verification Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                  <IdentificationIcon className="w-5 h-5" />
                  <span>1. Aadhaar e-KYC</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  12-digit Aadhaar input with simulated OTP verification and document photo scans.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <DocumentCheckIcon className="w-5 h-5" />
                  <span>2. Skill Certificate</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Upload ITI, PMKVY, Polytechnic, or Cooperative Guild certificates with SHA-256 hash stamp.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <BriefcaseIcon className="w-5 h-5" />
                  <span>3. Resume & Tools</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Upload resume/CV, specify equipment owned, and declare Welfare Shield beneficiary.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <Link
                to="/worker-register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-xl shadow-teal-500/20 transition flex items-center justify-center gap-2"
              >
                <span>Start Worker Registration Now (Takes ~2 Mins)</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* ROLE 2: CLIENT REGISTRATION FORM */}
        {selectedRole === 'client' && (
          <form onSubmit={handleClientSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-blue-500/40 shadow-2xl backdrop-blur-xl space-y-5">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>Client & Employer Registration Form</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Instant Account
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Create your hiring account to book single technicians or dispatch multi-worker squads for big works.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name or Company Name</label>
                <div className="relative">
                  <BuildingOffice2Icon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Vikramaditya Construction or Arjun Patel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Phone Number (+91)</label>
                <div className="relative">
                  <PhoneIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                    placeholder="+91 98765 00123"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <EnvelopeIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="client@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">City & Project Site Address</label>
                <div className="relative">
                  <MapPinIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={clientForm.location}
                    onChange={(e) => setClientForm({ ...clientForm, location: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Bhubaneswar Smart City, Odisha"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Account Password</label>
              <div className="relative">
                <LockClosedIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={clientForm.password}
                  onChange={(e) => setClientForm({ ...clientForm, password: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Primary Hiring Requirement */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">What is your primary hiring focus?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setClientForm({ ...clientForm, hiringNeed: 'big_crew' })}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    clientForm.hiringNeed === 'big_crew'
                      ? 'bg-blue-600/30 border-blue-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <UsersIcon className="w-4 h-4 text-teal-400" />
                    <span>Multi-Worker Big Crew Squads</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Villa renovation, construction, farm harvest, commercial wiring</p>
                </button>

                <button
                  type="button"
                  onClick={() => setClientForm({ ...clientForm, hiringNeed: 'single' })}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                    clientForm.hiringNeed === 'single'
                      ? 'bg-blue-600/30 border-blue-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <BriefcaseIcon className="w-4 h-4 text-blue-400" />
                    <span>Single Individual Tasks</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Single electrician, plumber, AC repair, or cleaner</p>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                <span>Zero registration fees • Smart Escrow protection</span>
              </div>

              <button
                type="submit"
                disabled={isRegisteringClient}
                className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white transition flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
              >
                {isRegisteringClient ? (
                  <>
                    <SparklesIcon className="w-4 h-4 animate-spin" />
                    <span>Registering Client Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="w-4 h-4" />
                    <span>Register Account & Enter Portal</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </main>

    </div>
  );
};

export default Register;
