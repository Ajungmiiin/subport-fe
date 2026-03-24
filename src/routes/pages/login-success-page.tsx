import { useGetAuthActions } from '@/store/use-auth-store';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function LoginSuccessPage() {
  const { setAuth } = useGetAuthActions();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access');
  const firstLogin = searchParams.get('firstLogin');
  useEffect(() => {
    if (!accessToken) {
      navigate('/login', { replace: true });
    }

    if (accessToken) {
      setAuth('member', accessToken);
      navigate('/', { replace: true, state: { showOnboarding: firstLogin } });

      if (firstLogin) {
        sessionStorage.setItem(
          'first-login-onboarding-consumed',
          'un-consumed',
        );
      }
    }
  }, [accessToken, firstLogin, navigate, setAuth]);

  return null;
}
export default LoginSuccessPage;
