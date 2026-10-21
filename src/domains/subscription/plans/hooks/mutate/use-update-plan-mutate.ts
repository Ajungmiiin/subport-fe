import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePlan } from '../../api/plan';
import type { PlanItem, PlanList } from '../../types/api';

function useUpdatePlanMutate(callbacks?: useMutationCallbacks<PlanItem>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlan,
    onSuccess: (data, variables) => {
      const prevPlanList = queryClient.getQueryData<PlanList>(
        QUERY_KEY.plans.list(variables.subscriptionId.toString()),
      );

      const prevPlanItem = queryClient.getQueryData<PlanItem>(
        QUERY_KEY.plans.byId(variables.planId.toString()),
      );

      if (!prevPlanList || !prevPlanItem) {
        throw new Error('멤버십 정보를 불러오지 못했습니다.');
      }

      const updatedPlanList = prevPlanList.plans.map((plan) =>
        plan.id === data.id ? data : plan,
      );

      queryClient.setQueryData<PlanList>(
        QUERY_KEY.plans.list(variables.subscriptionId.toString()),
        { planUrl: prevPlanList.planUrl, plans: updatedPlanList },
      );

      queryClient.setQueryData(QUERY_KEY.plans.byId(data.id.toString()), data);

      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdatePlanMutate;
