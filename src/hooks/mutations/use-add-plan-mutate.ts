import { addPlan } from '@/api/plan';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useAddPlanMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPlan,
    onSuccess: (data, variables) => {
      callbacks?.onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.plans.list(variables.subscribeId.toString()),
      });
    },
  });
}

export default useAddPlanMutate;
