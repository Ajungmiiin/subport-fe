import { STORAGE_KEY } from '@/constants/storage-key';
import { useGetAuthActions, useGetAuthRole } from '@/store/use-auth-store';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function LoginSuccessPage() {
  const { setAuth } = useGetAuthActions();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access');
  const firstLogin = searchParams.get('firstLogin');

  const redirectTo = sessionStorage.getItem('login-redirect');
  const role = useGetAuthRole();
  const { clearAuth } = useGetAuthActions();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login', { replace: true });
    }

    if (accessToken) {
      if (role === 'guest') {
        localStorage.removeItem(STORAGE_KEY.feedbackEntryHiddenUntil);
        localStorage.removeItem(STORAGE_KEY.feedbackSubmitted);
        localStorage.removeItem(STORAGE_KEY.firstLoginOnboardingConsumed);
        clearAuth();
      }

      setAuth('member', accessToken);
      if (redirectTo) {
        console.log(redirectTo);
        navigate(redirectTo, {
          replace: true,
          state: { showOnboarding: firstLogin },
        });
      } else {
        navigate('/', { replace: true, state: { showOnboarding: firstLogin } });
      }

      if (firstLogin) {
        sessionStorage.setItem(
          'first-login-onboarding-consumed',
          'un-consumed',
        );
      }
    }
  }, [accessToken, clearAuth, firstLogin, navigate, redirectTo, setAuth]);

  return null;
}
export default LoginSuccessPage;
