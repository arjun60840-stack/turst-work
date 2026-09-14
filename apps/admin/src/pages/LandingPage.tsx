import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  BoltIcon,
  UsersIcon,
  TrophyIcon,
  ArrowRightIcon,
  SparklesIcon,
  CurrencyRupeeIcon,
  HeartIcon,
  ClockIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  SunIcon,
  MoonIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import WorkerShowcase from '../components/WorkerShowcase';
import SmartGroupMatchingVisual from '../components/SmartGroupMatchingVisual';
import { useThemeStore } from '../store/themeStore';

export const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How does NEXVION eliminate middleman commissions?',
      a: 'Traditional agencies take 25-40% cuts from daily wage earners. NEXVION is built on a direct cooperative protocol with smart escrow: 100% of the agreed wage flows directly to the workers\' UPI/bank accounts, with transparent platform micro-fees used strictly for insurance and cooperative governance.'
    },
    {
      q: 'What is a Cryptographic Skill Passport?',
      a: 'Every worker on NEXVION has a tamper-proof digital passport with verified credentials, completed job milestones, client ratings, and cooperative endorsements. Skills are verifiable and portable across cities and projects.'
    },
    {
      q: 'How does Smart Group Matching work for large jobs?',
      a: 'Clients input job specifications (e.g. 2 electricians + 1 plumber + 2 helpers). Our AI engine filters available verified cooperative members within a tight radial distance, evaluates complementary skills, and synchronizes arrival with unified escrow and OTP check-in.'
    },
    {
      q: 'Are workers covered by insurance and emergency welfare?',
      a: 'Yes. Every booking through NEXVION automatically triggers micro-insurance coverage for accidental bodily injury and tool damage via the NEXVION Welfare Shield, backed by state cooperative welfare boards.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 p-0.5 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheckIcon className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white font-mono">
                  NEXVION
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  v2.0
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Gig Cooperative AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#matching" className="hover:text-white transition">Smart Matching</a>
            <a href="#showcase" className="hover:text-white transition">Verified Trades</a>
            <Link to="/worker-register" className="text-teal-400 hover:text-teal-300 transition font-bold">
              Worker Registration
            </Link>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>

          {/* Actions: Theme Toggle & Portal Access */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Bright/Dark Mode"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Bright' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <SunIcon className="w-4 h-4 text-amber-400" /> : <MoonIcon className="w-4 h-4 text-blue-400" />}
            </button>

            <Link
              to="/login"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
            >
              <span>Register / Get Started</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
        {/* Ambient Gradient Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines and Value Proposition */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs font-semibold text-blue-300 shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>India's Smart Gig Cooperative Ecosystem</span>
                <span className="text-slate-500">•</span>
                <span className="text-teal-400 font-bold">Enterprise 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-tight">
                Find the Right People.{' '}
                <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  Build Better Work.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                NEXVION empowers verified trade professionals and skilled crews with direct smart escrow, cryptographic skill passports, and autonomous multi-worker group dispatching.
              </p>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  to="/customer-portal"
                  className="px-5 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 shadow-xl shadow-blue-600/25 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <UsersIcon className="w-4 h-4" />
                  <span>Hire Workers & Big Crews</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>

                <Link
                  to="/worker-register"
                  className="px-5 py-3.5 rounded-xl font-bold text-sm text-teal-300 hover:text-white bg-slate-900/90 border border-teal-500/40 hover:border-teal-400 hover:bg-slate-800 transition flex items-center gap-2 shadow-lg shadow-teal-500/10"
                >
                  <DocumentCheckIcon className="w-4 h-4 text-teal-400" />
                  <span>Register as Worker (KYC)</span>
                </Link>

                <Link
                  to="/worker-portal"
                  className="px-4 py-3.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center gap-1.5"
                >
                  <TrophyIcon className="w-4 h-4 text-amber-400" />
                  <span>Passport</span>
                </Link>

                <Link
                  to="/dashboard"
                  className="px-3.5 py-3.5 rounded-xl font-semibold text-xs text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center gap-1"
                >
                  <span>Admin</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Key Trust Signals Bar */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">12,400+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Verified Artisans</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-teal-400">0%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Middleman Cut</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-blue-400">100%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Escrow Protected</div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Worker Photo Showcase with 3.5s auto-transitions */}
            <div id="showcase" className="lg:col-span-6">
              <WorkerShowcase />
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Cooperative Strip */}
      <section className="py-8 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-6 text-center">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs sm:text-sm">
              <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />
              <span>Government Cooperative Verified</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs sm:text-sm">
              <CurrencyRupeeIcon className="w-5 h-5 text-teal-400" />
              <span>Smart Contract Escrow Protection</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs sm:text-sm">
              <SparklesIcon className="w-5 h-5 text-blue-400" />
              <span>Autonomous Team Synergy Scoring</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs sm:text-sm">
              <HeartIcon className="w-5 h-5 text-indigo-400" />
              <span>Institutional Welfare Shield</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Visual Process: How NEXVION Works */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider mb-3">
            Seamless Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How NEXVION Reinvents Skilled Labor
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            A frictionless, end-to-end framework ensuring zero wage leakage and guaranteed on-site execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            {
              step: '01',
              title: 'Post Requirement',
              desc: 'Specify individual tasks or full multi-trade crew requirements with transparent budget presets.',
              icon: Squares2X2Icon
            },
            {
              step: '02',
              title: 'AI Geo-Match',
              desc: 'Autonomous engine pairs top-rated cooperative workers within 4km radius in under 30 seconds.',
              icon: MapPinIcon
            },
            {
              step: '03',
              title: 'Escrow Lock',
              desc: 'Funds safely deposited in NEXVION Smart Escrow. Never released until client milestone sign-off.',
              icon: ShieldCheckIcon
            },
            {
              step: '04',
              title: 'OTP Check-In',
              desc: 'Worker biometric/OTP verification at arrival confirms physical geo-presence and starts job clock.',
              icon: DocumentCheckIcon
            },
            {
              step: '05',
              title: 'Instant Payout',
              desc: 'Immediate 100% direct disbursement to worker UPI. Zero middlemen, zero administrative cuts.',
              icon: BoltIcon
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition relative group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-700 group-hover:text-blue-500/40 transition">
                    {item.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-800 text-teal-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Core Features Grid */}
      <section id="features" className="py-16 bg-slate-900/40 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Engineered for Fairness, Speed & Scale
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Four revolutionary pillars solving the core failure points of informal labor platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-5">
                <TrophyIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Cryptographic Skill Passport</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verifiable credentials, verified certifications, safety records, and portable reputations that workers own forever.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] font-bold text-blue-400 flex items-center gap-1">
                <span>Tamper-Proof & Portable</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-teal-600/20 border border-teal-500/40 flex items-center justify-center text-teal-400 mb-5">
                <UsersIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Smart Group Formation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Composite crew matching that pairs multiple complementary trades into coordinated squads with synchronized arrival and unified escrow.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] font-bold text-teal-400 flex items-center gap-1">
                <span>Multi-Trade Synergy</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-5">
                <ArrowTrendingUpIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">AI Demand & Wage Index</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Algorithmic dynamic wage benchmarks ensuring living wages, surge suppression, and seasonal demand predictions for cooperatives.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                <span>Fair Living Wages</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/50 transition duration-300">
              <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-5">
                <HeartIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Welfare Shield Protocol</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated micro-insurance on every booking, emergency hospital funds, maternity grants, and union retirement credits.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] font-bold text-rose-400 flex items-center gap-1">
                <span>Social Security Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🤖 SMART GROUP MATCHING Interactive Visual Section */}
      <section id="matching" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartGroupMatchingVisual />
      </section>

      {/* 3 Interactive Portals Preview */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Explore NEXVION Dedicated Portals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Tailored high-performance user interfaces for Clients, Independent Workers, and Cooperative Federations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Customer Portal */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-blue-500/50 transition">
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                  For Clients & Homes
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">Customer Portal</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Book 14+ home and industrial service categories, review verified tradesmen, track real-time technician ETAs, and release milestone escrows.
                </p>
              </div>
              <Link
                to="/customer-portal"
                className="mt-6 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition flex items-center justify-between"
              >
                <span>Launch Client Portal</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Worker Portal */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-teal-500/50 transition">
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">
                  For Verified Pros
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">Worker Portal</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rapido-style accept/reject request cards with countdown timers, dynamic Skill Passport verification, instant wallet payouts, and emergency welfare claims.
                </p>
              </div>
              <Link
                to="/worker-portal"
                className="mt-6 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-teal-600 hover:bg-teal-500 transition flex items-center justify-between"
              >
                <span>Launch Worker Portal</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Cooperative / Admin Hub */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-indigo-500/50 transition">
              <div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                  For Unions & Admins
                </span>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">Cooperative Dashboard</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-time guild member registries, KYC verification approval workflows, dispute resolution centers, and welfare fund distribution metrics.
                </p>
              </div>
              <Link
                to="/dashboard"
                className="mt-6 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition flex items-center justify-between"
              >
                <span>Launch Admin Control</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Everything you need to know about the NEXVION platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-600 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Experience the Future of Work?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 font-medium">
              Join thousands of verified artisans and forward-thinking contractors across India.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/customer-portal"
                className="px-6 py-3 rounded-xl bg-white text-slate-950 font-black text-sm hover:bg-slate-100 transition shadow-lg shadow-black/20"
              >
                Hire a Verified Pro Today
              </Link>
              <Link
                to="/worker-portal"
                className="px-6 py-3 rounded-xl bg-slate-900/80 border border-white/20 text-white font-bold text-sm hover:bg-slate-900 transition"
              >
                Join as an Artisan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                N
              </div>
              <span className="font-bold text-white text-base">NEXVION</span>
              <span className="text-slate-500">• Smart Gig Cooperative Platform</span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Link to="/customer-portal" className="hover:text-white transition">Customer Portal</Link>
              <Link to="/worker-portal" className="hover:text-white transition">Worker Portal</Link>
              <Link to="/dashboard" className="hover:text-white transition">Admin Hub</Link>
              <Link to="/cooperatives" className="hover:text-white transition">Cooperatives</Link>
              <Link to="/welfare" className="hover:text-white transition">Welfare Shield</Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <div>
              © 2026 NEXVION Technologies. Next-Generation Autonomous Cooperative Infrastructure. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Escrow & Matching Engine: 100% Operational</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
