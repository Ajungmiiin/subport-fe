import { RequireGuest } from '@/components/layout/private-route';
import LoginPage from '@/domains/auth/pages/login-page';
import LoginSuccessPage from '@/domains/auth/pages/login-success-page';
import type { RouteObject } from 'react-router-dom';

export const authRoutes: RouteObject[] = [
  {
    element: <RequireGuest />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/login-success',
    element: <LoginSuccessPage />,
  },
];
