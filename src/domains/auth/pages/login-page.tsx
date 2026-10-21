import { Link } from 'react-router-dom';
import kakaoSymol from '@/assets/icons/kakao-symbol.svg';
import OnbordingImage from '@/assets/login-page-background-image.png';
import GuestLoginButton from '@/domains/auth/components/guest-login-button';
const KAKAO_OAUTH_URL = `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`;

function LoginPage() {
  return (
    <div className="relative flex h-full flex-col items-center justify-end gap-4 pb-4">
      <img src={OnbordingImage} className="absolute bottom-[25%]" />

      <div className="z-20 mb-5 w-full text-center">
        <h3 className="mb-4 text-xl font-semibold">
          구독, 한 눈에 정리하세요!
        </h3>
        <p className="text-sub-font-black font-light break-keep">
          흩어진 구독 서비스와 <br />월 지출을 한 번에 보여드려요
        </p>
      </div>
      <Link
        to={KAKAO_OAUTH_URL}
        className="z-20 flex w-full items-center justify-center gap-4 rounded-xl bg-[#FDE500] py-4"
      >
        <img src={kakaoSymol} alt="카카오 심볼 로고" />
        <span className="text-background-black text-lg font-semibold">
          카카오로 로그인
        </span>
      </Link>

      <GuestLoginButton />
    </div>
  );
}

export default LoginPage;
