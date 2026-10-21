import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/components/layout/root-layout';
import { RequireAuth } from '@/components/layout/private-route';
import { authRoutes } from './auth-routes';
import { mainRoutes } from './main-routes';
import { myRoutes } from './my-routes';
import RootErrorPage from './pages/root-error-page';
import { serviceRoutes } from './service-routes';
import { supportRoutes } from './support-routes';
import { userSubscriptionRoutes } from './user-subscription-routes';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      ...authRoutes,
      {
        element: <RequireAuth />,
        children: [
          ...mainRoutes,
          ...serviceRoutes,
          ...userSubscriptionRoutes,
          ...myRoutes,
          ...supportRoutes,
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
