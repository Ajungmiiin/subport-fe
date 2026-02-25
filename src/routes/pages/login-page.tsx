import { Link } from 'react-router-dom';
import kakaoSymol from '@/assets/icons/kakao-symbol.svg';
import OnbordingImage from '@/assets/onbording-image.svg';
const KAKAO_OAUTH_URL = `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`;

function LoginPage() {
  return (
    <div className="relative flex h-full flex-col items-center justify-end gap-4 pb-4">
      <div className="z-1 mb-10 space-y-4 px-4 text-center">
        <h3 className="text-xl font-semibold">구독, 한 눈에 정리하세요!</h3>
        <p className="text-sub-font-black font-light break-keep">
          흩어진 구독 서비스와 월 지출을 한 번에 보여드려요
        </p>
      </div>
      <img src={OnbordingImage} className="absolute top-[10%] md:top-[35%]" />

      <Link
        to={KAKAO_OAUTH_URL}
        className="z-20 flex w-full items-center justify-center gap-4 rounded-xl bg-[#FDE500] py-4"
      >
        <img src={kakaoSymol} alt="카카오 심볼 로고" />
        <span className="text-background-black text-lg font-bold">
          카카오로 로그인
        </span>
      </Link>
    </div>
  );
}

export default LoginPage;
