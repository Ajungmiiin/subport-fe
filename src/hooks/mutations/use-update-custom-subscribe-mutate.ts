import { updatedCustomSubscribe } from '@/api/subscribe';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useUpdateCustomSubscribeMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatedCustomSubscribe,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.subscriptions.all,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.subscriptions.byId(variables.subscribeId),
      });
      queryClient.invalidateQueries({
        queryKey: ['member-subscriptions'],
        predicate: (q) => {
          const second = q.queryKey[1];
          return (
            typeof second === 'object' && second !== null && 'active' in second
          );
        },
      });
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdateCustomSubscribeMutate;
