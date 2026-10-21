import FeedbackModalPage from '@/domains/subport/pages/feed-back-modal-page';
import type { RouteObject } from 'react-router-dom';
import { withBottomNav } from './route-handles';
import { lazy, Suspense } from 'react';
import PageLoader from '@/components/ui/page-loader';

const MainPage = lazy(
  () => import('@/domains/subscription/pages/main/main-page'),
);

export const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <MainPage />
      </Suspense>
    ),
    handle: withBottomNav,
    children: [
      {
        path: '/feedback',
        element: <FeedbackModalPage />,
      },
    ],
  },
];
