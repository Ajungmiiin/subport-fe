import { Navigate, Outlet } from 'react-router-dom';
import {
  useGetAccessToken,
  useGetAuthRole,
} from '@/domains/auth/store/use-auth-store';

export function RequireAuth() {
  const accessToken = useGetAccessToken();

  if (!accessToken) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export function RequireGuest() {
  const role = useGetAuthRole();

  if (role === 'member' || role === 'guest') return <Navigate to="/" replace />;

  return <Outlet />;
}
