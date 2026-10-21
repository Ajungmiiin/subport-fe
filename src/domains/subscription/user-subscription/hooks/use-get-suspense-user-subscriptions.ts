import { QUERY_KEY } from '@/shared/constants/query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { UserSubscriptionParams } from '../types/api';
import { getUserSubscriptions } from '../api/user-subscription';

function useGetSuspenseUserSubscription(params: UserSubscriptionParams) {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.userSubscription.list(params),
    queryFn: () => getUserSubscriptions(params),
  });
}

export default useGetSuspenseUserSubscription;
