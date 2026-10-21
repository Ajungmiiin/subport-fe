import FaqPage from '@/domains/subport/pages/faq-page';
import type { RouteObject } from 'react-router-dom';
import { headerHandle, withHeader, withPageSuspense } from './route-handles';
import { lazy } from 'react';

const UserCommentPage = lazy(
  () => import('@/domains/subport/pages/user-comment-page'),
);

export const supportRoutes: RouteObject[] = [
  {
    path: '/faq',
    element: <FaqPage />,
    handle: headerHandle('FAQ'),
  },
  {
    path: '/user-comment',
    element: withPageSuspense(<UserCommentPage />),
    handle: withHeader,
  },
];
