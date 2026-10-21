import { getUserSubscriptionById } from '@/domains/subscription/user-subscription/api/user-subscription';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetUserSubscriptionById(subscribeId: string) {
  return useQuery({
    queryKey: QUERY_KEY.userSubscription.byId(subscribeId),
    queryFn: () => getUserSubscriptionById(subscribeId),
  });
}

export default useGetUserSubscriptionById;
