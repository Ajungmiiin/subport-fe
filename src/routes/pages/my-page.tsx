import useGetMyProfile from '@/hooks/queries/use-get-my-profile';
import { Link } from 'react-router-dom';

import SubscribeCalendarIcon from '@/assets/subscribe-calendar.png';
import SubscribeManageIcon from '@/assets/subscribe-manage.png';
import EditProfileIcon from '@/assets/icons/edit-proifle-icon.svg';
import LogoutIcon from '@/assets/icons/logout-icon.svg';
import QuitIcon from '@/assets/icons/quit-icon.svg';
import NotificationIcon from '@/assets/icons/notification-icon.svg';
import FaqIcon from '@/assets/icons/faq-icon.svg';
import { ChevronRight } from 'lucide-react';
import MyPageSkeleton from '@/components/my/my-page-skeleton';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/components/my/logout-button';
function MyPage() {
  const {
    data: profile,
    isPending: isGetProfilePending,
    refetch,
  } = useGetMyProfile();

  if (isGetProfilePending) return <MyPageSkeleton />;
  if (!profile)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <p className="text-sub-font-black">프로필 정보를 불러오지 못했습니다</p>
        <Button
          type="button"
          onClick={async () => await refetch}
          variant={'secondary'}
          className="rounded-lg px-4 py-1.5 font-medium"
        >
          다시 불러오기
        </Button>
      </div>
    );

  return (
    <section className="scrollbar-hide h-full overflow-scroll">
      <p className="mb-4 w-1/2 text-2xl/relaxed font-semibold">
        {`${profile.nickname}님!`}
        <br />
        구독을 관리한지
        <br />
        <span className="text-primary">{`D+${profile.joinedDays}`}</span>
      </p>

      <div className="mb-4 flex items-center gap-4">
        <Link
          to="/my/schedule"
          className="bg-box-black relative aspect-square w-1/2 overflow-hidden rounded-2xl p-4 font-semibold"
        >
          <span>구독 일정</span>
          <img
            src={SubscribeCalendarIcon}
            alt="구독 일정 아이콘"
            className="absolute right-0 bottom-0 size-25"
          />
        </Link>
        <Link
          to="/my/subscribe"
          className="bg-box-black relative aspect-square w-1/2 overflow-hidden rounded-2xl p-4 font-semibold"
        >
          <span>구독 관리</span>
          <img
            src={SubscribeManageIcon}
            alt="구독 일정 아이콘"
            className="absolute right-0 bottom-0 size-25"
          />
        </Link>
      </div>

      <div className="mb-4">
        <p className="text-sub-font-black mb-2 text-sm font-semibold">
          계정 설정
        </p>
        <ul className="bg-box-black space-y-6 rounded-2xl p-4">
          <li>
            <Link
              to="/my/edit-account"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img className="size-8" src={EditProfileIcon} alt="정보 수정" />
                <div className="flex flex-col justify-between text-sm">
                  <span className="font-semibold">정보 수정</span>
                  <span className="text-sub-font-black text-xs">
                    계정 정보를 수정할 수 있어요
                  </span>
                </div>
              </div>
              <ChevronRight />
            </Link>
          </li>
          <li>
            <LogoutButton>
              <div className="flex items-center gap-2.5">
                <img className="size-8" src={LogoutIcon} alt="로그아웃" />
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-start font-semibold">로그아웃</span>
                  <span className="text-sub-font-black text-xs">
                    현재 계정에서 로그아웃 해요
                  </span>
                </div>
              </div>
              <ChevronRight />
            </LogoutButton>
          </li>
          <li>
            <button className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img className="size-8" src={QuitIcon} alt="계정 탈퇴" />
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-start font-semibold">계정 탈퇴</span>
                  <span className="text-sub-font-black text-xs">
                    계정을 탈퇴하고 모든 데이터를 삭제해요
                  </span>
                </div>
              </div>
              <ChevronRight />
            </button>
          </li>
        </ul>
      </div>

      <div>
        <p className="text-sub-font-black mb-2 text-sm font-semibold">
          이용 설정
        </p>
        <ul className="bg-box-black space-y-6 rounded-2xl p-4">
          <li>
            <Link
              to="/my/reminder"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img
                  className="size-8"
                  src={NotificationIcon}
                  alt="알림 설정"
                />
                <div className="flex flex-col justify-between text-sm">
                  <span className="font-semibold">알림 설정</span>
                  <span className="text-sub-font-black text-xs">
                    결제 일정이 가까워지면 이메일로 알려드려요
                  </span>
                </div>
              </div>
              <ChevronRight />
            </Link>
          </li>
          <li>
            <Link to="/faq" className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img className="size-8" src={FaqIcon} alt="FAQ" />
                <div className="flex flex-col justify-between text-sm">
                  <span className="font-semibold">FAQ</span>
                  <span className="text-sub-font-black text-xs">
                    자주 묻는 질문을 확인할 수 있어요
                  </span>
                </div>
              </div>
              <ChevronRight />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default MyPage;
