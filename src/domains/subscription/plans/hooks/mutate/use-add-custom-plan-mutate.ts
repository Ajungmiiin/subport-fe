import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPlan } from '../../api/plan';

function useAddCustomPlan(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPlan,
    onSuccess: (data, variables) => {
      callbacks?.onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.plans.list(variables.subscriptionId.toString()),
      });
    },
  });
}

export default useAddCustomPlan;
