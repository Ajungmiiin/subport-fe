import PageLoader from '@/components/ui/page-loader';
import { Suspense, type ReactNode } from 'react';

export const withHeader = { header: { header: true } };
export const withBottomNav = { bottomNavigation: true };

export const headerHandle = (title?: string, right?: ReactNode) => ({
  header: { header: true, title, right },
});

export const withPageSuspense = (node: React.ReactNode) => {
  return <Suspense fallback={<PageLoader />}>{node}</Suspense>;
};
