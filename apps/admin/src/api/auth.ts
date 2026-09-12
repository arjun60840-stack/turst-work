import { apiClient } from './client';
import { LoginRequest, AuthResponse } from '../types_mock';

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/admin/login', data);
  return response.data;
};
