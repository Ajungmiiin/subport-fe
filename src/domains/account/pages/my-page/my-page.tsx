import { Link, useNavigate } from 'react-router-dom';

import SubscribeCalendarIcon from '@/assets/subscribe-calendar.png';
import SubscribeManageIcon from '@/assets/subscribe-manage.png';
import EditProfileIcon from '@/assets/icons/edit-profile-icon.svg';
import LogoutIcon from '@/assets/icons/logout-icon.svg';
import NotificationIcon from '@/assets/icons/notification-icon.svg';
import FaqIcon from '@/assets/icons/faq-icon.svg';
import SendCommentIcon from '@/assets/icons/send-comment-icon.svg';

import { ChevronRight } from 'lucide-react';
import LogoutButton from '@/domains/account/pages/my-page/components/logout-button';
import DeleteProfileButton from '@/domains/account/pages/my-page/components/delete-profile-button';
import { useGetAuthRole } from '@/domains/auth/store/use-auth-store';
import { Suspense, useState } from 'react';
import LoginModal from '@/domains/auth/components/login-modal';
import MyPageProfileSummary from './components/my-page-profile-summary';
import MyPageGuestSummary from './components/my-page-guest-summary';
import MyPageSummarySkeleton from './components/my-page-summary-skeleton';

function MyPageSectionWrapper({
  title,
  children,
  wrapperClassName,
}: {
  title: string;
  children: React.ReactNode;
  wrapperClassName?: string;
}) {
  return (
    <div className={wrapperClassName}>
      <p className="text-sub-font-black mb-2 text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}

function MyPageSectionItemContent({
  iconSrc,
  title,
  content,
}: {
  iconSrc: string;
  title: string;
  content: string;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img className="size-8" src={iconSrc} alt={title} />
        <div className="flex flex-col justify-between text-sm">
          <span className="text-start font-semibold">{title}</span>
          <span className="text-sub-font-black text-xs">{content}</span>
        </div>
      </div>
      <ChevronRight />
    </div>
  );
}

function MyPage() {
  const [loginModal, setLoginModal] = useState(false);

  const role = useGetAuthRole();
  const isMember = role === 'member';

  const navigate = useNavigate();

  const handleMemberOnlyNavigation = (redirectUrl: string) => {
    if (isMember) {
      navigate(redirectUrl);
    } else {
      setLoginModal(true);
    }
  };

  return (
    <section className="scrollbar-hide h-full overflow-scroll pb-6">
      {isMember ? (
        <Suspense fallback={<MyPageSummarySkeleton />}>
          <MyPageProfileSummary />
        </Suspense>
      ) : (
        <MyPageGuestSummary />
      )}

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
          to="/my/subscriptions"
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

      <MyPageSectionWrapper title="계정 설정" wrapperClassName="mb-4">
        <ul className="bg-box-black space-y-6 rounded-2xl p-4">
          <li>
            <button
              onClick={() => handleMemberOnlyNavigation('/my/edit-account')}
              className="flex w-full cursor-pointer items-center justify-between"
            >
              <MyPageSectionItemContent
                iconSrc={EditProfileIcon}
                title="정보 수정"
                content="계정 정보를 수정할 수 있어요"
              />
            </button>
          </li>
          <li>
            <LogoutButton>
              <MyPageSectionItemContent
                iconSrc={LogoutIcon}
                title="로그아웃"
                content="현재 계정에서 로그아웃 해요"
              />
            </LogoutButton>
          </li>
          <li>
            <DeleteProfileButton onRequireLogin={() => setLoginModal(true)} />
          </li>
        </ul>
      </MyPageSectionWrapper>

      <MyPageSectionWrapper title="이용 설정">
        <ul className="bg-box-black space-y-6 rounded-2xl p-4">
          <li>
            <button
              onClick={() => handleMemberOnlyNavigation('/my/reminder')}
              className="flex w-full cursor-pointer items-center justify-between"
            >
              <MyPageSectionItemContent
                iconSrc={NotificationIcon}
                title="알림 설정"
                content="결제 일정이 가까워지면 이메일로 알려드려요"
              />
            </button>
          </li>
          <li>
            <Link to="/faq" className="flex items-center justify-between">
              <MyPageSectionItemContent
                iconSrc={FaqIcon}
                title="FAQ"
                content="자주 묻는 질문을 확인할 수 있어요"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/user-comment"
              className="flex items-center justify-between"
            >
              <MyPageSectionItemContent
                iconSrc={SendCommentIcon}
                title="의견보내기"
                content="사용 중 불편했던 점이나 개선 의견을 남겨주세요"
              />
            </Link>
          </li>
        </ul>
      </MyPageSectionWrapper>

      <LoginModal open={loginModal} onOpenChange={() => setLoginModal(false)} />
    </section>
  );
}

export default MyPage;
