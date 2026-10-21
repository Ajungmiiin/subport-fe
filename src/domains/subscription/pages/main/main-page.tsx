import { Switch } from '@/components/ui/switch';
import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import OnBoardingBottomModal from '@/domains/subscription/pages/main/components/onboarding-bottom-modal';
import MonthlySpendingCard from '@/domains/subscription/pages/main/components/monthly-spending-card';

import MessageIcon from '@/assets/icons/message-icon.svg?react';
import FeedbackEntryBottomModal from '@/domains/subscription/pages/main/components/feedback-entry-bottom-modal';
import useSubscriptionListFilter from './hooks/use-subscription-list-filter';
import useMainPageOnboarding from './hooks/use-main-page-onboarding';
import useMainPageFeedbackEntry from './hooks/use-main-page-feedback-entry';
import UserSubscriptionListContainer from '../../user-subscription/components/user-subscription-list-container';
import SubscriptionSortSelect from './components/subscription-sort-select';
import UserSubscriptionListSkeleton from '@/domains/subscription/user-subscription/components/ui/subscribe-list-skeleton';

function MainPage() {
  const { active, sortBy, changeSortBy, toggleActiveFilter } =
    useSubscriptionListFilter();

  const shouldShowOnboarding = useMainPageOnboarding();

  const { shouldRenderFeedbackEntry, closeFeedbackEntry } =
    useMainPageFeedbackEntry();

  const navigate = useNavigate();

  return (
    <>
      <div className="scrollbar-hide flex h-full flex-col gap-6 overflow-scroll pb-6">
        <div className="flex items-center justify-between">
          <Switch
            checked={active}
            onClick={toggleActiveFilter}
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
            <div className="mb-4 flex flex-col items-end gap-4">
              <MonthlySpendingCard />

              <SubscriptionSortSelect
                changeSortBy={changeSortBy}
                sortBy={sortBy}
              />
            </div>
          )}

          <Suspense fallback={<UserSubscriptionListSkeleton />}>
            <UserSubscriptionListContainer active={active} sortBy={sortBy} />
          </Suspense>
        </div>
      </div>

      <Outlet />

      {shouldShowOnboarding && (
        <OnBoardingBottomModal open={shouldShowOnboarding} />
      )}

      {!shouldShowOnboarding && shouldRenderFeedbackEntry && (
        <FeedbackEntryBottomModal
          open={shouldRenderFeedbackEntry}
          onOpenChange={closeFeedbackEntry}
        />
      )}
    </>
  );
}

export default MainPage;
