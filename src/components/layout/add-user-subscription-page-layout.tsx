import { useUserSubscriptionSelection } from '@/domains/subscription/user-subscription/store/use-user-subscription-selection-store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function AddUserSubscriptionPageLayout() {
  const { resetSubscribe } = useUserSubscriptionSelection();
  useEffect(() => {
    return () => {
      resetSubscribe();
    };
  }, []);

  return <Outlet />;
}

export default AddUserSubscriptionPageLayout;
