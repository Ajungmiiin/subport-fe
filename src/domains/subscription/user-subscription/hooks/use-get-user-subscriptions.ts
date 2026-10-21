import { QUERY_KEY } from '@/shared/constants/query-key';
import type { UserSubscriptionParams } from '@/domains/subscription/user-subscription/types/api';
import { useQuery } from '@tanstack/react-query';
import { getUserSubscriptions } from '../api/user-subscription';

function useGetUserSubscription(params: UserSubscriptionParams) {
  return useQuery({
    queryKey: QUERY_KEY.userSubscription.list(params),
    queryFn: () => getUserSubscriptions(params),
  });
}

export default useGetUserSubscription;
