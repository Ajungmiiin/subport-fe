import { getSubscriptionServices } from '@/domains/subscription/services/api/services';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetCustomSubscriptionServices() {
  return useQuery({
    queryKey: QUERY_KEY.services.lists,
    queryFn: () => getSubscriptionServices(),
    select: (subscriptionSerivces) => {
      return subscriptionSerivces.filter(
        (subscriptionService) => subscriptionService.defaultProvided === false,
      );
    },
  });
}

export default useGetCustomSubscriptionServices;
