import GroupedSubscribeList from '@/components/subscribe/member-subscribe/grouped-subscribe-list';
import SubscribeList from '@/components/subscribe/member-subscribe/subscribe-list';
import SubscribeListSkeleton from '@/components/subscribe/member-subscribe/subscribe-list-skeleton';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useGetMemberSubscriptions from '@/hooks/queries/use-get-member-subscriptions';
import type {
  MemberSubscribeAmounts,
  MemberSubscriptions,
  MemberSubscriptionSort,
  SubscriptionGroupMap,
} from '@/types/subscribe';
import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import OnBoardingBottomModal from '@/components/modal/onboarding-bottom-modal';
import MonthlySpendingCard from '@/components/subscribe/member-subscribe/monthly-spending-card';

import MessageIcon from '@/assets/icons/message-icon.svg?react';
import FeedbackEntryBottomModal from '@/components/modal/feedback-entry-bottom-modal';
import { STORAGE_KEY } from '@/constants/storage-key';
import { useGetAuthRole } from '@/store/use-auth-store';

const SUBSCIRBE_SORTS = [
  { value: 'type', label: '타입순' },
  { value: 'nextPaymentDate', label: '결제 가까운 순' },
  { value: 'createdAt', label: '최신순' },
  { value: 'name', label: '이름순' },
] as const;

const DEFAULT_ACTIVE = true;
const DEFAULT_SORT: MemberSubscriptionSort = 'type';
const DEFAULT_MONTHLY_CARD: MemberSubscribeAmounts = {
  currentMonthPaidAmount: 0,
  currentMonthTotalAmount: 0,
  paymentProgressPercent: 0,
};

const SORT_VALUES = new Set(SUBSCIRBE_SORTS.map((s) => s.value));
const TODAY_DATE = new Date().toLocaleDateString('sv-SE');

const parseParams = (sq: URLSearchParams) => {
  const active = sq.get('active') === '0' ? false : DEFAULT_ACTIVE;
  if (!active) return { active: false, sortBy: 'name' as const };

  const rawSort = sq.get('sort');
  const sortBy =
    rawSort && SORT_VALUES.has(rawSort as MemberSubscriptionSort)
      ? (rawSort as MemberSubscriptionSort)
      : DEFAULT_SORT;

  return { active: true, sortBy };
};

function MainPage() {
  const isOnBoardingConsumed =
    sessionStorage.getItem(STORAGE_KEY.firstLoginOnboardingConsumed) ===
    'consumed';
  const role = useGetAuthRole();
  const isGuest = role === 'guest';
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFeedbackEntryOpen, setIsFeedbackEntryOpen] = useState(() => {
    const hiddenDate = localStorage.getItem(
      STORAGE_KEY.feedbackEntryHiddenUntil,
    );
    const hasSubmittedFeedback =
      localStorage.getItem(STORAGE_KEY.feedbackSubmitted) === 'true';

    return hiddenDate !== TODAY_DATE && !hasSubmittedFeedback;
  });
  const [monthlyCard, setMonthlyCard] =
    useState<MemberSubscribeAmounts>(DEFAULT_MONTHLY_CARD);

  const { active, sortBy } = parseParams(searchParams);
  const { data: subscriptions, isPending: isGetSubscriptionsPending } =
    useGetMemberSubscriptions({ active, sortBy });

  useEffect(() => {
    if (!active || !subscriptions) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonthlyCard({
      currentMonthPaidAmount: subscriptions.currentMonthPaidAmount,
      currentMonthTotalAmount: subscriptions.currentMonthTotalAmount,
      paymentProgressPercent: subscriptions.paymentProgressPercent,
    });
  }, [active, subscriptions]);

  const toggleActive = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const nextActive = !(prev.get('active') === '0' ? false : true);

      next.set('active', nextActive ? '1' : '0');

      if (!nextActive) {
        next.delete('sort');
      } else {
        if (!next.get('sort')) {
          next.set('sort', DEFAULT_SORT);
        }
      }

      return next;
    });
  };

  const handleChangeSort = (sortBy: MemberSubscriptionSort) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set('active', '1');
      next.set('sort', sortBy);

      return next;
    });
  };

  const shouldShowOnboarding =
    (location.state?.showOnboarding === true || isGuest) &&
    !isOnBoardingConsumed;

  const shouldSkipFeedbackEntry = location.state?.skipFeedbackEntry === true;
  const isMainPage = location.pathname === '/';

  const shouldRenderFeedbackEntry =
    isMainPage &&
    !shouldShowOnboarding &&
    !shouldSkipFeedbackEntry &&
    isFeedbackEntryOpen;
  return (
    <>
      <div className="scrollbar-hide flex h-full flex-col gap-6 overflow-scroll pb-6">
        <div className="flex items-center justify-between">
          <Switch
            checked={active}
            onClick={toggleActive}
            className="cursor-pointer"
            variant="label-pill"
            onLabel="활성화"
            offLabel="비활성화"
          />

          <button
            className="relative cursor-pointer p-3"
            type="button"
            onClick={() => navigate('/feedback')}
          >
            <span className="bg-primary-light-active text-background-black absolute top-1.5 -left-5 rounded-full px-2.5 py-0.5 text-xs font-semibold">
              피드백
            </span>
            <MessageIcon className="size-8" />
          </button>
        </div>

        <div className="flex-1">
          {active && (
            <>
              <div className="mb-4 flex flex-col items-end gap-4">
                <MonthlySpendingCard
                  paidAmount={monthlyCard.currentMonthPaidAmount}
                  progressPercent={monthlyCard.paymentProgressPercent}
                  totalAmount={monthlyCard.currentMonthTotalAmount}
                />
                <Select
                  onValueChange={(sortBy: MemberSubscriptionSort) =>
                    handleChangeSort(sortBy)
                  }
                  defaultValue={sortBy}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent defaultValue={sortBy} position="popper">
                    {SUBSCIRBE_SORTS.map((sort) => (
                      <SelectItem key={sort.value} value={sort.value}>
                        {sort.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {isGetSubscriptionsPending ? (
            <SubscribeListSkeleton />
          ) : (
            <>
              {active && subscriptions?.currentMonthTotalAmount === 0 && (
                <Link
                  to="/subscribe/add"
                  className="hover:bg-primary/90 bg-primary text-primary-foreground block w-full rounded-2xl py-4.5 text-center text-lg font-bold transition-colors"
                >
                  첫 구독 등록하기
                </Link>
              )}

              {!active && subscriptions!.subscriptions.length === 0 && (
                <p className="text-sub-font-black flex h-full items-center justify-center">
                  비활성화된 구독 서비스가 존재하지 않습니다.
                </p>
              )}

              {!active && (
                <SubscribeList
                  unActive
                  subscribeList={
                    subscriptions!.subscriptions as MemberSubscriptions
                  }
                />
              )}

              {sortBy === 'type' && (
                <GroupedSubscribeList
                  subscribeList={
                    subscriptions!.subscriptions as SubscriptionGroupMap
                  }
                />
              )}

              {sortBy !== 'type' && active && (
                <SubscribeList
                  subscribeList={
                    subscriptions!.subscriptions as MemberSubscriptions
                  }
                />
              )}
            </>
          )}
        </div>
      </div>

      <Outlet />

      {shouldShowOnboarding && (
        <OnBoardingBottomModal open={shouldShowOnboarding} />
      )}

      {shouldRenderFeedbackEntry && (
        <FeedbackEntryBottomModal
          open={isFeedbackEntryOpen}
          onOpenChange={() => setIsFeedbackEntryOpen(false)}
        />
      )}
    </>
  );
}

export default MainPage;
