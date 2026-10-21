import { QUERY_KEY } from '@/shared/constants/query-key';
import type { ApiErrorRes } from '@/shared/types/error';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { deletePlan } from '../../api/plan';

function useDeleteCustomPlan(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,
    onSuccess: (data, variables) => {
      callbacks?.onSuccess?.(data);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.plans.list(variables.subscriptionId.toString()),
      });
    },
    onError: (error) => {
      if (isAxiosError<ApiErrorRes>(error)) {
        console.log(error.response?.data);
      }
      callbacks?.onError?.(error);
    },
  });
}

export default useDeleteCustomPlan;
