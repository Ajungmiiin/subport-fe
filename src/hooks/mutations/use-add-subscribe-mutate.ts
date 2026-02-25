import { addSubscribe } from '@/api/subscribe';
import { queryClient } from '@/components/providers/query-provider';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation } from '@tanstack/react-query';

export const useAddSubscribeMutate = (callbacks?: useMutationCallbacks) => {
  return useMutation({
    mutationFn: addSubscribe,
    onSuccess: (data) => {
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
};
