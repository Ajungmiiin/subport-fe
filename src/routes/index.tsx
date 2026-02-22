import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';

import RootLayout from '@/components/layout/root-layout';
import { RequireAuth, RequireGuest } from '@/components/layout/private-route';

import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import LoginSuccessPage from './pages/login-success-page';
import AddSubscribePage from './pages/add-subscribe-page';
import AddSubscribeFormPage from './pages/add-subscribe-form-page';
import MyPage from './pages/my-page';
import AddCustomSubscribePage from './pages/add-custom-subscribe-page';
import AddPlanPage from './pages/add-plan-page';
import EditPlanPage from './pages/edit-plan-page';
import PlanPageLayout from '@/components/layout/plan-page-layout';
import PlanEditorPage from './pages/plan-editor-page';
import SubscribeEditorPage from './pages/subscribe-editor-page';
import EditCustomSubscribePage from './pages/edit-custom-subscribe-page';
import MemberSubscribeDetailpage from './pages/member-subscribe-detail-page';
import MemberSubscribeEditLink from '@/components/subscribe/member-subscribe/member-subscribe-edit-link';
import MemberSubscribeEditPage from './pages/member-subscribe-edit-page';
import EditMemberSubscribeFormPage from './pages/edit-member-subscribe-form-page';
import MemberSubscribePlanManagePage from './pages/member-subscribe-plan-manage-page';
import AddSubscribePageLayout from '@/components/layout/add-subscribe-page-layout';
import MemberSubscribeReactivatePage from './pages/member-subscribe-reactivate-page';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <RequireGuest />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/login-success',
            element: <LoginSuccessPage />,
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/',
            element: <MainPage />,
            handle: { bottomNavigation: true },
          },

          {
            path: '/subscribe',
            children: [
              {
                path: 'edit',
                element: <SubscribeEditorPage />,
                handle: { header: { header: true, title: '구독 서비스 관리' } },
              },
              {
                path: 'edit/:subscribeId',
                element: <EditCustomSubscribePage />,
                handle: {
                  header: {
                    header: true,
                  },
                },
              },
              {
                element: <AddSubscribePageLayout />,
                children: [
                  {
                    path: 'add',
                    element: <AddSubscribePage />,
                    handle: {
                      header: {
                        header: true,
                        title: '구독추가',
                        right: (
                          <Link
                            to="/subscribe/edit"
                            className="bg-box-black block rounded-full px-5 py-2 text-xs"
                          >
                            관리
                          </Link>
                        ),
                      },
                    },
                  },
                  {
                    path: 'add/:id',
                    element: <AddSubscribeFormPage />,
                    handle: { header: true },
                  },
                ],
              },
              {
                path: 'add/custom',
                element: <AddCustomSubscribePage />,
                handle: {
                  header: {
                    header: true,
                  },
                },
              },

              {
                path: ':subscribeId/plan',
                element: <PlanPageLayout />,
                children: [
                  {
                    path: 'add',
                    element: <AddPlanPage />,
                    handle: { header: true },
                  },
                  {
                    path: 'edit',
                    element: <PlanEditorPage />,
                    handle: {
                      header: {
                        header: true,
                        title: '멤버십 관리',
                      },
                    },
                  },
                  {
                    path: 'edit/:planId',
                    element: <EditPlanPage />,
                    handle: { header: true },
                  },
                ],
              },
            ],
          },

          {
            path: '/member-subscribe',
            children: [
              {
                path: ':memberSubscribeId',
                element: <MemberSubscribeDetailpage />,
                handle: {
                  header: {
                    header: true,
                    right: <MemberSubscribeEditLink />,
                  },
                },
              },
              {
                path: ':memberSubscribeId/edit',
                element: <MemberSubscribeEditPage />,
                handle: {
                  header: { header: true },
                },
              },
              {
                path: ':memberSubscribeId/edit/:editSection',
                element: <EditMemberSubscribeFormPage />,
                handle: {
                  header: { header: true },
                },
              },

              {
                path: ':memberSubscribeId/edit/plan/manage/:subscribeId',
                element: <MemberSubscribePlanManagePage />,
                handle: {
                  header: { header: true, title: '멤버십 관리' },
                },
              },
              {
                path: ':memberSubscribeId/reactivate',
                element: <MemberSubscribeReactivatePage />,
                handle: { header: { header: true } },
              },
            ],
          },

          {
            path: '/my',
            element: <MyPage />,
            handle: { bottomNavigation: true },
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
