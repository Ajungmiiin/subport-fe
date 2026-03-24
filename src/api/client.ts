import axios, { AxiosError, isAxiosError } from 'axios';
import { refresh } from './auth';
import { useAuthStore } from '@/store/use-auth-store';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

client.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  async (response) => response,
  async (error: AxiosError) => {
    const { clearAuth, setAuth } = useAuthStore.getState().actions;

    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const isRefreshRequest =
      originalRequest?.url?.includes('/api/auth/refresh');

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await refresh();

        if (!accessToken) {
          throw new Error('Missing refreshed access token');
        }

        setAuth('member', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return client(originalRequest);
      } catch {
        clearAuth();

        if (window.location.pathname !== '/login') {
          window.location.replace('/login');
        }
      }
    }

    return Promise.reject(error);
  },
);
