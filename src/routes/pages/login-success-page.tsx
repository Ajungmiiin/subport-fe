import { STORAGE_KEY } from '@/constants/storage-key';
import { useGetAuthActions, useGetAuthRole } from '@/store/use-auth-store';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function LoginSuccessPage() {
  const { setAuth } = useGetAuthActions();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access');
  const isFirstLogin = searchParams.get('firstLogin') === 'true';

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
        sessionStorage.removeItem(STORAGE_KEY.firstLoginOnboardingConsumed);
        clearAuth();
      }

      sessionStorage.setItem(STORAGE_KEY.feedbackEntrySuppressed, 'true');
      setAuth('member', accessToken);
      if (redirectTo) {
        console.log(redirectTo);
        navigate(redirectTo, {
          replace: true,
          state: { showOnboarding: isFirstLogin },
        });
      } else {
        navigate('/', {
          replace: true,
          state: { showOnboarding: isFirstLogin },
        });
      }

      if (isFirstLogin) {
        sessionStorage.setItem(
          STORAGE_KEY.firstLoginOnboardingConsumed,
          'un-consumed',
        );
      }
    }
  }, [accessToken, clearAuth, isFirstLogin, navigate, redirectTo, role, setAuth]);

  return null;
}
export default LoginSuccessPage;
