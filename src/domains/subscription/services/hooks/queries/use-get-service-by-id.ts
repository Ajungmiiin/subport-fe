import { getServiceById } from '@/domains/subscription/services/api/services';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetServiceById(id: string) {
  return useQuery({
    queryKey: QUERY_KEY.services.byId(id),
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
}

export default useGetServiceById;
