// ============================================================
// NEXVION — Shared Type Definitions
// All apps (backend, mobile, admin) reference these types
// ============================================================

// ==================== ENUMS ====================

export enum UserRole {
  CUSTOMER = 'customer',
  WORKER = 'worker',
  COOPERATIVE = 'cooperative',
  ADMIN = 'admin',
}

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum JobStatus {
  REQUESTED = 'requested',
  MATCHING = 'matching',
  BOOKED = 'booked',
  ASSIGNED = 'assigned',
  ARRIVING = 'arriving',
  ATTENDANCE_VERIFIED = 'attendance_verified',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  PAYMENT_PENDING = 'payment_pending',
  PAID = 'paid',
  FEEDBACK_PENDING = 'feedback_pending',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed',
}

export enum HiringType {
  INDIVIDUAL = 'individual',
  GROUP = 'group',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum ComplaintStatus {
  OPEN = 'open',
  UNDER_REVIEW = 'under_review',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum NotificationType {
  JOB_NEW = 'job_new',
  JOB_MATCH = 'job_match',
  JOB_BOOKED = 'job_booked',
  JOB_ASSIGNED = 'job_assigned',
  JOB_ARRIVING = 'job_arriving',
  JOB_STARTED = 'job_started',
  JOB_COMPLETED = 'job_completed',
  ATTENDANCE_VERIFIED = 'attendance_verified',
  PAYMENT_RECEIVED = 'payment_received',
  REVIEW_RECEIVED = 'review_received',
  COMPLAINT_UPDATE = 'complaint_update',
  VERIFICATION_UPDATE = 'verification_update',
  COOPERATIVE_REQUEST = 'cooperative_request',
  WELFARE_UPDATE = 'welfare_update',
  GENERAL = 'general',
}

export enum WelfareStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

// ==================== BASE TYPES ====================

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// ==================== USER TYPES ====================

export interface User extends BaseEntity {
  email: string;
  phone?: string;
  role: UserRole;
  is_active: boolean;
  last_login?: string;
}

export interface Worker extends BaseEntity {
  user_id: string;
  name: string;
  photo_url?: string;
  bio?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  service_radius_km: number;
  verification_status: VerificationStatus;
  reliability_score: number;
  total_jobs_completed: number;
  total_earnings: number;
  average_rating: number;
  is_available: boolean;
  cooperative_id?: string;
}

export interface Customer extends BaseEntity {
  user_id: string;
  name: string;
  photo_url?: string;
  phone?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  total_jobs_posted: number;
  average_rating: number;
}

export interface Cooperative extends BaseEntity {
  name: string;
  description?: string;
  logo_url?: string;
  leader_user_id: string;
  latitude?: number;
  longitude?: number;
  service_radius_km: number;
  verification_status: VerificationStatus;
  reliability_score: number;
  total_jobs_completed: number;
  average_rating: number;
  member_count: number;
  is_active: boolean;
}

export interface CooperativeMember extends BaseEntity {
  cooperative_id: string;
  worker_id: string;
  role: 'leader' | 'member';
  joined_at: string;
  is_active: boolean;
}

// ==================== SKILL TYPES ====================

export interface ServiceCategory extends BaseEntity {
  name: string;
  description?: string;
  icon?: string;
  is_active: boolean;
}

export interface Skill extends BaseEntity {
  name: string;
  category_id: string;
  description?: string;
  is_active: boolean;
}

export interface WorkerSkill extends BaseEntity {
  worker_id: string;
  skill_id: string;
  skill_level: SkillLevel;
  years_experience: number;
  is_verified: boolean;
  skill?: Skill;
}

export interface Certificate extends BaseEntity {
  worker_id: string;
  name: string;
  issuing_authority?: string;
  issue_date?: string;
  expiry_date?: string;
  file_url?: string;
  verification_status: VerificationStatus;
}

// ==================== AVAILABILITY ====================

export interface WorkerAvailability extends BaseEntity {
  worker_id: string;
  day_of_week: DayOfWeek;
  start_time: string; // HH:mm
  end_time: string;   // HH:mm
  is_available: boolean;
}

// ==================== JOB TYPES ====================

export interface JobRequest extends BaseEntity {
  customer_id: string;
  title: string;
  description: string;
  category_id: string;
  hiring_type: HiringType;
  workers_needed: number;
  latitude: number;
  longitude: number;
  address: string;
  scheduled_date: string;
  scheduled_time: string;
  estimated_duration_hours: number;
  budget: number;
  status: JobStatus;
  photo_url?: string;
  additional_requirements?: string;
  // Populated fields
  category?: ServiceCategory;
  customer?: Customer;
  required_skills?: JobRequirement[];
  candidates?: JobCandidate[];
  booking?: Booking;
}

export interface JobRequirement extends BaseEntity {
  job_id: string;
  skill_id: string;
  min_skill_level?: SkillLevel;
  workers_needed: number;
  skill?: Skill;
}

export interface JobCandidate extends BaseEntity {
  job_id: string;
  worker_id?: string;
  cooperative_id?: string;
  match_score: number;
  match_reasons: MatchReason[];
  is_selected: boolean;
  // Populated
  worker?: Worker;
  cooperative?: Cooperative;
}

export interface MatchReason {
  factor: string;
  score: number;
  max_score: number;
  label: string;
  passed: boolean;
  detail?: string;
}

export interface MatchResult {
  candidate_id: string;
  candidate_type: 'worker' | 'cooperative';
  match_score: number;
  match_percentage: number;
  reasons: MatchReason[];
  worker?: Worker & { skills?: WorkerSkill[] };
  cooperative?: Cooperative & { members?: (CooperativeMember & { worker?: Worker })[] };
}

// ==================== BOOKING TYPES ====================

export interface Booking extends BaseEntity {
  job_id: string;
  customer_id: string;
  worker_id?: string;
  cooperative_id?: string;
  hiring_type: HiringType;
  status: JobStatus;
  total_amount: number;
  worker_amount: number;
  cooperative_amount: number;
  platform_fee: number;
  otp_code?: string;
  otp_expires_at?: string;
  otp_verified: boolean;
  agreement_accepted_customer: boolean;
  agreement_accepted_worker: boolean;
  agreement_accepted_at?: string;
  // Populated
  job?: JobRequest;
  worker?: Worker;
  cooperative?: Cooperative;
  assigned_workers?: BookingWorker[];
}

export interface BookingWorker extends BaseEntity {
  booking_id: string;
  worker_id: string;
  wage_amount: number;
  attendance_verified: boolean;
  attendance_time?: string;
  attendance_latitude?: number;
  attendance_longitude?: number;
  worker?: Worker;
}

// ==================== AGREEMENT ====================

export interface JobAgreement extends BaseEntity {
  booking_id: string;
  job_id: string;
  customer_id: string;
  worker_id?: string;
  cooperative_id?: string;
  service_description: string;
  location: string;
  scheduled_date: string;
  scheduled_time: string;
  duration_hours: number;
  total_amount: number;
  worker_amount: number;
  cooperative_amount: number;
  platform_fee: number;
  terms: string;
  customer_accepted: boolean;
  customer_accepted_at?: string;
  worker_accepted: boolean;
  worker_accepted_at?: string;
}

// ==================== PAYMENT TYPES ====================

export interface Payment extends BaseEntity {
  booking_id: string;
  job_id: string;
  customer_id: string;
  amount: number;
  status: PaymentStatus;
  payment_mode: 'demo' | 'production';
  payment_method?: string;
  transaction_id?: string;
  paid_at?: string;
}

export interface PaymentSplit extends BaseEntity {
  payment_id: string;
  booking_id: string;
  recipient_type: 'worker' | 'cooperative' | 'platform';
  recipient_id?: string;
  amount: number;
  description: string;
  worker?: Worker;
}

// ==================== REVIEW TYPES ====================

export interface Review extends BaseEntity {
  booking_id: string;
  job_id: string;
  reviewer_id: string;
  reviewee_id: string;
  reviewer_role: UserRole;
  rating: number; // 1-5
  comment?: string;
  service_quality?: number;
  punctuality?: number;
  communication?: number;
}

// ==================== WELFARE TYPES ====================

export interface WelfareProfile extends BaseEntity {
  worker_id: string;
  insurance_status: WelfareStatus;
  insurance_provider?: string;
  insurance_policy_number?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  total_contributions: number;
  is_demo: boolean;
}

export interface WelfareContribution extends BaseEntity {
  worker_id: string;
  amount: number;
  source: string;
  description?: string;
  contributed_at: string;
}

export interface SafetyRequest extends BaseEntity {
  worker_id: string;
  type: 'emergency' | 'incident' | 'support' | 'safety_concern';
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  resolved_at?: string;
  resolution_notes?: string;
}

// ==================== COMPLAINT TYPES ====================

export interface Complaint extends BaseEntity {
  reporter_id: string;
  reporter_role: UserRole;
  job_id?: string;
  booking_id?: string;
  category: string;
  title: string;
  description: string;
  evidence_url?: string;
  status: ComplaintStatus;
  admin_notes?: string;
  resolved_at?: string;
}

// ==================== NOTIFICATION TYPES ====================

export interface Notification extends BaseEntity {
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  read_at?: string;
}

// ==================== DEMAND TYPES ====================

export interface DemandRecord extends BaseEntity {
  category_id: string;
  latitude: number;
  longitude: number;
  area_name?: string;
  date: string;
  jobs_requested: number;
  jobs_completed: number;
  jobs_unfulfilled: number;
  workers_available: number;
  workers_needed: number;
}

export interface DemandPrediction extends BaseEntity {
  category_id: string;
  area_name?: string;
  prediction_date: string;
  predicted_demand: number;
  confidence: 'low' | 'medium' | 'high';
  trend: 'rising' | 'stable' | 'falling';
  recommendation?: string;
  is_demo: boolean;
}

// ==================== API TYPES ====================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  worker?: Worker;
  customer?: Customer;
  cooperative?: Cooperative;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  category_id: string;
  hiring_type: HiringType;
  workers_needed: number;
  required_skill_ids: string[];
  latitude: number;
  longitude: number;
  address: string;
  scheduled_date: string;
  scheduled_time: string;
  estimated_duration_hours: number;
  budget: number;
  additional_requirements?: string;
}

export interface MatchRequest {
  job_id: string;
  max_results?: number;
  max_distance_km?: number;
}

export interface BookingRequest {
  job_id: string;
  candidate_id: string;
  candidate_type: 'worker' | 'cooperative';
}

export interface AttendanceRequest {
  booking_id: string;
  otp_code: string;
  latitude: number;
  longitude: number;
}

export interface ReviewRequest {
  booking_id: string;
  rating: number;
  comment?: string;
  service_quality?: number;
  punctuality?: number;
  communication?: number;
}

export interface ComplaintRequest {
  job_id?: string;
  booking_id?: string;
  category: string;
  title: string;
  description: string;
}

export interface WageSplitResult {
  total_amount: number;
  workers: { worker_id: string; name: string; amount: number }[];
  cooperative_amount: number;
  platform_fee: number;
  cooperative_name?: string;
}

// ==================== ADMIN DASHBOARD TYPES ====================

export interface DashboardStats {
  total_workers: number;
  verified_workers: number;
  total_customers: number;
  total_cooperatives: number;
  active_jobs: number;
  completed_jobs: number;
  total_transactions: number;
  total_revenue: number;
  open_complaints: number;
  average_match_score: number;
}

export interface DemandInsight {
  category: string;
  area: string;
  demand_level: 'high' | 'medium' | 'low';
  trend: 'rising' | 'stable' | 'falling';
  message: string;
  predicted_workers_needed: number;
}
