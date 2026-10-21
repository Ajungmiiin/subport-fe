import HomeIcon from '@/assets/icons/home-icon.svg?react';
import AddIcon from '@/assets/icons/add-subscribe-icon.svg?react';
import MyPageIcon from '@/assets/icons/my-page-icon.svg?react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';

function BottomNavigation() {
  const { pathname } = useLocation();
  return (
    <div className="bg-box-black absolute bottom-0 left-0 z-10 w-full py-4">
      <div className="flex items-center justify-center gap-15">
        <Link
          to="/"
          className="flex w-13 flex-col items-center justify-center gap-1 text-xs"
        >
          <HomeIcon
            className={cn(
              'size-6 transition-colors',
              pathname === '/' ? 'fill-primary' : 'fill-icon-default',
            )}
          />
          <span>홈</span>
        </Link>
        <Link
          to="/service/add"
          className="flex w-13 flex-col items-center justify-center gap-1 text-xs"
        >
          <AddIcon className="fill-icon-default size-6" />
          <span>구독추가</span>
        </Link>
        <Link
          to="/my"
          className="flex w-13 flex-col items-center justify-center gap-1 text-xs"
        >
          <MyPageIcon
            className={cn(
              'size-6 transition-colors',
              pathname === '/my' ? 'fill-primary' : 'fill-icon-default',
            )}
          />
          <span>마이페이지</span>
        </Link>
      </div>
    </div>
  );
}

export default BottomNavigation;
