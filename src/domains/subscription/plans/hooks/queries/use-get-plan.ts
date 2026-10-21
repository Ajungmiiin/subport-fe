import { getPlan } from '@/domains/subscription/plans/api/plan';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetPlan(planId: string) {
  return useQuery({
    queryKey: QUERY_KEY.plans.byId(planId),
    queryFn: () => getPlan(planId),
  });
}

export default useGetPlan;
