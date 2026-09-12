import { apiClient } from './client';
import { DashboardStats } from '../types_mock';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get<{ data: DashboardStats }>('/admin/dashboard/stats');
  return response.data.data;
};

export const getDemandAnalytics = async () => {
  const response = await apiClient.get('/admin/analytics/demand');
  return response.data.data;
};

export const getAuditLogs = async () => {
  const response = await apiClient.get('/admin/audit-logs');
  return response.data.data;
};
