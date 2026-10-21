import axios, { AxiosError, isAxiosError } from 'axios';
import { refresh } from '../../domains/auth/api/auth';
import { useAuthStore } from '@/domains/auth/store/use-auth-store';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string> | null = null;

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
        if (!refreshPromise) {
          refreshPromise = refresh()
            .then(({ accessToken }) => {
              if (!accessToken) {
                throw new Error('Missing refreshed access token');
              }
              setAuth('member', accessToken);
              return accessToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const accessToken = await refreshPromise;

        originalRequest.headers = originalRequest.headers ?? {};
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
