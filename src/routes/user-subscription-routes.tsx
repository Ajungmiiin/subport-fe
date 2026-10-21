import { lazy, Suspense } from 'react';

import type { RouteObject } from 'react-router-dom';
import UserSubscriptionEditLink from '@/domains/subscription/user-subscription/components/edit/user-subscription-edit-link';
import EditUserSubscriptionDutchPayPage from '@/domains/subscription/user-subscription/pages/edit-user-subscription-dutchpay-page';
import EditUserSubscriptionPage from '@/domains/subscription/user-subscription/pages/edit-user-subscription-page';
import EditUserSubscriptionPlanPage from '@/domains/subscription/user-subscription/pages/edit-user-subscription-plan-page';
import EditUserSubscriptionStatePage from '@/domains/subscription/user-subscription/pages/edit-user-subscription-state-page';
import UserSubscriptionEditLayout from '@/domains/subscription/user-subscription/pages/layouts/user-subscription-edit-layout';
import UserSubscriptionPlanManagePage from '@/domains/subscription/user-subscription/pages/user-subscription-plan-manage-page';
import { headerHandle, withHeader, withPageSuspense } from './route-handles';
import UserSubscriptionDetailSkeleton from '@/domains/subscription/user-subscription/components/ui/user-subscription-detail-skeleton';

const UserSubscriptionReactivatePage = lazy(
  () =>
    import('@/domains/subscription/user-subscription/pages/user-subscription-reactivate-page'),
);

const UserSubscriptionDetailPage = lazy(
  () =>
    import('@/domains/subscription/user-subscription/pages/user-subscription-detail/user-subscription-detail-page'),
);
export const userSubscriptionRoutes: RouteObject[] = [
  {
    path: '/user-subscription',
    children: [
      {
        path: ':userSubscribeId',
        element: (
          <Suspense fallback={<UserSubscriptionDetailSkeleton />}>
            <UserSubscriptionDetailPage />
          </Suspense>
        ),
        handle: headerHandle(undefined, <UserSubscriptionEditLink />),
      },
      {
        path: ':userSubscribeId/edit',
        element: <UserSubscriptionEditLayout />,
        handle: withHeader,
        children: [
          {
            index: true,
            element: <EditUserSubscriptionPage />,
          },
          {
            path: 'plan',
            element: <EditUserSubscriptionPlanPage />,
          },
          {
            path: 'dutchpay',
            element: <EditUserSubscriptionDutchPayPage />,
          },
          {
            path: 'state',
            element: <EditUserSubscriptionStatePage />,
          },
        ],
      },
      {
        path: ':userSubscribeId/edit/plan/manage/:subscribeId',
        element: <UserSubscriptionPlanManagePage />,
        handle: headerHandle('멤버십 관리'),
      },
      {
        path: ':userSubscribeId/reactivate',
        element: withPageSuspense(<UserSubscriptionReactivatePage />),
        handle: withHeader,
      },
    ],
  },
];
