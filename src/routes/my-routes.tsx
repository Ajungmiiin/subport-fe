import type { RouteObject } from 'react-router-dom';
import { withBottomNav, withHeader, withPageSuspense } from './route-handles';
import { lazy } from 'react';

import MyPage from '@/domains/account/pages/my-page/my-page';
import MySubscriptionsListPage from '@/domains/account/pages/my-subscriptions-list-page';

const MySubscriptionSchedulePage = lazy(
  () =>
    import('@/domains/subscription/schedule/pages/my-subscription-schedule/my-subscription-schedule-page'),
);

const EditAccountPage = lazy(
  () => import('@/domains/account/pages/edit-account-page/edit-account-page'),
);
const EditReminderPage = lazy(
  () => import('@/domains/account/pages/edit-reminder-page/edit-reminder-page'),
);
export const myRoutes: RouteObject[] = [
  {
    path: '/my',
    children: [
      {
        index: true,
        element: <MyPage />,
        handle: withBottomNav,
      },
      {
        path: 'edit-account',
        element: withPageSuspense(<EditAccountPage />),
        handle: withHeader,
      },
      {
        path: 'reminder',
        element: withPageSuspense(<EditReminderPage />),
        handle: withHeader,
      },
      {
        path: 'subscriptions',
        element: <MySubscriptionsListPage />,
        handle: withHeader,
      },
      {
        path: 'schedule',
        element: withPageSuspense(<MySubscriptionSchedulePage />),
        handle: withHeader,
      },
    ],
  },
];
