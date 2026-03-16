import type { ReactNode } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import GlobalHeader from './global-header';
import { cn } from '@/lib/utils';
import BottomNavigation from './bottom-navigation';
import Provider from '../providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '../ui/sonner';

type LayoutConfig = {
  header?: {
    header?: boolean;
    title?: string;
    right?: ReactNode;
    backTo?: string;
  };
  bottomNavigation?: boolean;
};

function RootLayout() {
  const matches = useMatches();

  const layout = [...matches]
    .reverse()
    .map((match) => {
      const handle = (match as { handle?: LayoutConfig }).handle;
      if (!handle) return undefined;

      const { header, bottomNavigation } = handle as LayoutConfig;
      if (header || typeof bottomNavigation === 'boolean') {
        return { header, bottomNavigation };
      }
      return undefined;
    })
    .find(Boolean);

  return (
    <Provider>
      <div className="h-svh w-full">
        <div className="bg-background-black relative mx-auto flex h-full max-w-107.5 flex-col text-white">
          {layout?.header && (
            <GlobalHeader
              title={layout.header.title}
              right={layout.header.right}
              backTo={layout.header.backTo}
            />
          )}

          <main
            className={cn(
              'scrollbar-hide flex-1 overflow-scroll p-6',
              layout?.bottomNavigation && 'pb-19',
              layout?.header && 'pt-0',
            )}
          >
            <Outlet />
          </main>

          {layout?.bottomNavigation && <BottomNavigation />}
        </div>
      </div>
      <Toaster />

      <ReactQueryDevtools />
    </Provider>
  );
}

export default RootLayout;
