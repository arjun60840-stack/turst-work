import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import apiClient from '../api/client';
import { User, Worker, Customer, Cooperative, UserRole, AuthResponse, LoginRequest, RegisterRequest } from '../../../../packages/shared/src/types';

interface AuthState {
  user: User | null;
  worker: Worker | null;
  customer: Customer | null;
  cooperative: Cooperative | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  worker: null,
  customer: null,
  cooperative: null,
  token: null,
  isLoading: true,
  error: null,
  
  login: async (data: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', data);
      const { user, access_token, worker, customer, cooperative } = response.data;
      await SecureStore.setItemAsync('access_token', access_token);
      set({ user, worker, customer, cooperative, token: access_token, isLoading: false });
    } catch (err: any) {
      set({ error: err.toString(), isLoading: false });
      throw err;
    }
  },

  register: async (data: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      const { user, access_token, worker, customer, cooperative } = response.data;
      await SecureStore.setItemAsync('access_token', access_token);
      set({ user, worker, customer, cooperative, token: access_token, isLoading: false });
    } catch (err: any) {
      set({ error: err.toString(), isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('access_token');
    set({ user: null, worker: null, customer: null, cooperative: null, token: null });
  },

  loadStoredAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      if (token) {
        // Normally hit /auth/me here
        const response = await apiClient.get('/auth/me');
        set({ 
          user: response.data.user,
          worker: response.data.worker,
          customer: response.data.customer,
          cooperative: response.data.cooperative,
          token,
          isLoading: false 
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      set({ isLoading: false });
    }
  }
}));
