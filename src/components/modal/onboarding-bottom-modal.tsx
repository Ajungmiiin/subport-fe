import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { Button } from '../ui/button';
import OnBoardingSearchIcon from '@/assets/icons/onboarding-search-icon.png';
import OnBoardingNotiIcon from '@/assets/icons/onboarding-notification-icon.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useGetAuthActions, useGetAuthRole } from '@/store/use-auth-store';

interface OnBoardingBottomModalProps {
  open: boolean;
}

function OnBoardingBottomModal({ open }: OnBoardingBottomModalProps) {
  const { clearAuth } = useGetAuthActions();
  const role = useGetAuthRole();
  const navigate = useNavigate();

  const isGuest = role === 'guest';
  const [onboardingStep, setOnBoardingStep] = useState<
    'exchangeRateNotice' | 'notificationSetting' | null
  >('exchangeRateNotice');

  return (
    <Drawer open={open}>
      <DrawerContent className="bg-background-black data-[vaul-drawer-direction=bottom]:rounded-t-[30px]">
        <div className="pb-10">
          <div className="flex items-center justify-end gap-1 px-4 py-2.5">
            <span
              className={cn(
                onboardingStep === 'exchangeRateNotice'
                  ? 'bg-primary'
                  : 'bg-white',
                'size-1.5 rounded-full transition-colors',
              )}
            ></span>
            <span
              className={cn(
                onboardingStep === 'notificationSetting'
                  ? 'bg-primary'
                  : 'bg-white',
                'size-1.5 rounded-full transition-colors',
              )}
            ></span>
          </div>
          <DrawerHeader>
            <DrawerTitle className="text-lg text-white">
              {onboardingStep === 'exchangeRateNotice' && '환율 적용 기준 안내'}
              {onboardingStep === 'notificationSetting' && (
                <>
                  구독 결제 <br />
                  이메일 알림을 받아보세요!
                </>
              )}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="text-sub-font-black mx-auto text-center text-sm/relaxed">
            {onboardingStep === 'exchangeRateNotice' && (
              <>
                해외 결제 구독은 오후 12시 기준 환율로 계산돼요. <br /> 실제
                결제 금액과 차이가 있을 수 있어요.
              </>
            )}

            {onboardingStep === 'notificationSetting' && (
              <>
                결제 예정일 3일 전에 이메일로 미리 알려드려요. <br />
                알림 시점은 언제든지 설정에서 변경할 수 있어요.
              </>
            )}
          </DrawerDescription>
          <img
            src={
              onboardingStep === 'exchangeRateNotice'
                ? OnBoardingSearchIcon
                : OnBoardingNotiIcon
            }
            aria-hidden
            className="mx-auto mt-8 h-auto w-20"
          />
        </div>
        <DrawerFooter>
          {onboardingStep === 'exchangeRateNotice' && (
            <Button
              className="bg-primary-light-active hover:bg-primary-light-hover h-12 rounded-xl text-sm"
              onClick={() => setOnBoardingStep('notificationSetting')}
            >
              확인했어요
            </Button>
          )}
          {onboardingStep === 'notificationSetting' && (
            <>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    if (!isGuest) {
                      navigate('/', { replace: true, state: null });
                      sessionStorage.setItem(
                        'first-login-onboarding-consumed',
                        'consumed',
                      );
                    } else {
                      navigate('/', {
                        replace: true,
                        state: { skipFeedbackEntry: true },
                      });
                      sessionStorage.setItem(
                        'first-login-onboarding-consumed',
                        'consumed',
                      );
                    }
                  }}
                  variant={'cancel'}
                  className="h-12 w-full max-w-2/5 rounded-xl text-sm"
                >
                  나중에
                </Button>
                <Button
                  onClick={() => {
                    if (!isGuest) {
                      navigate('/my/reminder', { state: null });
                      sessionStorage.setItem(
                        'first-login-onboarding-consumed',
                        'consumed',
                      );
                    } else {
                      clearAuth();
                    }
                  }}
                  className="bg-primary-light-active hover:bg-primary-light-hover h-12 flex-1 rounded-xl text-sm"
                >
                  {isGuest ? '로그인 후 알림받기' : '알림 받기'}
                </Button>
              </div>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default OnBoardingBottomModal;
