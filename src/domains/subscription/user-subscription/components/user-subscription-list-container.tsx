import type { UserSubscriptionSort } from '../types/api';
import useGetSuspenseUserSubscription from '../hooks/use-get-suspense-user-subscriptions';
import UserSubscriptionList from './user-subscription-list';
import mappingUserSubscriptionList from '../model/mapper';
import { Link } from 'react-router-dom';

interface UserSubscriptionListContainerProps {
  active: boolean;
  sortBy: UserSubscriptionSort;
}

function UserSubscriptionListContainer({
  active,
  sortBy,
}: UserSubscriptionListContainerProps) {
  const { data: subscriptions } = useGetSuspenseUserSubscription({
    active,
    sortBy,
  });

  const userSubscriptionView = mappingUserSubscriptionList(
    { active, sortBy },
    subscriptions,
  );

  return (
    <>
      {active && userSubscriptionView.isEmpty && (
        <Link
          to="/service/add"
          className="hover:bg-primary/90 bg-primary text-primary-foreground block w-full rounded-2xl py-4.5 text-center text-lg font-bold transition-colors"
        >
          첫 구독 등록하기
        </Link>
      )}

      {!active && userSubscriptionView.isEmpty && (
        <p className="text-sub-font-black flex h-full items-center justify-center">
          비활성화된 구독 서비스가 존재하지 않습니다.
        </p>
      )}

      <UserSubscriptionList
        active={active}
        sections={userSubscriptionView.sections}
      />
    </>
  );
}

export default UserSubscriptionListContainer;
