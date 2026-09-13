// ============================================================
// NEXVION — Shared Constants
// ============================================================

export const APP_NAME = 'NEXVION';
export const APP_TAGLINE = 'Cooperative Gig Services Platform';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://worktrust-api.onrender.com/api';

// 14 Comprehensive Service Categories (SIH 2026 Problem ID: 26089)
export const DEFAULT_SERVICE_CATEGORIES = [
  { id: 'electrician', name: 'Electrician', icon: '⚡', description: 'Wiring, MCB, inverter, farm pump starter & motor repair', baseWage: 450, subcategories: ['Inverter & Battery', 'Farm Motor Starter', 'House Wiring', 'Short Circuit Fix'] },
  { id: 'carpenter', name: 'Carpenter', icon: '🪚', description: 'Woodwork, door/window fix, farm storage & furniture repair', baseWage: 500, subcategories: ['Furniture Repair', 'Door/Window Fitting', 'Trellis & Wood Frame', 'Custom Shed Work'] },
  { id: 'hvac', name: 'AC Mechanic / HVAC Technician', icon: '❄️', description: 'AC servicing, cold-storage refrigeration & gas refill', baseWage: 600, subcategories: ['Split/Window AC Service', 'Cold Storage Chiller', 'Gas Leakage & Refill', 'Compressor Repair'] },
  { id: 'appliance', name: 'Appliance Repair Technician', icon: '📺', description: 'Washing machine, refrigerator, microwave & mixer repair', baseWage: 400, subcategories: ['Refrigerator', 'Washing Machine', 'Microwave & Oven', 'Water Heater / Geyser'] },
  { id: 'painter', name: 'Painter', icon: '🎨', description: 'Interior/exterior whitewash, waterproofing & distemper', baseWage: 650, subcategories: ['Interior Wall Painting', 'Exterior Weatherproof', 'Waterproofing & Putty', 'Texture & Enamel'] },
  { id: 'cleaner', name: 'Cleaner / Housekeeping Staff', icon: '🧹', description: 'Home deep cleaning, water tank & farm shed sanitation', baseWage: 400, subcategories: ['Home Deep Cleaning', 'Overhead Water Tank', 'Farm Shed Sanitation', 'Bathroom & Floor Scrub'] },
  { id: 'mason', name: 'Mason / Raj Mistri', icon: '🧱', description: 'Brickwork, plastering, boundary wall & silo concrete work', baseWage: 800, subcategories: ['Brickwork & Plastering', 'Grain Silo Concrete', 'Boundary Wall / Fencing', 'Foundation & PCC'] },
  { id: 'labourer', name: 'Labourer / Daily-Wage Worker', icon: '👷', description: 'Daily-wage helper, crop harvesting, loading/unloading & digging', baseWage: 550, subcategories: ['Crop Harvesting & Threshing', 'Loading & Shifting Goods', 'Trench Digging & Earthwork', 'Construction Helper', 'General Daily Wage'] },
  { id: 'welder', name: 'Welder / Fabricator', icon: '👨‍🏭', description: 'Gate fabrication, farm equipment welding & tin shed repair', baseWage: 650, subcategories: ['Iron Gate & Grills', 'Tractor Trolley Welding', 'Tin Shed Fabrication', 'Emergency Spot Welding'] },
  { id: 'cctv_network', name: 'CCTV / Wi-Fi / RO Technician', icon: '📹', description: 'CCTV installation, broadband router & water purifier repair', baseWage: 450, subcategories: ['CCTV Camera Setup', 'Wi-Fi / Fiber Router', 'RO Filter Replacement', 'Smart Farm IoT Sensor'] },
  { id: 'pest_control', name: 'Pest-Control Worker', icon: '🦗', description: 'Termite treatment, grain store pest fumigation & mosquito fogging', baseWage: 550, subcategories: ['Termite Protection', 'Grain Store Fumigation', 'Cockroach / Ant Shield', 'Rodent Control'] },
  { id: 'gardener', name: 'Gardener / Mali', icon: '🌿', description: 'Hedge trimming, lawn mowing, organic manure & nursery care', baseWage: 400, subcategories: ['Lawn Mowing & Weeding', 'Tree Pruning & Shape', 'Organic Compost & Manure', 'Plant Nursery Setup'] },
  { id: 'driver_helper', name: 'Driver / Shifting Helper', icon: '🚚', description: 'Pickup truck driving, tempo goods shifting & tractor logistics', baseWage: 600, subcategories: ['Tractor / Tempo Driving', 'Agricultural Produce Haul', 'Household Shifting Crew', 'Commercial Delivery'] },
  { id: 'flooring_ceiling', name: 'Tiles, Flooring & False-Ceiling', icon: '🏗️', description: 'Floor tiles fitting, granite polishing & gypsum false ceiling', baseWage: 750, subcategories: ['Vitrified Tiles Laying', 'Granite & Marble Polish', 'Gypsum False Ceiling', 'Bathroom Tile Repair'] },
] as const;

// Default matching weights
export const DEFAULT_MATCH_WEIGHTS = {
  skill_match: 0.30,
  availability: 0.15,
  distance: 0.15,
  reliability: 0.15,
  experience: 0.10,
  rating: 0.05,
  verification: 0.05,
  wage_compatibility: 0.05,
} as const;

// Job status transitions (state machine)
export const VALID_JOB_TRANSITIONS: Record<string, string[]> = {
  requested: ['matching', 'cancelled'],
  matching: ['booked', 'cancelled'],
  booked: ['assigned', 'cancelled'],
  assigned: ['arriving', 'cancelled'],
  arriving: ['attendance_verified', 'cancelled'],
  attendance_verified: ['in_progress'],
  in_progress: ['completed', 'disputed'],
  completed: ['payment_pending'],
  payment_pending: ['paid'],
  paid: ['feedback_pending', 'closed'],
  feedback_pending: ['closed'],
  closed: [],
  cancelled: [],
  disputed: ['resolved', 'closed'],
};

// Platform fee percentage
export const PLATFORM_FEE_PERCENT = 10;
export const COOPERATIVE_CONTRIBUTION_PERCENT = 10;

// Reliability score weights
export const RELIABILITY_WEIGHTS = {
  completion_rate: 0.30,
  attendance_rate: 0.20,
  average_rating: 0.20,
  cancellation_penalty: 0.15,
  response_rate: 0.15,
};

// OTP settings
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 10;
export const OTP_MAX_ATTEMPTS = 3;
export const DEMO_OTP_CODE = '123456';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Colors for the NEXVION brand
export const COLORS = {
  primary: '#2563EB',       // Trust blue
  primaryDark: '#1D4ED8',
  primaryLight: '#60A5FA',
  secondary: '#059669',     // Growth green
  secondaryDark: '#047857',
  secondaryLight: '#34D399',
  accent: '#F59E0B',        // Warm amber
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  info: '#3B82F6',
  border: '#E2E8F0',
  disabled: '#CBD5E1',
  verified: '#10B981',
  pending: '#F59E0B',
  rejected: '#EF4444',
} as const;

// Demo location data (Indian cities for SIH context)
export const DEMO_LOCATIONS = [
  { name: 'Mumbai Central', lat: 18.9690, lng: 72.8193 },
  { name: 'Andheri West', lat: 19.1364, lng: 72.8296 },
  { name: 'Pune Station', lat: 18.5285, lng: 73.8744 },
  { name: 'Delhi NCR', lat: 28.6139, lng: 77.2090 },
  { name: 'Bangalore HSR', lat: 12.9141, lng: 77.6446 },
  { name: 'Chennai T Nagar', lat: 13.0418, lng: 80.2341 },
  { name: 'Hyderabad HiTec', lat: 17.4474, lng: 78.3762 },
  { name: 'Jaipur City', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow Hazratganj', lat: 26.8553, lng: 80.9559 },
  { name: 'Ahmedabad SG Highway', lat: 23.0225, lng: 72.5714 },
] as const;

// Complaint categories
export const COMPLAINT_CATEGORIES = [
  'Service Quality',
  'Worker Behavior',
  'Payment Dispute',
  'Cancellation',
  'Safety Concern',
  'Damage/Loss',
  'No Show',
  'Overcharging',
  'Other',
] as const;

// Welfare resources (demo)
export const WELFARE_RESOURCES = [
  {
    title: 'Worker Safety Guidelines',
    description: 'Essential safety procedures for all job types',
    type: 'safety',
  },
  {
    title: 'Emergency Helpline',
    description: 'Call 112 for immediate emergency assistance',
    type: 'emergency',
  },
  {
    title: 'Insurance Information',
    description: 'Learn about worker insurance coverage options',
    type: 'insurance',
  },
  {
    title: 'Welfare Support',
    description: 'Access welfare benefits and support programs',
    type: 'welfare',
  },
  {
    title: 'Legal Rights',
    description: 'Know your rights as a gig worker',
    type: 'rights',
  },
  {
    title: 'Health Resources',
    description: 'Healthcare access and health checkup programs',
    type: 'health',
  },
] as const;
