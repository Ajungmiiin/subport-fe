import useGuestLoginMutate from '@/hooks/mutations/use-guest-login-mutate';
import { useGetAuthActions } from '@/store/use-auth-store';

function GuestLoginButton() {
  const { setAuth } = useGetAuthActions();
  const { mutate: guestLogin } = useGuestLoginMutate({
    onSuccess: (data) => {
      sessionStorage.setItem('first-login-onboarding-consumed', 'un-consumed');
      setAuth('guest', data.accessToken);
    },
  });

  return (
    <button
      onClick={() => {
        guestLogin();
      }}
      type="button"
      className="text-background-black z-20 w-full cursor-pointer rounded-xl bg-white py-4 text-center text-lg font-semibold"
    >
      바로 시작하기
    </button>
  );
}

export default GuestLoginButton;
