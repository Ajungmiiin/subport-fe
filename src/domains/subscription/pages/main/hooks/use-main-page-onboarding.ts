import { STORAGE_KEY } from '@/shared/constants/storage-key';
import { useGetAuthRole } from '@/domains/auth/store/use-auth-store';
import { useLocation } from 'react-router-dom';

function useMainPageOnboarding() {
  const role = useGetAuthRole();
  const isGuest = role === 'guest';

  const location = useLocation();

  const isOnBoardingConsumed =
    sessionStorage.getItem(STORAGE_KEY.firstLoginOnboardingConsumed) ===
    'consumed';
  const shouldShowOnboarding =
    (location.state?.showOnboarding === true || isGuest) &&
    !isOnBoardingConsumed;

  return shouldShowOnboarding;
}

export default useMainPageOnboarding;
