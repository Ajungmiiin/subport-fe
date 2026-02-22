import { useSubScribe } from '@/store/use-subscribe-store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function AddSubscribePageLayout() {
  const { resetSubscribe } = useSubScribe();
  useEffect(() => {
    return () => {
      resetSubscribe();
    };
  }, []);

  return <Outlet />;
}

export default AddSubscribePageLayout;
