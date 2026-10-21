import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getPlans } from '../../api/plan';

function useGetPlanList(serviceId: string) {
  return useQuery({
    queryKey: QUERY_KEY.plans.list(serviceId),
    queryFn: () => getPlans(serviceId),
    enabled: Boolean(serviceId),
  });
}

export default useGetPlanList;
