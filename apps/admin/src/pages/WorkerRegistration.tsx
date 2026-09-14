import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IdentificationIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  KeyIcon,
  PhotoIcon,
  LockClosedIcon,
  SunIcon,
  MoonIcon,
  TrophyIcon,
  UserPlusIcon,
  BriefcaseIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { useThemeStore } from '../store/themeStore';
import { DEFAULT_SERVICE_CATEGORIES } from '../utils/constants';

interface FormData {
  // Step 1: Personal & Trade
  fullName: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  trade: string;
  experienceYears: string;
  expectedWage: string;
  cooperative: string;
  skills: string[];

  // Step 2: Aadhaar Card
  aadhaarNumber: string;
  aadhaarVerified: boolean;
  aadhaarFrontFile: string | null;
  aadhaarBackFile: string | null;

  // Step 3: Certificate
  certificateType: string;
  certificateNumber: string;
  issuingAuthority: string;
  certificateFile: string | null;

  // Step 4: Resume & Portfolio
  resumeFile: string | null;
  workSummary: string;
  toolsOwned: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export const WorkerRegistration: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isLight = theme === 'light';
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passportHash, setPassportHash] = useState('');

  const [formData, setFormData] = useState<FormData>({
    fullName: 'Rajesh Sharma',
    phone: '+91 98765 43210',
    email: 'rajesh.sharma@example.com',
    age: '32',
    gender: 'Male',
    trade: 'electrician',
    experienceYears: '8',
    expectedWage: '₹550/hr',
    cooperative: 'Bhubaneswar Urban Power Guild',
    skills: ['3-Phase Wiring', 'Circuit Breakers', 'Inverter Repairs', 'Safety Compliance'],
    aadhaarNumber: '4829 3847 1920',
    aadhaarVerified: false,
    aadhaarFrontFile: 'aadhaar_front_scan.pdf',
    aadhaarBackFile: 'aadhaar_back_scan.pdf',
    certificateType: 'National Trade Certificate (NCVT / ITI)',
    certificateNumber: 'ITI-NCVT-2018-84920',
    issuingAuthority: 'National Council for Vocational Training',
    certificateFile: 'iti_electrical_cert.pdf',
    resumeFile: 'rajesh_sharma_resume_2026.pdf',
    workSummary: '8+ years handling residential rewiring, industrial 3-phase setups, solar panel battery backup and substation maintenance across Odisha.',
    toolsOwned: ['Digital Multimeter', 'Heavy Duty Drill', 'Safety Harness & Hard Hat', 'Insulated Tool Kit'],
    emergencyContactName: 'Sunita Sharma (Spouse)',
    emergencyContactPhone: '+91 98765 43211',
  });

  const handleTradeChange = (newTrade: string) => {
    setFormData((prev) => ({ ...prev, trade: newTrade }));
  };

  const handleVerifyAadhaar = () => {
    setShowOtpModal(true);
  };

  const handleConfirmOtp = () => {
    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setShowOtpModal(false);
      setFormData((prev) => ({ ...prev, aadhaarVerified: true }));
    }, 1200);
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
      };
    });
  };

  const handleToolToggle = (tool: string) => {
    setFormData((prev) => {
      const exists = prev.toolsOwned.includes(tool);
      return {
        ...prev,
        toolsOwned: exists ? prev.toolsOwned.filter((t) => t !== tool) : [...prev.toolsOwned, tool],
      };
    });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedHash = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setPassportHash(generatedHash);
      setIsSubmitting(false);
      setStep(5); // Step 5: Success & Skill Passport Preview
    }, 1500);
  };

  const skillOptions = [
    '3-Phase Wiring',
    'Circuit Breakers',
    'Inverter Repairs',
    'Safety Compliance',
    'Laser Leveling',
    'Hydrojetting',
    'PPR Piping',
    'Modular Cabinetry',
    'Texture Painting',
    'Solar Pumps',
    'HVAC Gas Refill',
    'CCTV Configuration'
  ];

  const toolOptions = [
    'Digital Multimeter',
    'Heavy Duty Drill',
    'Safety Harness & Hard Hat',
    'Insulated Tool Kit',
    'Pipe Wrench & Threader',
    'Laser Level Tool',
    'High Pressure Washer',
    'Airless Paint Sprayer'
  ];

  return (
    <div className={`min-h-screen ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'} transition-colors duration-200`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-40 ${isLight ? 'bg-white/90 border-slate-200 shadow-xs' : 'bg-slate-950/80 border-slate-800'} backdrop-blur-xl border-b px-4 sm:px-8 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Link to="/" className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 p-0.5 shadow-md flex items-center justify-center text-white">
            <ShieldCheckIcon className="w-5 h-5 text-white" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-tight font-mono">NEXVION</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase bg-teal-500/10 text-teal-400 border border-teal-500/30">
                Worker Onboarding
              </span>
            </div>
            <p className="text-xs text-slate-400">Digital Skill Passport & Verified KYC Enrollment</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition ${isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'}`}
          >
            {isLight ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4 text-amber-400" />}
          </button>
          <Link
            to="/worker-portal"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
          >
            Existing Worker Portal
          </Link>
          <Link
            to="/"
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition"
          >
            Return Home
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        
        {/* Step Progress Tracker */}
        {step < 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3 text-xs font-bold">
              <span className={step >= 1 ? 'text-blue-500' : 'text-slate-500'}>1. Personal & Trade</span>
              <span className={step >= 2 ? 'text-teal-400' : 'text-slate-500'}>2. Aadhaar e-KYC</span>
              <span className={step >= 3 ? 'text-indigo-400' : 'text-slate-500'}>3. Skill Certificate</span>
              <span className={step >= 4 ? 'text-emerald-400' : 'text-slate-500'}>4. Resume & Bio</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 1: Personal & Trade Details */}
        {step === 1 && (
          <div className={`p-6 sm:p-8 rounded-3xl border ${isLight ? 'bg-white border-slate-200 shadow-xl' : 'bg-slate-900/80 border-slate-800 shadow-2xl backdrop-blur-xl'}`}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="p-2.5 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                <UserPlusIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Step 1: Personal & Trade Profile</h2>
                <p className="text-xs text-slate-400">Register as a certified independent artisan or guild member.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Legal Name (as per Aadhaar)</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Rajesh Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Phone (+91)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="worker@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="32"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Trade Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Primary Trade / Specialty</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DEFAULT_SERVICE_CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => handleTradeChange(cat.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                        formData.trade === cat.id
                          ? 'bg-blue-600/30 border-blue-500 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-xs truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience & Wage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Years of Experience in Trade</label>
                  <input
                    type="text"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. 8 Years"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Target Base Wage / Rate</label>
                  <input
                    type="text"
                    value={formData.expectedWage}
                    onChange={(e) => setFormData({ ...formData, expectedWage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. ₹550/hr or ₹1,800/day"
                  />
                </div>
              </div>

              {/* Cooperative Affiliation */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Registered Cooperative Society / Guild</label>
                <select
                  value={formData.cooperative}
                  onChange={(e) => setFormData({ ...formData, cooperative: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Bhubaneswar Urban Power Guild">Bhubaneswar Urban Power Guild</option>
                  <option value="Capital Builders Federation">Capital Builders Federation</option>
                  <option value="Coastal Trades Federation">Coastal Trades Federation</option>
                  <option value="Craftsmen Guild of Odisha">Craftsmen Guild of Odisha</option>
                  <option value="Kisan Shakti Cooperative">Kisan Shakti Cooperative</option>
                  <option value="Urban Green Sanitation League">Urban Green Sanitation League</option>
                  <option value="Direct Independent Enrollment">Direct Independent Enrollment (Assign Nearest Coop)</option>
                </select>
              </div>

              {/* Skill Specialization Chips */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Specialized Skill Tags</label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((s) => {
                    const isSelected = formData.skills.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => handleSkillToggle(s)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <span>Proceed to Aadhaar e-KYC</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Aadhaar Card Verification (Govt KYC) */}
        {step === 2 && (
          <div className={`p-6 sm:p-8 rounded-3xl border ${isLight ? 'bg-white border-slate-200 shadow-xl' : 'bg-slate-900/80 border-slate-800 shadow-2xl backdrop-blur-xl'}`}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="p-2.5 rounded-2xl bg-teal-600/20 border border-teal-500/30 text-teal-400">
                <IdentificationIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Step 2: Aadhaar Card Verification (UIDAI e-KYC)</h2>
                <p className="text-xs text-slate-400">Tamper-proof identity check ensuring 100% genuine skilled workers.</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Aadhaar Number Input with Instant Verify */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <label className="block text-xs font-bold text-slate-300">12-Digit Aadhaar Card Number</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={formData.aadhaarNumber}
                      onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm tracking-wider focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="XXXX-XXXX-XXXX"
                    />
                    <LockClosedIcon className="w-4 h-4 text-slate-500 absolute right-3 top-3.5" />
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyAadhaar}
                    className={`px-5 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shrink-0 ${
                      formData.aadhaarVerified
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white shadow-md'
                    }`}
                  >
                    {formData.aadhaarVerified ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                        <span>e-KYC Verified ✓</span>
                      </>
                    ) : (
                      <>
                        <KeyIcon className="w-4 h-4" />
                        <span>Instant UIDAI OTP Check</span>
                      </>
                    )}
                  </button>
                </div>

                {formData.aadhaarVerified && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>DigiLocker Verified: Name, DOB & Resident Proof Match (OD-BBS-8491)</span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400 font-bold">LEVEL 3 KYC</span>
                  </div>
                )}
              </div>

              {/* Aadhaar Card Front & Back Document Upload Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Front */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-dashed border-slate-800 hover:border-teal-500/50 transition text-center space-y-2">
                  <PhotoIcon className="w-8 h-8 text-teal-400 mx-auto" />
                  <div className="text-xs font-bold text-white">Aadhaar Card Front Photo</div>
                  <p className="text-[11px] text-slate-400">Clear snapshot showing photo and 12-digit number</p>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-teal-300 flex items-center justify-between">
                    <span>{formData.aadhaarFrontFile || 'Select front photo...'}</span>
                    <span className="text-emerald-400 font-bold">✓ Attached</span>
                  </div>
                </div>

                {/* Back */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-dashed border-slate-800 hover:border-teal-500/50 transition text-center space-y-2">
                  <PhotoIcon className="w-8 h-8 text-teal-400 mx-auto" />
                  <div className="text-xs font-bold text-white">Aadhaar Card Back Photo</div>
                  <p className="text-[11px] text-slate-400">Clear snapshot showing address and QR code</p>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-teal-300 flex items-center justify-between">
                    <span>{formData.aadhaarBackFile || 'Select back photo...'}</span>
                    <span className="text-emerald-400 font-bold">✓ Attached</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition flex items-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                <span>Proceed to Skill Certificates</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Skill Certificate & Trade Credentials */}
        {step === 3 && (
          <div className={`p-6 sm:p-8 rounded-3xl border ${isLight ? 'bg-white border-slate-200 shadow-xl' : 'bg-slate-900/80 border-slate-800 shadow-2xl backdrop-blur-xl'}`}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="p-2.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                <DocumentCheckIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Step 3: Trade & Skill Certification</h2>
                <p className="text-xs text-slate-400">Upload vocational diplomas, ITI certificates, or cooperative endorsements.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Certification Type</label>
                <select
                  value={formData.certificateType}
                  onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="National Trade Certificate (NCVT / ITI)">National Trade Certificate (NCVT / ITI)</option>
                  <option value="PMKVY / NSDC Skill Passport">PMKVY / NSDC Skill Passport</option>
                  <option value="State Skill Development Mission (OSDM / Skill India)">State Skill Development Mission (OSDM / Skill India)</option>
                  <option value="Polytechnic / Vocational Diploma">Polytechnic / Vocational Diploma</option>
                  <option value="Cooperative Guild Peer Endorsement">Cooperative Guild Peer Endorsement</option>
                  <option value="OEM Manufacturer Certified (Voltas, Havells, Schneider)">OEM Manufacturer Certified (Voltas, Havells, Schneider)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Certificate / Roll Number</label>
                  <input
                    type="text"
                    value={formData.certificateNumber}
                    onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                    placeholder="ITI-NCVT-2018-84920"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Issuing Authority / Institution</label>
                  <input
                    type="text"
                    value={formData.issuingAuthority}
                    onChange={(e) => setFormData({ ...formData, issuingAuthority: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="National Council for Vocational Training"
                  />
                </div>
              </div>

              {/* Certificate Upload Area */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-dashed border-indigo-500/40 text-center space-y-3">
                <DocumentCheckIcon className="w-10 h-10 text-indigo-400 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-white">Upload Certificate Document (PDF / JPG / PNG)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Maximum file size: 10MB. Document will be cryptographically hashed.</p>
                </div>

                <div className="max-w-md mx-auto p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono">{formData.certificateFile || 'iti_electrical_cert.pdf'}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                    ✓ Hashed & Ready
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer"
              >
                <span>Proceed to Resume & Portfolio</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Resume & Work History */}
        {step === 4 && (
          <form onSubmit={handleFinalSubmit} className={`p-6 sm:p-8 rounded-3xl border ${isLight ? 'bg-white border-slate-200 shadow-xl' : 'bg-slate-900/80 border-slate-800 shadow-2xl backdrop-blur-xl'}`}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="p-2.5 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
                <DocumentTextIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Step 4: Resume & Work Portfolio</h2>
                <p className="text-xs text-slate-400">Highlight past projects, equipment owned, and emergency welfare contact.</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Resume File Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Resume / CV Document (PDF / DOC)</label>
                <div className="p-4 rounded-2xl bg-slate-950 border border-dashed border-slate-800 hover:border-emerald-500/50 transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DocumentTextIcon className="w-8 h-8 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white font-mono">{formData.resumeFile || 'Attach your resume or CV...'}</div>
                      <div className="text-[11px] text-slate-400">PDF, DOC, DOCX up to 15MB</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    ✓ Attached
                  </span>
                </div>
              </div>

              {/* Work Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Work Experience & Major Projects Summary</label>
                <textarea
                  rows={3}
                  value={formData.workSummary}
                  onChange={(e) => setFormData({ ...formData, workSummary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Describe your typical jobs, residential or industrial projects..."
                />
              </div>

              {/* Tools & Equipment Owned */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Tools & Safety Equipment Owned</label>
                <div className="flex flex-wrap gap-2">
                  {toolOptions.map((tool) => {
                    const isSelected = formData.toolsOwned.includes(tool);
                    return (
                      <button
                        type="button"
                        key={tool}
                        onClick={() => handleToolToggle(tool)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <ShieldCheckIcon className="w-4 h-4 text-rose-400" />
                  <span>NEXVION Welfare Shield Beneficiary / Emergency Contact</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Beneficiary Name</label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      placeholder="e.g. Sunita Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Emergency Phone</label>
                    <input
                      type="text"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      placeholder="+91 98765 43211"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white transition flex items-center gap-2 shadow-xl shadow-emerald-500/25 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <SparklesIcon className="w-4 h-4 animate-spin" />
                    <span>Cryptographically Hashing & Enrolling...</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>Complete Registration & Generate Skill Passport</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: Success & Generated Cryptographic Skill Passport */}
        {step === 5 && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Success Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border border-emerald-500/40 text-center space-y-2 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <CheckCircleIcon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Worker Registration Complete!
              </h2>
              <p className="text-xs text-emerald-300 max-w-lg mx-auto">
                Identity verified via UIDAI e-KYC. Skill certificate validated by Cooperative Guild. Cryptographic Skill Passport issued and permanently anchored.
              </p>
            </div>

            {/* The Generated Skill Passport Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl relative overflow-hidden">
              {/* Top Passport Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                    N
                  </div>
                  <span className="font-mono font-bold text-sm tracking-wider text-white">NEXVION SKILL PASSPORT</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-mono">
                  LEVEL 3 KYC VERIFIED
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
                {/* Photo & Rating */}
                <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 p-1 shadow-xl">
                    <img
                      src="/assets/workers/electrician.svg"
                      alt={formData.fullName}
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{formData.fullName}</h3>
                    <p className="text-xs font-bold text-teal-400 capitalize">{formData.trade} Specialist</p>
                    <div className="flex items-center justify-center gap-1 mt-1 text-amber-400 text-xs font-bold">
                      <StarIcon className="w-3.5 h-3.5 fill-amber-400" />
                      <span>5.0 (Initial Trust Index)</span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Aadhaar Verification</span>
                    <span className="font-mono font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                      <CheckCircleIcon className="w-3.5 h-3.5" /> {formData.aadhaarNumber}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Accredited Certificate</span>
                    <span className="font-mono font-bold text-indigo-300 truncate block mt-0.5">
                      {formData.certificateNumber}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Cooperative Guild</span>
                    <span className="font-semibold text-slate-200 block mt-0.5 truncate">
                      {formData.cooperative}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Base Wage Benchmark</span>
                    <span className="font-mono font-bold text-teal-300 block mt-0.5">
                      {formData.expectedWage}
                    </span>
                  </div>

                  <div className="sm:col-span-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Cryptographic Anchor Hash</span>
                    <span className="font-mono text-[11px] text-blue-400 break-all block mt-0.5">
                      {passportHash}
                    </span>
                  </div>
                </div>
              </div>

              {/* Passport Actions */}
              <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Status: <span className="text-emerald-400 font-bold">Active in Live Dispatch Mesh</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  >
                    Register Another Worker
                  </button>

                  <Link
                    to="/worker-portal"
                    className="px-6 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-teal-500/25"
                  >
                    <span>Launch Worker Portal</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Instant OTP Modal for Aadhaar Simulation */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-teal-500/40 p-6 sm:p-8 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto">
              <KeyIcon className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-black text-white">Enter Aadhaar OTP</h3>
              <p className="text-xs text-slate-400 mt-1">
                A 6-digit verification code was sent to the Aadhaar-linked mobile number ending in <strong className="text-white font-mono">**4321</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 font-mono block mb-1">DEMO OTP:</span>
              <span className="font-mono font-black text-lg text-teal-400 tracking-widest">1 2 3 4 5 6</span>
            </div>

            <input
              type="text"
              maxLength={6}
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              className="w-full py-3 text-center text-xl font-mono tracking-widest rounded-xl bg-slate-950 border border-slate-800 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="••••••"
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="w-1/2 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmOtp}
                disabled={isVerifyingOtp}
                className="w-1/2 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition flex items-center justify-center gap-1.5 shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                {isVerifyingOtp ? (
                  <>
                    <SparklesIcon className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>Confirm & Authorize</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WorkerRegistration;
