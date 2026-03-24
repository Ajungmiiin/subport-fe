import axios from 'axios';
import { client } from './client';

type RefreshRes = {
  accessToken: string;
};

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const refresh = async () => {
  const response = await authClient.post<RefreshRes>('/api/auth/refresh');

  return response.data;
};

export const logout = async () => {
  const response = await client.post('/api/auth/logout');

  return response.data;
};

export const guestLogin = async () => {
  const response = await authClient.post<{ accessToken: string }>(
    '/api/auth/guest',
  );

  return response.data;
};
