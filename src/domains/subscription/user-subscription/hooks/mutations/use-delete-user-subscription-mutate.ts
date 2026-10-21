import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserSubscription } from '../../api/user-subscription';
import { QUERY_KEY } from '@/shared/constants/query-key';

function useDeleteUserSubscriptionMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserSubscription,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.userSubscription.lists,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.spendingRecords.all,
      });
      
      queryClient.invalidateQueries({
        queryKey : QUERY_KEY.userSubscription.monthlySummary
      })
    },
  });
}

export default useDeleteUserSubscriptionMutate;
