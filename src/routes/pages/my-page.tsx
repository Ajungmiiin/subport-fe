import useGetMyProfile from '@/hooks/queries/use-get-my-profile';
import { Link, useNavigate } from 'react-router-dom';

import SubscribeCalendarIcon from '@/assets/subscribe-calendar.png';
import SubscribeManageIcon from '@/assets/subscribe-manage.png';
import EditProfileIcon from '@/assets/icons/edit-profile-icon.svg';
import LogoutIcon from '@/assets/icons/logout-icon.svg';
import NotificationIcon from '@/assets/icons/notification-icon.svg';
import FaqIcon from '@/assets/icons/faq-icon.svg';
import SendCommentIcon from '@/assets/icons/send-comment-icon.svg';

import { ChevronRight } from 'lucide-react';
import MyPageSkeleton from '@/components/my/my-page-skeleton';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/components/my/logout-button';
import DeleteProfileButton from '@/components/my/delete-profile-button';
import { useGetAuthRole } from '@/store/use-auth-store';
import { useState } from 'react';
import LoginModal from '@/components/modal/login-modal';
function MyPage() {
  const [loginModal, setLoginModal] = useState(false);

  const role = useGetAuthRole();
  const navigate = useNavigate();
  const {
    data: profile,
    isPending: isGetProfilePending,
    refetch,
  } = useGetMyProfile();

  const isMember = role === 'member';

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
    <section className="scrollbar-hide h-full overflow-scroll pb-6">
      <p className="mb-4 text-2xl/relaxed font-semibold">
        {`${profile.nickname}님!`}
        {isMember && (
          <>
            <br />
            구독을 관리한지
            <br />
            <span className="text-primary">{`D+${profile.joinedDays}`}</span>
          </>
        )}
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
            <button
              onClick={() => {
                if (isMember) {
                  navigate('/my/edit-account');
                } else {
                  setLoginModal(true);
                }
              }}
              className="flex w-full cursor-pointer items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img className="size-8" src={EditProfileIcon} alt="정보 수정" />
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-start font-semibold">정보 수정</span>
                  <span className="text-sub-font-black text-xs">
                    계정 정보를 수정할 수 있어요
                  </span>
                </div>
              </div>
              <ChevronRight />
            </button>
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
            <DeleteProfileButton onRequireLogin={() => setLoginModal(true)} />
          </li>
        </ul>
      </div>

      <div>
        <p className="text-sub-font-black mb-2 text-sm font-semibold">
          이용 설정
        </p>
        <ul className="bg-box-black space-y-6 rounded-2xl p-4">
          <li>
            <button
              onClick={() => {
                if (isMember) {
                  navigate('/my/reminder');
                } else {
                  setLoginModal(true);
                }
              }}
              className="flex w-full cursor-pointer items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img
                  className="size-8"
                  src={NotificationIcon}
                  alt="알림 설정"
                />
                <div className="flex flex-col justify-between text-sm">
                  <span className="text-start font-semibold">알림 설정</span>
                  <span className="text-sub-font-black text-xs">
                    결제 일정이 가까워지면 이메일로 알려드려요
                  </span>
                </div>
              </div>
              <ChevronRight />
            </button>
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
          <li>
            <Link
              to="/user-comment"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img
                  className="size-8"
                  src={SendCommentIcon}
                  alt="send-user-comment"
                />
                <div className="flex flex-col justify-between text-sm">
                  <span className="font-semibold">의견보내기</span>
                  <span className="text-sub-font-black text-xs">
                    사용 중 불편했던 점이나 개선 의견을 남겨주세요
                  </span>
                </div>
              </div>
              <ChevronRight />
            </Link>
          </li>
        </ul>
      </div>

      <LoginModal open={loginModal} onOpenChange={() => setLoginModal(false)} />
    </section>
  );
}

export default MyPage;
