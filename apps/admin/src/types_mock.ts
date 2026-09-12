export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export interface LoginRequest {
  phone: string;
  password?: string;
  otp?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    refreshToken?: string;
    user: {
      id: string;
      name: string;
      phone: string;
      role: string;
      avatar_url?: string;
    };
  };
}

export interface Worker {
  id: string;
  user_id?: string;
  name: string;
  phone: string;
  email?: string;
  avatar_url?: string;
  cooperative_id?: string;
  cooperative_name?: string;
  verification_status: VerificationStatus | string;
  reliability_score: number;
  total_jobs_completed: number;
  average_rating: number;
  hourly_rate?: number;
  daily_rate?: number;
  skills?: string[];
  is_active?: boolean;
  created_at?: string;
}

export interface DashboardStats {
  total_workers: number;
  verified_workers: number;
  total_cooperatives: number;
  total_customers: number;
  active_jobs: number;
  completed_jobs: number;
  total_revenue: number;
  average_reliability: number;
  open_complaints: number;
}
