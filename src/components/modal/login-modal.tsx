import kakaoSymol from '@/assets/icons/kakao-symbol.svg';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useLocation } from 'react-router-dom';
const KAKAO_OAUTH_URL = `${import.meta.env.VITE_API_URL}/oauth2/authorization/kakao`;

interface LoginModalProps {
  open: boolean;
  onOpenChange: () => void;
}

function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const location = useLocation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-background-black rounded-2xl border-none"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-white">
            로그인이 필요해요!
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-sub-font-black mb-2 text-center">
          이 기능은 로그인 후에 사용할 수 있어요
        </DialogDescription>

        <div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem('login-redirect', location.pathname);
              window.location.href = KAKAO_OAUTH_URL;
            }}
            className="mb-2 flex w-full items-center justify-center gap-4 rounded-xl bg-[#FDE500] py-4"
          >
            <img src={kakaoSymol} alt="카카오 심볼 로고" />
            <span className="text-background-black text-lg font-semibold">
              카카오로 로그인
            </span>
          </button>
          <button
            onClick={onOpenChange}
            type="button"
            className="text-sub-font-black w-full text-center text-xs"
          >
            나중에 할게요
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
