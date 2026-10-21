import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getSubscriptionServiceTypes } from '../../api/services';

function useGetServiceTypes() {
  return useQuery({
    queryKey: QUERY_KEY.services.types,
    queryFn: getSubscriptionServiceTypes,
  });
}
export default useGetServiceTypes;
