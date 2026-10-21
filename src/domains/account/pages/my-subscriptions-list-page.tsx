import UserSubscriptionListSkeleton from '@/domains/subscription/user-subscription/components/ui/subscribe-list-skeleton';
import UserSubscriptionList from '@/domains/subscription/user-subscription/components/user-subscription-list';
import useGetUserSubscription from '@/domains/subscription/user-subscription/hooks/use-get-user-subscriptions';
import mappingUserSubscriptionList from '@/domains/subscription/user-subscription/model/mapper';

function MySubscriptionsListPage() {
  const { data: subscriptions, isPending: isGetSubscriptionsPending } =
    useGetUserSubscription({ active: true, sortBy: 'createdAt' });

  if (isGetSubscriptionsPending) return <UserSubscriptionListSkeleton />;

  if (!subscriptions)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <p className="text-center">
          구독 목록을 불러오지 못했습니다 <br /> 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );

  const userSubscriptionList = mappingUserSubscriptionList(
    { active: true, sortBy: 'createdAt' },
    subscriptions,
  );
  return (
    <div className="scrollbar-hide h-full overflow-scroll pb-4">
      {userSubscriptionList.sections.length > 0 && (
        <>
          <p className="mb-4 text-lg font-semibold">{`${subscriptions.subscriptions.length}건 구독 중`}</p>
          <UserSubscriptionList sections={userSubscriptionList.sections} />
        </>
      )}
      {userSubscriptionList.sections.length === 0 && (
        <>
          <p className="text-sub-font-black flex h-full items-center justify-center">
            구독하고 있는 서비스가 존재하지 않습니다.
          </p>
        </>
      )}
    </div>
  );
}

export default MySubscriptionsListPage;
