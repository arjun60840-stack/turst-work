// Copying shared constants for mobile usage if direct import fails in React Native
export const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#60A5FA',
  secondary: '#059669',
  secondaryDark: '#047857',
  secondaryLight: '#34D399',
  accent: '#F59E0B',
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

export const DEFAULT_SERVICE_CATEGORIES = [
  { name: 'Electrical', icon: '⚡', description: 'Electrical repair and installation' },
  { name: 'Plumbing', icon: '🔧', description: 'Plumbing repair and maintenance' },
  { name: 'Carpentry', icon: '🪚', description: 'Woodwork and carpentry services' },
  { name: 'Painting', icon: '🎨', description: 'Interior and exterior painting' },
  { name: 'Cleaning', icon: '🧹', description: 'Household and commercial cleaning' },
] as const;

export const DEMO_LOCATIONS = [
  { name: 'Mumbai Central', lat: 18.9690, lng: 72.8193 },
  { name: 'Andheri West', lat: 19.1364, lng: 72.8296 },
  { name: 'Delhi NCR', lat: 28.6139, lng: 77.2090 },
] as const;
