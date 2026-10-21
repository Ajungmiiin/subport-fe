import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getPlans } from '../../api/plan';

function useGetCustomPlanList(serviceId: string) {
  return useQuery({
    queryKey: QUERY_KEY.plans.list(serviceId),
    queryFn: () => getPlans(serviceId),
    enabled: Boolean(serviceId),
    select: ({ plans }) => {
      return plans.filter((plan) => plan.defaultProvided === false);
    },
  });
}

export default useGetCustomPlanList;
