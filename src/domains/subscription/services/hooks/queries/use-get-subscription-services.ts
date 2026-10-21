import { getSubscriptionServices } from '@/domains/subscription/services/api/services';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetSubscriptionServices(searchTerm?: string) {
  return useQuery({
    queryKey: searchTerm
      ? QUERY_KEY.services.search(searchTerm)
      : QUERY_KEY.services.lists,
    queryFn: () => getSubscriptionServices(searchTerm ?? ''),
  });
}

export default useGetSubscriptionServices;
