import { deleteMemberSubscribe } from '@/api/member-subscribe';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useDeleteMemberSubscribeMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMemberSubscribe,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: ['member-subscriptions'],
        predicate: (q) => {
          const second = q.queryKey[1];
          return (
            typeof second === 'object' && second !== null && 'active' in second
          );
        },
      });
    },
  });
}

export default useDeleteMemberSubscribeMutate;
