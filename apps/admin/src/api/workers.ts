import { apiClient } from './client';
import { Worker, VerificationStatus } from '../types_mock';

export const getWorkers = async () => {
  const response = await apiClient.get<{ data: Worker[] }>('/admin/workers');
  return response.data.data;
};

export const getWorkerById = async (id: string) => {
  const response = await apiClient.get<{ data: Worker }>(`/admin/workers/${id}`);
  return response.data.data;
};

export const updateWorkerVerification = async (id: string, status: VerificationStatus) => {
  const response = await apiClient.patch(`/admin/workers/${id}/verify`, { status });
  return response.data;
};

export const getPendingVerifications = async () => {
  const response = await apiClient.get<{ data: Worker[] }>('/admin/workers/verifications/pending');
  return response.data.data;
};
